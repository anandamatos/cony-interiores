import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import Header from '../components/organisms/Header';
import Card from '../components/atoms/Card';
import Typography from '../components/atoms/Typography';
import Badge from '../components/atoms/Badge';
import Footer from '../components/organisms/Footer';

export default {
  title: 'Layouts/Shell do Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
};

const StatCard = ({ label, value, detail }) => (
  <Card className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-gold before:content-['']">
    <Typography variant="caption" color="taupe">{label}</Typography>
    <Typography variant="h2" className="mt-2">{value}</Typography>
    <Typography variant="body2" className="mt-2">{detail}</Typography>
  </Card>
);

export const Overview = () => (
  <MemoryRouter initialEntries={['/']}>
    <div className="min-h-screen bg-offWhite">
      <Sidebar />
      <Header notificationCount={3} />
      <main className="lg:pl-[270px] pt-[88px]">
        <div className="px-6 sm:px-8 lg:px-10 py-8 space-y-8">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <Typography variant="h1">Bem-vinda, Ana</Typography>
              <Typography variant="body1" className="mt-1 text-taupe">Aqui está o resumo da sua operação hoje.</Typography>
            </div>
            <Badge variant="gold">Referência oficial do dashboard</Badge>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard label="Serviços Ativos" value="12" detail="3 novos esta semana" />
            <StatCard label="Costureiras" value="4" detail="1 nova contratada" />
            <StatCard label="Pagamentos Pendentes" value="3" detail="2 em atraso" />
            <StatCard label="Entregas Previstas" value="8" detail="Esta semana" />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
              <Typography variant="h3">Atividade Semanal</Typography>
              <Typography variant="body2" className="mt-1">Serviços finalizados por dia</Typography>
              <div className="mt-6 grid grid-cols-7 h-52 gap-2 rounded-md bg-offWhite/60 border border-border/60 p-4 items-end">
                {[45, 75, 60, 95, 70, 50, 30].map((value, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-9 rounded-t-md bg-gradient-gold" style={{ height: `${value}%` }} />
                    <Typography variant="caption">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}</Typography>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <Typography variant="h3">Distribuição</Typography>
              <Typography variant="body2" className="mt-1">Serviços por tipo</Typography>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-40 h-40 rounded-full" style={{ background: 'conic-gradient(#E8E3D9 0% 45%, #7C8A6E 45% 70%, #C2996A 70% 85%, #903839 85% 100%)' }}>
                  <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/90 flex flex-col items-center justify-center shadow-sm">
                    <Typography variant="h3">12</Typography>
                    <Typography variant="caption">Total</Typography>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
        <Footer />
      </main>
    </div>
  </MemoryRouter>
);