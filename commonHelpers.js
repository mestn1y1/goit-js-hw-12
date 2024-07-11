import{S as f,i as c}from"./assets/vendor-f33cd494.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function d(o){const r=document.querySelector(".gallery");r.innerHTML="";const i=o.map(({largeImageURL:s,webformatURL:e,likes:t,views:n,comments:u,downloads:p})=>`
      <li class="gallery-item">
        <a href="${s}">
          <img src="${e}" alt="" class="card-img"/>
        </a>
        <ul class="galery-item-description">
          <li>
            <p class="count-text">Likes</p>
            <p class="count">${t}</p>
          </li>
          <li>
            <p class="count-text">Views</p>
            <p class="count">${n}</p>
          </li>
          <li>
            <p class="count-text">Comments</p>
            <p class="count">${u}</p>
          </li>
          <li>
            <p class="count-text">Downloads</p>
            <p class="count">${p}</p>
          </li>
        </ul>
      </li>
      `).join("");r.insertAdjacentHTML("afterbegin",i),new f(".gallery a",{captionsData:"alt",captionDelay:250})}function m(o){const t=`https://pixabay.com/api/?key=44784729-ebc9a0f5cc587c2700d41657d&q=${o}&image_type=photo&orientation=horizontal&safesearch=${!0}`;return fetch(t).then(n=>{if(!n.ok)throw new Error(n.status);return n.json()})}const y=document.querySelector(".search-form"),a=document.querySelector(".loader");y.addEventListener("submit",h);function h(o){o.preventDefault();const r=o.currentTarget,i=r.elements.query.value.trim().toLowerCase();if(!i){c.error({title:"Error",message:"Please enter a search query.",position:"topRight",timeout:2e3});return}L(),m(i).then(s=>{s.hits.length===0?c.warning({title:"Warning",message:"Nothing found for your request.",position:"topRight",timeout:2e3}):d(s.hits)}).catch(g).finally(()=>{l(),r.reset()})}function g(o){console.error("Fetch Error:",o),l()}function L(){a.style.display="block"}function l(){a.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
