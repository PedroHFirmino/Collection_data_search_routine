// require ('dotenv').config();

// // const config = {
  
// //   user: process.env.DATABASE_CRP_USER, 
// //   password: process.env.DATABASE_CRP_PASS,
// //   server: process.env.DATABASE_CRP_SERVER,
// //   database: process.env.DATABASE_CRP_NAME, 

const mysql = require('mysql2/promise');
const config = require('../config/Corpore');


async function buscaDadosAcervo() {
  try {
    console.log('Conectando ao Banco de Dados Corpore.');
    const connection = await mysql.createConnection(config);
    console.log('Conexão completa');
    
    const [rows] = await connection.execute(`
      WITH Exemplares AS (
    SELECT E.CODPUBLIC, E.CODFILIAL, E.BLOQEMP, COUNT(*) AS totalExemplares
    FROM LEXEMPLAR E
    WHERE E.CODSITUACAO IN (
        SELECT CODSITUACAO
        FROM LSITUACAOEXEMPLAR
        WHERE PERMITEEMP = 'T'
    )
    GROUP BY E.CODPUBLIC, E.CODFILIAL, E.BLOQEMP
),
Emprestimos AS (
    SELECT CODPUBLIC, COUNT(*) AS emprestimos
    FROM LEMPRESTIMOS
    WHERE STATUSEMP = 'E' AND DTHRDEVEFETIVA IS NULL
    GROUP BY CODPUBLIC
),
Reservas AS (
    SELECT CODPUBLIC
    FROM LRESERVA
    WHERE STATUSRES = 'R' AND DTHLIBERACAO IS NULL
)

SELECT 
    P.CODIGO AS codPublic,
    P.TITULO AS titulo,
    P.EDITORA AS codEditora,
    LEXEM.NTOMBO AS tombo,
    IFNULL(EDIT.EDITOR, '') AS nomeEditora,
    IFNULL(LEXEM.EDICAO, P.EDICAO) AS edicao,
    V.DESCVOL AS volume,
    P.IDIMAGEM,
    CAST(IMG.IMAGEM AS BINARY) AS imagem,
    (
        SELECT GROUP_CONCAT(TRIM(REPLACE(A.NOME, ';', ',')) SEPARATOR '; ')
        FROM LITEMAUTOR IA
        LEFT JOIN LAUTOR A ON A.CODCOLIGADA = IA.CODCOLIGADA AND A.CODIGO = IA.CODAUTOR
        WHERE IA.CODCOLIGADA = P.CODCOLIGADA AND IA.CODITEM = P.CODIGO
    ) AS autor,
    IFNULL((SELECT SUM(totalExemplares) FROM Exemplares WHERE CODPUBLIC = P.CODIGO AND CODFILIAL = 1), 0) AS qtdeCentro,
    IFNULL((SELECT SUM(totalExemplares) FROM Exemplares WHERE CODPUBLIC = P.CODIGO AND CODFILIAL = 2), 0) AS qtdeCampus,
    (
        SELECT 
            CASE
                WHEN SUM(CASE WHEN BLOQEMP = 'F' THEN totalExemplares ELSE 0 END)
                    - IFNULL((SELECT emprestimos FROM Emprestimos WHERE CODPUBLIC = P.CODIGO), 0) < 0
                THEN 1
                ELSE SUM(CASE WHEN BLOQEMP = 'F' THEN totalExemplares ELSE 0 END)
                    - IFNULL((SELECT emprestimos FROM Emprestimos WHERE CODPUBLIC = P.CODIGO), 0)
            END
        FROM Exemplares
        WHERE CODPUBLIC = P.CODIGO
    ) AS qtdeDisponivel,
    CASE
        WHEN EXISTS (SELECT 1 FROM Reservas WHERE CODPUBLIC = P.CODIGO) THEN 1
        ELSE 0
    END AS isReservado
FROM LPUBLIC P
JOIN LEXEMPLAR LEXEM ON P.CODCOLIGADA = LEXEM.CODCOLIGADA AND P.CODIGO = LEXEM.CODPUBLIC
LEFT JOIN LEDITORA EDIT ON P.EDITORA = EDIT.CODIGO
LEFT JOIN LVOLUME V ON P.CODCOLIGADA = V.CODCOLIGADA AND P.CODIGO = V.CODPUBLIC AND LEXEM.CODVOL = V.CODIGO
LEFT JOIN GIMAGEM IMG ON IMG.ID = P.IDIMAGEM
LIMIT 10;
    `);
    console.log('teste');
    // console.log(rows.recordset);
    console.log(rows);
        // return rows.recordset;
        return [];
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    return [];
  }
}

// Para salvar a imagem em JPG //
async function salvarImagem(dadosImagem) {
  const imagemBinaria = dadosImagem[0]?.imagem;
  if (imagemBinaria) {
    const nomeArquivo = 'imagem_salva_teste1.jpg';
    fs.writeFileSync(nomeArquivo, imagemBinaria);
    console.log(`Imagem salva como: ${nomeArquivo}`);
  } else {
    console.log('Nenhuma imagem disponível.');
  }
}

module.exports = {
  buscaDadosAcervo,
  salvarImagem
};