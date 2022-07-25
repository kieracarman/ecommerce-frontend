import Stripe from 'stripe'

import { imageToUrl } from '../../lib/utils'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1LD9InJBBYEVZdPYduuXIeW7' }
        ],
        line_items: req.body.map(item => {
          const img = imageToUrl(item.attributes.image.data.attributes.url)

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.attributes.name,
                images: [img],
              },
              unit_amount: item.attributes.price,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      const session = await stripe.checkout.sessions.create(params)

      res.status(200).json(session)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}