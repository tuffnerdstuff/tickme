import { Template } from 'meteor/templating';
import './main.html';


Template.questions.helpers({
	questions: [
	{
		description: "Was ist die richtige Antwort?",
		img: "img.jpg",
		answers : [
			{answer: "B", correct: false},
			{answer: "A", correct: false},
			{answer: "C", correct: false},
			{answer: "Wos zum noschn!", correct: true},
		],
	},
	{
		description: "Was ist die lieblingsfarbe vom Hund?",
		img: "img.jpg",
		answers : [
			{answer: "Rot", correct: false},
			{answer: "Grün", correct: false},
			{answer: "Blau", correct: false},
			{answer: "Wurst", correct: true},
		],
	},
	]
});