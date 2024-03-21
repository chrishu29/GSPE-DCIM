import HttpBuilder from "../../httpBuilder";

const MOVED_PATH = "/move-device";

const fetchMovedList = (
    page = 1,
    pageSize = 17,
    query = "",
    orderBy = ""
  ) => {
    return HttpBuilder.get({
      path: MOVED_PATH,
      params: {
        page: page,
        pageSize: pageSize,
        query: query,
        orderBy: orderBy,
      },
    });
  };

const createNewMoved = (body: any) =>
HttpBuilder.post({ data: body, path: MOVED_PATH });

const updateMoved = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${MOVED_PATH}/${id}` });

const getDetailMoved = (id: string) =>
  HttpBuilder.get({ path: `${MOVED_PATH}/${id}` });

const deleteMoved = (id: number) =>
  HttpBuilder.delete({ path: `${MOVED_PATH}/${id}` });

export{
    fetchMovedList,
    createNewMoved,
    updateMoved,
    getDetailMoved,
    deleteMoved,
};
