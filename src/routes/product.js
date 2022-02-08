import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct,
  deleteProduct
} from "../controllers/product.js";

const productRoutes =  [
  {
    method: 'GET',
    url: '/api/products',
    controller: getProducts
  },
  {
    method: 'GET',
    url: '/api/product',
    controller: getProductById
  },
  {
    method: 'POST',
    url: '/api/product',
    controller: createProduct
  },
  {
    method: 'PUT',
    url: 'api/product',
    controller: updateProduct
  },
  {
    method: 'DELETE',
    url: 'api/product',
    controller: deleteProduct
  }
];

export default productRoutes;