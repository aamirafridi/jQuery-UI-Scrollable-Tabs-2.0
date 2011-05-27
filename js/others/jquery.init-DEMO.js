function d(m){console.log(m)}
var $tabs;



function leftPosition(ele)
{
	return ele[0].offsetLeft;
}


function liw(specificLi){
	var w=0,
		lis = specificLi ? specificLi.prevAll('li').andSelf() : $('ul li');
		d('-------');
	lis.each(function(){
		w+=$(this).outerWidth()+ parseInt($(this).css('margin-right'),10); //not outerWidth(true) because margin-left is changed in previous call so better take right margin
		d(w);
	});
	
	console.log('--------');
	return w;
}


$(function(){
	//To get the random tabs label with variable length for testing the calculations			
	var keywords = ["Just a tab label","Long string","Short","Very very long string","tab","New tab","This is a new tab"]
	
	//example 2
	$tabs = $('#example_1')
				.tabs()
				//.scrollabletab();


$('ul').css({'position':'relative', 'overflow':'hidden'})
	.find('li:not(":first")').hide()
	.end()
	.height($('ul').height())
	.find('li').show().each(function(){
		
		var isf = $(this).prev('li').length == 0;
		
		if(isf)
		{
			$(this).css('margin-right',4)
			window.tw = 2;
		}
		else
		{
			window.tw += $(this).prev('li').outerWidth(true);
		}
		
		$(this).css({
			'position':'absolute',
			'top':3,
			'left':tw
		})
	});


$('#f').click(function(){
	//check if li selected is the first tab already
	if($('ul .ui-tabs-selected').index($('li:first'))==0)
	{
		console.log('You are on first tab already');
		return false;
	}
	
	$('ul li.ui-state-default').animate({'margin-left':0},1000,function(){
		$tabs.tabs('select', $('li').index($('li:first')) );
	});
	return false;
})



$('#l').click(function(){
	//check if there is no next tab or u r already on the last tab than return;
	
	//check if li next to selected is in view or not
	var nxtLi = $('ul .ui-tabs-selected').next('li');
	
	//check if there is no next tab
	if(!nxtLi.length)
	{
		d('You are already on the last tab. there is no more last tab.');
		return false;
	}
	
	$('ul li.ui-state-default').animate({'margin-left' : '-'+(liw()-($('ul').width()))+'px'},1000,function(){
		$tabs.tabs('select', $('li').index($('li:last')) );
	});
	return false;
})




$('#p').click(function(){
	//check if li next to selected is in view or not
	var prvLi = $('ul .ui-tabs-selected').prev('li'),
		//pos = parseInt(nxtLi.css('left'),10) + nxtLi.outerWidth(true),
		//get index of next element
		ind = $('li').index( prvLi );
		
		if(prvLi.length)
		{
			osL = prvLi[0].offsetLeft;
		}
		else
		{
			d('You is no previous tab');
			return false;
		}
		
		//Check if offsetLeft is negative than its hidden, do not use jQuery.position().left which count the margin as well
		console.log(osL + "<<<<<<<<<<<<");
		
		
		if(osL<0)
		{
			d('its hidden = ' + (osL - (osL+osL)) );
			$('ul li.ui-state-default').animate({'margin-left' : + (  parseFloat( prvLi.css('margin-left') )  - (osL) )  +'px'},500,function(){
				$tabs.tabs('select',ind);
			});
			
		}
		else
		{		
			$tabs.tabs('select',ind);
		}
	return false;
})







$('#n').click(function(){
	//check if li next to selected is in view or not
	var nxtLi = $('ul .ui-tabs-selected').next('li');
	
	//check if there is no next tab
	if(!nxtLi.length)
	{
		d('You are on last tab, no next tab found.');
		return false;
	}
	
	var	pos = nxtLi.position().left + nxtLi.outerWidth(true),
		//get index of next element
		ind = $('li').index( nxtLi );
		
		
		
		console.log(parseInt(nxtLi.css('left'),10) + ' | ' + nxtLi.outerWidth(true) + ' | '+ pos);
		d('UL width = ' + $('ul').width())
		if( pos >  $('ul').width() )
		{
			console.log('hidden');
			console.log('-'+(liw(nxtLi)-$('ul').width())+'px');
			$('ul li.ui-state-default').animate({'margin-left' : '-'+(liw(nxtLi)-$('ul').width())+'px'},500,function(){
				$tabs.tabs('select',ind);
			});
			
		}
		else
		{
			$tabs.tabs('select',ind);
		}
	
	return false;
})
	




$('li a').click(function(){
	console.log('tab clicked');
})








	
	//return;
	
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