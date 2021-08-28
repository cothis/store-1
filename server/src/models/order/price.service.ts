import { Injectable } from '@nestjs/common';
import { EntityManager, getManager } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { ProductIdWithQuantity } from './dto/create-order.dto';

export interface FinalPrices {
  productsPrice: number;
  deliveryFee: number;
  paymentPrice: number;
}

@Injectable()
export class PriceService {
  constructor(private readonly productService: ProductService) {}

  async calculateProductsPrice(productWithQuantities: ProductIdWithQuantity[], manager?: EntityManager) {
    const productEntities = productWithQuantities.map(
      async (product) => await this.productService.getById(product.id, manager),
    );

    return Promise.all(productEntities).then((products) =>
      products.reduce(
        (total, product, index) =>
          total + productWithQuantities[index].quantity * product.price || product.originalPrice,
        0,
      ),
    );
  }

  calculateDeliveryFee(productsPrice: number) {
    if (productsPrice > 30000) {
      return 0;
    } else if (productsPrice > 10000) {
      return 2000;
    } else return 3000;
  }

  async calculatePrices(products: ProductIdWithQuantity[], manager?: EntityManager): Promise<FinalPrices> {
    const productsPrice = await this.calculateProductsPrice(products, manager);
    const deliveryFee = this.calculateDeliveryFee(productsPrice);
    const paymentPrice = productsPrice + deliveryFee;
    return { productsPrice, deliveryFee, paymentPrice };
  }
}
