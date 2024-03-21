import { SortType } from "vue3-easy-data-table";
import HttpBuilder from "../../httpBuilder";

const CATEGORY_PATH = "/device-categories";

interface DeviceParam {
  page: number;
  pageSize: number;
  sortBy: string | string[] | undefined;
  sortType: SortType | SortType[] | undefined;
  name: string;
  deviceRole: number | undefined;
  manufacturer: number | undefined;
  deviceType: number | undefined;
  // other params here
}

const fetchDeviceCategoryList = (deviceParam: DeviceParam) => {
  console.log("servirce: " + deviceParam.name);
  return HttpBuilder.get({
    path: CATEGORY_PATH,
    params: deviceParam,
  });
};

const fetchDeviceCategoryDetail = (id: string) =>
  HttpBuilder.get({ path: `${CATEGORY_PATH}/${id}` });

const createNewDeviceCategory = (body: any) =>
  HttpBuilder.post({ data: body, path: CATEGORY_PATH });

const updatedeviceCategory = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${CATEGORY_PATH}/${id}` });

const deleteCategory = (id: number) => {
  return HttpBuilder.delete({ path: `${CATEGORY_PATH}/${id}` });
};

export {
  fetchDeviceCategoryList,
  deleteCategory,
  createNewDeviceCategory,
  fetchDeviceCategoryDetail,
  updatedeviceCategory,
};
export type { DeviceParam };
