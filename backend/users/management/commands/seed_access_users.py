from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Cria ou atualiza usuarios de acesso para o front."

    def handle(self, *args, **options):
        User = get_user_model()

        access_users = [
            {
                "username": "ananda",
                "first_name": "Ananda",
                "last_name": "Matos",
                "password": "Ananda@2026",
                "is_staff": False,
            },
            {
                "username": "erika",
                "first_name": "Erika",
                "last_name": "Matos",
                "password": "Erika@2026",
                "is_staff": True,
            },
        ]

        for payload in access_users:
            user, created = User.objects.get_or_create(
                username=payload["username"],
                defaults={
                    "first_name": payload["first_name"],
                    "last_name": payload["last_name"],
                    "is_staff": payload["is_staff"],
                    "is_active": True,
                },
            )

            user.first_name = payload["first_name"]
            user.last_name = payload["last_name"]
            user.is_staff = payload["is_staff"]
            user.is_active = True
            user.set_password(payload["password"])
            user.save(update_fields=["first_name", "last_name", "is_staff", "is_active", "password"])

            action = "Criado" if created else "Atualizado"
            self.stdout.write(
                self.style.SUCCESS(
                    f"{action}: {payload['username']} ({payload['first_name']})"
                )
            )

        self.stdout.write(self.style.SUCCESS("Usuarios de acesso prontos."))
