const pool = require('../db');

const Paciente = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM pacientes');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    return rows[0];
  },

  async create(paciente) {
    const { nome_completo, data_nascimento, telefone, email } = paciente;
    const [result] = await pool.query(
      'INSERT INTO pacientes (nome_completo, data_nascimento, telefone, email) VALUES (?, ?, ?, ?)',
      [nome_completo, data_nascimento, telefone, email]
    );
    return { id: result.insertId, ...paciente };
  },

  async update(id, paciente) {
    const { nome_completo, data_nascimento, telefone, email } = paciente;
    await pool.query(
      'UPDATE pacientes SET nome_completo = ?, data_nascimento = ?, telefone = ?, email = ? WHERE id = ?',
      [nome_completo, data_nascimento, telefone, email, id]
    );
    return { id, ...paciente };
  },

  async delete(id) {
    await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
  }
};

module.exports = Paciente;

