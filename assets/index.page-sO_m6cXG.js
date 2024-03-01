import{ɵ as u,a as d,b as o,e as m,g as s,f as i,j as l,y as _,h as p,z as f,l as c,R as h,B as y,C as P,E as C,F as M}from"./index-DdIbonK9.js";import{a as g}from"./const-XizRZCSM.js";const b=e=>["/blog",e];let x=(()=>{var e;class n{}return e=n,e.ɵfac=function(t){return new(t||e)},e.ɵcmp=u({type:e,selectors:[["app-blog-post-feature"]],inputs:{post:"post"},standalone:!0,features:[d],decls:8,vars:8,consts:[[3,"routerLink"],["alt","Post thumbnail",1,"feature-image",3,"src"],[1,"content"],[1,"title"],[1,"subtitle"]],template:function(t,r){t&1&&(o(0,"a",0)(1,"section"),m(2,"img",1),o(3,"div",2)(4,"header",3),s(5),i(),o(6,"p",4),s(7),i()()()()),t&2&&(l("routerLink",_(6,b,r.post.slug)),p(),f("--img","url("+r.post.attributes.thumbnail+")"),p(),l("src",r.post.attributes.thumbnail,y),p(3),c(r.post.attributes.title),p(2),c(r.post.attributes.subtitle))},dependencies:[h],styles:[`a[_ngcontent-%COMP%] {
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
}`]}),n})();const F=(e,n)=>n.slug;function v(e,n){if(e&1&&(o(0,"li"),m(1,"app-blog-post-feature",2),i()),e&2){const a=n.$implicit;p(),l("post",a)}}const w={title:"Michał Nieruchalski",meta:[{name:"description",content:"My blog about tech"},{property:"og:title",content:"Michał Nieruchalski"},{property:"og:description",content:"My blog about tech"},{property:"og:image",content:`${g}/main-featured-image.jpg`},{property:"og:url",content:g},{property:"og:type",content:"website"}]};let I=(()=>{var e;class n{constructor(){this.posts=P()}}return e=n,e.ɵfac=function(t){return new(t||e)},e.ɵcmp=u({type:e,selectors:[["app-blog-index-page"]],standalone:!0,features:[d],decls:14,vars:0,consts:[[1,"wrapper"],[1,"funny-head"],[3,"post"]],template:function(t,r){t&1&&(o(0,"div",0)(1,"header")(2,"h1"),s(3,"Hello "),o(4,"span",1),s(5,"ヽ(•‿•)ノ"),i()(),o(6,"p"),s(7,"Nice to see you! Enjoy!"),i()(),o(8,"article")(9,"h2"),s(10,"Recent posts"),i(),o(11,"ul"),C(12,v,2,1,"li",null,F),i()()()),t&2&&(p(12),M(r.posts))},dependencies:[x],styles:[`.wrapper[_ngcontent-%COMP%] {
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
        .funny-head {
          white-space: nowrap;
          line-height: 2;
        }

        @media screen and (max-width: 400px) {
          text-align: center;
        }        
      }
    }`]}),n})();export{I as default,w as routeMeta};
