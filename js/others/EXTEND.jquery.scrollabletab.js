/*
Copyright (c) 2009, http://seyfertdesign.com/jquery/ui-tabs-paging.html

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

$.extend($.ui.tabs.prototype, {
	paging: function(options) {
		var opts = {
			tabsPerPage: 0,
			nextButton: '&#187;',
			prevButton: '&#171;',
			follow: false,
			cycle: false,
			selectOnAdd: false,
			followOnSelect: false
		};
		
		opts = $.extend(opts, options);

		var self = this,
			initialized = false,
			currentPage, 
			buttonWidth,
			containerWidth,
			allTabsWidth,
			tabWidths, 
			maxPageWidth,
			pages,
			resizeTimer = null, 
			windowHeight = $(window).height(),
			windowWidth = $(window).width();
		
		function init() {
			destroy();
			initialized = true;
		}
		
		
		function disableButton(direction) {
			$('.ui-tabs-paging-'+direction, self.element).addClass('ui-tabs-paging-disabled');
		}
		
		function enableButton(direction) {
			$('.ui-tabs-paging-'+direction, self.element).removeClass('ui-tabs-paging-disabled');
		}
				
		function destroy() {
			// remove buttons
			$('.ui-tabs-paging-next', self.element).remove();
			$('.ui-tabs-paging-prev', self.element).remove();
		}
		
		//add, remove, and destroy functions specific for paging 
		$.extend($.ui.tabs.prototype, {
			pagingDestroy: function() {
				destroy();
			}
		});
		init();
	}
});
