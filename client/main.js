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
Session.set( "incorrectQuestions", []);
Session.set( "currentIncorrectAnswer", undefined);
Session.set( "currQuestionCorrect", false);

Meteor.startup(function () {
    

    
    function questionsLoaded(data){
        // Set Question data (select random questions)
        Session.set( "questions", selectQuestions(data,10));
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

function selectQuestions(topics, questionsPerTopic) {
    var selectedQuestions = []
    
    // Iterate over topics
    topics.forEach(function(topic){
        var topicQuestions = selectTopicQuestions(topic.questions, questionsPerTopic);
        topicQuestions.forEach(function(q){
            // add topic name
            q.topic = topic.topic;
            selectedQuestions.push(q);
        });
    });
    
    return selectedQuestions;
};

function selectTopicQuestions(list, count) {
    var selElems = [];
    elemsLeft = list.length;
    list.forEach(function(e){
        var p = count / elemsLeft;
        if (p >= Math.random())
        {
            selElems.push(e);
            count--;
        }
        elemsLeft--;
    });
    return selElems;
}


Template.questions.helpers({

    get_question() {
        var currQuestion = Session.get("currQuestion");
        var questions = Session.get( "questions" );
        Session.set( "maxQuestion", questions.length-1);
        return questions[currQuestion];
    },
    
    curr_question() {
        return Session.get("currQuestion")+1;
    },
    
    max_question() {
        return Session.get("maxQuestion")+1;
    },
    
    correct_questions() {
        return Session.get("correctQuestions");
    },

});

function approveAnswer(){
    // Increment correct answers
    if (Session.get( "currQuestionCorrect"))
    {
        Session.set( "correctQuestions", Session.get( "correctQuestions")+1);
    }
    
    // Append current incorrect answer
    var currentIncorrectAnswer = Session.get("currentIncorrectAnswer");
    if (currentIncorrectAnswer)
    {
        var incorrectQuestions = Session.get('incorrectQuestions');
        incorrectQuestions.push(currentIncorrectAnswer);
        Session.set( "incorrectQuestions", incorrectQuestions);
    }
    
    
}

Template.questions.events({

    'click #btnNext'(){
        
        approveAnswer();
        
        // Increment current question index
        var currQuestion = Session.get( "currQuestion");
        Session.set("currQuestion", currQuestion + 1);
        
        // Clear answers
        $(".answer").attr('checked',false);
        
        // Hide myself
        $('#btnNext').addClass('hidden');
    },
    
    'click #btnFinish'(){
        
        approveAnswer();
        
        // App state: Finished
        Session.set( "state", "finished" );
    },

});
