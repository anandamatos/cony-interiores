from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0009_grupoproduto_produto_grupo"),
    ]

    operations = [
        migrations.AddField(
            model_name="grupoproduto",
            name="desconto_percentual",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
        migrations.AddField(
            model_name="grupoproduto",
            name="tipo",
            field=models.CharField(
                choices=[("TECNICO", "Técnico"), ("COMERCIAL", "Comercial")],
                default="TECNICO",
                max_length=12,
            ),
        ),
    ]
