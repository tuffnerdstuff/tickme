import { Template } from 'meteor/templating';
import './question.html';



Template.question.events({
	'click .answer'(event) {
		
		if (this.correct)
		{
			alert("Stimmt!");
		}
		else
		{

			alert("Quatsch!");
		}
	}
});