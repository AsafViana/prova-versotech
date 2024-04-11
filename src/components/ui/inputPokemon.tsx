import React, { useState } from 'react'
import { Input } from '../../components/ui/input'
import { useDispatch } from 'react-redux'
import { searchPokemonByName } from '../../redux/features/pokemon/pokemonResumeSlice'
import { isMobile } from 'react-device-detect'

const InputPokemon: React.FC = () => {
	// Estado local para armazenar a consulta de pesquisa
	const [query, setQuery] = useState<string>('') // Usando tipos explícitos em useState

	// Hook useDispatch para despachar a ação de pesquisa
	const dispatch = useDispatch()

	// Função para lidar com o evento de pesquisa
	const handleSearch = () => {
		dispatch(searchPokemonByName({ name: query }) as any)
	}

	// Função para lidar com o evento de pressionar tecla
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Se a tecla pressionada for Enter, realizar a pesquisa
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<>
			{/* Container flexível para posicionar o campo de pesquisa */}
			<div className={`w-full flex ${isMobile ? 'justify-center' : 'justify-end pr-5'} pb-10`}>
				{/* Container relativo para posicionar o ícone de pesquisa */}
				<div className="relative w-80">
					{/* Ícone de pesquisa SVG absoluto dentro do container relativo */}
					<svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-red-800 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					{/* Componente de entrada de texto para a pesquisa */}
					<Input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} className="pl-12 pr-4 rounded-full" />
				</div>
			</div>
		</>
	)
}

export default InputPokemon
