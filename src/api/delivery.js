import request from "@/utils/request";

/**
 * @description 运费模板列表
 * @param {Object} data
 * */
export function getList(data) {
  return request({
    url: "/merchant/delivery/list",
    method: "get",
    params: data,
  });
}

/**
 * @description 删除运费模板
 * @param {Number} id
 * */
export function doDelete(id) {
  return request({
    url: `/merchant/delivery/delete/${id}`,
    method: "delete",
  });
}

/**
 * @description 运费模板详情
 * @param {Number} id
 * */
export function detail(id) {
  return request({
    url: `/merchant/delivery/detail/${id}`,
    method: "get",
  });
}

/**
 * @description 新增运费模板
 * @param {Object} data
 * */
export function doCreate(data) {
  return request({
    url: `/merchant/delivery/create`,
    method: "post",
    data,
  });
}

/**
 * @description 修改运费模板
 * @param {Object} data
 * */
export function doUpdate(id, data) {
  return request({
    url: `/merchant/delivery/update/${id}`,
    method: "put",
    data,
  });
}

export function getExpressList() {
  return request({
    url: `/merchant/order/express/list`,
    method: "get",
  });
}

export function getSetting() {
  return request({
    url: "/merchant/delivery/setting",
    method: "get",
  });
}

export function editSetting(data) {
  return request({
    url: "/merchant/delivery/setting",
    method: "put",
    data,
  });
}
