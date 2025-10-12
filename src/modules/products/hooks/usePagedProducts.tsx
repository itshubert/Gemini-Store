import useSWR from "swr";
import type { PagedItems } from "../../../common/types/PagedItems";
import { api } from "../../../common/utils/api";
import type { Product } from "../types/product";

export type PagedProductsByCategoryParams = {
  categoryId: string | null;
  page: number;
  pageSize: number;
};

export const usePagedProducts = (params: PagedProductsByCategoryParams) => {
  const productsUrl = "/products";

  const fetcher = async ([productsUrl, categoryId, page, pageSize]: [
    string,
    string | null,
    number,
    number,
  ]) => {
    if (!categoryId) {
      return {
        items: [],
        totalCount: 0,
        pageNumber: page,
        pageSize: pageSize,
      };
    }

    const url = `${productsUrl}?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`;
    const result = await api.Get<PagedItems<Product>>(url);
    return result;
  };

  const {
    data: pagedProducts,
    error,
    isValidating: isLoading,
  } = useSWR<PagedItems<Product>>(
    [productsUrl, params.categoryId, params.page, params.pageSize],
    fetcher,
  );

  return { pagedProducts, isLoading, error };
};
