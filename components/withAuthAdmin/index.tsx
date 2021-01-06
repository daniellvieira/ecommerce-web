// é um rock, ele é um component que recebe como parametro um outro component 

import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

import AuthState from '../../dtos/AuthState'
import User from '../../dtos/User'
import ApiData from '../../dtos/ApiData'

const withAuthAdmin = (Component) => {

  // o Auth é o metodo que vai fazer a verificação se a gente deve 
  // jogar o User para o login ou dar segmento normal
  const Auth = (props) => {
    const router = useRouter()
    const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser)
    const apiData: ApiData = JSON.parse(Cookie.get('@api-data'))
  
    if (!loggedUser || 
        loggedUser.profile !== 'admin' ||
        !apiData ||
        !apiData['access-token'] ||
        apiData['access-token'] === '') {
      router.push('/Auth/Login')
    }
  
    return <Component {...props} />
  }

  // quando estamos no next, temos o metodo getServerSideProps
  // é uma maneira de forçar o next a renderizar de forma Server Side
  // forma de garantir que o metodo vai ser passado, mesmo usando o rock
  if (Component.getServerSideProps) {
    Auth.getServerSideProps = Component.getServerSideProps
  }

  return Auth
}

export default withAuthAdmin