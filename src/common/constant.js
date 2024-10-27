export const NavType = {
  Dropdown: "dropdown",
  None: "none",
};

const projectDropdownList = [
  {
    title: "Arlies",
    link: "/products/arlies",
    type: NavType.None,
  },
  {
    title: "Lynx",
    link: "/products/lynx",
    type: NavType.None,
  },
  {
    title: "Orion",
    link: "/products/orion",
    type: NavType.None,
  },
];
const documentDropdownList = [
  {
    title: "Certification",
    link: "/documents/certificates",
    type: NavType.None,
  },
  {
    title: "Datasheets",
    link: "/documents/data-sheet",
    type: NavType.None,
  },
  {
    title: "Installation",
    link: "/documents/installation",
    type: NavType.None,
  },
];
export const NavList = [
  {
    title: "Home",
    link: "/",
    type: NavType.None,
  },
  {
    title: "Product",
    link: "/product",
    type: NavType.Dropdown,
    dropdownList: projectDropdownList,
  },
  {
    title: "Downloads",
    link: "",
    type: NavType.Dropdown,
    dropdownList: documentDropdownList,
  },
  {
    title: "Projects",
    link: "",
    type: NavType.None,
  },
  {
    title: "Contact Us",
    link: "/contact",
    type: NavType.None,
  },
];