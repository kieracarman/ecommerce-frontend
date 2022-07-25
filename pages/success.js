import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
  }, [])

  return(
    <div>
      <p>
        <BsBagCheckFill />
      </p>
      <h2>Thank you for your order!</h2>
      <p>We sent a receipt to your email.</p>
      <p>
        If you have any questions, please contact support at{' '}
        <a href='mailto:support@example.com'>support@example.com</a>
        .
      </p>
      <Link href='/'>
        <button type='button' width='300px'>
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}

export default Success