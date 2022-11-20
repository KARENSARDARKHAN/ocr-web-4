Utilities
JavaScript Minifier
Online JavaScript Minifier Tool and Compressor, with Fast and Simple API Access
Input JavaScript
// Blocs.js Minified
function setUpSpecialNavs() {
    $(".navbar-toggle").click(function(t) {
        var e = $(this).closest("nav"),
            i = e.find("ul.site-navigation"),
            a = i.clone();
        if (i.parent().hasClass("nav-special"))
            if (t.stopPropagation(), $(this).hasClass("selected-nav")) $(".blocsapp-special-menu blocsnav").removeClass("open"), $(".selected-nav").removeClass("selected-nav"), setTimeout(function() {
                $(".blocsapp-special-menu").remove(), $("body").removeClass("lock-scroll"), $(".selected-nav").removeClass("selected-nav")
            }, 300);
            else {
                $(this).addClass("selected-nav");
                var o = e.attr("class").replace("navbar", "").replace("row", ""),
                    l = i.parent().attr("class").replace("navbar-collapse", "").replace("collapse", "");
                ($(".content-tint").length = -1) && $("body").append('<div class="content-tint"></div>'), a.insertBefore(".page-container").wrap('<div class="blocsapp-special-menu ' + o + '"><blocsnav class="' + l + '">'), $("blocsnav").prepend('<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>'),
                    function() {
                        var t = "fadeInRight",
                            e = 0,
                            i = 60;
                        $(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav") ? (t = "fadeIn", i = 100) : $(".blocsapp-special-menu").hasClass("nav-invert") && (t = "fadeInLeft");
                        $(".blocsapp-special-menu blocsnav li").each(function() {
                            $(this).parent().hasClass("dropdown-menu") ? $(this).addClass("animated fadeIn") : (e += i, $(this).attr("style", "animation-delay:" + e + "ms").addClass("animated " + t))
                        })
                    }(), setTimeout(function() {
                        $(".blocsapp-special-menu blocsnav").addClass("open"), $(".content-tint").addClass("on"), $("body").addClass("lock-scroll")
                    }, 10)
            }
    }), $("body").on("mousedown touchstart", ".content-tint, .close-special-menu", function(t) {
        $(".content-tint").removeClass("on"), $(".selected-nav").click(), setTimeout(function() {
            $(".content-tint").remove()
        }, 10)
    }).on("click", ".blocsapp-special-menu a", function(t) {
        $(t.target).closest(".dropdown-toggle").length || $(".close-special-menu").mousedown()
    })
}

function extraNavFuncs() {
    $(".site-navigation a").click(function(t) {
        $(t.target).closest(".dropdown-toggle").length || $(".navbar-collapse").collapse("hide")
    }), $("a.dropdown-toggle").click(function(t) {
        $(this).parent().addClass("target-open-menu"), $(this).closest(".dropdown-menu").find(".dropdown.open").each(function(t) {
            $(this).hasClass("target-open-menu") || $(this).removeClass("open")
        }), $(".target-open-menu").removeClass("target-open-menu")
    })
}

function setFillScreenBlocHeight() {
    $(".bloc-fill-screen").each(function(t) {
        var e = $(this);
        window.fillBodyHeight = 0, $(this).find(".container").each(function(t) {
            fillPadding = 2 * parseInt($(this).css("padding-top")), e.hasClass("bloc-group") ? fillBodyHeight = fillPadding + $(this).outerHeight() + 50 : fillBodyHeight = fillBodyHeight + fillPadding + $(this).outerHeight() + 50
        }), $(this).css("height", getFillHeight() + "px")
    })
}

function getFillHeight() {
    var t = $(window).height();
    return t < fillBodyHeight && (t = fillBodyHeight + 100), t
}

function scrollToTarget(t) {
    1 == t ? t = 0 : 2 == t ? t = $(document).height() : (t = $(t).offset().top, $(".sticky-nav").length && (t -= $(".sticky-nav .navbar-header").height())), $("html,body").animate({
        scrollTop: t
    }, "slow"), $(".navbar-collapse").collapse("hide")
}

function animateWhenVisible() {
    hideAll(), inViewCheck(), $(window).scroll(function() {
        inViewCheck(), scrollToTopView(), stickyNavToggle()
    })
}

function setUpDropdownSubs() {
    $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function(t) {
        t.preventDefault(), t.stopPropagation(), $(this).parent().siblings().removeClass("open"), $(this).parent().toggleClass("open");
        var e = $(this).parent().children(".dropdown-menu");
        e.offset().left + e.width() > $(window).width() && e.addClass("dropmenu-flow-right")
    })
}

function stickyNavToggle() {
    var t = 0,
        e = "sticky";
    if ($(".sticky-nav").hasClass("fill-bloc-top-edge")) {
        var i = $(".fill-bloc-top-edge.sticky-nav").parent().css("background-color");
        "rgba(0, 0, 0, 0)" == i && (i = "#FFFFFF"), $(".sticky-nav").css("background", i), t = $(".sticky-nav").height(), e = "sticky animated fadeInDown"
    }
    $(window).scrollTop() > t ? ($(".sticky-nav").addClass(e), "sticky" == e && $(".page-container").css("padding-top", $(".sticky-nav").height())) : ($(".sticky-nav").removeClass(e).removeAttr("style"), $(".page-container").removeAttr("style"))
}

function hideAll() {
    $(".animated").each(function(t) {
        $(this).closest(".hero").length || $(this).removeClass("animated").addClass("hideMe")
    })
}

function inViewCheck() {
    $($(".hideMe").get().reverse()).each(function(t) {
        var e = jQuery(this),
            i = e.offset().top + e.height(),
            a = $(window).scrollTop() + $(window).height();
        if (e.height() > $(window).height() && (i = e.offset().top), i < a) {
            var o = e.attr("class").replace("hideMe", "animated");
            e.css("visibility", "hidden").removeAttr("class"), setTimeout(function() {
                e.attr("class", o).css("visibility", "visible")
            }, .01)
        }
    })
}

function scrollToTopView() {
    $(window).scrollTop() > $(window).height() / 3 ? $(".scrollToTop").hasClass("showScrollTop") || $(".scrollToTop").addClass("showScrollTop") : $(".scrollToTop").removeClass("showScrollTop")
}

function setUpVisibilityToggle() {
    $(document).on("click", "[data-toggle-visibility]", function(t) {
        t.preventDefault();
        var e = $(this).attr("data-toggle-visibility");
        if (-1 != e.indexOf(",")) {
            var i = e.split(",");
            $.each(i, function(t) {
                a($("#" + i[t]))
            })
        } else a($("#" + e));

        function a(t) {
            t.is("img") ? t.toggle() : t.slideToggle()
        }
    })
}

function setUpLightBox() {
    window.targetLightbox, $(document).on("click", "[data-lightbox]", function(t) {
        t.preventDefault(), targetLightbox = $(this);
        var e = targetLightbox.attr("data-lightbox"),
            i = targetLightbox.attr("data-autoplay"),
            a = '<p class="lightbox-caption">' + targetLightbox.attr("data-caption") + "</p>",
            o = "no-gallery-set",
            l = targetLightbox.attr("data-frame");
        targetLightbox.attr("data-gallery-id") && (o = targetLightbox.attr("data-gallery-id")), targetLightbox.attr("data-caption") || (a = "");
        var n = "";
        1 == i && (n = "autoplay");
        var s = $('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content ' + l + ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-responsive" src="' + e + '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' + n + ' class="embed-responsive-item"><source id="lightbox-video" src="' + e + '" type="video/mp4"></video></div>' + a + "</div></div></div></div>");
        $("body").append(s), "fullscreen-lb" == l && ($("#lightbox-modal").addClass("fullscreen-modal").append('<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'), $("#blocs-lightbox-close-btn").remove()), ".mp4" == e.substring(e.length - 4) ? ($("#lightbox-image, .lightbox-caption").hide(), $("#lightbox-video-container").show()) : ($("#lightbox-image,.lightbox-caption").show(), $("#lightbox-video-container").hide()), $("#lightbox-modal").modal("show"), "no-gallery-set" == o ? (0 == $("a[data-lightbox]").index(targetLightbox) && $(".prev-lightbox").hide(), $("a[data-lightbox]").index(targetLightbox) == $("a[data-lightbox]").length - 1 && $(".next-lightbox").hide()) : (0 == $('a[data-gallery-id="' + o + '"]').index(targetLightbox) && $(".prev-lightbox").hide(), $('a[data-gallery-id="' + o + '"]').index(targetLightbox) == $('a[data-gallery-id="' + o + '"]').length - 1 && $(".next-lightbox").hide()), addLightBoxSwipeSupport()
    }).on("hidden.bs.modal", "#lightbox-modal", function() {
        $("#lightbox-modal").remove()
    }), $(document).on("click", ".next-lightbox, .prev-lightbox", function(t) {
        t.preventDefault();
        var e = "no-gallery-set",
            i = $("a[data-lightbox]").index(targetLightbox),
            a = $("a[data-lightbox]").eq(i + 1);
        targetLightbox.attr("data-gallery-id") && (e = targetLightbox.attr("data-gallery-id"), i = $('a[data-gallery-id="' + e + '"]').index(targetLightbox), a = $('a[data-gallery-id="' + e + '"]').eq(i + 1)), $(this).hasClass("prev-lightbox") && (a = $('a[data-gallery-id="' + e + '"]').eq(i - 1), "no-gallery-set" == e && (a = $("a[data-lightbox]").eq(i - 1)));
        var o = a.attr("data-lightbox");
        if (".mp4" == o.substring(o.length - 4)) {
            var l = "";
            1 == a.attr("data-autoplay") && (l = "autoplay"), $("#lightbox-image, .lightbox-caption").hide(), $("#lightbox-video-container").show().html("<video controls " + l + ' class="embed-responsive-item"><source id="lightbox-video" src="' + o + '" type="video/mp4"></video>')
        } else $("#lightbox-image").attr("src", o).show(), $(".lightbox-caption").html(a.attr("data-caption")).show(), $("#lightbox-video-container").hide();
        targetLightbox = a, $(".next-lightbox, .prev-lightbox").hide(), "no-gallery-set" == e ? ($("a[data-lightbox]").index(a) != $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(), $("a[data-lightbox]").index(a) > 0 && $(".prev-lightbox").show()) : ($('a[data-gallery-id="' + e + '"]').index(a) != $('a[data-gallery-id="' + e + '"]').length - 1 && $(".next-lightbox").show(), $('a[data-gallery-id="' + e + '"]').index(a) > 0 && $(".prev-lightbox").show())
    })
}

function addSwipeSupport() {
    $(".carousel-inner").length && $(".carousel-inner").swipe({
        swipeLeft: function(t, e, i, a, o) {
            $(this).parent().carousel("next")
        },
        swipeRight: function() {
            $(this).parent().carousel("prev")
        },
        threshold: 0
    })
}

function addKeyBoardSupport() {
    $(window).keydown(function(t) {
        37 == t.which ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click() : 39 == t.which && $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
    })
}

function addLightBoxSwipeSupport() {
    $("#lightbox-image").length && $("#lightbox-image").swipe({
        swipeLeft: function(t, e, i, a, o) {
            $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
        },
        swipeRight: function() {
            $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
        },
        threshold: 0
    })
}
$(document).ready(function() {
    $("#scroll-hero").click(function(t) {
        t.preventDefault(), $("html,body").animate({
            scrollTop: $("#scroll-hero").closest(".bloc").height()
        }, "slow")
    }), extraNavFuncs(), setUpSpecialNavs(), setUpDropdownSubs(), setUpLightBox(), setUpVisibilityToggle(), addSwipeSupport(), addKeyBoardSupport(), -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && $("#page-loading-blocs-notifaction").remove()
}), $(window).load(function() {
    setFillScreenBlocHeight(), animateWhenVisible(), $("#page-loading-blocs-notifaction").remove()
}).resize(function() {
    setFillScreenBlocHeight()
}), $(function() {
    $('[data-toggle="tooltip"]').tooltip()
});
Minified JavaScript Output
function setUpSpecialNavs(){$(".navbar-toggle").click(function(e){var t=$(this).closest("nav"),a=t.find("ul.site-navigation"),i=a.clone();if(a.parent().hasClass("nav-special")){if(e.stopPropagation(),$(this).hasClass("selected-nav"))$(".blocsapp-special-menu blocsnav").removeClass("open"),$(".selected-nav").removeClass("selected-nav"),setTimeout(function(){$(".blocsapp-special-menu").remove(),$("body").removeClass("lock-scroll"),$(".selected-nav").removeClass("selected-nav")},300);else{$(this).addClass("selected-nav");var o,l,s,n=t.attr("class").replace("navbar","").replace("row",""),c=a.parent().attr("class").replace("navbar-collapse","").replace("collapse","");$(".content-tint").length=-1,$("body").append('<div class="content-tint"></div>'),i.insertBefore(".page-container").wrap('<div class="blocsapp-special-menu '+n+'"><blocsnav class="'+c+'">'),$("blocsnav").prepend('<a class="close-special-menu animated fadeIn" style="animation-delay:0.5s;"><div class="close-icon"></div></a>'),o="fadeInRight",l=0,s=60,$(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav")?(o="fadeIn",s=100):$(".blocsapp-special-menu").hasClass("nav-invert")&&(o="fadeInLeft"),$(".blocsapp-special-menu blocsnav li").each(function(){$(this).parent().hasClass("dropdown-menu")?$(this).addClass("animated fadeIn"):(l+=s,$(this).attr("style","animation-delay:"+l+"ms").addClass("animated "+o))}),setTimeout(function(){$(".blocsapp-special-menu blocsnav").addClass("open"),$(".content-tint").addClass("on"),$("body").addClass("lock-scroll")},10)}}}),$("body").on("mousedown touchstart",".content-tint, .close-special-menu",function(e){$(".content-tint").removeClass("on"),$(".selected-nav").click(),setTimeout(function(){$(".content-tint").remove()},10)}).on("click",".blocsapp-special-menu a",function(e){$(e.target).closest(".dropdown-toggle").length||$(".close-special-menu").mousedown()})}function extraNavFuncs(){$(".site-navigation a").click(function(e){$(e.target).closest(".dropdown-toggle").length||$(".navbar-collapse").collapse("hide")}),$("a.dropdown-toggle").click(function(e){$(this).parent().addClass("target-open-menu"),$(this).closest(".dropdown-menu").find(".dropdown.open").each(function(e){$(this).hasClass("target-open-menu")||$(this).removeClass("open")}),$(".target-open-menu").removeClass("target-open-menu")})}function setFillScreenBlocHeight(){$(".bloc-fill-screen").each(function(e){var t=$(this);window.fillBodyHeight=0,$(this).find(".container").each(function(e){fillPadding=2*parseInt($(this).css("padding-top")),fillBodyHeight=t.hasClass("bloc-group")?fillPadding+$(this).outerHeight()+50:fillBodyHeight+fillPadding+$(this).outerHeight()+50}),$(this).css("height",getFillHeight()+"px")})}function getFillHeight(){var e=$(window).height();return e<fillBodyHeight&&(e=fillBodyHeight+100),e}function scrollToTarget(e){1==e?e=0:2==e?e=$(document).height():(e=$(e).offset().top,$(".sticky-nav").length&&(e-=$(".sticky-nav .navbar-header").height())),$("html,body").animate({scrollTop:e},"slow"),$(".navbar-collapse").collapse("hide")}function animateWhenVisible(){hideAll(),inViewCheck(),$(window).scroll(function(){inViewCheck(),scrollToTopView(),stickyNavToggle()})}function setUpDropdownSubs(){$("ul.dropdown-menu [data-toggle=dropdown]").on("click",function(e){e.preventDefault(),e.stopPropagation(),$(this).parent().siblings().removeClass("open"),$(this).parent().toggleClass("open");var t=$(this).parent().children(".dropdown-menu");t.offset().left+t.width()>$(window).width()&&t.addClass("dropmenu-flow-right")})}function stickyNavToggle(){var e=0,t="sticky";if($(".sticky-nav").hasClass("fill-bloc-top-edge")){var a=$(".fill-bloc-top-edge.sticky-nav").parent().css("background-color");"rgba(0, 0, 0, 0)"==a&&(a="#FFFFFF"),$(".sticky-nav").css("background",a),e=$(".sticky-nav").height(),t="sticky animated fadeInDown"}$(window).scrollTop()>e?($(".sticky-nav").addClass(t),"sticky"==t&&$(".page-container").css("padding-top",$(".sticky-nav").height())):($(".sticky-nav").removeClass(t).removeAttr("style"),$(".page-container").removeAttr("style"))}function hideAll(){$(".animated").each(function(e){$(this).closest(".hero").length||$(this).removeClass("animated").addClass("hideMe")})}function inViewCheck(){$($(".hideMe").get().reverse()).each(function(e){var t=jQuery(this),a=t.offset().top+t.height(),i=$(window).scrollTop()+$(window).height();if(t.height()>$(window).height()&&(a=t.offset().top),a<i){var o=t.attr("class").replace("hideMe","animated");t.css("visibility","hidden").removeAttr("class"),setTimeout(function(){t.attr("class",o).css("visibility","visible")},.01)}})}function scrollToTopView(){$(window).scrollTop()>$(window).height()/3?$(".scrollToTop").hasClass("showScrollTop")||$(".scrollToTop").addClass("showScrollTop"):$(".scrollToTop").removeClass("showScrollTop")}function setUpVisibilityToggle(){$(document).on("click","[data-toggle-visibility]",function(e){e.preventDefault();var t=$(this).attr("data-toggle-visibility");if(-1!=t.indexOf(",")){var a=t.split(",");$.each(a,function(e){i($("#"+a[e]))})}else i($("#"+t));function i(e){e.is("img")?e.toggle():e.slideToggle()}})}function setUpLightBox(){window.targetLightbox,$(document).on("click","[data-lightbox]",function(e){e.preventDefault();var t=(targetLightbox=$(this)).attr("data-lightbox"),a=targetLightbox.attr("data-autoplay"),i='<p class="lightbox-caption">'+targetLightbox.attr("data-caption")+"</p>",o="no-gallery-set",l=targetLightbox.attr("data-frame");targetLightbox.attr("data-gallery-id")&&(o=targetLightbox.attr("data-gallery-id")),targetLightbox.attr("data-caption")||(i="");var s="";1==a&&(s="autoplay");var n=$('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content '+l+' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><span class="fa fa-chevron-left"></span></a><a href="#" class="next-lightbox" aria-label="next"><span class="fa fa-chevron-right"></span></a><img id="lightbox-image" class="img-responsive" src="'+t+'"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls '+s+' class="embed-responsive-item"><source id="lightbox-video" src="'+t+'" type="video/mp4"></video></div>'+i+"</div></div></div></div>");$("body").append(n),"fullscreen-lb"==l&&($("#lightbox-modal").addClass("fullscreen-modal").append('<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'),$("#blocs-lightbox-close-btn").remove()),".mp4"==t.substring(t.length-4)?($("#lightbox-image, .lightbox-caption").hide(),$("#lightbox-video-container").show()):($("#lightbox-image,.lightbox-caption").show(),$("#lightbox-video-container").hide()),$("#lightbox-modal").modal("show"),"no-gallery-set"==o?(0==$("a[data-lightbox]").index(targetLightbox)&&$(".prev-lightbox").hide(),$("a[data-lightbox]").index(targetLightbox)==$("a[data-lightbox]").length-1&&$(".next-lightbox").hide()):(0==$('a[data-gallery-id="'+o+'"]').index(targetLightbox)&&$(".prev-lightbox").hide(),$('a[data-gallery-id="'+o+'"]').index(targetLightbox)==$('a[data-gallery-id="'+o+'"]').length-1&&$(".next-lightbox").hide()),addLightBoxSwipeSupport()}).on("hidden.bs.modal","#lightbox-modal",function(){$("#lightbox-modal").remove()}),$(document).on("click",".next-lightbox, .prev-lightbox",function(e){e.preventDefault();var t="no-gallery-set",a=$("a[data-lightbox]").index(targetLightbox),i=$("a[data-lightbox]").eq(a+1);targetLightbox.attr("data-gallery-id")&&(a=$('a[data-gallery-id="'+(t=targetLightbox.attr("data-gallery-id"))+'"]').index(targetLightbox),i=$('a[data-gallery-id="'+t+'"]').eq(a+1)),$(this).hasClass("prev-lightbox")&&(i=$('a[data-gallery-id="'+t+'"]').eq(a-1),"no-gallery-set"==t&&(i=$("a[data-lightbox]").eq(a-1)));var o=i.attr("data-lightbox");if(".mp4"==o.substring(o.length-4)){var l="";1==i.attr("data-autoplay")&&(l="autoplay"),$("#lightbox-image, .lightbox-caption").hide(),$("#lightbox-video-container").show().html("<video controls "+l+' class="embed-responsive-item"><source id="lightbox-video" src="'+o+'" type="video/mp4"></video>')}else $("#lightbox-image").attr("src",o).show(),$(".lightbox-caption").html(i.attr("data-caption")).show(),$("#lightbox-video-container").hide();targetLightbox=i,$(".next-lightbox, .prev-lightbox").hide(),"no-gallery-set"==t?($("a[data-lightbox]").index(i)!=$("a[data-lightbox]").length-1&&$(".next-lightbox").show(),$("a[data-lightbox]").index(i)>0&&$(".prev-lightbox").show()):($('a[data-gallery-id="'+t+'"]').index(i)!=$('a[data-gallery-id="'+t+'"]').length-1&&$(".next-lightbox").show(),$('a[data-gallery-id="'+t+'"]').index(i)>0&&$(".prev-lightbox").show())})}function addSwipeSupport(){$(".carousel-inner").length&&$(".carousel-inner").swipe({swipeLeft:function(e,t,a,i,o){$(this).parent().carousel("next")},swipeRight:function(){$(this).parent().carousel("prev")},threshold:0})}function addKeyBoardSupport(){$(window).keydown(function(e){37==e.which?$(".prev-lightbox").is(":visible")&&$(".prev-lightbox").click():39==e.which&&$(".next-lightbox").is(":visible")&&$(".next-lightbox").click()})}function addLightBoxSwipeSupport(){$("#lightbox-image").length&&$("#lightbox-image").swipe({swipeLeft:function(e,t,a,i,o){$(".next-lightbox").is(":visible")&&$(".next-lightbox").click()},swipeRight:function(){$(".prev-lightbox").is(":visible")&&$(".prev-lightbox").click()},threshold:0})}$(document).ready(function(){$("#scroll-hero").click(function(e){e.preventDefault(),$("html,body").animate({scrollTop:$("#scroll-hero").closest(".bloc").height()},"slow")}),extraNavFuncs(),setUpSpecialNavs(),setUpDropdownSubs(),setUpLightBox(),setUpVisibilityToggle(),addSwipeSupport(),addKeyBoardSupport(),-1!=navigator.userAgent.indexOf("Safari")&&-1==navigator.userAgent.indexOf("Chrome")&&$("#page-loading-blocs-notifaction").remove()}),$(window).load(function(){setFillScreenBlocHeight(),animateWhenVisible(),$("#page-loading-blocs-notifaction").remove()}).resize(function(){setFillScreenBlocHeight()}),$(function(){$('[data-toggle="tooltip"]').tooltip()});
JavaScript Minifier Tool Documentation
The API has changed, to see more please click here
To minify/compress your JavaScript, perform a POST request to

API https://www.toptal.com/developers/javascript-minifier/api/raw
with the input parameter set to the JavaScript you want to minify.

Hire the top 3% of freelance talent
Join the Toptal Network
Copyright 2010 - 2022 Toptal, LLC
Privacy Policy
Website terms
