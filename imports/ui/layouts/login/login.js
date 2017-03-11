import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './login.html';


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


// TODO : Add validation rules and error messages
    $('form button').on('click', (event) => {
        event.preventDefault();
        if (event.currentTarget.id === "register-submit") {
            const registerData = {
                email: $('#register-email').val(),
                password: $('#register-password').val(),
                confirmPassword: $('#confirm-password').val(),
            };

            if (registerData.password === registerData.confirmPassword) {
                Meteor.call('user.create', registerData, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                        $('#login-form-link').click();
                        // TODO : autocomplete field of login
                    }
                });
            } else {
                alert('password fields doesn\'t match');
            }

        } else {
            const loginData = {
                email: $('#email').val(),
                password: $('#password').val(),
            };

            Meteor.loginWithPassword(loginData.email, loginData.password, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    FlowRouter.go('home');
                }
            });
        }
    });
});
