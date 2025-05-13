import{ɵ as g,A as b,D as w,a as l,f as d,e as o,o as h,d as u,g as i,k as M,p as C,q as f,h as y,i as m,r as $,M as O,s as T,S as x,t as P,u as k,v,w as j}from"./index-DEgLQg2h.js";const s=class s{};s.ɵfac=function(t){return new(t||s)},s.ɵcmp=g({type:s,selectors:[["app-blog-post"]],inputs:{post:"post"},decls:7,vars:6,consts:[[1,"blog-post"],[1,"author"],[3,"content"]],template:function(t,n){t&1&&(l(0,"article",0)(1,"h1"),d(2),o(),l(3,"section",1),d(4),h(5,"date"),o(),u(6,"analog-markdown",2),o()),t&2&&(i(2),M(n.post.attributes.title),i(2),C("",f(5,4,n.post.attributes.date)," - ",n.post.attributes.author,""),i(2),y("content",n.post.content))},dependencies:[b,w],styles:[`.blog-post[_ngcontent-%COMP%] {
  max-width: 90rem;
  font-size: 1.6rem;
  line-height: 1.75;
  margin: 0 auto;
  padding: 0 4rem;
}
@media screen and (max-width: 500px) {
  .blog-post[_ngcontent-%COMP%] {
    padding: 0 2.4rem;
  }
}
.blog-post[_ngcontent-%COMP%]   .author[_ngcontent-%COMP%] {
  margin: 1.5rem 0;
  font-size: 1.2rem;
}`]});let p=s;function A(c,e){c&1&&u(0,"app-blog-post",0),c&2&&y("post",e)}const I={meta:[{property:"og:type",content:"article"}]},a=class a{constructor(){this.title=m($),this.meta=m(O),this.post$=T(),this.destroyed$=new x}ngOnInit(){this.post$.pipe(P(this.destroyed$)).subscribe(({attributes:e})=>{this.title.setTitle(e.title),(e.meta??[]).forEach(t=>{this.meta.updateTag(t)})})}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}};a.ɵfac=function(t){return new(t||a)},a.ɵcmp=g({type:a,selectors:[["app-blog-post-page"]],decls:2,vars:3,consts:[[3,"post"]],template:function(t,n){if(t&1&&(v(0,A,1,1,"app-blog-post",0),h(1,"async")),t&2){let r;j((r=f(1,1,n.post$))?0:-1,r)}},dependencies:[k,p],encapsulation:2});let _=a;export{_ as default,I as routeMeta};
