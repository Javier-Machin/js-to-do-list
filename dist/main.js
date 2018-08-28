!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{const n=[];return{getName:()=>e,getDescription:()=>t,getTodo:()=>n,setTodo:(e,t)=>{n[e]=t},addTodo:(e,t,o,d="false")=>{const i=r(e,t,o,d);n.push(i)},deleteTodo:e=>{n.splice(e,1)},asJSON:()=>{const o={};n.forEach((e,t)=>{const n={name:e.getName(),description:e.getDescription(),priority:e.getPriority(),dueTime:e.getDueTime(),isCompleted:e.getCompleted()};o[`todo${t}`]=n});const r={name:e,description:t,todos:o};return JSON.stringify(r)}}},r=(e,t,n,o)=>{return{getName:()=>e,getDescription:()=>t,getDueTime:()=>{const e=new Date,t=e.getDate()+1;return`${e.getMonth()+1}/${t}/${e.getFullYear()}`},getPriority:()=>n,getCompleted:()=>o,setCompleted:()=>{o="false"===o?"true":"false"}}},d=(()=>{const e=window.localStorage,t=[];let n={};function r(t){e.setItem("projects",JSON.stringify(t))}return{load:()=>{e.getItem("projects")?function(){console.log("Stored projects found!"),n=JSON.parse(e.getItem("projects"));for(let e in n){e=JSON.parse(n[e]);const r=o(e.name,e.description);for(let t in e.todos)r.addTodo(e.todos[t].name,e.todos[t].description,e.todos[t].priority,e.todos[t].isCompleted);t.push(r)}}():function(){const e=o("Create a repo","Steps to create new git repository");e.addTodo("Create a new folder","Open your terminal and         enter the command 'mkdir new_project'","Normal","false"),e.addTodo("Initialize the repo","Enter the command 'git init'","Normal","false"),n[e.getName()]=e.asJSON(),r(n),t.push(e)}()},save:r,getProjects:()=>t,newProject:function(e,d){const i=o(e,d);n[i.getName()]=i.asJSON(),r(n),t.push(i)},deleteProject:function(e){const o=t[e];delete n[o.getName()],r(n),t.splice(e,1)},updateProject:function(e){n[e.getName()]=e.asJSON(),r(n),t.push(e)}}})(),i=(()=>{const e=document.getElementById("content");function t(e="null",t="null",n="null",o="null"){return t.length>15?(alert("Name too long, max 15 characters"),!1):"project"==e&&n.length>20?(alert("Description too long, max 20 characters"),!1):"to-do"==e&&n.length>30?(alert("Description too long, max 30 characters"),!1):"null"!==o&&"Low"!==o&&"Normal"!==o&&"High"!==o?(alert("Priority only can be 'Low', 'Normal' or 'High'"),!1):t.length<4?(alert("Name too short, min 4 characters"),!1):!(n.length<4)||(alert("Description too short, min 4 characters"),!1)}return{renderProjects:function(n){!function(){const n=document.createElement("button");n.innerHTML="New project",n.id="new-project-btn",n.addEventListener("click",()=>{const n=document.querySelector(".project-form");n?e.removeChild(n):function(){const n=document.createElement("form"),o=document.createElement("input"),r=document.createElement("input"),i=document.createElement("button"),c=document.getElementById("new-project-btn");n.classList.add("project-form"),o.type="text",o.name="name",o.placeholder="Enter your project's name",r.type="text",r.name="description",r.placeholder="Enter a short description",i.innerHTML="Create",i.classList.add("submit-form-btn"),i.addEventListener("click",()=>{const e=o.value,n=r.value;t("project",e,n)&&d.newProject(e,n)}),n.appendChild(o),n.appendChild(r),n.appendChild(i),e.insertBefore(n,c.nextSibling)}()}),e.appendChild(n)}(),n.forEach((n,o)=>{const r=document.createElement("article"),i=document.createElement("p"),c=document.createElement("p"),a=document.createElement("p");i.classList.add("project-info"),c.classList.add("expand-icon"),a.classList.add("delete-icon"),i.innerHTML=`${n.getName()} | ${n.getDescription()}`,c.innerHTML="+",a.innerHTML="🗑",a.title="Remove project",c.addEventListener("click",function(){const e=document.getElementById(`to-do-list-${o}`),i=document.getElementById(`to-do-form-${o}`);if(e?(r.removeChild(e),i&&r.removeChild(i)):function(e,t,n){const o=t.getTodo(),r=document.createElement("ol");r.classList.add("to-do-list"),r.id=`to-do-list-${n}`,0!==o.length&&(o.forEach((e,n)=>{const o=document.createElement("li"),i=document.createElement("p"),c=document.createElement("p"),a=document.createElement("p"),l=document.createElement("p"),s=()=>{"true"===e.getCompleted()?(c.innerHTML="Done",c.classList.remove("red"),c.classList.add("green")):(c.innerHTML="Pending",c.classList.remove("green"),c.classList.add("red"))};i.classList.add("to-do-name"),c.classList.add("to-do-status"),a.classList.add("expand-icon"),l.classList.add("delete-icon"),i.innerHTML=e.getName(),s(),c.addEventListener("click",()=>{e.setCompleted(),t.setTodo(n,e),d.updateProject(t),s()}),a.innerHTML="+",l.innerHTML="🗑",l.title="Remove to-do",a.addEventListener("click",function(){"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+";const t=document.getElementById(`.to-do-details-${n}`);t?t.parentNode.removeChild(t):function(e,t,n){const o=document.createElement("section");o.classList.add("to-do-details"),o.id=`.to-do-details-${n}`;const r=document.createElement("p"),d=document.createElement("p");r.innerHTML=e.getDescription(),d.innerHTML=`Due Time: ${e.getDueTime()} |\n                          Priority: ${e.getPriority()}`,o.appendChild(r),o.appendChild(d),t.appendChild(o)}(e,o,n)}),l.addEventListener("click",function(){const e=confirm("Are you sure you want to delete this to-do?");e&&(t.deleteTodo(n),d.updateProject(t),o.parentNode.removeChild(o))}),o.appendChild(a),o.appendChild(i),o.appendChild(c),o.appendChild(l),r.appendChild(o)}),e.appendChild(r))}(r,n,o),"+"==this.innerHTML)!function(e,n,o){const r=document.createElement("button");r.innerHTML="New to-do",r.id=`new-todo-btn-${o}`,r.classList.add("new-todo-btn"),r.addEventListener("click",()=>{const r=document.getElementById(`to-do-form-${o}`);r?e.removeChild(r):function(e,n,o){const r=document.createElement("form"),i=document.createElement("input"),c=document.createElement("input"),a=document.createElement("input"),l=document.createElement("button");r.classList.add("to-do-form"),r.id=`to-do-form-${o}`,i.type="text",i.name="name",i.placeholder="Enter to-do name",c.type="text",c.name="description",c.placeholder="Enter a short description",a.type="text",a.name="priority",a.placeholder="Enter priority",l.innerHTML="Create",l.classList.add("submit-form-btn"),l.addEventListener("click",()=>{const e=i.value,o=c.value,r=a.value;t("todo",e,o,r)&&(n.addTodo(e,o,r),d.updateProject(n))}),r.appendChild(i),r.appendChild(c),r.appendChild(a),r.appendChild(l),e.appendChild(r)}(e,n,o)}),e.appendChild(r)}(r,n,o);else{const e=document.getElementById(`new-todo-btn-${o}`);r.removeChild(e)}"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+"}),a.addEventListener("click",function(){confirm("Are you sure you want to delete this project?")&&(d.deleteProject(o),r.parentNode.removeChild(r))}),r.appendChild(c),r.appendChild(i),r.appendChild(a),e.appendChild(r)})}}})();d.load();const c=d.getProjects();i.renderProjects(c)}]);