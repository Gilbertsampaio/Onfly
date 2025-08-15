<template>
  <div class="filter-container row items-center no-wrap q-col-gutter-md">
    <div class="col-12 col-md-5 float-right">
      <q-select v-model="hotelStore.sortOrder" :options="sortOptions" option-label="label" option-value="value"
        emit-value map-options dense clearable popup-content-class="sort-popup" dropdown-icon="expand_more"
        class="no-border" style="min-width: 160px;">
        <template #selected>
          <q-icon name="sort" class="q-mr-sm" />
          <span class="text-grey-8">
            Ordenado por<span v-if="hotelStore.sortOrder">: {{ sortLabelText }}</span>
            <span v-else>: nenhum</span>
          </span>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-md-7 float-left">
      <q-input v-model="hotelStore.searchTerm" placeholder="Nome do Hotel" dense outlined clearable
        class="search-input" />
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

<style scoped>
.filter-container {

  display: flex;
  justify-content: center;

  div {
    margin: 0 auto;
    padding: 6px 8px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    margin-left: 10px;
  }
}

.sort-popup {
  min-width: 140px !important;
}

.search-input {
  font-size: 14px;
}
</style>
