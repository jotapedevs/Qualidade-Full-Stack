# Documentação do Projeto API

## Visão Geral
Este projeto implementa uma API RESTful com endpoints GET e POST, testes automatizados em múltiplas linguagens, integração com Git para validação contínua de testes, e ferramentas de stress e qualidade para garantir a robustez e manutenibilidade do código.

## Estrutura do Projeto
```
projeto-api/
├── api/                      # Código-fonte da API
│   ├── app.py                # Implementação da API Flask
│   └── openapi.yaml          # Documentação OpenAPI
├── tests/                    # Testes automatizados
│   ├── pytest/               # Testes em Python usando pytest
│   ├── unittest/             # Testes em Python usando unittest
│   ├── junit/                # Testes em Java usando JUnit
│   └── jest/                 # Testes em JavaScript usando Jest
├── git-workflow/             # Configurações de workflow Git
│   └── .github/workflows/    # Configurações do GitHub Actions
├── quality/                  # Ferramentas de qualidade e stress
│   ├── jmeter/               # Testes de stress com JMeter
│   └── sonarqube/            # Análise de qualidade com SonarQube
└── todo.md                   # Lista de tarefas do projeto
```

## API
A API foi implementada usando Flask e oferece os seguintes endpoints:

- `GET /api/items`: Retorna todos os itens cadastrados
- `GET /api/items/{item_id}`: Retorna um item específico pelo ID
- `POST /api/items`: Cria um novo item

A documentação completa da API está disponível no arquivo `api/openapi.yaml`.

## Testes Automatizados
O projeto inclui testes automatizados em quatro frameworks diferentes:

1. **pytest (Python)**: Testes para validar os endpoints da API
2. **unittest (Python)**: Testes alternativos em Python usando a biblioteca padrão
3. **JUnit (Java)**: Testes em Java para validar a API externamente
4. **Jest (JavaScript)**: Testes em JavaScript para validar a API externamente

## Integração Contínua
O projeto está configurado com um workflow de integração contínua usando GitHub Actions, que executa automaticamente todos os testes quando há um push ou pull request para as branches principais.

O arquivo de configuração está em `git-workflow/.github/workflows/api-tests.yml`.

## Testes de Stress
Os testes de stress são realizados usando JMeter, com um plano de teste que simula 100 usuários acessando a API simultaneamente, com um tempo de rampa de 10 segundos e 10 iterações por usuário.

O plano de teste está disponível em `quality/jmeter/api-test-plan.jmx`.

## Análise de Qualidade
A análise de qualidade do código é realizada usando SonarQube, com configurações para analisar código Python, Java e JavaScript.

As configurações estão disponíveis em `quality/sonarqube/sonar-project.properties`.

## Como Executar

### API
```bash
cd api
python app.py
```

### Testes
#### pytest
```bash
cd tests/pytest
python -m pytest test_api.py -v
```

#### unittest
```bash
cd tests/unittest
python -m unittest test_api.py
```

#### JUnit
```bash
cd tests/junit
javac -cp .:lib/* ApiTest.java
java -cp .:lib/* org.junit.platform.console.ConsoleLauncher --select-class=ApiTest
```

#### Jest
```bash
cd tests/jest
npm install
npx jest api.test.js
```

### Testes de Stress (JMeter)
1. Instale o Apache JMeter
2. Abra o JMeter
3. Carregue o arquivo `quality/jmeter/api-test-plan.jmx`
4. Certifique-se de que a API está em execução
5. Execute o plano de teste

### Análise de Qualidade (SonarQube)
```bash
cd quality/sonarqube
chmod +x run-sonar-analysis.sh
./run-sonar-analysis.sh
```

## Conclusão
Este projeto demonstra a implementação de uma API completa com testes automatizados em múltiplas linguagens, integração contínua, testes de stress e análise de qualidade. Todas as funcionalidades foram implementadas conforme solicitado e estão prontas para uso.
