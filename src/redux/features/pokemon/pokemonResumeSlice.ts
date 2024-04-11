import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'

// Importa os tipos necessários para as funções de ação assíncrona e ação de redux
import { FetchPokemonsResumeParams, FetchPokemonsResumeResponse, SearchParams, FetchPokemonsPerTypeResponse, PokemonDetails, PokemonState } from '../../../redux/types'
import { setItemsCount } from '../../../redux/features/pagination/paginationSlice'

// Cria uma ação assíncrona para buscar Pokémons por tipo
export const fetchPokemonsByType = createAsyncThunk<FetchPokemonsPerTypeResponse, string>('pokemonResume/fetchPokemonsByType', async (type: string, { dispatch }) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
		const data = await response.json()

		// Calcula a contagem de itens (pokémons) total
		const totalCount = data.pokemon.length

		// Mapeia os resultados para formatá-los de acordo com a estrutura de PokemonDetails
		const modifiedData = await Promise.all(
			data.pokemon.map(async (result: any) => {
				const pokemonResponse = await fetch(result.pokemon.url)
				const pokemonData = await pokemonResponse.json()

				const dataPokemon: PokemonDetails = {
					id: pokemonData.id,
					name: pokemonData.name,
					altImage: pokemonData.sprites.front_default,
					image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
					types: pokemonData.types,
					typeIcon: `https://codeboost.com.br/projetos/pokeapi/img/${pokemonData.types[0].type.name}.svg`,
					height: pokemonData.height,
					weight: pokemonData.weight,
					abilities: pokemonData.abilities,
					stats: pokemonData.stats,
				}
				return dataPokemon
			})
		)

		// Retorna os Pokémons formatados e a contagem total
		return { pokemons: modifiedData, totalCount }
	} catch (error) {
		throw new Error('Failed to fetch pokemons by type')
	}
})

// Cria uma ação assíncrona para buscar todos os Pokémons
export const fetchPokemons = createAsyncThunk<FetchPokemonsResumeResponse, FetchPokemonsResumeParams>('pokemonResume/fetchPokemons', async (params: FetchPokemonsResumeParams, { dispatch }) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${params.offset}&limit=${params.limit}`)
		const data = await response.json()

		// Dispatch para definir a contagem de itens
		dispatch(setItemsCount(data.count))

		// Mapeia os resultados para formatá-los de acordo com a estrutura de PokemonDetails
		const modifiedData = await Promise.all(
			data.results.map(async (result: any) => {
				const pokemonResponse = await fetch(result.url)
				const pokemonData = await pokemonResponse.json()

				const dataPokemon: PokemonDetails = {
					id: pokemonData.id,
					name: result.name,
					altImage: pokemonData.sprites.front_default,
					image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
					types: pokemonData.types,
					typeIcon: `https://codeboost.com.br/projetos/pokeapi/img/${pokemonData.types[0].type.name}.svg`,
					height: pokemonData.height,
					weight: pokemonData.weight,
					abilities: pokemonData.abilities,
					stats: pokemonData.stats,
				}
				return dataPokemon
			})
		)

		// Retorna os Pokémons formatados e a contagem total
		return { pokemons: modifiedData, totalCount: data.count }
	} catch (error) {
		throw new Error('Failed to fetch pokemons')
	}
})

// Cria uma ação assíncrona para buscar detalhes de todos os Pokémons
export const fetchPokemonsDetails = createAsyncThunk<
  { pokemons: PokemonDetails[]; totalCount: number },
  void,
  { state: RootState }
>("pokemonResume/fetchPokemonsDetails", async (_, { dispatch }) => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();

    // Atualiza a contagem de itens
    dispatch(setItemsCount(data.count));

    // Mapeia os resultados para formatá-los de acordo com a estrutura de PokemonDetails
    const modifiedData = await Promise.all(
      data.results.map(async (result: any) => {
        const pokemonResponse = await fetch(result.url);
        const pokemonData = await pokemonResponse.json();

        const dataPokemon: PokemonDetails = {
          id: pokemonData.id,
          name: pokemonData.name,
          altImage: pokemonData.sprites.front_default,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`,
          types: pokemonData.types,
          typeIcon: `https://codeboost.com.br/projetos/pokeapi/img/${pokemonData.types[0].type.name}.svg`,
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities,
          stats: pokemonData.stats,
        };
        return dataPokemon;
      })
    );

    // Retorna os Pokémons formatados e a contagem total
    return { pokemons: modifiedData, totalCount: data.count };
  } catch (error) {
    throw new Error("Failed to fetch pokemons");
  }
});

// Cria uma ação assíncrona para buscar um Pokémon pelo nome
export const searchPokemonByName = createAsyncThunk<{ pokemons: any[]; totalCount: number }, SearchParams>('pokemonResume/searchByName', async (params: SearchParams) => {
	try {
		const query = `https://pokeapi.co/api/v2/pokemon/${params.name}`
		const response = await fetch(query)
		const data = await response.json()

		// Formata os dados do Pokémon
		const dataPokemon: PokemonDetails = {
			id: data?.id,
			name: data?.name,
			altImage: data?.sprites.front_default,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`,
			types: data?.types,
			typeIcon: `https://codeboost.com.br/projetos/pokeapi/img/${data?.types[0].type.name}.svg`,
			height: data?.height,
			weight: data?.weight,
			abilities: data?.abilities,
			stats: data?.stats,
		}

		// Retorna os dados do Pokémon e a contagem total
		return { pokemons: [dataPokemon], totalCount: data.count }
	} catch (error) {
		throw new Error('Failed to fetch pokemons')
	}
})

// Define o estado inicial do slice de Pokémon
const initialState: PokemonState = {
	pokemonsCont: 0,
	pokemons: null,
	status: 'idle',
	error: null,
	allPokemonsDetails: {},
	filterType: 'all',
	statusSearch: 'idle',
}

// Define o slice de Pokémon
export const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		// Define o reducer para atualizar o status
		setStatus(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
			state.status = action.payload
		},
		// Define o reducer para definir o tipo de filtro
		setFilterType(state, action: PayloadAction<string>) {
			state.filterType = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// Adiciona os casos extras para os reducers associados às ações assíncronas
			.addCase(fetchPokemons.pending, (state) => {
				state.status = 'loading'
				state.statusSearch = 'loading'
				state.error = null
			})
			.addCase(fetchPokemons.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.statusSearch = 'succeeded'
				state.pokemons = action.payload.pokemons // Erro nesta linha
				state.pokemonsCont = action.payload.totalCount
			})

			.addCase(fetchPokemons.rejected, (state, action) => {
				state.status = 'failed'
				state.statusSearch = 'failed'
				state.error = action.error.message!
			})
			.addCase(fetchPokemonsByType.pending, (state) => {
				state.status = 'loading'
				state.statusSearch = 'loading'
				state.error = null
			})
			.addCase(fetchPokemonsByType.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.statusSearch = 'succeeded'
				state.pokemons = action.payload.pokemons
				state.pokemonsCont = action.payload.totalCount
			})
			.addCase(fetchPokemonsByType.rejected, (state, action) => {
				state.status = 'failed'
				state.statusSearch = 'failed'
				state.error = action.error.message!
			})
			.addCase(searchPokemonByName.pending, (state) => {
				state.statusSearch = 'loading'
				state.status = 'loading'
				state.error = null
			})
			.addCase(searchPokemonByName.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.statusSearch = 'succeeded'
				state.pokemons = action.payload.pokemons
				state.pokemonsCont = action.payload.totalCount
				state.filterType = null
			})
			.addCase(searchPokemonByName.rejected, (state, action) => {
				state.statusSearch = 'failed'
				state.status = 'failed'
				state.error = action.error.message!
			})
			.addCase(fetchPokemonsDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.statusSearch = 'succeeded';
                // Atualiza allPokemonsDetails com os detalhes dos pokémons recuperados
                action.payload.pokemons.forEach((pokemon) => {
						state.allPokemonsDetails[pokemon.name] = pokemon
                });
            })
			.addCase(fetchPokemonsDetails.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchPokemonsDetails.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message!
			})
	},
})

// Exporta as ações geradas pelo slice de Pokémon
export const { setStatus, setFilterType } = pokemonSlice.actions

// Exporta o reducer do slice de Pokémon
export default pokemonSlice.reducer
