import { Template } from 'meteor/templating';
import './finished.html';


function getQuestionCount()
{
    var questionCount = 0;
    var questions = Session.get( "questions" );
    questions.forEach(function(topic){
        
        questionCount += topic.questions.length;
        
    });
    return questionCount;
}

Template.finished.helpers({
    
    questions_total() {
        return getQuestionCount();
    },
    
    correct_abs() {
        return (getQuestionCount()-Session.get( "totalIncorrectAnswers"));
    },
    
    correct_rel() {
        return 100 - Math.round((Session.get( "totalIncorrectAnswers")/getQuestionCount()) * 100) ;
    },
    
    minus(a,b) {
        return a-b;
    },
    
    inverted_percentage(value, base) {
        return 100 - Math.round((value/base) * 100) ;
    },
    
    questions_incorrect() {
        var incorrectQuestions = Session.get("incorrectQuestions");
        return $.map(incorrectQuestions, function(value, key) { return value });
    },

});
