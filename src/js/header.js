/**
 * Created by Administrator on 2017/3/7 0007.
 */
//引入css模块
require('../css/header.scss');

$(function(){
    var headerModule={
        //基本配置
        config:{
            headerDom:"#header",
            fixedTop:60,
            fixedClass:"header-fixed"
        },
        //创建dom
        createHeader:function(){
            var headerTag="<div id=header><ul><li class='active'>首页</li><li>博客</li><li>邮箱</li></ul></div>";
            $(document.body).append(headerTag);
        },

        //切换class
        headerFixed:function(){
            if($(window).scrollTop()>headerModule.config.fixedTop){
                headerModule.config.headerDom.addClass(headerModule.config.fixedClass);
            }else{
                headerModule.config.headerDom.removeClass(headerModule.config.fixedClass);
            }
        },
        //菜单切换
        navActive: function () {
            $("#header").find("ul li:first").addClass("active");
            $("#header").find("ul li").click(function () {
                $("#header").find("ul li").removeClass("active");
                $(this).addClass("active");
            })
        },

        init:function(){
            headerModule.createHeader();
            headerModule.navActive();
            $(window).on("scroll",function(){
                headerModule.headerFixed();
            })
        }
    };
    headerModule.init();
    module.exports=null;

})();
/**
 * Created by Administrator on 2017/3/8 0008.
 */
/**
 * Created by Administrator on 2017/3/8 0008.
 */
