import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '/imports/api/parties/collection';
import './partiesList.html'
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove'
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { name as PartiesSort } from '../partiesSort';

class PartiesList {
    constructor($scope, $reactive) {
        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.subscribe('parties', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')
        ]);
        this.helpers({
            parties: () => Parties.find({}, {
                sort: this.getReactively('sort')
            }),
            partiesCount: () => Counts.get('numberOfParties')
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
    angularMeteor, PartyAdd, PartyRemove, uiRouter, utilsPagination, PartiesSort
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: PartiesList
    })
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        });
}