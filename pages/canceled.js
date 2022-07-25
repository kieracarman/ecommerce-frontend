import { useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'

const Canceled = () => {
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
      <h2>Your order has been canceled!</h2>
      <p>If you change your mind, you can head back to the <Link href='/'><a>store</a></Link>.</p>
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

export default Canceled