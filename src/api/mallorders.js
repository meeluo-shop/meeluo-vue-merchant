import request from "@/utils/request";

export async function getMallOrders(params) {
  const rep = await request({
    url: "/merchant/order/list",
    method: "get",
    params,
  });
  return rep;
}

export async function getOrderInfo(id) {
  const rep = await request({
    url: `/merchant/order/detail/${id}`,
    method: "get",
  });
  return rep;
}

export async function agreeCancelOrder(order_id) {
  const rep = await request({
    url: `/merchant/order/agree_cancel/${order_id}`,
    method: "put",
  });
  return rep;
}

export async function refuseCancelOrder(order_id) {
  const rep = await request({
    url: `/merchant/order/refuse_cancel/${order_id}`,
    method: "put",
  });
  return rep;
}
