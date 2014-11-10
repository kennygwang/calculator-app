var inputEl = document.getElementById("input");

var attachNumBtnEvents = function() {
	var numBtns = document.getElementsByClassName("num");
	for (var i=0; i<numBtns.length; i++) {
		numBtns[i].addEventListener("click", function(e) {
			var node = document.createTextNode(e.target.innerHTML);
			inputEl.appendChild(node);
		});
	}
}

attachNumBtnEvents();
