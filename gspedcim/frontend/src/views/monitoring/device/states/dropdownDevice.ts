import { DropdownOption } from "@/constants";
import { fetchTypeList } from "@/services/monitoring/Device/device-type";
import {
  fetch2dDeviceList,
  fetchRoleList,
} from "@/services/monitoring/Device/dropdown";
import { fetchMfrList } from "@/services/monitoring/Device/mfr";
import { defineStore } from "pinia";

const useRoleOptionsStore = defineStore({
  id: "roleOptions",
  state: () => ({
    options: [] as DropdownOption[],
  }),
  getters: {
    // Check if roleOptions data is already loaded
    isLoaded: (state) => state.options.length > 0,
  },
  actions: {
    async fetchRoleOptions(forceFetch: boolean = false) {
      // Only fetch if roleOptions is empty
      if (!this.isLoaded || forceFetch) {
        console.log("fetch role options");
        try {
          const response = await fetchRoleList();
          this.options = response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
        } catch (err) {
          console.error("Error fetching Role options:", err);
        }
      }
    },
  },
});

const useMfrOptionsStore = defineStore({
  id: "mfrOptions",
  state: () => ({
    options: [] as DropdownOption[],
  }),
  getters: {
    // Check if roleOptions data is already loaded
    isLoaded: (state) => state.options.length > 0,
  },
  actions: {
    async fetchMfrOptions(forceFetch: boolean = false) {
      if (!this.isLoaded || forceFetch) {
        console.log("fetch role options");
        try {
          const response = await fetchMfrList();
          this.options = response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
        } catch (err) {
          console.error("Error fetching Manufacture options:", err);
        }
      }
    },
  },
});

const useTypeOptionsStore = defineStore({
  id: "typeOptions",
  state: () => ({
    options: [] as DropdownOption[],
  }),
  getters: {
    // Check if roleOptions data is already loaded
    isLoaded: (state) => state.options.length > 0,
  },
  actions: {
    async fetchTypeOptions(forceFetch: boolean = false) {
      if (!this.isLoaded || forceFetch) {
        console.log("fetch role options");
        try {
          const response = await fetchTypeList();
          this.options = response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
        } catch (err) {
          console.error("Error fetching Type options:", err);
        }
      }
    },
  },
});

const usePrev2dOptionsStore = defineStore({
  id: "prev2DOptions",
  state: () => ({
    options: [] as DropdownOption[],
  }),
  getters: {
    // Check if roleOptions data is already loaded
    isLoaded: (state) => state.options.length > 0,
  },
  actions: {
    async fetchPreview2dOptions(forceFetch: boolean = false) {
      if (!this.isLoaded || forceFetch) {
        console.log("fetch previce 2D options");
        try {
          const response = await fetch2dDeviceList();
          this.options = response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            frontPicture: item.frontPicture,
            rearPicture: item.rearPicture,
          }));
        } catch (err) {
          console.error("Error fetching preview 2d options:", err);
        }
      }
    },
  },
});

export {
  useRoleOptionsStore,
  useMfrOptionsStore,
  useTypeOptionsStore,
  usePrev2dOptionsStore,
};
