import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { Slideout } from 'meteor/chriswessels:slideout';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

import '../imports/startup/client';
import './main.css';


Template.main.onRendered(() => {
  'use strict';

  const template = this;

  Meteor._slideout = new Slideout({
    menu: template.$('.slideout-menu').get(0),
    panel: template.$('.app-content').get(0),
    padding: 256,
    tolerance: 70,
  });


  Tracker.autorun(() => {
    if (Meteor.user()) {
      Meteor._slideout = new Slideout({
        menu: template.$('.slideout-menu').get(0),
        panel: template.$('.app-content').get(0),
        padding: 256,
        tolerance: 70,
      });
    } else {
      Meteor._slideout.destroy();
    }
  });

  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    if (Meteor._slideout) {
      Meteor._slideout.close();
    }
  });
});



Template.main.helpers({

  isConnected() {
    return Meteor.user();
  },

});



Template.main.events({

  'click .js-logout'() {
    Meteor.logout();
    FlowRouter.go('index');
  },

  'click .js-menu-toggle'() {
    Meteor._slideout.toggle();
  },

  'click .app-content, click .item a'() {
    'use strict';
    const html = $('html');
    if (html.hasClass('slideout-open')) {
      Meteor._slideout.toggle();
    }
  },

});
