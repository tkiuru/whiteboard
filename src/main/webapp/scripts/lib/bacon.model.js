(function(){var a,b,c=[].slice;b=function(a){var b,d,e,f,g,h,i,j,k,l,m,n;return h=function(a){return a},k=function(a){return a.length>0},f=function(a,b,c){var d,e,f;for(e=0,f=a.length;f>e;e++)d=a[e],b=c(b,d);return b},j=function(b){return b instanceof a.Property},g=0,i=1,e=function(a,b){return a===b},l=function(a){return function(b,c){return!b.initial&&a(b.value,c.value)}},d=a.Model=function(c){var f,g,j,k,o,p,q,r;return o=i++,g=e,p=0,k=new a.Bus,q=new a.Bus,f=void 0,r=a.update({initial:!0},[k],function(a,b){var c,d,e,f,g,h;return h=a.value,g=b.source,d=b.f,f=d(h),e=[o],c=f!==h,{source:g,value:f,modStack:e,changed:c}},[q],function(a,b){return b}).skipDuplicates(l(g)).changes().toProperty(),j=r.map(".value").skipDuplicates(g),j.onValue(function(a){return f=a}),j.id=o,j.addSyncSource=function(b){return q.plug(b.filter(function(b){return b.changed&&!a._.contains(b.modStack,o)}).doAction(function(){return a.Model.syncCount++}).map(function(a){return m(a,"modStack",a.modStack.concat([o]))}).map(function(a){return n.set(a,j.syncConverter(n.get(a)))}))},j.apply=function(a){return k.plug(a.toEventStream().map(function(b){return{source:a,f:b}})),r.changes().filter(function(b){return b.source!==a}).map(function(a){return a.value})},j.addSource=function(a){return j.apply(a.map(function(a){return function(){return a}}))},j.modify=function(b){return j.apply(a.once(b))},j.set=function(a){return j.modify(function(){return a})},j.get=function(){return f},j.syncEvents=function(){return r.toEventStream()},j.bind=function(a){return this.addSyncSource(a.syncEvents()),a.addSyncSource(this.syncEvents())},j.onValue(),arguments.length>=1&&j.set(c),j.lens=function(a){var c;return a=b(a),c=d(),this.addSyncSource(j.sampledBy(c.syncEvents(),function(b,c){return n.set(c,a.set(b,c.value))})),c.addSyncSource(this.syncEvents().map(function(b){return n.set(b,a.get(b.value))})),c},j.syncConverter=h,j},a.Model.syncCount=0,d.combine=function(a){var c,e,f,g,h,i;if("object"!=typeof a)return d(a);if(j(a))return a;c=a instanceof Array?[]:{},h=d(c);for(e in a)i=a[e],f=b.objectLens(e),g=h.lens(f),g.bind(d.combine(i));return h},a.Binding=function(b){var c,d,e,f,g,h,i;return f=b.initValue,e=b.get,c=b.events,i=b.set,g=c.map(e),null!=f?i(f):f=e(),h=a.Model(f),d=h.addSource(g),d.assign(i),h},b=a.Lens=function(a){return"object"==typeof a?a:b.objectLens(a)},b.id=b({get:function(a){return a},set:function(a,b){return b}}),b.objectLens=function(a){var c,d;return d=function(a){return b({get:function(b){return b[a]},set:function(b,c){return m(b,a,c)}})},c=a.split(".").filter(k),b.compose.apply(b,c.map(d))},b.compose=function(){var a,d;return a=1<=arguments.length?c.call(arguments,0):[],d=function(a,c){return b({get:function(b){return c.get(a.get(b))},set:function(b,d){var e,f;return e=a.get(b),f=c.set(e,d),a.set(b,f)}})},f(a,b.id,d)},n=b.objectLens("value"),m=function(a,b,c){var d,e,f;d=a instanceof Array?[]:{};for(e in a)f=a[e],d[e]=f;return null!=b&&(d[b]=c),d},a},"undefined"!=typeof module&&null!==module?(a=require("baconjs"),module.exports=b(a)):"function"==typeof define&&define.amd?define(["bacon"],b):b(this.Bacon)}).call(this);
