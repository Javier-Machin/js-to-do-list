!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{const n=[];return{getName:()=>e,getDescription:()=>t,getTodo:()=>n,addTodo:(e,t,o,i)=>{const d=r(e,t,o,i);n.push(d)},asJSON:()=>{const o={};n.forEach((e,t)=>{const n={name:e.getName(),description:e.getDescription(),priority:e.getPriority(),dueTime:e.getDueTime()};o[`todo${t}`]=n});const r={name:e,description:t,todos:o};return JSON.stringify(r)}}},r=(e,t,n)=>{let o=!1;return{getName:()=>e,getDescription:()=>t,getDueTime:()=>{const e=new Date,t=e.getDate()+1;return`${e.getMonth()+1}/${t}/${e.getFullYear()}`},getPriority:()=>n,getCompleted:()=>isComplete,setCompleted:()=>{o=!1===o}}};(e=>{const t=document.getElementById("content"),n=document.createElement("button");n.innerHTML="New project",n.classList.add("new-project-btn"),n.addEventListener("click",()=>{alert("oy")}),t.appendChild(n),e.forEach(e=>{const n=document.createElement("article"),o=document.createElement("p"),r=document.createElement("p");o.classList.add("project-info"),r.classList.add("expand-icon"),o.innerHTML=`${e.getName()} | ${e.getDescription()}`,r.innerHTML="+",r.addEventListener("click",function(){"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+";let t=document.querySelector(".to-do-list");t?n.removeChild(t):function(e,t){const n=t.getTodo(),o=document.createElement("ol");o.classList.add("to-do-list"),n.forEach((e,t)=>{const n=document.createElement("li"),r=document.createElement("p"),i=document.createElement("p");r.classList.add("to-do-name"),i.classList.add("expand-icon"),r.innerHTML=e.getName(),i.innerHTML="+",i.addEventListener("click",function(){"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+";const o=document.getElementById(`.to-do-details-${t}`);o?o.parentNode.removeChild(o):function(e,t,n){const o=document.createElement("section");o.classList.add("to-do-details"),o.id=`.to-do-details-${n}`;const r=document.createElement("p"),i=document.createElement("p");r.innerHTML=e.getDescription(),i.innerHTML=`Due Time: ${e.getDueTime()} |\n                          Priority: ${e.getPriority()}`,o.appendChild(r),o.appendChild(i),t.appendChild(o)}(e,n,t)}),n.appendChild(i),n.appendChild(r),o.appendChild(n)}),e.appendChild(o)}(n,e)}),n.appendChild(r),n.appendChild(o),t.appendChild(n)})})((()=>{const e=window.localStorage;function t(t){e.setItem("projects",JSON.stringify(t))}return{load:()=>{const n=[];return e.getItem("projects")?function(){console.log("Stored projects found!");const t=e.getItem("projects"),r=JSON.parse(t);for(let e in r){e=JSON.parse(r[e]);const t=o(e.name,e.description);for(let n in e.todos)t.addTodo(e.todos[n].name,e.todos[n].description,e.todos[n].priority);n.push(t)}}():function(){const e=o("Create a repo","Steps to create new git repository");e.addTodo("Create a new folder","Open your terminal and         enter the command 'mkdir new_project'","normal"),e.addTodo("Initialize the repo","Enter the command 'git init'","normal");const r={};r[e.getName()]=e.asJSON(),t(r),n.push(e)}(),n},save:t}})().load())}]);