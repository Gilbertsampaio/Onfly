<template>
  <q-page>
    <div class="row q-px-xl">
      <div class="col-12">
        <HotelSearch />
      </div>
    </div>

    <div class="row q-px-xl justify-center" style="position: relative; bottom: -45px; margin-top: -35px;">
      <div class="col-7">
        <HotelFilters />
      </div>
    </div>

    <div class="row container-body justify-center q-mt-md q-px-xl q-pt-xl">
      <q-spinner v-if="hotelStore.loading" color="primary" size="3em" />
      <div v-else-if="hotelStore.error">
        <p class="text-h6 text-negative">{{ hotelStore.error }}</p>
      </div>
      <template v-else>
        <HotelCard
          v-for="hotel in hotelStore.filteredAndSortedHotels"
          :key="`${hotel.id}-${hotel.placeId}`"
          :hotel="hotel"
          class="col-12"
          @show-details="showHotelDetails"
        />
        <div v-if="!hotelStore.filteredAndSortedHotels.length" style="height: 200px; align-items: center; display: flex;">
          <p class="text-h6" style="color: var(--q-info-400) !important;">Nenhum hotel encontrado.</p>
        </div>
      </template>
    </div>

    <div v-if="hotelStore.filteredAndSortedHotels.length" class="q-pa-md q-px-xl flex justify-end pagination">
      <div class="row items-center q-gutter-x-md">
        <div class="custom-pagination-title">
          {{ startItem }}-{{ endItem }} de {{ hotelStore.totalItems }}
        </div>
        <q-btn round dense flat icon="chevron_left" :disable="hotelStore.currentPage === 1" @click="prevPage" class="custom-pagination-button" />
        <q-btn round dense flat icon="chevron_right" :disable="hotelStore.currentPage === hotelStore.totalPages"
          @click="nextPage" class="custom-pagination-button" />
      </div>
    </div>
    
    <HotelDetailsModal v-model="modalVisible" :hotel="selectedHotel" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useHotelStore, type Hotel } from 'src/stores/hotel-store';
import HotelCard from 'src/components/HotelCard.vue';
import HotelSearch from 'src/components/HotelSearch.vue';
import HotelFilters from 'src/components/HotelFilters.vue';
import HotelDetailsModal from 'src/components/HotelDetailsModal.vue';

const hotelStore = useHotelStore();

// Lógica para a paginação
const startItem = computed(() => (hotelStore.currentPage - 1) * hotelStore.perPage + 1);
const endItem = computed(() => Math.min(hotelStore.currentPage * hotelStore.perPage, hotelStore.totalItems));

function prevPage() {
  if (hotelStore.currentPage > 1) hotelStore.currentPage--;
}

function nextPage() {
  if (hotelStore.currentPage < hotelStore.totalPages) hotelStore.currentPage++;
}

// Lógica para o modal
const modalVisible = ref(false);
const selectedHotel = ref<Hotel | null>(null);

const showHotelDetails = (hotel: Hotel) => {
  selectedHotel.value = hotel;
  modalVisible.value = true;
};

onMounted(async () => {
  await hotelStore.fetchHotels();
});
</script>

<style scoped>
.pagination {
  border-top: 1px solid #e0e0e0;
}

.custom-pagination-title {
  font-size: 14px;
  color: #616161;
}

.custom-pagination-button {
  border: 1px solid #0097a7;
  border-radius: 8px;
  color: #0097a7;
  background-color: transparent !important;
  min-width: 36px;
  height: 36px;
}

.custom-pagination-button:hover {
  background-color: rgba(0, 151, 167, 0.1);
}

.custom-pagination-button:disabled {
  border-color: #ccc;
  color: #ccc;
  background-color: transparent !important;
}

.custom-pagination-button .q-icon {
  font-size: 16px;
}
</style>