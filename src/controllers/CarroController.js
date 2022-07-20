const CarroService = require('../services/CarroService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let carros = await CarroService.buscarTodos();

        for (let i in carros) {
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo,
                placa: carros[i].placa
            })
        }
        res.json(json);
    },

    buscarAno: async (req ,res) => {
        let json = { error: '', result: [] };

        let carros = await CarroService.buscarAno();

        for (let i in carros) {
            json.result.push({
                ano: carros[i].ano,
                descricao: carros[i].modelo,
            })
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.codigo;
        let carro = await CarroService.buscarUm(codigo);

        if (carro) {
            json.result = carro;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let modelo = req.body.modelo;
        let placa = req.body.placa;
        let ano = req.body.ano;

        if (modelo && placa && ano) {
            let carroCodigo = await CarroService.inserir(modelo, placa, ano);
            json.result = {
                codigo: carroCodigo,
                modelo,
                placa,
                ano
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        let modelo = req.body.modelo;
        let placa = req.body.placa;
        let ano = req.body.ano;
        let codigo = req.params.codigo;

        if (modelo && placa && ano && codigo) {
            await CarroService.alterar(modelo, placa, ano, codigo);
            json.result = {
                modelo,
                placa,
                ano,
                codigo
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },
    excluir: async(req, res) => {
        let json = { error: '', result: {} };
        
        await CarroService.excluir(req.params.codigo);

        res.json(json);
    }
}