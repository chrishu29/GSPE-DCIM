import HttpBuilder from "../../httpBuilder";

const ROLES_PATH = "/devices/device-roles";
const TYPES_PATH = "/devices/device-types";
const MFR_PATH = "/manufacturers";
const PREV2D_PATH = "/device-2d/all";

const fetchMfrList = () => {
  return HttpBuilder.get({
    path: MFR_PATH,
  });
};

const fetchTypeList = () => {
  return HttpBuilder.get({
    path: TYPES_PATH,
  });
};

const fetchRoleList = () => {
  return HttpBuilder.get({
    path: ROLES_PATH,
  });
};

const fetch2dDeviceList = () => {
  return HttpBuilder.get({
    path: PREV2D_PATH,
  });
};

export { fetchRoleList, fetchTypeList, fetchMfrList, fetch2dDeviceList };
