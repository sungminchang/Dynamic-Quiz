var qSpace = document.getElementById("question");
var cSpace = document.getElementById("choices");
var button = document.getElementById("button");
var	i= 0, correct = 0;
var day = new Date();
day = day.getDay();
var allQuestions = makeQ([
	['To whom is the quote "Education mainly consists of what we have unlearned" attributed?',
	["Abraham Lincoln", "Mahatma Gandhi", "Mark Twain", "Helen Keller"],
	2],

	["What day of the week is it?",
	["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday"],
	day],

	["Which of these figures is the closest approximation of the speed of light?",
	["300,000,000 m/s", "30,000,000 m/s", "3,000,000,000 m/s", "3,0000,000 m/s"],
	0],

	])
;
function makeQ(arr) {//"question", ["choices"], numeric answer 
	var allQuestions = [];
	traverse(arr, function(q) {
		var result = {};
		traverse(q, function(qPart) {
			if (typeof qPart === "string") {
				result.question = qPart
;			} else if (Array.isArray(qPart)) {
				result.choices = qPart;
			} else {
				result.answer = qPart;
			}
		});
		allQuestions.push(result);
		result = {};
	});
	return allQuestions;
}

function traverse(obj, callback, separator) {
	if (callback === undefined) {return}
	if (separator === undefined) {separator = "";}
	if (typeof obj === "number" || typeof obj === "string") {
		traverse(obj.toString().split(separator), callback);
	}
	if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
           callback(obj[i], i, obj);
		}
	} else if (typeof obj === "object") {
		for (var prop in obj) {
			callback(obj[prop], prop);
		}
	}
}

function nextQuestion() {
	//the part of the code that checks for radio.type and radio.check
	//is a modified form of code from stackoverflow.com/a/1423868/4073557
	var radios = document.getElementsByTagName('input');
	var checked = false;
	var userAnswer = null;

	traverse(radios, function(radio) {
		if (radio.type === 'radio' && radio.checked) {
			checked = true;
			userAnswer = radio;
			return;
		}
	});
	if (!checked) {
		alert("Choose an answer to see the next question.");
	} else {
		checkAnswer(userAnswer);
		formPopulator(userAnswer);
	}
}

function checkAnswer(userAnswer) {
	var answer = allQuestions[i].answer;	
	if (userAnswer.id == answer || answer === undefined) {
		i++;
		correct++;
	} else {
		i++;
	}
}

function formPopulator(userAnswer) {
	if (i === allQuestions.length) {
		clear();
		qSpace.innerHTML = "You got " + correct + " out of " + i + " questions correct!";
		button.parentNode.removeChild(button); 
	} else {
		clear();
		populate();
	}
}

function clear() {
		qSpace.innerHTML = null;
		cSpace.innerHTML = null;
	}

function populate() {
	var question = allQuestions[i];
	var questionText = allQuestions[i].question;
	var choices = question.choices;

	qSpace.innerHTML = questionText;

	traverse(choices, function (choice,i) {
		var radio = document.createElement("input");
			radio.type = "radio";
			radio.name = "choice";
			radio.id = i;
			radio.value = choice;
			cSpace.appendChild(radio);
		var label = document.createElement("label");
			label.innerHTML = choice;
			cSpace.appendChild(label);
		var br = document.createElement("br");
			cSpace.appendChild(br);
	});
}

formPopulator();
