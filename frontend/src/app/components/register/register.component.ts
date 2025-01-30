import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerObj: any = {
    name: '',
    birthdate: '',
    email: '',
    password: ''
  };

  async register() {
    if (this.registerObj.name === '' || this.registerObj.birthdate === '' || this.registerObj.email === '' || this.registerObj.password === '') {
      alert('Os campos não podem estar vazios');
      return
    } 
    console.log(this.registerObj);
    
    try {
      const response = await axios.post('http://localhost:3000/users', {
        name: this.registerObj.name,
        birthdate: this.registerObj.birthdate,
        email: this.registerObj.email,
        password: this.registerObj.password
      })
      console.log(response);
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error)
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }
}
