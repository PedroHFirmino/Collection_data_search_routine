const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.DATABASE_CRP_HOST,
  user: process.env.DATABASE_CRP_USER,
  password: process.env.DATABASE_CRP_PASS,
  database: process.env.DATABASE_CRP_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});


const dados = [{
    codPublic: 1,
    titulo: 'DIÁRIO DE BILOCA',
    codEditora: 6,
    tombo: '01000001',
    nomeEditora: 'Atual',
    edicao: '7. ed.',
    volume: null,
    IDIMAGEM: 20500,
    imagem: '',
    autor: 'GARCIA, EDSON GABRIEL',
    qtdeCentro: 1,
    qtdeCampus: 0,
    qtdeDisponivel: 1,
    isReservado: 0,
},
{
    codPublic: 2,
    titulo: 'A HORA DA LUTA',
    codEditora: 1,
    tombo: '01000002',
    nomeEditora: 'FTD',
    edicao: '10. ed.',
    volume: null,
    IDIMAGEM: 20531,
    imagem: '',
    autor: 'GOMES, ÁLVARO CARDOSO',
    qtdeCentro: 2,
    qtdeCampus: 0,
    qtdeDisponivel: 2,
    isReservado: 0
  },
  {
    codPublic: 2,
    titulo: 'A HORA DA LUTA',
    codEditora: 1,
    tombo: '02000002',
    nomeEditora: 'FTD',
    edicao: '10. ed.',
    volume: null,
    IDIMAGEM: 20531,
    imagem: '',
    autor: 'GOMES, ÁLVARO CARDOSO',
    qtdeCentro: 2,
    qtdeCampus: 0,
    qtdeDisponivel: 2,
    isReservado: 0
  },
  {
    codPublic: 3,
    titulo: 'PERIGOSA DESCOBERTA',
    codEditora: 1,
    tombo: '01000003',
    nomeEditora: 'FTD',
    edicao: '3. ed.',
    volume: null,
    IDIMAGEM: 20648,
    imagem: '',
    autor: 'HETZEL, GRAZIELA BOZANO',
    qtdeCentro: 3,
    qtdeCampus: 0,
    qtdeDisponivel: 3,
    isReservado: 0
  },
  {
    codPublic: 3,
    titulo: 'PERIGOSA DESCOBERTA',
    codEditora: 1,
    tombo: '02000003',
    nomeEditora: 'FTD',
    edicao: '3. ed.',
    volume: null,
    IDIMAGEM: 20648,
    imagem: '',
    autor: 'HETZEL, GRAZIELA BOZANO',
    qtdeCentro: 3,
    qtdeCampus: 0,
    qtdeDisponivel: 3,
    isReservado: 0
  },
  {
    codPublic: 3,
    titulo: 'PERIGOSA DESCOBERTA',
    codEditora: 1,
    tombo: '03000003',
    nomeEditora: 'FTD',
    edicao: '3. ed.',
    volume: null,
    IDIMAGEM: 20648,
    imagem: '',
    autor: 'HETZEL, GRAZIELA BOZANO',
    qtdeCentro: 3,
    qtdeCampus: 0,
    qtdeDisponivel: 3,
    isReservado: 0
  },
  {
    codPublic: 5,
    titulo: 'DESCOBRIDOR DE CONTINENTES',
    codEditora: 2714,
    tombo: '01000005',
    nomeEditora: 'FDT',
    edicao: null,
    volume: null,
    IDIMAGEM: 20643,
    imagem: '',
    autor: 'HOHLFELDT, ANTÔNIO CARLOS, 1948',
    qtdeCentro: 2,
    qtdeCampus: 0,
    qtdeDisponivel: 2,
    isReservado: 0
  },
  {
    codPublic: 5,
    titulo: 'DESCOBRIDOR DE CONTINENTES',
    codEditora: 2714,
    tombo: '02000005',
    nomeEditora: 'FDT',
    edicao: null,
    volume: null,
    IDIMAGEM: 20643,
    imagem: '',
    autor: 'HOHLFELDT, ANTÔNIO CARLOS, 1948',
    qtdeCentro: 2,
    qtdeCampus: 0,
    qtdeDisponivel: 2,
    isReservado: 0
  },
  {
    codPublic: 7,
    titulo: 'LUCÍOLA',
    codEditora: 7,
    tombo: '01000007',
    nomeEditora: 'Moderna',
    edicao: null,
    volume: null,
    IDIMAGEM: 18783,
    imagem: '',
    autor: 'ALENCAR, JOSÉ DE',
    qtdeCentro: 1,
    qtdeCampus: 0,
    qtdeDisponivel: 1,
    isReservado: 0
  },
  {
    codPublic: 8,
    titulo: 'O HOMEM QUE ESCREVE NO CÉU',
    codEditora: 1,
    tombo: '01000008',
    nomeEditora: 'FTD',
    edicao: null,
    volume: null,
    IDIMAGEM: 17939,
    imagem: '',
    autor: 'ALENCAR, JOSÉ ROBERTO DE',
    qtdeCentro: 1,
    qtdeCampus: 0,
    qtdeDisponivel: 0,
    isReservado: 0
  }];

async function inserirDados() {
  try {
    for (const item of dados) {
      const CODCOLIGADA = 1;
      const CODFILIAL = 1;
      const BLOQEMP = 'N';
      const CODSITUACAO = 1; 
      const CODAUTOR = item.codPublic; 
      const CODVOL = item.volume ? item.codPublic : null;

      // LEDITORA
      await pool.query(`
        INSERT IGNORE INTO LEDITORA (CODIGO, EDITOR)
        VALUES (?, ?)
      `, [item.codEditora, item.nomeEditora]);

      // LPUBLIC
      await pool.query(`
        INSERT IGNORE INTO LPUBLIC (CODIGO, TITULO, EDITORA, EDICAO, IDIMAGEM, CODCOLIGADA)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [item.codPublic, item.titulo, item.codEditora, item.edicao, item.IDIMAGEM, CODCOLIGADA]);

      // GIMAGEM
      await pool.query(`
        INSERT IGNORE INTO GIMAGEM (ID, IMAGEM)
        VALUES (?, ?)
      `, [item.IDIMAGEM, item.imagem || null]);

      // LEXEMPLAR
      await pool.query(`
        INSERT IGNORE INTO LEXEMPLAR (CODCOLIGADA, CODPUBLIC, CODFILIAL, BLOQEMP, CODSITUACAO, NTOMBO, EDICAO, CODVOL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [CODCOLIGADA, item.codPublic, CODFILIAL, BLOQEMP, CODSITUACAO, item.tombo, item.edicao, CODVOL]);

      // LSITUACAOEXEMPLAR 
      await pool.query(`
        INSERT IGNORE INTO LSITUACAOEXEMPLAR (CODSITUACAO, PERMITEEMP)
        VALUES (?, ?)
      `, [CODSITUACAO, 'S']);

      // LAUTOR
      await pool.query(`
        INSERT IGNORE INTO LAUTOR (CODCOLIGADA, CODIGO, NOME)
        VALUES (?, ?, ?)
      `, [CODCOLIGADA, CODAUTOR, item.autor]);

      // LITEMAUTOR
      await pool.query(`
        INSERT IGNORE INTO LITEMAUTOR (CODCOLIGADA, CODITEM, CODAUTOR)
        VALUES (?, ?, ?)
      `, [CODCOLIGADA, item.codPublic, CODAUTOR]);

      // LVOLUME
      if (item.volume) {
        await pool.query(`
          INSERT IGNORE INTO LVOLUME (CODCOLIGADA, CODPUBLIC, CODIGO, DESCVOL)
          VALUES (?, ?, ?, ?)
        `, [CODCOLIGADA, item.codPublic, CODVOL, item.volume]);
      }

      // LEMPRESTIMOS 
      if (item.qtdeDisponivel === 0) {
        await pool.query(`
          INSERT INTO LEMPRESTIMOS (CODPUBLIC, STATUSEMP, DTHRDEVEFETIVA)
          VALUES (?, ?, NOW())
        `, [item.codPublic, 'A']); 
      }

      // LRESERVA 
      if (item.isReservado === 1) {
        await pool.query(`
          INSERT INTO LRESERVA (CODPUBLIC, STATUSRES, DTHLIBERACAO)
          VALUES (?, ?, NOW())
        `, [item.codPublic, 'A']);
      }
    }

    console.log('Todos os dados foram inseridos com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir dados:', err.message);
  } finally {
    await pool.end();
  }
}

inserirDados();
