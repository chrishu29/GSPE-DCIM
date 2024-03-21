import HttpBuilder from "../../httpBuilder";

const INSTALLED_PATH = "/devices-install";

const fetchInstalledList = (
    page = 1,
    pageSize = 17,
    query = "",
    orderBy = ""
  ) => {
    return HttpBuilder.get({
      path: INSTALLED_PATH,
      params: {
        page: page,
        pageSize: pageSize,
        query: query,
        orderBy: orderBy,
      },
    });
  };

const createNewInstalled = (body: any) =>
HttpBuilder.post({ data: body, path: INSTALLED_PATH });

const updateInstalled = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${INSTALLED_PATH}/${id}` });

const getDetailInstalled = (id: string) =>
  HttpBuilder.get({ path: `${INSTALLED_PATH}/${id}` });

const deleteInstalled = (id: number) =>
  HttpBuilder.delete({ path: `${INSTALLED_PATH}/${id}` });

const serialNumbersDevice = (id: string) =>
  HttpBuilder.get({ path: `${INSTALLED_PATH}/serial-numbers/${id}` });
  
const installStatusDevice = () =>
  HttpBuilder.get({ path: `${INSTALLED_PATH}/install-status` });

export{
    fetchInstalledList,
    createNewInstalled,
    updateInstalled,
    getDetailInstalled,
    deleteInstalled,
    serialNumbersDevice,
    installStatusDevice,
};
