import { IDetail, IImage, ISales } from "@/lib/dtos/product";
export type IImage = {
  url: string;
  link?: string[];
}

export type ISales =  {
  isSales: boolean;
  percents: number;
  end: Date;
}

export type IDetail = {
  tags: string[];
  company: string;
  materials: string[];
}

export type MessagesType ={
  id?: string;
  typeMegs?: string;
  userId?: string;
  roomId?: string;
  isDisplay?: boolean;
  title?: string;
  content?: string;
  urlFile?: string[];
  star?: number;
  updateAt?: Date;
  createdAt?: Date;
}

export type ProductType = {
  id?: string;

  productName: string;

  isDisplay?: boolean;

  cost: number;

  price: number;

  stockQuantity: number;

  imgDisplay: IImage[];

  productType: string;

  color: string[];

  size: string[];

  buyCount?: number;

  rating?: number;

  commentsList?: MessagesType[];

  detail?: IDetail;

  sales?: ISales;

  description?: string;

  updateAt?: Date,

  createdAt?: Date
}
