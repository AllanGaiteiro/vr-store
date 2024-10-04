export class PaginatedResultDto<T> {
  data: T[];
  length: number;
  page: number;
  limit: number;

  constructor(data: T[], length: number, page: number, limit: number) {
    this.data = data;
    this.length = length;
    this.page = page;
    this.limit = limit;
  }
}
