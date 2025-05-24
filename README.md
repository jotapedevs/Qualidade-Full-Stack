# Jota Pê, conserta esse repositório!! É feio ter o nome qualidade full stack e o camarada se deparar com a presepada acima.

---

# Qualidade Full Stack

Este repositório contém um projeto completo de API com frontend, testes automatizados, integração contínua e ferramentas de qualidade/stress.

## Estrutura do Projeto

```
qualidade-full-stack/
├── api/                      # Backend da aplicação
│   ├── app.py                # API Flask original
│   ├── app_cors.py           # API Flask com suporte a CORS
│   └── openapi.yaml          # Documentação OpenAPI
├── frontend/                 # Interface web React
│   ├── src/                  # Código-fonte do frontend
│   ├── public/               # Arquivos públicos
│   └── ...                   # Arquivos de configuração React
├── tests/                    # Testes automatizados
│   ├── pytest/               # Testes em Python usando pytest
│   ├── unittest/             # Testes em Python usando unittest
│   ├── junit/                # Testes em Java usando JUnit
│   └── jest/                 # Testes em JavaScript usando Jest
├── git-workflow/             # Configurações de workflow Git
│   └── .github/workflows/    # Configurações do GitHub Actions
└── quality/                  # Ferramentas de qualidade e stress
    ├── jmeter/               # Testes de stress com JMeter
    └── sonarqube/            # Análise de qualidade com SonarQube
```

## Funcionalidades

### API (Backend)

A API foi implementada usando Flask e oferece os seguintes endpoints:

- `GET /api/items`: Retorna todos os itens cadastrados
- `GET /api/items/{item_id}`: Retorna um item específico pelo ID
- `POST /api/items`: Cria um novo item

### Frontend

O frontend foi desenvolvido com React, TypeScript e Tailwind CSS, oferecendo:

- Interface responsiva e moderna
- Formulário para adicionar novos itens
- Tabela para visualização dos itens cadastrados
- Integração completa com a API

### Testes Automatizados

O projeto inclui testes automatizados em quatro frameworks diferentes:

1. **pytest (Python)**: Testes para validar os endpoints da API
2. **unittest (Python)**: Testes alternativos em Python usando a biblioteca padrão
3. **JUnit (Java)**: Testes em Java para validar a API externamente
4. **Jest (JavaScript)**: Testes em JavaScript para validar a API externamente

### Integração Contínua

O projeto está configurado com um workflow de integração contínua usando GitHub Actions, que executa automaticamente todos os testes quando há um push ou pull request para as branches principais.

### Testes de Stress e Qualidade

- **JMeter**: Testes de stress para simular múltiplos usuários acessando a API
- **SonarQube**: Análise de qualidade do código para garantir boas práticas

## Como Executar

### API (Backend)

```bash
cd api
python app.py
```

Para executar com suporte a CORS (necessário para integração com o frontend):

```bash
cd api
python app_cors.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Para build de produção:

```bash
cd frontend
npm run build
```

### Testes

Consulte o arquivo README.md original na raiz do projeto para instruções detalhadas sobre como executar cada tipo de teste.

## Deployment

O frontend está implantado permanentemente em: https://glmoytej.manus.space/
Para funcionalidade completa, a API backend precisa estar acessível publicamente.

## Licença

Este projeto está licenciado sob a licença MIT.
