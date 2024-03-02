import { Injectable } from '@nestjs/common';
import { CartItem } from '../../src/shared/interface/CartItem';
import Stripe from 'stripe';

@Injectable()
export class OrderService {
  private stripe: Stripe;

  /**
   * Constructor for the OrderService class.
   * Initializes the Stripe instance with the provided secret key.
   */
  constructor() {
    // Initialize Stripe with the provided secret key and API version.
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * Handles the checkout process using Stripe.
   * @param cart - An array of CartItem objects representing the items in the cart.
   * @returns An object containing the checkout session details.
   */
  public async checkoutCart(cart: CartItem[]) {
    // Create a checkout session with Stripe.
    const sessions = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['IN'] },
      line_items: cart.map((item) => {
        return {
          price_data: {
            currency: `${process.env.STRIPE_CURRENCY}`,
            product_data: {
              name: item.bookTitle,
            },
            unit_amount: item.bookDetails.bookPrice * 100,
          },
          quantity: item.quantityInCart,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/failed`,
    });

    // Return relevant details for client-side redirection.
    return {
      url: sessions.url,
      sessionId: sessions.id,
      successUrl: sessions.success_url,
      failureUrl: sessions.cancel_url,
    };
  }
}
