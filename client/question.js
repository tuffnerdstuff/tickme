import { Template } from 'meteor/templating';
import './question.html';

Template.question.onCreated(function(){
    this.isCorrectAnswer = new ReactiveVar( false );
});

Template.question.helpers({
    
});

Template.question.events({
	'click .answer'(event, template) {
		
		if (this.answer.correct == "true")
		{
			//alert("Stimmt!");
            template.isCorrectAnswer.set(true);
            Session.set( "correctQuestions", Session.get( "correctQuestions")+1);
		}
		else
		{
            template.isCorrectAnswer.set(false);
			//alert("Quatsch!");
		}
        
        
        if (this.currQuestion < this.maxQuestion)
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
});
