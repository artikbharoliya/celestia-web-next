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
    title: "Downloads",
    link: "/downloads",
    type: NavType.None,
  },
  {
    title: "Inspiration",
    link: "/inspiration",
    type: NavType.None,
  }
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
  // {
  //   title: "Resources",
  //   link: "",
  //   type: NavType.Dropdown,
  //   dropdownList: documentDropdownList,
  // },
  // {
  //   title: "Projects",
  //   link: "",
  //   type: NavType.None,
  // },
  {
    title: "Contact Us",
    link: "/contact",
    type: NavType.None,
  },
];