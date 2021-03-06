import { useState, useEffect } from 'react'
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from '../../../../styles/AdminTitle.module.css'
import StyledButton from '../../StyledButton'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Link from 'next/link'

import { useDispatch } from 'react-redux'
import {
  setSearch as setSearchRedux,
  clearSearch
} from '../../../../store/modules/admin/shared/search/reducer'

import { useRouter } from 'next/router'
 
interface SearchAndIcon {
  icon: IconProp,
  newPath: string
}

const SearchAndIcon: React.FC<SearchAndIcon> = ({icon, newPath}) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(clearSearch())
  }, [])

  const handleSearch = (): void => {
    router.replace(router.pathname, '?page=1')
    dispatch(setSearchRedux(search))
  }

  return (
    <Row>
      <Col lg={9} xs>
        <Row>
          <Col lg={9} xs={10}>
            <InputGroup>
              <FormControl
                placeholder="Pesquisar"
                className={styles.input}
                value={search}
                onChange={
                  (evt: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(evt.target.value)
                  }
                }
                onKeyPress={
                  (evt: React.KeyboardEvent<HTMLInputElement>) => {
                    if (evt.key.toLocaleLowerCase() === 'enter') {
                      handleSearch()
                    }
                  }
                }
              />
            </InputGroup>
          </Col>

          <Col lg={3} xs={2} className="mt-1" style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              color="var(--color-gray-light)"
              className="float-left"
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={2} xs={{span: 3}} className={styles.titleButton}>
        <Link href={newPath}>
          <a>
            <StyledButton icon={icon} type_button={"blue"} />
          </a>
        </Link>
      </Col>
    </Row>
  )
}

export default SearchAndIcon
