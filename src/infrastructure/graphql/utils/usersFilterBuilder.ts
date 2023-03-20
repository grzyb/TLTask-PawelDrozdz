import { Op } from 'sequelize';
import { UsersFilters } from '@/infrastructure/types/interfaces';

interface UsersFiltersQuery {
  email?: { [Op.substring]: string };
  firstName?: { [Op.substring]: string };
  lastName?: { [Op.substring]: string };
  gender?: { [Op.eq]: string };
  isAdmin?: { [Op.eq]: boolean };
}
export const usersFilterBuilder = (filters?: UsersFilters): UsersFiltersQuery => {
  if (filters) {
    const queryPart: UsersFiltersQuery = {};
    if (filters.email) {
      queryPart['email'] = { [Op.substring]: filters.email };
    }
    if (filters.firstName) {
      queryPart['firstName'] = { [Op.substring]: filters.firstName };
    }
    if (filters.lastName) {
      queryPart['lastName'] = { [Op.substring]: filters.lastName };
    }
    if (filters.gender) {
      queryPart['gender'] = { [Op.eq]: filters.gender };
    }
    if (filters.isAdmin !== undefined) {
      queryPart['isAdmin'] = { [Op.eq]: filters.isAdmin };
    }
    return queryPart;
  }
  return {};
};
