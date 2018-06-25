$(document).ready(function() {

// =========== GLOBAL VARIABLES ===========
var topics = ["cat", "pugs", "puppies", "birds"];

// =========== FUNCTIONS ===========

// Display the list of topics as buttons
function displayButtons() {

	$("#buttons-section").empty();

	topics.forEach(function(topic) {
		var topicButton = $("<button>").attr("value", topic);
		topicButton.addClass("btn btn-info btn-lg");
		topicButton.text(topic);

		$("#buttons-section").append(topicButton);
	});
}

// Add a topic to the topics list
function addTopic() {
	event.preventDefault();

	// Stores the user's entry by lowercasing the entry and replacing " " with "+"
	var userEntry = $("#new-topic").val().trim();
	var newTopic = userEntry.toLowerCase().replace(/ /g, "+");

	$("#new-topic").val("");

	// Add topic to the topics array 
	topics.push(newTopic);

	// Display the new list of topics
	displayButtons();

}

function runQuery() {
	var topicChosen = $(this).val();
	console.log(topicChosen);

	var queryURL = "https://api.giphy.com/v1/gifs/search?";
	// jQuery's $.param() allows parameters to be parsed to the queryURL
	// in other words, it will add &api_key=dc6zaTOxFJmzC, etc to the queryURL
	queryURL += $.param({
		"api_key": "dc6zaTOxFJmzC",
		"q": topicChosen,
		"limit": 5
	});

	$.ajax({url: queryURL, method: "GET"}).done(function(response) {
		console.log(response);
	});

}

// =========== MAIN PROCESSES ===========

// When page loads, display topics buttons
displayButtons();

// When the form is filled out, add new topic to the topics list
$("#add-topic-btn").click(addTopic);

$("#buttons-section").on("click", ".btn", runQuery);

});