(this.webpackJsonpmunch_mobile=this.webpackJsonpmunch_mobile||[]).push([[0],{11:function(e,t,n){e.exports=n(19)},16:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),i=n.n(o),c=(n(16),n(8)),s=n(1),u=n.n(s),l=n(4),d=n(2),m=n(3),h=n(7),f=n(5),p=n(6),v=(n(18),function(){function e(){Object(d.a)(this,e),this.id="",this.sections=[],this.recommended=[],this.restaurantName=""}return Object(m.a)(e,null,[{key:"fromJSON",value:function(t){var n=new e;return n.id=t["restaurant-id"].toString(),n.sections=t.sections.map((function(e){return b.fromJSON(e)})),n.recommended=t.recomendation.map((function(e){return e.toString()})),n.restaurantName=t.name,n}}]),e}()),b=function(){function e(){Object(d.a)(this,e),this.name="",this.foods=[]}return Object(m.a)(e,null,[{key:"fromJSON",value:function(t){var n=new e;return n.name=t["section-name"],n.foods=t.foods.map((function(e){return y.fromJSON(e)})),n}}]),e}(),y=function(){function e(){Object(d.a)(this,e),this.id="",this.name="",this.price=0,this.ingredients=[],this.description="",this.image=""}return Object(m.a)(e,null,[{key:"fromJSON",value:function(t){var n=new e;return n.id=t["item-id"].toString(),n.name=t.name,n.price=t.price,n.ingredients=t.ingredients,n.description=t.description,n.image=t.image,n}}]),e}(),g=function(){function e(t){Object(d.a)(this,e),this.address=void 0,this.address=t}return Object(m.a)(e,[{key:"testConnection",value:function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.post("echo","bruh");case 2:return e.t0=e.sent,e.abrupt("return","bruh"==e.t0);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMenu",value:function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.get("menu/"+t);case 2:return n=e.sent,console.log("[debug]",n),e.abrupt("return",v.fromJSON(n));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(l.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(this.address+"/"+t,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:return n=e.sent,a=n.json(),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0),console.log("[API Error] "+e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"post",value:function(){var e=Object(l.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(this.address+"/"+t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)});case 3:return a=e.sent,r=a.json(),e.abrupt("return",r);case 8:e.prev=8,e.t0=e.catch(0),console.log("[API Error] "+e.t0);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),k=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).food=void 0,n.food=e.foodData,n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("span",{className:"meal-box"},r.a.createElement("img",{src:"http://domainofthebones.com/resources/food_thumbs/"+this.food.image,className:"meal-thumb"}),r.a.createElement("div",{className:"meal-info"},r.a.createElement("h2",null,this.food.name),r.a.createElement("br",null),r.a.createElement("p",{className:"meal-desc"},this.food.description),r.a.createElement("p",{className:"price-tag"},this.food.price),r.a.createElement("i",null,r.a.createElement("p",{className:"ingredients"},"Ingredients: ",this.food.ingredients.join(", "))),r.a.createElement("span",{className:"order-input"},r.a.createElement("button",{onClick:function(){e.props.onIncrement(e.food.id,1)}},"+"),r.a.createElement("button",{disabled:0==this.props.quantities[this.food.id],onClick:function(){e.props.onIncrement(e.food.id,-1)}},"-"),r.a.createElement("p",{className:"order-input-quantity"},"Quantity: ",this.props.quantities[this.food.id]))))}}]),t}(a.Component),E=function(e){function t(e){var n;Object(d.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).idTable={},n.priceTable={};var a={},r=!0,o=!1,i=void 0;try{for(var c,s=n.props.menuData.sections[Symbol.iterator]();!(r=(c=s.next()).done);r=!0){var u=c.value,l=!0,m=!1,p=void 0;try{for(var v,b=u.foods[Symbol.iterator]();!(l=(v=b.next()).done);l=!0){var y=v.value;a[y.id]=0,n.idTable[y.id]=y.name,n.priceTable[y.id]=y.price}}catch(g){m=!0,p=g}finally{try{l||null==b.return||b.return()}finally{if(m)throw p}}}}catch(g){o=!0,i=g}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return console.log(a),n.state={foodQty:a},n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"hasOrderedAnything",value:function(){for(var e in this.state.foodQty){if(0!=this.state.foodQty[e])return!0}return!1}},{key:"onIncrement",value:function(e,t){var n={};for(var a in this.state.foodQty)n[a]=this.state.foodQty[a]+(e==a?1:0)*t;this.setState({foodQty:n})}},{key:"renderSection",value:function(e){var t=this;return r.a.createElement("div",{key:e.name},r.a.createElement("h1",null,e.name),r.a.createElement("ul",null,e.foods.map((function(e){return r.a.createElement(k,{key:e.id,foodData:e,quantities:t.state.foodQty,onIncrement:t.onIncrement.bind(t)})}))))}},{key:"getTotalOrderCost",value:function(){var e=0;for(var t in this.state.foodQty){e+=this.state.foodQty[t]*this.priceTable[t]}return Number(e).toFixed(2)}},{key:"renderBreakdown",value:function(){var e=this,t=[];for(var n in this.state.foodQty){var a=this.state.foodQty[n];0!=a&&t.push(r.a.createElement("span",{key:n,className:"breakdown-row"},r.a.createElement("p",{className:"breakdown-name"},this.idTable[n]),r.a.createElement("p",{className:"breakdown-qty"},"x",a)))}return r.a.createElement("div",{className:"order-summary"},r.a.createElement("h2",null,"Your order"),r.a.createElement("ul",null,t),r.a.createElement("h3",null,"Total: ",this.getTotalOrderCost()),r.a.createElement("button",{onClick:function(){e.props.onCheckout(e.state.foodQty)}},"Checkout"))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.hasOrderedAnything()?this.renderBreakdown():null,r.a.createElement("h1",{className:"title"},"Menu for ",this.props.menuData.restaurantName),r.a.createElement("ul",null,this.props.menuData.sections.map(this.renderSection.bind(this))),r.a.createElement("div",{className:"recommended"},r.a.createElement("h2",null,"Recommended for you by our top-notch AI:"),r.a.createElement("p",null,this.props.menuData.recommended.map((function(t){return e.idTable[t]})).join(", "))))}}]),t}(a.Component),O=new g("http://domainofthebones.com"),j=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).scanner=void 0,n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=console,e.next=3,O.getMenu("1");case 3:e.t1=e.sent,e.t0.log.call(e.t0,e.t1),window.onDecode=this.onDecode;case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"qr-box"},r.a.createElement("video",{id:"qr-preview"}),r.a.createElement("p",null,"Scan your restaurant's QR code!"))}},{key:"onDecode",value:function(e){console.log(e)}}]),t}(a.Component),w=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).state={stage:"scanning",failedToConnect:!1},window.onScanResolved=n.onScanResolved.bind(Object(c.a)(n)),n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.testConnection();case 2:e.sent?this.setState({stage:"scanning"}):this.setState({failedToConnect:!0});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onScanResolved",value:function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,O.getMenu(t);case 3:e.t1=e.sent,e.t2={activeMenu:e.t1,stage:"menu"},e.t0.setState.call(e.t0,e.t2),console.log(this.state.activeMenu);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onCheckout",value:function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({stage:"thanks"}),e.next=3,O.post("order",{"table-id":1,"restaurant-id":parseInt(this.state.activeMenu.id),order:t});case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"renderQRStage",value:function(){return r.a.createElement(j,null)}},{key:"renderMenuStage",value:function(){var e=this.state.activeMenu;return r.a.createElement(E,{menuData:e,onCheckout:this.onCheckout.bind(this)})}},{key:"renderEndStage",value:function(){return r.a.createElement("div",{className:"end-card"},r.a.createElement("h1",null,"Thank you for eating at ",this.state.activeMenu.restaurantName,"!"),r.a.createElement("button",{onClick:function(){window.location.reload()}},"Home"))}},{key:"renderCurrentStage",value:function(){return{scanning:this.renderQRStage.bind(this),menu:this.renderMenuStage.bind(this),thanks:this.renderEndStage.bind(this)}[this.state.stage]()}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"topnav"},r.a.createElement("img",{className:"logo",src:"http://domainofthebones.com/resources/pictures/munchLogoTrans.png"}),r.a.createElement("a",{onClick:function(){window.location.reload()}},"Home")),this.renderCurrentStage())}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[11,1,2]]]);
//# sourceMappingURL=main.fe4f89c3.chunk.js.map