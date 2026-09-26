const pool = require('../db');

const Profissional = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM profissionais');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM profissionais WHERE id = ?', [id]);
    return rows[0];
  },

  async create(profissional) {
    const { nome, especialidade, telefone, email } = profissional;
    const [result] = await pool.query(
      'INSERT INTO profissionais (nome, especialidade, telefone, email) VALUES (?, ?, ?, ?)',
      [nome, especialidade, telefone, email]
    );
    return { id: result.insertId, ...profissional };
  },

  async update(id, profissional) {
    const { nome, especialidade, telefone, email } = profissional;
    await pool.query(
      'UPDATE profissionais SET nome = ?, especialidade = ?, telefone = ?, email = ? WHERE id = ?',
      [nome, especialidade, telefone, email, id]
    );
    return { id, ...profissional };
  },

  async delete(id) {
    await pool.query('DELETE FROM profissionais WHERE id = ?', [id]);
  }
};

module.exports = Profissional;
