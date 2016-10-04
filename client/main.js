import { Template } from 'meteor/templating';
import './main.html';
import { Meteor } from 'meteor/meteor'

// App state (initial: loading)
Session.set( "state", "loading" );

// Questions (loaded via ajax)
Session.set( "questionsDatabase", undefined);
Session.set( "questions", undefined);
Session.set( "currQuestion", 0);
Session.set( "incorrectQuestions", []);
Session.set( "currentIncorrectAnswer", undefined);

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




Template.questions.helpers({

    get_question() {
        var currQuestion = Session.get("currQuestion");
        var questions = Session.get( "questions" );
        return questions[currQuestion];
    },
    
    curr_question() {
        return Session.get("currQuestion")+1;
    },
    
    max_question() {
        return Session.get("questions").length;
    },

});

function approveAnswer(){
        
        // Append current incorrect answer
        var currentIncorrectAnswer = Session.get("currentIncorrectAnswer");
        if (currentIncorrectAnswer)
        {
            var incorrectQuestions = Session.get('incorrectQuestions');
            incorrectQuestions.push(currentIncorrectAnswer);
            Session.set( "incorrectQuestions", incorrectQuestions);
        }
        
        // update progress
        $('#progress').progress('increment');

    
}

Template.questions.events({

    'click #btnNext'(){
        
        // fade out
        $('#question_container').transition({animation: 'fade up', onComplete: function(){
            
            approveAnswer();
        
            // Increment current question index
            var currQuestion = Session.get( "currQuestion");
            Session.set("currQuestion", currQuestion + 1);
            
            // Clear answers
            $(".answer").attr('checked',false);
            
            // Hide myself
            $('#btnNext').addClass('hidden');
            
            // fade in
            $('#question_container').transition('fade up'); 
        }});
        
        
    },
    
    'click #btnFinish'(){
        
        approveAnswer();
        
        // App state: Finished
        Session.set( "state", "finished" );
    },

});
