#!/bin/bash

# Script para executar o SonarQube Scanner

# Verifica se o SonarQube Scanner está instalado
if ! command -v sonar-scanner &> /dev/null; then
    echo "SonarQube Scanner não encontrado. Instalando..."
    
    # Cria diretório temporário para download
    mkdir -p /tmp/sonarqube
    cd /tmp/sonarqube
    
    # Baixa o SonarQube Scanner
    wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
    
    # Descompacta
    unzip sonar-scanner-cli-4.8.0.2856-linux.zip
    
    # Move para /opt
    sudo mv sonar-scanner-4.8.0.2856-linux /opt/sonar-scanner
    
    # Adiciona ao PATH
    echo 'export PATH=$PATH:/opt/sonar-scanner/bin' >> ~/.bashrc
    export PATH=$PATH:/opt/sonar-scanner/bin
    
    echo "SonarQube Scanner instalado com sucesso!"
else
    echo "SonarQube Scanner já está instalado."
fi

# Executa o SonarQube Scanner
echo "Executando análise de qualidade com SonarQube..."

# Navega até o diretório raiz do projeto
cd $(dirname "$0")/../../

# Executa o scanner
# Nota: Em um ambiente real, você precisaria de um servidor SonarQube em execução
# Este comando é apenas para demonstração
sonar-scanner \
  -Dsonar.projectKey=projeto-api \
  -Dsonar.projectName="Projeto API" \
  -Dsonar.projectVersion=1.0 \
  -Dsonar.sources=api \
  -Dsonar.tests=tests \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=admin \
  -Dsonar.password=admin

echo "Análise de qualidade concluída!"
