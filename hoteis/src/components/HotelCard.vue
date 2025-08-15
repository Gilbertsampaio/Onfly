<script setup lang="ts">
import { ref } from 'vue';
import defaultImage from '../assets/hotel-image-placeholder.png';
import { formatBRL } from '../helpers/formatCurrency';

// 1. ✅ A interface Hotel agora inclui id e placeId para que o componente saiba que eles existem.
interface Hotel {
  id: number;
  placeId: number;
  thumb: string | null;
  stars: number | string;
  name: string;
  district?: string;
  amenities: string[];
  dailyPrice: number | string;
  oldPrice?: number | string;
  tax: number | string;
}

const props = defineProps<{ hotel: Hotel }>();
const hotel = props.hotel;
const imageSrc = ref(hotel.thumb && hotel.thumb.trim() !== '' ? hotel.thumb : defaultImage);

function onImgError() {
  imageSrc.value = defaultImage;
}

const getAmenityIcon = (amenity: string): string => {
  const icons: Record<string, string> = {
    ar: 'ac_unit',
    sol: 'wb_sunny',
    WI_FI: 'wifi',
    POOL: 'pool',
    acessibilidade: 'accessible',
    ROOM_SERVICE: 'room_service',
    SPA: 'spa',
    FITNESS_CENTER: 'fitness_center',
    RESTAURANT: 'restaurant',
    PARKING: 'local_parking',
    PET_FRIENDLY: 'pets',
    STEAM_ROOM: 'hot_tub',
    BAR: 'local_bar',
  };

  return icons[amenity] || 'help_outline';
};
</script>

<template>
  <q-card class="hotal-card-dv q-mb-sm">
    <div class="row">
      <q-card-section class="hotel-card col-3 relative-position q-pa-none">
        <q-img
          :src="imageSrc"
          class="hotel-card__image"
          @error="onImgError"
        />
        <div class="hotel-card__stars absolute-top-left q-pa-sm">
          <q-rating
            :model-value="Number(hotel.stars)"
            max="5"
            size="1em"
            color="blue"
            icon="star"
            readonly
          />
        </div>
      </q-card-section>

      <q-card-section class="hotel-card col-7 relative-position">
        <div class="hotel-card__title text-weight-bold">{{ hotel.name }}</div>
        <div class="hotel-card__district">{{ hotel.district }}</div>

        <div class="hotel-card__amenity absolute-bottom full-width">
          <div class="row q-gutter-sm q-mb-sm">
            <div
              v-for="amenity in hotel.amenities"
              :key="amenity"
              class="hotel-card__amenity-icon flex flex-center"
              :title="amenity"
            >
              <q-icon :name="getAmenityIcon(amenity)" size="20px" />
            </div>
          </div>

          <div class="hotel-card__tags">
            <div class="q-mb-xs">
              <q-icon name="payments" size="18px" class="q-mr-xs" />
              Reembolsável
            </div>
            <div>
              <q-icon name="coffee" size="18px" class="q-mr-xs" />
              Café da manhã
            </div>
          </div>
        </div>
      </q-card-section>
      
      <q-card-section class="hotel-card col-2 text-left">
        <div class="hotel-card__price-msg1">Por dia</div>
        <div class="hotel-card__price-msg2">
          {{ formatBRL(hotel.dailyPrice) }}
        </div>
        <div class="hotel-card__price-msg3">
          No booking <span class="hotel-card__price-msg4">{{ formatBRL(hotel.oldPrice ?? 0) }}</span>
        </div>

        <div class="hotel-card__price-msg5">
          <div class="row justify-between q-mb-xs">
            <span>Diarias</span>
            <span>{{ formatBRL(hotel.dailyPrice) }}</span>
          </div>
          <div class="row justify-between q-mb-xs">
            <span>Taxas</span>
            <span>{{ formatBRL(hotel.tax || 0) }}</span>
          </div>
          <div class="row justify-between q-mb-sm">
            <span>Total</span>
            <span class="text-weight-medium">
              {{ formatBRL((+hotel.dailyPrice + +(hotel.tax || 0))) }}
            </span>
          </div>
        </div>

        <q-btn
          label="Ver detalhes"
          color=""
          class="hotel-card__buttom"
          rounded
          @click="$emit('show-details', hotel)"
        />
      </q-card-section>
    </div>
  </q-card>
</template>