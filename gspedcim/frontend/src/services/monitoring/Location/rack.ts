import HttpBuilder from "@/services/httpBuilder";

const RACKS_PATH = "/racks";

const fetchRacksList = (
  page = 1,
  pageSize = 17,
  query = "",
  orderBy = ""
) => {
  return HttpBuilder.get({
    path: RACKS_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};

const fetchRacksDropdowns = () =>
HttpBuilder.get({ path: `${RACKS_PATH}/all`});

const createNewRacks = (body: any) =>
  HttpBuilder.post({ data: body, path: RACKS_PATH });

const updateRacks = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${RACKS_PATH}/${id}` });

const getDetailRacks = (id: string) =>
  HttpBuilder.get({ path: `${RACKS_PATH}/${id}` });

const deleteRacks = (id: number) =>
  HttpBuilder.delete({ path: `${RACKS_PATH}/${id}` });

export  {
    fetchRacksList,
    fetchRacksDropdowns,
    createNewRacks,
    updateRacks,
    getDetailRacks,
    deleteRacks,
};
