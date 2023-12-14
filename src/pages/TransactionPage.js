import styled from "styled-components"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import {getTransactions, postTransactions} from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const { chooseOperation } = useParams();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({ valor: '', description: ''});


  useEffect(() => {
    if(chooseOperation != "entrada" && chooseOperation != "saida"){
      alert("Página não encontrada");
      navigate("/home");
    }
    const promise = getTransactions(auth);
    promise.catch((error) => {
      alert(error.response.data);
      navigate("/home");
    });
  })


  function dataValidation(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function launchValor(e){
    e.preventDefault();

    const promise = postTransactions(chooseOperation, formData, auth)
    promise.then(() => {
      alert("Movimentação adicionada com sucesso")
      navigate("/home");
    });
    promise.catch((error) => {
      alert(error.response.data);
      navigate("/home");
    });

  }


  return (
    <TransactionsContainer>
      <h1>Nova {chooseOperation}</h1>
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
        <button type="submit">Salvar {chooseOperation}</button>
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
