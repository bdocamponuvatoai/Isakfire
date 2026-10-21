'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const menu = $('#mobile-menu');
const menuButton = $('.menu-toggle');
menuButton?.addEventListener('click', () => { menu.showModal(); menuButton.setAttribute('aria-expanded', 'true'); });
$('.menu-close')?.addEventListener('click', () => menu.close());
menu?.addEventListener('close', () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.focus(); });
$$('nav a').forEach(link => { if (link.pathname === location.pathname) link.setAttribute('aria-current', 'page'); });

const tabs = $$('[data-service-tab]');
function activateTab(tab) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target !== undefined) { event.preventDefault(); activateTab(tabs[target]); tabs[target].focus(); }
  });
});

$$('[data-filter-scope]').forEach(scope => {
  const buttons = $$('[data-filter]', scope), items = $$('[data-category]', scope), search = $('[data-search]', scope);
  let category = buttons[0]?.dataset.filter || '';
  function filter() {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let count = 0;
    items.forEach(item => {
      const visible = (category.startsWith('All ') || item.dataset.category === category) && item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !visible; if (visible) count++;
    });
    const empty = $('.empty-message', scope); if (empty) empty.hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filter();
  }));
  search?.addEventListener('input', filter);
});

const form = $('#quote-form');
if (form) {
  let step = 0, requestText = '';
  const panels = $$('.form-step', form), next = $('#quote-next'), back = $('#quote-back'), email = $('#quote-email'), copy = $('#quote-copy'), error = $('#form-error');
  const params = new URLSearchParams(location.search);
  const service = params.get('service'), region = params.get('region');
  $$('input[name="services"]', form).forEach(input => { input.checked = input.dataset.slug === service; });
  const select = form.elements.namedItem('region');
  if ([...select.options].some(option => option.value === region)) select.value = region;
  function getData() {
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    return { services: data.getAll('services').join(', '), stage:value('stage'), propertyType:value('propertyType'), region:value('region'), address:value('address'), size:value('size'), floors:value('floors'), message:value('message'), name:[value('firstName'),value('lastName')].join(' '), company:value('company'), email:value('email'), phone:value('phone'), preferred:value('preferred') };
  }
  function review() {
    const d = getData(), target = $('#quote-review'); target.replaceChildren();
    const groups = [['Your project', [['Services',d.services],['Project stage',d.stage]]],['Your property',[['Property type',d.propertyType],['Location',d.region],['Address',d.address],['Square footage',d.size],['Floors',d.floors],['Details',d.message]]],['Your details',[['Name',d.name],['Company',d.company],['Email',d.email],['Phone',d.phone],['Preferred contact',d.preferred]]]];
    const lines = ['Hello Isak Fire Protection,','', 'I would like to discuss the following project.',''];
    groups.forEach(([title,entries]) => {
      const section = document.createElement('section'); section.className = 'review-group';
      const heading = document.createElement('h3'); heading.textContent = title; section.append(heading);
      const list = document.createElement('dl'); lines.push(title.toUpperCase());
      entries.forEach(([label,value]) => { if (!value) return; const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent=label;dd.textContent=value;list.append(dt,dd);lines.push(label+': '+value); });
      section.append(list);target.append(section);lines.push('');
    });
    lines.push('Thank you.');requestText=lines.join('\n');
    email.href='mailto:sales@isakfire.com?subject='+encodeURIComponent('Fire protection inquiry — '+(d.company||d.name))+'&body='+encodeURIComponent(requestText);
  }
  function showStep(index, focus = true) {
    step=index;panels.forEach((panel,i)=>{panel.hidden=i!==step;});
    $$('[data-step-label]').forEach((label,i)=>{label.classList.toggle('active',i===step);label.classList.toggle('complete',i<step);if(i===step)label.setAttribute('aria-current','step');else label.removeAttribute('aria-current');});
    back.hidden=step===0;next.hidden=step===3;email.hidden=step!==3;copy.hidden=step!==3;error.hidden=true;
    if(step===3)review();
    if(focus){const heading=$('h2',panels[step]);heading.tabIndex=-1;heading.focus();heading.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  }
  function validate() {
    error.hidden=true;
    if(step===0&&!$$('input[name="services"]:checked',form).length){error.textContent='Select at least one service, or choose “Help me decide.”';error.hidden=false;$$('input[name="services"]',form)[0].focus();return false;}
    const inputs=$$('input,select,textarea',panels[step]);
    inputs.forEach(input=>input.removeAttribute('aria-invalid'));
    const invalid=inputs.find(input=>!input.checkValidity()||(input.required&&!input.value.trim()));
    if(invalid){invalid.setAttribute('aria-invalid','true');error.textContent=invalid.type==='email'?'Enter a valid email address.':'Please complete the required fields with valid information.';error.hidden=false;invalid.focus();return false;}
    return true;
  }
  form.addEventListener('submit',event=>{event.preventDefault();if(step<3&&validate())showStep(step+1);});
  back.addEventListener('click',()=>showStep(Math.max(0,step-1)));
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(requestText);$('#copy-status').textContent='Request copied. Paste it into an email to sales@isakfire.com.';}catch{$('#copy-status').textContent='Your browser could not copy automatically. Use Open email draft or select the review details to copy them.';}});
  email.addEventListener('click',()=>{$('#copy-status').textContent='Your email app will open a draft. Review and send it there; nothing has been submitted from this page.';});
  showStep(0,false);
}
