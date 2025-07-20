
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: 'price_1RmxjxE4H116aDHAkojI9KPN',
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
        metadata: userId ? { userId } : undefined,
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
