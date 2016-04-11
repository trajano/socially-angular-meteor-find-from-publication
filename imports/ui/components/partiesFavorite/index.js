import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '/imports/api/parties/collection';
import './template.html'
import { name as PartyRemove } from '../partyRemove'

class PartiesFavoriteList {
    constructor($scope, $reactive) {
        $reactive(this).attach($scope);

        this.subscribe('favoriteParties');
        this.helpers({
            // Not going to work as expected because we are getting values from the other subscription
            parties: () => Parties.find({}, {
                sort: {
                    name: 1
                }
            })
        });
    }
}

const name = 'partiesFavorite';
export default name

// create a module
angular.module(name, [
    angularMeteor, PartyRemove
]).component(name, {
    templateUrl: `imports/ui/components/${name}/template.html`,
    controllerAs: name,
    controller: PartiesFavoriteList
})
