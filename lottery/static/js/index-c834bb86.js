import{a as c,am as _,d as u,o as i,D as m,f as n,as as d,u as r,_ as p}from"./entry-62004b40.js";const f=""+new URL("../img/draw-bg-cdca0911.png",import.meta.url).href,g=""+new URL("../img/start-ec7c4239.png",import.meta.url).href;function v(){const e=c(0);return{angle:e,lotteryHandler:()=>{const t=e.value%360/60,a=Math.floor(Math.random()*5),s=!(a%2),o=(a-t)*60;e.value=e.value+o+360*8,setTimeout(()=>{_(s?"\u606D\u559C\u4E2D\u5956\u5566\uFF01":"\u5F88\u9057\u61BE\uFF0C\u6CA1\u4E2D\u5956")},5e3)}}}const y={class:"turntable"},b={class:"bg"},x=u({name:"Simple"}),h=u({...x,setup(e){const{angle:l,lotteryHandler:t}=v();return(a,s)=>(i(),m("main",null,[n("div",y,[n("div",b,[n("img",{class:"draw-bg",style:d({transform:`rotate(${r(l)}deg)`}),src:f},null,4),n("img",{class:"start-btn",src:g,onClick:s[0]||(s[0]=(...o)=>r(t)&&r(t)(...o))})])])]))}});const F=p(h,[["__scopeId","data-v-167b1a1f"]]);export{F as default};
