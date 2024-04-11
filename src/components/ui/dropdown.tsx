import { RootState } from '../../app/store' // Importa o tipo RootState do Redux
import { fetchPokemons, fetchPokemonsByType, setFilterType } from '../../redux/features/pokemon/pokemonResumeSlice' // Importa as ações Redux
import { useEffect, useRef, useState } from 'react' // Importa hooks do React
import { isMobile } from 'react-device-detect' // Importa função para detectar dispositivo móvel
import { useDispatch, useSelector } from 'react-redux' // Importa hooks Redux

// Componente Dropdown para selecionar tipos de Pokémon
export const Dropdown = () => {
	// Seleciona dados do estado global usando hooks Redux
	const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
	const filterType = useSelector((state: RootState) => state.pokemon.filterType)
	const itemsPerPageDesktop = useSelector((state: RootState) => state.pagination.itemsPerPageDesktop)
	const itemsPerPageMobile = useSelector((state: RootState) => state.pagination.itemsPerPageMobile)

	// Estado para controlar a abertura do dropdown
	const [isOpen, setIsOpen] = useState(false)

	// Referência para o elemento do dropdown
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Dispatcher Redux para despachar ações
	const dispatch = useDispatch()

	// Opções do dropdown
	const options = [
		{
			value: 'all',
			label: 'All',
			icon: `https://raw.githubusercontent.com/gist/Galadirith/baaf38c7286b568973cc50a50ff57f4d/raw/34d60cae491bc505c212398b94f12705665c12fc/pokeball.svg`,
		},
		{
			value: 'fighting',
			label: 'Fight',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/fighting.svg`,
		},
		{
			value: 'flying',
			label: 'Flying',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/flying.svg`,
		},
		{
			value: 'poison',
			label: 'Poison',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/poison.svg`,
		},
		{
			value: 'ground',
			label: 'Ground',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/ground.svg`,
		},
		{
			value: 'rock',
			label: 'Rock',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/rock.svg`,
		},
		{
			value: 'bug',
			label: 'Bug',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/bug.svg`,
		},
		{
			value: 'ghost',
			label: 'Ghost',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/ghost.svg`,
		},
		{
			value: 'steel',
			label: 'Steel',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/steel.svg`,
		},
		{
			value: 'fire',
			label: 'Fire',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/fire.svg`,
		},
		{
			value: 'water',
			label: 'Water',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/water.svg`,
		},
		{
			value: 'grass',
			label: 'Grass',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/grass.svg`,
		},
		{
			value: 'electric',
			label: 'Electric',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/electric.svg`,
		},
		{
			value: 'phychic',
			label: 'Phychic',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/psychic.svg`,
		},
		{
			value: 'ice',
			label: 'Ice',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/ice.svg`,
		},
		{
			value: 'dragon',
			label: 'Dragon',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/dragon.svg`,
		},
		{
			value: 'dark',
			label: 'Dark',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/dark.svg`,
		},
		{
			value: 'fairy',
			label: 'Fairy',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/fairy.svg`,
		},
		{
			value: 'normal',
			label: 'Normal',
			icon: `https://codeboost.com.br/projetos/pokeapi/img/normal.svg`,
		},
	]

	// Efeito para fechar o dropdown ao clicar fora dele
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Função para alternar a abertura/fechamento do dropdown
	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	// Função para encontrar uma opção pelo valor
	function findOptionByValue(value: string) {
		return options.find((option) => option.value === value)
	}

	// Função para lidar com a seleção de um tipo de Pokémon
	const handleTypeSelect = (type: { value: string; label: string; icon: string }) => {
		setIsOpen(false)
		dispatch(setFilterType(type.value))
		if (type.value === 'all') {
			const limit = isMobile ? itemsPerPageMobile : itemsPerPageDesktop
			dispatch(fetchPokemons({ limit, offset: limit * currentPage }) as any)
		} else {
			dispatch(fetchPokemonsByType(type.value) as any)
		}
	}

	return (
		<div className="relative w-36" ref={dropdownRef}>
			{/* Botão do dropdown */}
			<button onClick={toggleDropdown} className="px-4 py-2 w-full flex justify-center items-center text-red-800 font-semibold border-2 border-red-800 rounded-full bg-white rounded-md focus:outline-none focus:bg-red-800 focus:text-white">
				{!filterType ? <></> : <img className="w-5 self-center h-auto pr-1" src={findOptionByValue(filterType)?.icon} alt="Type" />}
				{!filterType ? 'Select type:' : findOptionByValue(filterType)?.label}
			</button>
			{/* Conteúdo do dropdown */}
			{isOpen && (
				<div className="absolute z-10 mt-2 w-40 h-60 overflow-y-auto bg-white rounded-md shadow-md border border-gray-200 scroll-smooth md:scroll-auto">
					{options.map((option) => (
						<div key={option.value} onClick={() => handleTypeSelect(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
							<div className="flex items-center justify-end mr-3 h-full">
								<img className="w-5 self-center h-auto" src={option.icon} alt="Imagem" />
							</div>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
