import { Link } from "react-router-dom";

/**
 * Failed component is used to display an error message when something goes wrong.
 * It provides a button to navigate back to the homepage.
 */
export default function Failed() {
  return (
    <section className="py-72">
      <div className="container mx-auto">
        {/* Error message */}
        <h3 className="text-center mb-4">Something Went Wrong!!!</h3>

        {/* Button to navigate back to the homepage */}
        <Link to={"/"}>
          <button className="btn btn-accent mx-auto">Back To Homepage</button>
        </Link>
      </div>
    </section>
  );
}
