<template>
    <BaseDevice>
        <div class="device">
            <div class="head">
                <div class="title">{{ ROUTER.DEVICE_LIST_STORED.NAME }} List</div>
                <div class="subtitle">
                    <router-link :to="`${ROUTER.DEVICE_LIST_ALLOCATED.PATH}/form/new`">
                        <TextButton icon="allocate" color="white" text="Allocate Device"></TextButton>
                    </router-link>
                    <router-link :to="`${ROUTER.DEVICE_LIST_RETURNED.PATH}/form/new`">
                        <TextButton icon="return" color="white"></TextButton>
                    </router-link>
                    <TextButton icon="reload" color="white"></TextButton>
                    <div class="searchbar items-center bg-gray-200 px-3 py-1.5">
                        <input type="text" placeholder="Search..." class="bg-gray-200 outline-none ml-2">
                        <TheIcon name="search" color="grey" />
                    </div>
                </div>
            </div>
            <div class="table-content">
                <!-- Filters -->
                <div class="bg-gray-200 rounded">
                    <div class="pr-4 pl-1 pt-1 ">
                        <span class="text-sm ">Filters:</span>
                    </div>
                    <div class="flex items-center pb-1.5">
                        <div class="flex flex-wrap gap-y-1">
                            <div class="filter-item" v-if="selectedRole">
                                <span>Role: {{ selectedRole?.name }}</span>
                                <TheIcon color="white" name="x-small" @click="selectRole(undefined)" />
                            </div>
                            <div class="filter-item" v-if="selectedMfr">
                                <span>Manufacture: {{ selectedMfr?.name }}</span>
                                <TheIcon color="white" name="x-small" @click="selectMfr(undefined)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="errMsg">
                    <ErrorState :error-message="errMsg" />
                </div>
                <div v-else>
                    <Vue3EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
                        :server-items-length="serverItemsLength" :loading="isLoading" table-class-name="table-device"
                        buttons-pagination>
                        <template #header-deviceRole="header">
                            <div @click="isDropdownRoleVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>
                        <template #header-manufacturerName="header">
                            <div @click="isDropdownMfrVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>
                        <template #header-deviceTypeName="header">
                            <div @click="isDropdownTypeVisible = true" class="headpoit">
                                {{ header.text }}
                            </div>
                        </template>
                        <template #loading>
                            <LoadingState />
                        </template>
                        <template #empty-message>
                            <EmptyState />
                        </template>
                        <template #item-actions="{ id }">
                            <!-- todo: reduce icon size -->
                            <TheIcon color="blue" @click="editItem(id)" name="edit" />
                            <TheIcon color="red" @click="deleteDevice(id)" name="delete" />
                        </template>
                    </Vue3EasyDataTable>

                </div>
            </div>
        </div>
        <ModalFilter :options="roleOptionsStore.options" :isVisible="isDropdownRoleVisible"
            @update:isVisible="isDropdownRoleVisible = $event" @selected="selectRole" title="Select a Role" />
        <ModalFilter :options="mfrOptionsStore.options" :isVisible="isDropdownMfrVisible"
            @update:isVisible="isDropdownMfrVisible = $event" @selected="selectMfr" title="Select a Manufacture" />
        <ModalFilter :options="typeOptionsStore.options" :isVisible="isDropdownTypeVisible"
            @update:isVisible="isDropdownTypeVisible = $event" @selected="selectType" title="Select a Type" />

    </BaseDevice>
</template>

<script lang="ts" setup>
import BaseDevice from './BaseDevice.vue';
import Vue3EasyDataTable, { Header, Item, ServerOptions, SortType } from 'vue3-easy-data-table';
import ROUTER from '@/constants/router';
import TextButton from '@/components/button/TextButton.vue';
import TheIcon from '@/components/icon/TheIcon.vue';
import { EmptyState, ErrorState, LoadingState } from '@/components/state';
import { handleClickOutside } from '@/helper/miscelanus';
import router from '@/router';
import { useMfrOptionsStore, useRoleOptionsStore, useTypeOptionsStore } from './states/dropdownDevice';
import { DropdownOption, rowPerPage } from '@/constants';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { StoredParam } from '@/services/monitoring/Device/device-stored';
import { useRoute } from 'vue-router';
import ModalFilter from './ModalFilter.vue';


const roleOptionsStore = useRoleOptionsStore();
const typeOptionsStore = useTypeOptionsStore();
const mfrOptionsStore = useMfrOptionsStore();
const data = ref<Item[]>([]);
const selectedRole = ref<DropdownOption>();
const selectedMfr = ref<DropdownOption>();
const selectedType = ref<DropdownOption>();

const isLoading = ref(false);
const errMsg = ref('');
const serverItemsLength = ref(0);

const isDropdownRoleVisible = ref(false);
const isDropdownTypeVisible = ref(false);
const isDropdownMfrVisible = ref(false);

const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: rowPerPage,
    sortBy: "",
    sortType: "desc",
});

const storedParam = ref<StoredParam>({
    page: serverOptions.value.page,
    sortBy: serverOptions.value.sortBy,
    sortType: serverOptions.value.sortType,
    pageSize: serverOptions.value.rowsPerPage,
    name: "",
    deviceRole: selectedRole.value?.id,
    manufacturer: selectedMfr.value?.id,
    deviceType: undefined,
    serialNo: undefined,
    location: undefined,
    rack: undefined,
    // other param here
});

const selectRole = (option: DropdownOption | undefined) => {
    selectedRole.value = option;
    storedParam.value.deviceRole = option?.id;
    isDropdownRoleVisible.value = false;
};
const selectMfr = (option: DropdownOption | undefined) => {
    selectedMfr.value = option;
    storedParam.value.manufacturer = option?.id;
    isDropdownMfrVisible.value = false;
};
const selectType = (option: DropdownOption | undefined) => {
    selectedType.value = option;
    storedParam.value.deviceType = option?.id;
    isDropdownTypeVisible.value = false;
};
async function loadData() {
    console.log("Loading data");
    // isLoading.value = true;
    errMsg.value = "";
}
async function deleteDevice(id: number) {
    console.log(id);
}

onMounted(async () => {
    document.addEventListener('click', handleClickOutside);
    loadData();
    await roleOptionsStore.fetchRoleOptions();
    await mfrOptionsStore.fetchMfrOptions();
    await typeOptionsStore.fetchTypeOptions();

});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});


watch(serverOptions, () => {
    storedParam.value.page = serverOptions.value.page;
    storedParam.value.pageSize = serverOptions.value.rowsPerPage;
    storedParam.value.sortBy = serverOptions.value.sortBy as string;
    storedParam.value.sortType = serverOptions.value.sortType as SortType;
}, {
    deep: true
});


const headers: Header[] = [
    { text: "Name", value: "name" },
    { text: "Role", value: "deviceRole" },
    { text: "Manufacture", value: "manufacturerName" },
    { text: "Device Type", value: "deviceTypeName", },
    { text: "Height", value: "height", sortable: true },
    { text: "Weight (kg)", value: "weight", sortable: true },
    { text: "Wattage", value: "wattage", sortable: true },
    { text: "Action", value: "actions" },
];

const items = computed(() => data.value);
const route = useRoute();
const currentPath = route.path;
const editItem = (id: number) => {
    router.push(`${currentPath}/form/${id}`).catch(err => {
        console.error(err);
    });
};
</script>

<style scoped></style>
