import { API_URL } from '../utils/urls'
import { ProductCard } from '../components'

export default function Home({ products }) {
  return (
    <div>
      <h1>Products</h1>

      {products.data.map(product => (
        <ProductCard key={product.attributes.name} product={product} />
      ))}
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