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

window.addEventListener('DOMContentLoaded', () =>{
    const token = localStorage.getItem('token');
    axios.get("http://localhost:5000/expenseDetail/getexpense", {headers: {"Authorization": token}})
        .then(result => {
            console.log(result.data)
            // const parentElement = document.getElementById('getexpn')
            // for(let i=0; i< result.data.result.length; i++){
                // parentElement.innerHTML += `<li id="domid"> expense - ${result.data.result[i].amount} - ${result.data.result[i].description} - ${result.data.result[i].category}  </li>`
                // }
                showDetail(result)
                if(result.data.user.ispremiumuser){
                    document.getElementById('body').classList.add('premium')
                    document.getElementById('premium-membership').remove()
                    document.querySelector('.container').classList.add('premium')
                    document.getElementById('h1').classList.add('premium')
                    document.getElementById('deletebtn').classList.add('premium')
                   
                    document.body.innerHTML += '<button id="allexpn"> All expenses</button>'
                    const allexpn = document.getElementById('allexpn')

                    allexpn.addEventListener('click', () => {
                        if(confirm("are u sure")){
                            window.location = 'premiumMember.html'
                        }
                    })

                    const logout = document.getElementById('logoutbtn')

                    logout.addEventListener('click', () => {
                        if(confirm("do u really want to logout")){
                            window.location = 'signup.html'
                        }
                    })

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
                }
                
            console.log(result.data)
        })
        .catch(err => {
            console.log(err)
        })
})

function showDetail(result) {
    const parentElement = document.getElementById('getexpn')
    for(let i=0; i< result.data.result.length; i++){
    const childElement = `<ul id="domid">  ${result.data.result[i].amount} - ${result.data.result[i].description} - ${result.data.result[i].category} <button id="deletebtn" onclick="deleteExpense(${result.data.result[i].id})"> Delete </button> </ul> `
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

// const prembtn = document.getElementById('premium-membership')
// prembtn.addEventListener('click', (e) => {
//     const token = localStorage.getItem('token')
//     axios.get('http://localhost:5000/purchase/premiummembership', { headers: {"Authorization" : token} })
//     .then(response => {

//         console.log(response);
//         var options =
//     {
//      "key": 'rzp_test_krYxAdG23WH3Ob',
//      "name": "Test Company",
//      "order_id": response.data.order.id,
//      "prefill": {
//          "name": "Test User",
//          "email": "test.user@example.com",
//          "contact": "7003442036"
//         },
//         "theme": {
//             "color": "#3399cc"
//         },
        
//         "handler": function (response) {
//             console.log(response);
//             axios.post('http://localhost:5000/purchase/updatetransactionstatus',{
//                 order_id: options.order_id,
//                 payment_id: response.razorpay_payment_id,
//             }, { headers: {"Authorization" : token} })
//             .then(() => {
//                 alert('You are a Premium User Now')
//             }).catch(() => {
//                 alert('Something went wrong. Try Again!!!')
//             })
//         },
//     };
// })
//     const rzp1 = new Razorpay(options);
//     rzp1.open();
//     e.preventDefault();
    
//     rzp1.on('payment.failed', function (response){
// //         alert(response.error.code);
// //         alert(response.error.description);
// //         alert(response.error.source);
// //         alert(response.error.step);
// //         alert(response.error.reason);
// //   alert(response.error.metadata.order_id);
// //   alert(response.error.metadata.payment_id);
// console.log(response)
//  });
// })


document.getElementById('premium-membership').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:5000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id,
     "name": "Test Company",
     "order_id": response.data.order.id,
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:5000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
             document.getElementById('body').classList.add('premium')
             document.getElementById('premium-membership').remove()
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


const logout = document.getElementById('logoutbtn')

logout.addEventListener('click', () => {
    if(confirm("do u really want to logout")){
        window.location = 'signup.html'
    }
})