import { PaginatedResultDto } from '../dto/paginated-result.dto';
import { SelectQueryBuilder } from 'typeorm';

export class PaginatedResultService<T> {
  async getPaginatedResult(
    query: SelectQueryBuilder<T>,
    page?: number,
    limit?: number,
  ): Promise<PaginatedResultDto<T>> {
    const result = new PaginatedResultDto<T>([], 0, page || 0, limit || 0);

    if (page && limit) {
      const [data, length] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      result.data = data;
      result.length = length;
    } else {
      const data = await query.getMany();
      result.data = data;
      result.length = data.length;
      result.limit = data.length;
    }

    return result;
  }
}
