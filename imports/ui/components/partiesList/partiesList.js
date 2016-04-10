import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '/collections/parties';
import './partiesList.html'

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
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: PartiesList
});