/**
 * @author knows 1002563923@qq.com
 * @description tagsBar多标签页逻辑，前期借鉴了很多开源项目发现都有个共同的特点很繁琐并不符合框架设计的初衷，后来在github用户cyea的启发下完成了重构，请勿修改
 */

const state = {
  visitedRoutes: [],
};
const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
};
const mutations = {
  addVisitedRoute(state, route) {
    let target = state.visitedRoutes.find((item) => item.path === route.path);
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route);
      return;
    }
    state.visitedRoutes.push(Object.assign({}, route));
  },
  delVisitedRoute(state, route) {
    state.visitedRoutes.forEach((item, index) => {
      if (item.path === route.path) {
        state.visitedRoutes.splice(index, 1);
      }
    });
  },
  delOthersVisitedRoute(state, route) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      return item.meta.affix || item.path === route.path;
    });
  },
  delLeftVisitedRoute(state, route) {
    let index = state.visitedRoutes.length;
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) {
        index = state.visitedRoutes.indexOf(item);
      }
      return item.meta.affix || index <= state.visitedRoutes.indexOf(item);
    });
  },
  delRightVisitedRoute(state, route) {
    let index = state.visitedRoutes.length;
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) {
        index = state.visitedRoutes.indexOf(item);
      }
      return item.meta.affix || index >= state.visitedRoutes.indexOf(item);
    });
  },
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix);
  },
};
const actions = {
  addVisitedRoute({ commit }, route) {
    commit("addVisitedRoute", route);
  },
  delVisitedRoute({ commit }, route) {
    commit("delVisitedRoute", route);
  },
  delOthersVisitedRoute({ commit }, route) {
    commit("delOthersVisitedRoute", route);
  },
  delLeftVisitedRoute({ commit }, route) {
    commit("delLeftVisitedRoute", route);
  },
  delRightVisitedRoute({ commit }, route) {
    commit("delRightVisitedRoute", route);
  },
  delAllVisitedRoutes({ commit }) {
    commit("delAllVisitedRoutes");
  },
};
export default { state, getters, mutations, actions };
