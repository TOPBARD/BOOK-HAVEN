import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDetails } from './schema/book-details.schema';
import { BookCategory } from '../../src/shared/emun/Book-category';
import { BookSpecialCategory } from '../../src/shared/emun/Book-special-Category';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(BookDetails.name) private bookDetailModel: Model<BookDetails>,
  ) {}

  /**
   * Inserts a new book into the database.
   * @param bookDto - The data for creating a new book.
   * @returns The newly created book.
   */
  public async insertBook(bookDto: CreateBookDto): Promise<Book> {
    const { bookDetails, ...rest } = bookDto;
    const newbookDetails = await this.bookDetailModel.create(bookDetails);
    const newBook = await this.bookModel.create({
      ...rest,
      bookDetails: newbookDetails,
    });
    return newBook;
  }

  /**
   * Retrieves all books from the database.
   * @returns A list of all books.
   */
  public async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find().populate('bookDetails');
    return books;
  }

  /**
   * Finds a book by its ID.
   * @param id - The ID of the book to be retrieved.
   * @returns The book with the specified ID.
   * @throws `NotFoundException` if the book is not found.
   */
  public async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).populate('bookDetails');
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  /**
   * Updates a book with the specified ID.
   * @param id - The ID of the book to be updated.
   * @param updateBookDto - The data for updating the book.
   * @returns The updated book.
   * @throws `NotFoundException` if the book is not found.
   */
  public async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      updateBookDto,
      { new: true },
    );
    return updatedBook as Book;
  }

  /**
   * Deletes a book with the specified ID.
   * @param id - The ID of the book to be deleted.
   * @returns The deleted book.
   * @throws `NotFoundException` if the book or its details are not found.
   */
  public async deleteBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const bookDetails = await this.bookDetailModel.findById(book.bookDetails);
    if (!bookDetails) {
      throw new NotFoundException('Book details not found');
    }
    await this.bookDetailModel.findByIdAndDelete(bookDetails.id);
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    return deletedBook as Book;
  }

  /**
   * Finds books by category.
   * @param bookCategory - The category of books to be retrieved.
   * @returns A list of books matching the specified category.
   */
  public async findByCategory(bookCategory: BookCategory): Promise<Book[]> {
    const books =
      bookCategory === BookCategory.ALL
        ? await this.bookModel.find().populate('bookDetails')
        : await this.bookModel.find({ bookCategory }).populate('bookDetails');
    return books;
  }

  /**
   * Finds books by a special category.
   * @param bookSpecialCategory - The special category of books to be retrieved.
   * @returns A list of books matching the specified special category.
   */
  public async findBookBySpecialCategory(
    bookSpecialCategory: BookSpecialCategory,
  ): Promise<Book[]> {
    const books = await this.bookModel
      .find({ bookSpecialCategory })
      .populate('bookDetails');
    return books;
  }
}
