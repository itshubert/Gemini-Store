import useSWR from "swr";
import { api } from "../../../common/utils/api";
import type { Category } from "../types/category";

export const useCategories = () => {
  const allCategoriesUrl = "/categories";

  const {
    data: categories,
    error,
    isValidating: isLoading,
  } = useSWR<Category[]>(allCategoriesUrl, (url: string) => {
    var result = api.Get<Category[]>(url);
    return result;
  });

  return { categories, isLoading, error };
};
