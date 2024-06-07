const fs = require('fs');
const path = require('path');

const filtrarPastas = (caminhoDoDiretorio, callback) => {
    const regex = /\.rar$|\.r\d+$/;

    const lerPasta = (diretorio) => {
        const pasta = {
            nome: path.basename(diretorio),
            arquivos01: [],
            subpastas: []
        };

        try {
            const stats = fs.statSync(diretorio);
            if (!stats.isDirectory()) {
                return pasta;
            }

            const arquivosNaPasta = fs.readdirSync(diretorio, { withFileTypes: true });

            arquivosNaPasta.forEach(item => {
                const caminhoCompleto = path.join(diretorio, item.name);
                if (item.isFile() && regex.test(item.name)) {
                    pasta.arquivos01.push(item.name);
                } else if (item.isDirectory()) {
                    const subPasta = lerPasta(caminhoCompleto);
                    if (subPasta.arquivos01.length > 0) {
                        pasta.subpastas.push(subPasta);
                    }
                }
            });
        } catch (err) {
            console.error(`Erro ao ler a pasta ${diretorio}:`, err);
        }

        return pasta;
    };

    const pastaPrincipal = lerPasta(caminhoDoDiretorio);
    callback(null, { pastas: [pastaPrincipal] });
};

const filtrarPastasHandler = (req, res) => {
    const caminhoDoDiretorio = req.query.path;
    filtrarPastas(caminhoDoDiretorio, (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: 'Falha na operação: ' + err });
        }
        res.json(resultado);
    });
};

module.exports = { filtrarPastasHandler, filtrarPastas };
