import styles from '../styles/Home.module.css'
import { API_URL } from '../lib/utils'
import { ProductCard } from '../components'

export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.headerText}>Products</h1>

      <section className={styles.productGrid}>
        {products.data.map(product => (
          <ProductCard key={product.attributes.name} product={product} />
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/products?populate=*`)
  const products = await res.json()

  return {
    props: {
      products
    }
  }
}