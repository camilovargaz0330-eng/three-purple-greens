/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'cepa' | 'topico' | 'extracto';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  price: number;
  rating: number;
  imageUrl: string;
  thc?: string;
  cbd?: string;
  terpenes?: string[];
  effects?: string[];
  sizeOrWeight?: string;
}

export interface UpcomingEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  description: string;
  capacity: number;
  registeredCount: number;
  price: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
