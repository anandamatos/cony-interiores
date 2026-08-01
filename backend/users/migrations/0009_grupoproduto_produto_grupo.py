from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_merge_20260731_2057'),
    ]

    operations = [
        migrations.CreateModel(
            name='GrupoProduto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=40, unique=True)),
                ('nome', models.CharField(max_length=120)),
                ('descricao', models.TextField(blank=True)),
                ('ativo', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['nome'],
            },
        ),
        migrations.AddField(
            model_name='produto',
            name='grupo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='produtos', to='users.grupoproduto'),
        ),
    ]
