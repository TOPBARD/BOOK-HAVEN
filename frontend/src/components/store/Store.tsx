import BookCategories from "./book-categories/BookCategories";

/**
 * StoreComponent is the main component for the bookstore's store page.
 * It renders the BookCategories component to display book categories and books.
 */
export default function StoreComponent() {
  return (
    <div>
      {/* Render the BookCategories component to display book based on categories */}
      <BookCategories />
    </div>
  );
}
