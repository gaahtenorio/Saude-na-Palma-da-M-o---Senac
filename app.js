const express = require('express');
const app = express();

const pacienteRoutes = require('./routes/pacienteRoutes');
// rotas de profissionais e agendamentos virão depois

app.use(express.json());

app.use('/pacientes', pacienteRoutes);

// Outras rotas
// app.use('/profissionais', profissionalRoutes);
// app.use('/agendamentos', agendamentoRoutes);

const profissionalRoutes = require('./routes/profissionalRoutes');

// depois, adicione esta linha abaixo do pacienteRoutes
app.use('/profissionais', profissionalRoutes);

const agendamentoRoutes = require('./routes/agendamentoRoutes');

// Depois das outras rotas
app.use('/agendamentos', agendamentoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));




