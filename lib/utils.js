export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

// Build full image url
export const imageToUrl = (image) => {
  if (!image) {
    return '/vercel.svg'
  }
  if (image.indexOf('/') === 0) {
    return `${API_URL}${image}`
  }

  return image
}

// Format decimals
export const twoDecimals = (number) => parseFloat(number / 100).toFixed(2)