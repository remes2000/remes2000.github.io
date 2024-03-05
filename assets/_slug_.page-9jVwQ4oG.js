import{ɵ as d,a as c,b as l,g as r,f as a,p as _,e as m,h as p,l as f,q as h,r as u,j as P,A as y,D as b,i as g,s as B,M as C,t as v,S as M,u as w,v as D,w as T,x as $}from"./index-CWQK0pPX.js";let x=(()=>{var t;class n{}return t=n,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=d({type:t,selectors:[["app-blog-post"]],inputs:{post:"post"},standalone:!0,features:[c],decls:7,vars:6,consts:[[1,"blog-post"],[1,"author"],[3,"content"]],template:function(e,o){e&1&&(l(0,"article",0)(1,"h1"),r(2),a(),l(3,"section",1),r(4),_(5,"date"),a(),m(6,"analog-markdown",2),a()),e&2&&(p(2),f(o.post.attributes.title),p(2),h("",u(5,4,o.post.attributes.date)," - ",o.post.attributes.author,""),p(2),P("content",o.post.content))},dependencies:[y,b],styles:[`.blog-post[_ngcontent-%COMP%] {
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
}`]}),n})();function O(t,n){t&1&&m(0,"app-blog-post",0),t&2&&P("post",n)}const F={meta:[{property:"og:type",content:"article"}]};let S=(()=>{var t;class n{constructor(){this.title=g(B),this.meta=g(C),this.post$=v(),this.destroyed$=new M}ngOnInit(){this.post$.pipe(w(this.destroyed$)).subscribe(({attributes:e})=>{this.title.setTitle(e.title),(e.meta??[]).forEach(o=>{this.meta.updateTag(o)})})}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}}return t=n,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=d({type:t,selectors:[["app-blog-post-page"]],standalone:!0,features:[c],decls:2,vars:3,consts:[[3,"post"]],template:function(e,o){if(e&1&&(D(0,O,1,1,"app-blog-post",0),_(1,"async")),e&2){let i;T(0,(i=u(1,1,o.post$))?0:-1,i)}},dependencies:[$,x],encapsulation:2}),n})();export{S as default,F as routeMeta};
