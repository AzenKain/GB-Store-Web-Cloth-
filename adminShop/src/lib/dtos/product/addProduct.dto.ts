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

export type addProductDto = {

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
