<template>
  <div class="page-background">
    <div class="search-container">
      <div class="tab-buttons">
        <q-btn icon="flight" label="Aéreo" flat class="tab plane" />
        <q-btn icon="hotel" label="Hotel" flat class="tab active" />
        <q-btn icon="directions_car" label="Carro" flat class="tab" />
        <q-btn icon="directions_bus" label="Ônibus" flat class="tab" />
      </div>

      <div class="row container-form items-center q-pa-sm">
        <div class="col-8">
          <q-select v-model="selectedCity" :use-input="!selectedCity" input-debounce="300" :options="cityOptions"
            @filter="filterCities" placeholder="Destino" clearable outlined dense class="custom-input" hide-dropdown-icon
            style="max-width: 400px;">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhuma cidade encontrada
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="col-4">
          <q-btn type="button" label="Buscar Hotel" icon="search" color="" class="search-btn" @click="performSearch"
            :disable="!selectedCity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHotelStore, type City } from 'src/stores/hotel-store';
import type { QSelectOption } from 'quasar';

const hotelStore = useHotelStore();
const selectedCity = ref<City | null>(null);

const cityOptions = computed<QSelectOption[]>(() => {
  return hotelStore.cities.map(city => ({
    label: `${city.name}, ${city.state.name}`,
    value: String(city.placeId),
    placeId: String(city.placeId),
  }));
});

const filterCities = (val: string, update: (callback: () => void) => void) => {
  if (val.length < 3) {
    update(() => {
      hotelStore.cities = [];
    });
    return;
  }

  void hotelStore.fetchCities(val);

  update(() => {
    // A lista de cidades já é atualizada na store, então não é necessário fazer nada aqui
  });
};

const performSearch = () => {
  if (!selectedCity.value || !selectedCity.value.placeId) {
    alert('Selecione uma cidade da lista.');
    return;
  }

  if (hotelStore.loading) {
    alert('Aguarde a pesquisa atual terminar ou limpe o campo para pesquisar outra cidade.');
    return;
  }

  void hotelStore.fetchHotels(selectedCity.value.placeId);
};

</script>

<style lang="scss" scoped>
.search-container {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.tab-buttons {
  display: flex;
  gap: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
}

.tab {
  color: #9e9e9e;
  font-weight: 500;
  text-transform: none;
  min-width: 80px;
}

.tab .q-icon {
  font-size: 20px;
}

.tab.active {
  color: #03a9f4 !important;
  border-bottom: 2px solid #03a9f4;
  border-radius: 0;
}

.custom-input {
  background-color: #f7f7f7;
  border-radius: 6px;
}

.search-btn {
  width: auto;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  max-width: inherit;
}
</style>