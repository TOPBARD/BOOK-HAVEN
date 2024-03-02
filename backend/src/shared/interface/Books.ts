import { BookCategory } from '../emun/Book-category';
import { BookSpecialCategory } from '../emun/Book-special-Category';

export interface Book {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  bookCategory: BookCategory;
  bookSpecialCategory: BookSpecialCategory;
  bookDescription: string;
  bookImageUrl: string;
  bookDetails: BookDetails;
}

export interface BookDetails {
  bookPrice: number;
  bookQuantity: number;
  isPresentInStore: boolean;
}
