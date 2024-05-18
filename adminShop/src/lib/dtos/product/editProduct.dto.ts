import { IDetail, IImage } from "./addProduct.dto";

export type editProductDto =  {
  productId?: string;

  productName: string;

  userId?: string;

  price: number;

  cost: number;

  stockQuantity: number;

  productType: string;

  color?: string[];

  size?: string[];

  detail?: IDetail;

  imgDisplay?: IImage[];

  description?: string;
}
