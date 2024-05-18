
export class createOderDto {

  public userId?: string;


  public deliveryInfo: IDeliveryInfo;
  

  public personalDetails: IPersonalInfo;

  @IsString()

  public paymentMethods: string;


  public note: string;
}
