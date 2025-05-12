import{ɵ as u,a as _,b as e,e as h,g as o,f as r,j as l,y as f,h as i,z as M,l as d,R as C,B as P,C as O,E as y,F as b}from"./index-BbEg6gFm.js";const w=p=>["/blog",p],s=class s{};s.ɵfac=function(t){return new(t||s)},s.ɵcmp=u({type:s,selectors:[["app-blog-post-feature"]],inputs:{post:"post"},standalone:!0,features:[_],decls:8,vars:8,consts:[[3,"routerLink"],["alt","Post thumbnail",1,"feature-image",3,"src"],[1,"content"],[1,"title"],[1,"subtitle"]],template:function(t,a){t&1&&(e(0,"a",0)(1,"section"),h(2,"img",1),e(3,"div",2)(4,"header",3),o(5),r(),e(6,"p",4),o(7),r()()()()),t&2&&(l("routerLink",f(6,w,a.post.slug)),i(),M("--img","url("+a.post.attributes.thumbnail+")"),i(),l("src",a.post.attributes.thumbnail,P),i(3),d(a.post.attributes.title),i(2),d(a.post.attributes.subtitle))},dependencies:[C],styles:[`a[_ngcontent-%COMP%] {
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
}`]});let g=s;const x=(p,n)=>n.slug;function k(p,n){if(p&1&&(e(0,"li"),h(1,"app-blog-post-feature",2),r()),p&2){const t=n.$implicit;i(),l("post",t)}}const F={title:"Michał Nieruchalski",meta:[{name:"description",content:"My blog about tech"},{property:"og:title",content:"Michał Nieruchalski"},{property:"og:description",content:"My blog about tech"},{property:"og:image",content:"https://nieruchalski.dev/main-featured-image.jpg"},{property:"og:url",content:"https://nieruchalski.dev"},{property:"og:type",content:"website"}]},c=class c{constructor(){this.posts=O().toSorted(({attributes:{date:n}},{attributes:{date:t}})=>new Date(t).getTime()-new Date(n).getTime())}};c.ɵfac=function(t){return new(t||c)},c.ɵcmp=u({type:c,selectors:[["app-blog-index-page"]],standalone:!0,features:[_],decls:14,vars:0,consts:[[1,"wrapper"],[1,"funny-head"],[3,"post"]],template:function(t,a){t&1&&(e(0,"div",0)(1,"header")(2,"h1"),o(3,"Hello "),e(4,"span",1),o(5,"ヽ(•‿•)ノ"),r()(),e(6,"p"),o(7,"Nice to see you! Enjoy!"),r()(),e(8,"article")(9,"h2"),o(10,"Recent posts"),r(),e(11,"ul"),y(12,k,2,1,"li",null,x),r()()()),t&2&&(i(12),b(a.posts))},dependencies:[g],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]});let m=c;export{m as default,F as routeMeta};
