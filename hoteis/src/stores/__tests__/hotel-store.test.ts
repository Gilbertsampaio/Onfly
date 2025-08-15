import { describe, it, expect, beforeEach, vi, type Mocked } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import type { Hotel, City, HotelDetails } from '../hotel-store';
import { useHotelStore } from '../hotel-store';
import axios from 'axios';

// Mock do axios para evitar chamadas de API reais
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

const mockHotels: Hotel[] = [
  { id: 1, name: 'Hotel A', stars: 5, dailyPrice: 200, amenities: [], thumb: 'https://placehold.co/250x250/000/FFF?text=HotelA', placeId: 101, district: 'Centro', tax: 50 },
  { id: 2, name: 'Hotel B', stars: 3, dailyPrice: 150, amenities: [], thumb: 'https://placehold.co/250x250/000/FFF?text=HotelB', placeId: 102, district: 'Centro', tax: 50 },
  { id: 3, name: 'Hotel C', stars: 4, dailyPrice: 250, amenities: [], thumb: 'https://placehold.co/250x250/000/FFF?text=HotelC', placeId: 103, district: 'Centro', tax: 50 },
];

const mockCities: City[] = [
  { placeId: 1, name: 'Belo Horizonte', state: { name: 'Minas Gerais', abbreviation: 'MG' } },
  { placeId: 2, name: 'Belo Jardim', state: { name: 'Pernambuco', abbreviation: 'PE' } },
];

const mockHotelDetails: HotelDetails[] = [
  {
    id: 1,
    name: 'Hotel São Paulo Palace',
    description: 'Hotel moderno e sofisticado, localizado no centro de São Paulo, ideal para negócios e lazer.',
    stars: 5,
    amenities: [
      { key: 'WI_FI', label: 'Wi-Fi' },
      { key: 'PARKING', label: 'Estacionamento' },
      { key: 'POOL', label: 'Piscina' },
      { key: 'RESTAURANT', label: 'Restaurante' }
    ],
    // ✅ Propriedades adicionadas para corresponder à interface HotelDetails
    hasBreakFast: true,
    hasRefundableRoom: false,
    fullAddress: 'Avenida Paulista, 1000 - Bela Vista',
    images: [
      'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_10.JPG',
      'https://s3.amazonaws.com/e-htl/uploads/hotels/10415/10415_11.JPG'
    ]
  }
];

describe('Hotel Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe('fetchHotels', () => {
    it('should fetch hotels successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockHotels });
      const store = useHotelStore();

      await store.fetchHotels();

      expect(store.allHotels.length).toBe(3);
      expect(store.loading).toBe(false);
      expect(store.error).toBe(null);
    });

    it('should handle fetch hotels error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
      const store = useHotelStore();

      await store.fetchHotels();

      expect(store.allHotels.length).toBe(0);
      expect(store.loading).toBe(false);
      expect(store.error).toBe('An unexpected error occurred.');
    });
  });

  describe('fetchCities', () => {
    it('should fetch cities successfully with a term of 3 characters or more', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockCities });
      const store = useHotelStore();

      await store.fetchCities('belo');

      expect(store.cities.length).toBe(2);
      expect(store.loading).toBe(false);
      expect(store.error).toBe(null);
    });

    it('should not fetch cities if search term is less than 3 characters', async () => {
      const store = useHotelStore();
      const spy = vi.spyOn(mockedAxios, 'get');

      await store.fetchCities('be');

      expect(spy).not.toHaveBeenCalled();
      expect(store.cities.length).toBe(0);
    });
  });

  describe('fetchHotelDetails', () => {
    it('should fetch hotel details successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockHotelDetails });
      const store = useHotelStore();

      const name = 'Hotel São Paulo Palace';
      const id = 1;
      await store.fetchHotelDetails(name, id);

      expect(store.selectedHotelDetails).toEqual(mockHotelDetails[0]);
      expect(store.loading).toBe(false);
      expect(store.error).toBe(null);
    });
  });

  describe('filteredAndSortedHotels', () => {
    let store: ReturnType<typeof useHotelStore>;

    beforeEach(() => {
      setActivePinia(createPinia());
      store = useHotelStore();
      store.allHotels = [...mockHotels];
      store.hotels = [...mockHotels];
    });

    it('should filter hotels by search term', () => {
      store.searchTerm = 'Hotel A';
      expect(store.filteredAndSortedHotels?.length).toBe(1);
      expect(store.filteredAndSortedHotels?.[0]?.name).toBe('Hotel A');
    });

    it('should sort hotels by price', () => {
      store.sortOrder = 'price';
      expect(store.filteredAndSortedHotels?.length).toBe(3);
      expect(store.filteredAndSortedHotels?.[0]?.dailyPrice).toBe(150);
      expect(store.filteredAndSortedHotels?.[1]?.dailyPrice).toBe(200);
      expect(store.filteredAndSortedHotels?.[2]?.dailyPrice).toBe(250);
    });

    it('should sort hotels by stars', () => {
      store.sortOrder = 'stars';
      expect(store.filteredAndSortedHotels?.length).toBe(3);
      expect(store.filteredAndSortedHotels?.[0]?.stars).toBe(5);
      expect(store.filteredAndSortedHotels?.[1]?.stars).toBe(4);
      expect(store.filteredAndSortedHotels?.[2]?.stars).toBe(3);
    });
  });
});