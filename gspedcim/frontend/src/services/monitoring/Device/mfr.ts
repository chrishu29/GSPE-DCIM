import HttpBuilder from "../../httpBuilder";

const MFR_PATH = "/manufacturers";

const fetchMfrList = ( ) => {
    return HttpBuilder.get({
      path: MFR_PATH,
    });
  };

// const createNewDevice = (body: any) =>
// HttpBuilder.post({ data: body, path: DEVICE_PATH });

// const updateDevice = (body: any, id: string) =>
//   HttpBuilder.put({ data: body, path: `${DEVICE_PATH}/${id}` });

// const getDetailDevice = (id: string) =>
//   HttpBuilder.get({ path: `${DEVICE_PATH}/${id}` });

// const deleteDevice = (id: number) =>
//   HttpBuilder.delete({ path: `${DEVICE_PATH}/${id}` });

export{
    fetchMfrList,
    // createNewDevice,
    // updateDevice,
    // getDetailDevice,
    // deleteDevice,
};
