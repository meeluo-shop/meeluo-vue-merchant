import request from "@/utils/request";
import { RegionStore } from "@/utils/storage";

export async function getRegion(code = "86") {
  const regions = RegionStore.get(code);
  if (regions) {
    return regions;
  }
  const { data } = await request({
    url: `/common/region/${code}`,
    method: "get",
    params: { is_all: 1 },
  });
  RegionStore.set(code, data);
  return data;
}
