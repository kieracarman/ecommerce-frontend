import Head from 'next/head'
import Image from 'next/image'

import styles from '../../styles/Product.module.css'
import { imageToUrl, twoDecimals, API_URL } from '../../lib/utils'
import { useStateContext } from '../../context/StateContext'

const Product = ({ product }) => {
  const { qty, onAdd } = useStateContext()

  return (
    <div className={styles.container}>
      <Head>
        {product.attributes.meta_title &&
          <title>{product.attributes.meta_title}</title>
        }
        {product.attributes.meta_description &&
          <meta name='description' content={product.attributes.meta_description} />
        }
      </Head>

      <Image
        width={product.attributes.image.data.attributes.width}
        height={product.attributes.image.data.attributes.height}
        src={imageToUrl(product.attributes.image.data.attributes.url)}
        alt={product.attributes.image.data.attributes.alternativeText}
        className={styles.image}
      />
      
      <div className={styles.info}>
        <div className={styles.header}>
          <h3>{product.attributes.name}</h3>
          <p>${twoDecimals(product.attributes.price)}</p>
        </div>
        
        <p>
          {product.attributes.content}
        </p>
        
        <button className={styles.button} type='button' onClick={() => onAdd(product, qty)}>Add to Cart</button>
      </div>
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