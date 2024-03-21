interface Rute {
  PATH: string;
  NAME: string;
}

const ROUTER: Record<string, Rute> = {
  HOME: {
    PATH: "/",
    NAME: "Home",
  },
  APPLICATIONS: {
    PATH: "/",
    NAME: "Applications",
  },
  /**
   * DCIM_MONITORING
   */
  DCIM_MONITORING: {
    PATH: "/dcim-monitoring",
    NAME: "DCIM Monitoring",
  },
  LOCATIONS: {
    PATH: "/dcim-monitoring/locations",
    NAME: "Location",
  },
  LOCATIONS_MAPS: {
    PATH: "/dcim-monitoring/locations/location_maps",
    NAME: "View on Maps",
  },
  LOCATIONS_FORM: {
    PATH: "/dcim-monitoring/locations/form/:id",
    NAME: "Form Location",
  },
  BUILDING: {
    PATH: "/dcim-monitoring/buildings",
    NAME: "Building",
  },

  BUILDING_FORM: {
    PATH: "/dcim-monitoring/buildings/form/:id",
    NAME: "Building Form",
  },
  FLOOR: {
    PATH: "/dcim-monitoring/floors",
    NAME: "Floor",
  },
  FLOOR_FORM: {
    PATH: "/dcim-monitoring/floors/form/:id",
    NAME: "Floor Form",
  },
  ROOM: {
    PATH: "/dcim-monitoring/rooms",
    NAME: "Room",
  },
  ROOM_FORM: {
    PATH: "/dcim-monitoring/rooms/form/:id",
    NAME: "Room Form",
  },
  RACK: {
    PATH: "/dcim-monitoring/racks",
    NAME: "Rack",
  },
  RACK_FORM: {
    PATH: "/dcim-monitoring/racks/form/:id",
    NAME: "Rack Form",
  },
  ROOM_SIMULATION: {
    PATH: "/dcim-monitoring/simulation/room",
    NAME: "Room Simulation",
  },
  RACK_SIMULATION: {
    PATH: "/dcim-monitoring/simulation/rack",
    NAME: "Rack Simulation",
  },
  
  TEST_RACK_SIMULATION: {
    PATH: "/dcim-monitoring/simulator/rack",
    NAME: "Rack Simulator",
  },

  //Device route
  DEVICE: {
    PATH: "/dcim-monitoring/device-list",
    NAME: "Device",
  },
  DEVICE_DASHBOARD: {
    PATH: "/dcim-monitoring/device-dashboard",
    NAME: "Dashboard",
  },
  DEVICE_CATEGORY: {
    PATH: "/dcim-monitoring/device-category",
    NAME: "Categories",
  },
  DEVICE_LIST_STORED: {
    PATH: "/dcim-monitoring/device-stored",
    NAME: "Stored Device",
  },
  DEVICE_LIST_ALLOCATED: {
    PATH: "/dcim-monitoring/device-allocate",
    NAME: "Allocated Device",
  },
  DEVICE_LIST_RECEIVED: {
    PATH: "/dcim-monitoring/device-receive",
    NAME: "Received Device",
  },
  DEVICE_LIST_RETURNED: {
    PATH: "/dcim-monitoring/device-return",
    NAME: "Returned Device",
  },
  DEVICE_DETAIL: {
    PATH: "/dcim-monitoring/device/:id",
    NAME: "Device Detail",
  },

  DEVICE_FORM: {
    PATH: "/dcim-monitoring/device-list/form/:id",
    NAME: "Add Device Form",
  },
  DEVICE_FORM_CATEGORY: {
    PATH: "/dcim-monitoring/device-category/form/:id",
    NAME: "Device Category",
  },
  DEVICE_FORM_ROLE: {
    PATH: "/dcim-monitoring/device-category/role/form",
    NAME: "Device Role",
  },
  DEVICE_FORM_PREVIEW: {
    PATH: "/dcim-monitoring/device-category/2dpreview/form",
    NAME: "Device 2D Preview",
  },
  DEVICE_FORM_MFR: {
    PATH: "/dcim-monitoring/device-category/manufacturer/form",
    NAME: "Device Manufacturer",
  },
  DEVICE_FORM_TYPE: {
    PATH: "/dcim-monitoring/device-category/Type/form",
    NAME: "Device Type",
  },
  DEVICE_FORM_RECEIVE: {
    PATH: "/dcim-monitoring/device-receive/form/:id",
    NAME: "Device Receive",
  },
  DEVICE_FORM_ALLOCATE: {
    PATH: "/dcim-monitoring/device-allocate/form/:id",
    NAME: "Device Allocate",
  },
  DEVICE_FORM_RETURN: {
    PATH: "/dcim-monitoring/device-return/form/:id",
    NAME: "Device Return",
  },
  DEVICE_FORM_MAINTENANCE: {
    PATH: "/dcim-monitoring/device-maintenance/form/:id",
    NAME: "Maintenance Device",
  },

  RECEIVED: {
    PATH: "/dcim-monitoring/received-device",
    NAME: "Receive Device",
  },

  RECEIVED_FORM: {
    PATH: "/dcim-monitoring/received-device/form/:id",
    NAME: "Add Received Device Form",
  },

  INSTALLED: {
    PATH: "/dcim-monitoring/installed-device",
    NAME: "Install Device",
  },

  INSTALLED_FORM: {
    PATH: "/dcim-monitoring/installed-device/form/:id",
    NAME: "Add Install Device Form",
  },

  UNINSTALLED: {
    PATH: "/dcim-monitoring/uninstalled-device",
    NAME: "Uninstall Device",
  },

  MOVED: {
    PATH: "/dcim-monitoring/move-device",
    NAME: "Moved Device",
  },

  MOVED_FORM: {
    PATH: "/dcim-monitoring/move-device/form/:id",
    NAME: "Add Move Device Form",
  },

  DCFM: {
    PATH: "/dcfm",
    NAME: "DCFM",
  },
  IP_MANAGEMENT: {
    PATH: "/ip-management",
    NAME: "IP Management",
  },
};

export default ROUTER;
