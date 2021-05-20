import request from "@/utils/request";

export async function getDetail() {
  return await request({
    url: `/merchant/detail`,
    method: "get",
  });
}

export async function doEdit(data) {
  return await request({
    url: "/merchant/update",
    method: "put",
    data,
  });
}
