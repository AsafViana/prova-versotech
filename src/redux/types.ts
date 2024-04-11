// types.ts
// Interface representando uma versão resumida de um Pokémon, usada para exibição de listas.
export interface PokemonResume {
	id: number // Identificador único do Pokémon.
	name: string // Nome do Pokémon.
	image: string // URL para a imagem principal do Pokémon.
	altImage: string // URL para uma imagem alternativa do Pokémon.
	type: string // Tipo do Pokémon.
	typeIcon: string // URL para o ícone representando o tipo do Pokémon.
}

// Interface representando informações detalhadas sobre um Pokémon, incluindo estatísticas, habilidades, etc.
export interface PokemonDetails {
	id: number // Identificador único do Pokémon.
	name: string // Nome do Pokémon.
	image: string // URL para a imagem principal do Pokémon.
	altImage: string // URL para uma imagem alternativa do Pokémon.
	types: {
		// Array de objetos representando os tipos do Pokémon.
		slot: number // Posição do tipo.
		type: {
			// Objeto contendo detalhes sobre o tipo.
			name: string // Nome do tipo.
			url: string // URL para informações adicionais sobre o tipo.
		}
	}[]
	typeIcon: string // URL para o ícone representando o tipo principal do Pokémon.
	height: number // Altura do Pokémon.
	weight: number // Peso do Pokémon.
	abilities: {
		// Array de objetos representando as habilidades do Pokémon.
		ability: {
			// Objeto contendo detalhes sobre a habilidade.
			name: string // Nome da habilidade.
			url: string // URL para informações adicionais sobre a habilidade.
		}
		is_hidden: boolean // Sinalizador indicando se a habilidade está oculta.
		slot: number // Posição da habilidade.
	}[]
	stats: {
		// Array de objetos representando as estatísticas base do Pokémon.
		base_stat: number // Valor da estatística base.
		effort: number // Valor do esforço.
		stat: {
			// Objeto contendo detalhes sobre a estatística.
			name: string // Nome da estatística.
			url: string // URL para informações adicionais sobre a estatística.
		}
	}[]
}

// Interface representando o estado relacionado aos dados resumidos de Pokémon.
export interface PokemonResumeState {
	pokemons: PokemonResume[] // Array de dados resumidos de Pokémon.
}

// Interface representando o estado relacionado aos dados detalhados de Pokémon.
export interface PokemonState {
	pokemonsCont: number // Contagem total de Pokémon.
	pokemons: PokemonDetails[] | null // Array de dados detalhados de Pokémon ou null.
	status: 'idle' | 'loading' | 'succeeded' | 'failed' // Status da obtenção dos dados de Pokémon.
	error: string | null // Mensagem de erro se a obtenção dos dados de Pokémon falhar.
	allPokemonsDetails: Record<string, PokemonDetails> // Informações detalhadas sobre todos os Pokémon obtidos ou null.
	filterType: string | null // Tipo usado para filtrar os dados de Pokémon ou null.
	statusSearch: 'idle' | 'loading' | 'succeeded' | 'failed' // Status da busca por dados de Pokémon.
}

// Enum que define os tipos de ação relacionados aos dados de Pokémon.
export enum ActionTypes {
	FETCH_POKEMONS = 'FETCH_POKEMONS', // Tipo de ação para obtenção dos dados de Pokémon.
}

// Interface representando parâmetros para obtenção de dados resumidos de Pokémon.
export interface FetchPokemonsResumeParams {
	offset: number // Deslocamento para paginação.
	limit: number // Limite para paginação.
}

// Interface representando a resposta para obtenção de dados resumidos de Pokémon.
export interface FetchPokemonsResumeResponse {
	pokemons: PokemonDetails[] | null // Array de dados resumidos de Pokémon.
	totalCount: number // Contagem total de Pokémon.
}

// Interface representando parâmetros para obtenção de dados resumidos de Pokémon com base no tipo.
export interface FetchPokemonsPerTypeParams {
	offset: number // Deslocamento para paginação.
	limit: number // Limite para paginação.
	type: string // Tipo de Pokémon.
}

// Interface representando a resposta para obtenção de dados resumidos de Pokémon com base no tipo.
export interface FetchPokemonsPerTypeResponse {
	pokemons: PokemonDetails[] // Array de dados resumidos de Pokémon.
	totalCount: number // Contagem total de Pokémon.
}

// Interface representando parâmetros para busca de Pokémon por nome.
export interface SearchParams {
	name: string // Nome do Pokémon a ser buscado.
}
