<template>
  <BaseLocation>
    <!-- <LoadingState v-if="isLoading" :is-block="true" /> -->
      <div class="rack-simulator">
      <h2>Rack Simulator</h2>
      <div class="devices-list">
        <h3>Available Devices</h3>
        <div
          class="device"
          v-for="device in devices"
          :key="device.id"
          draggable="true"
          @dragstart="dragStart(device)"
        >
          <img :src="device.image" :alt="device.name" class="device-image">
          <p>{{ device.name }}</p>
        </div>
      </div>
      <div class="rack">
        <h3>Rack Slots</h3>
        <div
          class="rack-slot"
          v-for="(slot, index) in rackSlots"
          :key="index"
          @dragover.prevent
          @drop="drop( index)"
        >
          <img v-if="slot.device" :src="slot.device.image" :alt="slot.device.name" class="device-image">
          <p v-else>Empty Slot</p>
        </div>
      </div>
    </div>
  </BaseLocation>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import TextButton from '@/components/button/TextButton.vue';
import BaseLocation from './BaseLocation.vue';
import { SnackbarType, useSnackbar } from '@/services/snackbarService';
import { fetch2DPreviewList } from '@/services/monitoring/Device/device-2d';
import LoadingState from '@/components/state/Loading.vue';
import EmptyState from '@/components/state/Empty.vue'; 

const { showSnackbar } = useSnackbar();

export default {
  components: {
    TextButton,
    BaseLocation,
    LoadingState,
    EmptyState,
  },

  setup() {
    const rackSlots = ref(Array(32).fill({})); // 32 empty rack slots
    let draggedDevice: null = null;
    const isLoading = ref(false);
    const devices = ref([
      { id: 1, name: 'Device A', image: 'https://via.placeholder.com/100' },
      { id: 2, name: 'Device B', image: 'https://via.placeholder.com/100' },
    ]);

    function dragStart(device:any) {
      draggedDevice = device;
    }

    function drop( slotIndex:any) {
      if (draggedDevice) {
        rackSlots.value[slotIndex] = { device: draggedDevice };
        draggedDevice = null; // Reset dragged device
      }
    }

    async function fetchDevices() {
      isLoading.value = true;
      try {
        const response = await fetch2DPreviewList();
        if (response && response.data && response.data.length > 0) {
          // Update devices with API data if successful
          devices.value = response.data.map((device:any) => ({
            id: device.id,
            name: device.name,
            image: device.frontImage, // Adjust according to your API structure
          }));
          showSnackbar('Successfully fetched devices', SnackbarType.Success);
        } else {
          throw new Error('No data or failed to fetch devices');
        }
      } catch (error) {
        // Keep the dummy data if the API call fails
        console.error('Error fetching device data or API call failed:', error);
        showSnackbar(`Error fetching device data: ${error}`, SnackbarType.Error);
      } finally {
        isLoading.value = false;
      }
    }

    onMounted(fetchDevices);

    return {
      devices,
      rackSlots,
      dragStart,
      drop,
      fetchDevices,
    };
  },

  methods: {}
};
</script>

<style scoped>
.rack-simulator {
  display: flex;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
}

.rack-simulator {
  display: flex;
  justify-content: space-between;
}

.rack {
  background-image: url('/frontend/src/assets/rack.jpg');
}

.devices-list, .rack {
  border: 1px solid #ccc;
  padding: 10px;
  width: 48%;
}

.device, .rack-slot {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
}

.device-image {
  max-width: 100px;
  height: auto;
}

.device {
  cursor: grab;
}

.rack-slot {
  min-height: 50px;
}
</style>

