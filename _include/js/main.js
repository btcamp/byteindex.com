
jQuery(function($){

var ByteIndex = window.ByteIndex || {};

/* ==================================================
     judge mobile
================================================== */
ByteIndex.browserRedirect=function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        $(".service").css("display","none");
    }
};

/* ==================================================
   Mobile Navigation
================================================== */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

ByteIndex.mobileNav = function(){
	var windowWidth = $(window).width();
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr({'id':'menu-nav-mobile',"class":'menu-nav-mobile'});
            $('#navigation-mobile #li1').attr('id', 'li1-mobile');
            $('#navigation-mobile #li2').attr('id', 'li2-mobile');

            $("#li1-mobile").click(function(){
                location.href="/"
            });
            $("#li2-mobile").click(function(){
                location.href="/en"
            });
		}
	}
    else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');
		}
	}
};

ByteIndex.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			$('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});
	
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});
};


/* ==================================================
   Slider Options
================================================== */

ByteIndex.slider = function(){
	$.supersized({
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   10000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	300,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   1,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
											{image : '/_include/img/slider-images/img01.jpg', title : '<div class="slide-content"><img src="/_include/img/ByteindexLOGO.png" alt=""/></div>', thumb : '', url : ''},
											{image : '/_include/img/slider-images/img02.jpg', title : '<div class="slide-content"><img src="/_include/img/ByteindexLOGO.png" alt=""/></div>', thumb : '', url : ''},
											{image : '/_include/img/slider-images/img03.jpg', title : '<div class="slide-content"><img src="/_include/img/ByteindexLOGO.png" alt=""/></div>', thumb : '', url : ''}
									],
									
		// Theme Options			   
		progress_bar			:	0,			// Timer for each slide							
		mouse_scrub				:	0
		
	});

};


/* ==================================================
   Navigation Fix
================================================== */

ByteIndex.nav = function(){
	$('.sticky-nav').waypoint('sticky');
};

/* ==================================================
   Menu Highlight
================================================== */

ByteIndex.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
};

/* ==================================================
   Next Section
================================================== */

ByteIndex.goSection = function(){
	$('#nextsection').on('click', function(){
		var $target = $($(this).attr('href')).offset().top-30;
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
};

/* ==================================================
   GoUp
================================================== */

ByteIndex.goUp = function(){
	$('#goUp').on('click', function(){
        var $target = $($(this).attr('href')).offset().top-30;
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
};


/* ==================================================
	Scroll to Top
================================================== */

ByteIndex.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	});

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
};

/* ==================================================
   Thumbs / Social Effects
================================================== */

ByteIndex.utils = function(){

	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });

	$('.image-wrap').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });

	$('#social ul li').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });

};

/* ==================================================
   Accordion
================================================== */

ByteIndex.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');

	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');
		  	accordion_trigger.find('.active').removeClass('active');
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
};

/* ==================================================
   Toggle
================================================== */

ByteIndex.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
};

/* ==================================================
   Tooltip
================================================== */

ByteIndex.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
};

/* ==================================================
     language
================================================== */

ByteIndex.language = function(){
    $("#li1").click(function(){
        location.href="/"
    });
    $("#li2").click(function(){
        location.href="/en/"
    });
};

/* ==================================================
 Contact Form
 ================================================== */
ByteIndex.form=function(){
    $("#contact-submit").on('click',function() {
        var $contact_form = $('#contact-form');
        var fields = $contact_form.serialize();
        var name=$("#contact_name");
        var email=$("#contact_email");
        var telephone=$("#contact_phone");
        var message=$("#contact_message");
        var regEmail=/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if(name.val().length<=0){
            name.focus();
        }else if(!regEmail.test(email.val())){
            email.focus();
        }else if(telephone.val().length<=0){
            telephone.focus();
        }else if(message.val().length<=0){
            message.focus();
        }else{
            var mes=judgePage();
            $.ajax({
                type: "post",
                url: "",
                data: fields,
                dataType: 'json',
                beforeSend: function myfunction() {
                    modalLoading(mes.beforeAjaxMsg);
                },
                error:function () {
                    bootbox.hideAll();
                    finAlert(mes.errorMsg, false);
                },
                success: function(data) {
                    if(data){
                        bootbox.hideAll();
                        $('#contact-form input').val('');
                        $('#contact-form textarea').val('');
                    }else{
                        finAlert(data.Msg, false);
                    }
                }
            });
        }
        return false;
    });
};
/* ==================================================
	Init
================================================== */

ByteIndex.slider();

$(document).ready(function(){
	// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
		}
	});
    ByteIndex.browserRedirect();
	ByteIndex.nav();
	ByteIndex.mobileNav();
	ByteIndex.listenerMenu();
	ByteIndex.menu();
	ByteIndex.goSection();
	ByteIndex.goUp();
	ByteIndex.scrollToTop();
	ByteIndex.utils();
	ByteIndex.accordion();
	ByteIndex.toggle();
	ByteIndex.toolTip();
    ByteIndex.language();
    ByteIndex.form();
});

$(window).resize(function(){
	ByteIndex.mobileNav();
});

});

function judgePage(){
    var url = window.location.href.split("/");
    var mes;
    var flag=parseInt(url.indexOf("en"));
    if(flag<0){
        mes=({
            beforeAjaxMsg:"正在提交数据，请稍候....",
            errorMsg:"提交数据过程中出现错误，请检查数据后重试提交。"
        })
    }else{
        mes=({
            beforeAjaxMsg:"Are submitting data, please wait...",
            errorMsg:"Submit data in error, please retry after checking data."
        })
    }
    return mes;
}
function modalLoading(msg) {
    if ('undefined' == typeof (document.body.style.maxHeight)) {
        return;
    }
    bootbox.dialog({
        title: $(document).attr('title'),
        message: '<img src="/_include/img/ajax-loader2.gif" />' + msg,
        animate: false,
        buttons: {}
    });
}
function finAlert(message, issuccess, config) {
    if ('undefined' == typeof (document.body.style.maxHeight)) {
        alert(message);
        return;
    }
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-theme-flat messenger-on-top',
        theme: 'future'
    };
    var msgConfig = $.extend({
        message: message,
        type: 'error',
        hideAfter: 10,
        hideOnNavigate: true,
        showCloseButton: true
    }, config);
    if (issuccess == false) {
        Messenger().post(msgConfig);
    }
    else {
        msgConfig.type = "success";
        Messenger().post(msgConfig);
    }
}

