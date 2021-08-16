interface UrlServiceRequest {
  page: string | string[];
  search?: string;
}

const UrlService = {
  // UrlService.execute({ page: 1, search: 'test'})
  // => retorna: `?search=test&page=1`
  // UrlService.execute({ page: 1})
  // => retorna: `?page=1`
  execute({ page, search }: UrlServiceRequest): string {
    return `${search !== '' ? `?search[name]=${search}` : ''}` +
      `${search !== '' ? '&' : '?'}page=${page}`;
  }
}

export default UrlService;