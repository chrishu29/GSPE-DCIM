import HttpBuilder from "../../httpBuilder";
import { DeviceParam } from "./device-category";

const STORED_PATH = "/device-";

interface StoredParam extends DeviceParam {
  serialNo: string | undefined;
  location: string | undefined;
  rack: string | undefined;
}

const fetchDeviceStoredList = (deviceParam: StoredParam) => {
  console.log("servirce: " + deviceParam.name);
  return HttpBuilder.get({
    path: STORED_PATH,
    params: deviceParam,
  });
};

const fetchDeviceDetail = (id: string) =>
  HttpBuilder.get({ path: `${STORED_PATH}/${id}` });

const updateDeviceStored = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${STORED_PATH}/${id}` });

const deleteStored = (id: number) => {
  return HttpBuilder.delete({ path: `${STORED_PATH}/${id}` });
};

export {
  fetchDeviceStoredList,
  updateDeviceStored,
  deleteStored,
  fetchDeviceDetail,
};
export type { StoredParam };
