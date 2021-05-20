import request from "@/utils/request";

export function getAttendant() {
  return request({
    url: "/merchant/attendant/setting",
    method: "get",
  });
}

export function setAttendant(data) {
  return request({
    url: "/merchant/attendant/setting",
    method: "put",
    data,
  });
}
