/**
 * Created by Sahan on 10/8/2016.
 */


var serviceName = 'userAccountService';

app.service(serviceName,
    ['$http', 'API_URL', '$location', 'toaster',  'SUCCESS', 'ERROR',
        function ($http, API_URL, $location, toaster, SUCCESS, ERROR) {


            /*
            * This method calls the back end methods that save a user to the database.
            * */
            this.saveUserAccount = function (request, callback) {

                var url = API_URL + "save_user";

                /*
                 * HTTP post method to save the user data to the database.
                 */
                $http({
                    method: 'POST', // Method
                    url: url, // The route to the save user method in the backend
                    data: $.param(request), // The data that's passed to the back end
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'} // This is necessary for the post request to work
                })

                    .success(function (response) {

                        if (response.status === SUCCESS) {
                            callback(response);
                        }

                        else if (response.status === ERROR) {
                            callback(response);
                        }

                        else {

                        }
                    })

                    .error(function () {
                        toaster.error("Error", "Error creating user account");
                    });
            };


            /*
            * This method calls the server and requests a list of all the users in the database*/
            this.loadAllUsers = function (callback) {
                var url = API_URL + "load_all_users";

                $http.get(url)
                    .success(function (response) {
                        if(response.status === SUCCESS)
                        {
                            var userData;

                            if(response.userList.length === 0)
                            {
                                toaster.info("User Accounts", "No users registered yet")
                            }

                            userData = response.userList;
                            callback(userData);
                        }
                        else if (response.status === ERROR)
                        {
                            toaster.error("Error","Error in reading user accounts");
                        }

                        else
                        {

                        }
                    })
                    .error(function () {
                        toaster.error("Error", "Error in reading user accounts");
                    })
            };


            this.deleteUser = function (request, callback) {


                var url = API_URL + "delete_user";

                /*
                 * HTTP post method to save the user data to the database.
                 */
                $http({
                    method: 'POST', // Method
                    url: url, // The route to the save user method in the backend
                    data: $.param(request), // The data that's passed to the back end
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'} // This is necessary for the post request to work
                })

                    .success(function (response) {

                        if (response.status === SUCCESS) {
                            callback(response);
                        }

                        else if (response.status === ERROR) {
                            callback(response);
                        }

                        else {

                        }
                    })

                    .error(function () {
                        toaster.error("Error", "Error deleting user account");
                    });


            }


        }]);
