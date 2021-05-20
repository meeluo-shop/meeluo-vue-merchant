import request from "@/utils/request";

/**
 * @description 商品列表
 * @param {Object} data
 * */
export async function getList(params, ids) {
  console.log(params);
  const data = Array.isArray(ids) ? { ids } : {};
  const resp = await request({
    url: "/merchant/goods/list",
    method: "post",
    params,
    data,
  });
  resp.data.rows.forEach((item) => {
    item.is_active = !!item.is_active;
    if (item.skus && item.skus.length > 1) {
      item.skus = item.skus.sort((a, b) => a.price - b.price);
    }
    return item;
  });

  return resp;
}
/**
 * @description 获取商品详情
 * @param {Number} id
 * */
export function getDetail(id) {
  return request({
    url: `/merchant/goods/detail/${id}`,
    method: "get",
  });
}
/**
 * @description 创建商品
 * @param {Object} data
 * */
export function create(data) {
  return request({
    url: "/merchant/goods/create",
    method: "post",
    data,
  });
}
/**
 * @description 更新商品
 * @param {Number} id
 * @param {Object} data
 * */
export function doEdit(id, data) {
  return request({
    url: `/merchant/goods/update/${id}`,
    method: "put",
    data,
  });
}
/**
 * @description 删除商品
 * @param {Number} id
 * */
export function doDelete(id) {
  return request({
    url: `/merchant/goods/delete/${id}`,
    method: "delete",
  });
}
export async function setActive({ id, is_active }) {
  return await request({
    url: `/merchant/goods/active/${id}`,
    method: "put",
    data: { is_active },
  });
}
/**
 * @description 添加规格
 * @param {Object} data
 * */
export function addSpec(data) {
  return request({
    url: `/merchant/goods/spec/create`,
    method: "post",
    data,
  });
}

/**
 * @description 商品分类数据接口，获取分类列表
 * @param {Object} data
 * */
export function getCategoryList(data) {
  return request({
    url: "/merchant/goods/category/list",
    method: "get",
    params: data,
  });
}
/**
 * @description 商品分类数据接口，获取分类详情
 * @param {Number} id
 * */
export function getCategoryDetail(id) {
  return request({
    url: `/merchant/goods/category/detail/${id}`,
    method: "get",
  });
}
/**
 * @description 商品分类数据接口，创建分类
 * @param {Object} data
 * */
export function createCategory(data) {
  return request({
    url: "/merchant/goods/category/create",
    method: "post",
    data,
  });
}
/**
 * @description 商品分类数据接口，更新分类
 * @param {Number} id
 * @param {Object} data
 * */
export function doEditCategory(id, data) {
  return request({
    url: `/merchant/goods/category/update/${id}`,
    method: "put",
    data,
  });
}
/**
 * @description 商品分类数据接口，删除分类
 * @param {Number} id
 * */
export function doDeleteCategory(id) {
  return request({
    url: `/merchant/goods/category/delete/${id}`,
    method: "delete",
  });
}
