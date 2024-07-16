import{S as x,a as P,i as m}from"./assets/vendor-d93b82f1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function g(e){const o=document.querySelector(".gallery");o.innerHTML="";const s=e.map(({largeImageURL:n,webformatURL:t,likes:r,views:l,comments:w,downloads:q})=>`
      <li class="gallery-item">
        <a href="${n}">
          <img src="${t}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${r}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${l}</p>
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
      `).join("");o.insertAdjacentHTML("beforeend",s),new x(".gallery a",{captionsData:"alt",captionDelay:250})}async function h(e,o,s=20){const n={key:"44784729-ebc9a0f5cc587c2700d41657d",q:e,imageType:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:s},t="https://pixabay.com/api/";try{const r=await P.get(t,{params:n});if(r.status!==200)throw new Error(`Request failed with status ${r.status}`);return r.data}catch(r){throw new Error(r.message)}}const f="is-hidden";function v(e){e.classList.add(f)}function E(e){e.classList.remove(f)}function S(e,o){e.disabled=!0,o.classList.remove(f)}function M(e,o){e.disabled=!1,o.classList.add(f)}const i={hide:v,show:E,disable:S,enable:M},$=document.querySelector(".search-form"),y=document.querySelector(".loader"),a=document.querySelector(".button"),p=document.querySelector(".spinner");let d="",u=1;$.addEventListener("submit",O);const c={q:"",page:1,per_page:15,maxPage:0};i.hide(a);async function O(e){e.preventDefault();const o=e.currentTarget;if(d=o.elements.query.value.trim().toLowerCase(),!d){m.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}u=1,T(),i.show(a),i.disable(a,p);try{const{hits:s,total:n}=await h(d,u,c.per_page);c.maxPage=Math.ceil(n/c.per_page),console.log(c.maxPage),s.length===0?m.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):g(s),console.log(s,n),s.length!==n?(i.enable(a,p),a.addEventListener("click",L)):i.hide(a)}catch(s){F(s)}finally{b(),o.reset()}}async function L(){u+=1,i.disable(a,p);try{const{hits:e}=await h(d,u,c.per_page);g(e)}catch(e){console.log(e)}finally{i.enable(a,p),u===c.maxPage&&(i.hide(a),a.removeEventListener("click",L))}}function F(e){console.error("Fetch Error:",e),b()}function T(){y.style.display="block"}function b(){y.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
