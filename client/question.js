import { Template } from 'meteor/templating';

import './question.html';

Template.question.helpers({
	question: {
		description: "Was ist die richtige Antwort?",
		img: "img.jpg",
		answers : [
			{answer: "B", correct: false},
			{answer: "A", correct: false},
			{answer: "C", correct: false},
			{answer: "Wos zum noschn!", correct: true},
		],
	}
});

Template.question.events({
	'click .answer'(event) {
		
		if (this.correct)
		{
			alert("Stimmt!");
		}
		else
		{
			event.preventDefault();
			alert("Quatsch!");
		}
	}
});