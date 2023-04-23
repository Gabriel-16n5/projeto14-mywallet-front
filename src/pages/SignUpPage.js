import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { signup } from "../services/api"
import { useState } from "react"

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: ''});
  const navigate = useNavigate();

  function dataValidation(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function cadastrar(e) {
    e.preventDefault();

   if(formData.password !== formData.confirmPassword){
    return alert("passwords do not match")
   }else {
    delete formData.confirmPassword;
   }

    const promise = signup({
      ...formData
    });

    promise.then(() => {
      navigate("/");
    });
    promise.catch((erro) => {
      alert(erro.response.data);
    });
  }

  return (
    <SingUpContainer>
      <form onSubmit={cadastrar}>
        <MyWalletLogo />
        <input 
          placeholder="Nome" 
          type="text"
          name="name"
          onChange={dataValidation}
          value={formData.name}
          required
        />
        <input 
         placeholder="E-mail" 
         type="email"
         name="email"
         onChange={dataValidation}
         value={formData.email}
         required
        />
        <input 
          placeholder="Senha" 
          type="password" 
          name="password"
          onChange={dataValidation}
          value={formData.password}
          minLength={3}
          required 
        />
        <input 
          placeholder="Confirme a senha" 
          type="password" 
          name="confirmPassword"
          onChange={dataValidation}
          value={formData.confirmPassword}
          minLength={3}
          required 
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
