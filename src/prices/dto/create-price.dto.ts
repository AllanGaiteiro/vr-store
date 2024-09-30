import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  storeId: number;

  @IsNotEmpty()
  @IsNumber()
  priceValue: number;
}
