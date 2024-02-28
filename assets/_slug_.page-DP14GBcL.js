import{ɵ as g,a as _,b as i,g as r,f as s,o as c,e as d,h as p,p as P,q as f,r as m,j as u,A as B,D as v,s as C,t as b,u as y,v as h}from"./index-BYZHlI8Z.js";let M=(()=>{var t;class o{}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["app-blog-post"]],inputs:{post:"post"},standalone:!0,features:[_],decls:7,vars:6,consts:[[1,"blog-post"],[1,"author"],[3,"content"]],template:function(e,n){e&1&&(i(0,"article",0)(1,"h1"),r(2),s(),i(3,"section",1),r(4),c(5,"date"),s(),d(6,"analog-markdown",2),s()),e&2&&(p(2),P(n.post.attributes.title),p(2),f("",m(5,4,n.post.attributes.date)," - ",n.post.attributes.author,""),p(2),u("content",n.post.content))},dependencies:[B,v],styles:[`.blog-post[_ngcontent-%COMP%] {
  max-width: 90rem;
  font-size: 1.6rem;
  line-height: 1.75;
  margin: 0 auto;
  padding: 0 4rem;
}
.blog-post[_ngcontent-%COMP%]   .author[_ngcontent-%COMP%] {
  margin: 1.5rem 0;
  font-size: 1.2rem;
}`]}),o})();function w(t,o){t&1&&d(0,"app-blog-post",0),t&2&&u("post",o)}let F=(()=>{var t;class o{constructor(){this.post$=C()}}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["app-blog-post-page"]],standalone:!0,features:[_],decls:2,vars:3,consts:[[3,"post"]],template:function(e,n){if(e&1&&(b(0,w,1,1,"app-blog-post",0),c(1,"async")),e&2){let l;y(0,(l=m(1,1,n.post$))?0:-1,l)}},dependencies:[h,M],encapsulation:2}),o})();export{F as default};
