import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({

    'user.create'(data) {
        check(data, Object);
        const { email, password } = data;
        check(email, String);
        check(password, String);

        new SimpleSchema({
            email: { type: String },
            password: { type: String },
        }).validate({ email, password });

        try {
            if (Accounts.findUserByEmail(email)) {
                return new Meteor.Error({
                    statusCode: 409,
                    message: 'Email already exist',
                });
            }
            const userId = Accounts.createUser({ email, password });
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
