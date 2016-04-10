import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './socially.html';
import { name as PartiesList } from '../partiesList/partiesList';
import { name as Navigation } from '../navigation';
import { name as PartyDetails } from '../partyDetails';

class Socially {
}

const name = 'socially';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartiesList,
    Navigation, PartyDetails, 'accounts.ui'
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Socially
}).config(config)
    .run(run);

function config($locationProvider, $urlRouterProvider) {
    //   $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/parties');
}

function run($rootScope, $state) {

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            console.log(event, toState, toParams, fromState, fromParams, error)
            if (error === 'AUTH_REQUIRED') {
                $state.go('parties');
            }
        }
    );
}