const signbtn = document.getElementById('signbtn')

signbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameid').value
    const email = document.getElementById('emailid').value
    const password = document.getElementById('passid').value

    const signup ={
        name: name,
        email: email,
        password: password
    }

    axios.post("http://localhost:5000/detail/signup", signup)
        
      .then(response => {
         // console.log(response)
         alert('Signed Up Successfully');
         // window.location = 'loginpage.html';
      })
      .catch(err => {
         // alert(err)
         console.log(err)
      })
})


function loginfunc(e){
   e.preventDefault();

   const email = document.getElementById('emailid').value
   const password = document.getElementById('passid').value

   const login = {
      email: email,
      password: password
   }


}