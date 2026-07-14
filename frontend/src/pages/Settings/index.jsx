import { Bell, Lock, Palette, ShieldCheck } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';

const settingsGroups = [
  {
    id: 'notifications',
    title: 'Notificacoes',
    description: 'Configure alertas para prazos, pagamentos e atrasos.',
    icon: Bell,
    status: 'Ativo',
    variant: 'success',
  },
  {
    id: 'security',
    title: 'Seguranca',
    description: 'Defina permissao de equipe e protecao de conta.',
    icon: Lock,
    status: 'Revisar',
    variant: 'warning',
  },
  {
    id: 'appearance',
    title: 'Aparencia',
    description: 'Ajuste preferencias visuais para o painel.',
    icon: Palette,
    status: 'Padrao',
    variant: 'neutral',
  },
  {
    id: 'compliance',
    title: 'Conformidade',
    description: 'Gerencie consentimentos e trilha de auditoria.',
    icon: ShieldCheck,
    status: 'Ok',
    variant: 'info',
  },
];

const Settings = () => {
  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <section className="mb-8">
        <Typography variant="h1">Configuracoes</Typography>
        <Typography variant="body1" className="mt-1">
          Centralize as preferencias operacionais do Cony.
        </Typography>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Grupos de configuracao">
        {settingsGroups.map((group) => {
          const Icon = group.icon;
          return (
            <Card key={group.id} hover className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-md bg-offWhite text-taupe flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <Badge variant={group.variant} size="sm">
                  {group.status}
                </Badge>
              </div>

              <Typography variant="h3" className="mt-4">
                {group.title}
              </Typography>
              <Typography variant="body2" className="mt-1 text-taupe">
                {group.description}
              </Typography>
            </Card>
          );
        })}
      </section>
    </main>
  );
};

export default Settings;
