const pool = require('../db');

const Agendamento = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT
        a.id,
        p.nome_completo AS paciente,
        med.nome AS profissional,
        a.data_agendamento,
        a.horario_inicio,
        a.horario_fim,
        a.status
      FROM agendamentos a
      JOIN pacientes p ON a.id_paciente = p.id
      JOIN profissionais med ON a.id_profissional = med.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM agendamentos WHERE id = ?', [id]);
    return rows[0];
  },

  async create(agendamento) {
    const { id_paciente, id_profissional, data_agendamento, horario_inicio, horario_fim, status } = agendamento;
    const [result] = await pool.query(
      `INSERT INTO agendamentos 
      (id_paciente, id_profissional, data_agendamento, horario_inicio, horario_fim, status) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [id_paciente, id_profissional, data_agendamento, horario_inicio, horario_fim, status]
    );
    return { id: result.insertId, ...agendamento };
  },

  async update(id, agendamento) {
    const { id_paciente, id_profissional, data_agendamento, horario_inicio, horario_fim, status } = agendamento;
    await pool.query(
      `UPDATE agendamentos SET 
        id_paciente = ?, 
        id_profissional = ?, 
        data_agendamento = ?, 
        horario_inicio = ?, 
        horario_fim = ?, 
        status = ?
       WHERE id = ?`,
      [id_paciente, id_profissional, data_agendamento, horario_inicio, horario_fim, status, id]
    );
    return { id, ...agendamento };
  },

  async delete(id) {
    await pool.query('DELETE FROM agendamentos WHERE id = ?', [id]);
  }
};

module.exports = Agendamento;

