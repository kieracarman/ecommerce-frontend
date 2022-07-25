import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import styles from '../styles/Header.module.css'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const Header = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()  

  return (
    <div className={styles.header}>
      <p className={styles.brand}>
        <Link href='/'>Rock Store</Link>
      </p>

      <button className={styles.cartButton} type='button' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        {totalQuantities > 0 ? <span className={styles.cartBadge}>{totalQuantities}</span> : ''}
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Header