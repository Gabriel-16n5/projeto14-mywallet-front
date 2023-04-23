import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {getTransactions} from "../services/api"

export default function HomePage() {
  const { auth } = useAuth();
  const [historic, setHistoric] = useState();
  const [balance, setBalance] = useState(0);
  function honeyMovimentation() {
    const promise = getTransactions(auth);

    promise.then((ok) => {
      const holderData = ok.data;
      setHistoric(holderData)
      let j = 0
      for(let i = 0 ; i< holderData.length; i++){ 
        j = j + holderData[i].valor
        setBalance(j)
      }
    });
    promise.catch((erro) => {
      alert(erro.response.data);
    });
  }
  useEffect(honeyMovimentation, []);

  if(historic === undefined){
    return <h1>Carregando...</h1>;
  }
  return (

    <HomeContainer>
      <Header>
        <h1>Olá, {historic[1].name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          <li>
            {historic.map((lst, i) =>
            <ListItemContainer key={i}>
            
              <div >
                <span>{lst.data}</span>
                <strong>{lst.description}</strong>
              </div>
              
              <Value color={lst.valor <= 0 ? "negativo" : "positivo"}>{lst.valor}</Value>
            </ListItemContainer>
            )}
          </li>

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance <= 0 ? "negativo" : "positivo"}>{balance}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  height: 500px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    overflow-y: scroll;
  }
  article {
    display: flex;
    justify-content: space-between;  
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`