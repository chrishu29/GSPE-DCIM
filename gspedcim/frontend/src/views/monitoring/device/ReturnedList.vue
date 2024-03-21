<template>
    <BaseDevice>
        <div class="device">
            <div class="head">
                <div class="title">{{ ROUTER.DEVICE_LIST_RETURNED.NAME }} List</div>
                <div class="subtitle">
                    <router-link :to="`${ROUTER.DEVICE_LIST_RETURNED.PATH}/form/new`">
                        <TextButton icon="plus" color="white" text="Return Device" />
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
                        <!-- todo: styling pagination button  -->

                    </Vue3EasyDataTable>
                </div>
            </div>
        </div>
        <ModalFilter :options="roleOptionsStore.options" :isVisible="isDropdownRoleVisible"
            @update:isVisible="isDropdownRoleVisible = $event" @selected="selectRole" title="Select a Role" />
        <ModalFilter :options="mfrOptionsStore.options" :isVisible="isDropdownMfrVisible"
            @update:isVisible="isDropdownMfrVisible = $event" @selected="selectMfr" title="Select a Manufacture" />
    </BaseDevice>
</template>

<script lang="ts" setup>
import BaseDevice from './BaseDevice.vue';
import TextButton from '@/components/button/TextButton.vue';
import TheIcon from '@/components/icon/TheIcon.vue';
import { ErrorState } from '@/components/state';
import { DropdownOption, ROUTER, rowPerPage } from '@/constants';
import { ReturnParam } from '@/services/monitoring/Device/device-return';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import { useMfrOptionsStore, useRoleOptionsStore } from './states/dropdownDevice';
import ModalFilter from './ModalFilter.vue';
import { Header, Item, ServerOptions, SortType } from 'vue3-easy-data-table';
import { useRoute } from 'vue-router';
import router from '@/router';
import { handleClickOutside } from '@/helper/miscelanus';



const roleOptionsStore = useRoleOptionsStore();
const mfrOptionsStore = useMfrOptionsStore();
const data = ref<Item[]>([]);
const selectedRole = ref<DropdownOption>();
const selectedMfr = ref<DropdownOption>();

const isLoading = ref(false);
const errMsg = ref('');
const serverItemsLength = ref(0);

const isDropdownRoleVisible = ref(false);
const isDropdownMfrVisible = ref(false);

const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: rowPerPage,
    sortBy: "",
    sortType: "desc",
});

const returnParam = ref<ReturnParam>({
    page: serverOptions.value.page,
    sortBy: serverOptions.value.sortBy,
    sortType: serverOptions.value.sortType,
    pageSize: serverOptions.value.rowsPerPage,
    name: "",
    deviceRole: selectedRole.value?.id,
    manufacturer: selectedMfr.value?.id,
    deviceType: undefined,
    returnBy: undefined,
    returnDate: undefined,
    // other param here
});
const selectRole = (option: DropdownOption | undefined) => {
    selectedRole.value = option;
    returnParam.value.deviceRole = option?.id;
    isDropdownRoleVisible.value = false;
};
const selectMfr = (option: DropdownOption | undefined) => {
    selectedMfr.value = option;
    returnParam.value.manufacturer = option?.id;
    isDropdownMfrVisible.value = false;
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
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

watch(serverOptions, () => {
    returnParam.value.page = serverOptions.value.page;
    returnParam.value.pageSize = serverOptions.value.rowsPerPage;
    returnParam.value.sortBy = serverOptions.value.sortBy as string;
    returnParam.value.sortType = serverOptions.value.sortType as SortType;
}, {
    deep: true
});

const headers: Header[] = [
    { text: "Name", value: "name" },
    { text: "Role", value: "deviceRole" },
    { text: "Manufacture", value: "manufacturerName" },
    { text: "Return By", value: "returnBy" },
    { text: "Return Date", value: "returnDate" },
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
