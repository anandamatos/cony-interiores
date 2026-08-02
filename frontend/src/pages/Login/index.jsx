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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      if (error.response?.status === 401 || error.response?.status === 400) {
        setErrorMessage('Credenciais inválidas. Verifique o usuário e a senha e tente novamente.');
      } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        setErrorMessage('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
      } else {
        setErrorMessage('Não foi possível entrar com essas credenciais. Tente novamente.');
      }
      console.error('Erro ao autenticar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(222,187,164,0.38),_transparent_35%),linear-gradient(135deg,_#F8F5F0_0%,_#FFF9F2_52%,_#EFE3D2_100%)] px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-between rounded-[28px] border border-[rgba(34,24,18,0.35)] bg-[linear-gradient(160deg,_rgba(43,30,22,0.98),_rgba(75,58,46,0.96))] p-8 text-offWhite shadow-[0_28px_60px_rgba(26,20,16,0.28)] sm:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFF7EF]">
              <Sparkles className="h-4 w-4" />
              Sua área de trabalho
            </div>
            <Typography variant="h1" className="mt-8 max-w-md !text-[3rem] !leading-[0.95] text-white">
              Entre para continuar seu atendimento.
            </Typography>
            <Typography variant="body1" className="mt-4 max-w-lg text-white/90">
              Aqui você acompanha pedidos, cadastros e tudo o que precisa para seguir o dia com mais organização.
            </Typography>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border border-white/12 bg-[rgba(18,12,9,0.48)] p-5 text-offWhite shadow-none backdrop-blur-sm">
              <Shield className="h-5 w-5 text-[#F3D6BF]" />
              <Typography variant="h4" className="mt-3 text-white">
                Acesso da gestora
              </Typography>
              <Typography variant="body2" className="mt-1 text-white/88">
                Para quem acompanha os pedidos e organiza a rotina da equipe.
              </Typography>
            </Card>
            <Card className="border border-white/12 bg-[rgba(18,12,9,0.48)] p-5 text-offWhite shadow-none backdrop-blur-sm">
              <LockKeyhole className="h-5 w-5 text-[#F3D6BF]" />
              <Typography variant="h4" className="mt-3 text-white">
                Acesso da operação
              </Typography>
              <Typography variant="body2" className="mt-1 text-white/88">
                Para seguir com os cadastros e consultas do dia a dia.
              </Typography>
            </Card>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <Card className="w-full max-w-xl border border-[rgba(112,56,36,0.14)] bg-[#FFFDF9] p-7 shadow-[0_22px_50px_rgba(75,58,46,0.14)] backdrop-blur-sm sm:p-10">
            <div>
              <Typography variant="caption" className="uppercase tracking-[0.2em] text-[#7C5B47]">
                Bem-vinda
              </Typography>
              <Typography variant="h2" className="mt-2 text-[#5A2F1E]">
                Acesse sua área
              </Typography>
              <Typography variant="body2" className="mt-2 text-[#5A473B]">
                Entre com seus dados para continuar.
              </Typography>
            </div>

            {errorMessage && (
              <Alert type="error" title="Falha no login" message={errorMessage} className="mt-6" />
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-username" className="mb-2 block text-sm font-semibold text-[#4B3A2E]">
                  Seu nome de acesso
                </label>
                <input
                  id="login-username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-md border border-[rgba(75,58,46,0.18)] bg-white px-4 py-3 text-[#2E221A] placeholder:text-[#8C7568] outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                  autoComplete="username"
                  placeholder="ananda"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-[#4B3A2E]">
                  Senha
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-md border border-[rgba(75,58,46,0.18)] bg-white px-4 py-3 text-[#2E221A] placeholder:text-[#8C7568] outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                  autoComplete="current-password"
                  placeholder="Sua senha"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Continuar'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 rounded-[20px] border border-[rgba(112,56,36,0.18)] bg-[#F2E8DD] p-5">
              <Typography variant="h4" className="text-[#40281E]">O que você encontra aqui</Typography>
              <ul className="mt-3 space-y-2 text-sm text-[#4B3A2E]">
                <li>• Um espaço para organizar pedidos, cadastros e acompanhamento.</li>
                <li>• Uma navegação simples para seguir o trabalho sem perder contexto.</li>
                <li>• Acesso preparado para a rotina de quem cuida da operação.</li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Login;
