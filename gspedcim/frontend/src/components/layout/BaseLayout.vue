<template>
    <div class="min-w-screen min-h-screen">
        <nav class="bg-black text-white py-1">
            <div class="container mx-auto flex items-center justify-between">

                <router-link :to="homeRoute">
                    <div class="flex items-center text-white">
                        <img :src="logo" alt="GSPE Logo" class="app-logo" />
                        <div class="app-name font-semibold text-xl tracking-tight">
                            <span>DCI</span>
                            <span class="management">Management</span>
                        </div>
                    </div>
                </router-link>

                <div class="md:hidden ml-auto">
                    <button @click="toggleMenu" class="text-white focus:outline-none" style="background-color: black; border: none; width: 30px;">
                        <MyIcon name="menu" size="24px" />
                    </button>
                </div>
                <div class="flex items-center hidden md:flex text-left" style="margin-left: 40%;">
                    <!-- Main navigation item -->
                    <div class="relative dropdown" v-for="navItem in navItems" :key="navItem.to">
                        <router-link :to="navItem.to">
                            <div
                                class="flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white focus:outline-none focus:text-white">
                                {{ navItem.label }}
                                <MyIcon v-if="navItem.subNav" name="chevron-down" color="white" size="24px" />
                            </div>
                        </router-link>
                        <!-- Dropdown Menu -->
                        <div class="dropdown-menu absolute hidden bg-gray-700 text-gray-200 pt-1">
                            <!-- Iterating over dropdown items -->
                            <div class="dropdown-item relative" v-for="item in navItem.subNav" :key="item.label">
                                <router-link :to="item.to"
                                    class="flex items-center justify-between text-white  block px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">
                                    {{ item.label }}
                                    <MyIcon v-if="navItem.subNav" name="chevron-right" color="white" size="24px" />
                                </router-link>
                                <!-- Sub-sub-menu -->
                                <div class="sub-dropdown-menu absolute hidden bg-gray-600" v-if="item.subNav">
                                    <router-link :to="subItem.to"
                                        class="text-white block px-4 py-2 text-sm hover:bg-gray-500 hover:text-white"
                                        v-for="subItem in item.subNav" :key="subItem.label">
                                        {{ subItem.label }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="ml-4">
                    <i class="fas fa-user-circle text-gray-300 text-2xl hover:text-white">
                    </i>
                </div> -->
            </div>
            <!-- Panel menu for small screens -->
            <div class="md:hidden" >
            <div class="fixed inset-0 overflow-hidden zindx" v-show="isMenuVisible">
                <div class="absolute inset-0 overflow-hidden bg-gray-900 bg-opacity-75 transition-opacity">
                <div class="absolute inset-y-0 right-0 flex max-w-full pl-10">
                    <div class="pointer-events-auto relative w-screen max-w-md bg-black shadow-xl">
                    <div class="px-4 py-3 flex justify-between items-center bg-black">
                        <h2 class="text-lg font-semibold text-white">DCI Management</h2>
                        <button @click="isMenuVisible = !isMenuVisible" class="text-gray-500 hover:text-black focus:outline-none">
                        <!-- Icon to close the panel -->
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    <div class="px-4 py-2 bg-black">
                        <!-- Your content -->
                        <ul>
                        <!-- main nav -->
                        <li v-for="route in navItems" :key="route.to">
                            <button @click="handleNavigation(route)" class="block w-full text-left py-2 text-gray-800 font-medium" style="background-color: black; border: none;">
                            <span style="font-size: 18px; color: seagreen;">{{ route.label }}</span>
                            </button>
                            <ul v-show="route.showSubMenu" class="ml-2">
                            <!-- Submenu -->
                            <li v-for="subItem in route.subNav" :key="subItem.to">
                                <button @click="toggleSubSubMenu(subItem)" class="block w-full text-left py-2 text-gray-700" style="background-color: black; border: none;">
                                <span style="font-size: 16px; color: burlywood;">{{ subItem.label }}</span>
                                </button>
                                <ul v-show="subItem.showSubSubMenu">
                                <!-- Sub-Submenu -->
                                <li v-for="subSubItem in subItem.subNav" :key="subSubItem.to">
                                    <button @click="redirectTo(subSubItem.to)" class="block w-full text-left py-2 text-gray-600" style="background-color: black; border: none;">
                                    <span style="font-size: 12px; color: tomato;">{{ subSubItem.label }}</span>
                                    </button>
                                </li>
                                </ul>
                            </li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </nav>
        <main>
            <div class="main-content">
                <slot></slot>
            </div>
        </main>
    </div>
</template>


<script lang="ts">
import { ref } from 'vue';
import gspeLogo from '@/assets/logo.png';
import ROUTER from '@/constants/router';
import MyIcon from '@/components/icon/MyIcon.vue';


interface NavItem {
    label: string;
    to: string;
    subNav?: NavItem[];
    showSubMenu?: boolean;
    showSubSubMenu?: boolean;
}


export default {
    name: "BaseLayout",
    components: {
        MyIcon
    },
    props: {
        type: {
            type: String,
            default: "root",
        },
        id: String,
    },
    data() {
        const navItems = ref<NavItem[]>([
            {
                label: ROUTER.APPLICATIONS.NAME,
                to: ROUTER.APPLICATIONS.PATH
            },
            {
                label: ROUTER.DCIM_MONITORING.NAME,
                to: ROUTER.DCIM_MONITORING.PATH,
                showSubMenu:false,
                subNav: [
                    {
                        label: ROUTER.LOCATIONS.NAME,
                        to: ROUTER.LOCATIONS.PATH,
                        showSubMenu:false,
                        subNav: [
                            {
                                label: ROUTER.LOCATIONS.NAME,
                                to: ROUTER.LOCATIONS.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: ROUTER.BUILDING.NAME,
                                to: ROUTER.BUILDING.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: ROUTER.FLOOR.NAME,
                                to: ROUTER.FLOOR.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: ROUTER.ROOM.NAME,
                                to: ROUTER.ROOM.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: ROUTER.RACK.NAME,
                                to: ROUTER.RACK.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: "Simulation",
                                to: ROUTER.ROOM_SIMULATION.PATH,
                                showSubSubMenu:false,
                            }
                        ]
                    },
                    {
                        label:ROUTER.DEVICE.NAME,
                        to: ROUTER.DEVICE.PATH,
                        showSubMenu:false,
                        subNav: [
                            {
                                label: `${ROUTER.DEVICE.NAME} List`,
                                to: ROUTER.DEVICE.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: `${ROUTER.RECEIVED.NAME} List`,
                                to: ROUTER.RECEIVED.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: `${ROUTER.INSTALLED.NAME} List`,
                                to: ROUTER.INSTALLED.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: `${ROUTER.UNINSTALLED.NAME} List`,
                                to: ROUTER.UNINSTALLED.PATH,
                                showSubSubMenu:false,
                            },
                            {
                                label: `${ROUTER.MOVED.NAME} List`,
                                to: ROUTER.MOVED.PATH,
                                showSubSubMenu:false,
                            },
                        ]
                    }
                ]
            },
            {
                label: ROUTER.DCFM.NAME,
                to: ROUTER.DCFM.PATH
            },
            {
                label: ROUTER.IP_MANAGEMENT.NAME,
                to: ROUTER.IP_MANAGEMENT.PATH
            },
        ]);

        return {
            navItems,
            homeRoute: "/",
            logo: gspeLogo,
            isMenuVisible: false,
            isSubSubMenuVisible: false,
        };
    },
    methods: {
        //method to show n hide sub menu
        handleNavigation(route: NavItem) {
            if (route.label === 'DCIM Monitoring' || route.label === 'Locations' || route.label === 'Device') {
                route.showSubMenu = !route.showSubMenu;
            } else {
                this.redirectTo(route.to);
            }
        },
        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        //method to make the sub-sub menu able to show n hide
        toggleSubSubMenu(rute: NavItem) {
            // Toggle the visibility of sub-submenu
            rute.showSubSubMenu = !rute.showSubSubMenu;
        },
        //method to make the sub-sub menu able to redirect to intended page
        redirectTo(route: string | undefined) {
            // Ensure 'route' is properly received
            if (route) {
                // Redirect to the specified route
                this.$router.push(route);
            } else {
                console.error("Invalid route provided!");
            }
        },

    },

}
</script>

<style>

.zindx{
    z-index: 900;
}
.app-logo {
    margin: 4px 8px;
    width: auto;
    max-height: 50px;
}

.app-name {
    margin-left: 4px;
    display: flex;
    flex-direction: column;
    align-items: baseline;

    text-align: right;
    font-size: 24px;
    letter-spacing: 0.32px;
    line-height: 1.2;
}

.management {
    font-size: 0.8em;
}

.main-content {
    height: 100%;
    flex-grow: 1;
}

/* Styling for the dropdown menu and its sub-menu */
.dropdown-menu {
  display: none;
  position: absolute;
  min-width: 110px;
}

.dropdown:hover .dropdown-menu {
  display: block;
  text-decoration: none;
  background-color: black;
}

.sub-dropdown-menu {
  display: none;
  text-decoration: none;
  position: absolute;
  left: 100%;
  top: 0;
  min-width: 200px;
  background-color: black;
}

/* Styling for the hover effect and decoration */
.dropdown:hover .flex:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%; /* This spans the entire width of the hovered navigation */
  height: 2px; /* Adjust the thickness of the decoration */
  transition: width 0.3s ease; /* Smooth transition on width change */
}

.dropdown-item:hover>.sub-dropdown-menu {
    display: block;
}
</style>