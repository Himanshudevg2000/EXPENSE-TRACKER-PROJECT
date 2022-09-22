const token = localStorage.getItem('token')
const dailyList = document.getElementsByClassName('dailylist')

window.addEventListener('DOMContentLoaded', async (e)=>{
    let user = await axios.get('http://localhost:5000/expenseDetail/getallexpenses', { headers: {"Authorization" : token} })
    
    console.log(user.data.result)
    let dailyExpenses = await axios.get('http://localhost:5000/expenseDetail/getDailyExpenses', { headers: {"Authorization" : token} })
    
    let dailyArray = dailyExpenses.data
    console.log(dailyArray)
    
    const amount = document.getElementById('amount')
    const description = document.getElementById('description')
    const category = document.getElementById('category')
    const createdAt = document.getElementById('createdat')
    const userId = document.getElementById('userid')


    for(let i=0; i<dailyArray.length; i++){
        amount.innerHTML +=  `<ul> ${dailyArray[i].amount}  </ul>`
        description.innerHTML += `<ul>  ${dailyArray[i].description} </ul>`
        category.innerHTML += `<ul> ${dailyArray[i].category} </ul>`
        createdAt.innerHTML += `<ul> ${dailyArray[i].createdAt.slice(0,10)} </ul>`
        userId.innerHTML += `<ul> ${dailyArray[i].userId} </ul>`
    }

    

    let weeklyExpenses = await axios.get('http://localhost:5000/expenseDetail/getWeeklyExpenses', { headers: {"Authorization" : token} })

    let weeklyArray = weeklyExpenses.data
    console.log(weeklyExpenses.data)

    const amount1 = document.getElementById('amount1')
    const description1 = document.getElementById('description1')
    const category1 = document.getElementById('category1')
    const createdAt1 = document.getElementById('createdat1')
    const userId1 = document.getElementById('userid1')


    for(let i=0; i<weeklyArray.length; i++){
            amount1.innerHTML +=  `<ul> ${weeklyArray[i].amount}  </ul>`
            description1.innerHTML += `<ul>  ${weeklyArray[i].description} </ul>`
            category1.innerHTML += `<ul> ${weeklyArray[i].category} </ul>`
            createdAt1.innerHTML += `<ul> ${weeklyArray[i].createdAt.slice(0,10)} </ul>`
            userId1.innerHTML += `<ul> ${weeklyArray[i].userId} </ul>`
    }
    

})


const back = document.getElementById('backbtn')
back.addEventListener('click', ()=> {
    window.location = 'expense.html'
})