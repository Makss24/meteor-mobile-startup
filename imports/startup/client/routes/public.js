// define your public routing here
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/layouts/homepage/homepage';
import '../../../ui/layouts/login/login';

FlowRouter.route('/', {
  name: 'login',
  action() {
    BlazeLayout.render('main', { content: 'login' });
  },
});

FlowRouter.route('/home', {
  name: 'homepage',
  action() {
    BlazeLayout.render('main', { content: 'homepage' });
  },
});

FlowRouter.notFound = {
  action() {
    FlowRouter.go('index');
  },
};
