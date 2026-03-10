export const menuLists = [
  {
    id: "users",
    label: "Пользователи",
    to: "/users",
    icon: "../../public/пользователи.png",
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
    icon: "../../public/доступы.png",
  },
  {
    id: "kb",
    label: "База знаний",
    items: [
      { id: "nomenclature", label: "Номенклатура", to: "/nomenclaturePage" },
      { id: "guides", label: "Справочники", to: "/guidePage" },
    ],
    icon: "../public/база знаний.png",
  },
];
