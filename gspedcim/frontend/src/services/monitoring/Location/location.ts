import HttpBuilder from "@/services/httpBuilder";

const LOCATIONS_PATH = "/locations";

const fetchLocationList = (
  page = 1,
  pageSize = 17,
  query = "",
  orderBy = ""
) => {
  return HttpBuilder.get({
    path: LOCATIONS_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};

const fetchStatus = () =>
HttpBuilder.get({ path: `${LOCATIONS_PATH}/location-status`});

const fetchLocationDropdowns = () =>
HttpBuilder.get({ path: `${LOCATIONS_PATH}/all`});

const createNewLocation = (body: any) =>
  HttpBuilder.post({ data: body, path: LOCATIONS_PATH });

const updateLocation = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${LOCATIONS_PATH}/${id}` });

const getDetailLocation = (id: string) =>
  HttpBuilder.get({ path: `${LOCATIONS_PATH}/${id}` });

const deleteLocation = (id: number) =>
  HttpBuilder.delete({ path: `${LOCATIONS_PATH}/${id}` });

export  {
  fetchStatus,
  fetchLocationDropdowns,
  fetchLocationList,
  createNewLocation,
  updateLocation,
  getDetailLocation,
  deleteLocation,
};
