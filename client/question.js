import { Template } from 'meteor/templating';
import './question.html';


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
            incorrectQuestions.push(currentIncorrectAnswer);
            Session.set( "incorrectQuestions", incorrectQuestions);
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
            Session.set("currentIncorrectAnswer",{"question":Session.get( "currQuestion"),"answer":this.questionIndex});
            
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
            var currQuestion = Session.get( "currQuestion");
            Session.set("currQuestion", currQuestion + 1);
            
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
