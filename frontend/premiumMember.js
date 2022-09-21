



window.addEventListener('DOMContentLoaded', (id) =>{
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/expenseDetail/getallexpenses`, {headers: {"Authorization": token}})
        .then(result => {
            console.log(result.data)
                showDetail(result)
            console.log(result.data)
        })
        .catch(err => {
            console.log(err)
        })
})

function showDetail(result) {
    const parentElement = document.getElementById('getexpn')
    for(let i=0; i< result.data.result.length; i++){
    const childElement = `<ul id="domid">  ${result.data.result[i].amount} -------------- ${result.data.result[i].description} -------------- ${result.data.result[i].category} ------------ ${result.data.result[i].userId}  </ul> `
    parentElement.innerHTML += childElement
    console.log(result.data.result[i].id)
    }
}



const back = document.getElementById('back')
back.addEventListener('click', () => {
    window.location = "expense.html"
})