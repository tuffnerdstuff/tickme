import { Template } from 'meteor/templating';
import './question.html';

function getCurrentTopic()
{
    var currTopic = Session.get( "currTopic");
    var questions = Session.get( "questions" );
    return questions[currTopic];
}

function getCurrentQuestion()
{
    var currTopicQuestionIndex = Session.get( "currTopicQuestion");
    var currTopic = getCurrentTopic();
    return currTopic.questions[currTopicQuestionIndex];
}


Template.questions.helpers({

    get_question() {
        return getCurrentQuestion();
    },
    
    get_topic() {
        
        return getCurrentTopic();
    },
    
    topic_question_nr() {
        return Session.get( "currTopicQuestion") + 1;
    },
    
    topic_question_count() {
        return getCurrentTopic().questions.length;
    },
    
    curr_question_nr() {
        return Session.get("currQuestion")+1;
    },
    
    question_count() {
        var questionCount = 0;
        var questions = Session.get( "questions" );
        questions.forEach(function(topic){
            
            questionCount += topic.questions.length;
            
        });
        return questionCount;
    },
    
    is_preview() {
        return Session.get("confPreviewAnswer");
    },

});

function approveAnswer(){
        
        // Append current incorrect answer
        var currentIncorrectAnswer = Session.get("currentIncorrectAnswer");
        if (currentIncorrectAnswer)
        {
            var incorrectQuestions = Session.get('incorrectQuestions');
            var currentTopic = getCurrentTopic();
            if (!(currentTopic.topic in incorrectQuestions))
            {
                var newTopic = {topic:currentTopic.topic};
                newTopic.questionsTotal = currentTopic.questions.length;
                newTopic.questionsWrong = 0;
                newTopic.questions = [];
                incorrectQuestions[currentTopic.topic] = newTopic;
            }
            var incorrectAnswer = {};
            incorrectAnswer.question = currentIncorrectAnswer.question.question;
            incorrectAnswer.answers =  currentIncorrectAnswer.question.answers.slice();
            incorrectAnswer.answers[currentIncorrectAnswer.givenAnswerIndex].given = true;
            incorrectQuestions[currentTopic.topic].questionsWrong++;
            incorrectQuestions[currentTopic.topic].questions.push(incorrectAnswer);
            Session.set( "incorrectQuestions", incorrectQuestions);
            Session.set( "totalIncorrectAnswers", Session.get( "totalIncorrectAnswers") + 1);
        }
        
        // update progress
        $('#progress').progress('increment');

    
}


Template.question.rendered = function() {
    $('#progress').progress({showActivity: false});
};

Template.question.events({
	'click .answer'(event, template) {
        
        // Mark answer as given
        $('.given').removeClass('given');
        $(event.target.parentElement.parentElement).addClass('given');
        
		if (this.answer.correct == "true")
		{
            
            // Reset current incorrect question data
            Session.set("currentIncorrectAnswer",undefined);
            
		}
		else
		{
            
            // Set current incorrect question data
            var currTopic = getCurrentTopic();
            var incorrectAnswer = {};
            incorrectAnswer.question = getCurrentQuestion();
            incorrectAnswer.givenAnswerIndex = this.questionIndex;
            Session.set("currentIncorrectAnswer",incorrectAnswer);
            
		}
        
        if (this.isConfPreview)
        {
            // Reveal "Accept" Button
            $('#btnAccept').removeClass("hidden");
        }
        else
        {
            revealNextButton(this);
        }
        
        
	},
    
    'click .question_image': function (e) {
        var imgPath = $(e.currentTarget).attr("src");
        if (imgPath) {
            sImageBox.open(imgPath);
        }
    },
    
    'click .s-image-box-image': function(e) {
        sImageBox.close();
    },
    
    'click #btnAccept'(event, template){
        $('#btnAccept').addClass('hidden');
        $('#question_container').addClass('preview');
        $('.answer').attr("disabled", true);
        revealNextButton(this);
    },

    'click #btnNext'(){
        
        // fade out
        $('#question_container').transition({animation: 'fade up', onComplete: function(){
            
            approveAnswer();
        
            // Increment current question index
            var questions = Session.get( "questions");
            var currQuestion = Session.get( "currQuestion");
            Session.set("currQuestion", currQuestion + 1);
            var currTopic = Session.get("currTopic");
            var currTopicQuestion = Session.get( "currTopicQuestion");
            if ((questions[currTopic].questions.length-1) > currTopicQuestion)
            {
                Session.set("currTopicQuestion", currTopicQuestion + 1);
            }
            else
            {
                Session.set("currTopic", currTopic + 1);
                Session.set("currTopicQuestion", 0);
            }
            
            
            // Clear preview
            $('.preview').removeClass('preview');
            
            // Clear answers
            $(".answer").attr('checked',false);
            
            // Enable answers
            $('.answer').removeAttr("disabled");
            
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

function revealNextButton(templ)
{
    if (templ.currQuestion < templ.maxQuestion)
    {
        // Reveal "Next" Button
        $('#btnNext').removeClass("hidden");
    }
    else
    {
        // Revel "Finish" Button
        $('#btnFinish').removeClass("hidden");
    }
}

Template.answer.helpers({

    is_answer_correct: function(answer) {
        return answer.correct == "true";
    },

});
