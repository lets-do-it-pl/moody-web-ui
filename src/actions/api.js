import axios from "axios";

const baseUrl = "https://letsdoit-moody-web.azurewebsites.net/"



export default {

    category(url = baseUrl ) {
        return {
            getCategories: () => axios.get(url + 'list'),
            createCategory: newRecord => axios.post(url + 'api/categories' , newRecord),
            updateCategoy: (id, updateRecord) => axios.put(url + 'api/categories/' + 'api/categories' + id, updateRecord),
            deleteCategory: id => axios.delete(url + 'api/categories/' + id)
        }
    }
}