let email = document.querySelector('#email')
let emailOk = false

function validaEmail() {
    let txtEmail = document.querySelector('#txtEmail')

    if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1 ){
      txtEmail.innerHTML = 'E-mail inválido'
      txtEmail.style.color = 'red'
    } else {
      txtEmail.innerHTML = 'E-mail válido'
      txtEmail.style.color = 'green'
      emailOk = true
    }
  }