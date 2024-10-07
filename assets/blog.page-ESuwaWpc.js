import{ɵ as c,a as d,b as r,c as M,d as p,e as s,f as i,i as _,T as v,g as C,h as l,j as m,k as u,l as h,R as g,m as f,n as w,o as k}from"./index-BOZ8A4Vb.js";let x=(()=>{var e;class t{constructor(){this.themeModeService=_(v),this.mode$=this.themeModeService.mode$}toggle(){this.themeModeService.toggle()}}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=c({type:e,selectors:[["app-mode-switch"]],standalone:!0,features:[d],decls:11,vars:0,consts:[[3,"click"],["viewBox","0 0 24 24","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z","stroke","#323232","stroke-width","2"],["d","M12 5V3","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M17 7L19 5","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M19 12H21","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M17 17L19 19","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M12 19V21","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M7 17L5 19","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M5 12H3","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M5 5L7 7","stroke","#323232","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"]],template:function(n,a){n&1&&(r(0,"button",0),M("click",function(){return a.toggle()}),p(),r(1,"svg",1),s(2,"path",2)(3,"path",3)(4,"path",4)(5,"path",5)(6,"path",6)(7,"path",7)(8,"path",8)(9,"path",9)(10,"path",10),i()())},styles:[`button[_ngcontent-%COMP%] {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
}
button[_ngcontent-%COMP%]:hover {
  border: 1px solid var(--accent-color);
  border-radius: 50%;
}
button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  fill: var(--font-color);
}
button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {
  stroke: var(--font-color);
}`]}),t})();const P=()=>["/"];let y=(()=>{var e;class t{constructor(){this.websiteDomain="nieruchalski.dev"}}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=c({type:e,selectors:[["app-nav"]],standalone:!0,features:[d],decls:5,vars:3,consts:[[1,"blog-name"],[3,"routerLink"]],template:function(n,a){n&1&&(r(0,"nav")(1,"div",0)(2,"a",1),C(3),i()(),s(4,"app-mode-switch"),i()),n&2&&(l(2),m("routerLink",u(2,P)),l(),h(a.websiteDomain))},dependencies:[g,x],styles:[`nav[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  padding: 1.2rem 4rem;
  border-bottom: 0.1rem solid var(--accent-color);
  box-sizing: border-box;
}
@media screen and (max-width: 500px) {
  nav[_ngcontent-%COMP%] {
    padding: 1.2rem 2.4rem;
  }
}
nav[_ngcontent-%COMP%]   .blog-name[_ngcontent-%COMP%] {
  font-size: 1.8rem;
}
nav[_ngcontent-%COMP%]   .blog-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: var(--font-color);
}`]}),t})(),L=(()=>{var e;class t{}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=c({type:e,selectors:[["app-social-media"]],standalone:!0,features:[d],decls:9,vars:0,consts:[[1,"social-media"],["href","https://github.com/remes2000"],["viewBox","0 0 256 250","version","1.1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","preserveAspectRatio","xMidYMid"],["d","M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z"],["href","https://www.linkedin.com/in/mnieruchalski"],["viewBox","0 0 256 256","version","1.1","xmlns","http://www.w3.org/2000/svg",0,"xmlns","xlink","http://www.w3.org/1999/xlink","preserveAspectRatio","xMidYMid"],["d","M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"]],template:function(n,a){n&1&&(r(0,"div",0)(1,"a",1),p(),r(2,"svg",2)(3,"g"),s(4,"path",3),i()()(),f(),r(5,"a",4),p(),r(6,"svg",5)(7,"g"),s(8,"path",6),i()()()())},styles:[`.social-media[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.5rem;
}
.social-media[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  display: block;
  width: 2.5rem;
}
.social-media[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 100%;
  fill: var(--font-color);
}`]}),t})();const b=()=>["/"];let O=(()=>{var e;class t{constructor(){this.year=new Date().getFullYear()}}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=c({type:e,selectors:[["app-footer"]],standalone:!0,features:[d],decls:5,vars:3,consts:[[3,"routerLink"]],template:function(n,a){n&1&&(r(0,"footer")(1,"div")(2,"a",0),C(3),i()(),s(4,"app-social-media"),i()),n&2&&(l(2),m("routerLink",u(2,b)),l(),w("Michał Nieruchalski ",a.year,""))},dependencies:[g,L],styles:[`footer[_ngcontent-%COMP%] {
  text-align: center;
  padding: 5rem 0;
}
footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: var(--font-color);
  text-decoration: none;
}`]}),t})(),j=(()=>{var e;class t{}return e=t,e.ɵfac=function(n){return new(n||e)},e.ɵcmp=c({type:e,selectors:[["app-blog"]],standalone:!0,features:[d],decls:3,vars:0,template:function(n,a){n&1&&s(0,"app-nav")(1,"router-outlet")(2,"app-footer")},dependencies:[k,y,O],encapsulation:2}),t})();export{j as default};
