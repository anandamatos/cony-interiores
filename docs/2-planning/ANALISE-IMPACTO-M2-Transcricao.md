# Reunião de Status — MVP 2/3/4

**Data:** 23 de julho de 2026
**Participantes identificados:** Ananda, Érika, Felipe, Matheus e demais participantes
**Objetivo:** Recapitular os compromissos da última reunião, apresentar a evolução do MVP 2, validar decisões sobre capacidade produtiva, distribuição de demandas, financeiro e pagamentos, e alinhar os próximos ajustes do sistema.

---

## 1. Abertura

**Ananda:**
Boa tarde, pessoal. Vamos aguardar mais alguns minutos para verificar se mais alguém vai participar e, no máximo em cinco minutos, damos início.

**Participante:**
Beleza.

**Felipe:**
E aí, Felipe? Boa tarde.

**Ananda:**
Estou comentando com vocês para aguardarmos mais alguns minutos para o pessoal entrar. Daqui a pouco começamos.

**Participante:**
Pode ser.

**Ananda:**
Vou ficar aqui mutado. Conforme o pessoal for aparecendo, vou interagindo.

**Participante:**
Boa tarde.

**Participantes:**
Oi. Boa tarde.

**Ananda:**
Estamos aguardando mais um pouquinho para ver quem mais vai participar. Daqui a pouco começamos.

**Érika:**
Gente, eu só não consigo aguardar muito tempo porque tenho um compromisso hoje às 17h40. Então preciso terminar por volta das 17h30.

**Ananda:**
Exatamente. Na verdade, eu já ia começar agora mesmo.

---

# 2. Objetivo da reunião

**Ananda:**
A reunião de hoje é mais voltada para alinhamento e recapitulação do que nos comprometemos a fazer.

A ideia é:

* Revisar o que foi feito desde a última reunião;
* Analisar algumas demandas e dúvidas que surgiram durante o desenvolvimento;
* Recapitular as informações levantadas;
* Validar o que faz sentido e o que não faz;
* Identificar eventuais dúvidas adicionais;
* Fazer os reajustes necessários na trajetória do projeto;
* Seguir com o desenvolvimento para concluir o sistema da maneira mais precisa possível.

Vou compartilhar a tela e apresentar rapidamente a apresentação da última reunião, retomando os principais pontos antes de entrarmos nos novos alinhamentos.

---

# 3. Recapitulação do projeto e da última entrega

**Ananda:**
Na última apresentação, revisamos o estado da entrega e os principais alinhamentos que precisávamos alcançar até o final do projeto.

A equipe foi dividida em frentes para trabalhar:

* Tarefas estruturantes e fundamentais do projeto;
* Modelo de negócio;
* Interface e experiência do usuário.

Na primeira entrega, trabalhamos:

* Fluxo operacional;
* Responsividade e adaptação da ferramenta a diferentes dispositivos e tamanhos de tela;
* Formulários e navegação mais rápida e fluida;
* Início da construção de um Design System;
* Aplicação da identidade visual da marca.

Também começamos a trabalhar na questão da **carga de trabalho real das costureiras**, buscando entender a capacidade de cada uma.

A ideia inicial era criar um cálculo baseado na complexidade das demandas, considerando o tempo necessário para execução.

Por exemplo:

* Uma demanda executada em aproximadamente um dia teria uma complexidade menor;
* Quanto maior o número de dias necessários para execução, maior seria o nível de complexidade atribuído.

O objetivo seria ter controle sobre:

* Status da demanda;
* Envio;
* Entrega;
* Carga de trabalho;
* Produção mensal;
* Observações;
* Complexidade das demandas.

Também havia a frente relacionada à:

* Gestão;
* Pagamentos;
* Planejamento;
* Resumo das informações.

A lógica de trabalho utilizada foi identificar:

* O que era dúvida;
* O que era certeza;
* O que precisava ser alinhado com a cliente;
* O que poderia ser executado diretamente;
* O que precisaria ser apresentado posteriormente para ajustes.

Neste momento, estamos entrando em uma fase de maior validação visual e funcional, envolvendo:

* Aprovação de cores;
* Validação da identidade visual aplicada;
* Validação das telas;
* Preparação para testes com pessoas externas ao projeto;
* Validação de usabilidade;
* Ajustes técnicos finais;
* Preparação para produção e uso no dia a dia.

---

# 4. Evolução do Design System e da interface

**Ananda:**
A interface do sistema foi reestruturada com base no manual da marca da Cony.

A partir do manual, passamos a considerar:

* Diretrizes tipográficas;
* O que a empresa deseja comunicar;
* Estética de elegância e conforto;
* Cores;
* Tipografia;
* Espaçamento;
* Animações;
* Estados e ações dos componentes.

Também repensamos os elementos de ação da interface, especialmente os botões e componentes que exigem uma interação direta do usuário.

A intenção foi fazer com que a interface tivesse uma aparência mais alinhada ao posicionamento da marca.

Foi feita uma aplicação inicial dessa nova linguagem visual na tela principal do sistema.

A percepção visual muda significativamente em relação à primeira versão, ficando mais alinhada ao manual da marca.

---

# 5. Próximas etapas inicialmente previstas

**Ananda:**
Os próximos passos considerados inicialmente envolviam:

1. Validação inicial do protótipo;
2. Validação das próximas telas;
3. Tela de capacidade financeira;
4. Alinhamento dos pontos discutidos nos documentos;
5. Recálculo das informações necessárias;
6. Definição dos campos que realmente precisam entrar no sistema.

A proposta inicial para a capacidade de carga era apresentar visualmente:

* Atividades semanais;
* Capacidade atual;
* Demandas pendentes;
* Situações que precisavam de resolução.

Para o financeiro, a ideia inicial era apresentar primeiro uma visão geral e, posteriormente, permitir:

* Filtros;
* Visualização da semana seguinte;
* Detalhamento das informações.

**Ananda:**
Queria validar com vocês se essa estrutura faz sentido e, principalmente, repassar alguns pontos para confirmar se o que entendemos está correto antes de fazer os ajustes e recalcular os campos que realmente precisam entrar no sistema.

---

# 6. Capacidade produtiva das costureiras

## 6.1. Posicionamento da cliente

**Érika:**
Acho que essa parte da capacidade não precisa ser considerada como um cálculo automatizado.

O que é importante para nós é conseguir:

* Cadastrar o nome das costureiras;
* Registrar exatamente o serviço que cada uma já recebeu;
* Registrar a quantidade de itens;
* Registrar a data ou semana correspondente.

Por exemplo:

> Semana do dia 27 de julho a 1º de agosto: Mercês tem 10 cortinas para entregar.

> Semana do dia 3 a 8 de agosto: Mercês tem apenas 2 cortinas.

Com essa visualização, consigo perceber que talvez ainda seja possível mandar mais cortinas para ela.

Não precisamos calcular automaticamente quantas cortinas cada costureira consegue produzir.

Isso é algo que fazemos manualmente, conversando com cada costureira.

A capacidade varia muito.

Pode acontecer de uma costureira:

* Receber a filha que mora fora;
* Viajar;
* Trabalhar mais em determinado final de semana;
* Trabalhar menos em determinada semana;
* Ter algum imprevisto pessoal.

Por isso, não existe uma capacidade fixa e exata.

O que precisamos é de uma ferramenta que permita **lançar as informações e visualizá-las de forma clara**.

Não precisamos, neste momento, de um sistema que faça tudo de forma automatizada.

---

# 7. Complexidade dos serviços

## 7.1. Posicionamento inicial de Ananda

**Ananda:**
Uma das dúvidas que tivemos foi sobre quem definiria o nível de complexidade de cada serviço.

Pensamos inicialmente que a própria costureira poderia informar o nível de dificuldade de uma demanda.

Por exemplo, uma mesma peça poderia ser:

* Fácil para uma costureira experiente;
* Mais difícil para uma costureira que está começando;
* Complexa para algumas profissionais;
* Simples para outras.

Por isso, pensamos inicialmente em medir a complexidade considerando o número de dias necessários para realizar determinada peça.

---

## 7.2. Decisão da cliente

**Érika:**
Acho que não precisamos trabalhar com essa classificação de complexidade.

Podemos resolver isso pela própria quantidade equivalente de produção.

Por exemplo:

* Um item mais complexo pode ser lançado como equivalente a duas cortinas;
* Um item ainda mais complexo pode ser considerado equivalente a três cortinas.

Assim conseguimos mensurar o esforço sem precisar criar uma classificação de complexidade.

Além disso, como as costureiras trabalham por produção, a disponibilidade pode variar.

Às vezes uma costureira:

* Quer trabalhar durante todo o final de semana para ganhar mais;
* Vai viajar e quer adiantar a produção;
* Tem algum compromisso pessoal;
* Precisa devolver uma demanda porque aconteceu algum imprevisto.

Portanto, não precisamos automatizar a complexidade.

Essa distribuição será feita manualmente por nós.

---

# 8. O que realmente precisa ser visualizado

**Ananda:**
Então, nesse caso, o sistema registra a ordem de serviço e vocês informam se ela foi realizada ou não?

**Érika:**
Isso.

O mais importante para nós é conseguir visualizar a quantidade de cortinas distribuída por semana.

Por exemplo:

* Semana do dia 27: X cortinas;
* Semana seguinte: Y cortinas;
* Semana posterior: Z cortinas.

Precisamos saber claramente:

* O que já foi contratado;
* O que já foi distribuído;
* O que está previsto para cada semana;
* Quanto trabalho já está comprometido.

Isso é importante porque, quando temos muitas encomendas em determinada semana, precisamos alterar manualmente o prazo de entrega no nosso outro sistema.

Por exemplo:

* Prazo normal: 20 dias corridos;
* Semana muito carregada: prazo passa para 25 dias.

Portanto, quanto mais coisas colocarmos no sistema, mais complexo ele fica, e não precisamos automatizar algo que já fazemos manualmente.

---

# 9. Visualização por costureira e por demanda

**Érika:**
O que eu preciso conseguir visualizar é algo como:

> Mercês
> Semana X
> 10 cortinas

E, se possível, conseguir detalhar quais são essas cortinas.

Por exemplo:

* Cortina do cliente Felipe — sala;
* Cortina do cliente Felipe — quarto;
* Cortina de outro cliente;
* Etc.

Assim consigo visualizar:

* Quantidade;
* Cliente;
* Ambiente;
* Demanda;
* Data prevista.

A questão de saber se uma costureira consegue ou não pegar mais trabalho continua sendo uma decisão tomada por meio de conversa com ela.

---

# 10. Como funciona o processo real de distribuição

**Érika:**
O processo funciona mais ou menos assim:

Recebemos hoje uma encomenda de um cliente.

Por exemplo:

> Cliente: Felipe
> Produto: Cortina da sala
> Data de entrega do cliente: dia 12

Internamente, precisamos que a costureira entregue antes.

Então posso definir:

> Data de entrega para a costureira: dia 5.

No sistema, eu lanço:

* Cliente: Felipe;
* Produto: Cortina da sala;
* Medidas;
* Data de entrega para a costureira.

Com isso, consigo visualizar que a costureira estará ocupada naquela semana com aquela demanda.

Depois, quando lanço uma nova encomenda, consigo visualizar o que ela já tem programado.

É essa visão que precisamos.

A capacidade não precisa ser calculada automaticamente porque a situação pode mudar a qualquer momento.

Por exemplo, a costureira pode estar com uma cortina e, por um problema familiar, precisar devolver a demanda.

Nesse caso, nós conversamos com ela, ajustamos a distribuição e fazemos o lançamento correspondente no sistema.

---

# 11. Financeiro e pagamento das costureiras

## 11.1. Como o valor é definido

**Ananda:**
E em relação ao preço e pagamento, esse valor também é acordado com a costureira no momento em que ela aceita a encomenda?

**Érika:**
Nós já temos uma tabela definida.

Quando lanço o serviço, já sei quanto será pago.

Por exemplo:

> Cortina do Felipe
> 3 metros de largura
> Valor: R$ 30 por metro

Então:

> 3 × R$ 30 = R$ 90

O valor já fica definido pela tabela.

A tabela é a mesma para todas as costureiras.

---

# 12. Cadastro e alteração dos valores

**Érika:**
Os valores podem mudar ao longo do tempo porque fazemos reajustes.

Então seria importante que o sistema permitisse alterar esses valores.

Não tem problema vocês entregarem o sistema inicialmente com um valor de exemplo, como R$ 10.

Depois nós conseguimos alterar os valores.

---

# 13. Cadastro de novos itens

**Ananda:**
E os itens que já temos atualmente?

**Érika:**
Os itens que já existem podem entrar no sistema.

Mas seria interessante também ter uma opção para cadastrar novos itens.

Isso porque podemos:

* Criar novos modelos;
* Adicionar novos produtos;
* Acrescentar novos tipos de serviço.

---

# 14. Formas de cobrança

**Érika:**
A maioria dos itens que informei para a Bianca é calculada por metro.

Porém, existem alguns itens que são cobrados por peça.

Por exemplo:

* Almofadas.

Então seria interessante o sistema conseguir lidar com essas duas possibilidades:

* Cobrança por metro;
* Cobrança por peça.

A maioria, entretanto, é por metro.

---

# 15. Financeiro como visão de apoio

**Érika:**
Para mim, é interessante saber quanto aproximadamente teremos que pagar às costureiras ao final da semana.

Mas esse valor também não é completamente exato.

Há semanas em que elas:

* Trabalham mais;
* Trabalham menos;
* Pegam mais demandas;
* Pegam menos demandas.

Então não precisamos tratar esse valor como uma previsão exata.

---

# 16. Principal necessidade do dashboard

**Ananda:**
Para o dashboard, então, seria importante ter uma visão aproximada do:

* Que já está comprometido;
* Que está atrasado;
* Que ainda pode ser contratado;
* Que está previsto para as próximas semanas.

**Érika:**
Exatamente.

O mais importante para nós é visualizar:

> O que já pegamos.

> O que já está distribuído.

> O que cada costureira tem para fazer.

> O que está previsto para as próximas semanas.

> Quanto trabalho ainda podemos assumir.

---

# 17. Decisões e alinhamentos consolidados

A partir da reunião, ficam definidos os seguintes direcionamentos:

### Capacidade produtiva

* Não será necessário criar um cálculo automatizado de capacidade individual das costureiras.
* O sistema não deverá determinar automaticamente quantas cortinas uma costureira consegue produzir.
* A distribuição será definida manualmente pela equipe.
* A disponibilidade poderá ser ajustada conforme conversa com cada costureira.

### Complexidade

* Não será necessário criar uma classificação formal de complexidade.
* A complexidade poderá ser representada pela própria quantidade equivalente de produção.
* Serviços mais complexos podem ser considerados como equivalentes a duas ou mais cortinas, quando necessário.
* Essa decisão será feita manualmente.

### Planejamento

O sistema deve permitir visualizar:

* Costureira;
* Cliente;
* Produto;
* Ambiente;
* Quantidade;
* Data prevista;
* Semana de produção/entrega;
* Demandas já distribuídas;
* Demandas futuras.

### Capacidade visual

A principal necessidade é ter uma visão semanal e futura da distribuição de trabalho.

Exemplo:

> Mercês — Semana 27/07 a 01/08 — 10 cortinas
> Mercês — Semana 03/08 a 08/08 — 2 cortinas

Essa visualização deve ajudar a equipe a decidir manualmente se uma nova demanda pode ser encaminhada para determinada costureira.

### Financeiro

* O sistema deve permitir visualizar uma estimativa dos valores a pagar.
* O valor não precisa ser tratado como uma previsão absolutamente precisa.
* O pagamento é calculado com base em uma tabela previamente definida.
* A tabela é comum a todas as costureiras.
* Os valores precisam ser editáveis para permitir reajustes futuros.

### Produtos

O sistema deve permitir:

* Cadastrar os produtos existentes;
* Cadastrar novos produtos;
* Adicionar novos modelos;
* Trabalhar com produtos cobrados por metro;
* Trabalhar com produtos cobrados por peça.

### Dashboard

A principal prioridade do dashboard deve ser permitir visualizar:

* O que já foi contratado;
* O que já está distribuído;
* O que cada costureira tem programado;
* O que está previsto para as próximas semanas;
* O volume de trabalho futuro;
* Uma visão aproximada dos valores financeiros envolvidos.

---

# 18. Próximos passos

**Ananda:**
Vamos realizar os ajustes com base nesses alinhamentos para deixar a interface mais próxima da necessidade real do processo.

Os próximos passos são:

1. Revisar a estrutura da tela de capacidade;
2. Remover ou simplificar a lógica de cálculo automatizado de capacidade;
3. Simplificar a lógica de complexidade;
4. Priorizar a visualização semanal das demandas;
5. Permitir detalhamento das demandas por costureira;
6. Considerar cliente, produto, ambiente, quantidade e data;
7. Ajustar a lógica financeira;
8. Permitir alteração dos valores da tabela de pagamento;
9. Considerar produtos calculados por metro e por peça;
10. Permitir cadastro de novos produtos;
11. Ajustar o dashboard para priorizar a visualização da carga futura;
12. Aplicar os ajustes visuais relacionados à nova identidade da marca;
13. Seguir para as próximas validações do protótipo;
14. Preparar o sistema para futuras validações de usabilidade.

---

# 19. Encerramento

**Ananda:**
Vou encerrando por aqui porque temos o compromisso da Érika e precisamos finalizar.

Caso surja alguma dúvida, podemos continuar o alinhamento pelo grupo e fazer os ajustes necessários na interface para deixar a entrega o mais alinhada possível.

**Érika:**
Muito obrigada. Visualmente está maravilhoso. Está ficando muito legal.

**Ananda:**
Muito obrigado.

Felipe e Matheus, se tiverem alguma dúvida, podem mandar também no grupo para alinharmos sem tomar mais tempo de vocês.

**Érika:**
Muito obrigada. Boa tarde para vocês.

**Demais participantes:**
Boa tarde.

**Minha leitura do principal resultado da reunião:** o MVP 2 ficou **bem mais simples e pragmático**. A cliente deixou claro que o sistema **não deve tentar automatizar a decisão que hoje é humana**. O núcleo do produto passa a ser uma **agenda visual de produção/distribuição por costureira e por semana**, com o financeiro funcionando como uma camada de apoio — e não como o centro da solução.

Se quiser, eu também posso transformar essa mesma reunião em uma versão mais **executiva de ata**, com **Decisões → Requisitos → Pendências → Responsáveis → Próximos passos**, que acho que seria a melhor versão para documentar o MVP 2.
