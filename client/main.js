import { Template } from 'meteor/templating';
import './main.html';
import { Meteor } from 'meteor/meteor'

// App state (initial: loading)
Session.set( "state", "loading" );

// Questions (loaded via ajax)
Session.set( "questionsDatabase", undefined);
Session.set( "questions", undefined);
Session.set( "currTopic", 0);
Session.set( "currTopicQuestion", 0);
Session.set( "currQuestion", 0);
Session.set( "incorrectQuestions", {});
Session.set( "currentIncorrectAnswer", undefined);
Session.set( "totalIncorrectAnswers", 0);

// Config
Session.set( "confPreviewAnswer", false);

Meteor.startup(function () {
    

    
    function questionsLoaded(data){
        // Set question database
        Session.set( "questionsDatabase", data);
        
        // Switch to question state
        Session.set( "state", "config" );
        
    };
    
    $.get("questions/Fragen/questions.json", questionsLoaded);
    
    
	
});

Template.root.helpers({
    state_template: function() {
        return Session.get("state");
    },
});




