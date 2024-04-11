import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../../components/ui/card' // Importa os componentes de card

// Definição das propriedades esperadas pelo componente CardPokemon
interface CardPokemonProps {
	titlePokemon: string
	pokedexId?: number
	type: string
	image: string
	altImage: string
}

// Definição das propriedades do card com a base de componentes HTMLDivElement
interface CardPokemonWithBaseProps extends React.HTMLAttributes<HTMLDivElement>, CardPokemonProps {}

// Tipos para cores de acordo com o tipo do Pokémon
type ColorTypes = {
	[key: string]: string
}

// Componente principal do card Pokémon
export function CardPokemon(props: CardPokemonWithBaseProps) {
	// Extrai as propriedades necessárias do props
	const { titlePokemon, image, type, altImage, pokedexId, ...rest } = props

	// Estado para controlar se o card foi clicado
	const [isClicked, setIsClicked] = useState(false)

	// Estado para controlar a imagem atual do Pokémon
	const [currentImage, setCurrentImage] = useState('https://raw.githubusercontent.com/gist/Galadirith/baaf38c7286b568973cc50a50ff57f4d/raw/34d60cae491bc505c212398b94f12705665c12fc/pokeball.svg')

	// Definição das cores de acordo com o tipo do Pokémon
	const colorTypes: ColorTypes = {
		fighting: 'bg-red-300',
		flying: 'bg-sky-300',
		poison: 'bg-pink-300',
		ground: 'bg-[#a18072]',
		rock: 'bg-stone-300',
		bug: 'bg-green-300',
		ghost: 'bg-purple-300',
		steel: 'bg-slate-300',
		fire: 'bg-orange-300',
		water: 'bg-blue-300',
		grass: 'bg-lime-400',
		electric: 'bg-yellow-300',
		psychic: 'bg-violet-300',
		ice: 'bg-cyan-300',
		dragon: 'bg-indigo-300',
		dark: 'bg-zinc-300',
		fairy: 'bg-fuchsia-200',
		normal: 'bg-slate-300',
	}

	// Efeito para carregar a imagem atual ou alternativa
	useEffect(() => {
		const loadImage = async () => {
			try {
				const img = new Image()
				img.src = image
				await img.decode()
				setCurrentImage(image)
			} catch (error) {
				// Se houver erro ao carregar a imagem principal, usa a alternativa ou uma imagem padrão
				setCurrentImage(altImage || 'https://raw.githubusercontent.com/gist/Galadirith/baaf38c7286b568973cc50a50ff57f4d/raw/34d60cae491bc505c212398b94f12705665c12fc/pokeball.svg')
			}
		}
		loadImage()
	}, [image, altImage])

	// Funções de manipulação de eventos do mouse
	const handleMouseDown = () => setIsClicked(true)
	const handleMouseUp = () => setIsClicked(false)

	return (
		<Card
			className={`pt-7 justify-center items-center flex flex-col bg-gradient-to-tr from-slate-200 overflow-hidden shadow-lg transform ${isClicked ? 'scale-95' : 'scale-100'} transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			{...rest}>
			{/* Renderiza o cabeçalho do card com a imagem do Pokémon */}
			<CardTitle className={`flex items-center justify-center rounded-full object-cover w-24 h-24 ${colorTypes[type]}`}>
				<img className="w-14 self-center h-auto pt-3" src={currentImage} alt="Imagem" />
			</CardTitle>
			{/* Renderiza o conteúdo do card com o número do Pokémon e o nome formatado */}
			<CardContent className="px-0 flex flex-row items-center justify-around w-full mt-5 mb-2 space-4">
				<div>
					<CardDescription className="mt-1">{'#' + pokedexId}</CardDescription>
					<CardTitle style={{ whiteSpace: 'break-spaces' }} className="font-bold self-center justify-center text-lg md:text-xl lg:text-lg xl:text-xl truncate">
						{titlePokemon.replace(/-/g, ' ')}
					</CardTitle>
				</div>
				{/* Renderiza a imagem do tipo do Pokémon */}
				<img className="self-center pt-3" src={`https://codeboost.com.br/projetos/pokeapi/img/${type}.svg`} alt="Imagem" />
			</CardContent>
		</Card>
	)
}
