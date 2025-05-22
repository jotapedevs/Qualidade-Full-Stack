// API client para comunicação com o backend

// Definição dos tipos de dados
export interface Item {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

// URL base da API
const API_URL = 'http://localhost:5000';

// Função para obter todos os itens
export async function getItems(): Promise<{ items: Item[], count: number }> {
  try {
    const response = await fetch(`${API_URL}/api/items`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar itens: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Falha ao buscar itens:', error);
    throw error;
  }
}

// Função para obter um item específico pelo ID
export async function getItemById(id: number): Promise<{ item: Item }> {
  try {
    const response = await fetch(`${API_URL}/api/items/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar item ${id}: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Falha ao buscar item ${id}:`, error);
    throw error;
  }
}

// Função para criar um novo item
export async function createItem(item: { name: string, description?: string }): Promise<{ message: string, item: Item }> {
  try {
    const response = await fetch(`${API_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao criar item: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Falha ao criar item:', error);
    throw error;
  }
}
