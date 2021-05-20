import request from "@/utils/request";

/**
 * @description 优惠券列表
 * @param {Object} params
 * */
export async function getList(params) {
  const resp = await request({
    url: "/merchant/coupon/list",
    method: "get",
    params,
  });
  resp.data.rows.forEach((item) => (item.discount = item.discount / 10));
  return resp;
}

export function getDetail(id) {
  return request({
    url: `/merchant/coupon/detail/${id}`,
    method: "get",
  });
}

export function doCreate(data) {
  data.discount = data.discount * 10;
  if (data.start_time) {
    data.start_time = new Date(data.start_time).getTime();
  } else {
    delete data.start_time;
  }
  if (data.end_time) {
    data.end_time = new Date(data.end_time).getTime();
  } else {
    delete data.end_time;
  }
  return request({
    url: `/merchant/coupon/create`,
    method: "post",
    data,
  });
}

export function doUpdate(id, data) {
  data.discount = data.discount * 10;
  if (data.start_time) {
    data.start_time = new Date(data.start_time).getTime();
  } else {
    delete data.start_time;
  }
  if (data.end_time) {
    data.end_time = new Date(data.end_time).getTime();
  } else {
    delete data.end_time;
  }
  return request({
    url: `/merchant/coupon/update/${id}`,
    method: "put",
    data,
  });
}

export function doDelete(id) {
  return request({
    url: `/merchant/coupon/delete/${id}`,
    method: "delete",
  });
}

export function getReceiveList(params) {
  return request({
    url: `/merchant/coupon/grant/list`,
    method: "get",
    params,
  });
}

export function grantUser({ coupon_id, grant_num, merchant_user_id }) {
  return request({
    url: `/merchant/coupon/grant`,
    method: "post",
    data: {
      coupon_id,
      grant_num,
      merchant_user_id,
    },
  });
}
