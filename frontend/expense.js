const btn = document.getElementById('btn');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value

    const expensedetail = {
        amount: amount,
        description: description,
        category: category
    }

    const token = localStorage.getItem('token');
    axios.post("http://localhost:5000/expenseDetail/expense", expensedetail, { headers: {"Authorization" : token} })
        .then(result => {
            alert("expense added")
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
})

document.addEventListener('DOMContentLoaded', () =>{
    const token = localStorage.getItem('token');
    axios.get("http://localhost:5000/expenseDetail/getexpense", {headers: {"Authorization": token}})
        .then(result => {
            
            // const parentElement = document.getElementById('getexpn')
            // for(let i=0; i< result.data.result.length; i++){
                // parentElement.innerHTML += `<li id="domid"> expense - ${result.data.result[i].amount} - ${result.data.result[i].description} - ${result.data.result[i].category}  </li>`
                showDetail(result)
            // }
            console.log(result.data)
        })
        .catch(err => {
            console.log(err)
        })
})

function showDetail(result) {
    const parentElement = document.getElementById('getexpn')
    for(let i=0; i< result.data.result.length; i++){
    const childElement = `<li id="domid"> expense ${result.data.result[i].id} - ${result.data.result[i].amount} - ${result.data.result[i].description} - ${result.data.result[i].category} <button onclick="deleteExpense(${result.data.result[i].id})"> Delete </button> </li> `
    parentElement.innerHTML += childElement
    console.log(result.data.result[i].id)
    }
}


function deleteExpense(id) {
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:5000/expenseDetail/deleteexpense/${id}`, {headers: {"Authorization": token}})
    .then(response => {
        if(response.status === 204){
            removeFromScreen(id)
        }
        else{
            throw new Error('failed to dlete')
        }
    })
    .catch(err => {
        showError(err)
        // console.log("Oh No! What i did?")
    })
}


function removeFromScreen(id){
    const domid = `expense - ${id}`;
    document.getElementById(domid).remove();
}

function showError(err){
    document.body.innerHTML += `<div style="color:red"> ${err} </div>`
}