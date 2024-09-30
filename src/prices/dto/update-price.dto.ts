import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePriceDto {
  @IsOptional()
  @IsNumber()
  priceValue?: number;
}
