import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'

import styles from '../styles/Cart.module.css'
import { useStateContext } from '../context/StateContext'
import { imageToUrl, twoDecimals } from '../lib/utils'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove
  } = useStateContext()
  
  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if (response.statusCode === 500) return
    
    const data = await response.json()

    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div ref={cartRef} className={styles.wrapper}>
      <div className={styles.container}>
        <button
          type='button'
          className={styles.header}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span>Your Cart</span>
          <span className={styles.numItems}>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className={styles.empty}>
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty.</h3>
            <Link href='/'>
              <button
                type='button'
                className={styles.btn}
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className={styles.products}>
          {cartItems.length >= 1 && cartItems.map(item => (
            <div className={styles.product} key={item.attributes.name}>
              <Image
                src={imageToUrl(item?.attributes.image.data.attributes.url)}
                width={item?.attributes.image.data.attributes.width}
                height={item?.attributes.image.data.attributes.height}
                alt={item?.attributes.image.data.attributes.alternativeText}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <div>
                  <h5>{item.attributes.name}</h5>
                  <h4>${twoDecimals(item.attributes.price)}</h4>
                </div>
                <p className={styles.quantity}>
                  <span className={styles.minus} onClick={() => toggleCartItemQuantity(item.id, 'dec')}>
                    <AiOutlineMinus />
                  </span>
                  <span className={styles.num}>{item.quantity}</span>
                  <span className={styles.plus} onClick={() => toggleCartItemQuantity(item.id, 'inc')}>
                    <AiOutlinePlus />
                  </span>
                </p>
                <button
                  type='button'
                  className={styles.remove}
                  onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className={styles.cartFooter}>
            <div>
              <h4>Subtotal:</h4>
              <h3>${twoDecimals(totalPrice)}</h3>
            </div>
            <button
              type='button'
              className={styles.btn}
              onClick={handleCheckout}
            >
              Check Out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart