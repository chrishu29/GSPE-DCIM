import HttpBuilder from "../../httpBuilder";
import { DeviceParam } from "./device-category";

const RETURN_PATH = "/device-";

interface ReturnParam extends DeviceParam {
  returnDate: Date | undefined;
  returnBy: string | undefined;
}

const fetchDeviceReturnList = (deviceParam: ReturnParam) => {
  console.log("servirce: " + deviceParam.name);
  return HttpBuilder.get({
    path: RETURN_PATH,
    params: deviceParam,
  });
};

const fetchDeviceDetail = (id: string) =>
  HttpBuilder.get({ path: `${RETURN_PATH}/${id}` });

const returnNewDevice = (body: any) =>
  HttpBuilder.post({ data: body, path: RETURN_PATH });

const updateDeviceReturned = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${RETURN_PATH}/${id}` });

const deleteReturned = (id: number) => {
  return HttpBuilder.delete({ path: `${RETURN_PATH}/${id}` });
};

export {
  returnNewDevice,
  fetchDeviceDetail,
  updateDeviceReturned,
  deleteReturned,
  fetchDeviceReturnList,
};
export type { ReturnParam };
