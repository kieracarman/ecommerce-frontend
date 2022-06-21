import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const Header = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()  

  return (
    <div>
      <p>
        <Link href='/'>Rock Store</Link>
      </p>

      <button type='button' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Header