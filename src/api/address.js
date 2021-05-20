import request from "@/utils/request";

/**
 * @description 收货地址列表
 * @param {Object} data
 * */
export function getList(params) {
  return request({
    url: "/merchant/address/list",
    method: "get",
    params,
  });
}

/**
 * @description 删除收货地址
 * @param {Number} id
 * */
export function doDelete(id) {
  return request({
    url: `/merchant/address/delete/${id}`,
    method: "delete",
  });
}

/**
 * @description 收货地址详情
 * @param {Number} id
 * */
export function detail(id) {
  return request({
    url: `/merchant/address/detail/${id}`,
    method: "get",
  });
}

/**
 * @description 新增收货地址
 * @param {Object} data
 * */
export function doCreate(data) {
  return request({
    url: `/merchant/address/create`,
    method: "post",
    data,
  });
}

/**
 * @description 修改收货地址
 * @param {Object} data
 * */
export function doUpdate(id, data) {
  return request({
    url: `/merchant/address/update/${id}`,
    method: "put",
    data,
  });
}
