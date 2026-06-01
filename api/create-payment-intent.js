export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const intent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'gbp',
    automatic_payment_methods: { enabled: true },
  });

  res.status(200).json({ clientSecret: intent.client_secret });
}
