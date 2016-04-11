import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Parties } from './collection';

if (Meteor.isServer) {
    FindFromPublication.publish('parties', function(options, searchString) {
        const selector = {
            $or: [{
                // the public parties
                $and: [{
                    public: true
                }, {
                    public: {
                        $exists: true
                    }
                }]
            }, {
                // when logged in user is the owner
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }]
        };

        if (typeof searchString === 'string' && searchString.length) {
            selector.name = {
                $regex: `.*${searchString}.*`,
                $options : 'i'
            };
        }

        Counts.publish(this, 'numberOfParties', Parties.find(selector), {
            noReady: true
        });

        return Parties.find(selector, options);
    });

    FindFromPublication.publish('favoriteParties', function() {
        return Parties.find({
            favoritedBy: this.userId
        });
    })
}
