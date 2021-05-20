import request from "@/utils/request";

export function getPrinterList({ page_index, page_size, is_active, brand }) {
  return request({
    url: "/merchant/device/printer/list",
    method: "get",
    params: {
      page_index,
      page_size,
      is_active,
      brand,
    },
  });
}

export function createPrinter({
  name,
  brand,
  key,
  secret,
  phone,
  is_active,
  print_count,
}) {
  return request({
    url: "/merchant/device/printer/create",
    method: "post",
    data: {
      name,
      brand,
      key,
      secret,
      phone,
      is_active,
      print_count,
    },
  });
}

export function updatePrinter(
  id,
  { name, brand, key, secret, phone, is_active, print_count }
) {
  return request({
    url: `/merchant/device/printer/update/${id}`,
    method: "put",
    data: {
      name,
      brand,
      key,
      secret,
      phone,
      is_active,
      print_count,
    },
  });
}

export function deletePrinter(id) {
  return request({
    url: `/merchant/device/printer/delete/${id}`,
    method: "delete",
  });
}

export function getPrinterStatus(id) {
  return request({
    url: `/merchant/device/printer/status/${id}`,
    method: "get",
  });
}
