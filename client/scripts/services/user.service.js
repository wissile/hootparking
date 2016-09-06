'use strict';

angular.module('easyparkangularApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      updateUser: {
          method: 'PUT',
          params: {
              controller: 'data'
          }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
  },
  save: {
      method: 'POST',
      
  }

	  });
  });
