<template>
    <BaseDevice>
        <LoadingState v-if="isLoading" :is-block="true" />
        <div class="device">
            <div class="head">
                <div class="title">{{ cateId !== 'new' ? "Update" : "Create New" }} Device Category </div>
                <div class="subtitle">
                    <TextButton icon="left-circle" color="white" text="Back" @click="goBack" />
                    <TextButton icon="check-circle" color="white" text="Save" bgcolor="bg-blue-fs" @click="submitForm" />
                </div>
            </div>
            <div class="form-content form-container grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                <div class="col-span-7">
                    <div class="cate-device">
                        <div class="cate-title mb-2">
                            Device
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput class="" label="Name" :is-required="true" v-model="formData.name"
                                :has-error="v$.name.$error" />
                            <SelectSingleInput class="" label="Role" v-model="formData.deviceRole"
                                :options="roleOptionsStore.options" :custom-label-function="(item: any) => item.name" />
                        </div>
                    </div>
                    <div class="cate-hardware">
                        <div class="cate-title mb-1">
                            Hardware
                        </div>
                        <div class=" grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectSingleInput class="" label="Manufacture" :options="mfrOptionsStore.options"
                                :custom-label-function="(item: any) => item.name" v-model="formData.manufacturer" />
                            <SelectSingleInput class="" label="Device Type" :options="typeOptionsStore.options"
                                v-model="formData.deviceType" :custom-label-function="(item: any) => item.name" />
                            <TextInput class="" label="Height" placeholder="0" input-type="number" :is-required="true"
                                :has-error="v$.height.$error" v-model="formData.height" />
                            <TextInput class="" label="Weight" placeholder="0" input-type="number" :is-required="true"
                                :has-error="v$.weight.$error" v-model="formData.weight" />
                            <TextInput class="" label="Wattage" placeholder="0" input-type="number" :is-required="true"
                                :has-error="v$.wattage.$error" v-model="formData.wattage" />
                            <TextInput class="" label="No. Power Connections" placeholder="0" input-type="number"
                                v-model="formData.noPower" />
                            <TextInput class="" label="No. Ports" placeholder="0" input-type="number"
                                v-model="formData.noPorts" />
                        </div>
                    </div>
                </div>
                <div class="cate-simulate col-span-5">
                    <div class="cate-title mb-2">
                        Simulate Preview
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <!-- <SelectSingleInput class="" v-model="formData.device2dShape" :is-required="true"
                            :custom-label-function="(item: any) => item.name" :options="prev2dOptionsStore.options"
                            :has-error="v$.device2dShape.$error" label="2D Preview"
                            helper="*shape to be used in the RACK simulation" />

                        <div class="mb-6">
                            <p class="img-label mb-2">Front view</p>
                            <img src="https://placehold.co/600x150"
                                alt="Placeholder image representing the front view of a device with various ports and indicators."
                                class="border rounded w-full">
                        </div>
                        <div>
                            <p class="img-label mb-2">Rear view</p>
                            <img src="https://placehold.co/600x150"
                                alt="Placeholder image representing the rear view of a device with power connections and ventilation slots."
                                class="border rounded w-full">
                        </div> -->

                        <!-- <SelectSingleInput v-model="selected2dShape" :options="prev2dOptionsStore.options" @change="updateSelectedShape"/> -->
                        <SelectSingleInput class="" v-model="selected2dShape" :is-required="true"
                            :custom-label-function="(item: any) => item.name" :options="prev2dOptionsStore.options"
                            :has-error="v$.device2dShape.$error" label="2D Preview"
                            helper="*shape to be used in the RACK simulation" />

                        <!-- Updated image tags -->
                        <!-- Assuming selected2dShape is reactive and properly updated -->
                        <img :src="getFrontPictureUrl()" alt="Front view" class="border rounded w-full">
                        <img :src="getRearPictureUrl()" alt="Rear view" class="border rounded w-full">

                    </div>
                </div>
            </div>
        </div>
    </BaseDevice>
</template>


<script lang="ts" setup>
import TextButton from '@/components/button/TextButton.vue';
import BaseDevice from './BaseDevice.vue';
import { useRoute, useRouter } from 'vue-router';
import TextInput from '@/components/Form/TextInput.vue';
import SelectSingleInput from '@/components/Form/SelectSingleInput.vue';
import { useMfrOptionsStore, usePrev2dOptionsStore, useRoleOptionsStore, useTypeOptionsStore } from './states/dropdownDevice';
import { onMounted, reactive, ref, Ref, watch } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { createNewDeviceCategory, fetchDeviceCategoryDetail, updatedeviceCategory } from '@/services/monitoring/Device/device-category';
import { LoadingState } from '@/components/state';
import { SnackbarType, useSnackbar } from '@/services/snackbarService';
import { useDelay } from '@/helper/miscelanus';

function goBack() {
    router.go(-1);
}
const { showSnackbar } = useSnackbar();
const router = useRouter();
const route = useRoute();

interface Preview2DShape {
  id?: number;
  name?: string;
  frontPicture?: string;
  rearPicture?: string;
}

const roleOptionsStore = useRoleOptionsStore();
const mfrOptionsStore = useMfrOptionsStore();
const typeOptionsStore = useTypeOptionsStore();
const prev2dOptionsStore = usePrev2dOptionsStore();
const isLoading = ref(false);
const cateId = route.params.id as string;
const defaultImage = 'https://placehold.co/600x150';
// Reactive property for the selected option
const selected2dShape: Ref<Preview2DShape> = ref({});


const formData = reactive({
    name: '',
    deviceRole: null,
    manufacturer: null,
    deviceType: null,
    height: null,
    weight: null,
    wattage: null,
    noPower: null,
    noPorts: null,
    device2dShape: null,
});

const getFrontPictureUrl = () => {
  return selected2dShape.value.frontPicture || defaultImage;
};

const getRearPictureUrl = () => {
  return selected2dShape.value.rearPicture || defaultImage;
};

// Update this method according to your actual data structure
function updateSelectedShape(value:any) {
  // Assuming `value` is the ID of the selected option
  const selectedOption = prev2dOptionsStore.options.find(option => option.id === value);
  if (selectedOption) {
    selected2dShape.value = selectedOption;
  } else {
    selected2dShape.value = {}; // Reset or handle as needed
  }
}

// If you're directly binding selected2dShape to v-model, ensure to watch changes
watch(() => formData.device2dShape, (newValue) => {
  updateSelectedShape(newValue);
}, { immediate: true });


async function fetchDetail(id: string) {

    console.log("Invoke fetch detail");
    try {
        const resp = await fetchDeviceCategoryDetail(id);
        if (resp && resp.data) {
            showSnackbar('Success fetch data', SnackbarType.Success);
            Object.assign(formData, resp.data);
            console.log(resp.data);
            console.log(formData.deviceType);
            console.log("-----");

        } else {
            console.error('Unexpected response structure:', resp);

        }
    } catch (err) {
        showSnackbar(`Error : ${err}`, SnackbarType.Error);

        console.error('Error fetching location data:', err);
    }
}
// Validation rules
const rules = {
    manufacturer: {},
    deviceType: {},
    height: { required },
    weight: { required },
    wattage: { required },
    noPower: {},
    noPorts: {},
    name: { required },
    device2dShape: { required }

}
// Vuelidate instance
const v$ = useVuelidate(rules, formData);

async function submitForm() {

    console.log("invoke submit form");
    v$.value.$touch();

    if (!v$.value.$invalid) {

        const finalData = { ...formData };
        finalData.device2dShape = formData.device2dShape!['id'] ?? 0;
        finalData.manufacturer = formData.manufacturer!['id'] ?? 0;
        finalData.deviceRole = formData.deviceRole!['id'] ?? 0;
        finalData.deviceType = formData.deviceType!['id'] ?? 0;

        console.log(finalData);

        try {
            isLoading.value = true;
            await useDelay(2000);
            const resp = cateId !== 'new' ? await updatedeviceCategory(finalData, cateId) : await createNewDeviceCategory(finalData);
            if (resp.status == 201) {
                showSnackbar('Category Successfully Created', SnackbarType.Success);
                // todo
                // invoke fetch dropdown category store here
                goBack();
            } else if (resp.status == 200) {
                showSnackbar('Category Successfully Updated', SnackbarType.Success);
                // todo
                // invoke fetch dropdown category store here
                goBack();
            } else {
                throw ("Something went wrong with code " + resp.status);
            }
        } catch (e) {
            showSnackbar(`Error : ${e}`, SnackbarType.Error);

            console.log(e);
        } finally {
            isLoading.value = false;
        }
    }
}


onMounted(async () => {
    if (cateId != 'new') {
        await fetchDetail(cateId);
    }
    await roleOptionsStore.fetchRoleOptions();
    await mfrOptionsStore.fetchMfrOptions();
    await typeOptionsStore.fetchTypeOptions();
    await prev2dOptionsStore.fetchPreview2dOptions();
});

</script>


<style scoped>
.cate-title {
    font-weight: bold;
}

.cate-device {
    /* background-color: beige; */
    margin-bottom: 20px;
}

.cate-hardware {
    margin-bottom: 12px;

    /* background-color: aquamarine; */
}

.cate-simulate {
    /* background-color: aqua; */
    margin-bottom: 12px;
}

.img-label {
    font-size: 12px;
}
</style>