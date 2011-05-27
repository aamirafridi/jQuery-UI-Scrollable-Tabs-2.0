var $tabs;

//For debugging - shortcut
function d(m){console.log(m)}

$(function(){
	//To get the random tabs label with variable length for testing the calculations			
	var keywords = ["Just a tab label","Long string","Short","Very very long string","tab","New tab","This is a new tab"]
	
	//example 
	$tabs = $('#example_1')
		.tabs()
		.scrollabletabs({
			customNavNext:'#n',
			customNavPrev:'#p',
			customNavFirst:'#f',
			customNavLast:'#l'//,
			//easing : 'easeInBounce'
		});

	//Add new tab
	$('#addTab_1').click(function(){
		var label = keywords[Math.floor(Math.random()*keywords.length)]
		content = 'This is the content for the '+label+'<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit vulputate porttitor. Fusce purus leo, faucibus a sagittis congue, molestie tempus felis. Donec convallis semper enim, varius sagittis eros imperdiet in. Vivamus semper sem at metus mattis a aliquam neque ornare. Proin sed semper lacus.';
		$tabs.trigger('addTab',[label,content]);
		return false;
	});
	
	//Add new tab using jQuery ui tabs method
	$('#addUiTab').click(function(){
		var label = keywords[Math.floor(Math.random()*keywords.length)]
		content = 'This is the content for the '+label+'<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit vulputate porttitor. Fusce purus leo, faucibus a sagittis congue, molestie tempus felis. Donec convallis semper enim, varius sagittis eros imperdiet in. Vivamus semper sem at metus mattis a aliquam neque ornare. Proin sed semper lacus.';
		rnd = Math.floor(Math.random()*10000);
		//d($tabs);
		$tabs
			.append('<div id="'+rnd+'">'+content+'</div>')
			.tabs('add','#'+rnd,label);
		return false;
	});
	
	$('#removeTab').click(function(){
		$tabs.tabs('select',$tabs.tabs('length')-1);
		$tabs.tabs('remove',$tabs.tabs('length')-1);
		return false;
	});
});



jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
	easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	}
});