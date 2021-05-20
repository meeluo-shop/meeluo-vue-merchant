/**
 * @author knows 1002563923@qq.com
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import defaultSettings from "@/config/settings";
import { isJson } from "@/utils/validate";

const {
  logo,
  layout,
  header,
  themeName,
  showProgressBar,
  showRefresh,
  showSearch,
  showTheme,
  showTagsBar,
  showNotice,
  showFullScreen,
} = defaultSettings;

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (isJson(value)) {
    return JSON.parse(value);
  } else {
    return false;
  }
};

const theme = getLocalStorage("theme");
const { collapse } = getLocalStorage("collapse");
const toggleBoolean = (key) => {
  return typeof theme[key] !== "undefined" ? theme[key] : key;
};

const state = {
  logo,
  collapse,
  themeName: theme.themeName || themeName,
  layout: theme.layout || layout,
  header: theme.header || header,
  device: "desktop",
  showProgressBar: toggleBoolean(showProgressBar),
  showRefresh: toggleBoolean(showRefresh),
  showSearch: toggleBoolean(showSearch),
  showTheme: toggleBoolean(showTheme),
  showTagsBar: toggleBoolean(showTagsBar),
  showNotice: toggleBoolean(showNotice),
  showFullScreen: toggleBoolean(showFullScreen),
};
const getters = {
  collapse: (state) => state.collapse,
  device: (state) => state.device,
  header: (state) => state.header,
  layout: (state) => state.layout,
  logo: (state) => state.logo,
  showProgressBar: (state) => state.showProgressBar,
  showRefresh: (state) => state.showRefresh,
  showSearch: (state) => state.showSearch,
  showTheme: (state) => state.showTheme,
  showTagsBar: (state) => state.showTagsBar,
  showNotice: (state) => state.showNotice,
  showFullScreen: (state) => state.showFullScreen,
  themeName: (state) => state.themeName,
};
const mutations = {
  toggleCollapse(state) {
    state.collapse = !state.collapse;
    localStorage.setItem("collapse", `{"collapse":${state.collapse}}`);
  },
  toggleDevice(state, device) {
    state.device = device;
  },
  changeHeader(state, header) {
    state.header = header;
  },
  changeLayout(state, layout) {
    state.layout = layout;
  },
  handleShowProgressBar(state, showProgressBar) {
    state.showProgressBar = showProgressBar;
  },
  handleShowRefresh(state, showRefresh) {
    state.showRefresh = showRefresh;
  },
  handleShowSearch(state, showSearch) {
    state.showSearch = showSearch;
  },
  handleShowTheme(state, showTheme) {
    state.showTheme = showTheme;
  },
  handleShowTagsBar(state, showTagsBar) {
    state.showTagsBar = showTagsBar;
  },
  handleShowNotice(state, showNotice) {
    state.showNotice = showNotice;
  },
  handleShowFullScreen(state, showFullScreen) {
    state.showFullScreen = showFullScreen;
  },
  openSideBar(state) {
    state.collapse = false;
  },
  foldSideBar(state) {
    state.collapse = true;
  },
};
const actions = {
  toggleCollapse({ commit }) {
    commit("toggleCollapse");
  },
  toggleDevice({ commit }, device) {
    commit("toggleDevice", device);
  },
  changeHeader({ commit }, header) {
    commit("changeHeader", header);
  },
  changeLayout({ commit }, layout) {
    commit("changeLayout", layout);
  },
  handleShowProgressBar: ({ commit }, showProgressBar) => {
    commit("handleShowProgressBar", showProgressBar);
  },
  handleShowRefresh: ({ commit }, showRefresh) => {
    commit("handleShowRefresh", showRefresh);
  },
  handleShowSearch: ({ commit }, showSearch) => {
    commit("handleShowSearch", showSearch);
  },
  handleShowTheme: ({ commit }, showTheme) => {
    commit("handleShowTheme", showTheme);
  },
  handleShowTagsBar({ commit }, showTagsBar) {
    commit("handleShowTagsBar", showTagsBar);
  },
  handleShowNotice: ({ commit }, showNotice) => {
    commit("handleShowNotice", showNotice);
  },
  handleShowFullScreen: ({ commit }, showFullScreen) => {
    commit("handleShowFullScreen", showFullScreen);
  },
  openSideBar({ commit }) {
    commit("openSideBar");
  },
  foldSideBar({ commit }) {
    commit("foldSideBar");
  },
};
export default { state, getters, mutations, actions };
