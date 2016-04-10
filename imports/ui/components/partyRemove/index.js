import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '/imports/api/parties';

import './partyRemove.html';

class PartyRemove {
    remove() {
        if (this.party) {
            Parties.remove(this.party._id);
        }
    }
}

export const name = 'partyRemove';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
        party: '<'
    }, controllerAs: name,
    controller: PartyRemove
});