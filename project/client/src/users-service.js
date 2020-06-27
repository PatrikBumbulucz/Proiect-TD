function users() {
  get = function () {
    return axios.get('http://localhost:3000/shoes');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/shoes/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
