export const routerPaths = {
  HOME: '',
  LAPTOP_DETAIL: (id?: string) => `/laptop/${id || ':id'}`
};
