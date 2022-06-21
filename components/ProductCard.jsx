import Link from 'next/link'
import Image from 'next/image'
import { twoDecimals } from '../utils/format'
import { imageToUrl } from '../utils/urls'

const ProductCard = ({ product }) => (
  <div>
    <Link href={`/products/${product.attributes.slug}`}>
      <a>
        <Image
          width={product.attributes.image.data.attributes.width}
          height={product.attributes.image.data.attributes.height}
          src={imageToUrl(product.attributes.image.data.attributes.url)}
          alt={product.attributes.image.data.attributes.alternativeText}
        />
        <p>{product.attributes.name}</p>
        <p>${twoDecimals(product.attributes.price)}</p>
      </a>
    </Link>
  </div>
)

export default ProductCard