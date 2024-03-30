import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Slider } from "../../../assets/shadcn-ui/components/slider";
import { Book } from "../../../shared/interface/Books";
import BookCard from "../../book-card/BookCard";
import { BookCategory } from "../../../shared/enum/Book-category";
import axios from "axios";

/**
 * BookCategories is a component that displays books based on selected categories and price range.
 */
export default function BookCategories() {
  const [categories, setCategories] = useState<BookCategory>(BookCategory.ALL);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [price, setPrice] = useState<number>(700);

  useEffect(() => {
    // Fetch books data based on selected category
    fetchBooksData();
  }, [categories]);

  const fetchBooksData = async () => {
    const booksData = await axios.get<Book[]>(
      `${process.env.BACKEND_URL}/books/category/${categories}`
    );
    setBooks(booksData.data);
  };

  useEffect(() => {
    // Filter books based on selected price range
    filterBooks();
  }, [price, books]);

  const filterBooks = async () => {
    const filtered = books.filter((book) => {
      const priceMatched = book.bookDetails.bookPrice <= price;
      return priceMatched;
    });
    setFilteredBooks(filtered);
  };

  return (
    <section className="min-h-[1200px] py-10">
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <aside className="w-full p-4 xl:w-[300px] xl:h-[84vh] xl:fixed">
            <div className="max-w-56 mb-4">
              <div className="mb-4">
                <div className="text-lg mb-4 font-medium">
                  Max Price:{" "}
                  <span className="text-accent font-semibold ml-2 ">
                    Rs. {price}
                  </span>
                  <div>
                    (
                    {filteredBooks.length > 1
                      ? `${filteredBooks.length} items`
                      : filteredBooks.length === 0
                        ? `${filteredBooks.length} items`
                        : `${filteredBooks.length} item`}
                    )
                  </div>
                </div>
                {/* Slider for selecting the price range */}
                <Slider
                  defaultValue={[700]}
                  max={1000}
                  step={1}
                  onValueChange={(val) => setPrice(val[0])}
                />
              </div>
              <div className="max-h-[400px] overflow-y-scroll">
                <div className="mb-2">
                  <label htmlFor="Categories" className="font-semibold">
                    Categories:
                  </label>
                </div>
                {/* Radio buttons for selecting book categories */}
                <FormControl className="flex flex-col gap-6 mb-12 mt-4">
                  <RadioGroup value={categories}>
                    {(
                      Object.keys(BookCategory) as (keyof typeof BookCategory)[]
                    ).map((key, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          control={<Radio style={{ color: "#ed1d24" }} />}
                          label={BookCategory[key]}
                          value={BookCategory[key]}
                          onChange={() => setCategories(BookCategory[key])}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </aside>
          <div className="w-full xl:w-[950px] ml-auto">
            {/* Display BookCard components for each filtered book */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[40px]">
              {filteredBooks.map((book, index) => {
                return <BookCard book={book} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
