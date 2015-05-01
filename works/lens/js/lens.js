function lens_init(img, e){
	var lens_container = '<div class="lens"></div>';
	
	if(!$('.lens').length){
		$(lens_container).insertAfter($(img));
	} 
	
	var bg = $(img).attr('src'),
	curr_width = $(img).width();
	img_pos = $(img).position(),
	bg_pos = {X:0,Y:0};
	var lens = $(img).next().hasClass('lens')?$(img).next():null;
	var source_image = new Image();
	source_image.src = bg;
	var source_width = source_image.width;
	var ratio = source_width/curr_width;
	if(ratio>1){
		bg_pos.X = (e.pageX - img_pos.left)*ratio;
		bg_pos.Y = (e.pageY - img_pos.top)*ratio;
		
		bg_pos.X -= $(lens).width()*0.5;
		bg_pos.Y -= $(lens).height()*0.5;
		bg_pos.X= Math.round(-bg_pos.X);
		bg_pos.Y= Math.round(-bg_pos.Y);
		$(lens).css({
			'display':'block',
			'top':e.pageY,
			'left':e.pageX,
			'background':'#fff url('+bg+')'+' '+bg_pos.X +'px'+' '+bg_pos.Y+'px no-repeat'
		});
	}
}

function lens_remove() {
	if($('.lens').length) {
		$('.lens').remove();
	}   
}

$(document).ready(function() {
	var target = $('img.has-lens');
	if($(target).length){
		$(target).click(function(e){
			if($('.lens').length){
				lens_remove();
			} else {
				lens_init(this, e);
			}   
		});
		
		$(target).mousemove(function(e){
			if($('.lens').length){
				lens_init(this, e);
			}
		});
		
		$(target).mouseleave(function(){
			lens_remove();
		});
	}
	
	var imgs = ['1', '2', 'hero'];
	var current = 0;
	
	$('.change').click(function() {
		
		
		$('.has-lens').attr('src', 'i/'+imgs[++current % imgs.length]+'.jpg');
	});
});