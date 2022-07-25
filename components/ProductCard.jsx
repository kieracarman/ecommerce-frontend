import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/ProductCard.module.css'
import { imageToUrl, twoDecimals } from '../lib/utils'

const ProductCard = ({ product }) => (
  <div className={styles.card}>
    <Link href={`/products/${product.attributes.slug}`}>
      <a>
        <Image
          width={product.attributes.image.data.attributes.width * 0.75}
          height={product.attributes.image.data.attributes.height * 0.75}
          src={imageToUrl(product.attributes.image.data.attributes.url)}
          alt={product.attributes.image.data.attributes.alternativeText}
          className={styles.image}
        />
        <p className={styles.name}>{product.attributes.name}</p>
        <p className={styles.price}>${twoDecimals(product.attributes.price)}</p>
      </a>
    </Link>
  </div>
)

export default ProductCard