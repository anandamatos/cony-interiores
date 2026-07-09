from __future__ import annotations

import logging
import time
from decimal import Decimal, InvalidOperation

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

business_logger = logging.getLogger('financial_api')


@api_view(['GET'])
@permission_classes([AllowAny])
def financial_health(request):
    return Response({'service': 'financial-api', 'status': 'ok'})


@api_view(['POST'])
@permission_classes([AllowAny])
def simulate_payment(request):
    payload = request.data or {}

    try:
        amount = Decimal(str(payload.get('amount', '0')))
        fee_rate = Decimal(str(payload.get('fee_rate', '0.025')))
        simulate_delay_ms = int(request.query_params.get('simulate_delay_ms', '0'))
    except (InvalidOperation, TypeError, ValueError):
        return Response(
            {'detail': 'Campos invalidos. Use amount numerico e fee_rate numerico opcional.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if amount <= 0:
        return Response({'detail': 'amount deve ser maior que zero.'}, status=status.HTTP_400_BAD_REQUEST)

    if fee_rate < 0:
        return Response({'detail': 'fee_rate nao pode ser negativo.'}, status=status.HTTP_400_BAD_REQUEST)

    if simulate_delay_ms > 0:
        # Allows reproducible load/performance tests in lower environments.
        time.sleep(simulate_delay_ms / 1000)

    fee_amount = (amount * fee_rate).quantize(Decimal('0.01'))
    net_amount = (amount - fee_amount).quantize(Decimal('0.01'))

    result = {
        'amount': str(amount.quantize(Decimal('0.01'))),
        'fee_rate': str(fee_rate),
        'fee_amount': str(fee_amount),
        'net_amount': str(net_amount),
        'currency': payload.get('currency', 'BRL'),
        'provider': payload.get('provider', 'internal-simulator'),
    }

    business_logger.info(
        'Payment simulation completed',
        extra={
            'event': 'financial_payment_simulated',
            'path': request.path,
            'method': request.method,
            'request_id': getattr(request, 'request_id', None),
            'amount': result['amount'],
            'currency': result['currency'],
            'provider': result['provider'],
        },
    )

    return Response(result)
