# Админка EASSP: API для фронта (подробный контракт)

Документ описывает backend API для админ‑панели: пользователи, роли и возможности, база знаний (справочники и номенклатура), а также авторизация.

---

## 1) Базовые правила

### 1.1 Базовый URL
- Использовать базовый URL окружения: `https://{API_HOST}`.
- Все пути ниже указаны относительно базового URL.

### 1.2 Заголовки
- `Content-Type: application/json`
- `Accept: application/json`
- Для защищенных ручек: `Authorization: Bearer <accessToken>`

### 1.3 Формат успешного ответа
Все успешные ответы **строго** завернуты в объект `data`:
```json
{
  "data": { ... }
}
```
Исключения: отсутствуют (204 не используется).

### 1.4 Формат ошибки
Все ошибки возвращаются в едином формате:
```json
{
  "error": {
    "code": "SOME_ERROR_CODE",
    "message": "Human readable message",
    "details": { "any": "optional" }
  }
}
```
- `code` всегда в верхнем регистре с `_`.
- `details` присутствует только при наличии дополнительных данных.

### 1.5 Валидация
- Включен `ValidationPipe` с `whitelist` и `forbidNonWhitelisted`.
- Лишние поля в body/query/params приводят к `400 BAD_REQUEST`.
- Ошибки валидации возвращаются как:
  - `code: "BAD_REQUEST"`
  - `message: "Validation failed"`
  - `details: string[]` — массив сообщений валидатора.

### 1.6 Типы и форматы
- UUID: строка в формате UUID v4.
- Дата/время: строка ISO‑8601 (`2025-01-01T00:00:00.000Z`).
- `metaJson`: объект JSON.

### 1.7 Пагинация
Все списки возвращают:
```json
{
  "data": {
    "items": [],
    "page": 1,
    "pageSize": 20,
    "total": 0
  }
}
```
Ограничения:
- `page` >= 1
- `pageSize` от 1 до 100

### 1.8 Аутентификация
- Используется JWT access token.
- Refresh token хранится в **HTTP‑only cookie** `refresh_token` с `Path=/auth`.
- Для refresh/logout требуется отправка cookie (`credentials: "include"`).
- TTL:
  - access token: 1 час (`expiresIn = 3600`)
  - refresh token: 60 дней (cookie)

### 1.9 Общие auth/permission ошибки
- `401 ACCESS_TOKEN_MISSING` — отсутствует `Authorization: Bearer`.
- `401 ACCESS_TOKEN_INVALID` — токен некорректен или истек.
- `401 TOKEN_REVOKED` — токен отозван (смена роли/пароля/блокировка).
- `401 USER_INACTIVE` — пользователь заблокирован.
- `401 AUTH_REQUIRED` — отсутствует авторизованный пользователь.
- `403 INSUFFICIENT_PERMISSIONS` — нет требуемой возможности.

---

## 2) Auth

### 2.1 POST `/auth/login`
**Описание:** вход по email+пароль, выдача access token. Refresh token устанавливается в cookie.

**Body (LoginDto):**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123",
  "deviceId": "550e8400-e29b-41d4-a716-446655440000"
}
```
**Правила:**
- `email` — валидный email, приводится к lower‑case и trim.
- `deviceId` — UUID, генерируется клиентом и хранится стабильно.

**Response (AuthTokensDto):**
```json
{
  "data": {
    "accessToken": "<jwt>",
    "expiresIn": 3600,
    "deviceId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```
**Set-Cookie:** `refresh_token=<jwt>; HttpOnly; Path=/auth; Max-Age=...`

**Ошибки:**
- `401 INVALID_CREDENTIALS`
- `403 USER_INACTIVE`
- `429 RATE_LIMITED` (details: `windowSeconds`, `maxAttempts`)
- `400 BAD_REQUEST` (валидация)

---

### 2.2 GET `/auth/me`
**Описание:** профиль текущего пользователя + роль, позиция, отдел, доступные возможности.

**Auth:** `Bearer`.

**Response (AuthProfileDto):**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Ivan",
      "lastName": "Ivanov",
      "middleName": "Ivanovich",
      "isActive": true,
      "tokenVersion": 0,
      "lastLoginAt": "2025-01-01T00:00:00.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    },
    "role": {
      "id": "uuid",
      "code": "admin",
      "name": "Administrator",
      "description": "Full access",
      "isActive": true
    },
    "position": {
      "id": "uuid",
      "name": "Manager",
      "departmentId": "uuid"
    },
    "department": {
      "id": "uuid",
      "code": "DEP-01",
      "name": "Main department",
      "branchOfficeId": "uuid"
    },
    "abilities": [
      {
        "code": "users.manage",
        "name": "Manage users",
        "description": null,
        "category": "Admin"
      }
    ]
  }
}
```
**Примечания:**
- `position` и `department` могут быть `null`.
- `abilities` — только активные возможности роли.

**Ошибки:**
- `401 ACCESS_TOKEN_MISSING`
- `401 ACCESS_TOKEN_INVALID`
- `401 USER_NOT_FOUND`

---

### 2.3 POST `/auth/refresh`
**Описание:** обновление access token по refresh cookie.

**Auth:** cookie `refresh_token`.

**Response (AuthTokensDto):**
```json
{
  "data": {
    "accessToken": "<jwt>",
    "expiresIn": 3600,
    "deviceId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```
**Set-Cookie:** обновленный `refresh_token`.

**Ошибки:**
- `401 REFRESH_TOKEN_MISSING`
- `401 INVALID_REFRESH_TOKEN`
- `401 REFRESH_REVOKED`
- `401 REFRESH_EXPIRED`
- `401 USER_INACTIVE`
- `429 RATE_LIMITED`

---

### 2.4 POST `/auth/logout`
**Описание:** выход и удаление refresh cookie.

**Auth:** cookie `refresh_token`.

**Response:**
```json
{ "data": { "success": true } }
```

**Ошибки:** только стандартные 400/500.

---

## 3) Роли и возможности (Access Control)
**Все ручки требуют:**
- `Bearer` + `abilities`: `access.manage`

### 3.1 GET `/access/abilities`
**Описание:** список возможностей.

**Query (AccessControlListQueryDto):**
- `page` (int, >=1, default 1)
- `pageSize` (int, 1..100, default 20)
- `search` (string) — поиск по `code`/`name`, case-insensitive
- `category` (string)
- `isActive` (boolean)

**Response (AbilitiesListDto):**
```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "code": "access.manage",
        "name": "Manage access control",
        "description": "...",
        "category": "Admin - Access control",
        "isActive": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-02T00:00:00.000Z"
      }
    ],
    "page": 1,
    "pageSize": 20,
    "total": 0
  }
}
```

**Ошибки:** стандартные auth/permission + `400 BAD_REQUEST`.

---

### 3.2 POST `/access/abilities`
**Описание:** создание возможности.

**Body (CreateAbilityDto):**
```json
{
  "code": "access.manage",
  "name": "Manage access control",
  "description": "Manage abilities and role mappings",
  "category": "Admin - Access control",
  "isActive": true
}
```
**Правила:**
- `code`, `name` обязательны, trim, не пустые.
- `description`, `category` — опциональные, допускают `null`.
- `isActive` по умолчанию `true`.

**Response (AbilityDto):** объект возможности.

**Ошибки:**
- `409 ABILITY_CODE_EXISTS`
- `400 BAD_REQUEST`

---

### 3.3 PATCH `/access/abilities/:id`
**Описание:** обновление возможности.

**Path:**
- `id` — UUID.

**Body (UpdateAbilityDto):**
```json
{
  "name": "New name",
  "description": "New description",
  "category": "New category",
  "isActive": false
}
```
**Правила:**
- Все поля опциональны.
- Если не передано ни одного поля → ошибка.

**Response (AbilityDto):** обновленная возможность.

**Ошибки:**
- `404 ABILITY_NOT_FOUND`
- `400 ABILITY_UPDATE_EMPTY`
- `400 BAD_REQUEST`

---

### 3.4 GET `/access/roles`
**Описание:** список ролей.

**Query:** `page`, `pageSize`.

**Response (RolesListDto):**
```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "code": "admin",
        "name": "Administrator",
        "description": "Full access",
        "isActive": true,
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-02T00:00:00.000Z"
      }
    ],
    "page": 1,
    "pageSize": 20,
    "total": 0
  }
}
```

---

### 3.5 GET `/access/roles/:code/abilities`
**Описание:** возможности конкретной роли.

**Path:**
- `code` — код роли (string, trim).

**Query:** `page`, `pageSize`.

**Response:** `AbilitiesListDto`.

**Ошибки:**
- `404 ROLE_NOT_FOUND`

---

### 3.6 POST `/access/roles/:code/abilities`
**Описание:** назначить возможности роли.

**Path:** `code`.

**Body (RoleAbilitiesDto):**
```json
{ "abilityCodes": ["users.manage", "access.manage"] }
```
**Правила:**
- Массив не пустой, уникальный.
- Коды trim.
- Возможности должны быть активны.

**Response:**
```json
{ "data": { "success": true } }
```

**Ошибки:**
- `404 ROLE_NOT_FOUND`
- `404 ABILITY_NOT_FOUND` (details: `{ codes: [...] }`)
- `400 ABILITY_INACTIVE` (details: `{ codes: [...] }`)
- `400 BAD_REQUEST`

---

### 3.7 DELETE `/access/roles/:code/abilities`
**Описание:** удалить возможности у роли.

**Body:** тот же `RoleAbilitiesDto`.

**Response:** `{ "data": { "success": true } }`

**Ошибки:**
- `404 ROLE_NOT_FOUND`
- `404 ABILITY_NOT_FOUND`
- `400 BAD_REQUEST`

---

**Важно:** создание/редактирование ролей через API **не реализовано** (только чтение и настройка матрицы возможностей).

---

## 4) Пользователи
**Все ручки требуют:**
- `Bearer` + `abilities`: `users.manage`

### 4.1 GET `/users`
**Описание:** список пользователей.

**Query (UsersQueryDto):**
- `page` (int, >=1, default 1)
- `pageSize` (int, 1..100, default 20)
- `search` (string) — поиск по email/ФИО, contains, case-insensitive
- `roleId` (UUID)
- `positionId` (UUID)
- `isActive` (boolean)

**Response (UsersListDto):**
```json
{
  "data": {
    "items": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "middleName": "Ivanovich",
        "isActive": true,
        "tokenVersion": 0,
        "lastLoginAt": "2025-01-01T00:00:00.000Z",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-02T00:00:00.000Z",
        "role": {
          "id": "uuid",
          "code": "admin",
          "name": "Администратор системы",
          "description": "Полный доступ",
          "isActive": true
        },
        "position": {
          "id": "uuid",
          "name": "System Administrator",
          "departmentId": "uuid"
        }
      }
    ],
    "page": 1,
    "pageSize": 20,
    "total": 0
  }
}
```
**Примечание:** `position` может быть `null`.

---

### 4.2 GET `/users/:id`
**Описание:** получить пользователя по ID.

**Path:** `id` — UUID.

**Response:** `UserDto`.

**Ошибки:**
- `404 USER_NOT_FOUND`

---

### 4.3 POST `/users`
**Описание:** создание пользователя.

**Body (CreateUserDto):**
```json
{
  "email": "user@example.com",
  "firstName": "Ivan",
  "lastName": "Ivanov",
  "middleName": "Ivanovich",
  "roleId": "uuid",
  "positionId": "uuid",
  "password": "StrongPassword123",
  "isActive": true
}
```
**Правила:**
- `roleId`, `positionId`, `password` — обязательны.
- `password` — минимум 8 символов.

**Примечания:**
- `roleId` берется из `GET /access/roles`.
- `positionId` берется из справочника `positions` (см. `/dictionaries/positions`).

**Response:** `UserDto`.

**Ошибки:**
- `409 USER_EMAIL_EXISTS`
- `404 ROLE_NOT_FOUND`
- `400 ROLE_INACTIVE`
- `404 POSITION_NOT_FOUND`
- `400 BAD_REQUEST`

---

### 4.4 PATCH `/users/:id`
**Описание:** обновление профиля пользователя.

**Body (UpdateUserDto):**
```json
{
  "firstName": "Ivan",
  "lastName": "Ivanov",
  "middleName": "Ivanovich",
  "email": "new@example.com"
}
```
**Правила:**
- Все поля опциональны.
- Нельзя отправлять пустой body.

**Response:** `UserDto`.

**Ошибки:**
- `404 USER_NOT_FOUND`
- `400 USER_UPDATE_EMPTY`
- `409 USER_EMAIL_EXISTS`
- `400 BAD_REQUEST`

---

### 4.5 PATCH `/users/:id/password`
**Описание:** смена пароля пользователя.

**Body (UpdateUserPasswordDto):**
```json
{ "password": "NewStrongPassword123" }
```
**Правила:**
- `password` — минимум 8 символов.

**Response:** `{ "data": { "success": true } }`

**Ошибки:**
- `404 USER_NOT_FOUND`
- `400 BAD_REQUEST`

---

### 4.6 PATCH `/users/:id/role`
**Описание:** смена роли пользователя.

**Body (UpdateUserRoleDto):**
```json
{ "roleId": "uuid" }
```

**Response:** `UserDto`.

**Ошибки:**
- `404 USER_NOT_FOUND`
- `404 ROLE_NOT_FOUND`
- `400 ROLE_INACTIVE`
- `400 BAD_REQUEST`

---

### 4.7 PATCH `/users/:id/position`
**Описание:** смена должности пользователя.

**Body (UpdateUserPositionDto):**
```json
{ "positionId": "uuid" }
```

**Response:** `UserDto`.

**Ошибки:**
- `404 USER_NOT_FOUND`
- `404 POSITION_NOT_FOUND`
- `400 BAD_REQUEST`

---

### 4.8 PATCH `/users/:id/status`
**Описание:** блокировка/разблокировка пользователя.

**Body (UpdateUserStatusDto):**
```json
{ "isActive": false }
```

**Response:** `UserDto`.

**Ошибки:**
- `404 USER_NOT_FOUND`
- `400 BAD_REQUEST`

**Важное поведение:**
- При блокировке пользовательские сессии инвалидируются (tokenVersion++).

---

## 5) База знаний

### 5.1 Номенклатура (Nomenclature Items)
**Защита:**
- Все ручки требуют `Bearer`.
- Создание дополнительно требует `ability`: `nomenclature.create`.

#### 5.1.1 GET `/nomenclature-items`
**Query (NomenclatureItemsQueryDto):**
- `page` (int >=1)
- `pageSize` (1..100)
- `search` (string) — поиск по `name` или `id`
- `okei_code` (string)
- `vd_code` (string)

**Response (NomenclatureItemsListDto):**
```json
{
  "data": {
    "items": [
      {
        "id": "MANUAL-550e8400-e29b-41d4-a716-446655440000",
        "name": "Nomenclature item",
        "okeiCode": "796",
        "vdCode": "VD.01.1",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-02T00:00:00.000Z"
      }
    ],
    "page": 1,
    "pageSize": 20,
    "total": 0
  }
}
```
**Примечание:** `okei_code` и `vd_code` фильтруют по точному совпадению.

#### 5.1.2 POST `/nomenclature-items`
**Body (CreateNomenclatureItemDto):**
```json
{
  "id": "MANUAL-550e8400-e29b-41d4-a716-446655440000",
  "name": "Nomenclature item",
  "okeiCode": "796",
  "vd_code": "VD.01.1"
}
```
**Примечания:**
- `id` опционален. Если не указан, будет сгенерирован `MANUAL-<uuid>`.
- Если `id` уже существует, возвращается существующая запись (идемпотентность).
- `vd_code` опционален, в ответе поле называется `vdCode`.

**Ошибки:**
- `404 OKEI_UNIT_NOT_FOUND`
- `404 VD_CODE_NOT_FOUND`
- `400 BAD_REQUEST`

---

### 5.2 Справочники (Dictionaries)
**Все ручки требуют:**
- `Bearer` + `abilities`: `dictionaries.manage`

#### 5.2.1 Универсальные endpoints
1) **GET** `/dictionaries/:dictionary`
2) **GET** `/dictionaries/:dictionary/:entryId`
3) **POST** `/dictionaries/:dictionary`
4) **PATCH** `/dictionaries/:dictionary/:entryId`
5) **DELETE** `/dictionaries/:dictionary/:entryId`

#### 5.2.2 Список доступных словарей (`:dictionary`)
```
branch-offices
departments
positions
cfos
okato-regions
okei-units
okved2-codes
okpd2-codes
vd-codes
budget-codes
categories
subcategories
suppliers
warehouses
currencies
purchase-types
priorities
procurement-methods
contract-types
purchase-object-types
procurement-purchase-types
tru-plan-statuses
tru-plan-types
tru-delivery-kinds
procurement-plan-statuses
procurement-request-statuses
procurement-statuses
procurement-head-registry-statuses
document-types
```

#### 5.2.3 Общий формат записей справочника (DictionaryEntryDto)
```json
{
  "id": "uuid",
  "code": "CODE",
  "name": "Name",
  "isActive": true,
  "externalCode": "44501",
  "branchOfficeId": "uuid",
  "departmentId": "uuid",
  "categoryId": "uuid",
  "parentId": "uuid",
  "metaJson": { "any": "object" },
  "inn": "1234567890",
  "kpp": "987654321",
  "reliabilityScore": 10,
  "address": "Some address",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-02T00:00:00.000Z"
}
```
**Важно:** набор реально используемых полей зависит от конкретного словаря (см. конфигурацию ниже).

**Типы и ограничения (Create/Update):**
- `code`, `name`, `externalCode`, `inn`, `kpp`, `address` — string, если переданы, не должны быть пустыми.
- `isActive` — boolean (в query/body допускаются строки `\"true\"`/`\"false\"`).
- `branchOfficeId`, `departmentId`, `categoryId`, `parentId` — UUID.
- `metaJson` — объект JSON.
- `reliabilityScore` — integer >= 0.
- `null` разрешен только для полей из `nullableFields` конкретного словаря, иначе `DICTIONARY_FIELD_NULL`.

#### 5.2.4 Query параметры списка (DictionaryListQueryDto)
- `page` (int >=1, default 1)
- `pageSize` (int 1..100, default 20)
- `search` (string)
- `isActive` (boolean)
- `branchOfficeId` (UUID)
- `departmentId` (UUID)
- `categoryId` (UUID)
- `parentId` (UUID)

**Если фильтр не разрешен для конкретного словаря → `DICTIONARY_FILTER_NOT_ALLOWED`.**
**Поиск (`search`) работает по полям из `searchFields` конкретного словаря (case-insensitive, contains).**

#### 5.2.5 Ошибки справочников
- `400 DICTIONARY_ENTRY_ID_REQUIRED`
- `400 DICTIONARY_ENTRY_ID_INVALID`
- `404 DICTIONARY_ENTRY_NOT_FOUND`
- `409 DICTIONARY_ENTRY_IN_USE`
- `400 DICTIONARY_FIELD_NOT_ALLOWED`
- `400 DICTIONARY_FIELDS_REQUIRED`
- `400 DICTIONARY_FIELD_NULL`
- `400 DICTIONARY_FIELD_INVALID`
- `400 DICTIONARY_UPDATE_EMPTY`
- `400 DICTIONARY_FILTER_NOT_ALLOWED`
- `409 DICTIONARY_CODE_EXISTS`
- `409 DICTIONARY_NAME_EXISTS`
- `409 DEPARTMENT_CODE_EXISTS`
- `409 DEPARTMENT_NAME_EXISTS`
- `409 SUBCATEGORY_NAME_EXISTS`
- `404 BRANCH_OFFICE_NOT_FOUND`
- `404 DEPARTMENT_NOT_FOUND`
- `404 CATEGORY_NOT_FOUND`
- `404 BUDGET_CODE_NOT_FOUND`

#### 5.2.6 Связи и проверки
Если в теле переданы:
- `branchOfficeId` → проверяется существование филиала, иначе `BRANCH_OFFICE_NOT_FOUND`.
- `departmentId` → проверяется существование отдела, иначе `DEPARTMENT_NOT_FOUND`.
- `categoryId` → проверяется существование категории, иначе `CATEGORY_NOT_FOUND`.
- `parentId` → проверяется существование бюджетного кода, иначе `BUDGET_CODE_NOT_FOUND`.

#### 5.2.7 Конфигурация словарей (правила полей)

Формат:
- `entryIdField`: что используется в `:entryId` (`id` или `code`).
- `requiredCreate`: обязательные поля при создании.
- `allowedCreate`: поля, допустимые при создании.
- `allowedUpdate`: поля, допустимые при обновлении.
- `nullableFields`: поля, которым разрешено значение `null`.
- `searchFields`: поля поиска.
- `filterFields`: доступные фильтры в query.
- `orderBy`: сортировка списка.
- `uniqueConstraints`: уникальные ограничения + коды ошибок.
- `softDelete`: если true, `DELETE` делает `isActive=false`.

---

##### branch-offices
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`, `isActive`
- allowedUpdate: `name`, `isActive`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: `isActive`
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`
- softDelete: true

##### departments
- entryIdField: `id`
- requiredCreate: `branchOfficeId`, `code`, `name`
- allowedCreate: `branchOfficeId`, `code`, `name`, `isActive`
- allowedUpdate: `branchOfficeId`, `name`, `isActive`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: `isActive`, `branchOfficeId`
- orderBy: `name asc`
- uniqueConstraints:
  - (`branchOfficeId`, `code`) → `DEPARTMENT_CODE_EXISTS`
  - (`branchOfficeId`, `name`) → `DEPARTMENT_NAME_EXISTS`
- softDelete: true

##### positions
- entryIdField: `id`
- requiredCreate: `name`
- allowedCreate: `name`, `departmentId`, `metaJson`
- allowedUpdate: `name`, `departmentId`, `metaJson`
- nullableFields: `departmentId`, `metaJson`
- searchFields: `name`
- filterFields: `departmentId`
- orderBy: `name asc`
- uniqueConstraints: —

##### cfos
- entryIdField: `id`
- requiredCreate: `code`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: `name`
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### okato-regions
- entryIdField: `code`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### okei-units
- entryIdField: `code`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### okved2-codes
- entryIdField: `code`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### okpd2-codes
- entryIdField: `code`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### vd-codes
- entryIdField: `code`
- requiredCreate: `code`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: `name`
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### budget-codes
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`, `parentId`
- allowedUpdate: `name`, `parentId`
- nullableFields: `parentId`
- searchFields: `code`, `name`
- filterFields: `parentId`
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### categories
- entryIdField: `id`
- requiredCreate: `name`
- allowedCreate: `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `name` → `DICTIONARY_NAME_EXISTS`

##### subcategories
- entryIdField: `id`
- requiredCreate: `categoryId`, `name`
- allowedCreate: `categoryId`, `name`
- allowedUpdate: `categoryId`, `name`
- nullableFields: —
- searchFields: `name`
- filterFields: `categoryId`
- orderBy: `name asc`
- uniqueConstraints:
  - (`categoryId`, `name`) → `SUBCATEGORY_NAME_EXISTS`

##### suppliers
- entryIdField: `id`
- requiredCreate: `name`, `inn`
- allowedCreate: `name`, `inn`, `kpp`, `reliabilityScore`
- allowedUpdate: `name`, `inn`, `kpp`, `reliabilityScore`
- nullableFields: `kpp`, `reliabilityScore`
- searchFields: `name`, `inn`, `kpp`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: —

##### warehouses
- entryIdField: `id`
- requiredCreate: `name`
- allowedCreate: `name`, `address`, `code`
- allowedUpdate: `name`, `address`
- nullableFields: `address`, `code`
- searchFields: `name`, `code`, `address`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### currencies
- entryIdField: `code`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### purchase-types
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### priorities
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### procurement-methods
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`, `externalCode`, `isActive`
- allowedUpdate: `name`, `externalCode`, `isActive`
- nullableFields: `externalCode`
- searchFields: `code`, `name`, `externalCode`
- filterFields: `isActive`
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`
- softDelete: true

##### contract-types
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### purchase-object-types
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`, `isActive`
- allowedUpdate: `name`, `isActive`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: `isActive`
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`
- softDelete: true

##### procurement-purchase-types
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `code asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### tru-plan-statuses
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### tru-plan-types
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### tru-delivery-kinds
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`, `isActive`
- allowedUpdate: `name`, `isActive`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: `isActive`
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`
- softDelete: true

##### procurement-plan-statuses
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### procurement-request-statuses
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### procurement-statuses
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### procurement-head-registry-statuses
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

##### document-types
- entryIdField: `id`
- requiredCreate: `code`, `name`
- allowedCreate: `code`, `name`
- allowedUpdate: `name`
- nullableFields: —
- searchFields: `code`, `name`
- filterFields: —
- orderBy: `name asc`
- uniqueConstraints: `code` → `DICTIONARY_CODE_EXISTS`

---

## 6) Ключевые зависимости данных

- `Users.roleId` → список ролей `GET /access/roles`.
- `Users.positionId` → справочник `GET /dictionaries/positions`.
- `Departments.branchOfficeId` → справочник `branch-offices`.
- `Subcategories.categoryId` → справочник `categories`.
- `BudgetCodes.parentId` → другой `budget-codes`.
- `NomenclatureItems.okeiCode` → справочник `okei-units`.
- `NomenclatureItems.vdCode` → справочник `vd-codes`.

---

## 7) Примечания для UI

- Все запросы к защищенным ручкам должны обрабатывать `401/403` и выполнять ре‑логин или показ ошибки доступа.
- Для `refresh` и `logout` обязательно `credentials: "include"`.
- В списках учитывайте `page`, `pageSize`, `total`.
- Для словарей с `entryIdField=code` параметр `:entryId` — это `code`, а не UUID.
- Для `DELETE` в словарях с `softDelete=true` запись не удаляется физически, а помечается `isActive=false`.
