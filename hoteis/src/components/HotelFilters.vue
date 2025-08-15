<template>
  <div class="filter-container row">
    <div class="filter-container__col col-12 col-md-5">
      <q-select v-model="hotelStore.sortOrder" :options="sortOptions" option-label="label" option-value="value"
        emit-value map-options dense clearable popup-content-class="sort-popup" dropdown-icon="expand_more"
        class="filter-container__select">
        <template #selected>
          <q-icon name="sort" class="filter-container__select-icon" />
          <span class="filter-container__select-label">
            Ordenado por<span v-if="hotelStore.sortOrder">: {{ sortLabelText }}</span>
            <span v-else>: nenhum</span>
          </span>
        </template>
      </q-select>
    </div>
    <div class="filter-container__col-2 col-12 col-md-7">
      <q-input v-model="hotelStore.searchTerm" placeholder="Nome do Hotel" dense outlined clearable
        class="filter-container__search-input" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelStore } from '../stores/hotel-store';
import { computed } from 'vue';

const hotelStore = useHotelStore();

const sortOptions = [
  { label: 'Preço', value: 'price' },
  { label: 'Estrelas', value: 'stars' },
];

const sortLabelText = computed(() => {
  const selected = sortOptions.find(opt => opt.value === hotelStore.sortOrder);
  return selected?.label || '';
});

</script>