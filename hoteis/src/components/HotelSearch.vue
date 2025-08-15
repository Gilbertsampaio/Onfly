<template>
  <div class="search-container-filter">
    <div class="search-container-filter__div">
      <div class="search-container-filter__tab">
        <q-btn icon="flight" label="Aéreo" flat class="tab plane" />
        <q-btn icon="hotel" label="Hotel" flat class="tab active" />
        <q-btn icon="directions_car" label="Carro" flat class="tab" />
        <q-btn icon="directions_bus" label="Ônibus" flat class="tab" />
      </div>

      <div class="search-container-filter__filter row">
        <div class="col-8">
          <q-select v-model="selectedCity" :use-input="!selectedCity" input-debounce="300" :options="cityOptions"
            @filter="filterCities" placeholder="Destino" clearable outlined dense
            class="search-container-filter__custom-input" hide-dropdown-icon style="max-width: 400px;"
            @clear="handleClear">
            <template v-slot:no-option>
              <q-item>
                <q-item v-if="hotelStore.loading">
                  <q-item-section class="search-container-filter__text">
                    Carregando cidades...
                  </q-item-section>
                </q-item>
                <q-item v-else>
                  <q-item-section class="search-container-filter__text">
                    Nenhuma cidade encontrada
                  </q-item-section>
                </q-item>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="col-4">
          <q-btn type="button" label="Buscar Hotel" icon="search" color="" class="search-container-filter__search-btn"
            @click="performSearch" :disable="!selectedCity" />
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

  console.log('teste')

  if (hotelStore.loading) {
    alert('Aguarde a pesquisa atual terminar ou limpe o campo para pesquisar outra cidade.');
    return;
  }

  void hotelStore.fetchHotels(selectedCity.value.placeId);
};

const handleClear = () => {
  selectedCity.value = null;
  void hotelStore.fetchHotels();
};
</script>