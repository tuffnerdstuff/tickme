import { Template } from 'meteor/templating';
import './question.html';

Template.question.helpers({
    
});

Template.question.events({
	'click .answer'(event) {
		
		if (this.answer.correct == "true")
		{
			//alert("Stimmt!");
            Session.set( "correctQuestions", Session.get( "correctQuestions")+1);
		}
		else
		{

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
