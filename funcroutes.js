const express = require('express')
const mongoose = require('mongoose')
const funcroutes = express.Router()
const mysql = require ('./mysql').pool

funcroutes.get('/funcionario', (req,res) => {

    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM funcionario;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

funcroutes.get('/funcionarios/:id_funcionario', (req,res) => {

    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM funcionario WHERE id = ?;',
            [req.params.id_funcionario],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

funcroutes.post('/cadastroFunc', (req,res) => {

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO funcionario (name_func, tipo) VALUES (?,?)',
            [req.body.name,req.body.tipo],
            (error, resultado, field) => {
                conn.release();

                if (error){
                    return res.status(500).send({
                        error:error,
                        response: null
                    });
                } 

                res.status(201).send({
                    mensagem: 'Funcionario Inserido com sucesso',
                    id_funcionario: resultado.insertId
                })
            }
        )
    
    });

});

funcroutes.delete('/funcionario', (req,res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            'DELETE FROM funcionario WHERE id = ?', [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }

                res.status(202).send({
                    mensagem: 'Funcionario deletado com sucesso'
                })
            }
        )
    })
})

module.exports = funcroutes