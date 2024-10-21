import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookCategory } from '../shared/emun/Book-category';
import { Book } from './schema/book.schema';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AdminGuard } from '../auth/guard/admin.guard';
import { BookSpecialCategory } from '../shared/emun/Book-special-Category';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Endpoint to insert a new book.
   * @param bookDto - The data for creating a new book.
   * @returns The created book.
   */
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async insertBook(@Body() bookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.insertBook(bookDto);
  }

  /**
   * Endpoint to retrieve all books.
   * @returns A list of all books.
   */
  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  /**
   * Endpoint to find a book by its ID.
   * @param id - The ID of the book to find.
   * @returns The found book.
   */
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findById(id);
  }

  /**
   * Endpoint to find books by category.
   * @param bookCategory - The category of books to retrieve.
   * @returns A list of books in the specified category.
   */
  @UseInterceptors(CacheInterceptor)
  @Get('category/:category')
  async findByCategory(
    @Param('category') bookCategory: BookCategory,
  ): Promise<Book[]> {
    return await this.bookService.findByCategory(bookCategory);
  }

  /**
   * Endpoint to find books by a special category.
   * @param bookSpecialCategory - The special category of books to retrieve.
   * @returns A list of books in the specified special category.
   */
  @UseInterceptors(CacheInterceptor)
  @Get('special-category/:category')
  async findBookBySpecialCategory(
    @Param('category') bookSpecialCategory: BookSpecialCategory,
  ): Promise<Book[]> {
    return await this.bookService.findBookBySpecialCategory(
      bookSpecialCategory,
    );
  }

  /**
   * Endpoint to update a book.
   * @param id - The ID of the book to update.
   * @param updateBookDto - The data for updating the book.
   * @returns The updated book.
   */
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBook(id, updateBookDto);
  }

  /**
   * Endpoint to delete a book by its ID.
   * @param id - The ID of the book to delete.
   * @returns The deleted book.
   */
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.deleteBook(id);
  }
}
