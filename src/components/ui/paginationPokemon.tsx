import React, { useState, useEffect } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from './pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../redux/features/pokemon/pokemonResumeSlice'
import { previousPage, nextPage } from '../../redux/features/pagination/paginationSlice';
import { isMobile } from 'react-device-detect';
import { RootState } from '../../app/store';


const PaginationPokemon = () => {
    // Estado local para controlar se o botão de página anterior está desativado
    const [previousIsDisabled, setPreviousIsDisabled] = useState(true);

    // Hook useDispatch para despachar ações Redux
    const dispatch = useDispatch();

    // Seleciona a página atual do estado global Redux
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);

    // Função para lidar com o clique no botão de próxima página
    const handleNextPage = () => {
        // Despacha ação para ir para a próxima página
        dispatch(nextPage({ isMobile: isMobile, callback: setPreviousIsDisabled }));
        // Define o status como 'idle'
        dispatch(setStatus('idle'));
    };

    // Função para lidar com o clique no botão de página anterior
    const handlePreviousPage = () => {
        // Despacha ação para ir para a página anterior
        dispatch(previousPage(setPreviousIsDisabled));
        // Define o status como 'idle'
        dispatch(setStatus('idle'));
    };

    // Efeito para atualizar o estado do botão de página anterior com base na página atual
    useEffect(() => {
        if (currentPage >= 1) {
            setPreviousIsDisabled(false);
        } else {
            setPreviousIsDisabled(true);
        }
    }, [currentPage]);

    return (
        <Pagination className="pt-7">
            <PaginationContent>
                <PaginationItem>
                    {/* Renderiza o botão de página anterior se não estiver desativado */}
                    {previousIsDisabled ? (
                        <></>
                    ) : (
                        <PaginationPrevious onClick={handlePreviousPage} />
                    )}
                </PaginationItem>
                <PaginationItem>
                    {/* Renderiza o botão de próxima página */}
                    <PaginationNext onClick={handleNextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationPokemon;
