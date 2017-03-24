$(document).mouseup(function (e) {
    var container = $('.nav');

    if (!container.is(e.target)
        && container.has(e.target).length === 0) {

        $('.contacts-open').removeClass('active');
    }
});

$('.cats li').click(function() {
$('.cats li').removeClass('active');
    $(this).addClass('active');
});

$('.about-open').click(function() {
    $('.about, body').addClass('opened');
});

$('.about-close').click(function() {
    $('.about, body').removeClass('opened');
});

$('.contacts-open').click(function() {
    $(this).addClass('active');
});

$(document).ready(function(){
    $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.8s'
    });
});

$('.cats span').click(function(){
    var filterValue = $(this).attr('data-filter');

    $('.grid').isotope({
        filter: filterValue
    });
});

$('.animated').waypoint({
    handler: function(direction) {
    $(this.element).addClass('in');
    },
    offset: '95%',
    triggerOnce: true
});

(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter30883171 = new Ya.Metrika({id:30883171,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");