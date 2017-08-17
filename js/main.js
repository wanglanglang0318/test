// JavaScript Document
$(function(){
	//lgoin
	function setBannerHeight(x){
		$('.swiper-container').height($(window).width()/x)
	}
	$(window).bind('resize load',function(){
		var $width = $(window).height()
		//判断手机设备
		if($width<=756){
			//setBannerHeight(0.9);
			pcSwipe =null;
			 var mobileSwipe = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'horizontal',
					autoplay:2000,
					grabCursor: true,
			})
		}else{
			//ipad\ipad pro\pc
			mobileSwipe=null
				setBannerHeight(2.04);
				 var pcSwipe = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'vertical',
					autoplay:2000,
					grabCursor: true,
			})
		}
	})

	//mobile menu
	
	var isPanleShow = false;
	$('.mobile-nav-left-btn').bind('tap',function(){
		if(!isPanleShow){
			//$('#mobilePanle').toggleClass('show-panle')
		$('#mobilePanle').removeClass('hide-panle').addClass('show-panle');
		$('#mobilePanle').height($(window).height());
		/*$('.mobile-nav .mobile-nav-logo').hide()
		$('.mobile-nav .mobile-nav-logo2').show()*/
			isPanleShow=true;
		}else{
			$('#mobilePanle').removeClass('show-panle').addClass('hide-panle');
			isPanleShow=false;
		}
	})
	/*banner swipe*/
	swipePage('banner','isAuto',2000);
	function swipePage(id,isAuto,time){	
		var id=id;
		var jquerySelect = '#'+id+' ';
		var account=$(jquerySelect+'.touchslide-content-item').size()
		var windowWidth = $(window).width();
		$(jquerySelect+'.touchslide-content-item').width(windowWidth);
		if(account<2){return;}
		var wrapTemp=$(jquerySelect+'.tempWrap');
		var htmlStr='';
		var scrollLeft = $(jquerySelect+'.tempWrap').scrollLeft();
		var scrollPage=0;
		var isAuto=isAuto||false;
		var time=time||5000;
		var state='';
		/*生成页码标示小园点*/
		for(var i=0;i<account;i++){
			htmlStr+="<li></li>";
		};
		$(jquerySelect+'.hd').html(htmlStr);
		$(jquerySelect+'.hd li').eq(0).addClass('on');
		$(jquerySelect+'.bd').wrap("<div class='tempWrap'></div>")
		$(jquerySelect+'.bd').width(windowWidth*account);
		/*向右划动*/
		$('#'+id).bind("swipeleft", function() {
			 $(jquerySelect+'.tempWrap').animate({scrollLeft:"+="+windowWidth}, "fast",function(){
				scrollPage = $(jquerySelect+'.tempWrap').scrollLeft()/windowWidth;
				$(jquerySelect+'.hd li').eq(scrollPage).addClass('on').siblings().removeClass('on');
	
			 })
		  });
		  /*向左划动*/
		  $('#'+id).bind("swiperight", function() {
			  $(jquerySelect+'.tempWrap').animate({scrollLeft:"-="+windowWidth}, "fast",function(){
				 scrollPage = $(jquerySelect+'.tempWrap').scrollLeft()/windowWidth;
				 $(jquerySelect+'.hd li').eq(scrollPage).addClass('on').siblings().removeClass('on');
			  })
		  });
		  //自动滚动
		  function swipeCore(){
				 var scrollLeft = $(jquerySelect+'.tempWrap').scrollLeft();
				  if(scrollLeft/windowWidth>=account-1){
					  state='fallBack';				  
				  } else if(scrollLeft<=0){
					  state='goForward';	
				  };
				  switch(state){
					  case 'fallBack':
					  $(jquerySelect+'.tempWrap').animate({scrollLeft:"-="+windowWidth},'slow',function(){
						 $(jquerySelect+'.hd li').eq(scrollLeft/windowWidth-1).addClass('on').siblings().removeClass('on');
					 });
					 break;
					 case 'goForward':
					 $(jquerySelect+'.tempWrap').animate({scrollLeft:"+="+windowWidth},'slow',function(){
						$(jquerySelect+'.hd li').eq(scrollLeft/windowWidth+1).addClass('on').siblings().removeClass('on');
					 });
					 break;
				  };
			}
		  //
		  if(isAuto){
			var aotuSwipe=setInterval(swipeCore,time);
			$('#'+id).hover(function(){
				clearInterval(aotuSwipe)
			},function(){
				setInterval(swipeCore,time)
			})
			
		  };
	};
})
