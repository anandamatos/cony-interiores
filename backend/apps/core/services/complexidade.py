"""
TASK-M1-CORE-012: Índice de complexidade.

Define os tamanhos, tipos de produto e a matriz que diz quanto tempo
(em dias) uma peça leva pra ser feita, de acordo com tipo x tamanho.

Esse módulo NÃO sabe nada sobre "pedido" nem sobre "carga" — só sabe
responder: "uma peça desse tipo, desse tamanho, demora quantos dias?"
"""


class Tamanho:
    PEQUENA = "P"
    MEDIA = "M"
    GRANDE = "G"
    ESPECIAL = "ESP"  # pé direito duplo

    CHOICES = [
        (PEQUENA, "Pequena"),
        (MEDIA, "Média"),
        (GRANDE, "Grande"),
        (ESPECIAL, "Especial / Pé direito duplo"),
    ]


class TipoProduto:
    ILHO = "ILHO"
    PREGA_MACHO = "PREGA_MACHO"
    FORRO = "FORRO"
    BLACKOUT = "BLACKOUT"
    ALMOFADA = "ALMOFADA"

    CHOICES = [
        (ILHO, "Cortina de Ilhó"),
        (PREGA_MACHO, "Cortina de Prega Macho"),
        (FORRO, "Forro"),
        (BLACKOUT, "Blackout"),
        (ALMOFADA, "Almofada"),
    ]


# Matriz tipo_produto x tamanho -> tempo estimado em dias (escala fibo).
# AJUSTEM ESSES NÚMEROS com a experiência real das costureiras.
MATRIZ_COMPLEXIDADE = {
    TipoProduto.ILHO: {
        Tamanho.PEQUENA: 1,
        Tamanho.MEDIA: 2,
        Tamanho.GRANDE: 3,
        Tamanho.ESPECIAL: 5,
    },
    TipoProduto.PREGA_MACHO: {
        Tamanho.PEQUENA: 2,
        Tamanho.MEDIA: 3,
        Tamanho.GRANDE: 5,
        Tamanho.ESPECIAL: 8,
    },
    TipoProduto.FORRO: {
        Tamanho.PEQUENA: 1,
        Tamanho.MEDIA: 1,
        Tamanho.GRANDE: 2,
        Tamanho.ESPECIAL: 3,
    },
    TipoProduto.BLACKOUT: {
        Tamanho.PEQUENA: 2,
        Tamanho.MEDIA: 3,
        Tamanho.GRANDE: 5,
        Tamanho.ESPECIAL: 13,
    },
    TipoProduto.ALMOFADA: {
        Tamanho.PEQUENA: 1,
        Tamanho.MEDIA: 1,
        Tamanho.GRANDE: 1,
        Tamanho.ESPECIAL: 2,
    },
}


def obter_indice_complexidade(tipo_produto: str, tamanho: str) -> int:
    """
    Retorna o tempo estimado (em dias) para produzir UMA peça,
    de acordo com o tipo de produto e o tamanho.
    """
    try:
        return MATRIZ_COMPLEXIDADE[tipo_produto][tamanho]
    except KeyError:
        raise ValueError(
            f"Combinação inválida: tipo_produto={tipo_produto!r}, "
            f"tamanho={tamanho!r}. Verifique se ambos existem na matriz."
        )
