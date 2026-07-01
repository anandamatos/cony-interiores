import Typography from '../../components/atoms/Typography';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';

const Seamstresses = () => {
  const seamstresses = [
    { id: 1, nome: 'Sirlene Santos', contato: '(11) 99999-9999', carga: 8, especialidade: 'Cortinas' },
    { id: 2, nome: 'Maria Oliveira', contato: '(11) 98888-8888', carga: 6, especialidade: 'Forros' },
    { id: 3, nome: 'Joana Silva', contato: '(11) 97777-7777', carga: 4, especialidade: 'Reformas' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h2">Costureiras</Typography>
        <Button variant="primary">+ Nova Costureira</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seamstresses.map((seamstress) => (
          <Card key={seamstress.id} hover>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {seamstress.nome.charAt(0)}
              </div>
              <div className="flex-1">
                <Typography variant="h4">{seamstress.nome}</Typography>
                <Typography variant="caption" className="block mt-0.5">
                  {seamstress.contato}
                </Typography>
                <Typography variant="caption" className="block mt-1">
                  Especialidade: {seamstress.especialidade}
                </Typography>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-text-secondary">Carga:</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(seamstress.carga / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{seamstress.carga}/10</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Seamstresses;