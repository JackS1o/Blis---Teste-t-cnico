import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: any = {
    email: '',
    password: ''
  }
  
  async login() {
    if (this.loginObj.email === '' || this.loginObj.password === '') {
      alert('Os campos não podem estar vazios');
      return
    } 

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email: this.loginObj.email,
        password: this.loginObj.password
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
