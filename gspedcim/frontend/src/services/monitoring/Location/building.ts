import HttpBuilder from "@/services/httpBuilder";

const BUILDING_PATH = "/buildings";

const fetchBuildingList = (
  page = 1,
  pageSize = 17,
  query = "",
  orderBy = ""
) => {
  return HttpBuilder.get({
    path: BUILDING_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};


const fetchBuildingDropdowns = () =>
HttpBuilder.get({ path: `${BUILDING_PATH}/all`});

const createNewBuilding = (body: any) =>
  HttpBuilder.post({ data: body, path: BUILDING_PATH });

const updateBuilding = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${BUILDING_PATH}/${id}` });

const getDetailBuilding = (id: string) =>
  HttpBuilder.get({ path: `${BUILDING_PATH}/${id}` });

const deleteBuilding = (id: number) =>
  HttpBuilder.delete({ path: `${BUILDING_PATH}/${id}` });

export  {
    fetchBuildingList,
    fetchBuildingDropdowns,
    createNewBuilding,
    updateBuilding,
    getDetailBuilding,
    deleteBuilding,
};
