import { SelectQueryBuilder } from 'typeorm';

export class BaseQueryService<T> {
  applyPaginationAndSorting(
    query: SelectQueryBuilder<T>,
    filters: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'ASC' | 'DESC';
    },
  ): SelectQueryBuilder<T> {
    // Aplicar ordenação
    if (filters?.sortBy && filters?.sortOrder) {
      query.orderBy(`${filters.sortBy}`, filters.sortOrder);
    } else {
      query.orderBy(`product.description`, 'ASC');
    }

    // Aplicar paginação
    if (filters?.page && filters?.limit) {
      query.skip((filters.page - 1) * filters.limit).take(filters.limit);
    }

    return query;
  }

  applyPriceFilters(
    query: SelectQueryBuilder<T>,
    filters: { minPriceValue?: number; maxPriceValue?: number },
    queryAlias: string,
  ): SelectQueryBuilder<T> {
    if (filters?.minPriceValue) {
      query.andWhere(`${queryAlias}.priceValue >= :minPriceValue`, {
        minPriceValue: filters.minPriceValue,
      });
    }

    if (filters?.maxPriceValue) {
      query.andWhere(`${queryAlias}.priceValue <= :maxPriceValue`, {
        maxPriceValue: filters.maxPriceValue,
      });
    }

    return query;
  }
}
