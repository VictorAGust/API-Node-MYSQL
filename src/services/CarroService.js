const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM carros', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarAno: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM carros', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserir: (modelo, placa, ano) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO carros (modelo, placa, ano) VALUES (?, ?, ?)',
                [modelo, placa, ano],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertCodigo);
                    }
                );
        });
    },

    alterar: (modelo, placa, ano, codigo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE carros SET modelo = ?, placa = ?, ano = ? WHERE codigo = ?',
                [modelo, placa, ano, codigo],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                    }
                );
        });
    },

    excluir: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM carros WHERE codigo = ?', [codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
};