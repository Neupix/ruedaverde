window.addEventListener('load', function () {FastClick.attach(document.body);}, false);

/* caching vars */
var $body = $('#body');

$body.append('<div id="fade"></div>');
var $fade = $('#fade');
$fade.on('click', closeSide);

/*
 * UI FUNCTIONS
 */

/* primitive functions */

function load(section,article) {
	window.scrollTo(0,0); // going to top

	if(section && section != currentSection) {
		if(section[0] != '#') section = '#' + section;
		$(currentSection).addClass('fade');
		currentSection = section;
		currentArticle = '#' + $(currentSection + ' article').first().attr('id');
		if(!article) article = currentArticle; // if there is no specific article set, then go with the 1st
		$(currentSection).addClass('active');
	}

	if(article) {
		if(article[0] != '#') article = '#' + article;
		$(currentSection + ' .active').removeClass('active');
		currentArticle = article;
		$(article).addClass('active');

		if( $(currentArticle).attr('data-title') ) {
			$(currentSection + ' .title').html( $(currentArticle).attr('data-title') );
		}
	}

	history.push( [currentSection, currentArticle] );

	var moving = setTimeout(function() {
		$('.fade').removeClass('active fade');
	},300);
	
	closeSide();
}

function closeSide() {
	$body.removeClass('showSide');
}

function back() {
	if(history.length == 1) exit()
	history.pop();
	load(history[history.length-1][0], history[history.length-1][1]);
	history.pop();
}

function exit() {
	navigator.app.exitApp();
}

/* ui functions */
$('*[open-nav]').on('click', function() {
	event.preventDefault();
	$body.addClass('showSide');
});

$('*[data-section]').on('click', function() {
	event.preventDefault();
	load($(this).attr('data-section'),0);
	closeSide();
})

$('*[data-article]').on('click', function() {
	event.preventDefault();
	load(0,$(this).attr('data-article'));
	closeSide();
})

$('*[back]').on('click', function() {
	event.preventDefault();
	back();
});

/* starting */
var currentSection = '#' + $('section').first().attr('id');
var currentArticle = '#' + $(currentSection + ' article').first().attr('id');

$(currentSection).addClass('active');
$(currentArticle).addClass('active');

var history = [];
history.push( [currentSection, currentArticle] );

document.addEventListener("backbutton", back, false);