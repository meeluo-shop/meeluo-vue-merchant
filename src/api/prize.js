import request from "@/utils/request";

export async function theWinningRecordList(params) {
  /**
   *  theWinningRecordList (获奖记录列表)
   *  @params [object]  page_index page_size status
   *  @return [object]  api请求结果
   *  By chengtsui on 2020/12/19
   */
  const reps = await request({
    url: "/merchant/winning/list",
    method: "get",
    params,
  });
  return reps;
}

export async function theWinningRecordInfo(id) {
  /**
   *  theWinningRecordInfo （单条获奖消息详情）
   *  @params [string] 单条数据id
   *  @return [object] api请求结果
   *  By chengtsui on 2020/12/19
   */
  const reps = await request({
    url: `/merchant/winning/detail/${id}`,
    method: "get",
  });
  return reps;
}

export async function deliverWinningPrize({
  staff_id,
  winning_id,
  winning_goods_id,
  express_id,
  express_no,
}) {
  const reps = await request({
    url: `/merchant/winning/deliver_prize`,
    method: "put",
    data: {
      staff_id,
      winning_id,
      winning_goods_id,
      express_id,
      express_no,
    },
  });
  return reps;
}
