import HttpBuilder from "../../httpBuilder";

const TYPES_PATH = "/devices/device-types";

const fetchTypeList = ( ) => {
    return HttpBuilder.get({
      path: TYPES_PATH,
    });
  };

  const createNewType = (body: any) =>
  HttpBuilder.post({ data: body, path: TYPES_PATH });

export{
    fetchTypeList,
    createNewType,
};
