import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Shield, Sparkles } from 'lucide-react';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Alert from '../../components/atoms/Alert';
import Typography from '../../components/atoms/Typography';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState('ananda');
  const [password, setPassword] = useState('Ananda@2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage('Nao foi possivel entrar com essas credenciais. Verifique usuario e senha.');
      console.error('Erro ao autenticar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(222,187,164,0.38),_transparent_35%),linear-gradient(135deg,_#F8F5F0_0%,_#FFF9F2_52%,_#EFE3D2_100%)] px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-between rounded-[28px] border border-[rgba(112,56,36,0.08)] bg-[linear-gradient(160deg,_rgba(112,56,36,0.96),_rgba(75,58,46,0.92))] p-8 text-offWhite shadow-[0_28px_60px_rgba(75,58,46,0.18)] sm:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F6E9DC]">
              <Sparkles className="h-4 w-4" />
              Area logada
            </div>
            <Typography variant="h1" className="mt-8 max-w-md !text-[3rem] !leading-[0.95] text-offWhite">
              Cony Interiores em modo de operação.
            </Typography>
            <Typography variant="body1" className="mt-4 max-w-lg text-[#F8F0E7]/85">
              O Dashboard continua público. O restante da plataforma fica disponível apenas para quem entrar com acesso válido.
            </Typography>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border border-white/10 bg-white/8 p-5 text-offWhite shadow-none backdrop-blur-sm">
              <Shield className="h-5 w-5 text-[#DEBBA4]" />
              <Typography variant="h4" className="mt-3 text-offWhite">
                Erika
              </Typography>
              <Typography variant="body2" className="mt-1 text-[#F8F0E7]/75">
                Perfil de gerente com acesso total às rotas protegidas.
              </Typography>
            </Card>
            <Card className="border border-white/10 bg-white/8 p-5 text-offWhite shadow-none backdrop-blur-sm">
              <LockKeyhole className="h-5 w-5 text-[#DEBBA4]" />
              <Typography variant="h4" className="mt-3 text-offWhite">
                Ananda
              </Typography>
              <Typography variant="body2" className="mt-1 text-[#F8F0E7]/75">
                Acesso padrão da operação para navegação diária do sistema.
              </Typography>
            </Card>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <Card className="w-full max-w-xl border border-[rgba(112,56,36,0.08)] bg-white/92 p-7 shadow-[0_22px_50px_rgba(75,58,46,0.12)] backdrop-blur-sm sm:p-10">
            <div>
              <Typography variant="caption" className="uppercase tracking-[0.2em] text-taupe">
                Acesso restrito
              </Typography>
              <Typography variant="h2" className="mt-2">
                Entrar na plataforma
              </Typography>
              <Typography variant="body2" className="mt-2 text-taupe">
                Use as credenciais de teste para acessar todas as áreas protegidas.
              </Typography>
            </div>

            {errorMessage && (
              <Alert type="error" title="Falha no login" message={errorMessage} className="mt-6" />
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-username" className="mb-2 block text-sm font-semibold text-primary">
                  Usuário
                </label>
                <input
                  id="login-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-md border border-border bg-offWhite px-4 py-3 text-primary outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                  autoComplete="username"
                  placeholder="ananda"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-primary">
                  Senha
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-md border border-border bg-offWhite px-4 py-3 text-primary outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                  autoComplete="current-password"
                  placeholder="Sua senha"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Acessar sistema'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 rounded-[20px] border border-[rgba(112,56,36,0.08)] bg-offWhite/75 p-5">
              <Typography variant="h4">Regras de acesso</Typography>
              <ul className="mt-3 space-y-2 text-sm text-taupe">
                <li>• Dashboard permanece liberado sem login.</li>
                <li>• Serviços, Costureiras, Financeiro e demais áreas exigem autenticação.</li>
                <li>• A busca do topo continua funcional e acompanha a navegação.</li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Login;
