import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '/imports/api/parties/collection';
import { Meteor } from 'meteor/meteor';
import './partyAdd.html';

class PartyAdd {
    constructor() {
        this.party = {};
    }

    submit() {
        this.party.owner = Meteor.user()._id;
        Parties.insert(this.party);
        this.reset();
    }

    reset() {
        this.party = {};
    }
}

export const name = 'partyAdd';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: PartyAdd
});

