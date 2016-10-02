import { Template } from 'meteor/templating';
import './main.html';
import { Meteor } from 'meteor/meteor'

// App state (initial: loading)
Session.set( "state", "loading" );

// Questions (loaded via ajax)
Session.set( "questions", undefined);
Session.set( "currQuestion", 0);
Session.set( "maxQuestion", 0);
Session.set( "correctQuestions", 0);

Meteor.startup(function () {
    

    
    function questionsLoaded(data){
        // Set Question data
        Session.set( "questions", data);
        // Switch to question state
        Session.set( "state", "questions" );
        
    };
    
    $.get("questions/Fragen/questions.json", questionsLoaded);
    
    
	
});

Template.root.helpers({
    state_template: function() {
        return Session.get("state");
    },
});

Template.questions.helpers({

    get_question() {
        var currQuestion = Session.get("currQuestion");
        var questions = Session.get( "questions" )[0].questions;
        Session.set( "maxQuestion", questions.length-1);
        return questions[currQuestion];
    },
    
    curr_question() {
        return Session.get("currQuestion");
    },
    
    max_question() {
        return Session.get("maxQuestion");
    },
    
    correct_questions() {
        return Session.get("correctQuestions");
    },

});

Template.questions.events({

    'click #btnNext'(){
        // Increment current question index
        var currQuestion = Session.get( "currQuestion");
        Session.set("currQuestion", currQuestion + 1);
        
        // Clear answers
        $(".answer").attr('checked',false);
        
        // Hide myself
        $('#btnNext').addClass('hidden');
    },

});
