import request from "@/utils/request";

export async function getGameList(params) {
  const resp = await request({
    url: "/merchant/game/list",
    method: "post",
    params,
  });
  resp.data.rows.forEach((item) => {
    item.merchant_game.is_active = !!item.merchant_game.is_active;
  });
  return resp;
}

export async function getGameDetail(id) {
  const resp = await request({
    url: `/merchant/game/detail/${id}`,
    method: "get",
  });
  return resp;
}

export async function setGameSession(id) {
  const resp = await request({
    url: `/merchant/game/session/${id}`,
    method: "post",
  });
  return resp;
}

export async function getGameActivityDetail(id) {
  const resp = await request({
    url: `/merchant/game/activity/detail/${id}`,
    method: "get",
  });
  return resp;
}

export async function getGameCategoryList(params) {
  const resp = await request({
    url: "/merchant/game/category/list",
    method: "get",
    params,
  });
  return resp;
}

export async function doGameActive({ id, is_active }) {
  return request({
    url: `/merchant/game/active/${id}`,
    method: "put",
    data: {
      is_active,
    },
  });
}

export async function checkActivity(id) {
  return request({
    url: `/merchant/game/activity/check/${id}`,
    method: "get",
  });
}

export async function doGameUpdate(id, data) {
  return request({
    url: `/merchant/game/update/${id}`,
    method: "put",
    data,
  });
}

export async function getActivityList(params) {
  const resp = await request({
    url: "/merchant/game/activity/list",
    method: "get",
    params,
  });
  return resp;
}

export async function createActivity(data) {
  const resp = await request({
    url: "/merchant/game/activity/create",
    method: "post",
    data,
  });
  return resp;
}

export async function updateActivity(id, data) {
  const resp = await request({
    url: `/merchant/game/activity/update/${id}`,
    method: "put",
    data,
  });
  return resp;
}

export async function deleteActivity(id, data) {
  const resp = await request({
    url: `/merchant/game/activity/delete/${id}`,
    method: "delete",
    data,
  });
  return resp;
}

export async function getGamePrizeList(params) {
  const resp = await request({
    url: "/merchant/game/prize/list",
    method: "get",
    params,
  });
  return resp;
}

export async function getGameListByIds(ids) {
  const resp = await request({
    url: "/merchant/game/list",
    method: "post",
    data: {
      ids,
    },
    params: {
      page_size: ids.length,
    },
  });
  return resp;
}

export async function getPrizeSetting() {
  return await request({
    url: "/merchant/game/prize/setting",
    method: "get",
  });
}

export async function setPrizeSetting(data) {
  return await request({
    url: "/merchant/game/prize/setting",
    method: "put",
    data,
  });
}

export async function getInviteList(params) {
  return await request({
    url: "/merchant/game/invite_list",
    method: "get",
    params,
  });
}

export async function getOrderList(params) {
  return await request({
    url: "/merchant/game/order_list",
    method: "get",
    params,
  });
}
