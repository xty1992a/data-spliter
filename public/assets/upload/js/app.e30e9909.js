(function(e){function t(t){for(var r,u,i=t[0],c=t[1],o=t[2],p=0,f=[];p<i.length;p++)u=i[p],Object.prototype.hasOwnProperty.call(a,u)&&a[u]&&f.push(a[u][0]),a[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,o||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(r=!1)}r&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},s=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/assets/upload/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var o=0;o<i.length;o++)t(i[o]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1c8a":function(e,t,n){"use strict";var r=n("6fc2"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app"},[n("Uploader",{model:{value:e.path,callback:function(t){e.path=t},expression:"path"}}),n("video",{attrs:{src:e.path,controls:""}})],1)},s=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-button",{staticClass:"uploader",attrs:{size:e.size,type:e.btnType}},[n("span",[e._v(e._s(e.text))]),n("input",{attrs:{type:"file"},on:{change:e.upload}})])},i=[],c=(n("96cf"),n("1da1")),o=(n("4160"),n("b64b"),n("159b"),n("d3b7"),n("5530")),l=n("bc3a"),p=n.n(l),f=n("5c96"),d=n.n(f);p.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),p.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var h={isSuccess:function(e){return e.data.success},toast:!0,loading:!0};function b(e){var t=e.method,n=void 0===t?"post":t,r=e.data,a=e.url,s=e.headers,u=void 0===s?{}:s,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i=Object(o["a"])(Object(o["a"])({},h),i),new Promise((function(e,t){i.loading&&f["Loading"].service("加载中...");var s=null;r.params&&(s=r.params,delete r.params),p()({method:n,url:a,data:r,params:s,headers:u}).then((function(t){i.loading&&f["Loading"].service().close(),i.isSuccess(t)?e({success:!0,message:t.data.message||"操作成功!",data:t.data.data||t.data,res:t.data}):(i.toast&&f["Message"].error(t.data.message||"后端操作失败!"),e({success:!1,message:t.data.message||"后端操作失败!",data:t.data,res:t.data}))})).catch((function(t){console.log(t),i.loading&&f["Loading"].service().close(),f["Message"].error("网络故障"),e({success:!1,message:"网络故障",data:t,res:{}})}))}))}function m(e){if(!(e instanceof FormData)){var t=e;e=new FormData,Object.keys(t).forEach((function(n){e.append(n,t[n])}))}return e}var v=function(e){return b({url:"/api/check",data:e})},g=function(e){return b({url:"/api/uploadChunk",data:m(e),method:"POST",headers:{}})},k=function(e){return b({url:"/api/complete",data:e})},y=(n("4de4"),n("d81d"),n("13d5"),n("fb6a"),n("45fc"),n("b0c0"),n("3ca3"),n("ddb0"),n("2909")),w=n("d4ec"),O=n("bee2"),j=n("ade3"),x=n("69a0"),S=n.n(x),z=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,M={chunkSize:1048576},P=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(w["a"])(this,e),Object(j["a"])(this,"state",{md5:"",chunkList:[],chunkSize:0,fileSize:0,taskMap:{}}),this.$file=t,this.state.fileSize=t.size,this.$options=Object(o["a"])(Object(o["a"])({},M),n)}return Object(O["a"])(e,[{key:"taskIds",get:function(){var e=this;return Object.keys(this.state.taskMap).filter((function(t){return!e.state.taskMap[t]}))}}]),Object(O["a"])(e,[{key:"upload",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.check();case 2:if(t=e.sent,t.success){e.next=5;break}return e.abrupt("return",t);case 5:return t.data.forEach((function(e){return r.state.taskMap[e]=!0})),e.next=8,this.doUpload();case 8:if(n=e.sent,n.success){e.next=11;break}return e.abrupt("return",n);case 11:return e.abrupt("return",k({name:this.$file.name,size:this.$file.size,type:this.$file.type,md5:this.state.md5,chunkSize:this.state.chunkSize}));case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"doUpload",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.taskIds,e.next=3,Promise.all(t.map((function(e){return r.uploadChunk(e)})));case 3:if(n=e.sent,!n.some((function(e){return!e.success}))){e.next=6;break}return e.abrupt("return",{success:!1,message:"上传失败,请稍后重试!"});case 6:return e.abrupt("return",{success:!0,message:"所有分块上传成功!"});case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"uploadChunk",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={file:new Blob([this.state.chunkList[t]]),total:this.state.chunkSize,md5:this.state.md5,id:t},e.abrupt("return",g(n));case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"error",value:function(e){return console.log(e),{success:!1,message:e}}},{key:"check",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.fileMd5(this.$file);case 2:if(t=e.sent,this.state.chunkSize=this.state.chunkList.length,this.state.md5=t.data,this.state.taskMap=Object(y["a"])(Array(this.state.chunkSize)).reduce((function(e,t,n){return Object(o["a"])(Object(o["a"])({},e),{},Object(j["a"])({},n,!1))}),{}),t.success){e.next=8;break}return e.abrupt("return",this.error("md5 解析失败!"));case 8:return e.abrupt("return",v({md5:t.data}));case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"fileMd5",value:function(e){var t=this;return new Promise((function(n){var r=t.$options.chunkSize,a=t.state.chunkList,s=Math.ceil(e.size/r),u=0,i=new S.a.ArrayBuffer,c=new FileReader;function o(){var t=u*r,n=t+r>=e.size?e.size:t+r;c.readAsArrayBuffer(z.call(e,t,n))}c.onload=function(e){if(console.log("read chunk nr",u+1,"of",s),i.append(e.target.result),a.push(e.target.result),u++,u>=s)return n({success:!0,data:i.end()});o()},c.onerror=function(){n({success:!1,message:"oops, something went wrong."})},o()}))}}]),e}(),_={name:"Uploader",components:{},props:{text:{type:String,default:"上传图片"},value:String,size:{type:String,default:"small"},btnType:String},data:function(){return{}},created:function(){},methods:{upload:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var r,a,s,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.target.files||e.dataTransfer.files,console.log("upload ",r),r.length){n.next=5;break}return e.target.value=null,n.abrupt("return");case 5:return a=r[0],s=new P(a,{}),n.next=9,s.upload();case 9:if(u=n.sent,e.target.value=null,u.success){n.next=13;break}return n.abrupt("return");case 13:console.log(u),t.$emit("input",u.data.path);case 15:case"end":return n.stop()}}),n)})))()}},computed:{}},R=_,$=(n("1c8a"),n("2877")),L=Object($["a"])(R,u,i,!1,null,null,null),T=L.exports,F={name:"app",props:{},components:{Uploader:T},data:function(){return{path:""}},computed:{},methods:{},watch:{},created:function(){},mounted:function(){},beforeDestroy:function(){}},C=F,U=(n("b20d"),Object($["a"])(C,a,s,!1,null,null,null)),A=U.exports,E=n("2f62");r["default"].use(E["a"]);var B=new E["a"].Store({state:{},mutations:{},actions:{},modules:{}});n("a4b1"),n("0fae");r["default"].use(d.a),r["default"].config.productionTip=!1,new r["default"]({store:B,render:function(e){return e(A)}}).$mount("#app")},"6fc2":function(e,t,n){},a4b1:function(e,t,n){},b20d:function(e,t,n){"use strict";var r=n("bf2a"),a=n.n(r);a.a},bf2a:function(e,t,n){}});
//# sourceMappingURL=app.e30e9909.js.map