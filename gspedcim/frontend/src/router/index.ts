import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ROUTER from "../constants/router";
const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTER.HOME.PATH,
    name: ROUTER.HOME.NAME,
    component: () => import("../views/home/HomeView.vue"),
  },
  {
    path: ROUTER.DCIM_MONITORING.PATH,
    name: ROUTER.DCIM_MONITORING.NAME,
    component: () => import("../views/monitoring/DcimMonitoringView.vue"),
  },
  /*
  Locations
  */
  {
    path: ROUTER.LOCATIONS.PATH,
    name: ROUTER.LOCATIONS.NAME,
    component: () =>
      import("../views/monitoring/location/locations/LocationList.vue"),
  },
  {
    path: ROUTER.LOCATIONS_MAPS.PATH,
    name: ROUTER.LOCATIONS_MAPS.NAME,
    component: () =>
      import("../views/monitoring/location/locations/LocationMap.vue"),
  },
  {
    path: ROUTER.LOCATIONS_FORM.PATH,
    name: ROUTER.LOCATIONS_FORM.NAME,
    component: () =>
      import("../views/monitoring/location/locations/LocationForm.vue"),
  },

  /*
  Building
  */
  {
    path: ROUTER.BUILDING.PATH,
    name: ROUTER.BUILDING.NAME,
    component: () =>
      import("../views/monitoring/location/buildings/BuildingList.vue"),
  },
  {
    path: ROUTER.BUILDING_FORM.PATH,
    name: ROUTER.BUILDING_FORM.NAME,
    component: () =>
      import("../views/monitoring/location/buildings/BuildingForm.vue"),
  },

  /*
 Floor
  */
  {
    path: ROUTER.FLOOR.PATH,
    name: ROUTER.FLOOR.NAME,
    component: () => import("../views/monitoring/location/floor/FloorList.vue"),
  },
  {
    path: ROUTER.FLOOR_FORM.PATH,
    name: ROUTER.FLOOR_FORM.NAME,
    component: () => import("../views/monitoring/location/floor/FloorForm.vue"),
  },

  /*
 Room
  */
  {
    path: ROUTER.ROOM.PATH,
    name: ROUTER.ROOM.NAME,
    component: () => import("../views/monitoring/location/room/RoomList.vue"),
  },
  {
    path: ROUTER.ROOM_FORM.PATH,
    name: ROUTER.ROOM_FORM.NAME,
    component: () => import("../views/monitoring/location/room/RoomForm.vue"),
  },

  /*
 Rack
  */
  {
    path: ROUTER.RACK.PATH,
    name: ROUTER.RACK.NAME,
    component: () => import("../views/monitoring/location/rack/RackList.vue"),
  },
  {
    path: ROUTER.RACK_FORM.PATH,
    name: ROUTER.RACK_FORM.NAME,
    component: () => import("../views/monitoring/location/rack/RackForm.vue"),
  },
  /*
 Simulation
  */
  {
    path: ROUTER.ROOM_SIMULATION.PATH,
    name: ROUTER.ROOM_SIMULATION.NAME,
    component: () =>
      import("../views/monitoring/location/simulation/RoomSimulation.vue"),
  },
  {
    path: ROUTER.RACK_SIMULATION.PATH,
    name: ROUTER.RACK_SIMULATION.NAME,
    component: () =>
      import("../views/monitoring/location/simulation/RackSimulation.vue"),
  },

  
  {
    path: ROUTER.TEST_RACK_SIMULATION.PATH,
    name: ROUTER.TEST_RACK_SIMULATION.NAME,
    component: () =>
      import("../views/monitoring/location/RackSimulator.vue"),
  },

  //Device path
  {
    path: ROUTER.DEVICE.PATH,
    name: ROUTER.DEVICE.NAME,
    component: () =>
      import("../views/monitoring/device/devicelist/DeviceList.vue"),
  },
  {
    path: ROUTER.DEVICE_DASHBOARD.PATH,
    name: ROUTER.DEVICE_DASHBOARD.NAME,
    component: () => import("@/views/monitoring/device/DashboardDevice.vue"),
  },
  {
    path: ROUTER.DEVICE_CATEGORY.PATH,
    name: ROUTER.DEVICE_CATEGORY.NAME,
    component: () => import("@/views/monitoring/device/DeviceCategories.vue"),
  },
  {
    path: ROUTER.DEVICE_LIST_STORED.PATH,
    name: ROUTER.DEVICE_LIST_STORED.NAME,
    component: () => import("@/views/monitoring/device/StoredList.vue"),
  },

  {
    path: ROUTER.DEVICE_LIST_ALLOCATED.PATH,
    name: ROUTER.DEVICE_LIST_ALLOCATED.NAME,
    component: () => import("@/views/monitoring/device/AllocatedList.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_ALLOCATE.PATH,
    name: ROUTER.DEVICE_FORM_ALLOCATE.NAME,
    component: () =>
      import("../views/monitoring/device/FormDeviceAllocate.vue"),
  },
  {
    path: ROUTER.DEVICE_LIST_RECEIVED.PATH,
    name: ROUTER.DEVICE_LIST_RECEIVED.NAME,
    component: () => import("@/views/monitoring/device/ReceivedList.vue"),
  },
  {
    path: ROUTER.DEVICE_LIST_RETURNED.PATH,
    name: ROUTER.DEVICE_LIST_RETURNED.NAME,
    component: () => import("@/views/monitoring/device/ReturnedList.vue"),
  },
  {
    path: ROUTER.DEVICE_DETAIL.PATH,
    name: ROUTER.DEVICE_DETAIL.NAME,
    component: () => import("../views/monitoring/device/DeviceDetail.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM.PATH,
    name: ROUTER.DEVICE_FORM.NAME,
    component: () =>
      import("../views/monitoring/device/devicelist/AddDeviceForm.vue"),
  },

  {
    path: ROUTER.DEVICE_FORM_CATEGORY.PATH,
    name: ROUTER.DEVICE_FORM_CATEGORY.NAME,
    component: () =>
      import("../views/monitoring/device/FormDeviceCategory.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_ROLE.PATH,
    name: ROUTER.DEVICE_FORM_ROLE.NAME,
    component: () =>
      import("../views/monitoring/device/FormAddNewRole.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_PREVIEW.PATH,
    name: ROUTER.DEVICE_FORM_PREVIEW.NAME,
    component: () =>
      import("../views/monitoring/device/FormAddNew2dPreview.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_MFR.PATH,
    name: ROUTER.DEVICE_FORM_MFR.NAME,
    component: () =>
      import("../views/monitoring/device/FormAddNewManufacture.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_TYPE.PATH,
    name: ROUTER.DEVICE_FORM_TYPE.NAME,
    component: () =>
      import("../views/monitoring/device/FormAddNewType.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_RECEIVE.PATH,
    name: ROUTER.DEVICE_FORM_RECEIVE.NAME,
    component: () => import("../views/monitoring/device/FormDeviceReceive.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_RETURN.PATH,
    name: ROUTER.DEVICE_FORM_RETURN.NAME,
    component: () => import("../views/monitoring/device/FormDeviceReturn.vue"),
  },
  {
    path: ROUTER.DEVICE_FORM_MAINTENANCE.PATH,
    name: ROUTER.DEVICE_FORM_MAINTENANCE.NAME,
    component: () =>
      import("../views/monitoring/device/FormDeviceMaintenance.vue"),
  },
  {
    path: ROUTER.RECEIVED.PATH,
    name: ROUTER.RECEIVED.NAME,
    component: () =>
      import("../views/monitoring/device/received_device/ReceivedList.vue"),
  },

  {
    path: ROUTER.RECEIVED_FORM.PATH,
    name: ROUTER.RECEIVED_FORM.NAME,
    component: () =>
      import("../views/monitoring/device/received_device/AddReceivedForm.vue"),
  },

  {
    path: ROUTER.INSTALLED.PATH,
    name: ROUTER.INSTALLED.NAME,
    component: () =>
      import("../views/monitoring/device/installed_device/InstalledList.vue"),
  },

  {
    path: ROUTER.INSTALLED_FORM.PATH,
    name: ROUTER.INSTALLED_FORM.NAME,
    component: () =>
      import("../views/monitoring/device/installed_device/AddInstallForm.vue"),
  },

  {
    path: ROUTER.UNINSTALLED.PATH,
    name: ROUTER.UNINSTALLED.NAME,
    component: () =>
      import("../views/monitoring/device/uninstall_device/UninstallList.vue"),
  },

  {
    path: ROUTER.MOVED.PATH,
    name: ROUTER.MOVED.NAME,
    component: () =>
      import("../views/monitoring/device/move_device/MovedList.vue"),
  },

  {
    path: ROUTER.MOVED_FORM.PATH,
    name: ROUTER.MOVED_FORM.NAME,
    component: () =>
      import("../views/monitoring/device/move_device/AddMoveForm.vue"),
  },

  {
    path: ROUTER.DCFM.PATH,
    name: ROUTER.DCFM.NAME,
    component: () => import("../views/dcfm/DcfmView.vue"),
  },
  {
    path: ROUTER.IP_MANAGEMENT.PATH,
    name: ROUTER.IP_MANAGEMENT.NAME,
    component: () => import("../views/ipmanagement/IpManagementView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
