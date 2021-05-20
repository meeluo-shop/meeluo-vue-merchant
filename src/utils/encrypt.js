import * as CryptoJS from "crypto-js";

export const keyStr = "k;)*(+nmjdsf$#@d";

export function encrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  return CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

export function decrypt(word) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  return CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
}
