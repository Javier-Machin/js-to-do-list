!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n=(e,t)=>{const o=[];return{getName:()=>e,getDescription:()=>t,getTodo:()=>o,addTodo:(e,t,n,i)=>{const c=r(e,t,n,i);o.push(c)},asJSON:()=>{const n={};o.forEach((e,t)=>{const o={name:e.getName(),description:e.getDescription(),priority:e.getPriority()};n[`todo${t}`]=o});const r={name:e,description:t,todos:n};return JSON.stringify(r)}}},r=(e,t,o,n)=>{let r=!1;return{getName:()=>e,getDescription:()=>t,getDueTime:()=>o,getPriority:()=>n,getCompleted:()=>isComplete,setCompleted:()=>{r=!1===r}}};!function(e){const t=document.getElementById("content");e.forEach(e=>{const o=document.createElement("article"),n=document.createElement("p");n.innerHTML=`${e.getName()} | ${e.getDescription()}`,o.appendChild(n),t.appendChild(o)})}({load:()=>{const e=window.localStorage,t=[];return e.getItem("projects")?function(){console.log("Stored projects found!");const o=e.getItem("projects"),r=JSON.parse(o);for(let e in r){e=JSON.parse(r[e]);const o=n(e.name,e.description);for(let t in e.todos)o.addTodo(e.todos[t].name,e.todos[t].description,Date().toLocaleString(),e.todos[t].priority);t.push(o)}}():function(){const o=n("Create a repo","Steps to create new git repository");o.addTodo("Create a new folder","Open your terminal and         enter the command 'mkdir new_project'",Date().toLocaleString(),"normal"),o.addTodo("Initialize the repo","Enter the command 'git init'",Date().toLocaleString(),"normal");const r={};r[o.getName()]=o.asJSON(),e.setItem("projects",JSON.stringify(r)),console.log(e.getItem("projects")),t.push(o)}(),t}}.load())}]);