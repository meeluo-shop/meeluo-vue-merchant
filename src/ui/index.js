import Vue from "vue";

// 加载图标
import "./icon";
// 加载样式
import "./styles/vab.scss";
import sortablejs from "sortablejs";
import { Draggable } from "@/extra/Draggable";

// 加载组件
const requireComponent = require.context("./components", true, /\.vue$/);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = componentConfig.default.name;
  Vue.component(componentName, componentConfig.default || componentConfig);
});
const draggable = Draggable(sortablejs);
Vue.component("draggable", draggable);

// 加载插件
const requirePlugin = require.context("./plugins", true, /\.js$/);
requirePlugin.keys().forEach((fileName) => {
  requirePlugin(fileName);
});
