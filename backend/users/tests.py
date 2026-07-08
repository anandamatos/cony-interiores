from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient


class UsersApiTests(TestCase):
    def test_home_endpoint_returns_expected_message(self):
        response = self.client.get('/api/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {'message': 'Bem-vindo ao backend Cony Interiores!'},
        )

    def test_hello_endpoint_returns_expected_message(self):
        response = self.client.get('/api/hello/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {'message': 'Hello Cony Interiores!'},
        )


class JWTAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123',
            email='test@example.com',
        )

    def test_obtain_token_with_valid_credentials(self):
        response = self.client.post(
            '/api/auth/token/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_obtain_token_with_invalid_credentials(self):
        response = self.client.post(
            '/api/auth/token/',
            {'username': 'testuser', 'password': 'wrongpassword'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_token(self):
        token_response = self.client.post(
            '/api/auth/token/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        refresh_token = token_response.data['refresh']
        response = self.client.post(
            '/api/auth/token/refresh/',
            {'refresh': refresh_token},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_protected_endpoint_without_token(self):
        response = self.client.get('/api/protected/')
        self.assertIn(
            response.status_code,
            [status.HTTP_401_UNAUTHORIZED, status.HTTP_404_NOT_FOUND],
        )

    def test_public_endpoint_hello_accessible_without_token(self):
        response = self.client.get('/api/hello/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_public_endpoint_home_accessible_without_token(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_blacklists_refresh_token(self):
        token_response = self.client.post(
            '/api/auth/token/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        refresh_token = token_response.data['refresh']
        access_token = token_response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)
        logout_response = self.client.post(
            '/api/auth/token/logout/',
            {'refresh': refresh_token},
            format='json',
        )
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        refresh_response = self.client.post(
            '/api/auth/token/refresh/',
            {'refresh': refresh_token},
            format='json',
        )
        self.assertEqual(refresh_response.status_code, status.HTTP_401_UNAUTHORIZED)
