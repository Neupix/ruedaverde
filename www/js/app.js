/* caching vars */
var $body = $('body');

$body.append('<div id="fade"></div>');
var $fade = $('#fade');
$fade.on('click', closeSide);

/*
 * UI FUNCTIONS
 */

/* primitive functions */

function load(section,article) {
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

	var moving = setTimeout(function() {
		$('.fade').removeClass('active fade');
	},300);
}

function closeSide() {
	$body.removeClass('showSide');
}

/* ui functions */
$('a[open-nav]').on('click', function() {
	event.preventDefault();
	$body.addClass('showSide');
});

$('a[data-section]').on('click', function() {
	event.preventDefault();
	load($(this).attr('data-section'),0);
	closeSide();
})

$('a[data-article]').on('click', function() {
	event.preventDefault();
	load(0,$(this).attr('data-article'));
	closeSide();
})

/* starting */
var currentSection = '#' + $('section').first().attr('id');
var currentArticle = '#' + $(currentSection + ' article').first().attr('id');

$(currentSection).addClass('active');
$(currentArticle).addClass('active');

var history = [];