(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d237ae3"],{fbc4:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"fans-container"},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),e("el-breadcrumb-item",[t._v("评论管理")])],1)],1),e("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"粉丝列表",name:"first"}},[e("el-row",{attrs:{gutter:10}},t._l(t.fans,(function(a,n){return e("el-col",{key:n,staticClass:"fansItem",attrs:{sm:6,md:6,lg:4}},[e("div",{staticClass:"bg-purple"},[e("el-image",{staticStyle:{height:"100px"},attrs:{src:a.photo,fit:"cover"}}),e("p",{staticClass:"name"},[t._v(t._s(a.name))])],1)])})),1),e("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total_count,"page-size":t.per_page,"current-page":t.page},on:{"update:currentPage":function(a){t.page=a},"update:current-page":function(a){t.page=a},"current-change":t.pageChange}})],1),e("el-tab-pane",{attrs:{label:"粉丝画像",name:"second"}},[e("div",{ref:"fansProfilePhoto",staticStyle:{width:"600px",height:"400px"},attrs:{id:"main"}})])],1)],1)],1)},s=[],r=e("164e"),i=e.n(r),o=e("b775"),c=function(t){return Object(o["a"])({method:"GET",url:"/mp/v1_0/followers",params:t})},l={name:"fansIndex",props:{},components:{},data:function(){return{page:2,per_page:20,total_count:261,fans:[],activeName:"first"}},computed:{},watch:{},created:function(){this.onFansListManage(this.page)},methods:{onFansListManage:function(t){var a=this;c({page:t,per_page:this.per_page}).then((function(t){console.log(t);var e=t.data.data,n=(e.page,e.per_page,e.total_count),s=e.results;a.total_count=n,a.fans=s}))},pageChange:function(t){this.onFansListManage(t)}},mounted:function(){var t=i.a.init(document.getElementById("main")),a={title:{text:"ECharts 入门示例"},tooltip:{},legend:{data:["销量"]},xAxis:{data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},yAxis:{},series:[{name:"销量",type:"bar",data:[5,20,36,10,10,20]}]};t.setOption(a)},beforeDestroy:function(){}},p=l,u=e("2877"),d=Object(u["a"])(p,n,s,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d237ae3.784e242f.js.map