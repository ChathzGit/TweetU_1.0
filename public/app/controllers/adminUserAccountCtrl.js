/**
* Created by Sahan on 15/10/2016.
*/
app.controller('adminUserAccountController', ['$scope', '$http', 'API_URL', '$location', 'toaster', 'userAccountService', 'SUCCESS', 'ERROR',
    function ($scope, $http, API_URL, $location, toaster, userAccountService, SUCCESS, ERROR) {


        $scope.users = [];

        $scope.selectedUser = {};

        /*
         * This function will call the service, which in turn will call the
         * server and get the registered users from the database
         */
        $scope.loadUsers = function () {
            userAccountService.loadAllUsers(function (response) {

                $scope.users = response;

            });
        };

        $scope.deleteUser = function (userID) {


            var request = {
                userID : userID
            };

           userAccountService.deleteUser(request, function (response) {

               /*
                * Checks if the user was deleted successfully 
                */
               if (response.status === SUCCESS) {

                   toaster.success("Success","User successfully deleted");
                   $scope.loadUsers();
               }

               /*
                * If the entered credentials are wrong, this happens
                */
               else if (response.status === ERROR) {
                   toaster.error("Error", response.error);
               }

               /*
                * If neither happens, this is there as a last resort
                */
               else {
                   toaster.error("Error", response.error);
               }

           })
        };


        $scope.setSelectUser = function (selectedUser) {
            $scope.selectedUser = selectedUser;


        };

        $scope.adminSave = function () {

            if ($scope.selectedUser.password === $scope.selectedUser.confirmpassword) {

                var user = $scope.selectedUser;

                /*
                 * Calls the angular service dedicated to handle user account features
                 */
                userAccountService.saveUserAccount(user, function (response) {

                    if (response.status === SUCCESS) {
                        toaster.success("Success", "Changes saved successfully");

                        setTimeout(function () {
                            window.location.href = 'user_accounts'
                        }, 2000);
                    }

                    else if (response.status === ERROR) {
                        toaster.error("Error", response.error);
                    }

                    else {
                        toaster.error("Error", response.error);
                    }


                });

            }

            else {
                toaster.error("Error", "Mismatching passwords");
            }

        };


        $scope.loadUsers();
    }



   ]);