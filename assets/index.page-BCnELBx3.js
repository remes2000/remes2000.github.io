import{ɵ as u,a as d,b as o,e as m,g as s,f as r,j as _,y as f,h as l,z as h,l as c,R as b,B as P,C as y,E as C}from"./index-Dr-0fbJt.js";import{a as g}from"./const-XizRZCSM.js";const M=e=>["/blog",e];let v=(()=>{var e;class n{}return e=n,e.ɵfac=function(t){return new(t||e)},e.ɵcmp=u({type:e,selectors:[["app-blog-post-feature"]],inputs:{post:"post"},standalone:!0,features:[d],decls:8,vars:7,consts:[[3,"routerLink"],[1,"feature-image"],[1,"content"],[1,"title"],[1,"subtitle"]],template:function(t,i){if(t&1&&(o(0,"a",0)(1,"section"),m(2,"div",1),o(3,"div",2)(4,"header",3),s(5),r(),o(6,"p",4),s(7),r()()()()),t&2){let p;_("routerLink",f(5,M,i.post.slug)),l(),h("--img","url("+((p=i.post.attributes.thumbnail)!==null&&p!==void 0?p:"https://www.zooplus.pl/magazyn/wp-content/uploads/2018/01/Shiba-Inu-1.jpg")+")"),l(4),c(i.post.attributes.title),l(2),c(i.post.attributes.subtitle)}},dependencies:[b],styles:[`a[_ngcontent-%COMP%] {
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
  background-color: lightgray;
  border-radius: 1.2rem;
  background-image: var(--img);
  background-size: cover;
  background-repeat: no-repeat;
}
section[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {
  padding: 1.5rem 0.3rem;
}
section[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {
  font-size: 1.5rem;
}`]}),n})();const B=(e,n)=>n.slug;function F(e,n){if(e&1&&(o(0,"li"),m(1,"app-blog-post-feature",1),r()),e&2){const a=n.$implicit;l(),_("post",a)}}const w={title:"Michał Nieruchalski",meta:[{name:"description",content:"My blog about tech"},{name:"og:title",content:"Michał Nieruchalski"},{name:"og:description",content:"My blog about tech"},{name:"og:image",content:`${g}/main-featured-image.jpg`},{name:"og:url",content:g}]};let O=(()=>{var e;class n{constructor(){this.posts=P()}}return e=n,e.ɵfac=function(t){return new(t||e)},e.ɵcmp=u({type:e,selectors:[["app-blog-index-page"]],standalone:!0,features:[d],decls:12,vars:0,consts:[[1,"wrapper"],[3,"post"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"header")(2,"h1"),s(3,"Hello ヽ(•‿•)ノ"),r(),o(4,"p"),s(5,"Nice to see you! Enjoy!"),r()(),o(6,"article")(7,"h2"),s(8,"Recent posts"),r(),o(9,"ul"),y(10,F,2,1,"li",null,B),r()()()),t&2&&(l(10),C(i.posts))},dependencies:[v],styles:[`.wrapper[_ngcontent-%COMP%] {
      max-width: 90rem;
      margin: 0 auto;
      padding: 0 4rem;

      & > article > ul {
        margin-top: 1.5rem;
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      & > header {
        margin: 5rem 0;
        font-size: 1.8rem;
        p {
          font-size: 1.2rem;
        }
      }
    }`]}),n})();export{O as default,w as routeMeta};