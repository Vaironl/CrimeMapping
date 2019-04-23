safetyScore.controller('safetyScoreCtrl', function ($rootScope, $scope, SafetyScoreData) {

    $scope.data = {};
    $scope.publicProfile = function () {
        $scope.togglePublic = !$scope.togglePublic;
        SafetyScoreData.setCrimeFilter(1);
        $rootScope.$broadcast('FilterChange', 'PublicToggled');
    }
    $scope.propertyProfile = function () {
        $scope.toggleProperty = !$scope.toggleProperty;
        SafetyScoreData.setCrimeFilter(2);
        $rootScope.$broadcast('FilterChange', 'PropertyToggled');
    }
    $scope.personProfile = function(){
        $scope.togglePerson = !$scope.togglePerson;
        SafetyScoreData.setCrimeFilter(3);
        $rootScope.$broadcast('FilterChange', 'PersonToggled');
    }
    $scope.severeProfile = function (){
        $scope.toggleSevere = !$scope.toggleSevere;
        SafetyScoreData.setCrimeFilter(4);
        $rootScope.$broadcast('FilterChange', 'SevereToggled');
    }

    // This toggles demo data on and off.
    $scope.demoProfile =  async function (){
        let promise = new Promise((resolve, reject)=>{
            setTimeout(() => resolve( $rootScope.$broadcast('FilterChange', 'demoToggled') ), 1000)
        })
        $scope.toggleDemo = !$scope.toggleDemo;
        SafetyScoreData.demo();
        let result = await  promise;
    }

})