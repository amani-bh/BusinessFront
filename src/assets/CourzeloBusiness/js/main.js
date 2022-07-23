/*
  Theme Name: Edubin - LMS Education HTML Template
  Author: Humayun Ahmed
  Author URL: https://themeforest.net/user/pixelcurve
  Support: humayunahmed82@gmail.com
  Description: Creative  HTML5 template.
  Version: 1.0
*/


$(function() {
    
    "use strict";
    
   
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 30) {
            $(".navigation").removeClass("sticky");
            $(".navigation-2 img").attr("src", "../assets/CourzeloBusiness/images/logo.png");
        } else{
            $(".navigation").addClass("sticky");
            $(".navigation-2 img").attr("src", "../assets/CourzeloBusiness/images/logo.png");
        }
    });
    
    
    
   
    
    //for scrolling at job offer dashboard
    
    $(window).scroll(function(e){ 
        var $el = $('.right-side'); 
        var $el2 = $('.sidebar'); 
        var isPositionFixed = ($el.css('position') == 'fixed');
        if ($(this).scrollTop() > 120 && !isPositionFixed){ 
          $el.css({'position': 'fixed', 'top': '80px','height':'285px' ,'right':'15px',
          'width':'50%'}); 
          $el2.css({'top':'90px'}); 
        }
        else if($(this).scrollTop() < 120 ){ 
          $el.css({'position': 'relative','height':'285px' ,'right':'0px','width':'100%','top':'1px'}); 
          $el2.css({'top':'170px'}); 
        }
        
      });
  
      
      

     


      
      

});


