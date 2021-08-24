(this.webpackJsonplocalsonly=this.webpackJsonplocalsonly||[]).push([[15],{388:function(e,t,s){"use strict";s.r(t);var a=s(8),c=s(7),n=s(1),i=s.n(n),l=s(67),r=s(10),o=s(6),d=s(55),j=s(19),u=s(17),b=s(24),m=s.n(b),h=s(390),O=s(384),p=s(382),x=s(383),v=s(361),y=s.n(v),f=s(0),g=function(e){var t=e.text,s=e.severity,n=i.a.useState(null),l=Object(c.a)(n,2),r=l[0],o=l[1],d=function(e){o(r?null:e.currentTarget)},j=Boolean(r),u=j?"transitions-popper":void 0;return Object(f.jsxs)("div",{className:"pl-1",children:[Object(f.jsx)("button",{"aria-describedby":u,type:"button",className:"button icon is-rounded px-0 is-inverted is-".concat(s),onClick:d,children:j?Object(f.jsx)("i",{className:"far fa-times-circle py-0 px-0"}):Object(f.jsx)("i",{className:"far fa-question-circle py-0 px-0 my-0 mx-0"})}),Object(f.jsx)(h.a,{id:u,open:j,anchorEl:r,placement:"right",transition:!0,children:function(e){var c=e.TransitionProps;return Object(f.jsx)(O.a,Object(a.a)(Object(a.a)({},c),{},{timeout:350,children:Object(f.jsx)("div",{children:Object(f.jsx)(p.a,{variant:"filled",severity:s,action:Object(f.jsx)(x.a,{"aria-label":"close",size:"small",onClick:d,children:Object(f.jsx)(y.a,{fontSize:"inherit"})}),children:t})})}))}})]})},N=s(366).getCities,w=Object(d.a)(o.h,u.c)((function(e){var t=e.firebase,s=e.history,o=Object(n.useState)(null),d=Object(c.a)(o,2),u=d[0],b=d[1],h=function(e,t){var s=N("US",e).includes(t);s?(document.getElementById("city-input").classList.remove("is-danger"),document.getElementById("city-input").classList.add("is-success"),A(!0)):(document.getElementById("city-input").classList.remove("is-success"),document.getElementById("city-input").classList.add("is-danger"),A(!1))},O=Object(n.useState)({city:"",state:"Alabama"}),p=Object(c.a)(O,2),x=p[0],v=p[1],y=Object(n.useState)({name:"",email:"",emailChanged:"",passwordOne:"",passwordTwo:"",error:null}),w=Object(c.a)(y,2),C=w[0],S=w[1],L=Object(n.useState)(!1),E=Object(c.a)(L,2),k=E[0],A=E[1],B=Object(n.useState)(!1),I=Object(c.a)(B,2),T=I[0],D=I[1],P=Object(n.useState)({}),U=Object(c.a)(P,2),q=(U[0],U[1],new AbortController),z=q.signal;i.a.useEffect((function(){return function(){q.abort()}}));return Object(f.jsx)("main",{className:"registration section",children:Object(f.jsx)("div",{className:"columns is-centered",children:Object(f.jsxs)("div",{className:"is-half",children:[Object(f.jsxs)("div",{className:"box border-main",children:[Object(f.jsx)("div",{className:"hero py-6 my-0 px-5 mx-0 is-primary",children:Object(f.jsxs)("div",{className:"text-center level home-logo",children:[Object(f.jsx)("img",{src:"../LocalsOnly.png",alt:"localsonly"}),Object(f.jsx)("label",{className:"level-item title",children:"Registration"})]})}),Object(f.jsx)("section",{className:"column",children:Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t.createUserWithEmailAndPassword(C.email,C.passwordOne,{signal:z}).then((function(e){var a=e.user.uid;m.a.post("/api/v1/users",{authID:a,email:C.email,name:C.name,localTo:"".concat(Object(j.f)(x.state),":").concat(x.city.toLowerCase().replace(" ","_")),promo:u}).then((function(){t.signInWithEmailAndPassword(C.email,C.passwordOne).then((function(){s.push("/"),window.location.reload(),alert("Thank you for signing up!")}))})).catch((function(e){return console.error(e)}))})).catch((function(e){switch(e.code){case"auth/email-already-in-use":alert(e.message);break;default:console.error(e)}}))},className:"form",children:[Object(f.jsx)("label",{className:"label",children:Object(f.jsx)(l.b,{setUser:S,setStatus:D,user:C})}),Object(f.jsxs)("label",{className:"label",children:[Object(f.jsx)("div",{className:"is-mobile",children:Object(f.jsx)("div",{className:"level-left",children:Object(f.jsxs)("div",{className:"level-item",children:["Local",Object(f.jsx)(g,{text:"Changing Local will result in a 30 day waiting period",severity:"info"})]})})}),Object(f.jsxs)("div",{className:"columns",children:[Object(f.jsx)("div",{className:"column",children:Object(f.jsx)("div",{className:"select",children:Object(f.jsx)("select",{name:"state",id:"state",value:x.state,onChange:function(e){e.preventDefault(),h(e.target.value,x.city),v(Object(a.a)(Object(a.a)({},x),{},{state:e.target.value}))},children:j.c.map((function(e){return Object(f.jsx)("option",{value:e,children:e},e)}))})})}),Object(f.jsx)("div",{className:"column",children:Object(f.jsx)("input",{id:"city-input",type:"text",placeholder:"City/Town",className:"input",name:"city",value:x.city,onChange:function(e){e.preventDefault();var t=e.target.value;t=t.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" "),h(x.state,t),v(Object(a.a)(Object(a.a)({},x),{},{city:e.target.value}))}})})]})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{htmlFor:"promo-code",className:"label",children:"Promo Code"}),Object(f.jsx)("input",{name:"promo-code",type:"text",placeholder:"Promo Code",onChange:function(e){e.preventDefault(),b(e.target.value)},value:u})]}),Object(f.jsxs)("div",{className:"level",children:[Object(f.jsx)("div",{className:"level-left",children:Object(f.jsx)("button",{id:"sign-up-button",className:"level-item button is-primary",disabled:!(T&&k),type:"submit",children:"Sign Up"})}),Object(f.jsx)("small",{className:"help is-info",children:"* All fields are required"})]})]})}),Object(f.jsxs)("small",{className:"content has-text-centered section",children:["Already have an account? ",Object(f.jsx)(r.b,{className:"has-text-primary",to:"/",children:"Login!"})]})]}),Object(f.jsxs)("div",{className:"my-0 py-0 section content has-text-centered",children:["By signing up you accept all cookies, ",Object(f.jsx)(r.b,{children:"terms of services"})," and ",Object(f.jsx)(r.b,{children:"privacy policy"})]})]})})})}));t.default=w}}]);
//# sourceMappingURL=15.1106fdcb.chunk.js.map