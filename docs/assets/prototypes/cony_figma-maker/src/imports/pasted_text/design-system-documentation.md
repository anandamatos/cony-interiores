Gere e documente um Design System coeso no Figma, derivado diretamente de, e aplique-o globalmente.

Documentação do Design System (Página 1): Detalhe todos os parâmetros visuais.

Paleta (Aplicação estrita a partir de): Use as cores naturais ricas e tradicionais. Elementos de UI principais: Fendi/Taupe Rico. Acentos secundários e cabeçalhos: Marrom Profundo. Superfícies/Fundos de cards: Bege Quente. Fundos de tela: Fendi Neutro.

Rejeite todos os códigos de cores verde/laranja anteriores. Use a paleta de. Para barras de status de carga de trabalho (Verde/Amarelo/Vermelho, conforme descrito abaixo), estilize-as dentro desta paleta: um verde-oliva quente, vermelho-tijolo dessaturado e dourado quente, garantindo que pareçam integrados e tradicionais.

Tipografia:

Títulos e Cabeçalhos (H1, H2, Títulos de Card): Aplique uma fonte serifada profissional (ex: Playfair Display ou Noto Serif) para transmitir "Autoridade e História", conforme exemplos de "CONY". Tamanhos: H1=32px, H2=24px.

Corpo de Texto, Elementos de UI, Dados, Inputs, Tooltips: Aplique fontes sans-serif modernas (ex: Inter, Roboto) para clareza e legibilidade moderna. Tamanhos: Corpo=16px, Pequeno=12px.

Gráficos e Padrões: Abstraia o padrão gráfico de "linhas paralelas" (trama de tecido) de forma conceitual. Aplique-o sutilmente como marcas d'água de fundo em áreas de conteúdo principais ou como linhas finas/divisórias entre seções, garantindo uma aplicação limpa e sofisticada. Não faça disso uma textura de fundo genérica.

Ícones: Use ícones Lucide/Ionic limpos e consistentes, visíveis e alinhados com a paleta.

Biblioteca de Componentes: Pré-gere componentes: Cards, Botões (Primário/Secundário/Perigo com estados de hover), Tabelas (paginadas, com zebra striping), Inputs de formulário (com validação inline), Barra Lateral Esquerda, Barra de Cabeçalho, Breadcrumbs.

2. Arquitetura Global e Prototipagem
Container Geral: Crie um sistema de navegação de três níveis no Figma. Barra Lateral Esquerda Fixa (240px de largura). Área de conteúdo com cabeçalho fixo (Breadcrumbs, menu rápido de perfil). Conteúdo principal rolável.

Barra Lateral Esquerda Fixa (MVP 1): Expansível no desktop, recolhível no tablet/mobile overlay. Inclua ícones + labels. Destaque o item ativo com a paleta primária Fendi. Itens: Dashboard (🏠), Serviços (📋), Costureiras (👩‍🔧), Financeiro (💰), Relatórios (📊), Configurações (⚙️). Submenus expansíveis para 'Serviços' (Listar, Novo) e 'Costureiras' (Listar, Nova). Coloque o Perfil do Usuário (avatar, nome, cargo) no rodapé da barra lateral.

Barra de Cabeçalho: Breadcrumbs integrados, Menu Rápido de Usuário (Configurações, Sair).

Responsividade: Gere versões completas para Desktop, Tablet e Mobile para cada tela priorizada. Desktop (1024px+): Menu fixo, grid de cards em 3 colunas. Tablet (768-1024px): Menu recolhível, grid em 2 colunas. Mobile (<768px): Menu overlay, grid em 1 coluna, cards responsivos.

Conexões de Protótipo: Lógica básica e navegável: Dashboard linka para listas completas de Serviços/Costureiras. Itens da lista linkam para visualizações detalhadas. Botões de novo item linkam para formulários. Botões de voltar linkam para a lista. Garanta que a Barra Lateral navegue corretamente. Inclua interações de hover, estados ativos, estados de carregamento (skeletons) e feedback (toasts).

3. Telas Priorizadas (Aplicação do MVP 1)
Aplique o Design System explicitamente nestas telas. A visualização de dados deve parecer tradicional, simples e limpa.

Tela 1: Dashboard (Visão Geral - Desktop, Tablet, Mobile)

Estados Ativos: Item da barra lateral 'Dashboard' ativo.

Indicadores da Linha Superior: Aplique sombras suaves, arredondamento de 8px e ícones ilustrativos em cards de dados. Cards para: Serviços Ativos, Costureiras Ativas, Pagamentos Pendentes. Use tons de marrom profundo/bege/fendi, rejeitando verde/laranja. Valor em destaque, labels claras.

Visualização de Carga de Trabalho: Implemente um gráfico de barras horizontal ou agrupado derivado conceitualmente dos exemplos de. Mostre barras de carga para cada costureira.

Lógica de Cores: Mapeie os limites de seguro, alerta e urgente, mas estilize-os com verde-oliva quente, vermelho-tijolo dessaturado e dourado quente dentro da paleta fendi/marrom.

Lista de Alertas: Serviços/costureiras que precisam de atenção. Marque serviços com prazos próximos com um ícone dourado quente/vermelho-tijolo.

Tela 2: Lista de Serviços (Grid/Tabela de Serviços)

Estados Ativos: Item da barra lateral 'Serviços' ativo.

Barra Superior: Botão primário "Novo Serviço" em marrom profundo com texto serifado. Múltiplos filtros dropdown para 'Status', 'Costureira' e 'Período'.

Tabela: Grid de dados paginado com zebra striping em fendi claro/bege. Colunas: Cliente, Produto, Costureira, Status, Prazo, Ações.

Badges de Status: Use badges coloridos com uma estética quente: Em produção (Amarelo Quente), Pronto (Verde Quente), Entregue (Azul Quente), Atrasado (Vermelho Quente).

Paginação: Inclua na parte inferior.

Tela 3: Cadastro de Serviço (Formulário)

Estados Ativos: Item da barra lateral 'Serviços' ativo.

Layout: Estrutura de formulário abrangente. Agrupe campos logicamente. Use títulos H2 serifados. Labels sans-serif acima dos campos.

Campos: Dropdowns multiseleção para Cliente/Produto. Botões de rádio para Complexidade. Seletores de data. Inputs de valor. Um dropdown de 'Costureira' com um indicador visual da carga de trabalho atual (derivado conceitualmente da Tela 1).

Botões: Agrupamento lógico: "Cancelar" (secundário, bege quente) e "Cadastrar" (primário, marrom profundo).

Tela 4: Detalhes do Serviço (#123 - [Nome])

Estados Ativos: Item da barra lateral 'Serviços' ativo.

Header: Breadcrumb (Home / Serviços / #123 - [Nome]).

Informações: Card abrangente de visualização de dados com título serifado. Informações completas (cliente, produto, complexidade, datas, valor).

Linha do Tempo de Status: Uma linha do tempo visual, horizontal ou vertical, de mudanças de status. Dropdown de atualização de status. Botões para "Editar" e "Excluir". Botão de voltar.

Tela 5: Perfil da Costureira ([Nome])

Estados Ativos: Item da barra lateral 'Costureiras' ativo.

Header: Breadcrumb (Home / Costureiras / [Nome]).

Informações: Perfil da costureira no lado esquerdo derivado conceitualmente de (avatar, nome, contato, especialidade). Lado direito com cards de performance, usando explicitamente fendi/marrom. KPIs (cards) para: Carga Atual, Serviços em Andamento, Serviços Entregues no mês.

Gráficos: Gráfico de barras de histórico de produção tradicional.

Lista de Serviços: Uma sub-tabela com lista de serviços ativos para esta costureira.