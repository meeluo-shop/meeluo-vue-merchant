import request from "@/utils/request";

export async function getToken() {
  return request({
    url: "/common/qiniu/upload/token",
    method: "get",
  });
}

export async function getResourceList(data) {
  return request({
    url: "/common/resource/list",
    method: "get",
    params: data,
  });
}

export async function upload(data) {
  return request({
    url: "/common/resource/upload",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/common/resource/delete",
    method: "delete",
    data,
  });
}

export function doMove(data) {
  return request({
    url: "/common/resource/move",
    method: "put",
    data,
  });
}

export function getGroupList(data) {
  return request({
    url: "/common/resource/group/list",
    method: "get",
    params: data,
  });
}

export function createGroup(data) {
  return request({
    url: "/common/resource/group/create",
    method: "post",
    data,
  });
}

export function updateGroup(id, data) {
  return request({
    url: `/common/resource/group/update/${id}`,
    method: "put",
    data,
  });
}

export function deleteGroup(id) {
  return request({
    url: `/common/resource/group/delete/${id}`,
    method: "delete",
  });
}
