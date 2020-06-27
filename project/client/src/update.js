function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        shoe: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/shoes/'+this.id).then(
            (response) => {
                this.shoe = response.data;
            }
        );
      },
      methods: {
        update: function(){
         

            return axios.post('http://localhost:3000/shoes', this.shoe).then(
                (response) => {
                   this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  