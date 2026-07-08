from django.test import TestCase
from django.contrib.auth import get_user_model


class UsersApiTests(TestCase):
	def setUp(self):
		self.user_password = 'S3nh@Segura123'
		self.user = get_user_model().objects.create_user(
			username='usuario_teste',
			email='usuario@example.com',
			password=self.user_password,
		)

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

	def test_protected_me_endpoint_requires_authentication(self):
		response = self.client.get('/api/auth/me/')

		self.assertEqual(response.status_code, 401)

	def test_jwt_token_obtain_and_access_protected_endpoint(self):
		login_response = self.client.post(
			'/api/auth/token/',
			{'username': self.user.username, 'password': self.user_password},
			content_type='application/json',
		)

		self.assertEqual(login_response.status_code, 200)
		self.assertIn('access', login_response.json())
		self.assertIn('refresh', login_response.json())

		access_token = login_response.json()['access']
		me_response = self.client.get(
			'/api/auth/me/',
			HTTP_AUTHORIZATION=f'Bearer {access_token}',
		)

		self.assertEqual(me_response.status_code, 200)
		self.assertEqual(me_response.json()['username'], self.user.username)

	def test_refresh_token_returns_new_access_token(self):
		login_response = self.client.post(
			'/api/auth/token/',
			{'username': self.user.username, 'password': self.user_password},
			content_type='application/json',
		)

		refresh_token = login_response.json()['refresh']
		refresh_response = self.client.post(
			'/api/auth/token/refresh/',
			{'refresh': refresh_token},
			content_type='application/json',
		)

		self.assertEqual(refresh_response.status_code, 200)
		self.assertIn('access', refresh_response.json())
