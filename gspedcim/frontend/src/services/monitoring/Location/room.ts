import HttpBuilder from "@/services/httpBuilder";

const ROOM_PATH = "/rooms";

const fetchRoomList = (
  page = 1,
  pageSize = 17,
  query = "",
  orderBy = ""
) => {
  return HttpBuilder.get({
    path: ROOM_PATH,
    params: {
      page: page,
      pageSize: pageSize,
      query: query,
      orderBy: orderBy,
    },
  });
};

// const fetchStatus = () =>
// HttpBuilder.get({ path: `${ROOM_PATH}/location-status`});

const fetchRoomDropdowns = () =>
HttpBuilder.get({ path: `${ROOM_PATH}/all`});

const createNewRoom = (body: any) =>
  HttpBuilder.post({ data: body, path: ROOM_PATH });

const updateRoom = (body: any, id: string) =>
  HttpBuilder.put({ data: body, path: `${ROOM_PATH}/${id}` });

const getDetailRoom = (id: string) =>
  HttpBuilder.get({ path: `${ROOM_PATH}/${id}` });

const deleteRoom = (id: number) =>
  HttpBuilder.delete({ path: `${ROOM_PATH}/${id}` });

export  {
  fetchRoomList,
//   fetchStatus,
  fetchRoomDropdowns,
  createNewRoom,
  updateRoom,
  getDetailRoom,
  deleteRoom,
};
