import HttpBuilder from "../../httpBuilder";

const ROLES_PATH = "/devices/device-roles";

const fetchRoleList = ( ) => {
    return HttpBuilder.get({
      path: ROLES_PATH,
    });
  };

const createNewRole = (body: any) =>
HttpBuilder.post({ data: body, path: ROLES_PATH });

export{
    fetchRoleList,
    createNewRole,
};
