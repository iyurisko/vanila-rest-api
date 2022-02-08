import authRoutes from './auth.js'
import productRoutes from './product.js'

const routes = [].concat(
  authRoutes,
  productRoutes
)

export default routes