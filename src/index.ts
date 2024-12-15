import dotenv from 'dotenv';
import app from './api/app'; 
import {connectToDatabase} from './config';

dotenv.config();

const PORT = process.env.PORT || 3002; 

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to the database:\n', error);
    console.log('\nServer initialization failed.');
    process.exit(1); 
  });
