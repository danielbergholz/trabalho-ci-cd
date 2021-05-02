import { useMemo } from 'react'
import {
  Container,
  Input,
  Label,
  ContainForm,
  ButtonSearch,
  TextButton,
  Search,
} from './styles'
import { useForm } from 'react-hook-form'
import useFetch from 'use-http'

const App = () => {
  // lidando com formularios
  const { register, handleSubmit, watch } = useForm()

  const { loading, error, data: pokemons } = useFetch(
    'https://pokeapi.co/api/v2/pokemon',
    {},
    []
  )

  const { error: errorGet, data: pokemon } = useFetch(
    'https://pokeapi.co/api/v2/pokemon'
  )

  const onSubmit = async (form) => {
    console.log({ errorGet, pokemon })
  }

  const showPokemons = useMemo(() => !watch('nome') && !error, [error, watch])

  const showPokemon = useMemo(() => !!watch('nome') && !errorGet && pokemon, [
    pokemon,
    watch,
    errorGet,
  ])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Search>
          <Label>Nome</Label>
          <Input ref={register} name="nome" />
          <ButtonSearch type="submit">
            <TextButton>Pesquisar</TextButton>
          </ButtonSearch>
        </Search>

        {error && 'Error!'}
        {loading && 'Loading...'}
        {showPokemon && (
          <ContainForm>
            <Label>{pokemon.name}</Label>
          </ContainForm>
        )}
        {showPokemons &&
          pokemons?.results?.map((pokemon) => (
            <ContainForm>
              <Label>{pokemon.name}</Label>
            </ContainForm>
          ))}
      </Container>
    </form>
  )
}

export default App

/*
const [pokemons, setPokemons] = useState([])

  const requestPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
      setPokemons(response.data.results)
      console.log('response -> ', response);
    } catch (error) {
      console.log('error ->', error);
    }
  }

  useEffect(() => {
    requestPokemons()
  }, [])
   <Title>Form React</Title>
        <ContainForm>
          <Label>Nome</Label>
          <Input ref={register} name='nome' />
          <Label>Sobrenome</Label>
          <Input ref={register} name='sobrenome' />
        </ContainForm>
        <Button type='submit'>
          <LabelButton>Enviar</LabelButton>
        </Button>
*/
