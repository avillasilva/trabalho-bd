import 'regenerator-runtime';
import { pool } from '../config/db';

export async function registerBook(req, res) {
  try {
    const {
      codigo_editora,
      titulo,
      autores,
      ano_publicacao,
      num_exemplares,
      isbn,
      num_paginas,
      genero,
      num_edicao,
    } = req.body;

    const book = await pool.query(
      'INSERT INTO livro (codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
      [
        codigo_editora,
        titulo,
        autores,
        ano_publicacao,
        num_exemplares,
        isbn,
        num_paginas,
        genero,
        num_edicao,
      ]
    );
    return res.render('views/bookRegistered.html');
  } catch (err) {
    console.log(err.message);
  }
}

export async function getBook(req, res) {
  try {
    const { codigo_livro } = req.params;
    const livro = await pool.query(
      'SELECT codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao FROM livro WHERE livro.codigo_livro = $1;',
      [codigo_livro]
    );
    res.json(livro.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getBooks(req, res) {
  try {
    const livros = await pool.query(
      'SELECT codigo_livro, codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao FROM livro;'
    );
    res.json(livros.rows);
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateBook(req, res) {
  try {
    const { codigo_livro } = req.params;
    const {
      codigo_editora,
      titulo,
      autores,
      ano_publicacao,
      num_exemplares,
      isbn,
      num_paginas,
      genero,
      num_edicao,
    } = req.body;

    var query = ''
    var values = []
    if (ano_publicacao === '') {
    
      query = 'UPDATE livro SET codigo_editora = $1, titulo = $2, autores = $3, \
      num_exemplares = $4, isbn = $5, num_paginas = $6, \
      genero = $7, num_edicao = $8 WHERE livro.codigo_livro = $9;' 

      values = [ codigo_editora, titulo, autores, num_exemplares, isbn, num_paginas, genero, num_edicao,codigo_livro ]
    
    } else {
      
      query = 'UPDATE livro SET codigo_editora = $1, titulo = $2, autores = $3, ano_publicacao = $4, \
      num_exemplares = $5, isbn = $6, num_paginas = $7, genero = $8, num_edicao = $9 \
      WHERE livro.codigo_livro = $10;'
    
      values = [ codigo_editora, titulo, autores, ano_publicacao, num_exemplares, isbn, num_paginas, genero, num_edicao,codigo_livro ]
    }

    const livro = await pool.query(
      query,
      values,
    );

    res.json(livro.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteBook(req, res) {
  try {
    const { codigo_livro } = req.params;
    const livro = await pool.query(
      'DELETE FROM livro WHERE livro.codigo_livro = $1;',
      [codigo_livro]
    );
    res.json(livro.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}
