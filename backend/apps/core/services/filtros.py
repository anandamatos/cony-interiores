"""
TASK-M4-CORE-006: Filtros Avançados

Serviço para aplicar filtros avançados em consultas de relatórios.
"""

from django.db.models import Q
from datetime import date


def aplicar_filtros_avancados(queryset, params):
    """
    Aplica filtros avançados em um queryset de serviços
    
    Args:
        queryset: QuerySet inicial
        params: Dicionário com parâmetros de filtro
    
    Returns:
        QuerySet filtrado
    """
    # Filtro por período
    if params.get('periodo_inicio'):
        queryset = queryset.filter(data_envio__gte=params['periodo_inicio'])
    
    if params.get('periodo_fim'):
        queryset = queryset.filter(data_envio__lte=params['periodo_fim'])
    
    # Filtro por costureira
    if params.get('costureira_id'):
        queryset = queryset.filter(costureira_id=params['costureira_id'])
    
    # Filtro por cliente
    if params.get('cliente_id'):
        queryset = queryset.filter(cliente_id=params['cliente_id'])
    
    # Filtro por status
    if params.get('status'):
        queryset = queryset.filter(status=params['status'])
    
    # Filtro por tipo de serviço
    if params.get('tipo_servico'):
        queryset = queryset.filter(tipo_servico=params['tipo_servico'])
    
    # Filtro por valor
    if params.get('valor_min'):
        queryset = queryset.filter(valor__gte=params['valor_min'])
    
    if params.get('valor_max'):
        queryset = queryset.filter(valor__lte=params['valor_max'])
    
    # Filtro por busca textual
    if params.get('search'):
        search = params['search']
        queryset = queryset.filter(
            Q(cliente__nome__icontains=search) |
            Q(costureira__nome__icontains=search) |
            Q(observacoes__icontains=search)
        )
    
    return queryset


def aplicar_filtros_pagamentos(queryset, params):
    """
    Aplica filtros avançados em um queryset de pagamentos
    
    Args:
        queryset: QuerySet inicial
        params: Dicionário com parâmetros de filtro
    
    Returns:
        QuerySet filtrado
    """
    # Filtro por status
    if params.get('status'):
        queryset = queryset.filter(status=params['status'])
    
    # Filtro por período
    if params.get('data_inicio'):
        queryset = queryset.filter(data_entrega__gte=params['data_inicio'])
    
    if params.get('data_fim'):
        queryset = queryset.filter(data_entrega__lte=params['data_fim'])
    
    # Filtro por costureira (via serviço)
    if params.get('costureira_id'):
        queryset = queryset.filter(servico__costureira_id=params['costureira_id'])
    
    # Filtro por valor
    if params.get('valor_min'):
        queryset = queryset.filter(valor__gte=params['valor_min'])
    
    if params.get('valor_max'):
        queryset = queryset.filter(valor__lte=params['valor_max'])
    
    return queryset


def validar_filtros(params, allowed_filters):
    """
    Valida se os filtros informados são permitidos
    
    Args:
        params: Dicionário com parâmetros de filtro
        allowed_filters: Lista de filtros permitidos
    
    Returns:
        tuple: (is_valid, errors)
    """
    errors = []
    
    for key, value in params.items():
        if key not in allowed_filters:
            errors.append(f"Filtro '{key}' não é suportado")
        
        if value is None or value == '':
            errors.append(f"Filtro '{key}' não pode estar vazio")
    
    return len(errors) == 0, errors