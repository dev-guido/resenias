# Generated by Django 4.1.5 on 2023-01-06 22:21

from django.db import migrations, models
import django.db.models.deletion
import resenias.field_validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Carrera',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Catedra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('turno_maniana', models.BooleanField(help_text='Se imparte en el turno mañana.', verbose_name='turno mañana')),
                ('turno_tarde', models.BooleanField(help_text='Se imparte en el turno tarde.')),
                ('turno_noche', models.BooleanField(help_text='Se imparte en el turno noche.')),
            ],
        ),
        migrations.CreateModel(
            name='Resenia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calificacion', models.PositiveIntegerField(blank=True, choices=[(0, 'Bajo nivel'), (100000, 'Nivel'), (200000, 'Sobre nivel')], null=True, verbose_name='calificación')),
                ('contenido', models.TextField(help_text='Escriba su reseña en este campo.')),
                ('anio', models.PositiveIntegerField(validators=[resenias.field_validators.validar_anio], verbose_name='año de cursada')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('catedra', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='resenias', related_query_name='resenia', to='resenias.catedra')),
            ],
            options={
                'verbose_name': 'reseña',
            },
        ),
        migrations.CreateModel(
            name='Materia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('carrera', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='materias', related_query_name='materia', to='resenias.carrera')),
            ],
        ),
        migrations.AddField(
            model_name='catedra',
            name='materia',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='catedras', related_query_name='catedra', to='resenias.materia'),
        ),
    ]
