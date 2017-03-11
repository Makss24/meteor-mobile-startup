import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './login.html';
import './login.css';


Template.login.onRendered(() => {
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

    $('form button').on('click', (event) => {
        event.preventDefault();
        if (event.currentTarget.id === "register-submit") {
            const registerData = {
                username: $('#register-username').val(),
                email: $('#register-email').val(),
                password: $('#register-password').val(),
                confirmPassword: $('#confirm-password').val(),
            };
            console.log(registerData);

            Meteor.call('user.create', registerData, (err, res) => {
                if (err)
                    console.log(err);
                else
                    console.log(res);
                    $('#login-form-link').click();
                    // TODO : autocomplete field of login
            });

        } else {
            console.log('log in form');
        }
    });
});
