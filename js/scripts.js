$(document).mouseup(function(t){var a=$(".nav");a.is(t.target)||0!==a.has(t.target).length||$(".contacts-open").removeClass("active")}),$(".cats li").click(function(){$(".cats li").removeClass("active"),$(this).addClass("active")}),$(".about-open").click(function(){$(".about, body").addClass("opened")}),$(".about-close").click(function(){$(".about, body").removeClass("opened")}),$(".contacts-open").click(function(){$(this).addClass("active")}),$(document).ready(function(){$(".grid").isotope({itemSelector:".grid-item",layoutMode:"fitRows",transitionDuration:"0.8s"})}),$(".cats span").click(function(){var t=$(this).attr("data-filter");$(".grid").isotope({filter:t})}),$(".animated").waypoint({handler:function(t){$(this.element).addClass("in")},offset:"95%",triggerOnce:!0});