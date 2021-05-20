import request from "@/utils/request";

export function getTableList(data) {
  return request({
    url: "/merchant/table/list",
    method: "get",
    params: data,
  });
}

export function getTableDetail(id) {
  return request({
    url: `/merchant/table/detail/${id}`,
    method: "get",
  });
}

export function createTable(data) {
  return request({
    url: "/merchant/table/create",
    method: "post",
    data,
  });
}

export function updateTable(id, data) {
  return request({
    url: `/merchant/table/update/${id}`,
    method: "put",
    data,
  });
}

export function deleteTable(id) {
  return request({
    url: `/merchant/table/delete/${id}`,
    method: "delete",
  });
}

export function printTableQRCode(id) {
  return request({
    url: `/merchant/table/print/qrcode/${id}`,
    method: "post",
  });
}
