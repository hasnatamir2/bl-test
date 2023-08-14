import http from './http-service';

class CartService {
  static async getCart(userId: string) {
    return await http.get(`/carts/user/${userId}`);
  }

  static async createCart() {
    return await http.post('/carts/add');
  }

  static async updateCart({
    cartId,
    products,
  }: {
    cartId: number;
    products: {
      id: number;
      quantity: number;
    }[];
  }) {
    return await http.put(`/carts/${cartId}`, {
      merge: false,
      products,
    });
  }
}

export default CartService;
