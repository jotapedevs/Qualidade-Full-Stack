// Configuração para permitir CORS na API
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

# Simulação de banco de dados com uma lista de itens
items = []

@app.route('/api/items', methods=['GET'])
def get_items():
    """
    Endpoint GET para retornar todos os itens
    """
    return jsonify({"items": items, "count": len(items)})

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    """
    Endpoint GET para retornar um item específico pelo ID
    """
    if 0 <= item_id < len(items):
        return jsonify({"item": items[item_id]})
    return jsonify({"error": "Item não encontrado"}), 404

@app.route('/api/items', methods=['POST'])
def create_item():
    """
    Endpoint POST para criar um novo item
    """
    data = request.get_json()
    
    if not data or 'name' not in data:
        return jsonify({"error": "Dados inválidos. O campo 'name' é obrigatório"}), 400
    
    new_item = {
        "id": len(items),
        "name": data['name'],
        "description": data.get('description', ''),
        "created_at": "2025-05-22T22:13:00Z"  # Em produção, usar datetime.now().isoformat()
    }
    
    items.append(new_item)
    return jsonify({"message": "Item criado com sucesso", "item": new_item}), 201

if __name__ == '__main__':
    # Adicionar alguns itens de exemplo
    items.append({"id": 0, "name": "Item 1", "description": "Descrição do Item 1", "created_at": "2025-05-22T22:13:00Z"})
    items.append({"id": 1, "name": "Item 2", "description": "Descrição do Item 2", "created_at": "2025-05-22T22:13:00Z"})
    
    # Iniciar o servidor Flask
    app.run(host='0.0.0.0', port=5000, debug=True)
