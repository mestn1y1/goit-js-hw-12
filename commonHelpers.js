import{S as v,a as x,i as h}from"./assets/vendor-d93b82f1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function g(e){const o=document.querySelector(".gallery"),s=e.map(({largeImageURL:t,webformatURL:r,likes:l,views:w,comments:L,downloads:q})=>`
      <li class="gallery-item">
        <a href="${t}">
          <img src="${r}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${l}</p>
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
      `).join("");o.insertAdjacentHTML("beforeend",s),new v(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}async function y(e,o,s=20){const n={key:"44784729-ebc9a0f5cc587c2700d41657d",q:e,imageType:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:s},t="https://pixabay.com/api/";try{const r=await x.get(t,{params:n});if(r.status!==200)throw new Error(`Request failed with status ${r.status}`);return r.data}catch(r){throw new Error(r.message)}}const f="is-hidden";function E(e){e.classList.add(f)}function S(e){e.classList.remove(f)}function P(e,o){e.disabled=!0,o.classList.remove(f)}function C(e,o){e.disabled=!1,o.classList.add(f)}const a={hide:E,show:S,disable:P,enable:C},M=document.querySelector(".search-form");document.querySelector(".loader");const i=document.querySelector(".button"),m=document.querySelector(".spinner");let p="",u=1,c;M.addEventListener("submit",$);const d={q:"",page:1,per_page:15,maxPage:0};a.hide(i);async function $(e){e.preventDefault();const o=e.currentTarget;if(p=o.elements.query.value.trim().toLowerCase(),!p){h.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}if(c=document.querySelector(".gallery"),!c){console.error('Element with class "gallery-list" not found.');return}c.innerHTML="",u=1,a.show(i),a.disable(i,m);try{const{hits:s,total:n}=await y(p,u,d.per_page);d.maxPage=Math.ceil(n/d.per_page),s.length===0?h.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):(g(s),c.scrollIntoView({behavior:"smooth",block:"start"})),s.length!==n?(a.enable(i,m),i.addEventListener("click",b)):a.hide(i)}catch(s){N(s)}finally{o.reset()}}async function b(){u+=1,a.disable(i,m);try{const{hits:e}=await y(p,u,d.per_page);g(e);const{height:o}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}catch(e){console.log(e)}finally{a.enable(i,m),u===d.maxPage&&(a.hide(i),i.removeEventListener("click",b),h.show({title:"No more results",message:"No more results available.",position:"bottomRight",theme:"blue",timeout:3e3,progressBarColor:"#444444",icon:"fa fa-info-circle"}))}}function N(e){console.error("Fetch Error:",e)}
//# sourceMappingURL=commonHelpers.js.map
