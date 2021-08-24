(this.webpackJsonplocalsonly=this.webpackJsonplocalsonly||[]).push([[15],{387:function(e,t,s){"use strict";s.r(t);var a=s(7),c=s(8),i=s(1),n=s.n(i),l=s(67),r=s(10),o=s(5),d=s(55),j=s(19),u=s(17),b=s(24),m=s.n(b),h=s(390),O=s(383),p=s(381),x=s(382),v=s(361),y=s.n(v),f=s(0),g=function(e){var t=e.text,s=e.severity,i=n.a.useState(null),l=Object(a.a)(i,2),r=l[0],o=l[1],d=function(e){o(r?null:e.currentTarget)},j=Boolean(r),u=j?"transitions-popper":void 0;return Object(f.jsxs)("div",{className:"pl-1",children:[Object(f.jsx)("button",{"aria-describedby":u,type:"button",className:"button icon is-rounded px-0 is-inverted is-".concat(s),onClick:d,children:j?Object(f.jsx)("i",{className:"far fa-times-circle py-0 px-0"}):Object(f.jsx)("i",{className:"far fa-question-circle py-0 px-0 my-0 mx-0"})}),Object(f.jsx)(h.a,{id:u,open:j,anchorEl:r,placement:"right",transition:!0,children:function(e){var a=e.TransitionProps;return Object(f.jsx)(O.a,Object(c.a)(Object(c.a)({},a),{},{timeout:350,children:Object(f.jsx)("div",{children:Object(f.jsx)(p.a,{variant:"filled",severity:s,action:Object(f.jsx)(x.a,{"aria-label":"close",size:"small",onClick:d,children:Object(f.jsx)(y.a,{fontSize:"inherit"})}),children:t})})}))}})]})},N=s(366).getCities,w=Object(d.a)(o.h,u.c)((function(e){var t=e.firebase,s=e.history,o=function(e,t){var s=N("US",e).includes(t);s?(document.getElementById("city-input").classList.remove("is-danger"),document.getElementById("city-input").classList.add("is-success"),S(!0)):(document.getElementById("city-input").classList.remove("is-success"),document.getElementById("city-input").classList.add("is-danger"),S(!1))},d=Object(i.useState)({city:"",state:"Alabama"}),u=Object(a.a)(d,2),b=u[0],h=u[1],O=Object(i.useState)({name:"",email:"",emailChanged:"",passwordOne:"",passwordTwo:"",error:null}),p=Object(a.a)(O,2),x=p[0],v=p[1],y=Object(i.useState)(!1),w=Object(a.a)(y,2),C=w[0],S=w[1],L=Object(i.useState)(!1),E=Object(a.a)(L,2),k=E[0],A=E[1],B=Object(i.useState)({}),I=Object(a.a)(B,2),T=I[0],U=(I[1],new AbortController),D=U.signal;n.a.useEffect((function(){return function(){U.abort()}}));return Object(f.jsx)("main",{className:"registration section",children:Object(f.jsx)("div",{className:"columns is-centered",children:Object(f.jsxs)("div",{className:"is-half",children:[Object(f.jsxs)("div",{className:"box border-main",children:[Object(f.jsx)("div",{className:"hero py-6 my-0 px-5 mx-0 is-primary",children:Object(f.jsxs)("div",{className:"text-center level home-logo",children:[Object(f.jsx)("img",{src:"../LocalsOnly.png",alt:"localsonly"}),Object(f.jsx)("label",{className:"level-item title",children:"Registration"})]})}),Object(f.jsx)("section",{className:"column",children:Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t.createUserWithEmailAndPassword(x.email,x.passwordOne,{signal:D}).then((function(e){var a=e.user.uid;m.a.post("/api/v1/users",{authID:a,email:x.email,name:x.name,localTo:"".concat(Object(j.f)(b.state),":").concat(b.city.toLowerCase().replace(" ","_")),birthday:T}).then((function(){t.signInWithEmailAndPassword(x.email,x.passwordOne).then((function(){s.push("/"),window.location.reload(),alert("Thank you for signing up!")}))})).catch((function(e){return console.error(e)}))})).catch((function(e){switch(e.code){case"auth/email-already-in-use":alert(e.message);break;default:console.error(e)}}))},className:"form",children:[Object(f.jsx)("label",{className:"label",children:Object(f.jsx)(l.b,{setUser:v,setStatus:A,user:x})}),Object(f.jsxs)("label",{className:"label",children:[Object(f.jsx)("div",{className:"is-mobile",children:Object(f.jsx)("div",{className:"level-left",children:Object(f.jsxs)("div",{className:"level-item",children:["Local",Object(f.jsx)(g,{text:"Changing Local will result in a 30 day waiting period",severity:"info"})]})})}),Object(f.jsxs)("div",{className:"columns",children:[Object(f.jsx)("div",{className:"column",children:Object(f.jsx)("div",{className:"select",children:Object(f.jsx)("select",{name:"state",id:"state",value:b.state,onChange:function(e){e.preventDefault(),o(e.target.value,b.city),h(Object(c.a)(Object(c.a)({},b),{},{state:e.target.value}))},children:j.c.map((function(e){return Object(f.jsx)("option",{value:e,children:e},e)}))})})}),Object(f.jsx)("div",{className:"column",children:Object(f.jsx)("input",{id:"city-input",type:"text",placeholder:"City/Town",className:"input",name:"city",value:b.city,onChange:function(e){e.preventDefault();var t=e.target.value;t=t.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" "),o(b.state,t),h(Object(c.a)(Object(c.a)({},b),{},{city:e.target.value}))}})})]})]}),Object(f.jsxs)("div",{className:"level",children:[Object(f.jsx)("div",{className:"level-left",children:Object(f.jsx)("button",{id:"sign-up-button",className:"level-item button is-primary",disabled:!(k&&C),type:"submit",children:"Sign Up"})}),Object(f.jsx)("small",{className:"help is-info",children:"* All fields are required"})]})]})}),Object(f.jsxs)("small",{className:"content has-text-centered section",children:["Already have an account? ",Object(f.jsx)(r.b,{className:"has-text-primary",to:"/",children:"Login!"})]})]}),Object(f.jsxs)("div",{className:"my-0 py-0 section content has-text-centered",children:["By signing up you accept all cookies, ",Object(f.jsx)(r.b,{children:"terms of services"})," and ",Object(f.jsx)(r.b,{children:"privacy policy"})]})]})})})}));t.default=w}}]);
//# sourceMappingURL=15.dfb944e2.chunk.js.map