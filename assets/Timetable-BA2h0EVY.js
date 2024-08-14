import{f as A,u as O,r as g,l as E,g as j,c as z,w as m,i as d,a as v,o as L,b as y,d as f,t as _,e as S,n as V,m as G}from"./index-BeWc03P9.js";const J="/svgs/bus_stop_shelter.svg",K={style:{width:"100%",display:"flex"}},Q=y("div",{class:"flex items-center gap-2 px-1",style:{"white-space":"nowrap","text-align":"center","vertical-align":"center",display:"flex","flex-direction":"row"}},[y("img",{src:J,style:{height:"30px",width:"30px"}})],-1),X={style:{"white-space":"nowrap","margin-left":"10px","margin-right":"10px",color:"#FED053","user-select":"none"}},Y={style:{color:"#FED053","user-select":"none",margin:"5%"}},ee={__name:"Timetable",setup(Z){const w=A(),h=O(),x=d("loadingInProgress"),r=d("selectedStartStation"),D=d("metroBusStationsMap"),M=d("busStationsMap"),q=d("loadStationTimetables"),N=d("processTimetables"),I=d("selectedTime"),k=d("isWeekend"),T=d("toast"),C=g(!0),n=g("Today"),R=g(["Today",k?"Weekdays":"Saturday / Sunday"]),u=g([]);let B=!1,p=g(null);const b=(e,t)=>{if(!t){console.error("no table to scroll into");return}if(!u.value){console.error("timetable not ready");return}if(e==="Today"){const c=u.value.findIndex(i=>i.future);if(c!==-1){let i;i=()=>{const o=t.$el.querySelectorAll(".p-datatable-selectable-row");o[c-1]?o[c-1].scrollIntoView({behavior:"auto"}):setTimeout(i,100)},i()}return}const a=t.$el.querySelectorAll(".p-datatable-selectable-row");!a||!a[0]||a[0].scrollIntoView({behavior:"auto"})},H=e=>{if(!e.data.future){T.add({severity:"error",summary:"Selected time is in the past",life:3e3});return}const t=parseInt(w.params.stationId);h.push({name:"main",query:{startStation:t,selectedBus:e.data.i,selectedTime:e.data.minutes}})},U=e=>{e.stopImmediatePropagation(),console.log("onBusNumberClicked",e)};E(p,e=>{b(n.value,e)}),E(n,e=>{if(B){B=!1;return}b(e,p.value)});const F=()=>{let e=new Date,t=e.getHours()*60+e.getMinutes(),a=-1;const c=[];r.value.timetable.forEach(o=>{const s={...o};s.future=!1,k?(s.day===2||s.day===3||s.day===4)&&(t<s.minutes&&(a<0&&(a=s.minutes),s.future=!0),c.push(s)):s.day===1&&(t<s.minutes&&(a<0&&(a=s.minutes),s.future=!0),c.push(s))}),u.value=c;let i;i=()=>{e=new Date,t=e.getHours()*60+e.getMinutes(),a=-1;for(let o=0;o<u.value.length;o++)t<u.value[o].minutes?a<0&&(a=u.value[o].minutes):u.value[o].future&&(u.value[o].future=!1);b(n.value,p.value),setTimeout(i,(a-t)*60*1e3-500)},setTimeout(i,(a-t)*60*1e3-500)};j(async()=>{const e=parseInt(w.params.stationId);if(isNaN(e)){T.add({severity:"error",summary:"Selected station is not valid",life:3e3}),await h.push({name:"main"});return}if(n.value!=="Today"&&(B=!0,n.value="Today"),r.value===null){x.value=!0;let t;if(M.has(e))t=M.get(e);else if(D.has(e))t=D.get(e);else{console.error(`${e} station not found in the busStationsMap and metroBusStationsMap`);return}if(!t){console.error("targetStation is null");return}r.value=t,r.value.timetable||await q(e,r.value,N,()=>{console.error("error loading time tables",e),T.add({severity:"error",summary:"Error loading timetables",life:3e3}),x.value=!1}),F(),b(n.value,p.value),x.value=!1}else r.value.i===e?(F(),b(n.value,p.value)):(T.add({severity:"error",summary:"Selected station is not valid",life:3e3}),await h.push({name:"main"}))});const W=()=>{const e=parseInt(w.params.stationId);h.push({name:"main",query:{startStation:e}})};return(e,t)=>{const a=v("Tag"),c=v("Marquee"),i=v("SelectButton"),o=v("Column"),s=v("DataTable"),$=v("Drawer");return L(),z($,{visible:C.value,"onUpdate:visible":t[2]||(t[2]=l=>C.value=l),onHide:W,style:{"background-color":"#1E232B"}},{header:m(()=>[y("div",K,[f(a,null,{default:m(()=>[Q]),_:1}),y("h2",X,_(S(r).t?"Terminal":"Station")+" "+_(S(r).n),1),f(c,{id:"linesInStation",style:{width:"100%"},items:S(r).busses},null,8,["items"])])]),default:m(()=>[f(s,{ref_key:"busTable",ref:p,selection:S(I),"onUpdate:selection":t[1]||(t[1]=l=>G(I)?I.value=l:null),value:n.value==="Today"?u.value:S(r).extraTimetable,selectionMode:n.value==="Today"?"single":null,scrollable:"",scrollHeight:"flex",onRowSelect:H,style:{"background-color":"#1E232B"}},{header:m(()=>[f(i,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=l=>n.value=l),options:R.value,"aria-labelledby":"basic",style:{display:"flex",width:"100%"}},null,8,["modelValue","options"])]),default:m(()=>[f(o,{header:"Bus",style:{color:"#FED053","user-select":"none"}},{body:m(l=>[f(a,{rounded:!0,onClick:U,value:l.data.n,style:V({minWidth:"40px",userSelect:"none",fontFamily:"TheLedDisplaySt",backgroundColor:l.data.c,color:l.data.tc})},null,8,["value","style"]),y("span",Y,_(l.data.to),1)]),_:1}),f(o,{header:"Time"},{body:m(l=>[y("span",{style:V(l.data.future?"color: #FED053;user-select: none;":"color: #3B3F46;user-select: none;")},_(l.data.time),5)]),_:1})]),_:1},8,["selection","value","selectionMode"])]),_:1},8,["visible"])}}};export{ee as default};
