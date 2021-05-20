/**
 * @author knows 1002563923@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from "@/router";
import store from "@/store";
import VabProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";
import { recordRoute, routesWhiteList } from "@/config/settings";

VabProgress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});
router.beforeEach(async (to, from, next) => {
  const showProgressBar = store.getters["settings/showProgressBar"];
  if (showProgressBar) VabProgress.start();
  let hasToken = store.getters["passport/token"];

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      if (showProgressBar) VabProgress.done();
    } else {
      const isIntiRouter = store.getters["routes/isInitRouter"];
      if (isIntiRouter) {
        next();
      } else {
        try {
          const accessRoutes = await store.dispatch("routes/setRoutes", []);
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (err) {
          store.commit("passport/clearToken");
          if (showProgressBar) VabProgress.done();
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (recordRoute)
        next({ path: "/login", query: { redirect: to.path }, replace: true });
      else next({ path: "/login", replace: true });
      if (showProgressBar) VabProgress.done();
    }
  }
  document.title = getPageTitle(to.meta.title);
});
router.afterEach(() => {
  const showProgressBar = store.getters["settings/showProgressBar"];
  if (showProgressBar) VabProgress.done();
});
