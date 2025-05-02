
const config = {
  user: 'root',
  password: '',
  server: 'localhost',
  database: 'Corpore',
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   }
};

async function buscaDadosAcervo() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      WITH Exemplares AS (
          SELECT E.CODPUBLIC, E.CODFILIAL, E.BLOQEMP, COUNT(*) AS totalExemplares
          FROM Corpore..LEXEMPLAR E WITH (NOLOCK)
          WHERE E.CODSITUACAO IN (
              SELECT CODSITUACAO
              FROM Corpore..LSITUACAOEXEMPLAR WITH (NOLOCK)
              WHERE PERMITEEMP = 'T'
          )
          GROUP BY E.CODPUBLIC, E.CODFILIAL, E.BLOQEMP
      ),
      Emprestimos AS (
          SELECT CODPUBLIC, COUNT(*) AS emprestimos
          FROM Corpore..LEMPRESTIMOS WITH (NOLOCK)
          WHERE STATUSEMP = 'E' AND DTHRDEVEFETIVA IS NULL
          GROUP BY CODPUBLIC
      ),
      Reservas AS (
          SELECT CODPUBLIC
          FROM Corpore..LRESERVA WITH (NOLOCK)
          WHERE STATUSRES = 'R' AND DTHLIBERACAO IS NULL
      )

      SELECT TOP 10
          P.CODIGO AS codPublic,
          P.TITULO AS titulo,
          P.EDITORA AS codEditora,
          LEXEM.NTOMBO AS tombo,
          ISNULL(EDIT.EDITOR, '') AS nomeEditora,
          ISNULL(LEXEM.EDICAO, P.EDICAO) AS edicao,
          V.DESCVOL AS volume,
          P.IDIMAGEM,
          CAST(IMG.IMAGEM AS VARBINARY(MAX)) AS imagem,
          (
              SELECT STRING_AGG(RTRIM(LTRIM(REPLACE(A.NOME, ';', ','))), '; ')
              FROM Corpore..LITEMAUTOR IA WITH (NOLOCK)
              LEFT JOIN Corpore..LAUTOR A WITH (NOLOCK)
              ON A.CODCOLIGADA = IA.CODCOLIGADA AND A.CODIGO = IA.CODAUTOR
              WHERE IA.CODCOLIGADA = P.CODCOLIGADA AND IA.CODITEM = P.CODIGO
          ) AS autor,
          ISNULL((SELECT SUM(totalExemplares) FROM Exemplares WHERE CODPUBLIC = P.CODIGO AND CODFILIAL = 1), 0) AS qtdeCentro,
          ISNULL((SELECT SUM(totalExemplares) FROM Exemplares WHERE CODPUBLIC = P.CODIGO AND CODFILIAL = 2), 0) AS qtdeCampus,
          (
              SELECT CASE
                  WHEN SUM(CASE WHEN BLOQEMP = 'F' THEN totalExemplares ELSE 0 END)
                       - ISNULL((SELECT emprestimos FROM Emprestimos WHERE CODPUBLIC = P.CODIGO), 0) < 0
                  THEN 1
                  ELSE SUM(CASE WHEN BLOQEMP = 'F' THEN totalExemplares ELSE 0 END)
                       - ISNULL((SELECT emprestimos FROM Emprestimos WHERE CODPUBLIC = P.CODIGO), 0)
              END
              FROM Exemplares
              WHERE CODPUBLIC = P.CODIGO
          ) AS qtdeDisponivel,
          CASE
              WHEN EXISTS (SELECT 1 FROM Reservas WHERE CODPUBLIC = P.CODIGO) THEN 1
              ELSE 0
          END AS isReservado
      FROM Corpore..LPUBLIC P
      JOIN Corpore..LEXEMPLAR LEXEM WITH (NOLOCK)
          ON P.CODCOLIGADA = LEXEM.CODCOLIGADA AND P.CODIGO = LEXEM.CODPUBLIC
      LEFT JOIN Corpore..LEDITORA EDIT WITH (NOLOCK)
          ON P.EDITORA = EDIT.CODIGO
      LEFT JOIN Corpore..LVOLUME V WITH (NOLOCK)
          ON P.CODCOLIGADA = V.CODCOLIGADA AND P.CODIGO = V.CODPUBLIC AND LEXEM.CODVOL = V.CODIGO
      LEFT JOIN Corpore..GIMAGEM IMG WITH (NOLOCK)
          ON IMG.ID = P.IDIMAGEM
      WHERE EXISTS (
          SELECT 1
          FROM Corpore..LSITUACAOEXEMPLAR S WITH (NOLOCK)
          WHERE S.CODSITUACAO = LEXEM.CODSITUACAO AND S.PERMITEEMP = 'T'
      )
    `);

    return result.recordset;
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    return [];
  }
}

(async () => {
  const dadosImagem = await buscaDadosAcervo();
  const imagemBinaria = dadosImagem[1]?.imagem;

  if (imagemBinaria) {
    const nomeArquivo = 'imagem_salva_teste1.jpg';
    fs.writeFileSync(nomeArquivo, imagemBinaria);
    console.log(`Imagem salva como: ${nomeArquivo}`);
  } else {
    console.log('Nenhuma imagem disponível.');
  }
})();