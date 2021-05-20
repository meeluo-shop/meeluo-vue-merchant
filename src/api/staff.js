import request from "@/utils/request";

export async function getList({ page_index, page_size, searchText }) {
  const params = {
    page_index,
    page_size,
    nickname: searchText,
    phone: searchText,
    email: searchText,
  };
  const { data } = await request({
    url: "/merchant/staff/list",
    method: "get",
    params,
  });
  data.rows.forEach((item) => {
    item.is_active = !!item.is_active;
    item.is_native = !!item.is_native;
    return item;
  });
  return data;
}

export async function setWechatUser({ id, openid }) {
  return await request({
    url: `/merchant/staff/bind_wechat_user/${id}`,
    method: "put",
    data: { openid },
  });
}

export async function setActive({ id, is_active }) {
  return await request({
    url: `/merchant/staff/active/${id}`,
    method: "put",
    data: { is_active },
  });
}

export async function doCreate(data) {
  return await request({
    url: "/merchant/staff/create",
    method: "post",
    data,
  });
}

export async function doUpdate(id, data) {
  return await request({
    url: `/merchant/staff/update/${id}`,
    method: "put",
    data,
  });
}

export async function doDelete(ids) {
  ids = Array.isArray(ids) ? ids.map(Number) : [];
  return await request({
    url: `/merchant/staff/delete`,
    method: "delete",
    data: { ids },
  });
}
