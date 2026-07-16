# [STORY-M1-CORE-003] Implementa Calculo de Capacidade com indice de complexidade

## Contexto
Esta entrega valida e consolida o calculo de capacidade produtiva com indice de complexidade para apoiar a distribuicao de servicos entre costureiras.

## O que foi feito

### Calculo de Carga
- [x] Funcao de calculo de carga implementada
- [x] Integracao com indice de complexidade
- [x] Endpoint de consulta de carga criado

### Indice de Complexidade
- [x] Niveis P/M/G/ESP implementados na matriz de complexidade
- [ ] Pesos finais validados com gestora (pendente confirmacao de negocio)
- [x] Documentacao tecnica dos pesos no codigo

### Sugestao de Alocacao
- [x] Logica de sugestao de alocacao implementada
- [x] Considera carga atual/disponibilidade da costureira
- [x] Distribuicao por maior folga entre candidatas aptas

### Testes
- [x] Testes de calculo de carga
- [x] Testes de indice de complexidade
- [x] Testes de sugestao de alocacao

## Correcao aplicada nesta validacao
- [x] Ajuste de compatibilidade Python 3.9 em `backend/apps/core/services/bridge_alocacao.py`
  - de `dict | None` para `Optional[dict]`

## Arquivos Alterados (validacao)
- `backend/apps/core/services/capacidade.py`
- `backend/apps/core/services/complexidade.py`
- `backend/apps/core/services/alocacao.py`
- `backend/apps/core/services/bridge.py`
- `backend/apps/core/services/bridge_alocacao.py`
- `backend/apps/core/views.py`
- `backend/apps/core/urls.py`
- `backend/apps/core/tests/test_capacidade.py`
- `backend/apps/core/tests/test_complexidade.py`
- `backend/apps/core/tests/test_alocacao.py`
- `docs/4-delivery/STORY-M1-CORE-003-capacidade.md`

## Validacao
- [x] `manage.py check`: OK
- [x] Testes story (20): OK
- [x] Validacao tecnica de formula e alocacao: OK
- [ ] Validacao final com gestora dos pesos de complexidade: pendente

## Riscos e Pendencias
- Branch `feat@core/STORY-M1-CORE-003` nao encontrada local/remoto no repositorio atual.
- Necessario confirmar branch oficial da PR antes de backup, push e merge.

## Checklist de Merge
- [ ] Revisao de codigo aprovada
- [x] Testes passando
- [x] Documentacao atualizada
- [ ] Sem conflitos com a main (depende da branch oficial)

Responsavel: @karinakaduda19-cyber
Squad: Core Business
MVP: MVP 1
Epic: EPIC-M1-CORE-001
