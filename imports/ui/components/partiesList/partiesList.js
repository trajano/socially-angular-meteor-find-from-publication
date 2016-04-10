import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '/imports/api/parties';
import './partiesList.html'
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove'

class PartiesList {
    constructor($scope, $reactive) {
        $reactive(this).attach($scope);

        this.helpers({
            parties : () => Parties.find({})
        });
    }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
    angularMeteor, PartyAdd, PartyRemove
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: PartiesList
});