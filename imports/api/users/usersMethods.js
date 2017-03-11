import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({

    'user.create'(data) {

        const { username, email, password } = data;

        new SimpleSchema({
            username: { type: String },
            email: { type: String },
            password: { type: String },
        }).validate({ username, email, password });

        try {
            if (Accounts.findUserByEmail(email)) {
                return new Meteor.Error({
                    statusCode: 409,
                    message: 'Email already exist',
                });
            } else if (Accounts.findUserByUsername(username)) {
                return new Meteor.Error({
                    statusCode: 409,
                    message: 'Username already exist',
                });
            }
            const userId = Accounts.createUser({ username, email, password });
            return res = {
                userId,
                statusCode: 200,
                message: 'User created',
            };
        } catch (e) {
            throw new Meteor.Error(e);
        }

    },

});
