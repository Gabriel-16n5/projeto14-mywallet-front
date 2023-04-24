import styled from "styled-components"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
// import {postTransactions} from "../services/api"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {getTransactions, postTransactions} from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

export default function TransactionsPage() {
  const navigate = useNavigate();
  const { tipo } = useParams();
  const { auth, user } = useAuth();
  const [formData, setFormData] = useState({ valor: '', description: ''});


  useEffect(() => {
    if(tipo != "entrada" && tipo != "saida"){
      alert("Página não encontrada");
      navigate("/home");
    }
    const promise = getTransactions(auth);
    promise.catch((erro) => {
      alert(erro.response.data);
      navigate("/home");
    });
  })


  function dataValidation(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function launchValor(e){
    e.preventDefault();

    const promise = postTransactions(tipo, formData, auth)
    promise.then((ok) => {
      alert("Movimentação adicionada com sucesso")
      navigate("/home");
    });
    promise.catch((erro) => {
      alert(erro.response.data);
      navigate("/home");
    });

  }


  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={launchValor}>
        <input 
        placeholder="Valor"
        type="number"
        min={0}
        step={0.01}
        name="valor"
        value={formData.valor}
        onChange={dataValidation}
        required
         />
        <input 
        placeholder="Descrição"
        type="text"
        name="description"
        value={formData.description}
        onChange={dataValidation}
        required
         />
        <button type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
