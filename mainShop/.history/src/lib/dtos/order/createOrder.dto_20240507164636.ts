
export class createOderDto {

  public userId?: string;

  @IsNotEmpty()
  public deliveryInfo: IDeliveryInfo;
  
  @IsNotEmpty()
  public personalDetails: IPersonalInfo;

  @IsString()
  @IsNotEmpty()
  public paymentMethods: string;


  public note: string;
}
