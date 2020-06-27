function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      shoes: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.shoes = response.data));
    },
    methods: {
      deleteShoe: function(id) {
        console.log('HTTP DELETE spre backend, shoe: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.shoes = response.data));  
        });
      },
    }
  });


}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
