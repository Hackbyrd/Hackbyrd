$(function(){$(".empty-space").css("height",2.5555*$(window).height()),$("#jc-logo").css("top",$(window).scrollTop()-2*$(window).height()),$(".jonathan_path").css("stroke-dashoffset","1000"),$(".jonathan_path").css("stroke-dasharray","1000");var o=$(".jonathan_path").css("stroke-dashoffset"),s=0;$(window).scroll(function(){if($(window).scrollTop()>0&&$(window).height()+$(window).scrollTop()<$("html").height()){$("#jc-logo").css("position","absolute"),$(".jonathan-chen-svg").css("position","absolute");var n=36*($(window).scrollTop()/($("html").height()-$(window).height())),t=parseInt(o,10),h=n*(t/100);$(".jonathan_path").css("stroke-dashoffset",t-h);var i=$(window).scrollTop()-2*$(window).height(),w=$(window).scrollTop()-1.3*$(window).height(),c=2*$(window).scrollTop();$(window).scrollTop()<1.7*$(window).height()?s-$(window).scrollTop()<0?($("#jc-logo").css("top",i+c),$(window).scrollTop()>=1.3*$(window).height()?$(".jonathan-chen-svg").css("top",w+c):$(".jonathan-chen-svg").css("top",c)):($("#jc-logo").css("top",i+c),$(window).scrollTop()<=1.7*$(window).height()&&$(window).scrollTop()>1.3*$(window).height()?$(".jonathan-chen-svg").css("top",w+c):$(".jonathan-chen-svg").css("top",c)):($("#jc-logo").css("top",i+c+1.7*$(window).height()-$(window).scrollTop()),$(".jonathan-chen-svg").css("top",w+c+1.7*$(window).height()-$(window).scrollTop())),s=$(window).scrollTop()}else $(window).scrollTop()>0?($(".jonathan_path").css("stroke-dashoffset",0),$("#jc-logo").css({position:"fixed",top:-$(window).height()/3.3}),$(".jonathan-chen-svg").css({position:"fixed",top:$(window).height()/2.53})):($(".jonathan_path").css("stroke-dashoffset","1000"),$("#jc-logo").css("top",-(2*$(window).height())),$(".jonathan-chen-svg").css("top",0))}),$("a").click(function(o){o.preventDefault(),$("#corner").click();var s=$(this);return window.setTimeout(function(){null!=s.attr("href")&&(window.location.href=s.attr("href"))},1e3),!1})});