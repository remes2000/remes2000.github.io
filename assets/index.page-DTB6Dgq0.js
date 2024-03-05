import{ɵ as d,a as u,b as o,e as _,g as s,f as i,j as c,y as m,h as p,z as P,l as g,R as f,B as C,C as h,E as M,F as y}from"./index-C4dsEkOO.js";import{a as l}from"./const-XizRZCSM.js";const O=e=>["/blog",e];let b=(()=>{var e;class n{}return e=n,e.ɵfac=function(t){return new(t||e)},e.ɵcmp=d({type:e,selectors:[["app-blog-post-feature"]],inputs:{post:"post"},standalone:!0,features:[u],decls:8,vars:8,consts:[[3,"routerLink"],["alt","Post thumbnail",1,"feature-image",3,"src"],[1,"content"],[1,"title"],[1,"subtitle"]],template:function(t,r){t&1&&(o(0,"a",0)(1,"section"),_(2,"img",1),o(3,"div",2)(4,"header",3),s(5),i(),o(6,"p",4),s(7),i()()()()),t&2&&(c("routerLink",m(6,O,r.post.slug)),p(),P("--img","url("+r.post.attributes.thumbnail+")"),p(),c("src",r.post.attributes.thumbnail,C),p(3),g(r.post.attributes.title),p(2),g(r.post.attributes.subtitle))},dependencies:[f],styles:[`a[_ngcontent-%COMP%] {
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
}`]}),n})();const w=(e,n)=>n.slug;function x(e,n){if(e&1&&(o(0,"li"),_(1,"app-blog-post-feature",2),i()),e&2){const a=n.$implicit;p(),c("post",a)}}const B={title:"Michał Nieruchalski",meta:[{name:"description",content:"My blog about tech"},{property:"og:title",content:"Michał Nieruchalski"},{property:"og:description",content:"My blog about tech"},{property:"og:image",content:`${l}/main-featured-image.jpg`},{property:"og:url",content:l},{property:"og:type",content:"website"}]};let I=(()=>{var e;class n{constructor(){this.posts=h()}}return e=n,e.ɵfac=function(t){return new(t||e)},e.ɵcmp=d({type:e,selectors:[["app-blog-index-page"]],standalone:!0,features:[u],decls:14,vars:0,consts:[[1,"wrapper"],[1,"funny-head"],[3,"post"]],template:function(t,r){t&1&&(o(0,"div",0)(1,"header")(2,"h1"),s(3,"Hello "),o(4,"span",1),s(5,"ヽ(•‿•)ノ"),i()(),o(6,"p"),s(7,"Nice to see you! Enjoy!"),i()(),o(8,"article")(9,"h2"),s(10,"Recent posts"),i(),o(11,"ul"),M(12,x,2,1,"li",null,w),i()()()),t&2&&(p(12),y(r.posts))},dependencies:[b],styles:[`.wrapper[_ngcontent-%COMP%] {
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
}`]}),n})();export{I as default,B as routeMeta};
