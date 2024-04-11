import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setStatus } from '../pokemon/pokemonResumeSlice'

interface PaginationState {
	currentPage: number,
	itemsPerPageDesktop: number,
	itemsPerPageMobile: number,
	items: number
}

const initialState: PaginationState = {
	currentPage: 0,
	itemsPerPageDesktop: 16,
	itemsPerPageMobile: 6,
	items: 0
}

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		nextPage(state, action: PayloadAction<{isMobile: boolean, callback: Function}>) {
			state.currentPage += state.currentPage < state.items / (action.payload.isMobile ? state.itemsPerPageMobile : state.itemsPerPageDesktop) ? 1 : 0
		},
		previousPage(state, action: PayloadAction<Function>) {
			if (state.currentPage >= 1) {
				state.currentPage -= 1
				action.payload(false)
			} else {
				action.payload(true)
			}
		},
		goToPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setItemsCount(state, action: PayloadAction<number>) {
			state.items = action.payload

		},
	},
})


export const { nextPage, previousPage, goToPage, setItemsCount } = paginationSlice.actions

export default paginationSlice.reducer
