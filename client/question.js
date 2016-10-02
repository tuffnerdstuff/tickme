import { Template } from 'meteor/templating';
import './question.html';


Template.question.events({
	'click .answer'(event, template) {
		
		if (this.answer.correct == "true")
		{
			//alert("Stimmt!");
            Session.set( "currQuestionCorrect", true);
            //Session.set( "correctQuestions", Session.get( "correctQuestions")+1);
		}
		else
		{
            Session.set( "currQuestionCorrect", false);
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
