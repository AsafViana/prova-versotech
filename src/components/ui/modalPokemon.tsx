import { TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody } from 'tw-elements-react'
import { PokemonDetails } from '../../redux/types'
import { useEffect, useState } from 'react'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import 'tw-elements-react/dist/css/tw-elements-react.min.css'
import { Separator } from './separator'
import { isMobile } from 'react-device-detect'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'

interface MoreDetailsModalProps {
	isOpen: boolean
	onClose: (params: boolean) => void
	data: PokemonDetails
}

type ColorTypes = {
	[key: string]: string
}

export const MoreDetailsModal: React.FC<MoreDetailsModalProps> = ({ isOpen, onClose, data }) => {
	const [currentImage, setCurrentImage] = useState('')
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

	useEffect(() => {
		const loadImage = (imageUrl: string) => {
			const img = new Image()
			img.onload = () => setCurrentImage(imageUrl)
			img.onerror = () => loadAlternativeImage(data?.altImage)
			img.src = imageUrl
		}

		const loadAlternativeImage = (alternativeImageUrl: string | undefined) => {
			if (alternativeImageUrl) {
				const altImg = new Image()
				altImg.onload = () => setCurrentImage(alternativeImageUrl)
				altImg.onerror = () => setCurrentImage('https://raw.githubusercontent.com/gist/Galadirith/baaf38c7286b568973cc50a50ff57f4d/raw/34d60cae491bc505c212398b94f12705665c12fc/pokeball.svg')
				altImg.src = alternativeImageUrl
			} else {
				setCurrentImage('https://raw.githubusercontent.com/gist/Galadirith/baaf38c7286b568973cc50a50ff57f4d/raw/34d60cae491bc505c212398b94f12705665c12fc/pokeball.svg')
			}
		}

		loadImage(data?.image)

		return () => {
			setCurrentImage('')
		}
	}, [data?.image, data?.altImage])

	if (!isOpen) {
		return null
	}

	return (
		<TEModal show={isOpen} setShow={onClose} className="bg-slate-700 bg-opacity-50 backdrop-blur-sm">
			<TEModalDialog>
				<TEModalContent>
					<TEModalHeader className="bg-transparent flex flex-row-reverse">
						<button type="button" className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" onClick={() => onClose(false)} aria-label="Close">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</TEModalHeader>
					<TEModalBody className="flex flex-col justify-center items-center w-full overflow-hidden mb-8">
						<div className={`flex items-center justify-center rounded-full object-cover`}>
							<img className={`${isMobile ? 'w-24' : 'w-48'} self-center h-auto pt-3`} src={currentImage} alt="Imagem" />
						</div>
						<Separator className="my-4 bg-slate-400" />
						<div className="flex flex-col space-y-6 justify-center items-center">
							<div className="flex">
								<h2 className="text-2xl font-bold mr-2">
									{data?.name
										.split(' ')
										.map((l: string) => l[0].toUpperCase() + l.substr(1))
										.join(' ')}{' '}
								</h2>
								#{data?.id}
							</div>
							<div className="flex space-x-2 pb-4">
								{data?.types.map((type, index) => (
									<Badge key={index} className={colorTypes[type?.type.name]} variant="outline">
										{type?.type.name
											.split(' ')
											.map((l: string) => l[0].toUpperCase() + l.substr(1))
											.join(' ')}
									</Badge>
								))}
							</div>

							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[100px]">Height</TableHead>
										<TableHead>Weight</TableHead>
										<TableHead>Abilities</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">{data?.height / 10}m</TableCell>
										<TableCell className="font-medium">{data?.weight / 10}kg</TableCell>
										<TableCell className="font-medium">
											{data?.abilities.map((abilitie, index) => (
												<p key={index}>
													{abilitie.ability.name
														.split(' ')
														.map((l: string) => l[0].toUpperCase() + l.substr(1))
														.join(' ')}
												</p>
											))}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>

							<div className="flex flex-col w-full h-full space-y-4 text-sm">
								{data?.stats.map((stat, index) => (
									<div key={index}>
										<p className="text-gray-500 mb-1">
											{stat?.stat.name
												.replace('-', ' ')
												.split(' ')
												.map((l: string) => l[0].toUpperCase() + l.substr(1))
												.join(' ')}
										</p>
										<p className="text-lg">{stat?.base_stat}</p>
										<Progress value={(stat?.base_stat / 255) * 100} className="h-4" max={10} />
									</div>
								))}
							</div>
						</div>
					</TEModalBody>
				</TEModalContent>
			</TEModalDialog>
		</TEModal>
	)
}
