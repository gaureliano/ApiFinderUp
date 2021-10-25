const express = require('express')
const mongoose = require('mongoose')
const transroutes = express.Router()
const mysql = require ('./mysql').pool
var dateTime = require('node-datetime');


// Rotas relacionadas a tabela de transacoes

transroutes.put('/RawMaterials', (req,res) => {
   
    
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO transacoes (id_func, id_prod, quant, data) VALUES (?,?,-?,?)',
            [req.body.id_func,req.body.id_prod,req.body.quant,date],
            (error, resultado, field) => {
                conn.release();

                if (error){
                    return res.status(500).send({
                        error:error,
                        response: null
                    });
                } 

                res.status(201).send({
                    mensagem: 'Transação realizada',
                    id_produto: resultado.insertId
                })
            }
        )
    
    });
});

transroutes.get('/transacoes/:id_func', (req,res) => {

    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            `SELECT transacoes.id_func,  
                    funcionario.name_func,
                    produto.name_produto,
                    transacoes.quant,
                    transacoes.data 
            FROM transacoes 
            INNER JOIN produto 
                ON produto.id = transacoes.id_prod
            INNER JOIN funcionario
                ON funcionario.id = transacoes.id_func
                WHERE id_func = ?;`,
            [req.params.id_func],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

module.exports = transroutes