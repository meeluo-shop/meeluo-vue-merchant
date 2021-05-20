import request from "@/utils/request";

export async function getMenuOrders(params) {
  const rep = await request({
    url: "/merchant/menu/order/list",
    method: "get",
    params,
  });
  return rep;
}

export async function getOrderInfo(id) {
  const rep = await request({
    url: `/merchant/menu/order/detail/${id}`,
    method: "get",
  });
  return rep;
}

export async function agreeCancelOrder(order_id) {
  const rep = await request({
    url: `/merchant/menu/order/agree_cancel/${order_id}`,
    method: "put",
  });
  return rep;
}

export async function refuseCancelOrder(order_id) {
  const rep = await request({
    url: `/merchant/menu/order/refuse_cancel/${order_id}`,
    method: "put",
  });
  return rep;
}

export async function completeOrder(id) {
  const rep = await request({
    url: `/merchant/menu/order/complete/${id}`,
    method: "put",
  });
  return rep;
}

export async function orderGoodsServing(data) {
  const rep = await request({
    url: `/merchant/menu/order/serving`,
    method: "put",
    data,
  });
  return rep;
}

export async function getOrderLogisics() {
  const rep = await request({
    url: "/merchant/menu/setting/order",
    method: "get",
  });
  return rep;
}

export async function updataOrderLogisics(data) {
  const rep = await request({
    url: "/merchant/menu/setting/order",
    method: "put",
    data,
  });
  return rep;
}

export async function getOrderPayTypeSetting() {
  const rep = await request({
    url: "/merchant/menu/setting/pay_type",
    method: "get",
  });
  return rep;
}

export async function setOrderPayTypeSetting(data) {
  const rep = await request({
    url: "/merchant/menu/setting/pay_type",
    method: "put",
    data,
  });
  return rep;
}

export async function updateOrderPrice({ order_id, price }) {
  const rep = await request({
    url: `/merchant/menu/order/update_price/${order_id}`,
    method: "put",
    data: { price },
  });
  return rep;
}

export async function printOrder(order_id) {
  const rep = await request({
    url: `/merchant/menu/order/print/${order_id}`,
    method: "post",
  });
  return rep;
}

export async function setOrderPaid(order_id) {
  const rep = await request({
    url: `/merchant/menu/order/paid/${order_id}`,
    method: "put",
  });
  return rep;
}

export async function submitOrder({
  table_id,
  pay_type,
  people,
  goods_skus,
  user_id,
}) {
  const rep = await request({
    url: `/merchant/menu/order/submit`,
    method: "post",
    data: { table_id, pay_type, people, goods_skus, user_id },
  });
  return rep;
}
