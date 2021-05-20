import router from "@/router";
import path from "path";
import { isExternal } from "@/utils/validate";

export function filterRoutes(routes, baseUrl = "/") {
  return routes.map((route) => {
    if (route.path !== "*" && !isExternal(route.path))
      route.path = path.resolve(baseUrl, route.path);
    route.fullPath = route.path;
    if (route.children)
      route.children = filterRoutes(route.children, route.fullPath);
    return route;
  });
}

/**
 * 根据当前页面firstMenu
 * @returns {string}
 */
export function handleFirstMenu() {
  const firstMenu = router.currentRoute.matched[0].path;
  if (firstMenu === "") return "/";
  return firstMenu;
}
