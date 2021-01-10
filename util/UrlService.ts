// util é como se fosse um service, mesma estrutura

interface UrlServiceRequest {
  page: string | string[],
  search?: string
}

const UrlService = {
  execute({ page, search }: UrlServiceRequest ): string {
    return (
      `${search !== '' ? `?search[name]4${search}` : ''}` +
      `${search !== '' ? '&' : '?'}page=${page}`
    )
  }
}

export default  UrlService