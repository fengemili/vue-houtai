(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e8a5e0fc"],{2017:function(t,e,o){"use strict";o("cafe")},"9ed6":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.rooter,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[t._v("Login Form")])]),o("el-form-item",{attrs:{prop:"account"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),o("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.rooter.account,callback:function(e){t.$set(t.rooter,"account",e)},expression:"rooter.account"}})],1),o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),o("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}},model:{value:t.rooter.password,callback:function(e){t.$set(t.rooter,"password",e)},expression:"rooter.password"}}),o("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("Login")]),o("div",{staticClass:"tips"},[o("span",{staticStyle:{"margin-right":"20px"}},[t._v("username: admin")]),o("span",[t._v(" password: any")])])],1)],1)},r=[],n=o("61f7"),a={name:"Login",data:function(){var t=function(t,e,o){Object(n["b"])(e)?o():o(new Error("Please enter the correct user name"))},e=function(t,e,o){e.length<6?o(new Error("The password can not be less than 6 digits")):o()};return{rooter:{account:"admin",password:"123456"},loginRules:{account:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},methods:{showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this,e=this.rooter;this.$refs.loginForm.validate((function(o){if(!o)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("user/login",e).then((function(){t.$router.push({path:t.redirect||"/"}),t.loading=!1})).catch((function(){t.loading=!1}))}))}}},i=a,c=(o("2017"),o("b515"),o("2877")),l=Object(c["a"])(i,s,r,!1,null,"67cefc77",null);e["default"]=l.exports},b515:function(t,e,o){"use strict";o("c0bc")},c0bc:function(t,e,o){},cafe:function(t,e,o){}}]);