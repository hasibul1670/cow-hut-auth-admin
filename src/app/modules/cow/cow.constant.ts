import { ICowFilters } from './cow.interface';

export const locations = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const breeds = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];
export const categories = ['Dairy', 'Beef', 'DualPurpose'];
export const labels = ['for sale', 'sold out'];

//for searchTerm
export const cowSearchableFields = [
  'id',
  'name',
  'breed',
  'location',
  'label',
  'category',
];

export const cowFilterableFields: (keyof ICowFilters)[] = [
  'searchTerm',
  'id',
  'name',
  'location',
  'breed',
  'price',
  'minPrice',
  'maxPrice',
];
