# Book-Haven 📚

Welcome to Book-Haven, your ultimate online bookstore where book lovers unite! 

## Main Features:

📖 **Browse 20+ Genre of Books:** Explore a diverse collection of books across various genres.

🎨 **Attractive UI:** Enjoy a visually appealing user interface that enhances your browsing experience.

📚 **Single Book Page:** Dive into complete book details on dedicated single book pages.

🛒 **Store Page with Price and Category Filters:** Easily navigate and find your desired books with price and category filters.

📧 **Contact Page with Formspree Mail Service:** Reach out to us effortlessly via our contact page powered by Formspree mail service.

🛒 **Cart:** Maintain a list of added books in your cart for easy checkout.

💌 **Newsletter Subscription Page:** Stay updated with the latest book releases and promotions by subscribing to our newsletter.

💳 **Checkout with Stripe Payment Gateway:** Securely purchase your favorite books with ease using the Stripe payment gateway.

## Tech Stack:

- React with Vite
- NestJS
- TypeScript
- Tailwind CSS
- Chakra UI
- Stripe

## How to Start the Project:

### Backend:
1. **Navigate to Backend Directory:** `cd backend`
2. **Install Dependencies:** Run `npm i` to install dependencies.
3. **Create .env File:** Create a .env file with the following variables: 
    ```
    PORT=...
    MONGO_URI=...
    JWT_SECRET_KEY=...
    JWT_SECRET_EXPIRY=...
    FRONTEND_URL=...
    STRIPE_CURRENCY=...
    STRIPE_PUBLIC_KEY=...
    STRIPE_SECRET_KEY=...
    ```
4. **Start Development Server:** Run `npm run start:dev` to start the development server.

### Frontend:
1. **Navigate to Frontend Directory:** `cd frontend`
2. **Install Dependencies:** Run `npm i` to install dependencies.
3. **Create .env File:** Create a .env file with the following variable:
    ```
    BACKEND_URL=...
    ```
4. **Start Vite Application:** Run `npm run dev` to start the Vite application.

That's it! You're all set to explore the vast world of books with Book-Haven. Happy reading! 📚
