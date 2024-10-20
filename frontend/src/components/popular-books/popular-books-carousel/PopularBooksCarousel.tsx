import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import BookCard component
import BookCard from "../../book-card/BookCard";

// Import necessary modules from Swiper
import { Pagination } from "swiper/modules";

// Import types
import { PopularBooksCarouselProps } from "../../../shared/interface/PopularBooksCarouselProps";
import { Book } from "../../../shared/interface/Books";

/**
 * PopularBooksCarousel component displays a responsive carousel of popular books.
 *
 * @param {PopularBooksCarouselProps} props - The component properties.
 * @param {Book[]} props.books - The array of popular books to be displayed in the carousel.
 * @returns {React.ReactElement} - The rendered component.
 */
const PopularBooksCarousel: React.FC<PopularBooksCarouselProps> = ({
  books,
}: PopularBooksCarouselProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (books && books.length > 0) {
      setLoading(false);
    }
  }, [books]);
  const renderLoadingPlaceholders = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <SwiperSlide key={index}>
        <BookCard book={null} />
      </SwiperSlide>
    ));
  };
  return (
    // Initialize Swiper component with responsive settings and pagination
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 4,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="popular-books-slider mb-8"
    >
      {/* If loading, render loading placeholders, otherwise map through the books */}
      {loading
        ? renderLoadingPlaceholders() // Show placeholder spinners
        : books.map((book: Book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} /> {/* Render actual book data */}
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default PopularBooksCarousel;
