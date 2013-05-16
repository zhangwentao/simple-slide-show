function SimpleSlideShow(container,config) {
	var setup = {
		viewportWidth: 300,
		viewportHeight: 200,
		slideWidth: 300,
		slideHeight: 200,
		slideNum: 4,
		step: 1,
		time: 1000,
		viewportSlideRatio: 1
	}

	this.setup = $.extend(setup,config);

	if( !config['viewportWidth'] ) {
		this.setup.viewportWidth = this.setup.slideWidth * this.setup.viewportSlideRatio;
	}

	if( !config['viewportHeight'] ) {
		this.setup.viewportHeight = this.setup.slideHeight;
	}

	this.stepSize = this.setup.slideWidth;
	this.container = $(container);		
	this.container.html(this.HTML_TEMPLATES[0]);
	this.film = this.container.find('.film');
	this.max = this.setup.slideNum;
	this.cur = 0;

	initSlideShow(this,this.container);

	function initSlideShow(self,wrap) {
		var setup = self.setup;
		wrap.find('.viewport').css({
			position: 'relative',
			width: setup.viewportWidth,
			height: setup.viewportHeight 
		});

		wrap.find('.film').css({
			position: 'absolute',
			width: setup.viewportWidth * setup.slideNum,
			height: setup.viewportHeight,
			display: 'block'
		});

		var film = wrap.find('.film');
		var slide = $(self.HTML_TEMPLATES[1]);
		slide.css({
			float: 'left',
			width: setup.slideWidth,
			height: setup.slideHeight 
		});
		var slideNum = self.setup.slideNum;
		for(var i = 0; i < slideNum; i++) {
			film.append(slide.clone());	
		}
	}
}

SimpleSlideShow.prototype.HTML_TEMPLATES = [
	'<div class="viewport">'+
		'<ul class="film">'+
		'</ul>'+
	'</div>',
	'<li class="slide"></li>'
];

SimpleSlideShow.prototype.next = function() {
	if(!this.film.is(":animated") && this.cur < this.max - 1) {
		var leftSlideNum = this.max - this.cur - this.setup.viewportSlideRatio;
		var actualStep = leftSlideNum < this.setup.step ? leftSlideNum : this.setup.step;
		console.log(leftSlideNum);
		var curLeft = -(this.stepSize * (this.cur+=actualStep));
		this.film.animate({
			left: curLeft 
		},this.setup.time);
	}
};

SimpleSlideShow.prototype.pre = function() {
	if(!this.film.is(":animated") && this.cur > 0) {
		var leftSlideNum = this.cur;
		var actualStep = leftSlideNum < this.setup.step ? leftSlideNum : this.setup.step;
		var curLeft = -(this.stepSize * (this.cur-=actualStep));
		this.film.animate({
			left: curLeft 
		},this.setup.time);
	}
};

SimpleSlideShow.prototype.getSlides = function() {
	return this.container.find('.slide');
}

SimpleSlideShow.prototype.getNew = function() {
	var slide = $(this.HTML_TEMPLATES[1]);
	this.film.append(slide);
	this.setup.slideNum++;
	this.max = this.setup.slideNum;
	return slide;
}
