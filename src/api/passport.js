import request from "@/utils/request";
import { encrypt } from "@/utils/encrypt";

export async function login(params) {
  const temp = {
    ...params,
    password: encrypt(params.password),
    encrypt: 1,
  };
  const { data } = await request({
    url: "/merchant/passport/login",
    method: "post",
    data: temp,
  });
  data.token = "JWT " + data.token;
  return data;
}

export async function logout() {
  return await request({
    url: "/merchant/passport/logout",
    method: "post",
  });
}
