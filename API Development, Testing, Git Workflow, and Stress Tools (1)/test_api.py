import pytest
import json
import sys
import os

# Adicionar o diretório da API ao path para importação
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../api')))

from app import app

@pytest.fixture
def client():
    """Configura o cliente de teste Flask"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_items(client):
    """Testa o endpoint GET /api/items"""
    response = client.get('/api/items')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'items' in data
    assert 'count' in data
    assert isinstance(data['items'], list)
    assert data['count'] == len(data['items'])

def test_get_item_by_id(client):
    """Testa o endpoint GET /api/items/{item_id}"""
    # Primeiro, verifica um item que deve existir (ID 0)
    response = client.get('/api/items/0')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'item' in data
    assert data['item']['id'] == 0
    
    # Depois, verifica um item que não deve existir
    response = client.get('/api/items/999')
    assert response.status_code == 404
    data = json.loads(response.data)
    assert 'error' in data

def test_create_item(client):
    """Testa o endpoint POST /api/items"""
    # Testa criação de item com dados válidos
    response = client.post(
        '/api/items',
        data=json.dumps({'name': 'Item de Teste', 'description': 'Descrição do item de teste'}),
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert 'message' in data
    assert 'item' in data
    assert data['item']['name'] == 'Item de Teste'
    
    # Testa criação de item com dados inválidos (sem o campo obrigatório 'name')
    response = client.post(
        '/api/items',
        data=json.dumps({'description': 'Descrição sem nome'}),
        content_type='application/json'
    )
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data
