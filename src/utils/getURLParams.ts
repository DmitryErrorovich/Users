import qs from "qs";

export const getPaginationPage = (str: string) => {
  if (typeof str !== "string") {
    return 1;
  }

  const { page = 1 } = qs.parse(str.replace("?", ""));
  return +page;
};

export const getSearchValue = (str: string) => {
  if (typeof str !== "string") {
    return 1;
  }

  const { searchValue = "" } = qs.parse(str.replace("?", ""));
  return searchValue;
};
