import{ɵ as g,a as c,b as l,g as r,f as a,p as _,e as m,h as p,l as P,q as h,r as u,j as f,A as y,D as b,i as d,s as C,M as v,t as B,S as M,u as w,v as D,w as $,x}from"./index-B_SVE7tL.js";let O=(()=>{var t;class o{}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["app-blog-post"]],inputs:{post:"post"},standalone:!0,features:[c],decls:7,vars:6,consts:[[1,"blog-post"],[1,"author"],[3,"content"]],template:function(e,n){e&1&&(l(0,"article",0)(1,"h1"),r(2),a(),l(3,"section",1),r(4),_(5,"date"),a(),m(6,"analog-markdown",2),a()),e&2&&(p(2),P(n.post.attributes.title),p(2),h("",u(5,4,n.post.attributes.date)," - ",n.post.attributes.author,""),p(2),f("content",n.post.content))},dependencies:[y,b],styles:[`.blog-post[_ngcontent-%COMP%] {
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
}`]}),o})();function T(t,o){t&1&&m(0,"app-blog-post",0),t&2&&f("post",o)}const S={meta:[{property:"og:type",content:"article"}]};let k=(()=>{var t;class o{constructor(){this.title=d(C),this.meta=d(v),this.post$=B(),this.destroyed$=new M}ngOnInit(){this.post$.pipe(w(this.destroyed$)).subscribe(({attributes:e})=>{this.title.setTitle(e.title),(e.meta??[]).forEach(n=>{this.meta.updateTag(n)})})}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["app-blog-post-page"]],standalone:!0,features:[c],decls:2,vars:3,consts:[[3,"post"]],template:function(e,n){if(e&1&&(D(0,T,1,1,"app-blog-post",0),_(1,"async")),e&2){let i;$(0,(i=u(1,1,n.post$))?0:-1,i)}},dependencies:[x,O],encapsulation:2}),o})();export{k as default,S as routeMeta};
