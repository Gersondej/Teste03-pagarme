var pagarme = require('pagarme');
var express = require('express');
var JSONFormatter = require('json-format');
var config = require('../../config/pagarme.json');
const router = express.Router();

router.get('/', function (req, res, next) {
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => {
            
            return client.plans.all()
        })
        .then(plans => plans.map(element => {
            return{
                'id':element.id,
                'name':element.name,
                'amount':(element.amount/100).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' }),
        }
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(plans => res.render('planos',{
            plans: plans
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado', {
            back_url: '/planos/',
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
        .then(client => client.plans.create({
            //Nome do plano
            'name': form_data.name,
            //Prazo, em dias, para cobrança das parcelas
            'days': form_data.days,
            //Valor que será cobrado recorrentemente (em centavos)
            'amount': form_data.amount 
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(plans => res.render('resultado',{
            back_url: '/planos/',
            json_result: JSONFormatter(plans, {
                type: 'space',
                size: 2
            })
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.render('resultado',{
            back_url: '/planos/',
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});

router.put('/:planId', function (req, res, next) {
   
    var form_data = req.body;
    // Cria uma conexão com o Pagar.me 
    pagarme.client.connect({
            api_key: config.api_key
        })
        // Usa a conexão com o Pagar.me para criar uma transação
        .then(client => client.plans.update({
            //Id do plano a ser editado
            'id':planId,
            //Nome do plano
            'name': form_data.name,
        }))
        // Vamos fazer o render de uma página com o JSON retornado pela API 
        .then(plan => res.json({
            json_result: JSONFormatter(plan, {
                type: 'space',
                size: 2
            })
        }))
        // Se houve algum erro, vamos enviar o resultado do erro
        .catch(error => res.json({
            json_result: JSONFormatter(error, {
                type: 'space',
                size: 2
            })
        }));
});

module.exports = app => app.use('/planos', router);