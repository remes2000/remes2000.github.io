import{ɵ as u,R as h,a as e,d as _,f as o,e as i,h as l,x as M,g as r,y as f,k as d,z as C,B as P,C as O,E as y}from"./index-DEgLQg2h.js";const b=p=>["/blog",p],s=class s{};s.ɵfac=function(t){return new(t||s)},s.ɵcmp=u({type:s,selectors:[["app-blog-post-feature"]],inputs:{post:"post"},decls:8,vars:8,consts:[[3,"routerLink"],["alt","Post thumbnail",1,"feature-image",3,"src"],[1,"content"],[1,"title"],[1,"subtitle"]],template:function(t,a){t&1&&(e(0,"a",0)(1,"section"),_(2,"img",1),e(3,"div",2)(4,"header",3),o(5),i(),e(6,"p",4),o(7),i()()()()),t&2&&(l("routerLink",M(6,b,a.post.slug)),r(),f("--img","url("+a.post.attributes.thumbnail+")"),r(),l("src",a.post.attributes.thumbnail,C),r(3),d(a.post.attributes.title),r(2),d(a.post.attributes.subtitle))},dependencies:[h],styles:[`a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: inherit;
}

section[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: min-content 1fr;
  border-radius: 1.2rem;
}
section[_ngcontent-%COMP%]   .feature-image[_ngcontent-%COMP%] {
  width: 16rem;
  height: 10rem;
  margin-right: 1.5rem;
  border-radius: 1.2rem;
}
section[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {
  padding: 1.5rem 0.3rem;
}
section[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {
  font-size: 1.5rem;
}
@media screen and (max-width: 500px) {
  section[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  section[_ngcontent-%COMP%]   .feature-image[_ngcontent-%COMP%] {
    width: 100%;
    height: auto;
  }
}`]});let g=s;const w=(p,n)=>n.slug;function x(p,n){if(p&1&&(e(0,"li"),_(1,"app-blog-post-feature",2),i()),p&2){const t=n.$implicit;r(),l("post",t)}}const v={title:"Michał Nieruchalski",meta:[{name:"description",content:"My blog about tech"},{property:"og:title",content:"Michał Nieruchalski"},{property:"og:description",content:"My blog about tech"},{property:"og:image",content:"https://nieruchalski.dev/main-featured-image.jpg"},{property:"og:url",content:"https://nieruchalski.dev"},{property:"og:type",content:"website"}]},c=class c{constructor(){this.posts=P().toSorted(({attributes:{date:n}},{attributes:{date:t}})=>new Date(t).getTime()-new Date(n).getTime())}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=u({type:c,selectors:[["app-blog-index-page"]],decls:14,vars:0,consts:[[1,"wrapper"],[1,"funny-head"],[3,"post"]],template:function(t,a){t&1&&(e(0,"div",0)(1,"header")(2,"h1"),o(3,"Hello "),e(4,"span",1),o(5,"ヽ(•‿•)ノ"),i()(),e(6,"p"),o(7,"Nice to see you! Enjoy!"),i()(),e(8,"article")(9,"h2"),o(10,"Recent posts"),i(),e(11,"ul"),O(12,x,2,1,"li",null,w),i()()()),t&2&&(r(12),y(a.posts))},dependencies:[g],styles:[`.wrapper[_ngcontent-%COMP%] {
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 4rem;
}
@media screen and (max-width: 500px) {
  .wrapper[_ngcontent-%COMP%] {
    padding: 0 2.4rem;
  }
}
.wrapper[_ngcontent-%COMP%]    > article[_ngcontent-%COMP%]    > ul[_ngcontent-%COMP%] {
  margin-top: 1.5rem;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.wrapper[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {
  margin: 5rem 0;
  font-size: 1.8rem;
}
.wrapper[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 1.2rem;
}
.wrapper[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%]   .funny-head[_ngcontent-%COMP%] {
  white-space: nowrap;
  line-height: 2;
}
@media screen and (max-width: 400px) {
  .wrapper[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {
    text-align: center;
  }
}`]});let m=c;export{m as default,v as routeMeta};
