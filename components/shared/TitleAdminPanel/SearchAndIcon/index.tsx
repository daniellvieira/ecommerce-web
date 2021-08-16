import { useState, useEffect } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.css';
import { InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StyledButton from '../../StyledButton';
import Link from 'next/link';

// realizamos a importação do dispatch e das actions para manipularmos a pesquisa no redux
import { useDispatch } from 'react-redux';
import {
  setSearch as setSearchRedux,
  clearSearch
} from '../../../../store/modules/admin/shared/search/reducer';

import { useRouter } from 'next/router';

// alteramos as propriedades do componente para receber o newPath que será utilizado para redirecionar o usuário para o form de criação dos recursos
interface SearchAndIcon {
  icon: IconProp;
  newPath: string;
}

const SearchAndIcon: React.FC<SearchAndIcon> = ({ icon, newPath }) => {
  // criamos um estado para podermos receber o que o usuário digitou no input de pesquisa
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  // limpando a pesquisa quando o component for renderizado
  useEffect(() => {
    dispatch(clearSearch());
  }, [])

  // método para realizar a tratativa da pesquisa. Ele irá atualizar o valor da pesquisa no redux
  // esse método será chamado quando o usuário der enter no input de pesquisa ou clicar no ícone da pesquisa
  const handleSearch = (): void => {
    // toda vez que o termo de pesquisa for alterado a página será alterada para 1.
    // utilizamos o método replace que tem a mesma função do metódo push, 
    // onde o mesmo não adiciona mais uma entrada no history do browser.
    router.replace(router.pathname, '?page=1');
    dispatch(setSearchRedux(search));
  }

  return (
    <Row>
      <Col lg={9} xs>
        <Row>
          <Col lg={9} xs={10}>
            <InputGroup>
              <FormControl
                placeholder="Pesquisar usuário"
                className={styles.input}
                value={search}
                onChange={
                  (evt: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(evt.target.value);
                  }
                }

                onKeyPress={
                  (evt: React.KeyboardEvent<HTMLInputElement>) => {
                    if (evt.key.toLowerCase() === 'enter') {
                      handleSearch()
                    }
                  }
                }
              />
            </InputGroup>
          </Col>

          <Col lg={3} xs={2} className={styles.search_icon}>
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              color="var(--color-gray-light)"
              className="float-left"
              onClick={handleSearch}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={2} xs={{ span: 3 }} className={styles.titleButton}>
        <Link href={newPath}>
          <a>
            <StyledButton icon={icon} type_button="blue" />
          </a>
        </Link>
      </Col>
    </Row>
  )
}

export default SearchAndIcon;
