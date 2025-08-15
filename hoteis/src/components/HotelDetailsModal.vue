<template>
    <q-dialog v-model="visible">
        <q-card class="hotel-card-details">
            <div class="hotel-card-details__scrollable-modal">
                <div style="padding-right: 5px;">
                    <q-card-section class="hotel-card-details__div-title">
                        <div class="row items-center no-wrap">
                            <div class="col">
                                <div class="hotel-card-details__title">{{ hotelDetails?.name }}</div>
                            </div>
                            <div class="hotel-card-details__div-close">
                                <q-btn flat round icon="close" @click="closeModal" class="hotel-card-details__buttom-close"/>
                            </div>
                        </div>
                    </q-card-section>
    
                    <q-card-section class="hotel-card-details__div-img">
                        <template v-if="hotelDetails?.images && hotelDetails.images.length > 1">
                            <q-carousel v-model="slide" animated infinite :autoplay="3000" transition-prev="slide-right"
                                transition-next="slide-left" height="300px" class="hotel-card-details__image_modal" ref="carouselRef">
                                <q-carousel-slide class="hotel-card-details__image_modal-slice" v-for="(image, index) in hotelDetails.images" :key="index" :name="index">
                                    <q-img :src="image" :ratio="1" />
                                </q-carousel-slide>
    
                                <template v-slot:control>
                                    <div class="hotel-card-details__buttons_modal row justify-between">
                                        <q-btn round dense unelevated color="white" text-color="primary" icon="chevron_left"
                                            @click="carouselRef?.previous()" />
                                        <q-btn round dense unelevated color="white" text-color="primary" icon="chevron_right"
                                            @click="carouselRef?.next()" />
                                    </div>
                                </template>
                            </q-carousel>
                        </template>
                        <template v-else>
                            <q-img :src="defaultImage" :ratio="1" class="hotel-card-details__image_modal" />
                        </template>
    
                        <div class="hotel-card-details__rating">
                            <q-rating :model-value="Number(hotelDetails?.stars)" max="5" size="1em" color="blue" icon="star"
                                readonly />
                        </div>
                    </q-card-section>
    
                    <q-card-section class="hotel-card-details-section">
                        <div class="hotel-card-details__title-bloco-1">Comodidades</div>
                        <div class="hotel-card-details__descriptions-bloco-1 row">
                            <div v-for="amenity in hotelDetails?.amenities" :key="amenity.key" class="col-6 q-mb-sm">
                                <q-icon class="hotel-card-details__icon-amenity-bloco-1" :name="getAmenityIcon(amenity.key)" size="20px" />
                                <span class="hotel-card-details__text-bloco-1">{{ amenity.label }}</span>
                            </div>
                        </div>
                    </q-card-section>
    
                    <q-card-section class="hotel-card-details-section">
                        <div class="hotel-card-details__title-bloco-2">Localização</div>
                        <div class="hotel-card-details__descriptions-bloco-2">{{ hotelDetails?.fullAddress }}</div>
                    </q-card-section>
    
                    <q-card-section class="hotel-card-details-section">
                        <div class="hotel-card-details__title-bloco-3">Sobre o {{ hotelDetails?.name }}</div>
                        <div class="hotel-card-details__descriptions-bloco-3">{{ hotelDetails?.description }}</div>
                    </q-card-section>
                </div>    
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import defaultImage from '../assets/hotel-image-placeholder.png';
import { QCarousel } from 'quasar';
import { useHotelStore } from 'src/stores/hotel-store';
import type { Hotel } from 'src/stores/hotel-store';

const store = useHotelStore();
const props = defineProps<{
    modelValue: boolean;
    hotel: Hotel | null;
}>();

const emit = defineEmits(['update:modelValue']);
const visible = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
    },
});

const slide = ref(0);
const carouselRef = ref<QCarousel | null>(null);

const getAmenityIcon = (amenityKey: string): string => {
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
    return icons[amenityKey] || 'help_outline';
};

watch(
    () => props.hotel,
    async (newHotel) => {
        if (newHotel && newHotel.name) {
            await store.fetchHotelDetails(newHotel.name, newHotel.id);
            slide.value = 0;
        } else {
            store.selectedHotelDetails = null;
        }
    },
    { immediate: true }
);

const hotelDetails = computed(() => store.selectedHotelDetails);

const closeModal = () => {
    visible.value = false;
};
</script>