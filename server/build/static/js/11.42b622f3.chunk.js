(this.webpackJsonplocalsonly=this.webpackJsonplocalsonly||[]).push([[11],{140:function(e,a,t){"use strict";t(1);var s=t(139),c=t(0);a.a=function(e){var a=e.id;return Object(c.jsx)(s.b,{publicId:a})}},159:function(e,a,t){"use strict";t.d(a,"a",(function(){return n}));t(1);var s=t(0),c=t(173),n=function(e){var a,t=e.rating,c=e.className,n=t-.5,r=!1;n===Math.floor(t)&&(r=!0),r?(a=4-n,t-=1):a=5-t;for(var i=[],l=0;l<t;l++)i.push("fas fa-star");r&&i.push("fas fa-star-half-alt");for(var o=0;o<a;o++)i.push("far fa-star");return Object(s.jsx)("div",{className:c,children:i.map((function(e,a){return Object(s.jsx)("i",{className:"".concat(e," has-text-success")},a)}))})};a.b=function(e){var a=e.loading,t=e.children,n=e.className;return Object(s.jsx)("div",{className:n,children:a?Object(s.jsxs)("div",{className:"loading has-text-centered",children:[Object(s.jsx)("div",{className:"animate__slower animate__animated animate__pulse animate__infinite",children:Object(s.jsx)("img",{alt:"LocalsOnly",src:c})}),Object(s.jsx)("p",{children:"Wait while we search"})]}):t})}},173:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/LocalsOnly.3121d9ef.png"},189:function(e,a,t){"use strict";var s=t(1),c=t(223),n=t(19),r=t(0),i={lat:33.421996,lng:-111.939935};a.a=Object(c.GoogleApiWrapper)({apiKey:n.b})((function(e){Object(s.useEffect)((function(){}),[]);var a=function(){var a=i;if(void 0!==e.markers&&void 0!==e.markers[0]&&null!==e.markers[0]&&void 0!==e.markers[0].lat)if(e.markers.length>1){var t=0,s=0;e.markers.forEach((function(e){t+=parseFloat(e.lat),s+=parseFloat(e.lng)})),t/=e.markers.length,s/=e.markers.length,a={lat:t,lng:s}}else 1===e.markers.length&&(a=e.markers[0]);return a};return Object(r.jsx)(c.Map,{google:e.google,zoom:e.zoom,initialCenter:a(),center:a(),containerStyle:e.style,style:{borderRadius:"6px"},children:function(){if(void 0!==e.markers&&void 0!==e.markers[0]&&null!==e.markers[0]&&void 0!==e.markers[0].lat){if(e.markers.length>1){var a=[];return e.markers.forEach((function(e,t){a.push(Object(r.jsx)(c.Marker,{position:{lat:e.lat,lng:e.lng}},t))})),a}return Object(r.jsx)(c.Marker,{position:{lat:e.markers[0].lat,lng:e.markers[0].lng}})}return Object(r.jsx)(c.Marker,{position:i})}()})}))},386:function(e,a,t){"use strict";t.r(a);var s=t(12),c=t.n(s),n=t(144),r=t(20),i=t(7),l=t(1),o=t(10),d=t(159),j=t(140),u=t(0),m=function(e){var a=function(){var a=e.price;return Object(n.a)(Array(a).keys()).map((function(e,a){return Object(u.jsx)("i",{className:"fas fa-dollar-sign has-text-success is-size-5"},a)}))};return Object(u.jsx)(o.b,{id:e.id,className:"box",to:"/local?id=".concat(e.id),children:Object(u.jsxs)("section",{className:"columns",children:[Object(u.jsx)("span",{className:"column is-4",children:Object(u.jsx)("figure",{className:"image",children:void 0===e.image?Object(u.jsx)("img",{src:"./LocalsOnly.png",alt:"LocalsOnly Logo"}):Object(u.jsx)(j.a,{id:e.image.url,preset:"local_images"})})}),Object(u.jsxs)("article",{className:"column",children:[Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("h1",{children:e.name}),Object(u.jsxs)("div",{className:"level-left",children:[Object(u.jsx)(d.a,{className:"level-item",rating:e.rating}),Object(u.jsx)("div",{className:"level-item",children:"".concat(e.reviewCount," review").concat(1===e.reviewCount?"":"s")}),Object(u.jsx)("div",{className:"level-item",children:Object(u.jsx)(a,{})})]}),Object(u.jsx)("div",{children:e.hours.isClosed?Object(u.jsx)("p",{className:"has-text-danger",children:"closed"}):Object(u.jsxs)("p",{children:[Object(u.jsx)("span",{className:"has-text-success",children:"open"})," ",e.hours.from," - ",e.hours.to]})})]}),Object(u.jsx)("span",{className:"block",children:e.description})]})]})})},h=t(53),b=t.n(h),f=t(189),O=t(29),x=t(55),p=t(6),v=t(24),g=t.n(v),N=t(139),k=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];a.default=Object(x.a)(O.c,p.h)((function(e){var a=e.user,t=e.location.search,s=e.madeSearch,j=e.setMadeSearch,h=Object(l.useState)([]),O=Object(i.a)(h,2),x=O[0],p=O[1],v=Object(l.useState)(!0),y=Object(i.a)(v,2),w=y[0],_=y[1],C=Object(l.useState)(null),S=Object(i.a)(C,2),L=S[0],M=S[1],z=Object(l.useState)(10),E=Object(i.a)(z,1)[0],D=Object(l.useCallback)(Object(r.a)(c.a.mark((function e(){var a,s,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.a.parse(t),s=a.what,r=a.where,e.next=3,g.a.get("/api/v1/locals?".concat(s?"what=".concat(s):"","&where=").concat(r,"&limit=").concat(E).concat(L?"&offset=".concat(L):"")).then((function(e){var a=e.data,t=a.data,s=a.after;console.log(t),t&&"function"===typeof t[Symbol.iterator]&&p((function(e){return[].concat(Object(n.a)(e),Object(n.a)(t))})),M(s)})).catch((function(e){console.error(e),p([{message:"Unable to connect"}])}));case 3:_(!1),j(!1);case 5:case"end":return e.stop()}}),e)}))),[E,L,t,j]);Object(l.useEffect)((function(){D()}),[D,s]);var W=function(){return Object(u.jsx)("div",{className:"mx-6 container is-centered",children:Object(u.jsxs)("div",{className:"notification is-info has-text-centered",children:[Object(u.jsx)("p",{className:"subtitle",children:"We could not find anything!"}),Object(u.jsxs)("p",{children:["You can help by adding new places to the database ",Object(u.jsx)(o.b,{className:"is-text is-focused",to:"/create-local",children:"here"}),"."]})]})})},A=function(){if(!x)return Object(u.jsx)(W,{});if(void 0!==x[0]&&x[0].message)return Object(u.jsx)("div",{children:Object(u.jsx)("p",{children:x[0].message})});var e=k[(new Date).getDay()],t=x.filter((function(e){return a.isLocalTo(e)})).map((function(a,t){var s=a.hours[e];return Object(u.jsx)(m,{i:t,id:a._id,name:a.name,description:a.description,rating:a.rating,reviewCount:a.reviewCount,hours:s,address:a.address,image:a.images.data[0],price:a.price},t)}));return t.length<=0?Object(u.jsx)(W,{}):t};return Object(u.jsx)("main",{className:"",id:"results-page",children:Object(u.jsxs)("div",{className:"columns pt-4",children:[Object(u.jsxs)(d.b,{className:" is-two-fifths column side result-card",loading:w,children:[Object(u.jsx)(N.a,{cloudName:"dpjlvg7ql",secure:!1,upload_preset:"local_images",children:x&&Object(u.jsx)(A,{})}),L?Object(u.jsx)("div",{className:"text-has-line my-5 is-clickable",onClick:function(e){e.preventDefault(),console.log(e),D()},children:Object(u.jsx)("span",{children:"show more"})}):x?Object(u.jsx)("div",{className:"my-5 container is-centered",children:Object(u.jsxs)("div",{className:"notification is-info has-text-centered",children:[Object(u.jsx)("p",{className:"subtitle",children:"This is all we could find!"}),Object(u.jsxs)("p",{children:["You can help by adding new places to the database ",Object(u.jsx)(o.b,{className:"is-text is-focused",to:"/create-local",children:"here"}),"."]})]})}):null]}),Object(u.jsx)("div",{className:"column is-medium is-hidden-mobile",children:x&&Object(u.jsx)(f.a,{style:{height:"89vh",width:"58.5vw"},zoom:16,markers:x.map((function(e){return e.geo}))})})]})})}))}}]);
//# sourceMappingURL=11.42b622f3.chunk.js.map