from django.test import TestCase


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
