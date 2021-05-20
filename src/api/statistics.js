import request from "@/utils/request";

export async function getBaseCount(data = {}) {
  const { start_time, end_time } = data;
  return request({
    url: "/merchant/statistics/base_count",
    method: "get",
    params: {
      start_time,
      end_time,
    },
  });
}

export async function getSalesVolume(data = {}) {
  const { start_time, end_time } = data;
  return request({
    url: "/merchant/statistics/sales_volume",
    method: "get",
    params: {
      start_time,
      end_time,
    },
  });
}
