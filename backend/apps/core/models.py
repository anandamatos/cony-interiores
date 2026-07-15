# apps/core/models.py
#
# Este app (core) concentra a lógica de CÁLCULO DE CAPACIDADE.
# Ele não é dono dos models de Costureira e Serviço (que já existem em
# outro app, provavelmente `users` e algum app de serviços/pedidos).
#
# Pra esse cálculo funcionar, dois campos novos precisam ser adicionados
# nos models JÁ EXISTENTES (via migration no app onde eles moram):
#
# No model Costureira:
#     capacidade_base_semanal = models.PositiveIntegerField(default=5)
#     disponibilidade_percentual = models.PositiveIntegerField(default=100)
#
# No model Serviço (ou no model de Peça, se vocês decidirem granularizar):
#     tamanho = models.CharField(
#         max_length=3,
#         choices=Tamanho.CHOICES,  # from apps.core.services.complexidade import Tamanho
#     )
#
# Se preferirem, também dá pra fazer isso aqui no core (ex: um model
# "PedidoCapacidade" que referencia o Serviço via ForeignKey/OneToOne,
# sem precisar mexer no model já pronto). Me avisem qual caminho o time
# vai seguir que eu ajusto o restante do código.
