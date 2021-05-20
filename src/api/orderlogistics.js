import request from "@/utils/request";

export async function getOrderLogisics() {
  const rep = await request({
    url: "/merchant/order/setting",
    method: "get",
  });
  return rep;
}

export async function updataOrderLogisics(data) {
  const rep = await request({
    url: "/merchant/order/setting",
    method: "put",
    data,
  });
  return rep;
}

export async function updateOrderPrice({ order_id, price, express_price }) {
  const rep = await request({
    url: `/merchant/order/update_price/${order_id}`,
    method: "put",
    data: { price, express_price },
  });
  return rep;
}

export async function pickUpGoods({ staff_id, order_id, order_goods_id }) {
  const rep = await request({
    url: "/merchant/order/pick_up_goods",
    method: "put",
    data: {
      staff_id,
      order_id,
      order_goods_id,
    },
  });
  return rep;
}

export async function deliverGoods({
  staff_id,
  order_id,
  order_goods_id,
  express_id,
  express_no,
}) {
  const rep = await request({
    url: "/merchant/order/deliver_goods",
    method: "put",
    data: {
      staff_id,
      order_id,
      order_goods_id,
      express_id,
      express_no,
    },
  });
  return rep;
}
