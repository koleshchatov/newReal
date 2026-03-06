export const menuLists = [
  {
    id: "users",
    label: "Пользователи",
    to: "/users",
  },
  {
    id: "access",
    label: "Доступы",
    items: [
      { id: "roles", label: "Роли", to: "/rolePage" },
      { id: "permissions", label: "Возможности", to: "/opportunitiesPage" },
      {
        id: "accessMatrix",
        label: "Матрица доступов",
        to: "/accessMatrixPage",
      },
    ],
  },
  {
    id: "kb",
    label: "База знаний",
    items: [
      { id: "nomenclature", label: "Номенклатура", to: "/nomenclaturePage" },
      { id: "guides", label: "Справочники", to: "/guidePage" },
    ],
  },
];
