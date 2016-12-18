import { Template } from 'meteor/templating';
import './config.html';

Template.config.onRendered(function() {
    // Activate dropdown
    $('.dropdown').dropdown('set selected', '5');
});

Template.config.helpers({
    
    topics() {
        
        var topics = [];
        
        var q = Session.get( "questionsDatabase");
        q.forEach(function(item){
            topics.push(item.topic);
        });
        return topics;
    },

});

Template.config.events({
	'click #btnStart'(event, template) {
        
        // Get topics
        var topics = [];
        $('.checkbox>input:checked').each(function(){
                topics.push($(this).data("topic"));
        });
        
        // Get question count
        var questionCount = $('#question_count').dropdown('get value');
        
        // Set Question data (select random questions)
        var selectedQuestions = selectQuestions(Session.get("questionsDatabase"), topics, questionCount);
        Session.set( "questions", selectedQuestions);
        
        // Switch to question state
        Session.set( "state", "questions" );
    },
    
    // At least one topic must be selected 
    'click .topic.checkbox'() {
        if ($('.topic.checkbox>input:checked').length > 0 )
        {
            $('#btnStart').removeClass('hidden');
        }
        else 
        {
            $('#btnStart').addClass('hidden');
        }
    },
    
    // Option: Preview correct answer
    'change #chkPreview'(event, instance) {
        Session.set( "confPreviewAnswer", event.target.checked);
    },

});

function selectQuestions(questions, topics, questionsPerTopic) {
    var selectedQuestions = []
    
    // Iterate over topics
    questions.forEach(function(topic){
        
        // Only select topic if it is in topics array
        if ($.inArray(topic.topic, topics) != -1){
        
            var q = {"topic":topic.topic,"questions":selectTopicQuestions(topic.questions, questionsPerTopic)};
            selectedQuestions.push(q);
        }
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







