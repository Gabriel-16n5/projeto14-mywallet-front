import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import useAuth from "../hooks/useAuth"
import MyWalletLogo from "../components/MyWalletLogo"
import { signin } from "../services/api"
import { useState, useEffect } from "react";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { auth, login, userData, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.token) {
      navigate("/home");
    }
  }, []);

  function loginValidation(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function submitLogin(e) {
    e.preventDefault();

    const promise = signin({
      ...formData
    });

    promise.then((ok) => {
      login(ok.data.token)
      userData(ok.data.name)
      navigate("/home");
    });
    promise.catch((erro) => {
      alert(erro.response.data);
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={submitLogin}>
        <MyWalletLogo />
        <input 
        placeholder="E-mail" 
        type="email"
        name="email"
        onChange={loginValidation}
        value={formData.email}
        required
        />
        <input 
        placeholder="Senha" 
        type="password"
        name="password"
        onChange={loginValidation}
        value={formData.password}
        required 
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
