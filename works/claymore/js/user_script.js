$(document).ready(function(){
	
	//подрубаем и настраиваем слайдер
	$('.slider-box').slick({
		prevArrow: '.prev',
		nextArrow: '.next',
		infinite: false,
	});
	
	
	//меняем фон страницы каждые 10 секунд
	$(function () {
		var el = $('.head');
		var backgrounds = [
		  'url(./i/f1.jpg)', 
		  'url(./i/f2.jpg)'];
		var current = 0;

		function nextBackground() {
			el.css(
				'background-image',
			backgrounds[current = ++current % backgrounds.length]);

			setTimeout(nextBackground, 10000);
		}
		setTimeout(nextBackground, 10000);
		el.css('background-image', backgrounds[0]);
	});
	
	//по клику на большой пин и адрес показываем карту с анимацией
	$('.map-pin, .addr').click(function(){
		$('.map-wrapper').addClass('visible');
	});
	
	//по клику крестика скрываем карту
	$('.map-close').click(function(){
		$('.map-wrapper').removeClass('visible');
	});
	
	
	//Инициализируем карту
	ymaps.ready(init);

    var ulsk;
		
	function init(){  
		
		//Создаем метку
		ulsk = new ymaps.Map ("ya-map", {
			center: [54.304113, 48.367618],
			zoom: 16,
			controls: []
		});
		
		ulsu = new ymaps.Placemark([54.304113, 48.367618],{},{
			iconLayout: 'default#image',
			iconImageClipRect: [[0,0], [189, 142]],
			iconImageHref: './i/big-pin.png',
			iconImageSize: [189, 142],
			iconImageOffset: [-85, -138]
		});
		
		//Отрубаем зум и драг
		ulsk.behaviors.disable('scrollZoom');
		ulsk.behaviors.disable('drag');
		//Добавляем метку на карту
		ulsk.geoObjects.add(ulsu);
	}
	
	//Анимируем полявление блоков при скролле
	$('.animated').waypoint({
      handler: function(direction) {
		//вешаем класс тогглер анимаций блоку, когда доскролили до него
        $(this.element).addClass('in');
      },
        offset: '95%',
        triggerOnce: true
      })
	
	//делаем верхнее меню прилипающим при скролле
	var menu = $('.header-wrapper');
	if(menu.length) {
		var top = $(menu).offset().top - parseFloat($(menu).css('marginTop'));
	}
	$(window).scroll(function (event) {
		var scrollPos = $(this).scrollTop();
		if(menu.length) {
			if (scrollPos >= top && !$('.fixed').length) {
				$(menu).addClass('fixed');
				$('header').css({'transition-delay':'0s','transition-duration':'.3s'});
			} else if(scrollPos <= top && $('.fixed').length){		
				$(menu).removeClass('fixed');
			}
		}   
		
		
	});
	
	//при клике пункта меню плавно скролим окно до желаемого блока
	$('.nav a').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
		$('.nav a').parents('li').removeClass('active');
        $(this).parents('li').addClass('active');
      
		href = this.hash;
        target = $(href);
		if(target.length) {
			$('html, body').stop().animate({
            'scrollTop': target.offset().top
			}, 500, 'swing', function () {
				$(document).on("scroll", onScroll);
			});
		}   
    });
	
	//когда доскролили до следующего блока, делаем активным соответствующий ему пункт меню
	$(document).on("scroll", onScroll);
	function onScroll() {
		$('.nav a').each(function(){
			var scrollPos = $(document).scrollTop();
			target = $($(this).attr('href'));
			scrollPos+=$('.header-wrapper').height();
			if(target.length) {
				if((target.offset().top <= scrollPos) && (target.offset().top+target.height()  > scrollPos)) {
					$('.nav a').parents('li').removeClass('active');
					$(this).parents('li').addClass('active');
				} 
			}   
			  
		});
	} 
	
	//после начального появления блоков на странице сбрасываем значения задержки транзишена, и устанавливаем им требуемую длительность (нужно для 
	$(".advantage").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		$(this).css({'transition-delay':'0s','transition-duration':'.3s'});
	});	
	
	$('.mobile-nav').click(function(){
		$(this).toggleClass('opened');
		if($('.nav').is(':visible')) {
			$('.nav').slideUp(300);
		}  else {
			$('.nav').slideDown(300);
		}    
	});
});


