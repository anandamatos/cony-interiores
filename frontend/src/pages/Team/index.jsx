import { Briefcase, UserRoundPlus } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';
import Button from '../../components/atoms/Button';

const members = [
  { id: 1, name: 'Sirlene Costa', role: 'Costura Geral', status: 'Disponivel', variant: 'success' },
  { id: 2, name: 'Mariana Lopes', role: 'Bordado', status: 'Em Producao', variant: 'warning' },
  { id: 3, name: 'Joana Ribeiro', role: 'Modelagem', status: 'Folga', variant: 'neutral' },
  { id: 4, name: 'Ana Paula Nunes', role: 'Acabamento', status: 'Disponivel', variant: 'success' },
];

const Team = () => {
  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Typography variant="h1">Equipe</Typography>
          <Typography variant="body1" className="mt-1">
            Acompanhe a disponibilidade das pessoas e distribua demanda.
          </Typography>
        </div>
        <Button variant="primary">
          <UserRoundPlus className="w-4 h-4" />
          Convidar membro
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card className="p-5">
          <Typography variant="caption" className="text-taupe uppercase">
            Time total
          </Typography>
          <Typography variant="h1" className="text-3xl mt-1">
            {members.length}
          </Typography>
        </Card>
        <Card className="p-5">
          <Typography variant="caption" className="text-taupe uppercase">
            Disponiveis agora
          </Typography>
          <Typography variant="h1" className="text-3xl mt-1">
            {members.filter((m) => m.status === 'Disponivel').length}
          </Typography>
        </Card>
        <Card className="p-5">
          <Typography variant="caption" className="text-taupe uppercase">
            Em producao
          </Typography>
          <Typography variant="h1" className="text-3xl mt-1">
            {members.filter((m) => m.status === 'Em Producao').length}
          </Typography>
        </Card>
        <Card className="p-5">
          <Typography variant="caption" className="text-taupe uppercase">
            Novas vagas
          </Typography>
          <Typography variant="h1" className="text-3xl mt-1">
            2
          </Typography>
        </Card>
      </section>

      <section className="space-y-3" aria-label="Lista de membros">
        {members.map((member) => (
          <Card key={member.id} hover className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-md bg-gradient-primary text-white flex items-center justify-center font-bold">
                  {member.name.charAt(0)}
                </span>
                <div>
                  <Typography variant="h4">{member.name}</Typography>
                  <Typography variant="body2" className="text-taupe">
                    {member.role}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={member.variant} size="sm">
                  {member.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Briefcase className="w-4 h-4" />
                  Ver agenda
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Team;
