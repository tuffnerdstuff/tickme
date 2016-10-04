import { Template } from 'meteor/templating';
import './finished.html';

Template.finished.helpers({
    
    questions_total() {
        return Session.get("questions").length;
    },
    
    correct_abs() {
        return (Session.get("questions").length-Session.get("incorrectQuestions").length);
    },
    
    correct_rel() {
        return 100 - Math.round((Session.get("incorrectQuestions").length/(Session.get("questions").length)) * 100) ;
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
