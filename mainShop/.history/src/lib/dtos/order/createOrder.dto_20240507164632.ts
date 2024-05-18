
export class createOderDto {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsNotEmpty()
  public deliveryInfo: IDeliveryInfo;
  
  @IsNotEmpty()
  public personalDetails: IPersonalInfo;

  @IsString()
  @IsNotEmpty()
  public paymentMethods: string;

  @IsOptional()
  @IsString()
  public note: string;
}
