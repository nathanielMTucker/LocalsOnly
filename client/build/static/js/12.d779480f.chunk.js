(this.webpackJsonplocalsonly=this.webpackJsonplocalsonly||[]).push([[12],{358:function(e,a,t){},385:function(e,a,t){"use strict";t.r(a);var c=t(27),s=t(8),l=t(12),n=t.n(l),r=t(20),i=t(7),o=t(1),j=t.n(o),b=t(17),d=t(24),h=t.n(d),u=t(19),m=t(29),x=t(55),O=t(69),p=t(0),y=function(e){var a=e.address,t=(e.setAddress,e.onChange);return Object(p.jsxs)("form",{children:[Object(p.jsx)("label",{className:"label has-text-grey",htmlFor:"street",children:"Street *"}),Object(p.jsx)(O.c,{children:Object(p.jsx)("input",{id:"street",className:"input",type:"text",placeholder:"100 Main St.",name:"street",value:a.street,onChange:t,required:!0})}),Object(p.jsx)("label",{className:"label has-text-grey",htmlFor:"apt",children:"Apartment"}),Object(p.jsx)(O.c,{children:Object(p.jsx)("input",{id:"apt",className:"input",type:"text",placeholder:"123",name:"apt",value:a.apt,onChange:t})}),Object(p.jsx)("label",{className:"label has-text-grey",htmlFor:"city",children:"City *"}),Object(p.jsx)(O.c,{children:Object(p.jsx)("input",{id:"city",className:"input",type:"text",placeholder:"Tempe",name:"city",value:a.city,onChange:t,pattern:"^([a-zA-Z-\\s]+)$",required:!0})}),Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsxs)("div",{className:"column",children:[Object(p.jsx)("label",{className:"label has-text-grey",htmlFor:"state-initial-input",children:"State *"}),Object(p.jsx)(O.b,{onChange:t,value:a.state})]}),Object(p.jsxs)("div",{className:"column",children:[Object(p.jsx)("label",{className:"label has-text-grey",htmlFor:"zip",children:"Zip Code *"}),Object(p.jsx)(O.c,{children:Object(p.jsx)("input",{id:"zip",className:"input",type:"text",placeholder:"85281",name:"zip",value:a.zip,onChange:t,maxLength:5,pattern:"([0-9]{5})",required:!0})})]})]})]})},g=function(e){var a=e.day,t=e.d,c=e.onChange,s=a.toLowerCase(),l=j.a.useState(!1),n=Object(i.a)(l,2),r=n[0],o=n[1];return j.a.useEffect((function(){o(t.closed)}),[t.closed]),Object(p.jsxs)("label",{className:"label has-text-grey",children:[a,Object(p.jsx)("div",{className:"control",children:Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsxs)("div",{className:"column",children:[Object(p.jsx)("input",{type:"time",disabled:r,name:"".concat(s,".from"),className:"input",onChange:c,value:t.from}),Object(p.jsx)("small",{className:"help",children:Object(p.jsxs)("label",{className:"label",children:["closed? ",Object(p.jsx)("input",{onChange:c,name:"".concat(s,".closed"),type:"checkbox",className:"checkbox"})]})})]}),Object(p.jsx)("div",{className:"column is-1",children:"to"}),Object(p.jsx)("div",{className:"column",children:Object(p.jsx)("input",{type:"time",disabled:r,name:"".concat(s,".to"),className:"input",onChange:c,value:t.to})})]})})]})},v=t(388),N=(t(358),v.a),f={from:"",to:"",closed:!1};a.default=Object(x.a)(b.c,m.c)((function(e){var a=e.history,t=e.user,l=Object(o.useState)(!1),b=Object(i.a)(l,2),d=b[0],m=b[1],x=Object(o.useState)({monday:f,tuesday:f,wednesday:f,thursday:f,friday:f,saturday:f,sunday:f}),O=Object(i.a)(x,2),C=O[0],k=O[1],w=Object(o.useState)({name:"",street:"",apt:"",city:"",state:"",zip:"",tel:"",web:""}),S=Object(i.a)(w,2),F=S[0],L=S[1],T=Object(o.useState)({description:"",rating:1,price:1,tags:[],dinein:!1,takeout:!1,delivery:!1,family:!1,adult:!1,dog:!1,localsOnly:!1}),D=Object(i.a)(T,2),z=D[0],q=D[1],A=Object(o.useCallback)(Object(r.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get(Object(u.d)(F)).then(function(){var e=Object(r.a)(n.a.mark((function e(a){var t,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(i.a)(a.data.results,1),c=t[0].geometry.location,console.log(c),h.a.get("/api/v1/local",{address:F,coors:c}).then((function(e){})).catch((function(e){return console.error("From Server: ".concat(e))}));case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)}))),[F]);Object(o.useEffect)((function(){var e=F.street,a=F.city,t=F.state,c=F.zip;e&&a&&t&&c&&A()}),[F,A]);var E=function(e){e.preventDefault();var a=e.target.name,t=e.target.value;L(Object(s.a)(Object(s.a)({},F),{},Object(c.a)({},a,t)))},P=function(e){var a=e.target.name.split("."),t=Object(i.a)(a,2),l=t[0],n=t[1],r="closed"===n?e.target.checked:e.target.value,o=C[l];k(Object(s.a)(Object(s.a)({},C),{},Object(c.a)({},l,Object(s.a)(Object(s.a)({},o),{},Object(c.a)({},n,r)))))},B=z.description,I=z.rating,J=z.price,M=z.tags,W=Object(o.useState)(150),Y=Object(i.a)(W,2),Z=Y[0],R=Y[1];j.a.useEffect((function(){R(150-B.length)}),[B,M]);var $=function(e){var a=e.target.name,t=e.target.value;q(Object(s.a)(Object(s.a)({},z),{},Object(c.a)({},a,t)))},_=function(e){var a=e.target.name,t=e.target.checked;q(Object(s.a)(Object(s.a)({},z),{},Object(c.a)({},a,t)))},G=function(){var e=Object(r.a)(n.a.mark((function e(c){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.preventDefault(),m(!0),t.isLocalToCity(F.state.toLowerCase(),F.city.toLowerCase())){e.next=6;break}return alert("You can only post if you are local to the area."),m(!1),e.abrupt("return");case 6:return e.next=8,h.a.get(Object(u.d)(F)).then(function(){var e=Object(r.a)(n.a.mark((function e(c){var s,l;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=Object(i.a)(c.data.results,1),l=s[0].geometry.location,console.log(l),h.a.post("/api/v1/local",{owner:t.getID().toString(),address:F,details:z,hours:C,coors:l}).then((function(e){alert("Thank You!"),a.push("local?id=".concat(e.data._id))})).catch((function(e){return console.error("From Server: ".concat(e))}));case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()).catch((function(e){"TypeError: res.data.results[0] is undefined"===e?alert("Check that address is correct"):console.error(e)}));case 8:m(!1);case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(p.jsx)("main",{id:"new-local-page",className:"section columns is-centered",style:{marginBottom:"-2.75rem"},children:Object(p.jsxs)("div",{className:"column is-half",children:[Object(p.jsx)("h1",{className:"title has-text-centered",children:"Create New Local"}),Object(p.jsx)("div",{className:"mb-1",children:"* required"}),Object(p.jsx)("div",{className:"",children:Object(p.jsxs)("form",{method:"POST",encType:"multipart/form-data",onSubmit:G,className:"form",children:[Object(p.jsx)("label",{htmlFor:"businessName",className:"label has-text-grey",children:"Business/Location Name *"}),Object(p.jsx)("div",{className:"control",children:Object(p.jsx)("input",{id:"businessName",onChange:E,type:"text",name:"name",value:F.name,className:"input",required:!0})}),Object(p.jsx)(y,{address:F,setAddress:L,onChange:E}),Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsxs)("div",{className:"column",children:[Object(p.jsx)("label",{htmlFor:"tel",className:"label has-text-grey",children:"Phone Number"}),Object(p.jsx)("input",{type:"tel",value:F.tel,onChange:function(e){var a=e.target,t=e.target.value.replace(/\D/g,"").substring(0,10),l=t.substring(0,3),n=t.substring(3,6),r=t.substring(6,10);t.length>6?a.value="(".concat(l,") ").concat(n," - ").concat(r):t.length>3?a.value="(".concat(l,") ").concat(n):t.length>0&&(a.value="(".concat(l)),L(Object(s.a)(Object(s.a)({},F),{},Object(c.a)({},a.name,a.value)))},name:"tel",className:"input",id:"tel",maxlength:16})]}),Object(p.jsxs)("div",{className:"column",children:[Object(p.jsx)("label",{htmlFor:"web",className:"label has-text-grey",children:"Website"}),Object(p.jsx)("input",{id:"web",type:"website",className:"input",name:"web",value:F.web,onChange:E})]})]}),Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsxs)("div",{className:"column is-centered pr-2",children:[Object(p.jsx)(g,{day:"Monday",d:C.monday,onChange:P}),Object(p.jsx)(g,{day:"Wednesday",d:C.wednesday,onChange:P}),Object(p.jsx)(g,{day:"Friday",d:C.friday,onChange:P}),Object(p.jsx)(g,{day:"Sunday",d:C.sunday,onChange:P})]}),Object(p.jsxs)("div",{className:"column pl-2",children:[Object(p.jsx)(g,{day:"Tuesday",d:C.tuesday,onChange:P}),Object(p.jsx)(g,{day:"Thursday",d:C.thursday,onChange:P}),Object(p.jsx)(g,{day:"Saturday",d:C.saturday,onChange:P})]})]}),Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsxs)("div",{className:"column",children:[Object(p.jsxs)("label",{className:"label has-text-grey",children:["Description *",Object(p.jsx)("div",{className:"control",children:Object(p.jsx)("textarea",{value:B,onChange:$,maxLength:"150",rows:"3",className:"textarea",name:"description",id:"description",cols:"30",required:!0})}),Object(p.jsxs)("div",{className:"level",children:[Object(p.jsx)("div",{className:"level-left"}),Object(p.jsx)("div",{className:"level-right",children:Object(p.jsx)("div",{className:"level-item",children:Object(p.jsx)("small",{className:"help",children:"".concat(Z," characters remaining")})})})]})]}),Object(p.jsxs)("label",{className:"label has-text-grey",children:["Locals Only: ",Object(p.jsx)("input",{onChange:_,name:"localsOnly",type:"checkbox"}),Object(p.jsxs)("small",{className:"help has-text-info",children:["Place will ",Object(p.jsx)("strong",{children:Object(p.jsx)("u",{className:"has-text-info",children:"only"})})," be viewed by locals"]})]})]}),Object(p.jsxs)("div",{className:"column",children:[Object(p.jsxs)("label",{className:"label has-text-grey",children:["Rating",Object(p.jsx)("div",{className:"control",children:Object(p.jsx)(v.a,{name:"rating",value:I,onChange:$})})]}),Object(p.jsxs)("label",{className:"label has-text-grey",children:["Price",Object(p.jsx)("div",{className:"control",children:Object(p.jsx)(N,{name:"price",value:J,onChange:$,icon:Object(p.jsx)("i",{className:"fas fa-dollar-sign"})})})]}),Object(p.jsxs)("label",{className:"label has-text-grey",children:["Amenities",Object(p.jsxs)("div",{className:"columns",children:[Object(p.jsx)("div",{className:"column",children:Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:Object(p.jsxs)("label",{className:"label",children:["Dine-In: ",Object(p.jsx)("input",{onChange:_,name:"dinein",type:"checkbox",className:"checkbox"})]})}),Object(p.jsx)("li",{children:Object(p.jsxs)("label",{className:"label",children:["Take-Out: ",Object(p.jsx)("input",{onChange:_,name:"takeout",type:"checkbox",className:"checkbox"})]})}),Object(p.jsx)("li",{children:Object(p.jsxs)("label",{className:"label",children:["Delivery: ",Object(p.jsx)("input",{onChange:_,name:"delivery",type:"checkbox",className:"checkbox"})]})})]})}),Object(p.jsx)("div",{className:"column",children:Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:Object(p.jsxs)("label",{className:"label",children:["Family Friendly: ",Object(p.jsx)("input",{onChange:_,name:"family",type:"checkbox",className:"checkbox"})]})}),Object(p.jsx)("li",{children:Object(p.jsxs)("label",{className:"label",children:["21+: ",Object(p.jsx)("input",{onChange:_,name:"adult",type:"checkbox",className:"checkbox"})]})}),Object(p.jsx)("li",{children:Object(p.jsxs)("label",{className:"label",children:["Dog Friendly: ",Object(p.jsx)("input",{onChange:_,name:"dog",type:"checkbox",className:"checkbox"})]})})]})})]})]})]})]}),Object(p.jsx)("div",{className:"level",children:Object(p.jsx)("button",{type:"submit",className:"button is-info level-item is-medium ".concat(d&&"is-loading"),children:"Submit"})})]})})]})})}))}}]);
//# sourceMappingURL=12.d779480f.chunk.js.map