import HttpBuilder from "../../httpBuilder";
import { DeviceParam } from "./device-category";

const ALLOCATE_PATH = "/device-";

interface AllocateParam extends DeviceParam {
    serialNo: string | undefined;
    location: string | undefined;
    rack: string | undefined;
  }

const fetchDeviceAllocateList = (deviceParam: AllocateParam) => {
  console.log("servirce: " + deviceParam.name);
  return HttpBuilder.get({
    path: ALLOCATE_PATH,
    params: deviceParam,
  });
};

const fetchDeviceAllocateDetail = (id: string) =>
  HttpBuilder.get({ path: `${ALLOCATE_PATH}/${id}` });

const newDeviceAllocate = (body: any) =>
  HttpBuilder.post({ data: body, path: ALLOCATE_PATH });

const updateDeviceAllocate = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${ALLOCATE_PATH}/${id}` });

const deleteAllocate = (id: number) => {
  return HttpBuilder.delete({ path: `${ALLOCATE_PATH}/${id}` });
};

export {
  fetchDeviceAllocateList,
  deleteAllocate,
  newDeviceAllocate,
  fetchDeviceAllocateDetail,
  updateDeviceAllocate,
};
export type { AllocateParam };
