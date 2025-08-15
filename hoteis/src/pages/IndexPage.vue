<template>
  <q-page class="index-page">
    <div class="index-page__Search row">
      <div class="col-12">
        <HotelSearch />
      </div>
    </div>

    <div class="index-page__Filter row">
      <div class="col-7">
        <HotelFilters />
      </div>
    </div>

    <div class="index-page__Cards row">
      <q-spinner v-if="hotelStore.loading" color="primary" size="3em" />
      <div class="index-page__Cards-text-div" v-else-if="hotelStore.error">
        <p class="index-page__Cards-text-negative">{{ hotelStore.error }}</p>
      </div>
      <template v-else>
        <HotelCard
          v-for="hotel in hotelStore.filteredAndSortedHotels"
          :key="`${hotel.id}-${hotel.placeId}`"
          :hotel="hotel"
          class="col-12"
          @show-details="showHotelDetails"
        />
        <div class="index-page__Cards-text-div" v-if="!hotelStore.filteredAndSortedHotels.length">
          <p class="index-page__Cards-text">Nenhum hotel encontrado.</p>
        </div>
      </template>
    </div>

    <div v-if="hotelStore.filteredAndSortedHotels.length && !hotelStore.error" class="index-page__Cards-pagination">
      <div class="index-page__Cards-pagination-div row q-gutter-x-md">
        <div class="index-page__Cards-pagination-title">
          {{ startItem }}-{{ endItem }} de {{ hotelStore.totalItems }}
        </div>
        <q-btn round dense flat icon="chevron_left" :disable="hotelStore.currentPage === 1" @click="prevPage" class="index-page__Cards-pagination-buttom" />
        <q-btn round dense flat icon="chevron_right" :disable="hotelStore.currentPage === hotelStore.totalPages"
          @click="nextPage" class="index-page__Cards-pagination-buttom" />
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