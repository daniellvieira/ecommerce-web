import React from 'react'
import withAuthAdmin from '../../components/withAuthAdmin'

const Home: React.FC = () => {
  return (
    <>
      <h1>Parabéns, você acessou o painel !!!</h1>
    </>
  )
}

// estou pegando o home puro e enviando como parametro para o withAuthAdmin
export default withAuthAdmin(Home)