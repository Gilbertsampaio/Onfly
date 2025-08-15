import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

// Interfaces existentes
export interface City {
  placeId: number;
  name: string;
  state: {
    name: string;
    abbreviation: string;
  };
}

export interface Hotel {
  id: number;
  name: string;
  stars: number;
  dailyPrice: number;
  amenities: string[];
  thumb: string;
  placeId: number;
  district: string;
  tax: number;
}

// ? Interfaces para a nova action `fetchHotelDetails`
export interface AmenityDetails {
  key: string;
  label: string;
}

export interface HotelDetails {
  id: number;
  name: string;
  description: string;
  stars: number;
  amenities: AmenityDetails[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  fullAddress: string;
  images: string[];
}

export const useHotelStore = defineStore('hotel', () => {
  const allHotels = ref<Hotel[]>([]);
  const hotels = ref<Hotel[]>([]);
  const cities = ref<City[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const currentPage = ref(1);
  const searchTerm = ref<string>('');
  const sortOrder = ref<string>('');

  const totalItems = ref(0);
  const perPage = ref(10);
  
  // ? Nova ref para armazenar os detalhes do hotel
  const selectedHotelDetails = ref<HotelDetails | null>(null);
  
  // ? fetchHotels ajustada para buscar apenas a lista de hotéis
  async function fetchHotels(placeId?: number) {
    loading.value = true;
    error.value = null;

    try {
      const url = placeId ? `http://localhost:3000/hotels?placeId=${placeId}` : 'http://localhost:3000/hotels';
      
      const response = await axios.get<Hotel[]>(url);
      allHotels.value = response.data;
      totalItems.value = allHotels.value.length;
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = 'Failed to fetch hotels: ' + err.message;
      } else {
        error.value = 'An unexpected error occurred.';
      }
    } finally {
      loading.value = false;
    }
  }

  // ? Nova action para buscar os detalhes do hotel
  async function fetchHotelDetails(name: string, id: number) {
    loading.value = true;
    error.value = null;
    selectedHotelDetails.value = null;

    try {
      const url = `http://localhost:3000/hotels_details?name=${name}&id=${id}`;
      const response = await axios.get<HotelDetails[]>(url);

      console.log(response)
      selectedHotelDetails.value = response.data[0] ?? null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = 'Failed to fetch hotel details: ' + err.message;
      } else {
        error.value = 'An unexpected error occurred.';
      }
    } finally {
      loading.value = false;
    }
  }

  async function fetchCities(searchTerm: string) {
    if (searchTerm.length < 3) {
      cities.value = [];
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get<City[]>(`http://localhost:3000/cities?name_like=${searchTerm}`);
      const filtered = response.data.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()));
      cities.value = Array.isArray(filtered) ? filtered : [];
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = 'Failed to fetch cities: ' + err.message;
      } else {
        error.value = 'An unexpected error occurred.';
      }
    } finally {
      loading.value = false;
    }
  }

  const paginatedAndSortedHotels = computed(() => {
    const search = (searchTerm.value || '').toLowerCase();
    const filtered = allHotels.value.filter(hotel => hotel.name.toLowerCase().includes(search));

    if (sortOrder.value === 'price') {
      filtered.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (sortOrder.value === 'stars') {
      filtered.sort((a, b) => b.stars - a.stars);
    }

    const startIndex = (currentPage.value - 1) * perPage.value;
    const endIndex = startIndex + perPage.value;

    return filtered.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => {
    if (totalItems.value === 0 || perPage.value === 0) {
      return 1;
    }
    return Math.ceil(totalItems.value / perPage.value);
  });

  function setPage(page: number) {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  return {
    allHotels,
    hotels,
    cities,
    loading,
    error,
    searchTerm,
    sortOrder,
    currentPage,
    totalPages,
    totalItems,
    perPage,
    selectedHotelDetails, // ? Exportando a nova ref
    fetchHotels,
    fetchCities,
    fetchHotelDetails, // ? Exportando a nova action
    filteredAndSortedHotels: paginatedAndSortedHotels,
    setPage,
  };
});