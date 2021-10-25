API FINDER UP

## Visão Geral
Este repositório foi criado com o objetivo de cumprir com os objetivos propostos pelo [teste da finderup]:

    Uma api que seja possivel controlar o estoque de produtos e uso dos mesmos, permitindo a visão de um histórico de transações

## Instalação
A versão do nodejs utilizada foi a `14.17.0`.
Link do site para download do node: https://nodejs.org/en/n
Após a instalação recomendo reiniciar a máquina, para garantir a instalação utilize os comando node --version e npm --version
Para instalar os pacotes utilize npm install <nome-do-pacote>


# Documentação da api
É possivel encontrar a documentação da API utizando o `/doc`, foi utilizado o swagger, para atualização dela utilize o comando npm run swagger-autogen  

# Versões 
"body-parser": "^1.19.0",
"express": "^4.17.1",
"mongoose": "^6.0.11",
"morgan": "^1.10.0",
"mysql": "^2.18.1",
"node-datetime": "^2.1.2",
"nodemon": "^2.0.13",
"swagger-autogen": "^2.11.2",
"swagger-ui-express": "^4.1.6",
"underscore": "^1.13.1"

# Execução 
Para subir o serve utilize o comando npm start

# Banco de dados
Foi utilizado o MySQL, deixei disponivel uma imagem com a estrutura das tabelas e um script com os comandos para criação das mesmas
OBS: É necessário configurar o arquivo mysql.js para torna-lo compativel com seu banco de dados

# Explicação dos arquivos
## config funcroutes.js
Aqui estão os endpoint relacionados a tabela funcionario
## config prodroutes.js
Aqui estão os endpoint relacionados a tabela produto
## config transroutes.js
Aqui estão os endpoint relacionados a tabela transacoes
## config mysql.js
Aqui está as configurações para realizar a conexão no banco de dados, não utilizei variaveis de ambiente
## index.js
Arquivo principal do server

# Testes
Para realização de testes, utilizei o Postman
