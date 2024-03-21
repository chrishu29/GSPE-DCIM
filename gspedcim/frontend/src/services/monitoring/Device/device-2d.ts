import HttpBuilder from "../../httpBuilder";

const PREVIEW_PATH = "/device-2d";

const fetch2DPreviewList = ( ) => {
    return HttpBuilder.get({
      path: PREVIEW_PATH,
    });
  };

const createNewPreview = (body: any) =>
HttpBuilder.post({ data: body, path: PREVIEW_PATH });

export{
    fetch2DPreviewList,
    createNewPreview,
};
