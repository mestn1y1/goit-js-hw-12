import{S as w,a as q,i as p}from"./assets/vendor-d93b82f1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();function f(e){const o=document.querySelector(".gallery");o.innerHTML="";const a=e.map(({largeImageURL:r,webformatURL:t,likes:s,views:l,comments:L,downloads:b})=>`
      <li class="gallery-item">
        <a href="${r}">
          <img src="${t}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${s}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${l}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${L}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${b}</p>
          </li>
        </ul>
      </li>
      `).join("");o.insertAdjacentHTML("afterbegin",a),new w(".gallery a",{captionsData:"alt",captionDelay:250})}async function m(e){const o={key:"44784729-ebc9a0f5cc587c2700d41657d",q:e,imageType:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15},a="https://pixabay.com/api/";try{const r=await q.get(a,{params:o});if(r.status!==200)throw new Error(`Request failed with status ${r.status}`);return r.data}catch(r){throw new Error(r.message)}}const d="is-hidden";function x(e){e.classList.add(d)}function P(e){e.classList.remove(d)}function v(e,o){e.disabled=!0,o.classList.remove(d)}function E(e,o){e.disabled=!1,o.classList.add(d)}const i={hide:x,show:P,disable:v,enable:E},S=document.querySelector(".search-form"),g=document.querySelector(".loader"),n=document.querySelector(".button"),u=document.querySelector(".spinner");let M="";S.addEventListener("submit",$);const c={q:"",page:1,per_page:15,maxPage:0};i.hide(n);async function $(e){e.preventDefault();const o=e.currentTarget,a=o.elements.query.value.trim().toLowerCase();if(!a){p.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}F(),i.show(n),i.disable(n,u);try{const{hits:r,total:t}=await m(a);c.maxPage=Math.ceil(t/c.per_page),console.log(c.maxPage),r.length===0?p.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):f(r),console.log(r,t),r.length!==t?(i.enable(n,u),n.addEventListener("click",h)):i.hide(n)}catch(r){O(r)}finally{y(),o.reset()}}async function h(){c.page+=1,i.disable(n,u);try{const{hits:e}=await m(M);f(e)}catch(e){console.log(e)}finally{i.enable(n,u),c.page===c.maxPage&&(i.hide(n),n.removeEventListener("click",h))}}function O(e){console.error("Fetch Error:",e),y()}function F(){g.style.display="block"}function y(){g.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
