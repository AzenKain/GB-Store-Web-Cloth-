

export type updateCartDto = {


  userId: string;



  productId: string;


  @IsNumber()
  quantity: number



  color: string;



  size: string;

}