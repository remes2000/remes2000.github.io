import{ɵ as l,a as d,b as a,e as u,g as s,f as i,j as c,y as m,h as p,z as _,l as g,R as h,B as P,C,E as f,F as M}from"./index-B_SVE7tL.js";const O=e=>["/blog",e];let y=(()=>{var e;class t{}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=l({type:e,selectors:[["app-blog-post-feature"]],inputs:{post:"post"},standalone:!0,features:[d],decls:8,vars:8,consts:[[3,"routerLink"],["alt","Post thumbnail",1,"feature-image",3,"src"],[1,"content"],[1,"title"],[1,"subtitle"]],template:function(n,o){n&1&&(a(0,"a",0)(1,"section"),u(2,"img",1),a(3,"div",2)(4,"header",3),s(5),i(),a(6,"p",4),s(7),i()()()()),n&2&&(c("routerLink",m(6,O,o.post.slug)),p(),_("--img","url("+o.post.attributes.thumbnail+")"),p(),c("src",o.post.attributes.thumbnail,P),p(3),g(o.post.attributes.title),p(2),g(o.post.attributes.subtitle))},dependencies:[h],styles:[`a[_ngcontent-%COMP%] {
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
}`]}),t})();const b=(e,t)=>t.slug;function w(e,t){if(e&1&&(a(0,"li"),u(1,"app-blog-post-feature",2),i()),e&2){const r=t.$implicit;p(),c("post",r)}}const v={title:"Michał Nieruchalski",meta:[{name:"description",content:"My blog about tech"},{property:"og:title",content:"Michał Nieruchalski"},{property:"og:description",content:"My blog about tech"},{property:"og:image",content:"https://nieruchalski.dev/main-featured-image.jpg"},{property:"og:url",content:"https://nieruchalski.dev"},{property:"og:type",content:"website"}]};let B=(()=>{var e;class t{constructor(){this.posts=C().toSorted(({attributes:{date:n}},{attributes:{date:o}})=>new Date(o).getTime()-new Date(n).getTime())}}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=l({type:e,selectors:[["app-blog-index-page"]],standalone:!0,features:[d],decls:14,vars:0,consts:[[1,"wrapper"],[1,"funny-head"],[3,"post"]],template:function(n,o){n&1&&(a(0,"div",0)(1,"header")(2,"h1"),s(3,"Hello "),a(4,"span",1),s(5,"ヽ(•‿•)ノ"),i()(),a(6,"p"),s(7,"Nice to see you! Enjoy!"),i()(),a(8,"article")(9,"h2"),s(10,"Recent posts"),i(),a(11,"ul"),f(12,w,2,1,"li",null,b),i()()()),n&2&&(p(12),M(o.posts))},dependencies:[y],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]}),t})();export{B as default,v as routeMeta};
