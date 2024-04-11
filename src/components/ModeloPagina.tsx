import React from 'react'
import { isMobile } from 'react-device-detect'
import InputPokemon from './ui/inputPokemon'
import './ModeloPagina.css'
import { Dropdown } from './ui/dropdown'

interface ModeloProps {
	children: React.ReactNode
}

const Modelo: React.FC<ModeloProps> = ({ children }) => {
	return (
    // Container principal da página
    <div
      className={`min-h-screen min-w-full w-auto ${
        isMobile ? "px-5 flex flex-col" : "px-10"
      } pb-20 bg-red-800`}
    >
      {/* Cabeçalho */}
      <div
        className={`py-6 ${
          !isMobile
            ? "px-14 flex justify-between items-center"
            : "flex justify-center items-center"
        }`}
      >
        <img
          className="w-28 sm:grid-cols-2 lg:grid-cols-4"
          src="https://imgs.search.brave.com/J30LAB_SJ7NQoGwGkIZPJFHx_kIdxoUS_ZvV5hbbutk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/Lzk4L0ludGVybmF0/aW9uYWxfUG9rJUMz/JUE5bW9uX2xvZ28u/c3Zn.svg"
          alt="Logo"
        />
      </div>
      {/* Componente de entrada de Pokémon */}
      <InputPokemon />
      {/* Conteúdo principal da página */}
      <div>
        {/* Container do conteúdo principal */}
        <div
          className={`bg-white container ${
            isMobile ? "px-4" : ""
          } py-10 rounded-3xl overflow-auto`}
        >
          <div className="mb-10">
            <Dropdown />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modelo
