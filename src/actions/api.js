import axios from "axios";

const baseUrl = "https://letsdoit-moody-web.azurewebsites.net/"



export default {

    category(url = baseUrl ) {
        return {
            getCategories: () => axios.get(url + 'list'),
            createCategory: newRecord => axios.post(url + 'api/categories' , newRecord),
            updateCategory: (id, updateRecord) => axios.put(url + 'api/categories/' + id, updateRecord),
            deleteCategory: id => axios.delete(url + 'api/categories/' + id)
        }
    },

    categoryDetails(url = baseUrl ) {
        return {
            getCategories: (categoryId) => axios.get(url + categoryId + '/details'),
            createCategory: (categoryId ,newRecord) => axios.post(url + 'api/categories/' + categoryId + '/details', newRecord),
            updateCategory: (categoryId, detailsId, updateRecord) => axios.put(url + 'api/categories/' + categoryId + '/details/' + detailsId, updateRecord),
            deleteCategory: (categoryId, detailsId) => axios.delete(url + 'api/categories/' + categoryId + '/details/' + detailsId)
        }
    }
}