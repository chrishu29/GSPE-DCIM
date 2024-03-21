
import HttpBuilder from "../../httpBuilder";

const DEVICE_PATH = "/devices";

const fetchDeviceList = (page = 1, pageSize = 17, query = "", orderBy = "") => {
  return HttpBuilder.get({
    path: DEVICE_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};

const createNewDevice = (body: any) =>
  HttpBuilder.post({ data: body, path: DEVICE_PATH });

const updateDevice = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${DEVICE_PATH}/${id}` });

const getDetailDevice = (id: string) =>
  HttpBuilder.get({ path: `${DEVICE_PATH}/${id}` });

const getDeviceFrom = () =>
  HttpBuilder.get({ path: `${DEVICE_PATH}/device-from` });

const getDeviceStorage = () =>
  HttpBuilder.get({ path: `${DEVICE_PATH}/storage` });

const deleteDevice = (id: number) =>
  HttpBuilder.delete({ path: `${DEVICE_PATH}/${id}` });

export {
  fetchDeviceList,
  createNewDevice,
  updateDevice,
  getDetailDevice,
  getDeviceFrom,
  getDeviceStorage,
  deleteDevice,
}
