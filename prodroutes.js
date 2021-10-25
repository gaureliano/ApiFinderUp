const express = require('express')
const mongoose = require('mongoose')
const prodroutes = express.Router()
const mysql = require ('./mysql').pool
var dateTime = require('node-datetime')


// Rotas relacionadas a tabela de produtos

prodroutes.get('/produtos', (req,res) => {

    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            `SELECT * FROM produto;`,
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

prodroutes.get('/produtos/:id_produto', (req,res) => {

    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM produto WHERE id = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

prodroutes.post('/cadastroProd', (req,res) => {
    
    

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO produto (name_produto, quant) VALUES (?,?)',
            [req.body.name,0],
            (error, resultado, field) => {
                conn.release();
                if (error){
                    return res.status(500).send({
                        error:error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem: 'Produto Inserido com sucesso',
                    id_produto: resultado.insertId
                })
            }
        )          
    });

});

prodroutes.patch('/adicionarProd', (req,res) => {
    
    var dt = dateTime.create();
    var date = dt.format('Y-m-d H:M:S');
    

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE produto
                SET quant = quant + ?
            WHERE id = ?;`,
            [req.body.quant,req.body.id_prod],
            (error, resultado, field) => {
                if (error){
                    return res.status(500).send({
                        error:error,
                        response: null
                    });
                } 
            }
        )
        conn.query(
            'INSERT INTO transacoes (id_func, id_prod, quant, data) VALUES (?,?,?,?)',
            [req.body.id_func,req.body.id_prod,req.body.quant,date],
            (error, resultado, field) => {
                if (error){
                    return res.status(500).send({
                        error:error,
                        response: null
                    });
                } 
                res.status(201).send({
                    mensagem: 'Quantidade alterada',
                })
            }
        )          
    });

});

prodroutes.delete('/produtos', (req,res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            'DELETE FROM produto WHERE id = ?', [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }

                res.status(202).send({
                    mensagem: 'Produto deletado com sucesso'
                })
            }
        )
    })
})

module.exports = prodroutes