<template>
    <BaseLayout>
        <div class="base">
            <div class="sidemenu">
                <div class="title">Location</div>
                <ul class="">
                    <!-- <router-link :to=ROUTER.DEVICE_DASHBOARD.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">{{ ROUTER.DEVICE_DASHBOARD.NAME }}</li>
                    </router-link>
                    <router-link :to=ROUTER.DEVICE_CATEGORY.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">{{ ROUTER.DEVICE_CATEGORY.NAME }}</li>
                    </router-link>
                    <router-link :to=ROUTER.DEVICE_LIST_STORED.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">{{ ROUTER.DEVICE_LIST_STORED.NAME }}</li>
                    </router-link>
                    <router-link :to=ROUTER.DEVICE_LIST_ALLOCATED.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">{{ ROUTER.DEVICE_LIST_ALLOCATED.NAME }}</li>
                    </router-link>
                    <router-link :to=ROUTER.DEVICE_LIST_RECEIVED.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">{{ ROUTER.DEVICE_LIST_RECEIVED.NAME }}</li>
                    </router-link>
                    <router-link :to=ROUTER.DEVICE_LIST_RETURNED.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">{{ ROUTER.DEVICE_LIST_RETURNED.NAME }}</li>
                    </router-link> -->

                    <p class="mt-4 mb-2">Location Settings</p>
                    <li class="py-1.5 hover:bg-gray-200 cursor-pointer">Schedule Maintenance</li>
                    
                    <router-link :to=ROUTER.DEVICE_FORM_ROLE.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">Add {{ ROUTER.DEVICE_FORM_ROLE.NAME }}</li>
                    </router-link>

                    <router-link :to=ROUTER.DEVICE_FORM_PREVIEW.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">Add {{ ROUTER.DEVICE_FORM_PREVIEW.NAME }}</li>
                    </router-link>

                    <router-link :to=ROUTER.DEVICE_FORM_MFR.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">Add {{ ROUTER.DEVICE_FORM_MFR.NAME }}</li>
                    </router-link>

                    <router-link :to=ROUTER.DEVICE_FORM_TYPE.PATH>
                        <li class="py-1.5 hover:bg-gray-200 cursor-pointer">Add {{ ROUTER.DEVICE_FORM_TYPE.NAME }}</li>
                    </router-link>
                </ul>
                <div class="img-container">
                    <img :src="serverimg" alt="server">
                </div>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </BaseLayout>
</template>

<script lang="ts" setup>
import ROUTER from '@/constants/router';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import serverimg from '@/assets/serverimg.png';

</script>

<style scoped>
.base {
    display: inline-flex;
    width: 100%;
    height: 100%;
    text-align: left;
}

.sidemenu {
    position: relative;
    padding: 4px 24px;
    background-color: #f0f0f0;
    max-width: 240px;
    min-width: 160px;
    box-shadow: 4px 0px 6px 0px rgba(83, 85, 85, 0.26);
    -webkit-box-shadow: 4px 0px 6px 0px rgba(0, 0, 0, 0.26);
    -moz-box-shadow: 4px 0px 6px 0px rgba(0, 0, 0, 0.26);
    min-height: calc(100vh - 60px);
}

.sidemenu .title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 4px;
    margin-top: 5px;
}

.sidemenu>ul {
    text-decoration: none;
}

.sidemenu>ul>li {
    color: var(--blue-neon);
}

.sidemenu>ul>p {
    color: #9d9d9d;
}

.sidemenu .img-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.content {
    flex-grow: 1;
    background-color: #ffffff;
}
</style>

<!-- global device style  -->
<style>
.device {
    padding: 8px 12px;
}

.device .head {
    padding: 0;
}

.device .title {
    font-weight: 600;
    color: var(--felgrau);
    margin-bottom: 0.5rem;
    font-size: 20px;
}

.device .subtitle {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}

.device .searchbar {
    min-width: 300px;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
}

.device .searchbar>input {
    flex-grow: 1;
}


.device .table-content {
    margin-top: 1rem;
}

.device .table-device {
    --easy-table-header-background-color: var(--felgrau);
    --easy-table-header-font-color: #ffffff;
    --easy-table-border: 2px solid var(--felgrau);
    --easy-table-footer-font-size: 12px;
}


.device .filter-item {
    padding: 4px 8px;
    margin: 0 4px;
    background-color: #6B6B6B;
    color: #ffffff;
    display: flex;
    font-weight: 600;
    font-size: 11px;
    border-radius: 4px;
    align-items: center;
    gap: 7px;

}

.device .table-device .headpoit {
    cursor: pointer;
    text-align: left;
}

.device .f-title {
    font-weight: bold;
}


/* .custom-button-pagination{
    font-size: 12px;
border
}
 */



.device .form-content {
    margin-top: 1rem;
}

.device .form-container {
    background-color: var(--white-ghost);
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    border: solid 1px #3A3A3A;
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.26);
    -webkit-box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.26);
    -moz-box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.26);
}
</style>