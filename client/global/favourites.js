Template.AuctionDetails.rendered = function() {
	var twitLike = document.getElementById("twitter-like");

	twitLike.addEventListener("click", function(e) {
		e.preventDefault;
		twitLike.classList.toggle("liked");
		twitLike.classList.toggle("twit-animated");
	}, false);
}
Template.DealDetails.rendered = function() {
	var twitLike = document.getElementById("twitter-like");

	twitLike.addEventListener("click", function(e) {
		e.preventDefault;
		twitLike.classList.toggle("liked");
		twitLike.classList.toggle("twit-animated");
	}, false);
	BackgroundCheck.refresh();
	BackgroundCheck.init({
	  	targets: '.title'
	});
}
Template.auctionListItem.rendered = function() {
	var twitLike = document.getElementById("twitter-like");

	twitLike.addEventListener("click", function(e) {
		e.preventDefault;
		twitLike.classList.toggle("liked");
		twitLike.classList.toggle("twit-animated");
	}, false);
}