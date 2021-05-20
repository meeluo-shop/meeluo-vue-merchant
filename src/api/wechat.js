import request from "@/utils/request";

export async function getOfficialAccount() {
  return await request({
    url: "/common/wechat/setting/official_account",
    method: "get",
  });
}

export async function setOfficialAccount(data) {
  return await request({
    url: "/common/wechat/setting/official_account",
    method: "put",
    data,
  });
}

export async function getPayment() {
  return await request({
    url: "/common/wechat/setting/payment",
    method: "get",
  });
}

export async function setPayment(data) {
  return await request({
    url: "/common/wechat/setting/payment",
    method: "put",
    data,
  });
}

export async function getIndustry() {
  return await request({
    url: "/common/wechat/template/industry",
    method: "get",
  });
}

export async function setIndustry() {
  return await request({
    url: "/common/wechat/template/industry",
    method: "put",
  });
}

export async function getMessageTemplate() {
  return await request({
    url: "/common/wechat/template/list",
    method: "get",
  });
}

export async function delMessageTemplate(id) {
  return await request({
    url: `/common/wechat/template/delete/${id}`,
    method: "delete",
  });
}

export async function setMessageTemplate() {
  return await request({
    url: "/common/wechat/template/init",
    method: "post",
  });
}

export async function getPaymentCert() {
  return await request({
    url: "/common/wechat/setting/payment/cert_name",
    method: "get",
  });
}

export async function uploadPaymentCert(formData) {
  return await request.post("/common/wechat/setting/payment/cert", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getMerchantQRCode() {
  return await request({
    url: "/merchant/wechat/qrcode/merchant",
    method: "get",
  });
}

export async function getTableQRCode(id) {
  return await request({
    url: `/merchant/wechat/qrcode/table/${id}`,
    method: "get",
  });
}

// 获取微信图文素材列表
export async function getMaterialText(params) {
  return await request({
    url: "/common/wechat/material/text/list",
    method: "get",
    params,
  });
}

// 新增微信图文素材
export async function addMaterialText(data) {
  return await request({
    url: "/common/wechat/material/text/create",
    method: "post",
    data,
  });
}
// 查看微信图文素材
export async function getMaterialTextDetail(id) {
  return await request({
    url: `/common/wechat/material/text/detail/${id}`,
    method: "get",
  });
}
// 修改微信图文素材
export async function updateMaterialText(id, data) {
  return await request({
    url: `/common/wechat/material/text/update/${id}`,
    method: "put",
    data,
  });
}

// 删除微信图文素材
export async function deleteMaterialText(id) {
  return await request({
    url: `/common/wechat/material/text/delete/${id}`,
    method: "delete",
  });
}

// 获取微信图片素材列表
export async function getMaterialImage(params) {
  return await request({
    url: "/common/wechat/material/image/list",
    method: "get",
    params,
  });
}

// 新增微信图片素材
export async function addMaterialImage(data) {
  return await request({
    url: "/common/wechat/material/image/create",
    method: "post",
    data,
  });
}
// 查看微信图片素材
export async function getMaterialImageDetail(id) {
  return await request({
    url: `/common/wechat/material/image/detail/${id}`,
    method: "get",
  });
}
// 修改微信图片素材
export async function updateMaterialImage(id, data) {
  return await request({
    url: `/common/wechat/material/image/update/${id}`,
    method: "put",
    data,
  });
}

// 删除微信图片素材
export async function deleteMaterialImage(id) {
  return await request({
    url: `/common/wechat/material/image/delete/${id}`,
    method: "delete",
  });
}

// 获取微信音频素材列表
export async function getMaterialVoice(params) {
  return await request({
    url: "/common/wechat/material/voice/list",
    method: "get",
    params,
  });
}

// 新增微信音频素材
export async function addMaterialVoice() {
  return await request({
    url: "/common/wechat/material/voice/create",
    method: "post",
  });
}
// 查看微信音频素材
export async function getMaterialVoiceDetail(id) {
  return await request({
    url: `/common/wechat/material/voice/detail/${id}`,
    method: "get",
  });
}
// 修改微信音频素材
export async function updateMaterialVoice(id, params) {
  return await request({
    url: `/common/wechat/material/voice/update/${id}`,
    method: "post",
    params,
  });
}

// 删除微信音频素材
export async function deleteMaterialVoice(id) {
  return await request({
    url: `/common/wechat/material/voice/delete/${id}`,
    method: "delete",
  });
}

// 获取微信视频素材列表
export async function getMaterialVideo(params) {
  return await request({
    url: "/common/wechat/material/video/list",
    method: "get",
    params,
  });
}

// 新增微信视频素材
export async function addMaterialVideo() {
  return await request({
    url: "/common/wechat/material/video/create",
    method: "post",
  });
}
// 查看微信视频素材
export async function getMaterialVideoDetail(id) {
  return await request({
    url: `/common/wechat/material/video/detail/${id}`,
    method: "get",
  });
}
// 修改微信视频素材
export async function updateMaterialVideo(id, params) {
  return await request({
    url: `/common/wechat/material/video/update/${id}`,
    method: "post",
    params,
  });
}

// 删除微信视频素材
export async function deleteMaterialVideo(id) {
  return await request({
    url: `/common/wechat/material/video/delete/${id}`,
    method: "delete",
  });
}

export async function getMenus() {
  return await request({
    url: "/common/wechat/menu/list",
    method: "get",
  });
}

export async function setMenus(data) {
  return await request({
    url: "/common/wechat/menu/create",
    method: "post",
    data: {
      button: JSON.stringify(data),
    },
  });
}

export async function getKeywordList(params) {
  return await request({
    url: "/common/wechat/reply/keyword/list",
    method: "get",
    params,
  });
}

export async function deleteKeyword(id) {
  return await request({
    url: `/common/wechat/reply/keyword/delete/${id}`,
    method: "delete",
  });
}

export async function getKeywordDetail(id) {
  return await request({
    url: `/common/wechat/reply/keyword/detail/${id}`,
    method: "get",
  });
}

export async function updateKeyword(id, data) {
  return await request({
    url: `/common/wechat/reply/keyword/update/${id}`,
    method: "put",
    data,
  });
}

export async function createKeyword(data) {
  return await request({
    url: `/common/wechat/reply/keyword/create`,
    method: "post",
    data,
  });
}

export async function getSubscribeReply(id) {
  return await request({
    url: `/common/wechat/reply/subscribe`,
    method: "get",
  });
}

export async function setSubscribeReply(data) {
  return await request({
    url: `/common/wechat/reply/subscribe`,
    method: "put",
    data,
  });
}

export async function getScanCodeReply(id) {
  return await request({
    url: `/common/wechat/reply/scancode`,
    method: "get",
  });
}

export async function setScanCodeReply(data) {
  return await request({
    url: `/common/wechat/reply/scancode`,
    method: "put",
    data,
  });
}
