import HttpBuilder from "../../httpBuilder";
import { DeviceParam } from "./device-category";

const RECEIVED_PATH = "/devices-receive";

// Extending DeviceParam to include new properties
interface ReceivedParam extends DeviceParam {
  deviceFrom: string | undefined;
  receivedBy: number | undefined;
  receiveDate: Date | undefined;
  // other parameters
}

const fetchReceivedList = (
  page = 1,
  pageSize = 17,
  query = "",
  orderBy = ""
) => {
  return HttpBuilder.get({
    path: RECEIVED_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};

const fetchDeviceReceivedList = (deviceParam: ReceivedParam) => {
  console.log("servirce: " + deviceParam.name);
  return HttpBuilder.get({
    path: RECEIVED_PATH,
    params: deviceParam,
  });
};

const createNewReceived = (body: any) =>
  HttpBuilder.post({ data: body, path: RECEIVED_PATH });

const updateReceived = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${RECEIVED_PATH}/${id}` });

const getDetailReceived = (id: string) =>
  HttpBuilder.get({ path: `${RECEIVED_PATH}/${id}` });

const deleteReceived = (id: number) =>
  HttpBuilder.delete({ path: `${RECEIVED_PATH}/${id}` });

export {
  fetchReceivedList,
  createNewReceived,
  updateReceived,
  getDetailReceived,
  deleteReceived,
  fetchDeviceReceivedList,
};

export type { ReceivedParam };
