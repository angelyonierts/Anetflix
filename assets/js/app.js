const catalog = document.querySelector('#catalog');
const detailModal = document.querySelector('#detail-modal');
const videoModal = document.querySelector('#video-modal');

function renderCatalog(items = window.catalog) {
  if (!catalog) return;
  const categories = ['Series', 'Peliculas'];
  catalog.innerHTML = categories.map(category => {
    const cards = items
      .filter(item => item.category === category)
      .map(item => `
        <button class="catalog-card" type="button" data-title="${item.title}"
          style="--card-a:${item.a};--card-b:${item.b}">
          <strong>${item.title}</strong>
        </button>
      `).join('');
    return `<section class="catalog-row"><h2>${category === 'Series' ? 'Series populares' : 'Peliculas populares'}</h2><div class="catalog-grid">${cards}</div></section>`;
  }).join('');
}

function openDetail(title) {
  const item = window.catalog.find(entry => entry.title === title);
  if (!item) return;
  document.querySelector('#modal-title').textContent = item.title;
  document.querySelector('#modal-description').textContent =
    `Una seleccion destacada de Angel Netflix: ${item.title}.`;
  document.querySelector('#modal-image').style.background =
    `linear-gradient(135deg, ${item.a}, ${item.b})`;
  detailModal.classList.add('open');
  detailModal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const frame = modal.querySelector('iframe');
  if (frame) frame.removeAttribute('src');
}

renderCatalog();

catalog?.addEventListener('click', event => {
  const card = event.target.closest('.catalog-card');
  if (card) openDetail(card.dataset.title);
});

document.querySelector('#search-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('#search-input').value.trim().toLowerCase();
  renderCatalog(window.catalog.filter(item => item.title.toLowerCase().includes(query)));
  document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.modal-close').forEach(button => {
  button.addEventListener('click', () => closeModal(button.closest('.detail-modal, .video-modal')));
});

document.querySelector('#hero-info')?.addEventListener('click', () => openDetail('Stranger Things'));

document.querySelector('#hero-play')?.addEventListener('click', () => {
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
});

document.querySelector('#modal-play')?.addEventListener('click', () => {
  closeModal(detailModal);
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
});

window.addEventListener('scroll', () => {
  document.querySelector('#site-header')?.classList.toggle('scrolled', window.scrollY > 20);
});
