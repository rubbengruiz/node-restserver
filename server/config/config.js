// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO 
// 60 segundos * 60 minutos * 24 horas * 30 días
process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30;

/* SEED */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/* BASE DE DATOS */
let urldb = process.env.NODE_ENV === 'dev'
    ? 'mongodb://localhost:27017/dbmoker' 
    : process.env.MONGO_URI;

process.env.URLDB = urldb;

// GOOGLE CLIENT ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '956198755353-bkm62nltr728l0sg6ggj6f3gtlretfo3.apps.googleusercontent.com';