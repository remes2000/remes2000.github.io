import{ɵ as u,a as g,b as l,g as d,f as o,p as h,e as f,h as i,l as w,q as M,r as y,j as b,A as C,D as $,i as _,s as x,M as O,t as T,S as P,u as j,v,w as S,x as k}from"./index-BbEg6gFm.js";const s=class s{};s.ɵfac=function(t){return new(t||s)},s.ɵcmp=u({type:s,selectors:[["app-blog-post"]],inputs:{post:"post"},standalone:!0,features:[g],decls:7,vars:6,consts:[[1,"blog-post"],[1,"author"],[3,"content"]],template:function(t,n){t&1&&(l(0,"article",0)(1,"h1"),d(2),o(),l(3,"section",1),d(4),h(5,"date"),o(),f(6,"analog-markdown",2),o()),t&2&&(i(2),w(n.post.attributes.title),i(2),M("",y(5,4,n.post.attributes.date)," - ",n.post.attributes.author,""),i(2),b("content",n.post.content))},dependencies:[C,$],styles:[`.blog-post[_ngcontent-%COMP%] {
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
}`]});let p=s;function A(r,e){r&1&&f(0,"app-blog-post",0),r&2&&b("post",e)}const F={meta:[{property:"og:type",content:"article"}]},a=class a{constructor(){this.title=_(x),this.meta=_(O),this.post$=T(),this.destroyed$=new P}ngOnInit(){this.post$.pipe(j(this.destroyed$)).subscribe(({attributes:e})=>{this.title.setTitle(e.title),(e.meta??[]).forEach(t=>{this.meta.updateTag(t)})})}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}};a.ɵfac=function(t){return new(t||a)},a.ɵcmp=u({type:a,selectors:[["app-blog-post-page"]],standalone:!0,features:[g],decls:2,vars:3,consts:[[3,"post"]],template:function(t,n){if(t&1&&(v(0,A,1,1,"app-blog-post",0),h(1,"async")),t&2){let c;S((c=y(1,1,n.post$))?0:-1,c)}},dependencies:[k,p],encapsulation:2});let m=a;export{m as default,F as routeMeta};
