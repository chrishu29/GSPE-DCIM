import HttpBuilder from "../../httpBuilder";

const MFR_PATH = "/manufacturers";

const fetchMFRList = ( ) => {
    return HttpBuilder.get({
      path: MFR_PATH,
    });
  };

const createNewMFR = (body: any) =>
HttpBuilder.post({ data: body, path: MFR_PATH });

export{
    fetchMFRList,
    createNewMFR,
};
