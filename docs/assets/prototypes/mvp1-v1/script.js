const workers = [
  { name: 'Sirlene', load: 82, quota: '8/10', focus: 'Cortinas e jogos de cama' },
  { name: 'Maria', load: 64, quota: '6/10', focus: 'Puffs e toalhas' },
  { name: 'Joana', load: 42, quota: '4/10', focus: 'Pequenos reparos' },
  { name: 'Lúcia', load: 55, quota: '5/10', focus: 'Produção de estofados' }
];

const initialServices = [
  { id: 1, client: 'Ana Paula', product: 'Cortina', quantity: 2, complexity: 'M', deadline: '2026-07-05', tailor: 'Sirlene', value: 320, status: 'Em produção' },
  { id: 2, client: 'Marina', product: 'Puff', quantity: 1, complexity: 'P', deadline: '2026-07-02', tailor: 'Maria', value: 180, status: 'Pendente' },
  { id: 3, client: 'Beatriz', product: 'Jogo de Cama', quantity: 1, complexity: 'G', deadline: '2026-07-08', tailor: 'Joana', value: 410, status: 'Pronto' }
];

let services = [...initialServices];
let activeFilter = 'Todas';

const workersGrid = document.getElementById('workersGrid');
const filterToggle = document.getElementById('filterToggle');
const serviceList = document.getElementById('serviceList');
const serviceForm = document.getElementById('serviceForm');
const activeServicesEl = document.getElementById('activeServices');
const pendingPaymentsEl = document.getElementById('pendingPayments');
const navItems = document.querySelectorAll('.nav-item');
const currentPage = document.body.dataset.page;

function renderWorkers() {
  if (!workersGrid) return;
  workersGrid.innerHTML = '';

  const cards = [
    { name: 'Todas', load: 100, quota: '4/4', focus: 'Mostrar todos os serviços' },
    ...workers
  ];

  cards.forEach((worker) => {
    const card = document.createElement('article');
    card.className = `worker-card ${activeFilter === worker.name ? 'active' : ''}`;
    card.innerHTML = `
      <div class="worker-card__name">${worker.name}</div>
      <div class="worker-card__meta">${worker.focus}</div>
      <strong>${worker.quota}</strong>
      <div class="progress-bar"><span style="width:${worker.load}%"></span></div>
    `;
    card.addEventListener('click', () => {
      activeFilter = worker.name;
      if (filterToggle) filterToggle.textContent = worker.name;
      renderWorkers();
      renderServices();
    });
    workersGrid.appendChild(card);
  });
}

function getVisibleServices() {
  if (activeFilter === 'Todas') return services;
  return services.filter((service) => service.tailor === activeFilter);
}

function renderServices() {
  if (!serviceList) return;
  const visibleServices = getVisibleServices();
  if (!visibleServices.length) {
    serviceList.innerHTML = '<li class="service-item"><p>Nenhum serviço encontrado para este filtro.</p></li>';
    return;
  }

  serviceList.innerHTML = visibleServices.map((service) => {
    const statusClass = service.status === 'Pendente' ? 'pending' : service.status === 'Em produção' ? 'progress' : 'done';
    return `
      <li class="service-item">
        <div class="service-item__top">
          <div>
            <h4>${service.client}</h4>
            <div class="service-item__meta">${service.product} · ${service.quantity} unidade(s)</div>
          </div>
          <span class="status-pill ${statusClass}">${service.status}</span>
        </div>
        <p class="service-item__meta">Costureira: ${service.tailor} · Prazo: ${service.deadline}</p>
        <p class="service-item__meta">Complexidade: ${service.complexity} · Valor: R$ ${service.value.toFixed(2)}</p>
        <div class="status-actions">
          <button class="${service.status === 'Pendente' ? 'active' : ''}" data-id="${service.id}" data-status="Pendente">Pendente</button>
          <button class="${service.status === 'Em produção' ? 'active' : ''}" data-id="${service.id}" data-status="Em produção">Em produção</button>
          <button class="${service.status === 'Pronto' ? 'active' : ''}" data-id="${service.id}" data-status="Pronto">Pronto</button>
        </div>
      </li>
    `;
  }).join('');
}

function updateMetrics() {
  if (!activeServicesEl || !pendingPaymentsEl) return;
  const activeCount = services.filter((service) => service.status !== 'Pronto').length;
  const pendingPaymentsCount = services.filter((service) => service.status === 'Pronto').length;
  activeServicesEl.textContent = activeCount;
  pendingPaymentsEl.textContent = pendingPaymentsCount;
}

if (serviceForm) {
  serviceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(serviceForm);
    const newService = {
      id: Date.now(),
      client: formData.get('client'),
      product: formData.get('product'),
      quantity: Number(formData.get('quantity')),
      complexity: formData.get('complexity'),
      deadline: formData.get('deadline'),
      tailor: formData.get('tailor'),
      value: Number(formData.get('value')),
      status: 'Pendente'
    };

    services = [newService, ...services];
    serviceForm.reset();
    renderServices();
    updateMetrics();
    if (filterToggle) filterToggle.textContent = activeFilter;
    renderWorkers();
  });
}

if (serviceList) {
  serviceList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-status]');
    if (!button) return;

    const id = Number(button.dataset.id);
    const status = button.dataset.status;
    services = services.map((service) => service.id === id ? { ...service, status } : service);
    renderServices();
    updateMetrics();
  });
}

if (filterToggle) {
  filterToggle.addEventListener('click', () => {
    activeFilter = activeFilter === 'Todas' ? 'Sirlene' : 'Todas';
    filterToggle.textContent = activeFilter;
    renderWorkers();
    renderServices();
  });
}

navItems.forEach((item) => {
  if (currentPage && item.dataset.page === currentPage) {
    item.classList.add('active');
  }

  item.addEventListener('click', (event) => {
    if (item.classList.contains('disabled')) {
      event.preventDefault();
      return;
    }

    const href = item.getAttribute('href');
    if (href && href !== '#') {
      window.location.href = href;
    }
  });
});

renderWorkers();
renderServices();
updateMetrics();
