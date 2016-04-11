$(function(){
	$("ul.sub").parent().append("<span></span>");
	$("ul.sub ul").parent().append("<em></em>");
	$('#nav ul').closest('li').hover(function(){
		$(this).find("span").addClass("arrow");
		$(this).find("em").removeClass("arrow");
		$(this).children("ul").stop(true,true).slideDown('normal').show();
		$("#nav ul>li").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});
	},function(){
		$(this).children("ul").stop(true,true).hide();
		$(this).find("span").removeClass("arrow");
		$(this).find("em").addClass("arrow");
	})
});