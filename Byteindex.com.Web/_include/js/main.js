$(document).ready(function() {
    $("#owl-demo").owlCarousel({
        items :5,
        lazyLoad : true,
        autoPlay : true,
        navigation : false,
        navigationText :  false,
        pagination : true
    });
});

jQuery(function($){

    var ByteIndex = window.ByteIndex || {};

    /* ==================================================
     judge mobile
     ================================================== */
    ByteIndex.browserRedirect=function() {
        if(/AppleWebKit.*Mobile/i.test(navigator.userAgent)
            || /Android/i.test(navigator.userAgent)
            || /BlackBerry/i.test(navigator.userAgent)
            || /IEMobile/i.test(navigator.userAgent)
            || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
            if(/iPad/i.test(navigator.userAgent)){
                $(".service").css("display","none");
            }else{
                $(".service").css("display","none");
            }
        }else{
//            setTimeout(function(){
//                qqService();
//            }, 8000);
//            setInterval(function(){
//                change();
//            },11000);
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
        var mes=judgeImgTittle();
        var arrAnimationName=["flipInY","fadeInUp","fadeInDown","bounceInRight","bounceInLeft","bounceInDown","bounceInUp","zoomInDown","zoomInLeft","zoomInRight","zoomInUp"];
        var arr=createRandom(4,0,arrAnimationName.length);//生成4个从0-arrAnimationName.length-1之间不重复的随机数
        $.supersized({
            // Functionality
            slideshow               :   1,			// Slideshow on/off
            autoplay				:	1,			// Slideshow starts playing automatically
            start_slide             :   1,			// Start slide (0 is random)
            stop_loop				:	0,			// Pauses slideshow on last slide
            random					: 	0,			// RanZdomize slide order (Ignores start slide)
            slide_interval          :   7000,		// Length between transitions
            transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
            transition_speed		:	1000,		// Speed of transition
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
                {image : '/_include/img/slider-images/img01.jpg', title : '<div class="slide-content animated '+arrAnimationName[arr[0]]+'"><span>'+mes[0]+'</span></div>', thumb : '', url : ''},
                {image : '/_include/img/slider-images/img02.jpg', title : '<div class="slide-content animated '+arrAnimationName[arr[1]]+'"><span><span class="animated bounce">ByteIndex</span>'+mes[1]+'</span></div>', thumb : '', url : ''},
                {image : '/_include/img/slider-images/img03.jpg', title : '<div class="slide-content animated '+arrAnimationName[arr[2]]+'"><span><span class="animated bounce">ByteIndex</span>'+mes[2]+'</span></div>', thumb : '', url : ''},
                {image : '/_include/img/slider-images/img04.jpg', title : '<div class="slide-content animated '+arrAnimationName[arr[3]]+'"><span style="position:relative;top:-45px;font-size: 0.9em;@media (max-width: 500px){{position: relative;top: -70px;}}}">'+mes[3]+'</span></div>', thumb : '', url : ''}
            ],



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
            didScroll = false,windowHeight= $(window).height();
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
                if( $(window).scrollTop() >= windowHeight-30 ) {
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
     imgHover
     ================================================== */

    ByteIndex.imgHover = function(){
        var img=$(".spread").find("img");
        img.hover(function(){
            $(this).addClass("mouseOver");
            $(this).removeClass("mouseOut");
        },function(){
            $(this).removeClass("mouseOver");
            $(this).addClass("mouseOut");
        });
    };

    /* ==================================================
     QQ service
     ================================================== */

    ByteIndex.service = function(){
        $(".qq").click(function(){
            var qq=$(this).find("a").attr("id");
            qqService(qq);
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
                var mes=judgeAjaxMes();
                $.ajax({
                    type: "post",
                    url: "/Email/Send",
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
    ByteIndex.ObtainNews1=function(){
        var trs=$(".news-content-1").find("tr");
        if(trs.length){
            var trIndex=0;
            var date=trs.eq(trIndex).children("td").eq(0).html();
            var url=trs.eq(trIndex).children("td").eq(1).html();
            var content=trs.eq(trIndex).children("td").eq(2).html();
            var temp='<li class="animated fadeInUp"><span>'+date+'</span><a href="'+url+'">'+content+'</a></li>';
            $("#news-1").html(temp);
            setInterval(function(){
                trIndex++;
                if(trIndex>=trs.length){
                    trIndex=0;
                }
                var date=trs.eq(trIndex).children("td").eq(0).html();
                var url=trs.eq(trIndex).children("td").eq(1).html();
                var content=trs.eq(trIndex).children("td").eq(2).html();
                var temp='<li class="animated fadeInUp"><span>'+date+'</span><a href="'+url+'">'+content+'</a></li>';
                $("#news-1").html(temp);
            },6000);
        }

    };
    ByteIndex.ObtainNews2=function(){
        var trs=$(".news-content-2").find("tr");
        var url = window.location.href.split("/");
        var mes;
        var flag=parseInt(url.indexOf("en"));
        if(flag<0){
            mes="用户："
        }else{
            mes="User:"
        }
        if(trs.length){
            var trIndex=0;
            var time=trs.eq(trIndex).children("td").eq(0).html();
            var account=trs.eq(trIndex).children("td").eq(1).html();
            if(account){
                account=account.replace(/(.{3}).*(.{3})/,"$1*****$2");
            }
            var content=trs.eq(trIndex).children("td").eq(2).html();
            var temp='<li class="animated fadeInUp"><span>'+time+'</span>'+mes+' <span>'+account+'</span><span>'+content+'</span></li>';
            $("#news-2").html(temp);
            setInterval(function(){
                trIndex++;
                if(trIndex>=trs.length){
                    trIndex=0;
                }
                var time=trs.eq(trIndex).children("td").eq(0).html();
                var account=trs.eq(trIndex).children("td").eq(1).html();
                if(account){
                    account=account.replace(/(.{3}).*(.{3})/,"$1*****$2");
                }
                var content=trs.eq(trIndex).children("td").eq(2).html();
                var temp='<li class="animated fadeInUp"><span>'+time+'</span>用户: <span>'+account+'</span><span>'+content+'</span></li>';
                $("#news-2").html(temp);
            },5000);
        }
    };
    /* ==================================================
     Init
     ================================================== */

    $(document).ready(function(){
        // Preload the page with jPreLoader
//	$('body').jpreLoader({
//		splashID: "#jSplash",
//		showSplash: true,
//		showPercentage: true,
//		autoClose: true,
//		splashFunction: function() {
//			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
//		}
//	});
        ByteIndex.slider();
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
        ByteIndex.language();
        ByteIndex.form();
        ByteIndex.imgHover();
        ByteIndex.service();
        ByteIndex.ObtainNews1();
        ByteIndex.ObtainNews2();
    });

    $(window).resize(function(){
        ByteIndex.mobileNav();
    });

});

function judgeAjaxMes(){
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
        message: '<img src="/_include/img/ajax-loader2.gif" style="margin-right: 5px;"/>' + msg,
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
function change(){
    var arr =judgeArr();
    var arrAnimationName=["fadeIn","pulse","fadeInDown","fadeInUp","flipInY","bounceIn"];
    var arr2 = arr.sort(randomSort);
    var num = Math.floor(Math.random()*arrAnimationName.length);
    var temp="";
    for(var i=0;i<arr2.length;i++){
        temp+='<div class="span3 profile animated '+arrAnimationName[num]+'">' +
            '<div class="image-wrap">' +
            '<img src="'+arr2[i].url+'" alt="">' +
            '</div>' +
            '<h3 class="profile-name">'+arr2[i].name+'</h3>' +
            '<p class="profile-description">'+arr2[i].describe+'</p>' +
            '</div>'
    }
    $(".project").html(temp);
}
function judgeArr(){
    var url = window.location.href.split("/");
    var mes;
    var flag=parseInt(url.indexOf("en"));
    if(flag<0){
        mes = [
            ({url:"/_include/img/solution/01.jpg",name:"外汇经纪商解决方案",describe:"正版交易软件（含移动版）+高速数据源+多通道银行级对冲桥+合规监管+专业网站+CRM客户关系管理系统+资金托管解决方案"}),
            ({url:"/_include/img/solution/02.jpg",name:"二元期权平台解决方案",describe:"基于MT4交易系统插件或独立二元期权方案+高速数据源+合规监管+专业网站+CRM客户关系管理系统+资金托管解决方案。"}),
            ({url:"/_include/img/solution/03.jpg",name:"微信微盘交易系统",describe:"微信公众平台认证服务号+HTML5前端系统+X-trade交易处理层+Oracle后端数据库+微信支付+高速数据源"}),
            ({url:"/_include/img/solution/04.jpg",name:"增值服务模块解决方案",describe:"已上略列所有服务均可单独提供，详情请联系我们。"})
        ];
    }else{
        mes = [
            ({url:"/_include/img/solution/01.jpg",name:"Forex Brokers Solutions",describe:"Genuine trading software (including mobile version) + + multi-channel high-speed data source level hedge bank bridge + regulatory compliance + professional website + CRM customer relationship management system + funding Hosted Solutions."}),
            ({url:"/_include/img/solution/02.jpg",name:"Binary Options Platform Solutions",describe:"MT4 trading system based on plug-in or stand-alone binary option scheme + high speed data source + regulatory compliance + professional website + CRM customer relationship management system + funding Hosted Solutions"}),
            ({url:"/_include/img/solution/03.jpg",name:"Micro-Letter-Trading System",describe:"Micro-channel public platform authentication service number + HTML5 front-end system + X-trade transaction processing layer + Oracle back-end database + micro-channel pay + high-speed data source."}),
            ({url:"/_include/img/solution/04.jpg",name:"Value-Added Services Module Solution",describe:"All services have been minor columns can be individually provided, please contact us."})
        ];
    }
    return mes;
}

function qqService(qq){
    var qq_list = new Array('626770319', '1365799928');
    //随机
    var qq_i = Math.floor(Math.random()*qq_list.length);
    if(!qq){
        qq=qq_list[qq_i];
    }
    var element="<iframe style='display:none;' class='qq_iframe' src='tencent://message/?uin="+qq+"&Site=&menu=yes'></iframe>";
    $("body").append(element);
}

function judgeImgTittle(){
    var url = window.location.href.split("/");
    var mes;
    var flag=parseInt(url.indexOf("en"));
    if(flag<0){
        mes = [
            "最佳科技，最佳奖项，永远领先",
            "可以为你建立完美的经纪业务，低成本快速启动",
            "参展澳门iFXEXPO外汇峰会",
            "交易系统革命性升级——微信微盘交易系统。<br/>打开微信扫描二维码直接交易,无需下载客户端。<br/>交易系统限量免费部署中!"
        ];
    }else{
        mes = [
            "Best Technology, Best awards, Always Leading",
            " can build a perfect brokerage business for you,low cost quick start",
            " exhibitors Macau iFXEXPO exchange summit",
            "Trading System is upgrading - Wechat Microdisk System,<br/>open it scan two-dimensional code directly, without having to download the client. <br/>Trading Systems Limited free deployment."
        ];
    }
    return mes;
}
function randomSort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function createRandom(num , from , to){
    var arr=[];
    var json={};
    while(arr.length<num)
    {
        //产生单个随机数
        var ranNum=Math.floor(Math.random()*(to-from))+from;
        //通过判断json对象的索引值是否存在 来标记 是否重复
        if(!json[ranNum])
        {
            json[ranNum]=1;
            arr.push(ranNum);
        }
    }
    return arr;
}