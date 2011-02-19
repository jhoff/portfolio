var imgflows = new Array();

$(document).ready(function(){
	Shadowbox.init();
	
	createimageflow('main',true,1,1,false);
		
	$('.imageflow > span').live('click', function() {
		$(this).parent().parent().animate({ opacity: 0, queue: false }, 'slow');
		$('#main').parent().animate({ opacity: 1, queue: false }, 'slow');
	});

});

//http://yelotofu.com/2008/08/jquery-outerhtml/
jQuery.fn.outerHTML = function(s) {
	return (s)
	? this.before(s).remove()
	: jQuery("<p>").append(this.eq(0).clone().removeClass('hidden')).html();
}

function clickhandle(obj) {
	var target_if = /if_/;
	var target_co = /co_/;
	if(obj.id.search(target_if) != -1) {
		$(obj).parent().parent().parent().animate({ opacity: 0, queue: false }, 'slow');
		$('#'+obj.id.replace('if_','')).parent().animate({ opacity: 1, queue: false }, 'slow');
		createimageflow(obj.id.replace('if_',''),false,2,'rand',true);
	} else if (obj.id.search(target_co) != -1) {
		Shadowbox.open({
			content:    $('#content_'+obj.id.replace('co_','')).outerHTML(),
			player:     "html",
			height:     600,
	        width:      700
		});
	} else {
		alert('matched nothin |' + obj.id + '|');
	}
}

function createimageflow(obj,animation,num,start,slideshow) {
	if(!(obj in imgflows)) {
		if(start == 'rand') {
			start = Math.floor((Math.random() * $('#'+obj + ' img').length) + 1);
		}
		//console.log(start + " / " + $('#'+obj + ' img').length);
		var temp = new ImageFlow();
		imgflows[obj] = temp;
		imgflows[obj].init({ ImageFlowID: obj,
						reflectPath: 'includes/imageflow/',
						imagePath: '../../',
						imageFocusMax: num,
						startAnimation: animation,
						glideToStartID: animation,
						reflectionGET: '&fade_start=20%&cache=1',
						reflectionPNG: true,
		                circular: true,
						slider: false,
						buttons: true,
						slideshow: slideshow,
						slideshowAutoplay: true,
						slideshowSpeed: 8000,
						startID: start,
						onClick: function() { clickhandle(this); }
		});
	}
}