import { useState, useEffect } from 'react';
import { getItems, createItem, Item } from '../lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Loader2 } from 'lucide-react';

export function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  // Carregar itens ao montar o componente
  useEffect(() => {
    fetchItems();
  }, []);

  // Função para buscar itens da API
  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data.items);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar itens. Verifique se a API está em execução.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a criação de um novo item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name.trim()) {
      setError('O nome do item é obrigatório');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const result = await createItem({
        name: newItem.name,
        description: newItem.description
      });
      
      // Adicionar o novo item à lista
      setItems(prevItems => [...prevItems, result.item]);
      
      // Limpar o formulário
      setNewItem({ name: '', description: '' });
    } catch (err) {
      setError('Falha ao criar item. Verifique se a API está em execução.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Itens</CardTitle>
          <CardDescription>Visualize todos os itens cadastrados na API</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-600">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum item encontrado. Adicione um novo item abaixo.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data de Criação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleString('pt-BR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={fetchItems} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Atualizar Lista
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Item</CardTitle>
          <CardDescription>Preencha o formulário para criar um novo item</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Digite o nome do item"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Digite a descrição do item (opcional)"
                rows={3}
              />
            </div>
            
            {error && (
              <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <Button type="submit" disabled={submitting || !newItem.name.trim()}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Criar Item
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
