(this.webpackJsonplocalsonly=this.webpackJsonplocalsonly||[]).push([[9],{141:function(e,a,t){"use strict";t(1);var s=t(140),n=t(0);a.a=function(e){var a=e.id;return Object(n.jsx)(s.b,{publicId:a})}},145:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var s=t(42);var n=t(52);function c(e){return function(e){if(Array.isArray(e))return Object(s.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(n.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},195:function(e,a,t){"use strict";t.d(a,"a",(function(){return m}));var s=t(12),n=t.n(s),c=t(20),l=t(145),r=t(7),i=t(1),o=t(141),d=t(140),u=t(29),j=t(0),m=Object(u.c)((function(e){var a=e.user,t=e.setImage,s=e.image,n=function(e){e.images,e.setImages;return Object(j.jsxs)("div",{className:"tile is-child image-item",children:[Object(j.jsx)("span",{className:"is-small button is-inverted is-danger delete-image",title:"Remove",onClick:function(e){t(null)},children:Object(j.jsx)("i",{className:"far fa-trash-alt"})}),Object(j.jsx)("img",{src:URL.createObjectURL(s),alt:"Could not load"})]})};return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"file is-centered is-boxed has-name",children:Object(j.jsxs)("label",{className:"file-label",children:[Object(j.jsx)("input",{className:"file-input",src:"./LocalsOnly.png",type:"file",name:"images",onChange:function(e){e.preventDefault();var a=e.target.files;console.dir(a[0]),t(a[0])}}),Object(j.jsx)("span",{className:"image is-128x128",children:null===a.getAvatar()?Object(j.jsx)("img",{src:"https://bulma.io/images/placeholders/128x128.png",alt:"User"}):Object(j.jsx)(d.a,{cloudName:"dpjlvg7ql",secure:!1,upload_preset:"avatar_images",children:Object(j.jsx)(o.a,{id:a.getAvatar(),preset:"avatar_images"})})})]})}),s&&Object(j.jsx)(n,{})]})}));a.b=function(e){var a=e.folder,t=e.multiple,s=e.callback,o=Object(i.useState)(!1),d=Object(r.a)(o,2),u=d[0],m=d[1],b=Object(i.useState)([]),h=Object(r.a)(b,2),p=h[0],f=h[1],O=function(){var e=Object(c.a)(n.a.mark((function e(t){var l,r,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(p),l=new FormData,m(!0),r=p.map(function(){var e=Object(c.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l.append("file",t),l.append("upload_preset","".concat(a,"_images")),e.next=4,fetch("https://api.cloudinary.com/v1_1/dpjlvg7ql/image/upload",{method:"POST",body:l}).then((function(e){return e.json()})).then((function(e){var a=e.public_id;return console.log(a),a}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()),e.next=7,Promise.all(r);case 7:i=e.sent,s(i),m(!1);case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),x=function(e){var a=e.images,t=e.setImages,s=function(e){e.persist();var s=Number(e.target.id);console.log("Image name: "+s);var n=a[s].name;t(a.filter((function(e){return e.name!==n})))};return Object(j.jsx)("div",{className:"tile is-ancestor",children:Object(j.jsx)("div",{className:"tile is-parent image-row",children:a&&a.map((function(e,a){return Object(j.jsxs)("div",{className:"tile is-child image-item",children:[Object(j.jsx)("span",{className:"is-small button is-inverted is-danger delete-image",title:"Remove",id:a,onClick:s,children:Object(j.jsx)("i",{className:"far fa-trash-alt"})}),Object(j.jsx)("img",{src:URL.createObjectURL(e),alt:"Could not load"})]},a)}))})})};return Object(j.jsxs)("form",{onSubmit:O,className:"form-container",children:[Object(j.jsx)("div",{className:"file is-centered is-boxed has-name",children:Object(j.jsxs)("label",{className:"file-label",children:[Object(j.jsx)("input",{className:"file-input",multiple:t,type:"file",name:"images",onChange:function(e){e.preventDefault();var a=e.target.files;f(t?function(e){return[].concat(Object(l.a)(e),Object(l.a)(a))}:Object(l.a)(a))}}),Object(j.jsxs)("span",{className:"file-cta",children:[Object(j.jsx)("span",{className:"file-icon",children:Object(j.jsx)("i",{className:"fas fa-images"})}),Object(j.jsx)("span",{className:"file-label",children:"Get images"})]})]})}),Object(j.jsxs)("div",{className:"buttons is-centered section",children:[Object(j.jsx)("button",{type:"submit",className:"button is-success",children:"Upload"}),Object(j.jsx)("button",{type:"submit",className:"button is-danger",onClick:function(e){e.preventDefault(),f([])},children:"Remove all"})]}),u?Object(j.jsx)("div",{children:"Loading..."}):Object(j.jsx)(x,{images:p,setImages:f})]})}},378:function(e,a,t){"use strict";t.r(a);var s=t(27),n=t(8),c=t(12),l=t.n(c),r=t(20),i=t(7),o=t(1),d=t(195),u=t(24),j=t.n(u),m=t(29),b=t(17),h=t(10),p=t(30),f=t(19),O=t(0),x=Object(b.c)(Object(m.c)((function(e){var a=e.history,t=e.firebase,c=e.user,u=c.getLocalTo().split(":"),m=Object(i.a)(u,2),b=m[0],x=m[1],g=Object(o.useState)(!1),v=Object(i.a)(g,2),N=v[0],w=v[1],y=Object(o.useState)(!0),C=Object(i.a)(y,2),k=C[0],P=C[1],D=Object(p.a)(!1),L=Object(i.a)(D,2),S=L[0],I=L[1],_=void 0!==Object(f.g)("local-update"),E=Object(o.useState)(null),U=Object(i.a)(E,2),F=U[0],q=U[1],R=Object(o.useState)({name:c.getName()||"",email:c.getEmail()||"",handler:c.getHandler()||"",city:x.charAt(0).toUpperCase()+x.slice(1)||"",state:b.toUpperCase()||"",oldPassword:"",newPassword:""}),T=Object(i.a)(R,2),A=T[0],H=T[1],J=Object(o.useCallback)(Object(r.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(w(!0),!(A.handler.includes(" ")||""===A.handler||A.handler.length<4)){e.next=3;break}return e.abrupt("return",P(!1));case 3:if(A.handler!==c.getHandler()){e.next=5;break}return e.abrupt("return",P(!0));case 5:return e.next=7,j.a.get("/api/v1/users/handles/".concat(A.handler)).then((function(e){return console.dir(e),P(!0)})).catch((function(e){return console.log("In Handle Check: "+e),P(!1)}));case 7:case"end":return e.stop()}}),e)}))),[A.handler,c]);Object(o.useEffect)((function(){A.handler!==c.getHandler()&&J().then((function(){return w(!1)}))}),[J,A.handler,c]);var M=function(){var e=Object(r.a)(l.a.mark((function e(s){var n,i,o,d,u,m,h;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.preventDefault(),c.getEmail()===A.email){e.next=4;break}return e.next=4,t.updateEmail(A.email).then(function(){var e=Object(r.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Email updated"),e.next=3,j.a.patch("/api/v1/users/".concat(c.getID(),"/email"),{email:A.email});case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()).catch((function(e){console.log("Error updating email from edit user page"),console.dir(e)}));case 4:if(c.getName()===A.name){e.next=7;break}return e.next=7,j.a.patch("/api/v1/users/".concat(c.getID(),"/name"),{name:A.name});case 7:if(c.getHandler()===A.handler){e.next=10;break}return e.next=10,j.a.patch("/api/v1/users/".concat(c.getID(),"/handle"),{handle:A.handler});case 10:if(!(A.newPassword.length>=6&&A.newPassword!==A.oldPassword)){e.next=15;break}return console.log("Changing password"),n=t.emailCredentials(A.email,A.oldPassword),e.next=15,t.reauth(n).then((function(e){console.log("Re-authenticated"),t.updatePassword(A.newPassword).then((function(e){console.log("New password set")})).catch((function(e){console.log("Error setting new password: "+e)}))})).catch(console.dir);case 15:if(!F){e.next=22;break}return(i=new FormData).append("file",F),i.append("upload_preset","avatar_images"),e.next=21,fetch("https://api.cloudinary.com/v1_1/dpjlvg7ql/image/upload",{method:"POST",body:i}).then((function(e){return e.json()})).then((function(e){var a=e.public_id;return console.log(a),a})).then(function(){var e=Object(r.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.patch("/api/v1/users/".concat(c.getID(),"/avatar"),{avatar:a}).then((function(e){console.dir("Updated Avatar: "+e)}));case 2:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}());case 21:return e.abrupt("return",e.sent);case 22:A.state.toLowerCase()===b.toLowerCase()&&A.city.toLowerCase()===x.toLowerCase()||(o=A.state.toLowerCase()+":"+A.city.toLowerCase().replace(" ","-"),Object(f.h)("local-update",o,1e3),(d=new Date).setTime(d.getTime()+2592e6),u=d.toUTCString(),Object(f.h)("local-update-on",u,30),m=Object(f.g)("local-update-on"),h=new Date(m),console.log(h.getDate())),alert("Your profile has been updated!"),a.push("/dashboard");case 25:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),Y=function(){return!0===N?Object(O.jsx)("span",{className:"icon is-small is-right has-text-info",children:Object(O.jsx)("i",{className:"fas fa-circle-notch fa-pulse"})}):k?Object(O.jsx)("span",{className:"icon is-small is-right has-text-success",children:Object(O.jsx)("i",{className:"fas fa-check"})}):Object(O.jsx)("span",{className:"icon is-small is-right has-text-danger",children:Object(O.jsx)("i",{className:"fas fa-times"})})},G=function(e){e.preventDefault();var a=e.target,t=a.name,c=a.value;H("password"===t?Object(n.a)(Object(n.a)({},A),{},Object(s.a)({},t,c.replace(" ",""))):Object(n.a)(Object(n.a)({},A),{},Object(s.a)({},t,c)))},z=function(){var e=new Date(Object(f.g)("local-update-on")),a=new Date,t=Math.abs(e-a),s=Math.ceil(t/864e5);return s=s<=1||isNaN(s)?"today":"in "+s+" days",Object(O.jsx)("span",{children:s})};return Object(O.jsxs)("main",{id:"avatar-upload-page",className:"section mt-4 container",children:[Object(O.jsx)("div",{className:"columns is-centered",children:Object(O.jsx)("h1",{className:"title column has-text-centered my-3",children:"Edit Profile"})}),Object(O.jsx)("form",{onSubmit:M,className:"",children:Object(O.jsxs)("section",{className:"section container box columns",children:[Object(O.jsx)("div",{className:"column",children:Object(O.jsx)(d.a,{setImage:q,image:F})}),Object(O.jsxs)("div",{className:"column",children:[Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("label",{htmlFor:"name",children:"Name"}),Object(O.jsxs)("div",{className:"control has-icons-left",children:[Object(O.jsx)("input",{type:"text",name:"name",value:A.name,className:"input",onChange:G,required:!0}),Object(O.jsx)("span",{className:"icon is-small is-left",children:Object(O.jsx)("i",{className:"fas fa-user"})})]})]}),Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("label",{htmlFor:"handler",children:"Handler"}),Object(O.jsxs)("div",{className:"control has-icons-left has-icons-right",children:[Object(O.jsx)("input",{type:"text",name:"handler",value:A.handler,className:"input",onChange:G,minLength:4,required:!0}),Object(O.jsx)("span",{className:"icon is-small is-left",children:Object(O.jsx)("i",{className:"fas fa-at"})}),Object(O.jsx)(Y,{})]})]}),Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("label",{htmlFor:"email",children:"Email"}),Object(O.jsxs)("div",{className:"control has-icons-left",children:[Object(O.jsx)("input",{type:"text",name:"email",value:A.email,className:"input",onChange:G,required:!0}),Object(O.jsx)("span",{className:"icon is-small is-left",children:Object(O.jsx)("i",{className:"fas fa-envelope"})})]})]}),Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("label",{htmlFor:"email",children:"Old Password"}),Object(O.jsxs)("div",{className:"control has-icons-left has-icons-right",children:[Object(O.jsx)("input",{type:S?"text":"password",name:"oldPassword",value:A.oldPassword,className:"input",onChange:G}),Object(O.jsx)("span",{className:"icon is-small is-left",children:Object(O.jsx)("i",{className:"fas fa-key"})}),Object(O.jsx)("span",{className:"icon password-visible-icon is-small is-right",onClick:I,children:S?Object(O.jsx)("i",{className:"fas fa-eye"}):Object(O.jsx)("i",{className:"fas fa-eye-slash"})})]})]}),Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("label",{htmlFor:"email",children:"New Password"}),Object(O.jsxs)("div",{className:"control has-icons-left has-icons-right",children:[Object(O.jsx)("input",{type:S?"text":"password",autoComplete:"new-password",name:"newPassword",value:A.newPassword,className:"input",onChange:G}),Object(O.jsx)("span",{className:"icon is-small is-left",children:Object(O.jsx)("i",{className:"fas fa-key"})}),Object(O.jsx)("span",{className:"icon password-visible-icon is-small is-right",onClick:I,children:S?Object(O.jsx)("i",{className:"fas fa-eye"}):Object(O.jsx)("i",{className:"fas fa-eye-slash"})})]})]}),Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("label",{htmlFor:"local",children:"City/Town"}),_&&Object(O.jsxs)("span",{className:"pl-2 has-text-danger",children:["Your local will update ",Object(O.jsx)(z,{})]}),Object(O.jsx)("div",{name:"local",className:"control",children:Object(O.jsx)("input",{type:"text",name:"city",value:A.city,className:"input",onChange:G,required:!0,disabled:_})}),Object(O.jsx)("label",{htmlFor:"local",children:"State"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("input",{type:"text",name:"state",value:A.state,className:"input",onChange:G,required:!0,minLength:2,maxLength:2,disabled:_})})]}),Object(O.jsx)("div",{className:"level",children:Object(O.jsxs)("div",{className:"level-left buttons ",children:[Object(O.jsx)("button",{className:"button is-success",disabled:!k,children:"Submit"}),Object(O.jsx)(h.b,{className:"button is-danger",to:"/dashboard",children:"Cancel"})]})})]})]})})]})})));a.default=x}}]);
//# sourceMappingURL=9.b16b0ca6.chunk.js.map