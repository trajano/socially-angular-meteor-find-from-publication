import { Meteor } from 'meteor/meteor';
import { Parties } from '/imports/api/parties';
import { Fake } from 'meteor/anti:fake'
import '/imports/api/users';

Meteor.startup(() => {
    if (Parties.find().count() === 0) {
        for (let i = 0; i < 100; ++i) {
            const party = {
                name : Fake.sentence(),
                description: Fake.paragraph(),
                public: true,
                favoritedBy: []
            }
            Parties.insert(party)
        }
    }
});