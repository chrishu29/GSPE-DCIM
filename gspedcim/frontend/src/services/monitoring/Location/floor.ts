import HttpBuilder from "@/services/httpBuilder";

const FLOOR_PATH = "/floors";

const fetchFloorList = (
  page = 1,
  pageSize = 17,
  query = "",
  orderBy = ""
) => {
  return HttpBuilder.get({
    path: FLOOR_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};

const fetchFloorDropdowns = () =>
HttpBuilder.get({ path: `${FLOOR_PATH}/all`});
const createNewFloor = (body: any) =>
  HttpBuilder.post({ data: body, path: FLOOR_PATH });

const updateFloor = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${FLOOR_PATH}/${id}` });

const getDetailFloor = (id: string) =>
  HttpBuilder.get({ path: `${FLOOR_PATH}/${id}` });

const deleteFloor = (id: number) =>
  HttpBuilder.delete({ path: `${FLOOR_PATH}/${id}` });

export  {
    fetchFloorList,
    fetchFloorDropdowns,
    createNewFloor,
    updateFloor,
    getDetailFloor,
    deleteFloor,
};
