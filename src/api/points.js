import request from "@/utils/request";

export function getSetting() {
  return request({
    url: "/merchant/points/setting",
    method: "get",
  });
}

export function editSetting(data) {
  return request({
    url: "/merchant/points/setting",
    method: "put",
    data,
  });
}

export function getPointsLog({
  start_time,
  end_time,
  nickname,
  user_id,
  type,
  page_size,
  page_index,
}) {
  return request({
    url: "/merchant/points/log",
    method: "get",
    params: {
      start_time,
      end_time,
      nickname,
      user_id,
      type,
      page_size,
      page_index,
    },
  });
}
