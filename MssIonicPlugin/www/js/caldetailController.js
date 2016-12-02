angular.module('createEvent', [])
.controller('createEventCtrl', function($scope,$ionicPopup, $ionicModal, $timeout, $state,$rootScope) {
                                        $scope.StartDate =$rootScope.treatmentDetail[0].startTime;
                                        $scope.Title =$rootScope.treatmentDetail[0].title;
                                        $scope.Discription =$rootScope.treatmentDetail[0].discription;
                                        $scope.image =$rootScope.treatmentDetail[0].imageURl;
                                        $scope.myGoBack = function() {
                                        $state.go("app.calender");
                                                                     };

})

