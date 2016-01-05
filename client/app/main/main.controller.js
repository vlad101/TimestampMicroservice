'use strict';

(function() {

class MainController {

  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });

    this.host = this.$location.host();
    this.port = this.$location.port();
    // $http.get('/api/things/dateService/' + '1450137600').then(response => {
    //   console.log(response.data);
    //   this.dateJson = response.data;
    //   Access 
    // });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('workspaceApp')
  .controller('MainController', MainController);

})();
