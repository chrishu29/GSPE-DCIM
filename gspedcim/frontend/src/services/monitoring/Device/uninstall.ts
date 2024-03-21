import HttpBuilder from "../../httpBuilder";

const UNINSTALL_PATH = "/devices-uninstall";

const fetchUninstalledList = (
    page = 1,
    pageSize = 17,
    query = "",
    orderBy = ""
  ) => {
    return HttpBuilder.get({
      path: UNINSTALL_PATH,
      params: {
        page: page,
        pageSize: pageSize,
        query: query,
        orderBy: orderBy,
      },
    });
  };

const deleteUninstall = (id: number) =>
  HttpBuilder.delete({ path: `${UNINSTALL_PATH}/${id}` });

export{
    fetchUninstalledList,
    deleteUninstall,
};
