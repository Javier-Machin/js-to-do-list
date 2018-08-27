!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t)=>{const n=[];return{getName:()=>e,getDescription:()=>t,getTodo:()=>n,addTodo:(e,t,o)=>{const d=r(e,t,o);n.push(d)},deleteTodo:e=>{n.splice(e,1)},asJSON:()=>{const o={};n.forEach((e,t)=>{const n={name:e.getName(),description:e.getDescription(),priority:e.getPriority(),dueTime:e.getDueTime()};o[`todo${t}`]=n});const r={name:e,description:t,todos:o};return JSON.stringify(r)}}},r=(e,t,n)=>{let o=!1;return{getName:()=>e,getDescription:()=>t,getDueTime:()=>{const e=new Date,t=e.getDate()+1;return`${e.getMonth()+1}/${t}/${e.getFullYear()}`},getPriority:()=>n,getCompleted:()=>o,setCompleted:()=>{o=!1===o}}},d=(()=>{const e=window.localStorage,t=[];let n={};function r(t){e.setItem("projects",JSON.stringify(t))}return{load:()=>{e.getItem("projects")?function(){console.log("Stored projects found!"),n=JSON.parse(e.getItem("projects"));for(let e in n){e=JSON.parse(n[e]);const r=o(e.name,e.description);for(let t in e.todos)r.addTodo(e.todos[t].name,e.todos[t].description,e.todos[t].priority);t.push(r)}}():function(){const e=o("Create a repo","Steps to create new git repository");e.addTodo("Create a new folder","Open your terminal and         enter the command 'mkdir new_project'","normal"),e.addTodo("Initialize the repo","Enter the command 'git init'","normal"),n[e.getName()]=e.asJSON(),r(n),t.push(e)}()},save:r,getProjects:()=>t,newProject:function(e,d){const i=o(e,d);n[i.getName()]=i.asJSON(),r(n),t.push(i)},deleteProject:function(e){const o=t[e];delete n[o.getName()],r(n),t.splice(e,1)},updateProject:function(e){n[e.getName()]=e.asJSON(),r(n),t.push(e)}}})(),i=(()=>{const e=document.getElementById("content");return{renderProjects:function(t){!function(){const t=document.createElement("button");t.innerHTML="New project",t.id="new-project-btn",t.addEventListener("click",()=>{const t=document.querySelector(".project-form");t?e.removeChild(t):function(){const t=document.createElement("form"),n=document.createElement("input"),o=document.createElement("input"),r=document.createElement("button"),i=document.getElementById("new-project-btn");t.classList.add("project-form"),n.type="text",n.name="name",n.placeholder="Enter your project's name",o.type="text",o.name="description",o.placeholder="Enter a short description",r.innerHTML="Create",r.classList.add("submit-form-btn"),r.addEventListener("click",()=>{const e=n.value,t=o.value;d.newProject(e,t)}),t.appendChild(n),t.appendChild(o),t.appendChild(r),e.insertBefore(t,i.nextSibling)}()}),e.appendChild(t)}(),t.forEach((t,n)=>{const o=document.createElement("article"),r=document.createElement("p"),i=document.createElement("p"),c=document.createElement("p");r.classList.add("project-info"),i.classList.add("expand-icon"),c.classList.add("delete-icon"),r.innerHTML=`${t.getName()} | ${t.getDescription()}`,i.innerHTML="+",c.innerHTML="🗑",c.title="Remove project",i.addEventListener("click",function(){const e=document.getElementById(`to-do-list-${n}`);if(e?o.removeChild(e):function(e,t,n){const o=t.getTodo(),r=document.createElement("ol");r.classList.add("to-do-list"),r.id=`to-do-list-${n}`,0!==o.length&&(o.forEach((e,n)=>{const o=document.createElement("li"),i=document.createElement("p"),c=document.createElement("p"),a=document.createElement("p");i.classList.add("to-do-name"),c.classList.add("expand-icon"),a.classList.add("delete-icon"),i.innerHTML=e.getName(),c.innerHTML="+",a.innerHTML="🗑",a.title="Remove to-do",c.addEventListener("click",function(){"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+";const t=document.getElementById(`.to-do-details-${n}`);t?t.parentNode.removeChild(t):function(e,t,n){const o=document.createElement("section");o.classList.add("to-do-details"),o.id=`.to-do-details-${n}`;const r=document.createElement("p"),d=document.createElement("p");r.innerHTML=e.getDescription(),d.innerHTML=`Due Time: ${e.getDueTime()} |\n                          Priority: ${e.getPriority()}`,o.appendChild(r),o.appendChild(d),t.appendChild(o)}(e,o,n)}),a.addEventListener("click",function(){const e=confirm("Are you sure you want to delete this to-do?");e&&(t.deleteTodo(n),d.updateProject(t),o.parentNode.removeChild(o))}),o.appendChild(c),o.appendChild(i),o.appendChild(a),r.appendChild(o)}),e.appendChild(r))}(o,t,n),"+"==this.innerHTML)!function(e,t,n){const o=document.createElement("button");o.innerHTML="New to-do",o.id=`new-todo-btn-${n}`,o.classList.add("new-todo-btn"),o.addEventListener("click",()=>{const o=document.getElementById(`to-do-form-${n}`);o?e.removeChild(o):function(e,t,n){const o=document.createElement("form"),r=document.createElement("input"),i=document.createElement("input"),c=document.createElement("input"),a=document.createElement("button");o.classList.add("to-do-form"),o.id=`to-do-form-${n}`,r.type="text",r.name="name",r.placeholder="Enter your project's name",i.type="text",i.name="description",i.placeholder="Enter a short description",c.type="text",c.name="priority",c.placeholder="Enter priority",a.innerHTML="Create",a.classList.add("submit-form-btn"),a.addEventListener("click",()=>{const e=r.value,n=i.value,o=c.value;t.addTodo(e,n,o),d.updateProject(t)}),o.appendChild(r),o.appendChild(i),o.appendChild(c),o.appendChild(a),e.appendChild(o)}(e,t,n)}),e.appendChild(o)}(o,t,n);else{const e=document.getElementById(`new-todo-btn-${n}`);o.removeChild(e)}"+"==this.innerHTML?this.innerHTML="-":this.innerHTML="+"}),c.addEventListener("click",function(){confirm("Are you sure you want to delete this project?")&&(d.deleteProject(n),o.parentNode.removeChild(o))}),o.appendChild(i),o.appendChild(r),o.appendChild(c),e.appendChild(o)})}}})();d.load();const c=d.getProjects();i.renderProjects(c)}]);