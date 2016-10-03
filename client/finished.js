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
    
    questions_incorrect() {
        var questions = Session.get( "questions" );
        var incorrectQuestions = Session.get("incorrectQuestions");
        var completeIncorrectQuestions = [];
        incorrectQuestions.forEach(function(q){
            var compQ = questions[q.question];
            compQ.answers[q.answer].given = "true";
            completeIncorrectQuestions.push(compQ);
        });
        return completeIncorrectQuestions;
    },

});
