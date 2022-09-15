const loginbtn = document.getElementById('loginbtn')

loginbtn.addEventListener('click', (e) => {

    e.preventDefault();
    
    const email = document.getElementById('emailid').value
    const password = document.getElementById('passid').value
    
    const logindetails = {
       email: email,
       password: password
    }
    
    axios.post("http://localhost:5000/detail/login" , logindetails)
    .then(response => {
            alert(response.data.message)
            console.log(response)
    })
    .catch(err => {
        // alert(err)
        console.log(err)
        document.body.innerHTML += `<div> ${err.message} <div/>`
    })
})