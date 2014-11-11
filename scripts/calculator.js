/**
 * Author: Kenneth G. Wang (kennygwang@gmail.com)
 * Project Calculator App
 */

var inputEl = document.getElementById("input"); // a reference to the "input" part of the display
var operatorEl = document.getElementById("operator"); // a reference to the "next operation" part of the display
var ansEl = document.getElementById("ans");
var canNeg = true; // a flag that means everything is in a clean state, like after hitting CLR
var ans = null; // store the previous answer
var operation = null; // store the next pending arithmetic operation
var isEvaluated = false; // a flag that means the equals button was pressed. This flag became necessary because the minus sign can be both a character and an operand

/**
 * This function attaches click handlers to the numeric and decimal point buttons.
 */
var attachCharBtnEvents = function() {
	var numBtns = document.getElementsByClassName("num");
	for (var i=0; i<numBtns.length; i++) {
		numBtns[i].addEventListener("click", function(e) {
			canNeg = false;
			if (isEvaluated) { // if the equals sign was just pressed, then the next character will start a new calculation
				inputEl.innerHTML = "";
				ans = null;
				isEvaluated = false;
			}
			var node = document.createTextNode(e.target.innerHTML);
			inputEl.appendChild(node);
		});
	}

	var decBtn = document.getElementById("btn-dec");
	decBtn.addEventListener("click", function(e) {
		if(inputEl.innerHTML.indexOf(".") === -1) {
			canNeg = false;
			var node = document.createTextNode(".");
			inputEl.appendChild(node);
		}
	});
}();

/**
 * Handle addition.
 */
var addBtn = document.getElementById("btn-add");
addBtn.addEventListener("click", function(e){
	if (operatorEl.innerHTML === "" && inputEl.innerHTML !== "") {
		if (ans === null) {
			ans = inputEl.innerHTML;
		}
		if (isEvaluated) {
			isEvaluated = false;
		}
		ansEl.innerHTML = ans;
		operatorEl.innerHTML = "+";
		inputEl.innerHTML = "";
		operation = "add";
		canNeg = true;
	}
});

/**
 * Handle subtraction, as well as the negative sign.
 */
var subBtn = document.getElementById("btn-sub");
subBtn.addEventListener("click", function(e) {
	if (canNeg) {
		canNeg = false;
		inputEl.innerHTML = "";
		var node = document.createTextNode("-");
		inputEl.appendChild(node); // handle the case of submitting only "-"
	} else if (operatorEl.innerHTML === "" && inputEl.innerHTML !== "") {
		if (ans === null) {
			ans = inputEl.innerHTML;
		}
		if (isEvaluated) {
			isEvaluated = false;
		}
		ansEl.innerHTML = ans;
		operatorEl.innerHTML = "-";
		inputEl.innerHTML = "";
		operation = "subtract";
	}
});

/**
 * Handle multiplication.
 */
var mulBtn = document.getElementById("btn-mul");
mulBtn.addEventListener("click", function(e){
	if (operatorEl.innerHTML === "" && inputEl.innerHTML !== "") {
		if (ans === null) {
			ans = inputEl.innerHTML;
		}
		if (isEvaluated) {
			isEvaluated = false;
		}
		ansEl.innerHTML = ans;
		operatorEl.innerHTML = "&#215";
		inputEl.innerHTML = "";
		operation = "multiply";
		canNeg = true;
	}
});

/**
 * Handle division.
 */
var divBtn = document.getElementById("btn-div");
divBtn.addEventListener("click", function(e){
	if (operatorEl.innerHTML === "" && inputEl.innerHTML !== "") {
		if (ans === null) {
			ans = inputEl.innerHTML;
		}
		if (isEvaluated) {
			isEvaluated = false;
		}
		ansEl.innerHTML = ans;
		operatorEl.innerHTML = "&#247;";
		inputEl.innerHTML = "";
		operation = "divide";
		canNeg = true;
	}
});

/**
 * Handle square root.
 */
var sqrtBtn = document.getElementById("btn-sqrt");
sqrtBtn.addEventListener("click", function(e) {
	if (inputEl.innerHTML !== "-" && inputEl.innerHTML !== "" && operatorEl.innerHTML === "") {
		operation = "sqrt";
		inputEl.innerHTML = Math.sqrt(parseFloat(inputEl.innerHTML));
		isEvaluated = true;
	}
});

/**
 * Handle clearing.
 */
var clrBtn = document.getElementById("btn-clr");
clrBtn.addEventListener("click", function(e) {
	inputEl.innerHTML = "";
	operatorEl.innerHTML = "";
	ansEl.innerHTML = "";
	canNeg = true;
	isEvaluated = false;
	ans = null;
	operation = null;
});

/**
 * A function that performs the pending operation.
 */
var eqBtn = document.getElementById("btn-eq");
eqBtn.addEventListener("click", function(e) {
	if (ansEl.innerHTML === "") {
		return; // this if statement is just so that equals doesn't do anything if you press it twice.
	}

	var a = ans;
	var b = inputEl.innerHTML;
	if (a === null) {
		ans = b;
		isEvaluated = true;
		return;
	}
	if (b === "-" || b === "") {
		return;
	}
	a = parseFloat(a);
	b = parseFloat(b);

	if (operation === "add") {
		ans = a + b;
	} else if (operation === "subtract") {
		ans = a - b;
	} else if (operation === "multiply") {
		ans = a * b;
	} else if (operation === "divide") {
		ans = a / b;
	}
	ansEl.innerHTML = "";
	operatorEl.innerHTML = "";
	inputEl.innerHTML = ans;
	isEvaluated = true;
});
