import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PopularBooksCarousel from "./popular-books-carousel/PopularBooksCarousel";
import { Book } from "../../shared/interface/Books";
import { BookSpecialCategory } from "../../shared/enum/Book-special-category";

/**
 * PopularBooks component displays a section with the most popular books.
 *
 * @returns {React.ReactElement} - The rendered component.
 */
const PopularBooks: React.FC = () => {
  // State to hold the popular books data
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);

  /**
   * Fetches popular books data from the server and updates the state.
   */
  const fetchPopularBooksData = async (): Promise<void> => {
    try {
      const response = await axios.get<Book[]>(
        `http://localhost:5000/books/special-category/${BookSpecialCategory.POPULAR}`
      );
      setPopularBooks(response.data);
    } catch (error) {
      console.error("Error fetching popular books:", error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchPopularBooksData();
  }, []);

  return (
    <div>
      <section className="py-24">
        <div className="container mx-auto">
          <h2 className="text-center">Most Popular Books</h2>
          <p className="text-center mb-[30px]">
            All popular books at one place for you to explore
          </p>
          {/* Pass the popularBooks data to PopularBooksCarousel component */}
          <PopularBooksCarousel books={popularBooks} />

          {/* Link to navigate to the store page */}
          <Link to="/store">
            <button className="btn btn-accent mx-auto">See All Books</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PopularBooks;
