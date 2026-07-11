from django.test import TestCase
# ----------------------------Adicoes-------------------------------
from django.db.utils import IntegrityError
from .models import Costureira

class TestCostureira(TestCase):
    def test_BlankCostureira(self):
        Costureira.objects.create(nome = "Alixw", contato = "Numero 3198888888", observacoes = "", 
            ativo = False, tipo_servico_preferido = "")
        M = Costureira.objects.get(nome ="Alixw")
        self.assertEqual(M.observacoes, "")
        
    def test_DuplicaCostureira(self):
        Costureira.objects.create(
           nome = "Alice", 
           contato = "Numero 3198888888", 
           observacoes = "ALI", 
           ativo = False, 
           tipo_servico_preferido = "Voltar")
        with self.assertRaises(IntegrityError):
         Costureira.objects.create(
            nome = "Alice", 
            contato = "Numero 318888", 
            observacoes = "AI", 
            ativo = True, 
            tipo_servico_preferido = "tar")
# Create your tests here.
def test_criar_costureira_com_dados_validos(self):
    costureira = Costureira.objects.create(
        nome="Alice", 
        contato="Numero 3198888888", 
        observacoes="ALI", 
        ativo=False, 
        tipo_servico_preferido="Voltar"
    )
    self.assertEqual(costureira.nome, "Alice")