import request from "@/utils/request";

export async function getList(data) {
  return await request({
    url: "/merchant/recharge/plan/list",
    method: "get",
    params: data,
  });
}

export async function getDetail(id) {
  return await request({
    url: `/merchant/recharge/plan/detail/${id}`,
    method: "get",
  });
}

export async function doCreate(data) {
  return await request({
    url: "/merchant/recharge/plan/create",
    method: "post",
    data,
  });
}

export async function doDelete(data) {
  return await request({
    url: "/merchant/recharge/plan/delete",
    method: "delete",
    data,
  });
}

export function doEdit(id, data) {
  return request({
    url: `/merchant/recharge/plan/update/${id}`,
    method: "put",
    data,
  });
}

export function getSetting() {
  return request({
    url: "/merchant/recharge/setting",
    method: "get",
  });
}

export function editSetting(data) {
  return request({
    url: "/merchant/recharge/setting",
    method: "put",
    data,
  });
}
