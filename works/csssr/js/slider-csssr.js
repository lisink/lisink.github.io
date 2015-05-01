$(document).ready(function(){
	var token_pressed = null,
		steps = [1,148,373,755];
	
	$('.token').mousedown(function(e){
		token_pressed = $(this);
		token_pressed.x = e.pageX;
		token_pressed.pos = $(this).offset().left;
	});
	
	$(document).mouseup(function(e){
		token_pressed = null;	
	});
	
	$(document).mousemove(function(e){
		if(token_pressed){
			var parent_x = $(token_pressed).parent().position().left,
			offset = token_pressed.x - token_pressed.pos,
			position = e.pageX - parent_x;
			var value = position - offset;	
			value = close(steps, value, 30);
			if(value)$(token_pressed).css('left',value);
		}
	});	
	
	$('.slider').click(function(e){
		var value = e.pageX-$(this).position().left;
		value = close(steps, value, 30);
		if(value)$('.token').css('left',value);
		
	});
	 
	$('.value').click(function(e){
		var value = steps[$(this).index()-1];
		if(value)$('.token').css('left',value);
	});
	
	function close(steps, value, dx) {
		var match = false;
		for (var i=0; i<steps.length; i++ ){
			if(Math.abs(value-steps[i])<dx){
				match = steps[i];
			} 
		}
		return match;
	} 
});