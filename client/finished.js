import { Template } from 'meteor/templating';
import './finished.html';

Template.finished.helpers({
    
    questions_total() {
        return Session.get("maxQuestion")+1;
    },
    
    correct_abs() {
        return Session.get("correctQuestions");
    },
    
    correct_rel() {
        return Math.round((Session.get("correctQuestions")/(Session.get("maxQuestion")+1)) * 100) ;
    },

});
