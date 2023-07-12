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
    icon:' <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="currentColor"><path fill-rule="evenodd" d="M14.254 1.365c-1.096-.306-2.122.024-2.851.695c-.719.66-1.153 1.646-1.153 2.7v6.695a2.295 2.295 0 0 0 2.295 2.295h6.694c1.055 0 2.042-.434 2.701-1.153c.67-.729 1.001-1.755.695-2.851a12.102 12.102 0 0 0-8.38-8.381ZM11.75 4.76c0-.652.27-1.232.668-1.597c.386-.355.886-.508 1.433-.355c3.55.991 6.349 3.79 7.34 7.34c.153.548 0 1.048-.355 1.434c-.365.397-.945.667-1.597.667h-6.694a.795.795 0 0 1-.795-.795V4.761Z" clip-rule="evenodd"/><path d="M8.672 4.716a.75.75 0 0 0-.45-1.432C4.183 4.554 1.25 8.328 1.25 12.79c0 5.501 4.46 9.961 9.96 9.961c4.462 0 8.236-2.932 9.505-6.973a.75.75 0 1 0-1.43-.45a8.465 8.465 0 0 1-8.074 5.923a8.46 8.46 0 0 1-8.461-8.46a8.465 8.465 0 0 1 5.922-8.074Z"/></g></svg>',
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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M28.4 124.8a6 6 0 0 0 8.4-1.2a54 54 0 0 1 86.4 0a6 6 0 0 0 8.4 1.19a5.59 5.59 0 0 0 1.19-1.19a54 54 0 0 1 86.4 0a6 6 0 0 0 9.6-7.21a65.74 65.74 0 0 0-29.69-22.26a38 38 0 1 0-46.22 0A65.32 65.32 0 0 0 128 110.7a65.32 65.32 0 0 0-24.89-16.57a38 38 0 1 0-46.22 0A65.69 65.69 0 0 0 27.2 116.4a6 6 0 0 0 1.2 8.4ZM176 38a26 26 0 1 1-26 26a26 26 0 0 1 26-26Zm-96 0a26 26 0 1 1-26 26a26 26 0 0 1 26-26Zm119.11 160.13a38 38 0 1 0-46.22 0A65.32 65.32 0 0 0 128 214.7a65.32 65.32 0 0 0-24.89-16.57a38 38 0 1 0-46.22 0A65.69 65.69 0 0 0 27.2 220.4a6 6 0 1 0 9.6 7.2a54 54 0 0 1 86.4 0a6 6 0 0 0 8.4 1.19a5.59 5.59 0 0 0 1.19-1.19a54 54 0 0 1 86.4 0a6 6 0 0 0 9.6-7.21a65.74 65.74 0 0 0-29.68-22.26ZM80 142a26 26 0 1 1-26 26a26 26 0 0 1 26-26Zm96 0a26 26 0 1 1-26 26a26 26 0 0 1 26-26Z"/></svg>',
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
