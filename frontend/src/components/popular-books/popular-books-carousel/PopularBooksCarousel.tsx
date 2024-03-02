import React from "react";
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
      {/* Map through the books array and create SwiperSlides for each book */}
      {books.map((book: Book) => (
        <SwiperSlide key={book._id}>
          {/* Render BookCard component for each book */}
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PopularBooksCarousel;
