import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/Imgg2.jpg";

/**
 * Hero Component
 * Displays a hero section introducing the bookstore.
 * @returns {JSX.Element} - Hero JSX element
 */
const Hero: React.FC = () => {
  return (
    <section className="py-48 md:py-0 md:h-[620px] relative overflow-hidden bg-primary/5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Content: Text and Buttons */}
          <div className="w-full xl:max-w-[580px] md:h-[620px] flex flex-col justify-center items-start">
            <h2 className="text-center xl:text-left mb-6">
              Dive into <span>Magical World</span> of{" "}
              <span className="text-accent">Books</span>
            </h2>
            <p className="mb-10 text-lg max-w-[508px] mx-auto text-center xl:text-left xl:mx-0">
              Embark on a literary adventure at our online bookstore. Discover
              extraordinary tales that await, as each book becomes a gateway to
              thrilling stories and captivating imaginations. Explore,
              experience, and embrace the magic of reading with us.
            </p>
            {/* Call-to-Action Buttons */}
            <div className="flex items-center gap-4 mx-auto xl:mx-0">
              <Link to={"/store"} className="mx-auto md:mx-0">
                <button className="btn btn-primary">Shop Now</button>
              </Link>
              <Link to={"/store"} className="mx-auto md:mx-0">
                <button className="btn btn-accent">Our Books</button>
              </Link>
            </div>
          </div>

          {/* Right Content: Hero Image (Visible only on XL screens) */}
          <div className="hidden xl:flex">
            <img src={heroImage} width={600} height={480} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
