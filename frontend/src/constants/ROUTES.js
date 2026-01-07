
export { ROUTES, NAV_NAMES };

const ROUTES = {
  HOME: '/',
};

// Object syntax - not suitable.
// const NAV_NAMES = {
//   [ROUTES.HOME]: "Home",
// };

// Needs to be an array:
const NAV_NAMES = [
  { path: ROUTES.HOME, name: "Home" },
];

