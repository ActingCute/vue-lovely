(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{330:function(t,e,a){"use strict";var r=a(10),i=a(68)(5),n=!0;"find"in[]&&Array(1).find(function(){n=!1}),r(r.P+r.F*n,"Array",{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(170)("find")},336:function(t,e,a){"use strict";a.r(e);a(175),a(330),a(169),a(171),a(168),a(106);var r=a(23),i=a(37),n=a(172),s={name:"router_after_each",watch:{$route:function(t,e){this.init(),this.SetUrl(t.path),this.CheckLogin(),Object(r.j)("actingcute_anchor")}},computed:{url:function(){return this.$store.getters.web_data.url}},mounted:function(){this.init(),this.SetUrl(),this.CheckLogin()},methods:{CheckLogin:function(){var t=this.Storage.getItem("lovely_user");t&&this.$store.dispatch("SetLoginData",t==Object(n.a)(i.a.name,i.a.password))},init:function(){var t=this.$site.pages.filter(function(t){return"/History/"!=t.regularPath&&"/Harem/"!=t.regularPath&&"/Message/"!=t.regularPath&&"/Home/"!=t.regularPath&&"/Twitter/"!=t.regularPath&&"/"!=t.regularPath});this.$store.dispatch("SetBlogData",t);var e=[],a=[];t.forEach(function(t){console.log("post --",t),Object(r.g)(t.frontmatter.meta).forEach(function(t){var a=e.find(function(e){return e.name==t});if(a)a.num++;else{var r={name:t,num:1};e.push(r)}});var i=Object(r.e)(t.lastUpdated),n=i.split("-")[0];console.log("last_time ---",i,n);var s=a.find(function(t){return t.year==n});if(s)s.post.push(t);else{var o={year:n,post:[t]};a.push(o)}}),this.$store.dispatch("SetBlogTagData",e),this.$store.dispatch("SetBlogHostoryData",a)},SetUrl:function(t){t||(t=Object(r.i)()),this.$store.dispatch("SetWebData",null),this.$store.dispatch("SetWebData",{url:t}),"/"!=t&&this.$store.dispatch("SetCommentData",t),this.$store.dispatch("SetCountData",t)}}},o=a(15),u=Object(o.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("div")},[],!1,null,null,null);e.default=u.exports}}]);