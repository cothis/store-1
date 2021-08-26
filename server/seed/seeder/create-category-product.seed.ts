import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Category } from '@models/category/entities/category.entity';
import { Product } from '@models/product/entities/product.entity';
import { ProductTag } from '@models/product/enums/product-tag.enum';

import categoryData from '../data/category.json';
import categoryProductData from '../data/category-product.json';
import productData from '../data/product.json';

interface ICategory {
  id: string;
  title: string;
  parentId?: string;
}

interface ICategoryProduct {
  categoryId: string;
  productIds: string[];
}

type ImageUrl = string;

type ProductDetailInfo = [string, string];

interface IProduct {
  id: string;
  tags: ProductTag[];
  title: string;
  price?: number;
  priceText?: string;
  originalPrice?: number;
  image: ImageUrl;
  content: ImageUrl[];
  detailInfo?: ProductDetailInfo[];
  recommendIds: string[];
}

export default class CreateCategoryProduct implements Seeder {
  async run(_: Factory, connection: Connection): Promise<void> {
    const categories = categoryData as ICategory[];
    const categoryProducts = categoryProductData as ICategoryProduct[];
    const products = productData as IProduct[];

    // original to mine
    const categoryIdOriginalToMine: Record<string, string> = {};
    const productIdOriginalToMine: Record<string, string> = {};

    const count = await connection.createQueryBuilder().select('category').from(Category, 'category').getCount();
    if (count !== 0) {
      return;
    }

    const categoryInsertResult = await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(
        categories.map((c) => ({
          title: c.title,
        })),
      )
      .execute();

    categoryInsertResult.identifiers
      .map<string>((x) => x.id)
      .forEach((id, index) => {
        const oricialCategoryId = categories[index].id;
        categoryIdOriginalToMine[oricialCategoryId] = id;
      });

    for (const category of categories) {
      if (category.parentId) {
        const originalParentCategoryId = category.parentId;
        const originalCategoryId = category.id;
        await connection.manager.query('UPDATE `category` SET `parent_id` = ? WHERE `id` = ?', [
          categoryIdOriginalToMine[originalParentCategoryId],
          categoryIdOriginalToMine[originalCategoryId],
        ]);
      }
    }

    const productInsertResult = await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(
        products.map((p) => ({
          title: p.title,
          image: p.image,
          price: p.price,
          originalPrice: p.originalPrice,
          priceText: p.priceText,
          content: p.content,
          detailInfo: p.detailInfo,
          tags: p.tags,
        })),
      )
      .execute();

    productInsertResult.identifiers
      .map<string>((x) => x.id)
      .forEach((id, index) => {
        const originalProductId = products[index].id;
        productIdOriginalToMine[originalProductId] = id;
      });

    for (const categoryProduct of categoryProducts) {
      const originalCategoryId = categoryProduct.categoryId;
      for (const originalProductId of categoryProduct.productIds) {
        await connection.manager.query(
          'INSERT INTO `product_has_category` (`product_id`, `category_id`) VALUES (?, ?)',
          [productIdOriginalToMine[originalProductId], categoryIdOriginalToMine[originalCategoryId]],
        );
      }
    }

    for (const product of products) {
      const originalProductId = product.id;
      for (const originalRecommendId of product.recommendIds) {
        await connection.manager.query(
          'INSERT INTO `product_has_recommend_product` (`product_id`, `recommend_product_id`) VALUES (?, ?)',
          [productIdOriginalToMine[originalProductId], productIdOriginalToMine[originalRecommendId]],
        );
      }
    }
  }
}
