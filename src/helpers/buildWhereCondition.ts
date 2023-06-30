import { SortOrder } from 'mongoose';

export const buildWhereConditions = (
  searchTerm?: string,
  filtersData?: any,
  searchableFields?: string[],
  sortBy?: number | string,
  sortOrder?: SortOrder
) => {
  const andConditions = [];
  if (searchTerm) {
    const searchRegExp = new RegExp('.*' + searchTerm + '.*', 'i');
    andConditions.push({
      $or: searchableFields?.map(field => ({
        [field]: {
          $regex: searchRegExp,
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field == 'minPrice' && typeof value === 'string') {
          return { price: { $gte: value } };
        }
        if (field === 'maxPrice' && typeof value === 'string') {
          return { price: { $lte: value } };
        }
        if (typeof value === 'string') {
          return {
            [field]: { $regex: new RegExp(value, 'i') },
          };
        }
        return { [field]: value };
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  return {
    whereConditions,
    sortConditions,
  };
};
