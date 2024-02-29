import{ɵ as g,a as d,b as l,g as r,f as a,o as _,e as c,h as p,p as P,q as f,r as m,j as u,A as h,D as y,i as b,s as B,t as v,S as C,u as w,v as M,w as D,x as $}from"./index-BxuCqfJp.js";let T=(()=>{var t;class o{}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["app-blog-post"]],inputs:{post:"post"},standalone:!0,features:[d],decls:7,vars:6,consts:[[1,"blog-post"],[1,"author"],[3,"content"]],template:function(e,n){e&1&&(l(0,"article",0)(1,"h1"),r(2),a(),l(3,"section",1),r(4),_(5,"date"),a(),c(6,"analog-markdown",2),a()),e&2&&(p(2),P(n.post.attributes.title),p(2),f("",m(5,4,n.post.attributes.date)," - ",n.post.attributes.author,""),p(2),u("content",n.post.content))},dependencies:[h,y],styles:[`.blog-post[_ngcontent-%COMP%] {
  max-width: 90rem;
  font-size: 1.6rem;
  line-height: 1.75;
  margin: 0 auto;
  padding: 0 4rem;
}
.blog-post[_ngcontent-%COMP%]   .author[_ngcontent-%COMP%] {
  margin: 1.5rem 0;
  font-size: 1.2rem;
}`]}),o})();function O(t,o){t&1&&c(0,"app-blog-post",0),t&2&&u("post",o)}let x=(()=>{var t;class o{constructor(){this.title=b(B),this.post$=v(),this.destroyed$=new C}ngOnInit(){this.post$.pipe(w(this.destroyed$)).subscribe(({attributes:e})=>{this.title.setTitle(e.title)})}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}}return t=o,t.ɵfac=function(e){return new(e||t)},t.ɵcmp=g({type:t,selectors:[["app-blog-post-page"]],standalone:!0,features:[d],decls:2,vars:3,consts:[[3,"post"]],template:function(e,n){if(e&1&&(M(0,O,1,1,"app-blog-post",0),_(1,"async")),e&2){let i;D(0,(i=m(1,1,n.post$))?0:-1,i)}},dependencies:[$,T],encapsulation:2}),o})();export{x as default};
