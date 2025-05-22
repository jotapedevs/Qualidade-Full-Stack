package com.api.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;

/**
 * Testes JUnit para a API de Itens
 * Nota: Estes testes assumem que a API está rodando em localhost:5000
 */
public class ApiTest {
    
    private HttpClient client;
    private final String BASE_URL = "http://localhost:5000";
    
    @BeforeEach
    public void setup() {
        client = HttpClient.newHttpClient();
    }
    
    @Test
    @DisplayName("Teste para obter todos os itens")
    public void testGetItems() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/items"))
                .GET()
                .build();
        
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        
        assertEquals(200, response.statusCode());
        assertTrue(response.body().contains("items"));
        assertTrue(response.body().contains("count"));
    }
    
    @Test
    @DisplayName("Teste para obter um item específico")
    public void testGetItemById() throws IOException, InterruptedException {
        // Teste para um item que deve existir (ID 0)
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/items/0"))
                .GET()
                .build();
        
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        
        assertEquals(200, response.statusCode());
        assertTrue(response.body().contains("item"));
        
        // Teste para um item que não deve existir
        request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/items/999"))
                .GET()
                .build();
        
        response = client.send(request, BodyHandlers.ofString());
        
        assertEquals(404, response.statusCode());
        assertTrue(response.body().contains("error"));
    }
    
    @Test
    @DisplayName("Teste para criar um novo item")
    public void testCreateItem() throws IOException, InterruptedException {
        // Teste com dados válidos
        String validJson = "{\"name\":\"Item de Teste JUnit\",\"description\":\"Descrição do item de teste\"}";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/items"))
                .header("Content-Type", "application/json")
                .POST(BodyPublishers.ofString(validJson))
                .build();
        
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        
        assertEquals(201, response.statusCode());
        assertTrue(response.body().contains("message"));
        assertTrue(response.body().contains("Item de Teste JUnit"));
        
        // Teste com dados inválidos (sem o campo obrigatório 'name')
        String invalidJson = "{\"description\":\"Descrição sem nome\"}";
        
        request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/items"))
                .header("Content-Type", "application/json")
                .POST(BodyPublishers.ofString(invalidJson))
                .build();
        
        response = client.send(request, BodyHandlers.ofString());
        
        assertEquals(400, response.statusCode());
        assertTrue(response.body().contains("error"));
    }
}
