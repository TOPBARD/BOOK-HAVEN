import { Link } from "react-router-dom";

/**
 * Success component is used to display a message indicating that the payment was successful.
 * It expresses gratitude and provides a button to navigate back to the homepage.
 */
export default function Success() {
  return (
    <section className="py-72">
      <div className="container mx-auto">
        {/* Success message */}
        <h3 className="text-center mb-4">
          Your Payment Was Successful! Thank You!!!
        </h3>

        {/* Button to navigate back to the homepage */}
        <Link to={"/"}>
          <button className="btn btn-primary mx-auto">Back To Homepage</button>
        </Link>
      </div>
    </section>
  );
}
