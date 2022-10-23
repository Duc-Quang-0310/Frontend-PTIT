export const routerPaths = {
  HOME: '',
  LAPTOP_DETAIL: (id?: string) => `/laptop/${id || ':id'}`,
  USER_PROFILE: (id?: string) => `/user/${id || ':id'}`,
  PRODUCT_LIST: '/laptop'
};
