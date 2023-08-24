export const convertProgressToPage = (
  pageNumber: number,
  totalPages: number,
) => {
  const progress = pageNumber / (totalPages - 1);
  return progress;
};
