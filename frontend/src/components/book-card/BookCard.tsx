import { Link } from "react-router-dom";
import AddToCart from "../hover-buttons/add-to-cart/AddToCart";
import { IoMdEye } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { BookCardProps } from "../../shared/interface/BookCardProps";
import { Book } from "../../shared/interface/Books";

/**
 * Functional component for rendering a book card.
 * @param {BookCardProps} props - Component props
 * @returns {JSX.Element} - BookCard JSX element
 */
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isLoading = !book; // Check if the book data is not available

  return (
    <div className="group">
      {/* Main Book Image or Spinner */}
      <div className="border h-[300px] mb-5 p-4 overflow-hidden relative flex justify-center items-center">
        {/* If book is loading, show the spinner, otherwise show the book content */}
        {isLoading ? (
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {/* Background Overlay and Book Image */}
            <div className="bg-primary/5 w-full h-full group-hover:bg-primary/10 transition-all duration-300 flex justify-center items-center">
              {/* Special Category Badge */}
              <div className="absolute top-8 left-8 bg-accent text-white px-3 text-sm uppercase font-medium">
                {book?.bookSpecialCategory ?? "Top Trending"}
              </div>
              <img
                src={book?.bookImageUrl}
                alt="Book Image"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Hover Buttons */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center gap-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300">
              {/* Add to Cart Button */}
              <AddToCart
                btnStyles="btn-icon btn-accent"
                icon={<IoCartOutline />}
                book={book as Book}
                id={book?._id as string}
              />

              {/* View Details Button */}
              <Link to={`/single-book/${book?._id ?? ""}`}>
                <button className="btn-icon btn-primary">
                  <IoMdEye />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* If the book is loading, hide the rest of the content */}
      {!isLoading && (
        <>
          {/* Book Category */}
          <h5 className="text-gray-400 text-sm font-semibold mb-2">
            {book?.bookCategory ?? "Fiction"}
          </h5>

          {/* Book Title */}
          <h4 className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {book?.bookTitle ?? "Test Title"}
          </h4>

          {/* Book Price */}
          <div className="text-lg font-bold text-accent">
            {`Rs. ${book?.bookDetails?.bookPrice ?? 500}`}
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;
