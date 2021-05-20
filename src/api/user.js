import request from "@/utils/request";

export async function getList({
  page_index,
  page_size,
  wechat_name,
  phone,
  grade_id,
}) {
  const { data } = await request({
    url: "/merchant/user/list",
    method: "get",
    params: { page_index, page_size, wechat_name, phone, grade_id },
  });
  return data;
}

export async function doUserActive({ id, is_active }) {
  return request({
    url: `/merchant/user/active/${id}`,
    method: "put",
    data: {
      is_active,
    },
  });
}

export async function doUserUpdate(id, data) {
  return request({
    url: `/merchant/user/update/${id}`,
    method: "put",
    data,
  });
}

export async function doUserRecharge({ user_id, money, type, scene, remark }) {
  return request({
    url: `/merchant/user/balance/modify`,
    method: "put",
    data: {
      user_id,
      money,
      type,
      scene,
      remark,
    },
  });
}

export async function getUserBalanceLog({
  start_time,
  end_time,
  scene,
  nickname,
  user_id,
  page_size,
  page_index,
  type,
}) {
  return request({
    url: `/merchant/user/balance/log`,
    method: "get",
    params: {
      start_time,
      end_time,
      scene,
      nickname,
      user_id,
      type,
      page_size,
      page_index,
    },
  });
}
