countStr
=
主要用于字符统计和限制字符长度。

使用方法
_
假设你的网页已经引入了jq
1.引入countStr.js

2.编写dom结构
从外层div开始寻找表单控件，和字数显示的标签
<div class="xx">
	<input type="text">
	<span></span>
</div>

3.使用countStr函数
<script>
	$('xx').countStr({length:'30',input:'input',zishu:'span'})
</script>
length:要限制的字数，可以不写
input:div下要检测的input
zishu:用于显示的标签