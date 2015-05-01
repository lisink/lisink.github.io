$(document).ready(function (){
	
	$('.slider-box').slick({
		prevArrow: '.prev',
		nextArrow: '.next',
		infinite: false,
	});
	
	$('.tabs-head li').first().addClass('active');
	$('.tabs-content .tab').first().addClass('active');
	
	$('.tabs-head span').click(function() {
      $('.tabs-head li').removeClass('active');
      $(this).parent().addClass('active');
      $('.tabs-content .tab').removeClass('active');
      $($(this).attr('href')).addClass('active');
    });
	
	$('.thumb').click(function(){
		console.log(this.attributes.href)
		$('.thumb').removeClass('active');
		$(this).addClass('active');
		$('.preview-pic .preview').attr('src', 'i/'+$(this).attr('href'));
	});
	
	$('.links-toggle').click(function () {
		$(this).parent().toggleClass('active');
	})
	
	$('.star').click(function() {
		$(this).addClass('active').prevAll().addClass('active');
		$(this).nextAll().removeClass('active');
	});
	
	$('.star:not(.hover)').mouseenter(function() {
		$(this).addClass('hover').prevAll(':not(.active,.hover)').addClass('hover');
		$(this).nextAll().removeClass('hover');
	});
	
	$('.stars').mouseleave(function() {
		$('.stars .hover').removeClass('hover');
	});
})

