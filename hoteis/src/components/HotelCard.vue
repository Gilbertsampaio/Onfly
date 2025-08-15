<script setup lang="ts">
import { defineProps, ref } from 'vue';
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
  <q-card class="hotel-card q-mb-sm">
    <div class="row">
      <q-card-section class="col-2 relative-position q-pa-none">
        <q-img
          :src="imageSrc"
          :ratio="1"
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

      <q-card-section class="col-8 relative-position">
        <div class="text-subtitle1 text-weight-bold">{{ hotel.name }}</div>
        <div class="text-caption text-grey-7">{{ hotel.district }}</div>

        <div class="absolute-bottom full-width" style="padding: 16px;">
          <div class="row q-gutter-sm q-mb-sm">
            <div
              v-for="amenity in hotel.amenities"
              :key="amenity"
              class="icon-amenity flex flex-center"
              :title="amenity"
            >
              <q-icon :name="getAmenityIcon(amenity)" size="20px" />
            </div>
          </div>

          <div class="text-green text-weight-medium text-body2">
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
      
      <q-card-section class="col-2 text-left hotel-card__price-section">
        <div class="text-caption text-grey-6">Por dia</div>
        <div class="text-h6 text-weight-bold q-card--price">
          {{ formatBRL(hotel.dailyPrice) }}
        </div>
        <div class="text-caption text-grey-5 q-mb-md">
          No booking <span class="text-strike">{{ formatBRL(hotel.oldPrice ?? 0) }}</span>
        </div>

        <div class="text-body2 text-grey-6">
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
          class="full-width q-mt-sm"
          rounded
          @click="$emit('show-details', hotel)"
        />
      </q-card-section>
    </div>
  </q-card>
</template>