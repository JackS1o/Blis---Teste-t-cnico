import mysql from 'mysql2/promise';

const connectionConfig = {
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'meubanco',
  port: 3306,
};

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; 
  }
}
