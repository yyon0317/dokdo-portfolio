$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function() {
    intro();
    mainVisual();
    notice();
    banner();
    logoRoll();
});
/*intro*/
//인트로 후 css효과 설정
function intro() {
    setTimeout(function() {
        $('body.main').removeClass('over');
        $('#intro').animate({'opacity': '0'}, 400, function() {
            $('#intro').addClass('off');
        });
        $('#wrapper').animate({'opacity': '1'}, 400);
    }, 2000);
}
/*mainVisual*/
//video pause().play() 버튼 설정
//quick-menu 버튼 클릭시 css('opacity').delay(i * 150) 나타나기
function mainVisual() {
    $('#visual div.video-box a').on('click', function() {
        var videoAuto = $('video').get(0);
        
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            videoAuto.pause();
        } else {
            videoAuto.play();
        }
    });
    
    $('#visual div.quick-menu > a').on('click', function() {
        $(this).toggleClass('active');
        $(this).parent().toggleClass('on');
        $('#gnb li.depth1 > a').toggleClass('on');
        if ($(this).parent().hasClass('on')) {
            $('#visual div.quick-menu div.icon-box ul li').css({'opacity': '0'});
            $('#visual div.quick-menu div.icon-box ul li').each(function(i) {
                $(this).delay(i * 150).animate({'opacity': 1});
            });
        } 
    });
      
}
/*notice*/
//parent().next().css() 사용해서 탭 기능 버튼 구현
function notice() {
    var set = $('#notice dl dt.on').next().css({'display': 'block'});
    
    $('#notice dl dt a').on('click', function() {
        $('#notice dl dt').removeClass('on');
        $(this).parent().addClass('on');

        if ($('#notice dl dt').hasClass('on')) {
            $('#notice dl dd').css({'display': 'none'});
            $(this).parent().next().css({'display': 'block'});
        }
    });
}
/*banner*/
//jquary 사용해서 slider구현
function banner() {
    var offsetLeft = 0;
    var boxWidth = $('#banner div.banner-slider div.box').outerWidth(true);
    var barWidth = 0;
    var minOffsetLeft = 0;
    var numBanner = $('#banner div.banner-slider ul.banner li').length;
    var bannerNow = 0;
    var bannerNext = 0;
    var bannerPrev = 0;
    var timerId = '';
    var isTimerOn = true;
    var timerSpeed = 8000;
    
	setTimeout(function() {
		$('#banner div.banner-slider ul.banner li').each(function() {
			barWidth += $(this).outerWidth(true);
		});
		$('#banner div.banner-slider ul.banner').css({'width': barWidth + 'px'});
		minOffsetLeft = boxWidth - barWidth;
		showBanner(1);
	}, 500);
	if (isTimerOn === true) {
			$('#banner div.banner-slider p.control a.prev').addClass('on');
		} else {
			$('#banner div.banner-slider p.control a.prev').removeClass('on');
		}

    $('#banner div.banner-slider p.control a.prev').on('click', function() {
        showBanner(bannerPrev);
    });
    $('#banner div.banner-slider p.control a.next').on('click', function() {
        showBanner(bannerNext);
    });

    if (isTimerOn === true) {
        timerId = setTimeout(function() {
            showBanner(bannerNext);
        }, timerSpeed);
        isTimerOn = true;
    } else {
        clearTimeout(timerId);
        isTimerOn = false;
    }

    function showBanner(n) {
        clearTimeout(timerId);
        offsetLeft = -$('#banner div.banner-slider ul.banner li:eq(' + (n - 1) + ')').position().left;
        if (offsetLeft < minOffsetLeft) {
            offsetLeft = minOffsetLeft;
            numBanner = n;
        }
        $('#banner div.banner-slider ul.banner').stop(true).animate({
            'left': offsetLeft + 'px'
        }, 500);
        bannerNow = n;
        bannerNext = (n + 1) > numBanner ? 1 : n + 1;
        bannerPrev = (n - 1) < 1 ? numBanner : n - 1;
        if (isTimerOn === true) {
            timerId = setTimeout(function () {
                showBanner(bannerNext);
            }, timerSpeed);
        }
    }    
}
/*logoroll*/
//jquary 사용해서 slider구현
function logoRoll() {
    var offsetLeft = 0;
    var boxWidth = $('#logo-roll div.banner-slide div.box').innerWidth();
    var barWidth = 0;
    var minOffsetLeft = 0;
    var numBanner = $('#logo-roll div.banner-slide ul.banner li').length;
    var bannerNow = 0;
    var bannerNext = 0;
    var bannerPrev = 0;
    var timerId = '';
    var isTimerOn = true;
    var timerSpeed = 5000;
    
    setTimeout(function() {
        $('#logo-roll div.banner-slide ul.banner li').each(function() {
            barWidth += $(this).outerWidth(true);
        });
        $('#logo-roll div.banner-slide ul.banner').css({'width': barWidth + 'px'});
        minOffsetLeft = boxWidth - barWidth;
        if (isTimerOn === true) {
            $('#logo-roll div.banner-slide p.control a.play').addClass('on');
        } else {
            $('#logo-roll div.banner-slide p.control a.play').removeClass('on');
        }
        showBanner(1);    
    }, 500);

    $('#logo-roll div.banner-slide p.control a.prev').on('click', function() {
        showBanner(bannerPrev);
    });
    $('#logo-roll div.banner-slide p.control a.next').on('click', function() {
        showBanner(bannerNext);
    });
    $('#logo-roll div.banner-slide p.control a.play').on('click', function() {
        if (isTimerOn === true) {
            clearTimeout(timerId);
            $(this).removeClass('on');
            isTimerOn = false;
        } else {
            timerId = setTimeout(function() {
                showBanner(bannerNext);
            }, timerSpeed);
            $(this).addClass('on');
            isTimerOn = true;
        }
    });

    function showBanner(n) {
        clearTimeout(timerId);
        offsetLeft = -$('#logo-roll div.banner-slide ul.banner li:eq(' + (n - 1) + ')').position().left;
        if (offsetLeft < minOffsetLeft) {
            offsetLeft = minOffsetLeft;
            numBanner = n;
        }
        $('#logo-roll div.banner-slide ul.banner').stop(true).animate({
            'left': offsetLeft + 'px'
        }, 100);
        bannerNow = n;
        bannerNext = (n + 1) > numBanner ? 1 : n + 1;
        bannerPrev = (n - 1) < 1 ? numBanner : n - 1;
        if (isTimerOn === true) {
            timerId = setTimeout(function () {
                showBanner(bannerNext);
            }, timerSpeed);
        }
    }    
}


