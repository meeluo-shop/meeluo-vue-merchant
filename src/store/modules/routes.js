/**
 * @author knows 1002563923@qq.com
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import store from "@/store";
import { asyncRoutes, constantRoutes } from "@/router";
import { filterRoutes } from "@/utils/routes";

const state = { isInitRouter: false, routes: [], partialRoutes: [] };
const getters = {
  isInitRouter: (state) => state.isInitRouter,
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
};
const mutations = {
  setRoutes(state, routes) {
    state.isInitRouter = true;
    state.routes = routes;
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes;
  },
  resetIsInitRouter(state) {
    state.isInitRouter = false;
  },
};
const actions = {
  async setRoutes({ commit }) {
    const merchant = store.getters["passport/merchant"];
    if (!merchant.allow_private_wechat) {
      for (const index in asyncRoutes) {
        if (asyncRoutes[index].name === "Wechat") {
          asyncRoutes.splice(index, 1);
          break;
        }
      }
    }
    if (merchant.type !== 20) {
      for (const index in asyncRoutes) {
        if (asyncRoutes[index].name === "Restaurant") {
          asyncRoutes.splice(index, 1);
          break;
        }
      }
    }
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes]);
    commit("setRoutes", finallyRoutes);
    return [...asyncRoutes];
  },
  setPartialRoutes({ commit }, accessedRoutes) {
    commit("setPartialRoutes", accessedRoutes);
  },
};
export default { state, getters, mutations, actions };
