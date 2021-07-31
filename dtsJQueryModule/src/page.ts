import $ from "jquery"; // 报错 Could not find a declaration file for module 'jquery'.需要模块定义

$(function () {
  $("body").html("<span style='color: red;'>1212</span>"); // $ 传字符串，ts无法识别，需要声明
  new $.fn.init(); // ts不知道 $下有fn
}); //报错 Cannot find name '$' ts无法识别 $
