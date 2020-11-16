import axios from "axios";

const baseUrl = "https://letsdoit-moody-web.azurewebsites.net/"



export default {

    category(url = baseUrl ) {
        return {
            getCategories: () => axios.get(url + 'list'),
            createCategory: newRecord => axios.post(url, newRecord),
            updateCategoy: (id, updateRecord) => axios.put(url + id, updateRecord),
            deleteCategory: id => axios.delete(url + id)
        }
    }
}