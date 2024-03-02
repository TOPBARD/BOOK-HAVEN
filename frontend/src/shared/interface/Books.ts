import { BookSpecialCategory } from "../enum/Book-special-category";

export interface Book {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  bookCategory: string;
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
