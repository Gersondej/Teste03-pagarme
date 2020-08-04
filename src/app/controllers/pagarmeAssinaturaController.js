var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require('../../config/pagarme.json');
const router = express.Router();
var important_values = [];


router.get('/', function (req, res, next) {
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => {
            // client.plans.find({id:'495824'}).then(console.log())
            return client.subscriptions.all()
        })
        .then(subscriptions => subscriptions.map(element => {
            return{
                'id':element.id,
                'plan_id':element.plan.id,
                'plan_name':element.plan.name,
                'plan_amount':(element.plan.amount/100).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' }),
                'status':element.status,
                'payment_method':element.payment_method,
                'customer_name':element.customer.name,
                'link':element.manage_url
        }
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(subscriptions => res.render('assinaturas',{
            subscriptions: subscriptions
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/assinaturas/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }))
});


router.post('/', function (req, res, next) {
    var form_data = req.body;
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.subscriptions.create({
            "plan_id": form_data.plan_id,
            "card_number": form_data.card_number,
            "card_cvv": form_data.card_cvv,
            "card_holder_name": form_data.card_holder_name,
            "card_expiration_date": form_data.card_expiration_date,
            "customer": {
                "email": form_data.customer.email,
                "name": form_data.customer.name,
                "document_number": form_data.customer.document_number
            }
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(subscriptions => res.render('resultado',{
            back_url: '/assinaturas/',
            json_result: JSONFormatter(subscriptions, {
                type: 'space',
                size: 2
            })
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado',{
            back_url: '/assinaturas/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});

module.exports = app => app.use('/assinaturas', router);