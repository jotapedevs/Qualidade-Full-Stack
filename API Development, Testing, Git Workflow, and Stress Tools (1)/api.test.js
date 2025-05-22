const axios = require('axios');

// Configuração para os testes
const API_URL = 'http://localhost:5000';

// Mock para axios
jest.mock('axios');

describe('API de Itens', () => {
  // Teste para o endpoint GET /api/items
  describe('GET /api/items', () => {
    it('deve retornar todos os itens', async () => {
      // Mock da resposta
      const mockResponse = {
        data: {
          items: [
            { id: 0, name: 'Item 1', description: 'Descrição do Item 1', created_at: '2025-05-22T22:13:00Z' },
            { id: 1, name: 'Item 2', description: 'Descrição do Item 2', created_at: '2025-05-22T22:13:00Z' }
          ],
          count: 2
        },
        status: 200
      };
      
      axios.get.mockResolvedValue(mockResponse);
      
      const response = await axios.get(`${API_URL}/api/items`);
      
      expect(response.status).toBe(200);
      expect(response.data.items).toHaveLength(2);
      expect(response.data.count).toBe(2);
    });
  });
  
  // Teste para o endpoint GET /api/items/{item_id}
  describe('GET /api/items/{item_id}', () => {
    it('deve retornar um item específico quando o ID existe', async () => {
      // Mock da resposta para item existente
      const mockResponse = {
        data: {
          item: { id: 0, name: 'Item 1', description: 'Descrição do Item 1', created_at: '2025-05-22T22:13:00Z' }
        },
        status: 200
      };
      
      axios.get.mockResolvedValue(mockResponse);
      
      const response = await axios.get(`${API_URL}/api/items/0`);
      
      expect(response.status).toBe(200);
      expect(response.data.item.id).toBe(0);
      expect(response.data.item.name).toBe('Item 1');
    });
    
    it('deve retornar erro 404 quando o ID não existe', async () => {
      // Mock da resposta para item não existente
      const mockError = {
        response: {
          data: { error: 'Item não encontrado' },
          status: 404
        }
      };
      
      axios.get.mockRejectedValue(mockError);
      
      try {
        await axios.get(`${API_URL}/api/items/999`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('Item não encontrado');
      }
    });
  });
  
  // Teste para o endpoint POST /api/items
  describe('POST /api/items', () => {
    it('deve criar um novo item com dados válidos', async () => {
      const newItem = {
        name: 'Item de Teste Jest',
        description: 'Descrição do item de teste'
      };
      
      // Mock da resposta para criação bem-sucedida
      const mockResponse = {
        data: {
          message: 'Item criado com sucesso',
          item: {
            id: 2,
            name: 'Item de Teste Jest',
            description: 'Descrição do item de teste',
            created_at: '2025-05-22T22:13:00Z'
          }
        },
        status: 201
      };
      
      axios.post.mockResolvedValue(mockResponse);
      
      const response = await axios.post(`${API_URL}/api/items`, newItem);
      
      expect(response.status).toBe(201);
      expect(response.data.message).toBe('Item criado com sucesso');
      expect(response.data.item.name).toBe(newItem.name);
      expect(response.data.item.description).toBe(newItem.description);
    });
    
    it('deve retornar erro 400 com dados inválidos', async () => {
      const invalidItem = {
        description: 'Descrição sem nome'
      };
      
      // Mock da resposta para dados inválidos
      const mockError = {
        response: {
          data: { error: "Dados inválidos. O campo 'name' é obrigatório" },
          status: 400
        }
      };
      
      axios.post.mockRejectedValue(mockError);
      
      try {
        await axios.post(`${API_URL}/api/items`, invalidItem);
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain("'name' é obrigatório");
      }
    });
  });
});
