// Keep previously shared section links working after the move to individual pages.
const legacyPages = {'#menu':'menu.html','#specials':'specials.html','#events':'private-events.html','#takeout':'delivery-takeout.html','#visit':'find-us.html'};
if ((location.pathname === '/' || location.pathname.endsWith('/index.html')) && legacyPages[location.hash]) location.replace(legacyPages[location.hash]);
const navigation = document.querySelector('#navigation');
const navToggle = document.querySelector('#nav-toggle');
function closeNavigation() { navigation.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', 'Open navigation'); }
navToggle.addEventListener('click', () => { const open = navToggle.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open', open); navToggle.setAttribute('aria-expanded', String(open)); navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
navigation.addEventListener('click', e => { if (e.target.closest('a')) closeNavigation(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNavigation(); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeNavigation(); });
const notes = {Burgers:'All burgers served with fries.',Sandwiches:'All sandwiches served with fries.',Salads:'Add chicken +$5 / shrimp +$7 / tri-tip +$8.','Smokehouse Signature Plates':'Choose two sides: baked potato, fries, rice, or sautéed vegetables.','Kids Menu':'Kids meals include fries and a drink, except Kids Alfredo.'};
const labels = {'Smokehouse Signature Plates':'Smokehouse','Grillhouse Entrees':'Grillhouse','Flat Bread Pizzas':'Flatbreads','Kids Menu':'For the kids','Brunch Menu':'Brunch'};
const images = {'Classic Hamburger':'classic.webp','Bacon Cheese Burger':'burger.webp','Western Chicken Burger':'chicken.webp','Avocado Mushroom Burger':'avocado.webp','Double Cheese Burger':'double.webp','Big Pappa Burger':'big-pappa.webp','Teriyaki Salmon Burger':'salmon-burger.webp','Bone-In Wings':'wings.webp','French Fries':'fries.webp','Chips & Housemade Guacamole':'guacamole.webp','Pepperoni Flat Bread':'flatbread.webp','Classic Caesar Salad':'caesar.webp','Steakhouse Beef Kebab':'kebab.webp'};
let items = [], category = 'Burgers', menuReady = false;
const search = document.querySelector('#menu-search'), list = document.querySelector('#menu-items'), categories = document.querySelector('#categories'), detail = document.querySelector('#detail-dialog'), photo = document.querySelector('#photo-dialog');
function node(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text !== undefined) el.textContent = text; return el; }
function render() {
  categories.querySelectorAll('button').forEach(b => { const active = b.dataset.category === category; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  const query = search.value.toLowerCase().trim();
  const filtered = items.filter(i => (query || category === 'All' || i.category === category) && (i.name + ' ' + i.description + ' ' + i.category).toLowerCase().includes(query));
  document.querySelector('#menu-category-title').textContent = query ? 'Search results' : category === 'All' ? 'The whole menu' : labels[category] || category;
  document.querySelector('#menu-note').textContent = query ? 'Searching across the whole menu.' : notes[category] || 'Pick something delicious. Click a dish to take a closer look.';
  document.querySelector('#menu-count').textContent = filtered.length + (filtered.length === 1 ? ' dish' : ' dishes');
  list.replaceChildren();
  for (const item of filtered) {
    const article = node('article', 'menu-item');
    if (images[item.name]) { const button = node('button', 'menu-item-photo'); button.dataset.dish = item.name; button.setAttribute('aria-label', 'View ' + item.name); const img = node('img'); img.src = 'assets/' + (item.thumbnail || images[item.name]); img.alt = ''; img.decoding = 'async'; img.loading = 'lazy'; img.width = 73; img.height = 73; button.append(img); article.append(button); }
    const copy = node('div', 'menu-item-copy'); if (category === 'All' || query) copy.append(node('small', '', (labels[item.category] || item.category).toUpperCase()));
    const heading = node('div', 'menu-item-heading'), button = node('button', '', item.name); button.dataset.dish = item.name; button.setAttribute('aria-label', 'View details for ' + item.name); heading.append(button, node('strong', '', item.price)); copy.append(heading, node('p', '', item.description)); article.append(copy); list.append(article);
  }
  if (!filtered.length) { const empty = node('div', 'menu-empty'); empty.append(node('p', '', 'No dishes found. Try another craving.')); const reset = node('button', 'button button-outline', 'Show the full menu'); reset.addEventListener('click', () => { search.value = ''; category = 'All'; render(); }); empty.append(reset); list.append(empty); }
}
function showDialog(dialog) { if (!dialog.open) { dialog.showModal(); document.body.classList.add('modal-open'); } }
function showDish(name) {
  if (!menuReady) return;
  const item = items.find(i => i.name === name); if (!item) return;
  const img = document.querySelector('#detail-image'); img.hidden = !images[name]; if (images[name]) { img.src = 'assets/' + images[name]; img.alt = name; } else { img.removeAttribute('src'); img.alt = ''; }
  document.querySelector('#detail-category').textContent = (labels[item.category] || item.category).toUpperCase(); document.querySelector('#detail-title').textContent = name; document.querySelector('#detail-price').textContent = item.price; document.querySelector('#detail-description').textContent = item.description; document.querySelector('#detail-note').textContent = notes[item.category] || 'Ask our team about ingredients and availability.'; showDialog(detail);
}
document.addEventListener('click', e => { const dish = e.target.closest('[data-dish]'); if (dish) showDish(dish.dataset.dish); const image = e.target.closest('[data-photo]'); if (image) { const img = document.querySelector('#gallery-image'); img.src = image.dataset.photo; img.alt = image.dataset.caption; document.querySelector('#photo-caption').textContent = image.dataset.caption; showDialog(photo); } });
for (const dialog of [detail, photo]) { dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); }); dialog.addEventListener('close', () => { if (!detail.open && !photo.open) document.body.classList.remove('modal-open'); }); }
if (categories) categories.addEventListener('click', e => { const button = e.target.closest('button'); if (button) { category = button.dataset.category; search.value = ''; render(); } });
if (search) search.addEventListener('input', render);
if (list || document.querySelector('[data-dish]')) fetch('menu.json').then(r => { if (!r.ok) throw new Error('Menu unavailable'); return r.json(); }).then(data => { items = data; for (const item of items) if (item.image) images[item.name] = item.image; if (categories) for (const name of ['All', ...new Set(items.map(i => i.category))]) { const button = node('button'); button.type = 'button'; button.dataset.category = name; button.append(node('span', 'category-name', labels[name] || name), node('span', 'category-count', String(name === 'All' ? items.length : items.filter(i => i.category === name).length))); categories.append(button); } menuReady = true; if (list) render(); }).catch(() => { if (list) list.replaceChildren(node('p', 'menu-empty', 'The menu could not load. Please use the dine-in menu PDF above.')); });
function updateOpeningStatus() {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:'America/Los_Angeles', weekday:'short', hour:'numeric', minute:'numeric', hourCycle:'h23'}).formatToParts(new Date()); const value = type => parts.find(p => p.type === type)?.value; const day = value('weekday'), hour = Number(value('hour')), minute = Number(value('minute')); const now = hour * 60 + minute; const close = day === 'Fri' || day === 'Sat' ? 23 : day === 'Sun' ? 21 : 22; const open = day !== 'Mon' && now >= 11 * 60 && now < close * 60; document.querySelector('#opening-status').textContent = open ? 'Open today until ' + (close - 12) + ' pm' : day === 'Mon' ? 'Back Tuesday at 11 am' : now < 11 * 60 ? 'Opening today at 11 am' : 'See you ' + (day === 'Sun' ? 'Tuesday' : 'tomorrow') + ' at 11 am'; document.querySelector('.status-dot').classList.toggle('is-open', open);
}
updateOpeningStatus(); setInterval(updateOpeningStatus, 60000); document.querySelector('#year').textContent = new Date().getFullYear();
