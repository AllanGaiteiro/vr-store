import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
