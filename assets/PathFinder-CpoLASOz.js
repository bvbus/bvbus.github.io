import{r as M,f as W,u as G,g as J,c as Q,w as _,i as u,a as I,o as X,b as x,d as v,t as B,e as k,n as Y}from"./index-D-TpN3OW.js";const Z="/svgs/clock.svg",ee={style:{width:"100%",display:"flex"}},te=x("div",{class:"flex items-center gap-2 px-1",style:{"white-space":"nowrap","text-align":"center","vertical-align":"center",display:"flex","flex-direction":"row"}},[x("img",{src:Z,style:{height:"30px",width:"30px"}})],-1),oe={style:{"white-space":"nowrap","margin-left":"10px","margin-right":"10px",color:"#FED053","user-select":"none"}},se={style:{color:"#FED053","user-select":"none",margin:"5%"}},ne={style:{color:"#FED053","user-select":"none"}},ae={__name:"PathFinder",setup(ie){const F=u("toast"),R=u("loadingInProgress");u("loadDirectPathFinder");const L=u("loadStreetPoints"),C=u("loadStationTimetables"),$=u("busLinesMap"),f=u("selectedStartStation"),S=u("selectedDestinationStation"),E=u("streetPoints"),D=u("travelRoute");u("terminalNames");const O=u("processTimetables"),g=u("busStationsMap"),y=u("metroBusStationsMap"),j=u("graph"),P=u("stationsAndBusses"),N=M(!0),T=W(),A=G(),w=(e,n,i)=>{if(!n){console.error("attempt to get next departure time on non-existent timetable");return}for(let s of n)if(i){if(s.i===i&&s.minutes>=e)return s}else if(s.minutes>=e)return s;return null},U=(e,n,i)=>{for(let s of n)if(s.minutes>=e&&i.indexOf(s.i)>=0)return s;return null},V=(e,n)=>{const i=[];return $.forEach((s,t,l)=>{for(let a=1;a<s.s.length-1;a++)s.s[a-1]===e&&s.s[a]===n&&i.push(s.i)}),i},h=M([]),H=M(null),q=(e,n)=>{console.log("towards",n);const i=new Date;let s=i.getHours()*60+i.getMinutes(),t=null,l=w(s,e[0].timetable,t);if(l==null){console.error("no bus found at departure time");return}else if(l&&!$.has(l.i)){console.error("bus not found in map");return}else if(!l){console.error("ha-ha-ha : check the code logic (javascript rules!!!) - nextDepartureTime !== null but undefined");return}const a=[];t=$.get(l.i);for(let o=0;o<e.length;o++){if(t.s.indexOf(e[o].i)<0){const c=w(s,e[o-1].timetable,t.i);console.log(`${o} drop off bus ${t.n} station ${e[o-1].n} ${e[o-1].i} arrival ${c.time}`),h.value.push({n:t.n,c:t.c,tc:t.tc,time:c.time,station:e[o-1].n,op:"hop off"});const d=V(e[o-1].i,e[o].i),p=U(s,e[o-1].timetable,d);p!==null?(t=$.get(p.i),s=p.minutes,console.log(`${o} hop on bus ${t.n} station ${e[o-1].n} ${e[o-1].i} arrival ${p.time}`),h.value.push({n:t.n,c:t.c,tc:t.tc,time:c.time,station:e[o-1].n,op:"hop on"})):console.error(`${o} no busses found between`,e[o-1].n,e[o].n,e[o-1].i,e[o].i,d)}if(l=w(s,e[o].timetable,t.i),l===null){console.log(`${o} nextDepartureTime is null`);break}o>0&&a.push({f:e[o-1].i,t:e[o].i,c:t.c}),s=l.minutes,console.log(`${o} bus ${t.n} station ${e[o].n} ${e[o].i} arrival ${l.time}`),h.value.push({n:t.n,c:t.c,tc:t.tc,time:l.time,station:e[o].n,op:"ride"})}a.push({f:e[e.length-1].i,t:n.i,c:t.c});const m=w(s,n.timetable,t.i);if(m!==null)console.log(`final drop off bus ${t.n} station ${n.n} ${n.i} arrival ${m.time}`),h.value.push({n:t.n,c:t.c,tc:t.tc,time:m.time,station:n.n,op:"hop off"}),s=m.minutes;else{if(!t.si){console.error(`current bus has no sibling ${t.i}`);return}if(!$.has(t.si)){console.error(`sibling bus not found in the bus lines map ${t.i} ${t.si}`);return}const o=$.get(t.si);o?g.forEach((r,c,d)=>{for(let p=0;p<r.busses.length;p++)if(r.busses[p].i===o.i&&r.n===n.n){if(!r.timetable){console.error(`timetable is missing for station ${r.n} [${r.i}]`);break}const b=w(s,r.timetable,o.i);b!==null?(console.log(`final drop off sibling bus ${t.n} station ${r.n} ${r.i} arrival ${b.time}`),h.value.push({n:t.n,c:t.c,tc:t.tc,time:b.time}),s=b.minutes):console.error("error finding next departure time of the sibling bus",o.i,n.i);break}}):console.error("error finding sibling bus")}if(m!==null){const o=Math.floor(s/60),r=s-o*60;console.log("arrival",o,r)}return console.log("route",h.value),a},z=async(e,n)=>{const i=j.findRoute(e,n),s=[],t=[],l=[],a=[];f.value.timetable||t.push(C(f.value.i,f.value,O,()=>{console.error("error loading time tables",f.value.i),F.add({severity:"error",summary:`Error loading timetables for ${f.value.n}`,life:3e3}),R.value=!1})),s.push(f.value),l.push(e);for(let m=1;m<i.length;m++){const o=i[m-1],r=i[m],c=`${o}-${r}`;let d;if(g.has(r))d=g.get(r);else if(y.has(r))d=y.get(r);else{console.error(`could not find target station ${r} in bus stations map`);return}if(E.has(c)?a.push({f:o,t:r,d:E.get(c)}):t.push(L(c,b=>{E.set(c,b),a.push({f:o,t:r,d:b})},()=>{console.error(`error loading street points ${c}`)})),d.timetable||t.push(C(r,d,O,()=>{console.error("error loading time tables",r),F.add({severity:"error",summary:`Error loading timetables for ${d.n}`,life:3e3}),R.value=!1})),s.push(d),l.push(r),!P.has(c)){console.error(`stations key ${c} was not found while looking for busses ids`,d);continue}const p=P.get(c);console.log("station",d.i,d.n,c,p)}await Promise.all(t),q(s,S.value),D.value||(D.value={}),D.value.nodes=l,D.value.edges=a};J(async()=>{const e=parseInt(T.params.startStationId);if(!f.value){let i;if(g.has(e))i=g.get(e);else if(y.has(e))i=y.get(e);else{console.error(`could not find start station ${e} in bus stations map`);return}f.value=i}const n=parseInt(T.params.endStationId);if(!S.value){let i;if(g.has(n))i=g.get(n);else if(y.has(n))i=y.get(n);else{console.error(`could not find destination station ${n} in bus stations map`);return}S.value=i}await z(e,n)});const K=()=>{const e=parseInt(T.params.startStationId),n=parseInt(T.params.endStationId);A.push({name:"main",query:{startStation:e,endStation:n}})};return(e,n)=>{const i=I("Tag"),s=I("Column"),t=I("DataTable"),l=I("Drawer");return X(),Q(l,{visible:N.value,"onUpdate:visible":n[1]||(n[1]=a=>N.value=a),onHide:K,style:{"background-color":"#1E232B"}},{header:_(()=>[x("div",ee,[v(i,null,{default:_(()=>[te]),_:1}),x("h2",oe,B(k(f)?k(f).n:"?")+" - "+B(k(S)?k(S).n:"?"),1)])]),default:_(()=>[v(t,{selection:H.value,"onUpdate:selection":n[0]||(n[0]=a=>H.value=a),value:h.value,selectionMode:"single",scrollable:"",scrollHeight:"flex",style:{"background-color":"#1E232B"}},{default:_(()=>[v(s,{header:"Bus",style:{color:"#FED053","user-select":"none"}},{body:_(a=>[v(i,{rounded:!0,value:a.data.n,style:Y({minWidth:"40px",userSelect:"none",fontFamily:"TheLedDisplaySt",backgroundColor:a.data.c,color:a.data.tc})},null,8,["value","style"]),x("span",se,B(a.data.to),1)]),_:1}),v(s,{header:"Station",field:"station"}),v(s,{header:"Op",field:"op"}),v(s,{header:"Time"},{body:_(a=>[x("span",ne,B(a.data.time),1)]),_:1})]),_:1},8,["selection","value"])]),_:1},8,["visible"])}}};export{ae as default};
