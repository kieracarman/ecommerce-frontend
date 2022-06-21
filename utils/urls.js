export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const imageToUrl = (image) => {
  if (!image) {
    return '/vercel.svg'
  }
  if (image.indexOf('/') === 0) {
    return `${API_URL}${image}`
  }

  return image
}