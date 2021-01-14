


// Page Scroll JS
jQuery(function($) {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 35
    }, 1500, 'easeInQuart');
    event.preventDefault();
  });
});

// Search fixed on scroll
$(document).on("scroll",function(){if($(document).scrollTop()>50){$(".filter-results-box").removeClass("fixed-search-n").addClass("fixed-search");}else{$(".filter-results-box").removeClass("fixed-search").addClass("fixed-search-n");}});


// Multilevel dropdowns JS
$( document ).ready( function () {
    $( '.dropdown-menu a.dropdown-toggle' ).on( 'click', function ( e ) {
        var $el = $( this );
        $el.toggleClass('active-dropdown');
        var $parent = $( this ).offsetParent( ".dropdown-menu" );
        if ( !$( this ).next().hasClass( 'show' ) ) {
            $( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
        }
        var $subMenu = $( this ).next( ".dropdown-menu" );
        $subMenu.toggleClass( 'show' );
        
        $( this ).parent( "li" ).toggleClass( 'show' );

        $( this ).parents( '.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
            $( '.dropdown-menu .show' ).removeClass( "show" );
            $el.removeClass('active-dropdown');
        } );
        
         if ( !$parent.parent().hasClass( 'navbar-nav' ) ) {
            $el.next().css( { "top": $el[0].offsetTop, "left": -$parent.outerWidth() - 4 } );
        }

        return false;
    } );
} );


// dropdowns animation JS
$(document).ready(function(){

  $(".dropdown").focusin( function (){
     $(this).find(".dropdown-menu").each(function(){
       $(this).css({"display":'block','opacity':'1'}); 
     });
  });
  
    $(".dropdown").focusout( function (){
     $(this).find(".dropdown-menu").each(function(){
       $(this).css({"display":'block','opacity':'0'}); 
     });
  });
  
});


// Top Search Mobile JS
$(".filter-results-box").click(function() {
   $(".mobile-search-helper").show();
   $("#SearchInternships").show();
   $("#FindCandidates").hide();
   $("input[name='SearchInternships']").trigger('focus');
   $("#SearchInternships").addClass("show active");
   $("#FindCandidates").removeClass("show active");
   $("#SearchInternshipstab").addClass("active");
   $("#FindCandidatestab").removeClass("active");
});
$(".filter-results-box-close").click(function() {
   $(".mobile-search-helper").hide();
});
$("#ClearSearchInternshipsHistory").click(function() {
   $("#SearchInternshipsHistory").hide();
});
$("#ClearFindCandidatesHistory").click(function() {
   $("#FindCandidatesHistory").hide();
});

$("#SearchInternshipstab").click(function() {
   $("#SearchInternships").show();
   $("#FindCandidates").hide();
   $("input[name='SearchInternships']").trigger('focus')
});
$("#FindCandidatestab").click(function() {
   $("#FindCandidates").show();
   $("#SearchInternships").hide();
   $("input[name='FindCandidates']").trigger('focus')
});



// Clearable text inputs JS
$(".clearable").each(function() {
  
  var $inp = $(this).find("input"),
      $cle = $(this).find(".clearable_clear");

  $inp.on("input", function(){
    $cle.toggle(!!this.value);
	$("input").addClass("pr");
  });
  
  $cle.on("touchstart click", function(e) {
    e.preventDefault();
    $inp.val("").trigger("input");
  });
  
});



// bootstrap tooltip and popover
$(function () {
	// tooltip
	  $('[data-toggle="tooltip"]').tooltip({
  		html: true
		});
		
	// popover
	  $('[data-toggle="popover"]').popover({
  		html: true,
		trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
		
	$(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });
		
		});


	
	// popover click
	$('.popover-click').popover({
		trigger: 'click',
		html: true,
	});
	$('body').on('click', function (e) {
    $('.popover-click').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
	
	$(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
		$(".popover-click").removeClass("active");
    });
	
});
	
	$(".popover-click").click(function() {
   		$(this).toggleClass("active");
	});	
	
	$('.popover-click').on('hide.bs.popover', function () {
  		$(this).removeClass("active");
	})
	$('.popover-click').on('hidden.bs.popover', function () {
  		$(this).removeClass("active");
	})
		
});



// bootstrap popover behave like dropdown
$('.popover-dismiss').popover({
		trigger: 'click',
		html: true,
		template:'<div class="popover dropdown-menu-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body p-0"></div></div>'
	});
	$('body').on('click', function (e) {
    $('.popover-dismiss').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});


// Save List JS
$(document).ready(function() {
  $(".create-list-input").focus(function() {
      $('#CancelListButton').show();
	  $('#CreateListButton').show();
	  $('#DoneListButton').hide();
      //return false;
    });
    
 $('.create-list-input').blur(function(){
    if( !$(this).val() ) {
          $('#CancelListButton').hide();
		  $('#CreateListButton').hide();
		  $('#DoneListButton').show();
    }
});
});

$("#CancelListButton").click(function(){
      $(".create-list-input").val("");
	  $(".create-list-input").trigger('blur')
    });


// Stop Closing Dropdown JS
$(document).on('click', '.savelist-dropdown', function (e) {
  e.stopPropagation();
});	

$(document).on('click', '#CreateNewSaveList', function (e) {
  e.stopPropagation();
});	

$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});	


// Navbar offcanvas JS
$(function () {
  'use strict'

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
	$('.offcanvas-backdrop').toggleClass('show')
	$('.toggler-spin').toggleClass('active')
	$('.close-animate').toggleClass('open')
  })
  
  $('.offcanvas-backdrop').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
	$('.offcanvas-backdrop').toggleClass('show')
	$('.toggler-spin').toggleClass('active')
	$('.close-animate').toggleClass('open')
  })
  
})



// Toast
$("#SaveItem").click(function(){
	$('.custom-toast-cont').addClass('d-block');
	$('#SaveToast').toast('show');
});

$("#SaveToast .close").click(function(){
	$('.custom-toast-cont').removeClass('d-block');
});



// Copy link to clipboard JS

// $("[id^=copylink]").click(function () {
//        var addressValue = $('#copymainlink'+ this.id.match(/\d+/) ).attr("href");
//		var dummy = $('<input>').val(addressValue).appendTo('body').select()
// 		document.execCommand('copy');;
//		$('#copylink'+ this.id.match(/\d+/)).html("<i class='fa fa-link'></i> Link Copied");
//		
//  });
  

$('[id^=copylink]').click(function (e) {
   e.preventDefault();
   var copyText = $(this).attr('href');

   document.addEventListener('copy', function(e) {
      e.clipboardData.setData('text/plain', copyText);
      e.preventDefault();
   }, true);

   document.execCommand('copy');  
   $('#copylink'+ this.id.match(/\d+/)).html("<i class='fa fa-link'></i> Link Copied"); 
 });

  
  

// Copy link to clipboard Modal fix JS
$.fn.modal.Constructor.prototype._enforceFocus = function() {};   


// Removing all :hover stylesheets JS

if ( $(window).width() < 768) {

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}
};
if ( $(window).width() < 768) {
if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}
};
if ( $(window).width() < 768) {
$(document).ready(function() {
    $(':hover').on('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });
});
};


// All CheckBoxes Checked JS
$(document).ready(function () {
    $(".ckbCheckAll").click(function () {
        $(".AllcheckBoxClass").prop('checked', $(this).prop('checked'));
    });
});


// Show More JS
$(document).ready(function(){
                        $(".show-read-more").each(function(){
                            var myStr = $(this).text();
                            var maxLength=$(this).attr('Data-Limit')
                            if($.trim(myStr).length > maxLength){
                                var newStr = myStr.substring(0, maxLength);
                                var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
                                $(this).empty().html(newStr);
                                $(this).append('<span class="read-more-cont">... <a href="javascript:void(0);" class="read-more">more</a></span>');
                                $(this).append('<span class="more-text-r">' + removedStr + '</span>');
                            }
                        });
                        $(".read-more-cont").click(function(){
                            $(this).siblings(".more-text-r").contents().unwrap();
                            $(this).remove();
                        });
                    });













// Textarea Autoresizing JS
textarea = document.querySelector("#TextareaAutoresizing");
        textarea.addEventListener('input', autoResize, false);
     
        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }




