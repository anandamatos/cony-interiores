import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  DollarSign,
  BarChart2,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Bell,
  Search,
  Menu,
  X,
  Phone,
  Mail,
  Star,
  Package,
  Activity,
  TrendingUp,
  LogOut,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "dashboard" | "services" | "new-service" | "service-detail" | "seamstress-profile";
type ServiceStatus = "Em produção" | "Pronto" | "Entregue" | "Atrasado";
type Complexity = "Pequena" | "Média" | "Grande" | "Especial";

interface Service {
  id: string;
  client: string;
  product: string;
  seamstressId: string;
  status: ServiceStatus;
  deadline: string;
  sentDate: string;
  quantity: number;
  complexity: Complexity;
  value: number;
  updatedAt: string;
  history: { date: string; status: ServiceStatus; note: string }[];
}

interface Seamstress {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  avatar: string;
  rating: number;
  activeServices: number;
  deliveredThisMonth: number;
  maxCapacity: number;
  productionHistory: { month: string; delivered: number }[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const seamstresses: Seamstress[] = [
  {
    id: "s1",
    name: "Sirlene Oliveira",
    phone: "(11) 98765-4321",
    email: "sirlene@email.com",
    specialty: "Vestidos e saias",
    avatar: "SO",
    rating: 4.8,
    activeServices: 5,
    deliveredThisMonth: 12,
    maxCapacity: 8,
    productionHistory: [
      { month: "Jan", delivered: 10 },
      { month: "Fev", delivered: 13 },
      { month: "Mar", delivered: 8 },
      { month: "Abr", delivered: 15 },
      { month: "Mai", delivered: 11 },
      { month: "Jun", delivered: 12 },
    ],
  },
  {
    id: "s2",
    name: "Marcia Santos",
    phone: "(11) 97654-3210",
    email: "marcia@email.com",
    specialty: "Calças e bermudas",
    avatar: "MS",
    rating: 4.6,
    activeServices: 3,
    deliveredThisMonth: 9,
    maxCapacity: 8,
    productionHistory: [
      { month: "Jan", delivered: 7 },
      { month: "Fev", delivered: 9 },
      { month: "Mar", delivered: 11 },
      { month: "Abr", delivered: 8 },
      { month: "Mai", delivered: 10 },
      { month: "Jun", delivered: 9 },
    ],
  },
  {
    id: "s3",
    name: "Fernanda Lima",
    phone: "(11) 96543-2109",
    email: "fernanda@email.com",
    specialty: "Blusas e camisas",
    avatar: "FL",
    rating: 4.9,
    activeServices: 7,
    deliveredThisMonth: 18,
    maxCapacity: 8,
    productionHistory: [
      { month: "Jan", delivered: 14 },
      { month: "Fev", delivered: 16 },
      { month: "Mar", delivered: 12 },
      { month: "Abr", delivered: 19 },
      { month: "Mai", delivered: 17 },
      { month: "Jun", delivered: 18 },
    ],
  },
  {
    id: "s4",
    name: "Rosana Pereira",
    phone: "(11) 95432-1098",
    email: "rosana@email.com",
    specialty: "Roupas íntimas",
    avatar: "RP",
    rating: 4.4,
    activeServices: 2,
    deliveredThisMonth: 6,
    maxCapacity: 8,
    productionHistory: [
      { month: "Jan", delivered: 5 },
      { month: "Fev", delivered: 7 },
      { month: "Mar", delivered: 6 },
      { month: "Abr", delivered: 8 },
      { month: "Mai", delivered: 5 },
      { month: "Jun", delivered: 6 },
    ],
  },
];

const initialServices: Service[] = [
  {
    id: "SRV-001",
    client: "Boutique Elegância",
    product: "Vestido de festa",
    seamstressId: "s1",
    status: "Em produção",
    deadline: "2026-07-05",
    sentDate: "2026-06-20",
    quantity: 4,
    complexity: "Grande",
    value: 320,
    updatedAt: "2026-06-28",
    history: [
      { date: "2026-06-20", status: "Em produção", note: "Serviço iniciado" },
    ],
  },
  {
    id: "SRV-002",
    client: "Moda & Cia",
    product: "Calça social",
    seamstressId: "s2",
    status: "Pronto",
    deadline: "2026-06-30",
    sentDate: "2026-06-15",
    quantity: 10,
    complexity: "Média",
    value: 450,
    updatedAt: "2026-06-29",
    history: [
      { date: "2026-06-15", status: "Em produção", note: "Serviço iniciado" },
      { date: "2026-06-29", status: "Pronto", note: "Produção concluída" },
    ],
  },
  {
    id: "SRV-003",
    client: "Atelier Sonho",
    product: "Blusa bordada",
    seamstressId: "s3",
    status: "Atrasado",
    deadline: "2026-06-25",
    sentDate: "2026-06-10",
    quantity: 6,
    complexity: "Especial",
    value: 540,
    updatedAt: "2026-06-26",
    history: [
      { date: "2026-06-10", status: "Em produção", note: "Serviço iniciado" },
      { date: "2026-06-26", status: "Atrasado", note: "Prazo não cumprido" },
    ],
  },
  {
    id: "SRV-004",
    client: "Casa da Moda",
    product: "Saia plissada",
    seamstressId: "s1",
    status: "Entregue",
    deadline: "2026-06-22",
    sentDate: "2026-06-08",
    quantity: 8,
    complexity: "Pequena",
    value: 240,
    updatedAt: "2026-06-21",
    history: [
      { date: "2026-06-08", status: "Em produção", note: "Serviço iniciado" },
      { date: "2026-06-21", status: "Entregue", note: "Entregue ao cliente" },
    ],
  },
  {
    id: "SRV-005",
    client: "Roupas Belas",
    product: "Conjunto casual",
    seamstressId: "s3",
    status: "Em produção",
    deadline: "2026-07-08",
    sentDate: "2026-06-25",
    quantity: 5,
    complexity: "Média",
    value: 375,
    updatedAt: "2026-06-25",
    history: [
      { date: "2026-06-25", status: "Em produção", note: "Serviço iniciado" },
    ],
  },
  {
    id: "SRV-006",
    client: "Estilo Livre",
    product: "Camisa social",
    seamstressId: "s4",
    status: "Em produção",
    deadline: "2026-07-03",
    sentDate: "2026-06-22",
    quantity: 3,
    complexity: "Pequena",
    value: 150,
    updatedAt: "2026-06-22",
    history: [
      { date: "2026-06-22", status: "Em produção", note: "Serviço iniciado" },
    ],
  },
];

// ─── Palette constants ────────────────────────────────────────────────────────

const OLIVE   = "#6B7A3C"; // seguro
const GOLD    = "#C49A2A"; // alerta
const BRICK   = "#A04535"; // urgente

const workloadColor = (active: number, max: number): string => {
  const p = active / max;
  if (p >= 0.85) return BRICK;
  if (p >= 0.60) return GOLD;
  return OLIVE;
};

// Status badge config — warm palette
const statusConfig: Record<ServiceStatus, { bg: string; text: string; dot: string }> = {
  "Em produção": { bg: "bg-[#F5EAC8]",  text: "text-[#7A5A10]", dot: "bg-[#C49A2A]" },
  Pronto:        { bg: "bg-[#DDE8C8]",  text: "text-[#3A4E18]", dot: "bg-[#6B7A3C]" },
  Entregue:      { bg: "bg-[#C8D5E8]",  text: "text-[#1A3458]", dot: "bg-[#4A6EA0]" },
  Atrasado:      { bg: "bg-[#EDD4CC]",  text: "text-[#6B1F12]", dot: "bg-[#A04535]" },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

// ─── Fabric divider pattern (subtle parallel lines) ───────────────────────────

const fabricDivider = (
  <div
    className="w-full h-px my-0"
    style={{
      background: "repeating-linear-gradient(90deg, rgba(60,35,15,0.18) 0px, rgba(60,35,15,0.18) 1px, transparent 1px, transparent 6px)",
    }}
  />
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ServiceStatus }) {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

function Breadcrumb({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-[--muted-foreground] mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={13} />}
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-[--accent] transition-colors">
              {item.label}
            </button>
          ) : (
            <span className="text-[--foreground] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base font-semibold text-[--accent] mb-3"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      {children}
    </h2>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardView({
  services,
  seamstresses,
  onNavigate,
}: {
  services: Service[];
  seamstresses: Seamstress[];
  onNavigate: (view: View, id?: string) => void;
}) {
  const active = services.filter((s) => s.status === "Em produção" || s.status === "Atrasado").length;
  const delayed = services.filter((s) => s.status === "Atrasado");
  const pendingPayment = services
    .filter((s) => s.status !== "Entregue")
    .reduce((acc, s) => acc + s.value, 0);

  const workloadData = seamstresses.map((sm) => ({
    name: sm.name.split(" ")[0],
    ativos: sm.activeServices,
    fill: workloadColor(sm.activeServices, sm.maxCapacity),
  }));

  return (
    <div>
      <div className="mb-7">
        <h1
          className="text-3xl font-semibold text-[--accent]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Visão Geral
        </h1>
        <p className="text-sm text-[--muted-foreground] mt-1">Produção em andamento — Junho 2026</p>
      </div>

      {fabricDivider}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
        {[
          {
            label: "Serviços Ativos",
            value: active,
            sub: `de ${services.length} total`,
            icon: <ClipboardList size={20} className="text-[--primary]" />,
          },
          {
            label: "Costureiras Ativas",
            value: seamstresses.length,
            sub: "em operação",
            icon: <Users size={20} className="text-[--primary]" />,
          },
          {
            label: "Pagamentos Pendentes",
            value: `R$ ${pendingPayment.toLocaleString("pt-BR")}`,
            sub: "a receber",
            icon: <DollarSign size={20} className="text-[--accent]" />,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-card rounded-lg border border-[--border] p-5 flex items-start justify-between"
            style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[--muted-foreground] font-semibold mb-2">
                {card.label}
              </p>
              <p
                className="text-3xl font-bold text-[--accent]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {card.value}
              </p>
              <p className="text-xs text-[--muted-foreground] mt-1">{card.sub}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[--secondary] flex items-center justify-center flex-shrink-0">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workload chart */}
        <div
          className="lg:col-span-2 bg-card rounded-lg border border-[--border] p-5"
          style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}
        >
          <SectionTitle>Carga de Trabalho por Costureira</SectionTitle>
          {fabricDivider}
          <div className="flex gap-4 mt-3 mb-4 text-xs text-[--muted-foreground]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: OLIVE }} />Seguro</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: GOLD }} />Alerta</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: BRICK }} />Urgente</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={workloadData} barSize={36} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(60,35,15,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#7A6A5A" }} axisLine={false} tickLine={false} domain={[0, 8]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#4A2E1A" }} axisLine={false} tickLine={false} width={72} />
              <Tooltip
                contentStyle={{ borderRadius: 6, border: "1px solid rgba(60,35,15,0.15)", fontSize: 12, background: "#FAF6EE" }}
                formatter={(value) => [`${value} serviços`, "Ativos"]}
              />
              <Bar dataKey="ativos" radius={[0, 4, 4, 0]}>
                {workloadData.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div
          className="bg-card rounded-lg border border-[--border] p-5"
          style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={15} style={{ color: BRICK }} />
            <SectionTitle>Alertas</SectionTitle>
            {delayed.length > 0 && (
              <span
                className="ml-auto text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0"
                style={{ background: BRICK }}
              >
                {delayed.length}
              </span>
            )}
          </div>
          {fabricDivider}

          {delayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center mt-2">
              <CheckCircle size={30} className="text-[--muted-foreground] mb-2" />
              <p className="text-sm text-[--muted-foreground]">Sem atrasos no momento</p>
            </div>
          ) : (
            <div className="space-y-2 mt-3">
              {delayed.map((s) => {
                const sm = seamstresses.find((x) => x.id === s.seamstressId);
                return (
                  <button
                    key={s.id}
                    onClick={() => onNavigate("service-detail", s.id)}
                    className="w-full text-left p-3 rounded-lg border transition-colors hover:border-[--primary]"
                    style={{ background: "#F5E8E4", borderColor: "rgba(160,69,53,0.25)" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: BRICK }}>{s.id}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B1F12" }}>{s.product} · {s.client}</p>
                    <p className="text-xs text-[--muted-foreground] mt-1">Prazo: {fmt(s.deadline)} · {sm?.name}</p>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-[--border]">
            <p className="text-[10px] uppercase tracking-widest text-[--muted-foreground] font-semibold mb-3">Produção no Mês</p>
            {seamstresses.map((sm) => (
              <button
                key={sm.id}
                onClick={() => onNavigate("seamstress-profile", sm.id)}
                className="w-full flex items-center gap-2 py-1.5 hover:bg-[--secondary] rounded-md px-1.5 transition-colors"
              >
                <div
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: "#C4A882", color: "#2C1A0E" }}
                >
                  {sm.avatar}
                </div>
                <span className="text-xs text-[--foreground] flex-1 text-left">{sm.name.split(" ")[0]}</span>
                <span className="text-xs font-semibold text-[--primary]">{sm.deliveredThisMonth} pçs</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent services */}
      <div
        className="mt-6 bg-card rounded-lg border border-[--border] overflow-hidden"
        style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <SectionTitle>Serviços Recentes</SectionTitle>
          <button
            onClick={() => onNavigate("services")}
            className="text-xs text-[--primary] font-medium hover:underline"
          >
            Ver todos →
          </button>
        </div>
        {fabricDivider}
        <div className="divide-y divide-[--border]">
          {services.slice(0, 4).map((s, i) => {
            const sm = seamstresses.find((x) => x.id === s.seamstressId);
            return (
              <button
                key={s.id}
                onClick={() => onNavigate("service-detail", s.id)}
                className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-[--secondary] transition-colors text-left ${i % 2 === 1 ? "bg-[--background]" : ""}`}
              >
                <span className="text-xs text-[--muted-foreground] w-20 font-mono">{s.id}</span>
                <span className="text-sm text-[--foreground] flex-1 font-medium">{s.product}</span>
                <span className="text-xs text-[--muted-foreground] w-32 hidden md:block">{sm?.name}</span>
                <StatusBadge status={s.status} />
                <span className="text-xs text-[--muted-foreground] w-24 text-right hidden md:block">{fmt(s.deadline)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Services List ────────────────────────────────────────────────────────────

function ServicesListView({
  services,
  seamstresses,
  onNavigate,
}: {
  services: Service[];
  seamstresses: Seamstress[];
  onNavigate: (view: View, id?: string) => void;
}) {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [seamstressFilter, setSeamstressFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = services.filter((s) => {
    const ms = statusFilter === "Todos" || s.status === statusFilter;
    const mq = seamstressFilter === "Todas" || s.seamstressId === seamstressFilter;
    const mt =
      search === "" ||
      s.client.toLowerCase().includes(search.toLowerCase()) ||
      s.product.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    return ms && mq && mt;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const selectCls = "text-sm bg-[--input-background] border border-[--border] rounded-md px-3 py-2 text-[--foreground] outline-none cursor-pointer focus:border-[--primary]";

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", onClick: () => onNavigate("dashboard") }, { label: "Serviços" }]} />

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1
            className="text-3xl font-semibold text-[--accent]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Serviços
          </h1>
          <p className="text-sm text-[--muted-foreground] mt-0.5">{services.length} serviços cadastrados</p>
        </div>
        <button
          onClick={() => onNavigate("new-service")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
          style={{ background: "#4A2E1A", color: "#FAF6EE", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <Plus size={15} />
          Novo Serviço
        </button>
      </div>

      {fabricDivider}

      {/* Filters */}
      <div
        className="bg-card rounded-lg border border-[--border] p-4 mt-4 mb-4"
        style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.06)" }}
      >
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 bg-[--input-background] border border-[--border] rounded-md px-3 py-2">
            <Search size={13} className="text-[--muted-foreground]" />
            <input
              className="bg-transparent text-sm outline-none w-full text-[--foreground] placeholder:text-[--muted-foreground]"
              placeholder="Buscar por cliente, produto ou ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select className={selectCls} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option>Todos</option>
            <option>Em produção</option>
            <option>Pronto</option>
            <option>Entregue</option>
            <option>Atrasado</option>
          </select>
          <select className={selectCls} value={seamstressFilter} onChange={(e) => { setSeamstressFilter(e.target.value); setPage(1); }}>
            <option value="Todas">Todas costureiras</option>
            {seamstresses.map((sm) => (
              <option key={sm.id} value={sm.id}>{sm.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-card rounded-lg border border-[--border] overflow-hidden"
        style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.06)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#E8DDD0", borderBottom: "1px solid rgba(60,35,15,0.14)" }}>
              {["ID", "Cliente", "Produto", "Costureira", "Status", "Prazo", "Ações"].map((h, i) => (
                <th
                  key={h}
                  className={`text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[--muted-foreground] ${i === 3 || i === 5 ? "hidden md:table-cell" : ""} ${i === 6 ? "text-center" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((s, i) => {
              const sm = seamstresses.find((x) => x.id === s.seamstressId);
              return (
                <tr
                  key={s.id}
                  className="border-b border-[--border] hover:bg-[--secondary] transition-colors cursor-pointer"
                  style={{ background: i % 2 === 0 ? "#FAF6EE" : "#F5F0E8" }}
                  onClick={() => onNavigate("service-detail", s.id)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-[--muted-foreground]">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-[--foreground]">{s.client}</td>
                  <td className="px-4 py-3 text-[--muted-foreground]">{s.product}</td>
                  <td className="px-4 py-3 text-[--muted-foreground] hidden md:table-cell">{sm?.name}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-[--muted-foreground] hidden md:table-cell">{fmt(s.deadline)}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onNavigate("service-detail", s.id)}
                        className="p-1.5 rounded hover:bg-[--secondary] text-[--primary] transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button className="p-1.5 rounded hover:bg-[#EDD4CC] transition-colors" style={{ color: BRICK }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginated.length === 0 && (
          <div className="py-12 text-center text-[--muted-foreground] text-sm">
            Nenhum serviço encontrado.
          </div>
        )}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[--border] bg-[--secondary]">
          <p className="text-xs text-[--muted-foreground]">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-7 h-7 text-xs rounded font-medium transition-colors"
                style={p === page ? { background: "#4A2E1A", color: "#FAF6EE" } : { color: "#7A6A5A" }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── New Service ──────────────────────────────────────────────────────────────

function NewServiceView({
  seamstresses,
  onNavigate,
  onSave,
}: {
  seamstresses: Seamstress[];
  onNavigate: (view: View, id?: string) => void;
  onSave: (s: Service) => void;
}) {
  const [form, setForm] = useState({
    client: "",
    product: "",
    seamstressId: "",
    quantity: "",
    complexity: "Pequena" as Complexity,
    sentDate: "",
    deadline: "",
    value: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const products = ["Vestido de festa", "Calça social", "Blusa bordada", "Saia plissada", "Conjunto casual", "Camisa social", "Macacão", "Jaqueta", "Casaco"];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.client.trim()) e.client = "Obrigatório";
    if (!form.product) e.product = "Obrigatório";
    if (!form.seamstressId) e.seamstressId = "Obrigatório";
    if (!form.quantity || Number(form.quantity) < 1) e.quantity = "Mín. 1";
    if (!form.sentDate) e.sentDate = "Obrigatório";
    if (!form.deadline) e.deadline = "Obrigatório";
    if (!form.value || Number(form.value) <= 0) e.value = "Valor inválido";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const newService: Service = {
      id: `SRV-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      client: form.client,
      product: form.product,
      seamstressId: form.seamstressId,
      status: "Em produção",
      deadline: form.deadline,
      sentDate: form.sentDate,
      quantity: Number(form.quantity),
      complexity: form.complexity,
      value: Number(form.value),
      updatedAt: new Date().toISOString().split("T")[0],
      history: [{ date: new Date().toISOString().split("T")[0], status: "Em produção", note: "Serviço cadastrado" }],
    };
    onSave(newService);
    setSaved(true);
    setTimeout(() => onNavigate("services"), 1500);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
    },
  });

  const inputCls = (key: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
      errors[key]
        ? "border-[#A04535] bg-[#F5E8E4]"
        : "border-[--border] bg-[--input-background] focus:border-[--primary] focus:bg-card"
    }`;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", onClick: () => onNavigate("dashboard") },
          { label: "Serviços", onClick: () => onNavigate("services") },
          { label: "Novo Serviço" },
        ]}
      />
      <div className="mb-6">
        <h1
          className="text-3xl font-semibold text-[--accent]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Novo Serviço
        </h1>
        <p className="text-sm text-[--muted-foreground] mt-0.5">Preencha os dados para cadastrar um novo serviço de produção</p>
      </div>

      {fabricDivider}

      {saved && (
        <div className="flex items-center gap-2 mt-4 rounded-lg px-4 py-3 mb-4 text-sm border"
          style={{ background: "#DDE8C8", borderColor: "rgba(107,122,60,0.3)", color: "#3A4E18" }}>
          <CheckCircle size={15} />
          Serviço cadastrado com sucesso! Redirecionando...
        </div>
      )}

      <div
        className="bg-card rounded-lg border border-[--border] mt-5 p-6"
        style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}
      >
        {/* Dados do Serviço */}
        <div className="mb-6">
          <SectionTitle>Dados do Serviço</SectionTitle>
          {fabricDivider}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Cliente <span className="text-[#A04535]">*</span></label>
              <input className={inputCls("client")} placeholder="Nome do cliente" {...field("client")} />
              {errors.client && <p className="text-xs mt-1" style={{ color: BRICK }}>{errors.client}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Produto <span className="text-[#A04535]">*</span></label>
              <select className={inputCls("product")} {...field("product")}>
                <option value="">Selecione o produto</option>
                {products.map((p) => <option key={p}>{p}</option>)}
              </select>
              {errors.product && <p className="text-xs mt-1" style={{ color: BRICK }}>{errors.product}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Quantidade <span className="text-[#A04535]">*</span></label>
              <input type="number" min={1} className={inputCls("quantity")} placeholder="Ex: 10" {...field("quantity")} />
              {errors.quantity && <p className="text-xs mt-1" style={{ color: BRICK }}>{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Complexidade</label>
              <div className="flex gap-2">
                {(["Pequena", "Média", "Grande", "Especial"] as Complexity[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, complexity: c }))}
                    className="flex-1 py-2 text-xs rounded-lg border font-medium transition-colors"
                    style={
                      form.complexity === c
                        ? { background: "#4A2E1A", color: "#FAF6EE", borderColor: "#4A2E1A" }
                        : { background: "transparent", color: "#7A6A5A", borderColor: "rgba(60,35,15,0.2)" }
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Datas e Valor */}
        <div className="mb-6">
          <SectionTitle>Datas e Valor</SectionTitle>
          {fabricDivider}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Data de Envio <span className="text-[#A04535]">*</span></label>
              <input type="date" className={inputCls("sentDate")} {...field("sentDate")} />
              {errors.sentDate && <p className="text-xs mt-1" style={{ color: BRICK }}>{errors.sentDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Prazo de Entrega <span className="text-[#A04535]">*</span></label>
              <input type="date" className={inputCls("deadline")} {...field("deadline")} />
              {errors.deadline && <p className="text-xs mt-1" style={{ color: BRICK }}>{errors.deadline}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[--foreground] mb-1">Valor (R$) <span className="text-[#A04535]">*</span></label>
              <input type="number" min={0} step={0.01} className={inputCls("value")} placeholder="0,00" {...field("value")} />
              {errors.value && <p className="text-xs mt-1" style={{ color: BRICK }}>{errors.value}</p>}
            </div>
          </div>
        </div>

        {/* Costureira */}
        <div className="mb-8">
          <SectionTitle>Costureira Responsável</SectionTitle>
          {fabricDivider}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {seamstresses.map((sm) => {
              const pct = sm.activeServices / sm.maxCapacity;
              const clr = workloadColor(sm.activeServices, sm.maxCapacity);
              const selected = form.seamstressId === sm.id;
              return (
                <button
                  key={sm.id}
                  type="button"
                  onClick={() => { setForm((p) => ({ ...p, seamstressId: sm.id })); setErrors((p) => { const n = { ...p }; delete n.seamstressId; return n; }); }}
                  className="p-3 rounded-lg border-2 text-left transition-all"
                  style={selected ? { borderColor: "#4A2E1A", background: "#EDE0CF" } : { borderColor: "rgba(60,35,15,0.14)", background: "#FAF6EE" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "#C4A882", color: "#2C1A0E" }}>
                      {sm.avatar}
                    </div>
                    <span className="text-xs font-semibold text-[--foreground]">{sm.name.split(" ")[0]}</span>
                  </div>
                  <p className="text-[10px] text-[--muted-foreground] mb-2">{sm.specialty}</p>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(60,35,15,0.12)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${pct * 100}%`, background: clr }} />
                  </div>
                  <p className="text-[10px] mt-1 font-medium" style={{ color: clr }}>{sm.activeServices}/{sm.maxCapacity} ativos</p>
                </button>
              );
            })}
          </div>
          {errors.seamstressId && <p className="text-xs mt-2" style={{ color: BRICK }}>{errors.seamstressId}</p>}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => onNavigate("services")}
            className="px-5 py-2.5 rounded-lg border border-[--border] text-sm font-medium text-[--foreground] hover:bg-[--secondary] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
            style={{ background: "#4A2E1A", color: "#FAF6EE", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Cadastrar Serviço
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Service Detail ───────────────────────────────────────────────────────────

function ServiceDetailView({
  service,
  seamstresses,
  onNavigate,
  onUpdateStatus,
}: {
  service: Service;
  seamstresses: Seamstress[];
  onNavigate: (view: View, id?: string) => void;
  onUpdateStatus: (id: string, status: ServiceStatus, note: string) => void;
}) {
  const sm = seamstresses.find((x) => x.id === service.seamstressId);
  const [newStatus, setNewStatus] = useState<ServiceStatus>(service.status);
  const [note, setNote] = useState("");
  const [updated, setUpdated] = useState(false);

  const handleUpdate = () => {
    if (newStatus === service.status) return;
    onUpdateStatus(service.id, newStatus, note || `Status atualizado para ${newStatus}`);
    setNote("");
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2500);
  };

  const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="py-3 border-b border-[--border] flex items-start">
      <span className="text-xs uppercase tracking-wide text-[--muted-foreground] w-40 flex-shrink-0 font-medium pt-0.5">{label}</span>
      <span className="text-sm text-[--foreground] font-medium">{value}</span>
    </div>
  );

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", onClick: () => onNavigate("dashboard") },
          { label: "Serviços", onClick: () => onNavigate("services") },
          { label: `${service.id} · ${service.product}` },
        ]}
      />

      <div className="flex items-start gap-3 mb-6">
        <button
          onClick={() => onNavigate("services")}
          className="flex items-center gap-1.5 text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors mt-1"
        >
          <ArrowLeft size={15} />
          Voltar
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1
              className="text-3xl font-semibold text-[--accent]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {service.product}
            </h1>
            <StatusBadge status={service.status} />
          </div>
          <p className="text-sm text-[--muted-foreground] mt-0.5">{service.id} · {service.client}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[--border] text-sm font-medium text-[--foreground] hover:bg-[--secondary] transition-colors">
            <Pencil size={13} />Editar
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-[#EDD4CC]"
            style={{ borderColor: "rgba(160,69,53,0.3)", color: BRICK }}>
            <Trash2 size={13} />Excluir
          </button>
        </div>
      </div>

      {fabricDivider}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Info card */}
          <div className="bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
            <SectionTitle>Informações do Serviço</SectionTitle>
            {fabricDivider}
            <div className="mt-2">
              <InfoRow label="Cliente" value={service.client} />
              <InfoRow label="Produto" value={service.product} />
              <InfoRow label="Quantidade" value={`${service.quantity} peças`} />
              <InfoRow label="Complexidade" value={service.complexity} />
              <InfoRow label="Data de Envio" value={fmt(service.sentDate)} />
              <InfoRow label="Prazo de Entrega" value={fmt(service.deadline)} />
              <InfoRow label="Valor" value={`R$ ${service.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
              <div className="pt-3 flex items-start">
                <span className="text-xs uppercase tracking-wide text-[--muted-foreground] w-40 flex-shrink-0 font-medium pt-0.5">Costureira</span>
                <button
                  onClick={() => onNavigate("seamstress-profile", sm?.id)}
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                  style={{ color: "#7A5C45" }}
                >
                  <div className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: "#C4A882", color: "#2C1A0E" }}>
                    {sm?.avatar}
                  </div>
                  {sm?.name}
                </button>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
            <SectionTitle>Linha do Tempo de Status</SectionTitle>
            {fabricDivider}
            <div className="mt-4 space-y-0">
              {[...service.history].reverse().map((h, i) => (
                <div key={i} className="flex gap-3 pb-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${statusConfig[h.status].dot}`} />
                    {i < service.history.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(60,35,15,0.15)" }} />}
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge status={h.status} />
                      <span className="text-xs text-[--muted-foreground]">{fmt(h.date)}</span>
                    </div>
                    <p className="text-xs text-[--muted-foreground] mt-1">{h.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
            <SectionTitle>Atualizar Status</SectionTitle>
            {fabricDivider}
            {updated && (
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3 mt-3 text-xs border"
                style={{ background: "#DDE8C8", borderColor: "rgba(107,122,60,0.3)", color: "#3A4E18" }}>
                <CheckCircle size={13} />Status atualizado!
              </div>
            )}
            <select
              className="w-full px-3 py-2.5 rounded-lg border border-[--border] bg-[--input-background] text-sm outline-none focus:border-[--primary] mb-3 mt-3"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ServiceStatus)}
            >
              <option>Em produção</option>
              <option>Pronto</option>
              <option>Entregue</option>
              <option>Atrasado</option>
            </select>
            <textarea
              className="w-full px-3 py-2.5 rounded-lg border border-[--border] bg-[--input-background] text-sm outline-none focus:border-[--primary] resize-none mb-3"
              rows={3}
              placeholder="Observação (opcional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              onClick={handleUpdate}
              disabled={newStatus === service.status}
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#4A2E1A", color: "#FAF6EE" }}
            >
              Atualizar Status
            </button>
          </div>

          {sm && (
            <div className="bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
              <SectionTitle>Costureira</SectionTitle>
              {fabricDivider}
              <button
                onClick={() => onNavigate("seamstress-profile", sm.id)}
                className="w-full text-left hover:bg-[--secondary] p-2 rounded-lg transition-colors mt-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center" style={{ background: "#C4A882", color: "#2C1A0E" }}>
                    {sm.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[--foreground]">{sm.name}</p>
                    <p className="text-xs text-[--muted-foreground]">{sm.specialty}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(60,35,15,0.12)" }}>
                    <div className="h-1.5 rounded-full" style={{
                      width: `${(sm.activeServices / sm.maxCapacity) * 100}%`,
                      background: workloadColor(sm.activeServices, sm.maxCapacity),
                    }} />
                  </div>
                  <p className="text-xs text-[--muted-foreground] mt-1">{sm.activeServices}/{sm.maxCapacity} serviços ativos</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Seamstress Profile ───────────────────────────────────────────────────────

function SeamstressProfileView({
  seamstress,
  services,
  onNavigate,
}: {
  seamstress: Seamstress;
  services: Service[];
  onNavigate: (view: View, id?: string) => void;
}) {
  const activeServices = services.filter((s) => s.seamstressId === seamstress.id && s.status !== "Entregue");
  const pct = seamstress.activeServices / seamstress.maxCapacity;
  const clr = workloadColor(seamstress.activeServices, seamstress.maxCapacity);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", onClick: () => onNavigate("dashboard") },
          { label: "Costureiras" },
          { label: seamstress.name },
        ]}
      />

      {/* Header card */}
      <div className="bg-card rounded-lg border border-[--border] p-6 mb-6" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full text-xl font-bold flex items-center justify-center flex-shrink-0" style={{ background: "#C4A882", color: "#2C1A0E" }}>
            {seamstress.avatar}
          </div>
          <div className="flex-1">
            <h1
              className="text-3xl font-semibold text-[--accent]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {seamstress.name}
            </h1>
            <p className="text-sm text-[--muted-foreground] mt-0.5">{seamstress.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill={i < Math.floor(seamstress.rating) ? GOLD : "none"}
                  style={{ color: i < Math.floor(seamstress.rating) ? GOLD : "#C4B0A0" }} />
              ))}
              <span className="text-xs text-[--muted-foreground] ml-1">{seamstress.rating}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-[--muted-foreground]">
              <span className="flex items-center gap-1.5"><Phone size={13} />{seamstress.phone}</span>
              <span className="flex items-center gap-1.5"><Mail size={13} />{seamstress.email}</span>
            </div>
          </div>
        </div>
      </div>

      {fabricDivider}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-6">
        {[
          {
            label: "Carga Atual",
            value: `${Math.round(pct * 100)}%`,
            sub: `${seamstress.activeServices}/${seamstress.maxCapacity} serviços`,
            icon: <Activity size={18} className="text-[--muted-foreground]" />,
            valueColor: clr,
            extra: (
              <div className="w-full h-1.5 rounded-full mt-2" style={{ background: "rgba(60,35,15,0.12)" }}>
                <div className="h-1.5 rounded-full" style={{ width: `${pct * 100}%`, background: clr }} />
              </div>
            ),
          },
          {
            label: "Em Andamento",
            value: seamstress.activeServices,
            sub: "serviços ativos",
            icon: <Package size={18} className="text-[--muted-foreground]" />,
            valueColor: "#4A2E1A",
          },
          {
            label: "Entregues no Mês",
            value: seamstress.deliveredThisMonth,
            sub: "peças em junho",
            icon: <TrendingUp size={18} className="text-[--primary]" />,
            valueColor: "#7A5C45",
          },
        ].map((c) => (
          <div key={c.label} className="bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-[--muted-foreground] font-semibold mb-2">{c.label}</p>
                <p className="text-3xl font-bold" style={{ color: c.valueColor, fontFamily: "'Playfair Display', Georgia, serif" }}>{c.value}</p>
                {"extra" in c && c.extra}
                <p className="text-xs text-[--muted-foreground] mt-1">{c.sub}</p>
              </div>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
          <SectionTitle>Histórico de Produção</SectionTitle>
          {fabricDivider}
          <p className="text-xs text-[--muted-foreground] mt-2 mb-4">Peças entregues por mês</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={seamstress.productionHistory} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(60,35,15,0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#7A6A5A" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7A6A5A" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 6, border: "1px solid rgba(60,35,15,0.15)", fontSize: 12, background: "#FAF6EE" }}
                formatter={(value) => [`${value} peças`, "Entregues"]}
              />
              <Bar dataKey="delivered" fill="#7A5C45" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Active services list */}
        <div className="bg-card rounded-lg border border-[--border] p-5" style={{ boxShadow: "0 1px 6px rgba(60,35,15,0.08)" }}>
          <SectionTitle>Serviços Ativos</SectionTitle>
          {fabricDivider}
          {activeServices.length === 0 ? (
            <div className="py-8 text-center text-[--muted-foreground] text-sm mt-2">Nenhum serviço ativo</div>
          ) : (
            <div className="space-y-3 mt-3">
              {activeServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onNavigate("service-detail", s.id)}
                  className="w-full text-left p-3 rounded-lg border transition-all hover:bg-[--secondary]"
                  style={{ borderColor: "rgba(60,35,15,0.14)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-[--muted-foreground]">{s.id}</p>
                      <p className="text-sm font-medium text-[--foreground] mt-0.5">{s.product}</p>
                      <p className="text-xs text-[--muted-foreground]">{s.client}</p>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-[--muted-foreground]">
                    <Clock size={10} />
                    Prazo: {fmt(s.deadline)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  view?: View;
  children?: { label: string; view: View }[];
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} />, view: "dashboard" },
  {
    id: "services",
    label: "Serviços",
    icon: <ClipboardList size={17} />,
    children: [
      { label: "Listar Serviços", view: "services" },
      { label: "Novo Serviço", view: "new-service" },
    ],
  },
  {
    id: "seamstresses",
    label: "Costureiras",
    icon: <Users size={17} />,
    children: [
      { label: "Listar Costureiras", view: "seamstress-profile" },
    ],
  },
  { id: "financial", label: "Financeiro", icon: <DollarSign size={17} />, view: "dashboard" },
  { id: "reports", label: "Relatórios", icon: <BarChart2 size={17} />, view: "dashboard" },
  { id: "settings", label: "Configurações", icon: <Settings size={17} />, view: "dashboard" },
];

function Sidebar({
  currentView,
  onNavigate,
  collapsed,
  setCollapsed,
}: {
  currentView: View;
  onNavigate: (view: View, id?: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [expanded, setExpanded] = useState<string[]>(["services"]);

  const isActive = (item: NavItem) => {
    if (item.view === currentView) return true;
    if (item.children?.some((c) => c.view === currentView)) return true;
    return false;
  };

  const toggle = (id: string) =>
    setExpanded((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <aside
      className="flex flex-col h-full transition-all duration-300"
      style={{ width: collapsed ? 60 : 240, background: "#2C1A0E" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#C4A882" }}>
          <span className="font-bold text-sm" style={{ color: "#2C1A0E", fontFamily: "'Playfair Display', Georgia, serif" }}>CI</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold leading-tight" style={{ color: "#E8DDD0", fontFamily: "'Playfair Display', Georgia, serif" }}>
              Cony Interiores
            </p>
            <p className="text-[10px]" style={{ color: "#A89080" }}>Gestão de Produção</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex-shrink-0 transition-colors"
          style={{ color: "#A89080" }}
        >
          {collapsed ? <Menu size={15} /> : <X size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto [scrollbar-width:none]">
        {navItems.map((item) => {
          const active = isActive(item);
          const hasChildren = !!item.children;
          const isExpanded = expanded.includes(item.id);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (hasChildren) { toggle(item.id); }
                  else if (item.view) {
                    if (item.id === "seamstresses") onNavigate("seamstress-profile", "s1");
                    else onNavigate(item.view);
                  }
                }}
                title={collapsed ? item.label : undefined}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative"
                style={active ? { background: "rgba(196,168,130,0.15)", color: "#E8DDD0" } : { color: "#A89080" }}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full" style={{ background: "#C4A882" }} />
                )}
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {hasChildren && (
                      <span className="transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "" }}>
                        <ChevronDown size={13} />
                      </span>
                    )}
                  </>
                )}
              </button>
              {hasChildren && isExpanded && !collapsed && (
                <div style={{ background: "rgba(0,0,0,0.15)" }}>
                  {item.children!.map((child) => (
                    <button
                      key={child.view}
                      onClick={() => {
                        if (child.view === "seamstress-profile") onNavigate(child.view, "s1");
                        else onNavigate(child.view);
                      }}
                      className="w-full flex items-center gap-2 pl-10 pr-4 py-2 text-xs transition-colors"
                      style={currentView === child.view ? { color: "#E8DDD0", fontWeight: 500 } : { color: "#8A7060" }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: "currentColor", opacity: 0.6 }} />
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: "#C4A882", color: "#2C1A0E" }}>
            AN
          </div>
          {!collapsed && (
            <>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-semibold leading-tight" style={{ color: "#E8DDD0" }}>Ana Gestora</p>
                <p className="text-[10px]" style={{ color: "#8A7060" }}>Administradora</p>
              </div>
              <button className="transition-colors" style={{ color: "#8A7060" }} title="Sair">
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (v: View, id?: string) => {
    setView(v);
    setSelectedId(id);
    setMobileOpen(false);
  };

  const addService = (s: Service) => setServices((p) => [s, ...p]);

  const updateStatus = (id: string, status: ServiceStatus, note: string) =>
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status, updatedAt: new Date().toISOString().split("T")[0], history: [...s.history, { date: new Date().toISOString().split("T")[0], status, note }] }
          : s
      )
    );

  const selectedService = services.find((s) => s.id === selectedId);
  const selectedSeamstress = seamstresses.find((s) => s.id === selectedId) ?? seamstresses[0];

  return (
    <div className="flex h-screen bg-background overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-20 md:hidden" style={{ background: "rgba(44,26,14,0.5)" }} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar desktop */}
      <div className="hidden md:flex flex-shrink-0 h-full">
        <Sidebar currentView={view} onNavigate={navigate} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      </div>

      {/* Sidebar mobile */}
      <div
        className={`fixed left-0 top-0 h-full z-30 md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar currentView={view} onNavigate={navigate} collapsed={false} setCollapsed={() => setMobileOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-card border-b border-[--border] flex items-center px-4 gap-3 flex-shrink-0"
          style={{ boxShadow: "0 1px 3px rgba(60,35,15,0.07)" }}>
          <button className="md:hidden text-[--muted-foreground] hover:text-[--foreground]" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="relative max-w-xs hidden sm:block">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--muted-foreground]" />
              <input
                className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-[--border] bg-[--input-background] focus:border-[--primary] outline-none w-52 text-[--foreground] placeholder:text-[--muted-foreground]"
                placeholder="Buscar..."
              />
            </div>
          </div>
          <button className="relative text-[--muted-foreground] hover:text-[--foreground] transition-colors p-1.5">
            <Bell size={17} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full" style={{ background: BRICK }} />
          </button>
          <div className="w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "#C4A882", color: "#2C1A0E" }}>
            AN
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {view === "dashboard" && (
            <DashboardView services={services} seamstresses={seamstresses} onNavigate={navigate} />
          )}
          {view === "services" && (
            <ServicesListView services={services} seamstresses={seamstresses} onNavigate={navigate} />
          )}
          {view === "new-service" && (
            <NewServiceView seamstresses={seamstresses} onNavigate={navigate} onSave={addService} />
          )}
          {view === "service-detail" && selectedService && (
            <ServiceDetailView service={selectedService} seamstresses={seamstresses} onNavigate={navigate} onUpdateStatus={updateStatus} />
          )}
          {view === "seamstress-profile" && (
            <SeamstressProfileView seamstress={selectedSeamstress} services={services} onNavigate={navigate} />
          )}
        </main>
      </div>
    </div>
  );
}
