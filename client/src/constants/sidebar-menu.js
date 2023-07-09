//import DashboardIcon from '../assets/icons/dashboard.svg';
import sharingBlack from "../assets/icons/sharing-black.png";
import userIcon from "../assets/icons/user.png";
import chartIcon from "../assets/icons/chart.png";
import triangleIcon from "../assets/icons/triangle.png";

const sidebar_menu = [
  /* {
    id: 1,
    icon: DashboardIcon,
    path: "/",
    title: "Dashboard",
  }, */
  {
    id: 1,
    onlyAdmins: true,
    icon: chartIcon,
    path: "/dashboard",
    title: "Dashboard",
  },

  /*   {
    id: 2,
    onlyAdmins: true,
    icon: sharingBlack,
    path: "/users",
    title: "Usuários",
  }, */
  {
    id: 3,
    onlyAdmins: false,
    icon: sharingBlack,
    path: "/voluntarios",
    title: "Voluntários",
  },
  /*   {
    id: 3,
    icon: SharingBlack,
    path: "/loginadm",
    title: "Login Adm",
  },

  {
    id: 4,
    onlyAdmins: false,
    icon: triangleIcon,
    path: "/areas",
    title: "Áreas",
  },
  {
    id: 5,
    onlyAdmins: false,
    icon: userIcon,
    path: "/user",
    title: "Usuário",
  }, */
];

export default sidebar_menu;
