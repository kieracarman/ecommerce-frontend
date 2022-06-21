import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'

import { useStateContext } from '../context/StateContext'
import { imageToUrl } from '../utils/urls'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()

  return (
    <div ref={cartRef}>
      <div>
        <button
          type='button'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span>Your Cart</span>
          <span>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div>
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty.</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div>
          {cartItems.length >= 1 && cartItems.map(item => (
            <div key={item.attributes.name}>
              <Image
                src={imageToUrl(item?.attributes.image.data.attributes.url)}
                width={item?.attributes.image.data.attributes.width}
                height={item?.attributes.image.data.attributes.height}
                alt={item?.attributes.image.data.attributes.alternativeText}
              />
              <h5>{item.attributes.name}</h5>
              <h4>${item.attributes.price}</h4>
              <p>
                <span onClick={() => toggleCartItemQuantity(item.id, 'dec')}>
                  <AiOutlineMinus />
                </span>
                <span onClick=''>{item.quantity}</span>
                <span onClick={() => toggleCartItemQuantity(item.id, 'inc')}>
                  <AiOutlinePlus />
                </span>
              </p>
              <button
                type='button'
                onClick={() => onRemove(item)}
              >
                <TiDeleteOutline />
              </button>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div>
            <h3>Subtotal:</h3>
            <h3>${totalPrice}</h3>
            <button
              type='button'
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