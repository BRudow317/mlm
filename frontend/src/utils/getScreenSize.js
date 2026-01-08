/**
 * @Description Get the current screen size category.
 * 
 * @returns {string} - One of 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl', or 'unknown'.
 * 
 * @example
 * const screenSize = getScreenSize();
 * if (screenSize === 'md') {
 *   // Do something for medium screens
 * }
 * 
 */

export { getScreenSize };
const getScreenSize = () => {
  if (window.matchMedia("(width <= 480px)").matches) return "xsm";
  else if (window.matchMedia("(480px < width <= 720px)").matches) return "sm";
  else if (window.matchMedia("(720px < width <= 960px)").matches) return "md";
  else if (window.matchMedia("(960px < width <= 1200px)").matches) return "lg";
  else if (window.matchMedia("(1200px < width <= 1600px)").matches) return "xl";
  else if (window.matchMedia("(width > 1600px)").matches) return "xxl";
  else return "unknown";
};