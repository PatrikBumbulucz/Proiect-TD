function run() {
    new Vue({
      el: '#new',
      data: {
        id: 'default',
        shoe: {}
      },
      created: function () {
      },
      methods: {
        addShoe: function() {
            this.shoe={"id": 0,
            "name": document.getElementById("name").value,
            "brand": document.getElementById("brand").value,
            "color": document.getElementById("color").value,
            "size": document.getElementById("size").value,
            "material": document.getElementById("material").value,
            "year": document.getElementById("year").value,
            "price": document.getElementById("price").value};
            
            return axios.put('http://localhost:3000/shoes', this.shoe).then(
               (response) => {
                    this.message = response.data;
                    console.log(this.message); // saved
                }
            );      
            
          },
        }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  