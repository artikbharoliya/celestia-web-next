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
  {
    title: "Nexis",
    link: "/products/nexis",
    type: NavType.None,
  },
];
// The logo links home; About points to the existing homepage introduction.
export const NavList = [
  {
    title: "Products",
    link: "/products",
    type: NavType.Dropdown,
    dropdownList: projectDropdownList,
  },
  { title: "Projects", link: "/projects", type: NavType.None },
  { title: "About", link: "/#about", type: NavType.None },
  { title: "Contact", link: "/contact", type: NavType.None },
];
