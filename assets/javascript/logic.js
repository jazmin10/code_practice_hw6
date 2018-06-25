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

// Runs AJAX GET request of topic chosen
function runQuery() {
	var topicChosen = $(this).val();

	var queryURL = "https://api.giphy.com/v1/gifs/search?";

	// jQuery's $.param() allows parameters to be parsed to the queryURL
	// in other words, it will add &api_key=dc6zaTOxFJmzC, etc to the queryURL
	queryURL += $.param({
		"api_key": "dc6zaTOxFJmzC",
		"q": topicChosen,
		"limit": 5
	});

	// Make ajax request and display gifs once a response is returned
	$.ajax({url: queryURL, method: "GET"}).done(function(response) {
		displayGifs(response);
	});

}

// Display the gifs
function displayGifs(topicResults) {
	// Empty the gifs result section
	$("#gifs-section").empty();

	// Loop through the gifResults in order to display each gif and its rating
	topicResults.data.forEach(function(gif) {
		var rating = $("<p>").text("Rating: " + gif.rating);

		var image = $("<img>").attr("src", gif.images.fixed_height_still.url);
		image.addClass("gif-image");
		image.attr("data-still", gif.images.fixed_height_still.url);
		image.attr("data-animate", gif.images.fixed_height.url);
		image.attr("data-state", "still");
		
		$("#gifs-section").append($("<div>").append(rating).append(image));
	});
}

// Animates or freezes the gifs
function animate() {
	// Store the current state
	var currentState = $(this).attr("data-state");
	var newSRC = "";
	var newState = "";

	switch (currentState) {
		// If the image is still, store the animate url
		case "still":
			newSRC = $(this).attr("data-animate");
			newState = "animated";
			break;
		case "animated":
			// If the image is animated, store the still url
			newSRC = $(this).attr("data-still");
			newState = "still";
			break;
	}

	// Set the new value to the src attribute
	$(this).attr("src", newSRC);
	// Set the new state of the image
	$(this).attr("data-state", newState);
}

// =========== MAIN PROCESSES ===========

// When page loads, display topics buttons
displayButtons();

// When the form is filled out, add new topic to the topics list
$("#add-topic-btn").click(addTopic);

// When a topic button is clicked, grab gifs
$("#buttons-section").on("click", ".btn", runQuery);

// When a image is clicked, animate or freeze the image
$("#gifs-section").on("click", ".gif-image", animate);

});