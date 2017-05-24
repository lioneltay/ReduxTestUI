// HELPER FUNCTION
import {reduxFetchTrio, asyncTypes, 
	createReducer, actionLoggerHandler} from 'reduxHelpers'
// import fp from 'helpers/mydash'


/*

getShop(orgId) X
createShop(orgId, data) X
updateShop(orgId, data) X
deleteShop(orgId) X

getShopCategoryItems(orgId, catId) // items of category
createShopItem(orgId, catId, data)
updateShopItem(orgId, itemId, data)
deleteShopItem(orgId, itemId)

getRootCategories(orgId)
getSubCategory(orgId, parentCatId)

createShopCategory(orgId, data, [parentId])
updateShopCategory(orgId, catId, data)
deleteShopCategory(orgId, catId)


== FUTURE/EVOLVING API
getShopItems(orgId) // all items for searching evolving api
getAllCategories(orgId) // returns full nested tree structure of categories


===== SAMPLE REDUX STORE
category {
	// IDS
	"itemIds": []
	"subCategoryIds": []
	"parentCategoryId": 0
	"id": 0,

	// DATA FIELDS
	"name": "string",
  "description": "string",  
  "organisationId": 0,
}

item {
	// IDS
	"categoryIds": [],
	"id": 0,

	// DATA FIELDS
	"name": "string",
	"description": "string",
	"price": 0,
	"published": true,
	"archived": true,
}

*/

const GET_SHOP = asyncTypes('GET_SHOP')
const CREATE_SHOP = asyncTypes('CREATE_SHOP')
const UPDATE_SHOP = asyncTypes('UPDATE_SHOP')
const DELETE_SHOP = asyncTypes('DELETE_SHOP')

const GET_CATEGORY_ITEMS = asyncTypes('GET_CATEGORY_ITEMS')
const GET_SUB_ITEMS = asyncTypes('GET_SUB_ITEMS')
const CREATE_ITEM = asyncTypes('CREATE_ITEM')
const UPDATE_ITEM = asyncTypes('UPDATE_ITEM')
const DELETE_ITEM = asyncTypes('DELETE_ITEM')

const GET_ROOT_CATEGORIES = asyncTypes('GET_ROOT_CATEGORIES')
const GET_SUB_CATEGORIES = asyncTypes('GET_SUB_CATEGORIES')
const CREATE_CATEGORY = asyncTypes('CREATE_CATEGORY')
const UPDATE_CATEGORY = asyncTypes('UPDATE_CATEGORY')
const DELETE_CATEGORY = asyncTypes('DELETE_CATEGORY')

export const getShop = (orgId) => ({
	types: GET_SHOP.ARRAY,
	promise: (client) => client.get(`/api/core-organisations/${orgId}/shop`),
})

export const createShop = (orgId, shopData) => ({
	types: CREATE_SHOP.ARRAY,
	promise: (client) => client.post(`/api/core-organisations/${orgId}/shop`, { 
		data: {
			...shopData,
		}
	})
})

// non-destructive update
export const updateShop = (orgId, shopData) => ({
	types: UPDATE_SHOP.ARRAY,
	promise: (client) => client.put(`/api/core-organisations/${orgId}/shop`, {
		data: {
			...shopData,
		}
	})
})

export const deleteShop = (orgId) => ({
	types: DELETE_SHOP.ARRAY,
	promise: (client) => client.del(`/api/core-organisations/${orgId}/shop`)
})

// getShopCategoryItems(orgId, catId) // items of category
export const getCategoryItems = (orgId, catId) => ({ type: GET_CATEGORY_ITEMS.SUCCESS})
// createShopItem(orgId, catId, data)
export const createItem = (orgId, catId, data) => ({ type: CREATE_ITEM.SUCCESS})
// updateShopItem(orgId, itemId, data)
export const updateItem = (orgId, itemId, data) => ({ type: UPDATE_ITEM.SUCCESS})
// deleteShopItem(orgId, itemId)
export const deleteItem = (orgId, itemId) => ({ type: DELETE_ITEM.SUCCESS})

// getRootCategories(orgId)
export const getRootCategories = (orgId) => ({ type: GET_CATEGORIES.SUCCESS })
// getSubCategory(orgId, parentCatId)
export const getSubCategories = (orgId, parentId) => ({ type: GET_CATEGORIES.SUCCESS })
// createShopCategory(orgId, data, [parentId])
export const createCategory = (orgId, catData, parentId) => ({ type: CREATE_CATEGORY.SUCCESS })
// updateShopCategory(orgId, catId, data)
export const updateCategory = (orgId, catId, catData) => ({ type: UPDATE_CATEGORY.SUCCESS })
// deleteShopCategory(orgId, catId)
export const deleteCategory = (orgId, catId) => ({ type: DELETE_CATEGORY.SUCCESS })








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

const shopHandlers = {}

shopHandlers[GET_SHOP.PENDING] = actionLoggerHandler
shopHandlers[GET_SHOP.SUCCESS] = (state, action) => ({ ...state, shop: action.result })
shopHandlers[GET_SHOP.FAIL] = actionLoggerHandler

shopHandlers[CREATE_SHOP.PENDING] = actionLoggerHandler
shopHandlers[CREATE_SHOP.SUCCESS] = (state, action) => ({ ...state, shop: action.result })
shopHandlers[CREATE_SHOP.FAIL] = actionLoggerHandler

shopHandlers[UPDATE_SHOP.PENDING] = actionLoggerHandler
shopHandlers[UPDATE_SHOP.SUCCESS] = (state, action) => ({ ...state, shop: action.result })
shopHandlers[UPDATE_SHOP.FAIL] = actionLoggerHandler

shopHandlers[DELETE_SHOP.PENDING] = actionLoggerHandler
shopHandlers[DELETE_SHOP.SUCCESS] = (state, action) => ({ ...state, shop: null })
shopHandlers[DELETE_SHOP.FAIL] = actionLoggerHandler

const itemHandlers = {}

itemHandlers[GET_CATEGORY_ITEMS.SUCCESS] = actionLoggerHandler
itemHandlers[CREATE_ITEM.SUCCESS] = actionLoggerHandler
itemHandlers[UPDATE_ITEM.SUCCESS] = actionLoggerHandler
itemHandlers[DELETE_ITEM.SUCCESS] = actionLoggerHandler

const categoryHandlers = {}

categoryHandlers[GET_ROOT_CATEGORIES.SUCCESS] = actionLoggerHandler
categoryHandlers[GET_SUB_CATEGORIES.SUCCESS] = actionLoggerHandler
categoryHandlers[CREATE_CATEGORY.SUCCESS] = actionLoggerHandler
categoryHandlers[UPDATE_CATEGORY.SUCCESS] = actionLoggerHandler
categoryHandlers[DELETE_CATEGORY.SUCCESS] = actionLoggerHandler


const handlers = { ...shopHandlers, ...itemHandlers, ...categoryHandlers }
export default createReducer(initialState, handlers)























// /*
// // CATEGORY STUFF

// // GET_SHOP_CAT getShopCat(id, shopid, catid)
// const GET_SHOP_CAT = 'GET_SHOP_CAT'
// const GET_SHOP_CAT_SUCCESS = 'GET_SHOP_CAT_SUCCESS'
// const GET_SHOP_CAT_FAIL = 'GET_SHOP_CAT_FAIL'

// // CREATE_SHOP_CAT createShopCat(id, shopid, data)
// const CREATE_SHOP_CAT = 'CREATE_SHOP_CAT'
// const CREATE_SHOP_CAT_SUCCESS = 'CREATE_SHOP_CAT_SUCCESS'
// const CREATE_SHOP_CAT_FAIL = 'CREATE_SHOP_CAT_FAIL'

// // UPDATE_SHOP_CAT updateShopCat(id, catid, data)
// const UPDATE_SHOP_CAT = 'UPDATE_SHOP_CAT'
// const UPDATE_SHOP_CAT_SUCCESS = 'UPDATE_SHOP_CAT_SUCCESS'
// const UPDATE_SHOP_CAT_FAIL = 'UPDATE_SHOP_CAT_FAIL'

// // REMOVE_SHOP_CAT removeShopCat(id, catid)
// const REMOVE_SHOP_CAT = 'REMOVE_SHOP_CAT'
// const REMOVE_SHOP_CAT_SUCCESS = 'REMOVE_SHOP_CAT_SUCCESS'
// const REMOVE_SHOP_CAT_FAIL = 'REMOVE_SHOP_CAT_FAIL'

// // UPDATE_SHOP_CAT updateShopCat(shopId, catId, catData)
// export const updateShopCat = (orgId, catid, data) => ({
// 	types: reduxFetchTrio(UPDATE_SHOP_CAT),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/updateShopCat`, { 
// 		data: { 
// 			id: orgId, 
// 			catid,
// 			data: data
// 		}
// 	})
// })


// // REMOVE_SHOP_CAT removeShopCat(orgId, catid)
// export const removeShopCat = (orgId, catid) => ({
// 	types: reduxFetchTrio(REMOVE_SHOP_CAT),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/removeShopCat`, {
// 		data: {
// 			id: orgId,
// 			catid,
// 		}
// 	})
// })
// */



// // GET_SHOP_CAT getShopCat(orgId, shopId, catId)
// const getShopCat = (orgId, shopId, catId) => ({
// 	types: reduxFetchTrio(GET_SHOP_CAT),
// 	promise: (client) => client.get(`/api/core-organisations/${orgId}/getShopCat`, {
// 		data: {
// 			id: orgId,
// 			shopid: shopId,
// 			catid: catId,
// 		}
// 	}),
// })

// // CREATE_SHOP_CAT createShopCat(shopId)
// export const createShopCat = (orgId, shopid, data) => ({
// 	types: reduxFetchTrio(CREATE_SHOP_CAT),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/createShopCat`, { 
// 		data: {
// 			id: orgId,
// 			shopid,
// 			data,
// 		},
// 	})
// })







// // ARCHIVE_ITEM archiveItem(id, shopid, itemid)
// export const archiveItem = (orgId, shopid, itemid) => ({
// 	types: reduxFetchTrio(ARCHIVE_ITEM),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/archiveItem`, {
// 		data: {
// 			id: orgId,
// 			shopid,
// 			itemid,
// 		}
// 	})
// })


// // GET_ITEM getItem(id, shopid, itemid)
// const getItem = (orgId, shopid, itemid) => ({
// 	types: reduxFetchTrio(GET_ITEM),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/getItem`, {
// 		data: {
// 			id: orgId,
// 			shopid,
// 			itemid,
// 		}
// 	})
// })

// // CREATE_ITEM createItem(id, shopid, catid, data)
// export const createItem = (orgId, shopid, catid, data) => ({
// 	types: reduxFetchTrio(CREATE_ITEM),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/createItem`, {
// 		data: {
// 			id: orgId,
// 			shopid,
// 			catid,
// 			data,
// 		}
// 	})
// })

// // UPDATE_ITEM createItem(id, shopid, catid, data)
// export const updateItem = (orgId, shopid, itemid, data) => ({
// 	types: reduxFetchTrio(CREATE_ITEM),
// 	promise: (client) => client.post(`/api/core-organisations/${orgId}/updateItem`, {
// 		data: {
// 			id: orgId,
// 			shopid,
// 			itemid,
// 			data,
// 		}
// 	})
// })



// // ==========
// // REDUCER
// // ==========






// const initialShopsState = {
// 	cart: {
// 		currentItems: []
// 	},
// 	currentShop: null,
// 	shopList: {
// 		published: [],
// 		nonPublished: [],
// 	},
// 	categories: [],
// }


// function shopsReducer(state = initialShopsState, action) {
// 	switch (action.type) {
// 		case GET_SHOPS:
// 			return {
// 				...state,
// 			}
// 		case GET_SHOPS_SUCCESS:
// 			// TODO MAKE GET SHOPS NOT OVERWRITE, BUT UPDATE EXISTING SHOPS AND REMOVE SHOPS
// 			return {
// 				...state,
// 				shopList: {
// 					published: [
// 						...action.result.filter(shop => shop.published)
// 					],
// 					nonPublished: [
// 						...action.result.filter(shop => !shop.published)
// 					]
// 				}
// 			}
// 		case GET_SHOPS_FAIL:
// 			return {
// 				...state,
// 			}
		
			
// 		case GET_SHOP:
// 			return {
// 				...state,
// 			}
// 		case GET_SHOP_SUCCESS: {
// 			const result = action.result
//       const shopCategory = result.published ? 'published' : 'nonPublished'
//       const otherCategory = !result.published ? 'published' : 'nonPublished'
//       let shopList = state.shopList[shopCategory].slice()
      
//       return {
//         ...state,
//         currentShop: action.result, 
//         shopList: {
//           ...state.shopList,
//           [shopCategory]: fp.findAndReplace(v => v.id === result.id, result, shopList),
//           [otherCategory]: state.shopList[otherCategory].filter(v => v.id !== result.id),
//         }
//       }
// 		}
// 		case GET_SHOP_FAIL:
// 			return {
// 				...state,
// 				currentShop: null,
// 			}
// 		default:
// 			return state
// 	}
// }





// /*


// -category nav bar

// -item block list display
// 	-left sidebar with filter, subcategories

// -item detail
// 	-slideshow or images
// 	-price and qty and add to cart display
// 	-tabs description / reviews

// -Cart view
// 	-thumbnail
// 	-product
// 	-quantity
// 	-price


// */








