import{S as x,a as v,i as m}from"./assets/vendor-d93b82f1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function g(e){const o=document.querySelector(".gallery"),s=e.map(({largeImageURL:t,webformatURL:r,likes:c,views:w,comments:L,downloads:q})=>`
      <li class="gallery-item">
        <a href="${t}">
          <img src="${r}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${c}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${w}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${L}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${q}</p>
          </li>
        </ul>
      </li>
      `).join("");o.insertAdjacentHTML("beforeend",s),new x(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}async function y(e,o,s=20){const i={key:"44784729-ebc9a0f5cc587c2700d41657d",q:e,imageType:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:s},t="https://pixabay.com/api/";try{const r=await v.get(t,{params:i});if(r.status!==200)throw new Error(`Request failed with status ${r.status}`);return r.data}catch(r){throw new Error(r.message)}}const h="is-hidden";function E(e){e.classList.add(h)}function S(e){e.classList.remove(h)}function P(e,o){e.disabled=!0,o.classList.remove(h)}function M(e,o){e.disabled=!1,o.classList.add(h)}const a={hide:E,show:S,disable:P,enable:M},$=document.querySelector(".search-form");document.querySelector(".loader");const n=document.querySelector(".button"),f=document.querySelector(".spinner");let p="",u=1,l;$.addEventListener("submit",C);const d={q:"",page:1,per_page:15,maxPage:0};a.hide(n);async function C(e){e.preventDefault();const o=e.currentTarget;if(p=o.elements.query.value.trim().toLowerCase(),!p){m.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}if(l=document.querySelector(".gallery"),!l){console.error('Element with class "gallery-list" not found.');return}l.innerHTML="",u=1,a.show(n),a.disable(n,f);try{const{hits:s,total:i}=await y(p,u,d.per_page);d.maxPage=Math.ceil(i/d.per_page),s.length===0?m.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):(g(s),l.scrollIntoView({behavior:"smooth",block:"start"})),s.length!==i?(a.enable(n,f),n.addEventListener("click",b)):a.hide(n)}catch(s){O(s)}finally{o.reset()}}async function b(){u+=1,a.disable(n,f);try{const{hits:e}=await y(p,u,d.per_page);g(e);const{height:o}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}catch(e){console.log(e)}finally{a.enable(n,f),u===d.maxPage&&(a.hide(n),n.removeEventListener("click",b))}}function O(e){console.error("Fetch Error:",e)}
//# sourceMappingURL=commonHelpers.js.map
