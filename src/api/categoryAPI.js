import axiosClient from './axiosClient';

const categoryAPI = {
  // getAll() {
  //   const url = '/categories';
  //   return axiosClient.get(url);
  // },
  async getAll() {
    // Fetch category list
    const result = await axiosClient.get('/categories', {});

    // Build response and return
    return result;
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoryAPI;
