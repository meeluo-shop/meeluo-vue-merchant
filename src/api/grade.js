import request from "@/utils/request";

export async function getList(data) {
  return await request({
    url: "/merchant/user/grade/list",
    method: "get",
    params: data,
  });
}

export async function create(data) {
  return await request({
    url: "/merchant/user/grade/create",
    method: "post",
    data,
  });
}

export async function doEdit(id, data) {
  return await request({
    url: `/merchant/user/grade/update/${id}`,
    method: "put",
    data,
  });
}

export function getDetail(id) {
  return request({
    url: `/merchant/user/grade/detail/${id}`,
    method: "get",
  });
}

export function doDelete(id) {
  return request({
    url: `/merchant/user/grade/delete/${id}`,
    method: "delete",
  });
}
