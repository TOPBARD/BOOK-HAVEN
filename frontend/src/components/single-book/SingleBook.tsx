import { useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddToCart from "../hover-buttons/add-to-cart/AddToCart";
import { BookOpen, Clock, PackageCheck, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Book } from "../../shared/interface/Books";
import axios from "axios";

/**
 * SingleBookComponent displays detailed information about a single book.
 * It fetches data based on the book ID from the server and renders the book details.
 */
export default function SingleBookComponent() {
  // State for storing the book details
  const [book, setBook] = useState<Book>();
  // Extracting book ID from the URL parameters
  const { id } = useParams();

  /**
   * useEffect to fetch data for the single book when the component mounts or when the book ID changes.
   */
  useEffect(() => {
    fetchSingleBookData();
  }, [id]);

  /**
   * Fetches data for the single book from the server based on the book ID.
   */
  const fetchSingleBookData = async () => {
    try {
      const singleBook = await axios.get<Book>(
        `http://localhost:5000/books/${id}`
      );
      // Set the book state with the fetched data
      setBook(singleBook.data);
    } catch (error) {
      console.error("Error fetching single book data:", error);
    }
  };

  return (
    <section className="pt-24 pb-32">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-10">
          {/* Book Image Section */}
          <div className="xl:flex-1 h-[460px] xl:w-[700] xl:h-[540px] flex justify-center items-center">
            <img
              src={book?.bookImageUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          {/* Book Details Section */}
          <div className="flex-1 flex flex-col justify-center items-start gap-10">
            {/* Back to Home Link */}
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <FaAngleLeft size={20} />
              Back To Home
            </Link>
            {/* Book Information */}
            <div className="flex flex-col gap-6 items-start">
              <div>
                <h3>{book?.bookTitle}</h3>
                <p className="text-lg font-semibold text-accent">{`Rs. ${book?.bookDetails?.bookPrice}`}</p>
              </div>
              <p>{book?.bookDescription}</p>
              {/* Add to Cart Button */}
              <AddToCart
                name="Add To Cart"
                btnStyles="btn btn-accent"
                book={book as Book}
                id={book?._id as string}
              />

              {/* Additional Information */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <PackageCheck size={20} className="text-accent" />
                  <p>Free delivery on order above 1000</p>
                </div>
                <div className="flex gap-2">
                  <RefreshCw size={20} className="text-accent" />
                  <p>Free return for 30 days</p>
                </div>
                <div className="flex gap-2">
                  <BookOpen size={20} className="text-accent" />
                  <p>Offer the largest collection of books</p>
                </div>
                <div className="flex gap-2">
                  <Clock size={20} className="text-accent" />
                  <p>Fast delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
