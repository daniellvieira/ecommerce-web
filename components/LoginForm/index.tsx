import React from 'react'
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import BlueBackground from '../shared/BlueBackground'

import AuthState from '../../dtos/AuthState'
import User from '../../dtos/User'
// componente do react
// useRef - referenciar alguma parte do codigo de forma facil
import { useState, useEffect, useRef } from 'react'
// componente do next
import  Link from 'next/link'
import { useRouter } from 'next/router'
// componente do redux
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from '../../store/modules/auth/reducer'
import UsersService from '../../services/users'
import { toast } from 'react-toastify'

interface LoginProps {
  titlePhrase: String,
  buttonPhrase: String
}

const LoginForm: React.FC<LoginProps> = ({ titlePhrase, buttonPhrase }) => {
  // os states devem ficar dentro da funcao
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  // pega o state do redux
  const loggedUser: User = useSelector((state: AuthState) => state.auth.loggedUser)
  // useRef permite que voce referencie um campo diretamente
  const passwordRef = useRef(null)

  // ele roda sempre que o componente for montado, ou quando as props do componente mudarem
  useEffect(() => {
    if (loggedUser) {
      setEmail(loggedUser.email)
      if (passwordRef && passwordRef.current) {
        passwordRef.current.focus()
      }
    }
  }, [loggedUser])

  // esse é o metodo que vai reagir ao submeter o form
  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    // impedir que ao enviar o submit a pagina seja recarregada
    evt.preventDefault()

    try {
      const response = await UsersService.signIn({ email, password })

      const { id, email: userEmail, name, profile } = response.data.data

      const user = {
        id,
        name,
        email: userEmail,
        profile: profile
      }

      // basicamente vai chamar o redux, seta o User no redux
      dispatch(setLoggedUser(user))

      toast.info('Login realizado com sucesso!')

      router.push(user.profile === 'admin' ? '/Admin/' : '/')
    } catch (err) {
      toast.error('E-mail ou senha inválidos!');
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
          <BlueBackground>
            <h4>{ titlePhrase }</h4>

            <InputGroup className="mt-3">
              <FormControl
                placeholder="Meu e-mail"
                value={email}
                type="email"
                onChange={
                  (evt: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(evt.target.value)
                  }
                }
                required
              />
            </InputGroup>

            <InputGroup className="mt-3">
              <FormControl
                placeholder="Senha"
                value={password}
                type="password"
                onChange={
                  (evt: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(evt.target.value)
                  }
                }
                required
                ref={passwordRef}
              />
            </InputGroup>

            <Button type="submit" className="btn btn-info mt-3 w-100">{buttonPhrase}</Button>

            <br />
            <Link href="/Auth/PasswordRecovery">Esqueci minha senha</Link>
            <br />            
          </BlueBackground>
        </Col>
      </Row>
    </form> 
  )
}

export default LoginForm