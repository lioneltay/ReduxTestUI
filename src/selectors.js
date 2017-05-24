/*

const initialState = {
	shop: null,
	items: {
		byIds: {},
		allIds: [],
	},
	categories: {
		byIds: {},
		allIds: [],
	},
}

*/

const selectors = {}

selectors.shop = (state) => state.shop.shop

selectors.itemById = (state, id) => state.items.byIds[id]
selectors.allItemIds = (state) => state.items.allIds
selectors.allItems = (state) => state.items.allIds.map(id => itemById(state, id))

selectors.categoryById = (state, id) => state.categories.byIds[id]
selectors.allCategoryIds = (state) => state.categories.allIds
selectors.allCategories = (state) => state.categories.allIds.map(id => categoryById(state, id))

export default selectors