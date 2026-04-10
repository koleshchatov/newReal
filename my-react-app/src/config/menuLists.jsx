import accessIcon from "../assets/icons/access.png";
import kbIcon from "../assets/icons/knowledge-base.png";
import usersIcon from "../assets/icons/users.png";

export const menuLists = [
  {
    id: "users",
    label: "Пользователи",
    to: "/users",
    icon: usersIcon,
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
    icon: accessIcon,
  },
  {
    id: "kb",
    label: "База знаний",
    items: [
      { id: "nomenclature", label: "Номенклатура", to: "/nomenclaturePage" },
      { id: "guides", label: "Справочники", to: "/guidePage" },
    ],
    icon: kbIcon,
  },
];
