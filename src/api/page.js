import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/merchant/page/list",
    method: "get",
    params,
  });
}

export async function getDetail(id) {
  const { data } = await request({
    url: `/merchant/page/detail/${id}`,
    method: "get",
  });
  try {
    data.data = JSON.parse(data.data);
  } catch (err) {
    console.log(data.data);
    console.error(err);
    data.data = null;
  }
  return data;
}

export function doCreate(data) {
  return request({
    url: "/merchant/page/create",
    method: "post",
    data,
  });
}

export function doUpdate(id, data) {
  return request({
    url: `/merchant/page/update/${id}`,
    method: "put",
    data,
  });
}

export function setType(id, type) {
  return request({
    url: `/merchant/page/set_type/${id}`,
    method: "put",
    data: {
      type,
    },
  });
}

export function doDelete(id) {
  return request({
    url: `/merchant/page/delete/${id}`,
    method: "delete",
  });
}
