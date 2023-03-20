from rest_framework.test import APITestCase, APIClient

from .models import User


class UserQRCodeTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_user_with_valid_data(self):
        response = self.client.post(
            '/users/',
            {
                'name': 'Jon Doe',
                'email': 'user@email.com',
                'about': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'github_url': 'https://github.com/user',
                'linkedin_url': 'https://www.linkedin.com/in/user',
            },
            format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['name'], 'Jon Doe')
        self.assertEqual(response.data['email'], 'user@email.com')

    def test_create_user_without_required_fields(self):
        response = self.client.post(
            '/users/',
            {
                'name': 'Jon Doe',
                'email': '',
                'about': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'github_url': '',
                'linkedin_url': '',
            },
            format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 0)

    def test_create_user_with_already_existing_email(self):
        self.client.post(
            '/users/',
            {
                'name': 'Jon Doe',
                'email': 'user@email.com',
                'about': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'github_url': 'https://github.com/user',
                'linkedin_url': 'https://www.linkedin.com/in/user',
            },
            format='json'
        )
        response = self.client.post(
            '/users/',
            {
                'name': 'Jon Doe',
                'email': 'user@email.com',
                'about': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'github_url': 'https://github.com/user',
                'linkedin_url': 'https://www.linkedin.com/in/user',
            },
            format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(User.objects.count(), 1)

    def test_retrieve_existing_user(self):
        user = User.objects.create(name='Jon Doe', email='user@email.com', about='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                   github_url='https://github.com/user', linkedin_url='https://linkedin.com/in/user')
        response = self.client.get(f'/users/{user.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Jon Doe')
        self.assertEqual(response.data['email'], 'user@email.com')

    def test_retrieve_non_existing_user(self):
        response = self.client.get('/users/1/')
        self.assertEqual(response.status_code, 404)
