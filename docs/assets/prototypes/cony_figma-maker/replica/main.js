const state = {
  view: 'dashboard',
  selectedId: null,
  mobileOpen: false,
  expandedMenu: ['services'],
  statusFilter: 'Todos',
  seamstressFilter: 'Todas',
  search: '',
  page: 1,
};

const seamstresses = [
  { id: 's1', name: 'Sirlene Oliveira', phone: '(11) 98765-4321', email: 'sirlene@email.com', specialty: 'Vestidos e saias', avatar: 'SO', rating: 4.8, activeServices: 5, deliveredThisMonth: 12, maxCapacity: 8, productionHistory: [ { month: 'Jan', delivered: 10 }, { month: 'Fev', delivered: 13 }, { month: 'Mar', delivered: 8 }, { month: 'Abr', delivered: 15 }, { month: 'Mai', delivered: 11 }, { month: 'Jun', delivered: 12 } ] },
  { id: 's2', name: 'Marcia Santos', phone: '(11) 97654-3210', email: 'marcia@email.com', specialty: 'Calças e bermudas', avatar: 'MS', rating: 4.6, activeServices: 3, deliveredThisMonth: 9, maxCapacity: 8, productionHistory: [ { month: 'Jan', delivered: 7 }, { month: 'Fev', delivered: 9 }, { month: 'Mar', delivered: 11 }, { month: 'Abr', delivered: 8 }, { month: 'Mai', delivered: 10 }, { month: 'Jun', delivered: 9 } ] },
  { id: 's3', name: 'Fernanda Lima', phone: '(11) 96543-2109', email: 'fernanda@email.com', specialty: 'Blusas e camisas', avatar: 'FL', rating: 4.9, activeServices: 7, deliveredThisMonth: 18, maxCapacity: 8, productionHistory: [ { month: 'Jan', delivered: 14 }, { month: 'Fev', delivered: 16 }, { month: 'Mar', delivered: 12 }, { month: 'Abr', delivered: 19 }, { month: 'Mai', delivered: 17 }, { month: 'Jun', delivered: 18 } ] },
  { id: 's4', name: 'Rosana Pereira', phone: '(11) 95432-1098', email: 'rosana@email.com', specialty: 'Roupas íntimas', avatar: 'RP', rating: 4.4, activeServices: 2, deliveredThisMonth: 6, maxCapacity: 8, productionHistory: [ { month: 'Jan', delivered: 5 }, { month: 'Fev', delivered: 7 }, { month: 'Mar', delivered: 6 }, { month: 'Abr', delivered: 8 }, { month: 'Mai', delivered: 5 }, { month: 'Jun', delivered: 6 } ] },
];

const services = [
  { id: 'SRV-001', client: 'Boutique Elegância', product: 'Vestido de festa', seamstressId: 's1', status: 'Em produção', deadline: '2026-07-05', sentDate: '2026-06-20', quantity: 4, complexity: 'Grande', value: 320, updatedAt: '2026-06-28', history: [ { date: '2026-06-20', status: 'Em produção', note: 'Serviço iniciado' } ] },
  { id: 'SRV-002', client: 'Moda & Cia', product: 'Calça social', seamstressId: 's2', status: 'Pronto', deadline: '2026-06-30', sentDate: '2026-06-15', quantity: 10, complexity: 'Média', value: 450, updatedAt: '2026-06-29', history: [ { date: '2026-06-15', status: 'Em produção', note: 'Serviço iniciado' }, { date: '2026-06-29', status: 'Pronto', note: 'Produção concluída' } ] },
  { id: 'SRV-003', client: 'Atelier Sonho', product: 'Blusa bordada', seamstressId: 's3', status: 'Atrasado', deadline: '2026-06-25', sentDate: '2026-06-10', quantity: 6, complexity: 'Especial', value: 540, updatedAt: '2026-06-26', history: [ { date: '2026-06-10', status: 'Em produção', note: 'Serviço iniciado' }, { date: '2026-06-26', status: 'Atrasado', note: 'Prazo não cumprido' } ] },
  { id: 'SRV-004', client: 'Casa da Moda', product: 'Saia plissada', seamstressId: 's1', status: 'Entregue', deadline: '2026-06-22', sentDate: '2026-06-08', quantity: 8, complexity: 'Pequena', value: 240, updatedAt: '2026-06-21', history: [ { date: '2026-06-08', status: 'Em produção', note: 'Serviço iniciado' }, { date: '2026-06-21', status: 'Entregue', note: 'Entregue ao cliente' } ] },
  { id: 'SRV-005', client: 'Roupas Belas', product: 'Conjunto casual', seamstressId: 's3', status: 'Em produção', deadline: '2026-07-08', sentDate: '2026-06-25', quantity: 5, complexity: 'Média', value: 375, updatedAt: '2026-06-25', history: [ { date: '2026-06-25', status: 'Em produção', note: 'Serviço iniciado' } ] },
  { id: 'SRV-006', client: 'Estilo Livre', product: 'Camisa social', seamstressId: 's4', status: 'Em produção', deadline: '2026-07-03', sentDate: '2026-06-22', quantity: 3, complexity: 'Pequena', value: 150, updatedAt: '2026-06-22', history: [ { date: '2026-06-22', status: 'Em produção', note: 'Serviço iniciado' } ] },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', children: [] },
  { id: 'services', label: 'Serviços', children: ['Listar Serviços', 'Novo Serviço'] },
  { id: 'seamstresses', label: 'Costureiras', children: ['Listar Costureiras'] },
  { id: 'financial', label: 'Financeiro', children: [] },
  { id: 'reports', label: 'Relatórios', children: [] },
  { id: 'settings', label: 'Configurações', children: [] },
];

const getElement = (id) => document.getElementById(id);
const sidebarNav = getElement('sidebarNav');
const pageContent = getElement('pageContent');
const searchInput = getElement('searchInput');
const sidebar = getElement('sidebar');
const sidebarToggle = getElement('sidebarToggle');
const mobileMenuToggle = getElement('mobileMenuToggle');

const formatDate = (value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

const badgeColor = {
  'Em produção': 'production',
  'Pronto': 'ready',
  'Entregue': 'delivered',
  'Atrasado': 'delayed',
};

const workloadColor = (active, max) => {
  const p = active / max;
  if (p >= 0.85) return '#A04535';
  if (p >= 0.6) return '#C49A2A';
  return '#6B7A3C';
};

const renderNav = () => {
  sidebarNav.innerHTML = navItems
    .map((item) => {
      const isExpanded = state.expandedMenu.includes(item.id);
      const isActive = state.view === item.id || 
        (item.id === 'services' && ['services', 'new-service', 'service-detail'].includes(state.view)) ||
        (item.id === 'seamstresses' && state.view === 'seamstress-profile');
      
      const sublist = item.children.length ? `
        <div class="sublist" data-parent="${item.id}" style="display:${isExpanded ? 'flex' : 'none'};flex-direction:column;gap:0.5rem;margin-top:0.5rem;">
          ${item.children.map((child) => {
            const childActive = (child === 'Listar Serviços' && state.view === 'services') ||
                              (child === 'Novo Serviço' && state.view === 'new-service') ||
                              (child === 'Listar Costureiras' && state.view === 'seamstress-profile');
            return `<button type="button" class="subitem ${childActive ? 'active' : ''}" data-action="nav:${child}" style="font-size:0.9rem;padding:0.5rem 0.75rem;border-radius:0.5rem;text-align:left;${childActive ? 'background:#7A5C45;color:#FAF6EE;' : ''}">${child}</button>`;
          }).join('')}
        </div>` : '';
      
      return `
        <div>
          <button type="button" class="nav-item ${isActive ? 'active' : ''}" data-action="nav:${item.id}" ${item.children.length ? `data-toggle="${item.id}"` : ''} style="${isActive ? 'background:#7A5C45;color:#FAF6EE;' : ''}">
            <span class="item-label">${item.label}</span>
            ${item.children.length ? `<span style="transform:rotate(${isExpanded ? '180deg' : '0deg'});transition:transform 0.3s;">▾</span>` : ''}
          </button>
          ${sublist}
        </div>`;
    })
    .join('');
  
  // Adicionar listener para toggle de submenus
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.toggle;
      const index = state.expandedMenu.indexOf(id);
      if (index > -1) {
        state.expandedMenu.splice(index, 1);
      } else {
        state.expandedMenu.push(id);
      }
      renderNav();
    });
  });
};

const getSelectedService = () => services.find((s) => s.id === state.selectedId) || services[0];
const getSelectedSeamstress = () => seamstresses.find((s) => s.id === state.selectedId) || seamstresses[0];

const getFilteredServices = () => {
  return services.filter((s) => {
    const statusMatch = state.statusFilter === 'Todos' || s.status === state.statusFilter;
    const seamstressMatch = state.seamstressFilter === 'Todas' || s.seamstressId === state.seamstressFilter;
    const searchMatch = state.search === '' || [s.client, s.product, s.id].some((field) => field.toLowerCase().includes(state.search.toLowerCase()));
    return statusMatch && seamstressMatch && searchMatch;
  });
};

const renderDashboard = () => {
  const activeCount = services.filter((s) => ['Em produção', 'Atrasado'].includes(s.status)).length;
  const pendingPayment = services.filter((s) => s.status !== 'Entregue').reduce((sum, s) => sum + s.value, 0);
  const delayed = services.filter((s) => s.status === 'Atrasado');

  pageContent.innerHTML = `
    <section class="page-header">
      <div>
        <h1>Visão Geral</h1>
        <p>Produção em andamento — Junho 2026</p>
      </div>
      <div class="button-row">
        <button class="button-secondary">Resumo</button>
      </div>
    </section>

    <div class="grid-cards">
      <div class="section-card kpi-card">
        <small>Serviços Ativos</small>
        <strong>${activeCount}</strong>
        <span>de ${services.length} total</span>
      </div>
      <div class="section-card kpi-card">
        <small>Costureiras Ativas</small>
        <strong>${seamstresses.length}</strong>
        <span>em operação</span>
      </div>
      <div class="section-card kpi-card">
        <small>Pagamentos Pendentes</small>
        <strong>R$ ${pendingPayment.toLocaleString('pt-BR')}</strong>
        <span>a receber</span>
      </div>
    </div>

    <div class="section-card">
      <h2>Carga de Trabalho por Costureira</h2>
      <div class="card-list">
        ${seamstresses.map((sm) => `
          <div class="status-panel">
            <div style="display:flex; justify-content:space-between; gap:1rem; align-items:center;">
              <div>
                <strong>${sm.name.split(' ')[0]}</strong>
                <p style="margin:0.25rem 0 0;color:var(--muted);font-size:0.9rem;">${sm.activeServices} serviços ativos</p>
              </div>
              <div style="font-size:0.95rem;color:${workloadColor(sm.activeServices, sm.maxCapacity)};font-weight:700;">${Math.round((sm.activeServices / sm.maxCapacity) * 100)}%</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="section-card">
      <h2>Alertas</h2>
      ${delayed.length === 0 ? '<p>Sem atrasos no momento</p>' : delayed.map((s) => {
        const sm = seamstresses.find((x) => x.id === s.seamstressId);
        return `<button class="button-outline" data-action="service:${s.id}">${s.id} · ${s.product} · ${sm?.name} · ${formatDate(s.deadline)}</button>`;
      }).join('')}
    </div>

    <div class="section-card">
      <h2>Serviços Recentes</h2>
      <div class="card-list">
        ${services.slice(0, 4).map((s) => {
          const sm = seamstresses.find((x) => x.id === s.seamstressId);
          return `
          <button class="button-outline" data-action="service:${s.id}">
            <div style="display:flex;justify-content:space-between;align-items:center;"> 
              <span>${s.product}</span>
              <span class="badge ${badgeColor[s.status]}">${s.status}</span>
            </div>
            <div style="display:flex;justify-content:space-between;color:var(--muted);font-size:0.85rem;">
              <span>${sm?.name}</span>
              <span>${formatDate(s.deadline)}</span>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>
  `;
};

const renderServices = () => {
  const filtered = getFilteredServices();
  const pages = Math.max(1, Math.ceil(filtered.length / 5));
  const currentPage = Math.min(state.page, pages);
  const paginated = filtered.slice((currentPage - 1) * 5, currentPage * 5);

  pageContent.innerHTML = `
    <div class="breadcrumb" style="display:flex;gap:0.5rem;font-size:0.9rem;margin-bottom:1rem;align-items:center;">
      <button type="button" data-action="nav:dashboard" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Home</button>
      <span style="color:var(--muted);">›</span>
      <span style="color:var(--muted);">Serviços</span>
    </div>
    <section class="page-header">
      <div><h1>Serviços</h1><p>${services.length} serviços cadastrados</p></div>
      <div class="button-row">
        <button class="button-primary" data-action="nav:Novo Serviço">Novo Serviço</button>
      </div>
    </section>

    <div class="section-card">
      <div style="display:grid;gap:1rem;grid-template-columns:1fr repeat(2, minmax(180px, auto));">
        <input type="search" placeholder="Buscar por cliente, produto ou ID..." value="${state.search}" data-action="search" />
        <select data-action="filter-status">
          ${['Todos', 'Em produção', 'Pronto', 'Entregue', 'Atrasado'].map((status) => `<option value="${status}" ${state.statusFilter === status ? 'selected' : ''}>${status}</option>`).join('')}
        </select>
        <select data-action="filter-seamstress">
          <option value="Todas">Todas costureiras</option>
          ${seamstresses.map((sm) => `<option value="${sm.id}" ${state.seamstressFilter === sm.id ? 'selected' : ''}>${sm.name}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Cliente</th><th>Produto</th><th>Costureira</th><th>Status</th><th>Prazo</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${paginated.map((s) => {
            const sm = seamstresses.find((x) => x.id === s.seamstressId);
            return `
          <tr data-action="service:${s.id}">
            <td>${s.id}</td>
            <td>${s.client}</td>
            <td>${s.product}</td>
            <td>${sm?.name}</td>
            <td><span class="badge ${badgeColor[s.status]}">${s.status}</span></td>
            <td>${formatDate(s.deadline)}</td>
            <td><button class="button-outline" data-action="service:${s.id}">Detalhes</button></td>
          </tr>`;
          }).join('')}
        </tbody>
      </table>
      ${filtered.length === 0 ? '<div style="padding:1rem;color:var(--muted);">Nenhum serviço encontrado.</div>' : ''}
      <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem 1rem 0;">
        <span style="color:var(--muted);font-size:0.9rem;">${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}</span>
        <div style="display:flex;gap:0.5rem;">${Array.from({ length: pages }, (_, i) => `<button class="button-outline" data-action="page:${i+1}" style="${currentPage === i+1 ? 'background:#4A2E1A;color:#FAF6EE;' : ''}">${i+1}</button>`).join('')}</div>
      </div>
    </div>
  `;
};

const renderNewService = () => {
  pageContent.innerHTML = `
    <div class="breadcrumb" style="display:flex;gap:0.5rem;font-size:0.9rem;margin-bottom:1rem;align-items:center;">
      <button type="button" data-action="nav:dashboard" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Home</button>
      <span style="color:var(--muted);">›</span>
      <button type="button" data-action="nav:services" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Serviços</button>
      <span style="color:var(--muted);">›</span>
      <span style="color:var(--muted);">Novo Serviço</span>
    </div>
    <section class="page-header"><div><h1>Novo Serviço</h1><p>Preencha os dados para cadastrar um novo serviço de produção</p></div></section>
    <div class="section-card">
      <h2>Dados do Serviço</h2>
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:1rem;">
        <label><span>Cliente</span><input type="text" data-field="client" /></label>
        <label><span>Produto</span><select data-field="product"><option value="">Selecione o produto</option>${['Vestido de festa','Calça social','Blusa bordada','Saia plissada','Conjunto casual','Camisa social','Macacão','Jaqueta','Casaco'].map((p) => `<option value="${p}">${p}</option>`).join('')}</select></label>
        <label><span>Quantidade</span><input type="number" data-field="quantity" min="1" /></label>
        <label><span>Complexidade</span><select data-field="complexity"><option>Pequena</option><option>Média</option><option>Grande</option><option>Especial</option></select></label>
        <label><span>Data de Envio</span><input type="date" data-field="sentDate" /></label>
        <label><span>Prazo de Entrega</span><input type="date" data-field="deadline" /></label>
        <label><span>Valor (R$)</span><input type="number" data-field="value" step="0.01" /></label>
        <label><span>Costureira</span><select data-field="seamstressId">${seamstresses.map((sm) => `<option value="${sm.id}">${sm.name}</option>`).join('')}</select></label>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1rem;">
        <button class="button-outline" data-action="nav:services">Cancelar</button>
        <button class="button-primary" data-action="save-service">Cadastrar Serviço</button>
      </div>
    </div>
  `;
};

const renderServiceDetail = () => {
  const service = getSelectedService();
  const seamstress = seamstresses.find((sm) => sm.id === service.seamstressId);
  pageContent.innerHTML = `
    <div class="breadcrumb" style="display:flex;gap:0.5rem;font-size:0.9rem;margin-bottom:1rem;align-items:center;">
      <button type="button" data-action="nav:dashboard" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Home</button>
      <span style="color:var(--muted);">›</span>
      <button type="button" data-action="nav:services" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Serviços</button>
      <span style="color:var(--muted);">›</span>
      <span style="color:var(--muted);">${service.id}</span>
    </div>
    <section class="page-header"><div><h1>${service.product}</h1><p>${service.id} · ${service.client}</p></div></section>
    <div class="grid-cards" style="grid-template-columns:2fr 1fr;">
      <div class="section-card">
        <h2>Informações do Serviço</h2>
        <div class="status-panel"><strong>Cliente</strong><p>${service.client}</p></div>
        <div class="status-panel"><strong>Produto</strong><p>${service.product}</p></div>
        <div class="status-panel"><strong>Quantidade</strong><p>${service.quantity} peças</p></div>
        <div class="status-panel"><strong>Complexidade</strong><p>${service.complexity}</p></div>
        <div class="status-panel"><strong>Data de Envio</strong><p>${formatDate(service.sentDate)}</p></div>
        <div class="status-panel"><strong>Prazo</strong><p>${formatDate(service.deadline)}</p></div>
        <div class="status-panel"><strong>Valor</strong><p>R$ ${service.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
      </div>
      <div class="section-card">
        <h2>Costureira</h2>
        <div class="status-panel"><strong>${seamstress?.name}</strong><p>${seamstress?.specialty}</p></div>
        <div class="status-panel"><strong>E-mail</strong><p>${seamstress?.email}</p></div>
        <div class="status-panel"><strong>Telefone</strong><p>${seamstress?.phone}</p></div>
      </div>
    </div>
    <div class="section-card">
      <h2>Linha do Tempo</h2>
      ${service.history.map((h) => `
        <div class="status-panel"><strong>${h.status}</strong><p>${formatDate(h.date)} · ${h.note}</p></div>
      `).reverse().join('')}
    </div>
  `;
};

const renderSeamstress = () => {
  const seamstress = getSelectedSeamstress();
  const activeServices = services.filter((s) => s.seamstressId === seamstress.id && s.status !== 'Entregue');
  const pct = Math.round((seamstress.activeServices / seamstress.maxCapacity) * 100);
  pageContent.innerHTML = `
    <div class="breadcrumb" style="display:flex;gap:0.5rem;font-size:0.9rem;margin-bottom:1rem;align-items:center;">
      <button type="button" data-action="nav:dashboard" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Home</button>
      <span style="color:var(--muted);">›</span>
      <button type="button" data-action="nav:Listar Costureiras" style="background:none;border:none;color:#7A5C45;cursor:pointer;text-decoration:underline;">Costureiras</button>
      <span style="color:var(--muted);">›</span>
      <span style="color:var(--muted);">${seamstress.name}</span>
    </div>
    <section class="page-header"><div><h1>${seamstress.name}</h1><p>${seamstress.specialty}</p></div></section>
    <div class="grid-cards" style="grid-template-columns:2fr 1fr;">
      <div class="section-card">
        <h2>Indicadores</h2>
        <div class="status-panel"><strong>Carga Atual</strong><p>${pct}% (${seamstress.activeServices}/${seamstress.maxCapacity})</p></div>
        <div class="status-panel"><strong>Em Andamento</strong><p>${seamstress.activeServices} serviços</p></div>
        <div class="status-panel"><strong>Entregues no Mês</strong><p>${seamstress.deliveredThisMonth} peças</p></div>
      </div>
      <div class="section-card">
        <h2>Contatos</h2>
        <div class="status-panel"><strong>Telefone</strong><p>${seamstress.phone}</p></div>
        <div class="status-panel"><strong>E-mail</strong><p>${seamstress.email}</p></div>
      </div>
    </div>
    <div class="section-card">
      <h2>Serviços Ativos</h2>
      ${activeServices.length ? activeServices.map((s) => `
        <button class="button-outline" data-action="service:${s.id}"><strong>${s.product}</strong><br><small>${formatDate(s.deadline)}</small></button>
      `).join('') : '<p style="color:var(--muted);">Nenhum serviço ativo</p>'}
    </div>
  `;
};

const renderView = () => {
  if (state.view === 'dashboard') renderDashboard();
  if (state.view === 'services') renderServices();
  if (state.view === 'new-service') renderNewService();
  if (state.view === 'service-detail') renderServiceDetail();
  if (state.view === 'seamstress-profile') renderSeamstress();
  attachEvents();
};

const attachEvents = () => {
  document.querySelectorAll('[data-action]').forEach((node) => {
    node.removeEventListener('click', handleAction);
    node.addEventListener('click', handleAction);
  });
  const searchField = document.querySelector('[data-action="search"]');
  if (searchField) {
    searchField.addEventListener('input', (event) => {
      state.search = event.target.value;
      state.page = 1;
      renderView();
    });
  }
};

const handleAction = (event) => {
  const action = event.currentTarget.dataset.action;
  if (!action) return;
  if (action.startsWith('nav:')) {
    const target = action.replace('nav:', '');
    if (target === 'Novo Serviço') state.view = 'new-service';
    else if (target === 'Listar Serviços') state.view = 'services';
    else if (target === 'Listar Costureiras') state.view = 'seamstress-profile';
    else if (target === 'new-service') state.view = 'new-service';
    else if (target === 'services') state.view = 'services';
    else if (target === 'dashboard') state.view = 'dashboard';
    else if (target === 'seamstresses') state.view = 'seamstress-profile';
    else if (target === 'dashboard') state.view = 'dashboard';
    else state.view = target;
    state.page = 1;
    renderView();
  }
  if (action.startsWith('service:')) {
    state.view = 'service-detail';
    state.selectedId = action.replace('service:', '');
    renderView();
  }
  if (action.startsWith('page:')) {
    state.page = Number(action.replace('page:', ''));
    renderView();
  }
  if (action === 'save-service') {
    const inputs = pageContent.querySelectorAll('[data-field]');
    const formData = {};
    inputs.forEach((input) => { formData[input.dataset.field] = input.value; });
    const newService = {
      id: `SRV-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      client: formData.client,
      product: formData.product,
      seamstressId: formData.seamstressId,
      status: 'Em produção',
      deadline: formData.deadline,
      sentDate: formData.sentDate,
      quantity: Number(formData.quantity),
      complexity: formData.complexity,
      value: Number(formData.value),
      updatedAt: new Date().toISOString().split('T')[0],
      history: [{ date: new Date().toISOString().split('T')[0], status: 'Em produção', note: 'Serviço cadastrado' }],
    };
    services.unshift(newService);
    state.view = 'services';
    renderView();
  }
  if (action === 'toggleSidebar') {
    sidebar.classList.toggle('open');
  }
};

sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
mobileMenuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderView();
});

renderNav();
renderView();
