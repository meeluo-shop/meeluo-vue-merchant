import request from "@/utils/request";

export async function getQRCode({
  data,
  logo,
  logoshape,
  bgcolor,
  forecolor,
  text,
  fontsize,
  fontfamily,
  transparent,
  fontcolor,
  level,
  incolor,
  outcolor,
  qrcode_eyes,
  background,
  wper,
  hper,
  tper,
  lper,
  eye_use_fore,
  qrpad,
  marginblock,
}) {
  let resp = await request.jsonp("https://biz.cli.im/Api/Getbeautify", {
    "qrcodeconfig[logourl]":
      logo ||
      "//oss-cn-hangzhou.aliyuncs.com/public-cli/free/9806a3b57d023b94490084e4864876941611818719.png",
    "qrcodeconfig[logoshape]": logoshape || "ellipse",
    "qrcodeconfig[data]": data,
    "qrcodeconfig[bgcolor]": bgcolor || "#FFFFFF",
    "qrcodeconfig[forecolor]": forecolor || "#000",
    "qrcodeconfig[text]": text || "",
    "qrcodeconfig[fontsize]": fontsize || 30,
    "qrcodeconfig[fontfamily]": fontfamily || "msyh.ttf",
    "qrcodeconfig[transparent]": transparent || 0,
    "qrcodeconfig[fontcolor]": fontcolor || "",
    "qrcodeconfig[level]": level || "H",
    "qrcodeconfig[incolor]": incolor || "#1694e3",
    "qrcodeconfig[outcolor]": outcolor || "",
    "qrcodeconfig[qrcode_eyes]": qrcode_eyes || "",
    "qrcodeconfig[background]":
      background ||
      "//alicliimg.clewm.net/524/795/795524/1472135565996544efde37bedead8f2b46b6ef7fc6b881472135563.png",
    "qrcodeconfig[wper]": wper || 0.84,
    "qrcodeconfig[hper]": hper || 0.84,
    "qrcodeconfig[tper]": tper || 0.08,
    "qrcodeconfig[lper]": lper || 0.08,
    "qrcodeconfig[eye_use_fore]": eye_use_fore || "",
    "qrcodeconfig[qrpad]": qrpad || 10,
    "qrcodeconfig[marginblock]": marginblock || 2,
    _: Date.now(),
  });
  try {
    resp = JSON.parse(resp);
  } catch (err) {
    console.error(err);
    resp = {};
  }
  if (resp.qrcodeconfig) {
    return resp.qrcodeconfig;
  }
  return null;
}
