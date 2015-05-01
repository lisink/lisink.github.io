//Эффект волн при клике
$('.ripple').mouseup(function(e) {
	var clicked_el = $(this);
	var parent_pos = clicked_el.offset();

	var cur_local_pos = {};
	cur_local_pos.X = e.pageX - parent_pos.left;
	cur_local_pos.Y = e.pageY - parent_pos.top;

	var size = (clicked_el.width() < clicked_el.height())?clicked_el.width():clicked_el.height(),
	factor = (clicked_el.width() < clicked_el.height())?clicked_el.height()/clicked_el.width():clicked_el.width()/clicked_el.height();

	var ripple_radius= size*factor;

	var ripple_el = '<div class=\"circle-ripple\" style=\"width:'+ripple_radius+'px;height:'+ripple_radius+'px;top:'+(cur_local_pos.Y - ripple_radius*0.5)+'px;left:'+(cur_local_pos.X - ripple_radius*0.5) +'px"></div>';

	clicked_el.append(ripple_el);
	
	setTimeout(function (){
        clicked_el.find('.circle-ripple').addClass('go');
	}, 1);
	setTimeout(function (){
        if($('.circle-ripple'))$('.circle-ripple').first().remove();
	}, 300);	
});

$('.video-toggle').click(function() {
	
	if($('.video-wrapper').is('.opened')) {
		$('.video-wrapper').removeClass('opened');
	}   
	else $('.video-wrapper').addClass('opened');
})


$('.register').click(function() {
	show_modal('.registration-modal');
});  


function validatePassword(){
  if(password.value != pass_confirm.value) {
	pass_confirm.setCustomValidity("Введенные пароли не совпадают");
  } else {
    pass_confirm.setCustomValidity('');
  }
}

password.onchange = validatePassword;
pass_confirm.onkeyup = validatePassword;

$('#registration-form').submit(function(event) {	
	hide_modal(event);
	show_modal('.success-modal');

	event.preventDefault();	
});

$('.modal-close, .ok').on('click', hide_modal);


//скрываем информационное сообщение по клику на странице вне области его самого
/* $(document).click(function(event) { 
	if(!$(event.target).closest('.announcement').length) {
		if(!$(event.target).is('.announcement')&&!$(event.target).is('ymaps'))
		{
			if($('.announcement').is(":visible")) {
				$('.announcement').fadeOut(300);
			}
		}
	}   
}) */


//скрываем видимую модальку по клику вне ее области
$(document).on('click','.modal-open .modal',function(e) {
	var cords = $('.modal-wrapper:visible').offset();
	var modal = $('.modal-wrapper:visible');
	if(!(e.pageX>=cords.left&&e.pageX<=(modal.width()+cords.left))||!(e.pageY>=cords.top&&e.pageY<=(modal.height()+cords.top))) {
		$('body').removeClass('modal-open');
		$('.overlay').remove();
		$('.modal').fadeOut(300);		
	}
});

function show_modal(target) {
	$('body').addClass('modal-open');
	$('body').append('<div class="overlay"></div>');
	$(target).fadeIn(500);
}

function hide_modal(event) {
	$('body').removeClass('modal-open');
	$('.overlay').remove();
	$(event.currentTarget).parents('.modal').fadeOut(300);
}


ymaps.ready(init);

    var pfo_map;
		
function init(){     
	pfo_map = new ymaps.Map ("ya-map", {
		center: [55.8, 48.22],
		zoom: 6,
		controls: []
	});
	
	ulsk = new ymaps.Placemark([54.319657, 48.406091],{},{
		iconLayout: 'default#image',
		iconImageClipRect: [[0,0], [55, 55]],
		iconImageHref: './i/marks.png',
        iconImageSize: [55, 55],
        iconImageOffset: [-28, -55]
	});
	
	saransk = new ymaps.Placemark([54.188734, 45.190285],{},{
		iconLayout: 'default#image',
		iconImageClipRect: [[110,0], [157, 55]],
		iconImageHref: './i/marks.png',
        iconImageSize: [47, 55],
        iconImageOffset: [-37, -38]
	});
	
	ryazan = new ymaps.Placemark([54.625077, 39.739363],{},{
		iconLayout: 'default#image',
		iconImageClipRect: [[157,0], [202, 55]],
		iconImageHref: './i/marks.png',
        iconImageSize: [45, 55],
        iconImageOffset: [-35, -48]
	});
	
	ufa = new ymaps.Placemark([54.729826, 55.960585],{},{
		iconLayout: 'default#image',
		iconImageClipRect: [[50,0], [106, 55]],
		iconImageHref: './i/marks.png',
        iconImageSize: [56, 55],
        iconImageOffset: [-35, -53]
	});
	
	//по клику на метку Ульяновска показываем информационное сообщение
	ulsk.events.add('click', function () {
		$('.announcement').fadeIn(400);
	});
	
	//по клику на мапе вне меток скрываем информационное сообщение
	pfo_map.events.add('click', function () {
		if($('.announcement').is(":visible")) {
			$('.announcement').fadeOut(300);
		}
	});

    pfo_map.geoObjects.add(ulsk);
    pfo_map.geoObjects.add(saransk);
    pfo_map.geoObjects.add(ryazan);
    pfo_map.geoObjects.add(ufa);
}
	