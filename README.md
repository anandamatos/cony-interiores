# 🛠 Metodologias e Processos de Gestão
Este projeto utiliza um framework híbrido que combina design estratégico, agilidade na execução e rigor técnico para garantir a entrega de valor real e escalável para o cliente **Cony Interiores**.
## 💎 Metodologia Duplo Diamante (Double Diamond)
O processo de design segue o framework do **Double Diamond**, que funciona como um **"filtro de café"**: primeiro, abrimos o leque para capturar todas as possibilidades (divergência) e depois afunilamos para extrair a essência da solução (convergência).

-   **Descobrir (Divergência):** Foco na exploração do problema, coleta de dados brutos e síntese de dores reais através de *Stakeholder Maps* e pesquisas de mercado.
-   **Definir (Convergência):** Filtragem de ideias para estabelecer o escopo, criação de **Personas** (como o Analista de Operações) e definição de **KPIs** de negócio.
-   **Desenvolver (Divergência):** Fase de criação técnica e prototipagem, incluindo a construção de pipelines de dados e experimentos com modelos de **Machine Learning**.
-   **Entregar (Convergência):** Finalização com validação técnica, documentação end-to-end e apresentação do **ROI (Retorno sobre Investimento)** para os stakeholders.

## 🏃 Filosofia Ágil (Scrum/Kanban)
A gestão de tarefas é fundamentada em práticas ágeis para manter o ritmo de entrega e a visibilidade do progresso.

-   **Sprints:** Ciclos de trabalho (geralmente de 1 a 2 semanas) com objetivos claros e mensuráveis definidos no **Sprint Goal**.
-   **Sprint Planning:** Reuniões de 60 a 90 minutos para priorizar o backlog e alinhar a capacidade da equipe (reserva de 20% de buffer para imprevistos).
-   **Estimativa Fibonacci:** Uso da sequência (1, 2, 3, 5, 8, 13) para mensurar o esforço de cada *User Story*.
-   **Cerimônias:** Realização de **Dailies** para alinhamento rápido e **Peer Reviews** para garantir a qualidade e colaboração constante entre os membros.
-   **DoR (Definition of Ready):** Uma tarefa só inicia se tiver descrição clara, estimativa definida e responsável atribuído.

## 🌿 Workflow do Git
Para garantir a integridade do código e a colaboração organizada, seguimos um fluxo de trabalho baseado em ramificações (*branching*).

-   **Branches de Feature:** Cada nova funcionalidade ou história de usuário deve ser desenvolvida em uma branch específica (ex: `feat/nome-da-feature`).
-   **Commits Atômicos:** Cada tarefa concluída deve gerar um commit separado, facilitando o rastreio de alterações e possíveis rollbacks.
-   **Integração:** O progresso técnico é consolidado através de Pull Requests, garantindo que o código passe por revisão antes de chegar à branch principal.

## 📂 Estrutura de Pastas sugerida
```
cony-interiores/
├── backend/                # API Python (FastAPI ou Flask)
│   ├── app/                # Lógica da aplicação
│   │   ├── api/            # Endpoints (v1/predict, v1/stats)
│   │   ├── core/           # Configurações globais e segurança
│   │   ├── models/         # Schemas de dados (Pydantic)
│   │   ├── services/       # Regras de negócio e integração com ML
│   │   └── main.py         # Ponto de entrada da API
│   ├── requirements.txt    # Dependências do backend
│   └── Dockerfile          # Containerização do backend
│
├── frontend/               # Aplicação React.js
│   ├── public/             # Assets estáticos
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis (Dashboards, Cards)
│   │   ├── hooks/          # Lógica de estado e chamadas de API
│   │   ├── pages/          # Telas (Home, Operações, ROI Analysis)
│   │   ├── services/       # Integração com o backend via Axios/Fetch
│   │   └── App.js          # Componente principal
│   └── package.json        # Dependências do frontend
│
├── data-science/           # Fluxo de trabalho de ML
│   ├── notebooks/          # Experimentos, EDA e Validação 
│   ├── scripts/            # Treinamento e Preprocessing Pipeline
│   └── tests/              # Testes de performance do modelo (Recall, SHAP)
│
├── shared/                 # Artefatos compartilhados entre times
│   ├── models/             # Arquivos .joblib ou .onnx serializados 
│   └── data/               # Amostras de dados e metadados
│
├── infra/                  # Configurações de infraestrutura (OCI/Docker)
│   ├── docker-compose.yml  # Orquestração local de Front, Back e DB
│   └── .env.example        # Variáveis de ambiente
│
└── README.md               # Documentação principal do projeto

```
### Explicação dos Pilares da Estrutura:

-   **Separação Front/Back:** A estrutura permite que o **React** gerencie a experiência do usuário (UX) com foco em velocidade e ações (Princípios de Design), enquanto o **Python** processa as inferências pesadas de dados.
-   **Módulo** **data-science/****:** Mantém o ambiente de experimentação (Notebooks) separado da produção (Scripts), seguindo as boas práticas de **MLOps** identificadas no programa.
-   **Pasta** **shared/models/****:** É o ponto de encontro técnico. O time de Data Science deposita o pipeline serializado (`.joblib`) que o time de Backend carrega via **Model Loader** para realizar as previsões em tempo real.
-   **Arquitetura em Camadas no Backend:** Mesmo em Python, recomenda-se manter a lógica de **Services** e **Controllers** (aqui chamados de rotas/endpoints). Isso facilita a manutenção e o teste unitário de regras de negócio, como o cálculo de **ROI** e estatísticas de voos.
-   **Containerização Única:** O uso de **Docker** no diretório `infra/` ou na raiz garante que a comunicação entre o React (cliente) e o Python (servidor) ocorra sem conflitos de ambiente, especialmente em deploys na **Oracle Cloud (OCI)**.

## Times e Papeis

No novo projeto **Cony Interiores**, com **React** e **Python**, a organização de times e papéis para garantir a integração e a agilidade podera ser a seguinte:

### 1. Time de Frontend (Stack: React)
Este time foca na interface centrada no usuário e no consumo eficiente da API.
*   **Frontend Engineer:** Responsável por construir componentes reutilizáveis, gerenciar o estado da aplicação e garantir a performance no browser.
*   **UX/UI Designer:** Foca na **Clareza sobre a Complexidade**, criando interfaces que permitem interpretar maior usabilidade do projeto (conforme os princípios de design do projeto).
*   **Web Analyst (sugestão):** Monitora o uso da plataforma e garante que o fluxo de cliques para uma análise preditiva seja inferior a 3 cliques.

### 2. Time de Backend e Dados (Stack: Python)
Dado que tanto o Backend quanto o Data Science usarão Python, este time pode ser altamente integrado (ou um time de **Engenharia de ML**).
*   **Backend Developer (Python):** Constrói a API (FastAPI/Flask), gerencia a segurança, o banco de dados (OCI Autonomous) e a lógica de integração com o modelo.
*   **Data Scientist:** Foca na **Engenharia de Atributos** (se for necessário), treinamento de modelos de alta performance (XGBoost/Ensemble) e explicabilidade via SHAP.
*   **MLOps Engineer (sugestão): Papel crítico para a **Dockerização**, automação do pipeline de deploy na OCI e implementação de detecção de *Data Drift*.

### 3. Gestão e Estratégia (Cross-functional/time todo)
Papéis que orbitam os dois times técnicos para garantir o alinhamento com o negócio.
*   **Product Owner (PO):** Define a visão do produto, prioriza o backlog de **User Stories** por valor/esforço e valida os critérios de aceitação.
*   **Scrum Master / Agile Coach:** Facilita as cerimônias (Planning, Dailies, Retro) e garante que o **Buffer de 20%** para imprevistos seja respeitado.
*   **Business/Financial Analyst:** Responsável pelo **ROI Model** e pela tradução das métricas técnicas (como Recall) em economia operacional real.

### 💡 Principio de Organização
O modelo acima de **Analistas (A, B, C)** funciona para que na hora de distribuir subtarefas dentro das Sprints, garanta que cada membro tenha um objetivo claro, como "Validação de Estabilidade" ou "Criação de Documentação Técnica", evitando que o trabalho fique concentrado em apenas uma pessoa.

## 🚀 MLOps e Produção
O projeto visa a **"Enterprise Readiness"** (Prontidão Corporativa):

-   **Containerização:** Uso de **Docker** para garantir que o ambiente seja consistente em qualquer infraestrutura.-   **Explicabilidade (XAI):** Implementação de **SHAP** para que as decisões da IA sejam transparentes para os usuários humanos.
-   **Monitoramento:** Estratégias para detectar **Data Drift** e garantir a saúde do modelo a longo prazo


## Links & Referencias
