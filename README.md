# pagarme-api

### Para rodar:

1) Clone a aplicação: `git clone https://github.com/rodrigodmpa/pagarme-api`
2) Faça `npm install` no diretorio raiz
3) Inicie com `node src/index.js`

A aplicação era rodar na porta 3000.

Os endpoint são:


* Visualizar planos existentes: GET `http://localhost:3000/planos`
* Criar um novo plano: POST `http://localhost:3000/plano`
Corpo necessário: 
    ```{
        "name": "Nome do plano",
        "days": Prazo, em dias, para cobrança das parcelas,
        "amount": Valor que será cobrado recorrentemente (em centavos)
    }```
* Visualizar assinaturas: GET `http://localhost:3000/assinaturas`
* Criar nova assinatura assinaturas (Necessita de um plano criado): POST `http://localhost:3000/assinaturas`
Corpo necessário: 
    ```{
        "plan_id": Id de um plano existente,
        "card_number": Nrm do cartao,
        "card_cvv": cvv do cartao,
        "card_holder_name": "Nome impresso no cartao",
        "card_expiration_date": data de venc. do cartao (ex. 1222),
        "customer": {
            "email": "email do cliente",
            "name": "nome do cliente",
            "document_number": documento do cliente
        }
    }```


