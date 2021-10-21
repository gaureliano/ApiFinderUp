const express = require('express')
const mongoose = require('mongoose')
const prodroutes = express.Router()
const mysql = require ('./mysql').pool

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
            [req.body.name,req.body.quantity],
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