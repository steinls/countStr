(function ($) {
	var methods = {
		init: function (options) {
			var settings = $.extend({
				length:'',
				child:'zishu',
				input:'input'
			}, options);
			console.log(settings)
			/**
			 * [getLength 获取字符串的字节数]
			 * @param  {[String]} str [待处理字符串]
			 * @return {[Number]} iLength [字节数]
			 */
			function getLength(str){
				var iLength = 0;
				for(var i = 0;i<str.length;i++){
					iLength+=str.charCodeAt(i)>255?2:1;
				}
				return iLength;
			}
			/**
			 * [cutStr 截除超出限制的字符串]
			 * @param  {[String]} str [待处理字符串]
			 * @param  {[Number]} len [要限制的字节长度]
			 * @return {[String]} str [已截除的字符串]
			 */
			function cutStr(str,len){
				var curStr = "";
				for(var i = 0;i<str.length;i++){
					curStr += str.charAt(i);
					if(getLength(curStr )>len){
						str = str.substring(0,i);
						return str;
					}
				}
				return str;
			}
			return this.each(function () {
				var text = $(this).find(settings.input);
				var zishu = $(this).find(settings.child);
				$(this).removeData();
				if(zishu.length){
					$(this).data('countStr',{
						child:settings.child,
						cont:zishu.html(),
						input:settings.input
					});
					zishu.html('0/'+settings.length+'字');
				}else{
					$(this).data('countStr',{
						input:settings.input
					});
				}
				var set = function(e){
					if(e.keyCode === 37||e.keyCode === 40||e.keyCode === 39||e.keyCode === 38){
						console.log('终止')
						return false;
					}
					setTimeout(function(args) {
						if(getLength(text.val())>settings.length){
							if(settings.length){
								text.val(cutStr(text.val(),settings.length));
							}
							if(zishu.length){
								zishu.html(settings.length+'/'+settings.length+'字');
							}
						}
						if(zishu.length){
							zishu.html(getLength(text.val())+'/'+settings.length+'字');
						}
					}, 20)
				}
				text.on('keyup.countStr',set);
				text.on('paste.countStr',set);
				text.on('change.countStr',set);
			});
		},
		remove: function () {
			return this.each(function(){
				var data = $(this).data('countStr')||'';
				if(data){
					var text = $(this).find(data.input);
					text.off('keyup.countStr paste.countStr change.countStr');
					if(data.child){
						$(this).find(data.child).html(data.cont);
					}
				}
			});
		}
	};
	$.fn.countStr = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + 'does not exist on jQuery.countStr');
		}
	};

})(jQuery);