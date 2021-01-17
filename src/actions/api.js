import axios from "axios";

const baseUrl = "http://localhost:1234/api/category/list"



export default {

    category(url = baseUrl ) {
        return {
            getCategories: () => axios.get(url),
            createCategory: newRecord => axios.post(url , newRecord),
            updateCategory: (id, updateRecord) => axios.put(url + id, updateRecord),
            deleteCategory: id => axios.delete(url + id)
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