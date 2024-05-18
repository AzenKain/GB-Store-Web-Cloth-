

export type updateCartDto = {

  @IsString()
  userId: string;


  @IsString()
  productId: string;


  @IsNumber()
  quantity: number


  @IsString()
  color: string;


  @IsString()
  size: string;

}