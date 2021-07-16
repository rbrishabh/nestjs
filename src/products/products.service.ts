import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const product = await newProduct.save();
    return product.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((p) => {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
      };
    }) as Product[];
  }

  async getSingleProduct(productId: string) {
    const p = await this.findProduct(productId);
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const product = await this.findProduct(productId);
    if (title) {
      product.title = title;
    }
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    await product.save();
  }

  async deleteProduct(prodId: string) {
    try {
      await this.productModel.findByIdAndDelete(prodId).exec();
    } catch (e) {
      throw new NotFoundException('Could not find prod!');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let p: Product;
    try {
      p = await this.productModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException('Could not find id');
    }

    if (!p) {
      throw new NotFoundException('Could not find product');
    }
    return p;
  }
}
