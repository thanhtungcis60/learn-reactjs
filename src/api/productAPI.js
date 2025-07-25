import axiosClient from './axiosClient';

const productAPI = {
  // getAll(params) {
  //   const url = '/products';
  //   return axiosClient.get(url, { params });
  // },
  async getAll(params) {
    const newParams = { ...params };
    newParams._page = !params._page || params._page <= 1 ? 1 : params._page;

    // Fetch product list + count
    const result = await axiosClient.get('/products', {
      params: newParams,
    });

    // Build response and return
    return result;
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
export default productAPI;
