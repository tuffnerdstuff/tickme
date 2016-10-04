import { Template } from 'meteor/templating';
import './question.html';

Template.question.onRendered(function() {
    $('#progress').progress({showActivity: false});
});

Template.question.events({
	'click .answer'(event, template) {
		
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
