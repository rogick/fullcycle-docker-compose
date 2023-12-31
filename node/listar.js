const conexao = require('./conexao');

module.exports = function() {
  const con = conexao();
  con.connect((erro) => {
    if (erro) {
      console.error('Erro ao conectar: ' + erro.stack);
      return;
    }
    console.log('Conectado como ' + con.threadId);
  });
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM people';
    con.query(sql, (erro, resultado) => {
      if (erro) {
        console.error('Erro ao consultar: ' + erro.stack);
        reject(erro);
      } else {
        console.log('Consulta realizada com sucesso: ' + resultado);
        resolve(resultado);
      }
    });
    con.end();
  });
};
