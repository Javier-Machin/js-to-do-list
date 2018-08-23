!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{const n=[];return{getName:()=>e,getDescription:()=>t,getTodo:()=>n,addTodo:(e,t,o,i)=>{const c=r(e,t,o,i);n.push(c)},asJSON:()=>{const o={};n.forEach((e,t)=>{const n={name:e.getName(),description:e.getDescription(),priority:e.getPriority(),dueTime:e.getDueTime()};o[`todo${t}`]=n});const r={name:e,description:t,todos:o};return JSON.stringify(r)}}},r=(e,t,n)=>{let o=!1;return{getName:()=>e,getDescription:()=>t,getDueTime:()=>{const e=new Date,t=e.getDate()+1;return`${e.getMonth()+1}/${t}/${e.getFullYear()}`},getPriority:()=>n,getCompleted:()=>isComplete,setCompleted:()=>{o=!1===o}}},i=(()=>{const e=window.localStorage,t=[];let n={};function r(t){e.setItem("projects",JSON.stringify(t))}return{load:()=>{e.getItem("projects")?function(){console.log("Stored projects found!"),n=JSON.parse(e.getItem("projects"));for(let e in n){e=JSON.parse(n[e]);const r=o(e.name,e.description);for(let t in e.todos)r.addTodo(e.todos[t].name,e.todos[t].description,e.todos[t].priority);t.push(r)}}():function(){const e=o("Create a repo","Steps to create new git repository");e.addTodo("Create a new folder","Open your terminal and         enter the command 'mkdir new_project'","normal"),e.addTodo("Initialize the repo","Enter the command 'git init'","normal"),n[e.getName()]=e.asJSON(),r(n),t.push(e)}()},save:r,getProjects:()=>t,newProject:function(e,i){!function(e){n[e.getName()]=e.asJSON(),r(n),t.push(e)}(o(e,i))}}})(),c=(()=>{const e=document.getElementById("content");return{renderProjects:function(t){!function(){const t=document.createElement("button");t.innerHTML="New project",t.id="new-project-btn",t.addEventListener("click",()=>{const t=document.querySelector(".project-form");t?e.removeChild(t):function(){const t=document.createElement("form"),n=document.createElement("input"),o=document.createElement("input"),r=document.createElement("button"),c=document.getElementById("new-project-btn");t.classList.add("project-form"),n.type="text",n.name="name",n.placeholder="Enter your project's name",o.type="text",o.name="description",o.placeholder="Enter a short description",r.innerHTML="Create",r.addEventListener("click",()=>{const e=n.value,t=o.value;i.newProject(e,t)}),t.appendChild(n),t.appendChild(o),t.appendChild(r),e.insertBefore(t,c.nextSibling)}()}),e.appendChild(t)}(),t.forEach(t=>{const n=document.createElement("article"),o=document.createElement("p"),r=document.createElement("p");o.classList.add("project-info"),r.classList.add("expand-icon"),o.innerHTML=`${t.getName()} | ${t.getDescription()}`,r.innerHTML="+",r.addEventListener("click",function(e){"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+";let o=document.querySelector(".to-do-list");o?e.target.parentNode==o.parentNode&&n.removeChild(o):function(e,t){const n=t.getTodo();if(0===n.length)return;const o=document.createElement("ol");o.classList.add("to-do-list"),n.forEach((e,t)=>{const n=document.createElement("li"),r=document.createElement("p"),i=document.createElement("p");r.classList.add("to-do-name"),i.classList.add("expand-icon"),r.innerHTML=e.getName(),i.innerHTML="+",i.addEventListener("click",function(){"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+";const o=document.getElementById(`.to-do-details-${t}`);o?o.parentNode.removeChild(o):function(e,t,n){const o=document.createElement("section");o.classList.add("to-do-details"),o.id=`.to-do-details-${n}`;const r=document.createElement("p"),i=document.createElement("p");r.innerHTML=e.getDescription(),i.innerHTML=`Due Time: ${e.getDueTime()} |\n                          Priority: ${e.getPriority()}`,o.appendChild(r),o.appendChild(i),t.appendChild(o)}(e,n,t)}),n.appendChild(i),n.appendChild(r),o.appendChild(n)}),e.appendChild(o)}(n,t)}),n.appendChild(r),n.appendChild(o),e.appendChild(n)})}}})();i.load();const d=i.getProjects();c.renderProjects(d)}]);