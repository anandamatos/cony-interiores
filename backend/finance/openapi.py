from __future__ import annotations


def build_openapi_schema() -> dict:
    return {
        'openapi': '3.0.3',
        'info': {
            'title': 'Cony Interiores Financial API',
            'version': '1.0.0',
            'description': (
                'Documentacao OpenAPI para endpoints financeiros e monitoramento interno. '
                'Use JWT Bearer para endpoints protegidos.'
            ),
        },
        'servers': [
            {'url': '/', 'description': 'Default server'},
        ],
        'components': {
            'securitySchemes': {
                'BearerAuth': {
                    'type': 'http',
                    'scheme': 'bearer',
                    'bearerFormat': 'JWT',
                }
            }
        },
        'paths': {
            '/api/financial/health/': {
                'get': {
                    'tags': ['Financial'],
                    'summary': 'Healthcheck da API financeira',
                    'responses': {
                        '200': {
                            'description': 'API financeira operacional',
                            'content': {
                                'application/json': {
                                    'schema': {
                                        'type': 'object',
                                        'properties': {
                                            'service': {'type': 'string'},
                                            'status': {'type': 'string'},
                                        },
                                    }
                                }
                            },
                        }
                    },
                }
            },
            '/api/financial/payments/simulate/': {
                'post': {
                    'tags': ['Financial'],
                    'summary': 'Simula processamento de pagamento',
                    'security': [{'BearerAuth': []}],
                    'description': (
                        'Aceita amount e fee_rate. Opcionalmente, use query param '
                        'simulate_delay_ms para testes de carga e latencia.'
                    ),
                    'requestBody': {
                        'required': True,
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'object',
                                    'required': ['amount'],
                                    'properties': {
                                        'amount': {'type': 'number', 'example': 124.9},
                                        'fee_rate': {'type': 'number', 'example': 0.025},
                                        'currency': {'type': 'string', 'example': 'BRL'},
                                        'provider': {'type': 'string', 'example': 'stripe'},
                                    },
                                }
                            }
                        },
                    },
                    'responses': {
                        '200': {
                            'description': 'Simulacao concluida',
                        },
                        '400': {'description': 'Payload invalido'},
                        '401': {'description': 'Nao autenticado'},
                    },
                }
            },
            '/api/internal/monitoring/dashboard/': {
                'get': {
                    'tags': ['Monitoring'],
                    'summary': 'Dashboard interno de monitoramento',
                    'security': [{'BearerAuth': []}],
                    'responses': {
                        '200': {'description': 'Resumo de metricas operacionais'},
                        '401': {'description': 'Nao autenticado'},
                    },
                }
            },
            '/api/docs/openapi.json': {
                'get': {
                    'tags': ['Docs'],
                    'summary': 'Schema OpenAPI em JSON',
                    'responses': {'200': {'description': 'Schema OpenAPI'}},
                }
            },
            '/api/docs/swagger/': {
                'get': {
                    'tags': ['Docs'],
                    'summary': 'Swagger UI',
                    'responses': {'200': {'description': 'Interface Swagger'}},
                }
            },
        },
    }
