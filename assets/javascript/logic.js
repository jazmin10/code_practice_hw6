$(document).ready(function() {

// =========== GLOBAL VARIABLES ===========
var topics = ["cat", "pugs", "puppies", "birds"];

// =========== FUNCTIONS ===========
function displayButtons() {
	
	topics.forEach(function(topic) {
		var topicButton = $("<button>").attr("value", topic);
		topicButton.addClass("btn btn-info btn-lg");
		topicButton.text(topic);

		$("#buttons-section").append(topicButton);
	});
}

// =========== MAIN PROCESSES ===========
displayButtons();


});