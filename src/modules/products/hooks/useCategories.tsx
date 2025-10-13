import useSWR from "swr";
import { api } from "../../../common/utils/api";
import type { Category } from "../types/category";

export const useCategories = () => {
  const allCategoriesUrl = "/categories";

  const {
    data: categories,
    error,
    isValidating: isLoading,
    mutate,
  } = useSWR<Category[]>(
    allCategoriesUrl,
    (url: string) => {
      var result = api.Get<Category[]>(url);
      return result;
    },
    {
      revalidateOnFocus: true,
    },
  );

  return { categories, isLoading, error, mutate };
};
