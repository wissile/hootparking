'use strict';
window.fbAsyncInit = function () {  
             FB.init({  
                 appId: '1763685530568368',  //'1231500983547179',  
                 status: true,  
                 cookie: true,  
                 xfbml: true,  
                 version: 'v2.7'  
             });  
         };  
  
         (function (d, s, id) {  
             var js, fjs = d.getElementsByTagName(s)[0];  
             if (d.getElementById(id)) { return; }  
             js = d.createElement(s); js.id = id;  
             js.src = "//connect.facebook.net/en_US/sdk.js";  
             fjs.parentNode.insertBefore(js, fjs);  
         } (document, 'script', 'facebook-jssdk')); 

angular.module('easyparkangularApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
   var fields = [
          'id',
          'name',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'locale',
          'languages',
          'link',
          'third_party_id',
          'installed',
          'timezone',
          'updated_time',
          'verified',
          'age_range',
          'bio',
          'birthday',
          'cover',
          'currency',
          'devices',
          'education',
          'email',
          'hometown',
          'interested_in',
          'location',
          'political',
          'payment_pricepoints',
          'favorite_athletes',
          'favorite_teams',
          'picture',
          'quotes',
          'relationship_status',
          'religion',
          'significant_other',
          'video_upload_limits',
          'website',
          'work'
          ].join(',');
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }
    return {
      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      
      login: function(user, callback)
       {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/auth/local', 
        {
          email: user.email,
          password: user.password
        }).
        success(function(data) 
        {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) 
        {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        return deferred.promise;
      },


      
      /** 
       * facebook 
       * 
       * @param  {Function} 
       */ 
 
      fbLogin1: function(callback){ 
        var cb = callback || angular.noop; 
        var deferred = $q.defer(); 
                   FB.getLoginStatus(function (response) {  
                if (response.status === 'connected') {  
                     FB.api('/me',{fields: fields},function(response) { 
                      var datalist = encodeURIComponent(JSON.stringify({id:response.id,firstName:response.first_name,lastname:response.last_name,name:response.name,dob:'',email:response.email,userType:'Facebook'})); 
                       $http.post('/api/users/fbuser/'+datalist).success(function(data) {  
                       if(data.err){
                        return cb(data);
                       }
                       else{
                            $cookieStore.put('token', data.token); 
                            currentUser = User.get(); 
                            deferred.resolve(data); 
                            return cb(data); 
                            }
                       }); 
                     }); 
                }  
                else {  
                FB.login(function (response){  
                  FB.getLoginStatus(function (response) {  
                      if (response.status === 'connected') {  
                      FB.api('/me',{fields: fields},function(response) { 
                      var datalist = encodeURIComponent(JSON.stringify({id:response.id,firstName:response.first_name,lastname:response.last_name,name:response.name,dob:'',email:response.email,userType:'Facebook'})); 
                       $http.post('/api/users/fbuser/'+datalist).success(function(data) {  
                            if(data.err){
                        return cb(data);
                       }
                       else{
                            $cookieStore.put('token', data.token); 
                            currentUser = User.get(); 
                            deferred.resolve(data); 
                            return cb(data); 
                            }
                       }); 
                     }); 
                  }    
                  });    
            }); 
        };  
   
 
  }); 
      },

       fbLoginNewUser: function(callback){ 
        var cb = callback || angular.noop; 
        var deferred = $q.defer(); 
                   FB.getLoginStatus(function (response) {  
                if (response.status === 'connected') {  
                     FB.api('/me',{fields: fields},function(response) { 
                           return cb(response);
                     }); 
                }  
                else {  
                FB.login(function (response){  
                  FB.getLoginStatus(function (response) {  
                      if (response.status === 'connected') {  
                      FB.api('/me',{fields: fields},function(response) { 
                         return cb(response); 
                     }); 
                  }    
                  });    
            }); 
        };  
   
 
  }); 
      },
      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
        $location.path('/login');
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      createFBUser: function(user, callback) {
        var cb = callback || angular.noop;
        return User.save(user,
          function(data) {
          if(data.err){
           console.log(data.err.errors)
          }
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Update User
       *
       */

      updateUser: function(user,callback) { 
        var cb = callback || angular.noop;
        $http.put('/api/users/'+user). 
        success(function(data) { 
           return cb(data);
        }). 
        error(function(err) { 
        }); 
        },


      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
