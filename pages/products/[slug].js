import Head from 'next/head'
import Image from 'next/image'

import { imageToUrl, API_URL } from '../../utils/urls'
import { twoDecimals } from '../../utils/format'
import { useStateContext } from '../../context/StateContext'

const Product = ({ product }) => {
  const { qty, onAdd } = useStateContext()

  return (
    <div>
      <Head>
        {product.attributes.meta_title &&
          <title>{product.attributes.meta_title}</title>
        }
        {product.attributes.meta_description &&
          <meta name='description' content={product.attributes.meta_description} />
        }
      </Head>

      <h3>{product.attributes.name}</h3>
      <Image
        width={product.attributes.image.data.attributes.width}
        height={product.attributes.image.data.attributes.height}
        src={imageToUrl(product.attributes.image.data.attributes.url)}
        alt={product.attributes.image.data.attributes.alternativeText}
      />
      <p>{twoDecimals(product.attributes.price)}</p>
      <p>
        {product.attributes.content}
      </p>
      <button type='button' onClick={() => onAdd(product, qty)}>Add to Cart</button>
    </div>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/products?populate=*&filters[slug][$eq]=${slug}`)
  const product = await res.json()

  return {
    props: {
      product: product.data[0]
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/products`)
  const products = await res.json()

  return {
    paths: products.data.map(el => ({
      params: { slug: String(el.attributes.slug) }
    })),
    fallback: false
  }
}

export default Product