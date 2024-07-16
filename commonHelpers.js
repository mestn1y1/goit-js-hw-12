import{S as x,a as P,i as m}from"./assets/vendor-d93b82f1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();function g(t){const r=document.querySelector(".gallery");r.innerHTML="";const s=t.map(({largeImageURL:n,webformatURL:e,likes:o,views:c,comments:w,downloads:q})=>`
      <li class="gallery-item">
        <a href="${n}">
          <img src="${e}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${o}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${c}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${w}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${q}</p>
          </li>
        </ul>
      </li>
      `).join("");r.insertAdjacentHTML("afterbegin",s),new x(".gallery a",{captionsData:"alt",captionDelay:250})}async function h(t,r){const s={key:"44784729-ebc9a0f5cc587c2700d41657d",q:t,imageType:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15},n="https://pixabay.com/api/";try{const e=await P.get(n,{params:s});if(e.status!==200)throw new Error(`Request failed with status ${e.status}`);return e.data}catch(e){throw new Error(e.message)}}const f="is-hidden";function v(t){t.classList.add(f)}function E(t){t.classList.remove(f)}function S(t,r){t.disabled=!0,r.classList.remove(f)}function M(t,r){t.disabled=!1,r.classList.add(f)}const i={hide:v,show:E,disable:S,enable:M},$=document.querySelector(".search-form"),y=document.querySelector(".loader"),a=document.querySelector(".button"),p=document.querySelector(".spinner");let u="",l=1;$.addEventListener("submit",O);const d={q:"",page:1,per_page:15,maxPage:0};i.hide(a);async function O(t){t.preventDefault();const r=t.currentTarget;if(u=r.elements.query.value.trim().toLowerCase(),!u){m.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}l=1,T(),i.show(a),i.disable(a,p);try{const{hits:s,total:n}=await h(u,l);d.maxPage=Math.ceil(n/d.per_page),console.log(d.maxPage),s.length===0?m.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):g(s),console.log(s,n),s.length!==n?(i.enable(a,p),a.addEventListener("click",L)):i.hide(a)}catch(s){F(s)}finally{b(),r.reset()}}async function L(){l+=1,i.disable(a,p);try{const{hits:t}=await h(u,l);g(t)}catch(t){console.log(t)}finally{i.enable(a,p),l===d.maxPage&&(i.hide(a),a.removeEventListener("click",L))}}function F(t){console.error("Fetch Error:",t),b()}function T(){y.style.display="block"}function b(){y.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
