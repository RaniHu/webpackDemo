/**
 * Created by Administrator on 2017/3/6 0006.
 */
//引用sub.js模块
var sub=require('./sub.js');
var $=require("jquery");
require('./header.js');

//引入css模块
require('../css/style.scss');

var app=document.createElement("h1");
app.innerHTML="l am h1 tag!";
app.appendChild(sub());
document.body.appendChild(app);


/**
 * Created by Administrator on 2017/3/8 0008.
 */
