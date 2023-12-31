const conexao = require('./conexao');

module.exports = function(nome) {
  return new Promise((resolve, reject) => {
    const con = conexao();
    con.connect((erro) => {
      if (erro) {
        console.error('Erro ao conectar: ' + erro.stack);
        reject(erro);
      }
      console.log('Conectado como ' + con.threadId);
    });
    
    const pessoa = {
      name: nome
    };
    
    const sql = 'INSERT INTO people SET ?';
    con.query(sql, pessoa, (erro, resultado) => {
      if (erro) {
        console.error('Erro ao inserir: ' + erro.stack);
        reject(erro);
      }
      console.log('Registro inserido com sucesso');

      resolve(resultado);
    });
    con.end();
  })
};
