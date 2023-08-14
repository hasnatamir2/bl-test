import http from './http-service';

class ProductService {
  static async getProducts() {
    return await http.get(
      '/products?limit=10&select=id,title,description,price,stock,thumbnail',
    );
  }
}

export default ProductService;
