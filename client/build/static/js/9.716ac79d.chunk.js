(this.webpackJsonplocalsonly=this.webpackJsonplocalsonly||[]).push([[9],{139:function(e,t,a){"use strict";a(1);var n=a(138),c=a(0);t.a=function(e){var t=e.id;return Object(c.jsx)(n.b,{publicId:t})}},143:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(42);var c=a(52);function s(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},150:function(e,t,a){"use strict";a(1);var n=a(139),c=a(138),s=a(0);t.a=function(e){var t=e.avatar,a=function(){return Object(s.jsxs)("svg",{viewBox:"0 0 500 500",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(s.jsxs)("g",{id:"default-avatar",clipPath:"url(#clip0)",children:[Object(s.jsx)("g",{id:"background",children:Object(s.jsx)("rect",{id:"avatar-background",width:"500",height:"500",rx:"36",fill:"hsl(".concat(20*Math.floor(18*Math.random()),", 100%, 75%)")})}),Object(s.jsxs)("g",{id:"person",children:[Object(s.jsx)("circle",{id:"avatar-head",cx:"250",cy:"167",r:"115",fill:"white"}),Object(s.jsx)("path",{id:"avatar-body",d:"M475 445C475 414.5 451.295 385.249 409.099 363.683C366.903 342.116 309.674 330 250 330C190.326 330 133.097 342.116 90.901 363.683C48.7053 385.249 25 414.5 25 445L250 445H475Z",fill:"white"})]})]}),Object(s.jsx)("defs",{children:Object(s.jsx)("clipPath",{id:"clip0",children:Object(s.jsx)("rect",{width:"500",height:"500",fill:"white"})})})]})};return Object(s.jsx)("div",{className:"avatar",children:t?Object(s.jsx)(c.a,{cloudName:"dpjlvg7ql",secure:!1,upload_preset:"avatar_images",children:Object(s.jsx)(n.a,{id:t,preset:"avatar_images"})}):Object(s.jsx)(a,{})})}},193:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a(12),c=a.n(n),s=a(20),i=a(143),r=a(7),l=a(1),o=a(29),u=a(150),j=a(0),d=Object(o.c)((function(e){var t=e.user,a=e.setImage,n=e.image,c=function(e){e.images,e.setImages;return Object(j.jsxs)("div",{className:"tile is-child image-item",children:[Object(j.jsx)("span",{className:"is-small button is-inverted is-danger delete-image",title:"Remove",onClick:function(e){a(null)},children:Object(j.jsx)("i",{className:"far fa-trash-alt"})}),Object(j.jsx)("img",{src:URL.createObjectURL(n),alt:"Could not load"})]})};return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"file is-centered is-boxed has-name",children:Object(j.jsxs)("label",{className:"file-label",children:[Object(j.jsx)("input",{className:"file-input",src:"./LocalsOnly.png",type:"file",name:"images",onChange:function(e){e.preventDefault();var t=e.target.files;console.dir(t[0]),a(t[0])}}),Object(j.jsx)(u.a,{avatar:t.getAvatar()})]})}),n&&Object(j.jsx)(c,{})]})}));t.b=function(e){var t=e.folder,a=e.multiple,n=e.callback,o=Object(l.useState)(!1),u=Object(r.a)(o,2),d=u[0],b=u[1],m=Object(l.useState)([]),f=Object(r.a)(m,2),p=f[0],h=f[1],O=function(){var e=Object(s.a)(c.a.mark((function e(a){var i,r,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),console.log(p),i=new FormData,b(!0),r=p.map(function(){var e=Object(s.a)(c.a.mark((function e(a){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.append("file",a),i.append("upload_preset","".concat(t,"_images")),e.next=4,fetch("https://api.cloudinary.com/v1_1/dpjlvg7ql/image/upload",{method:"POST",body:i}).then((function(e){return e.json()})).then((function(e){var t=e.public_id;return console.log(t),t}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=7,Promise.all(r);case 7:l=e.sent,n(l),b(!1);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(e){var t=e.images,a=e.setImages,n=function(e){e.persist();var n=Number(e.target.id);console.log("Image name: "+n);var c=t[n].name;a(t.filter((function(e){return e.name!==c})))};return Object(j.jsx)("div",{className:"tile is-ancestor",children:Object(j.jsx)("div",{className:"tile is-parent image-row",children:t&&t.map((function(e,t){return Object(j.jsxs)("div",{className:"tile is-child image-item",children:[Object(j.jsx)("span",{className:"is-small button is-inverted is-danger delete-image",title:"Remove",id:t,onClick:n,children:Object(j.jsx)("i",{className:"far fa-trash-alt"})}),Object(j.jsx)("img",{src:URL.createObjectURL(e),alt:"Could not load"})]},t)}))})})};return Object(j.jsxs)("form",{onSubmit:O,className:"form-container",children:[Object(j.jsx)("div",{className:"file is-centered is-boxed has-name",children:Object(j.jsxs)("label",{className:"file-label",children:[Object(j.jsx)("input",{className:"file-input",multiple:a,type:"file",name:"images",onChange:function(e){e.preventDefault();var t=e.target.files;h(a?function(e){return[].concat(Object(i.a)(e),Object(i.a)(t))}:Object(i.a)(t))}}),Object(j.jsxs)("span",{className:"file-cta",children:[Object(j.jsx)("span",{className:"file-icon",children:Object(j.jsx)("i",{className:"fas fa-images"})}),Object(j.jsx)("span",{className:"file-label",children:"Get images"})]})]})}),Object(j.jsxs)("div",{className:"buttons is-centered section",children:[Object(j.jsx)("button",{type:"submit",className:"button is-success",children:"Upload"}),Object(j.jsx)("button",{type:"submit",className:"button is-danger",onClick:function(e){e.preventDefault(),h([])},children:"Remove all"})]}),d?Object(j.jsx)("div",{children:"Loading..."}):Object(j.jsx)(v,{images:p,setImages:h})]})}},377:function(e,t,a){"use strict";a.r(t);var n=a(12),c=a.n(n),s=a(20),i=(a(1),a(53)),r=a.n(i),l=a(193),o=a(24),u=a.n(o),j=a(29),d=a(0),b=Object(j.c)((function(e){var t=e.user,a=e.location.search,n=r.a.parse(a),i=n.id,o=n.name,j=function(){var e=Object(s.a)(c.a.mark((function e(a){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.dir(a),e.next=3,u.a.post("/api/v1/images/locals/".concat(i,"/users/").concat(t.getID()),{images:a}).then((function(e){console.log(e.status)})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsx)("main",{id:"image-upload-page",className:"section content",children:Object(d.jsxs)("section",{className:"box section container",children:[Object(d.jsxs)("p",{className:"title",children:["Upload Images: ",o]}),Object(d.jsx)(l.b,{folder:"local",multiple:!0,callback:j})]})})}));t.default=b}}]);
//# sourceMappingURL=9.716ac79d.chunk.js.map