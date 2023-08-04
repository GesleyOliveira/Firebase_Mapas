const firebaseConfig = {
    apiKey: "AIzaSyDf5Dy43jcv_hTgvGq5mc5filht7pBM27A",
    authDomain: "oliveira-mapa.firebaseapp.com",
    databaseURL: "https://oliveira-mapa-default-rtdb.firebaseio.com",
    projectId: "oliveira-mapa",
    storageBucket: "oliveira-mapa.appspot.com",
    messagingSenderId: "962133620260",
    appId: "1:962133620260:web:f0638f9dab297256b9cab1"
  };

  //Inicializando o Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const urlApp = 'http://127.0.0.1:5500';

  function loginGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then((result) => {
        window.location.href = `${urlApp}/home.html`
    }).catch((error) =>{
    alert(`Erro ao efetuar o login ${error.message}`)
    })
  }

  function verificaLogado(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        //Salvamos o id do user localmente
        localStorage.setItem('usuarioId', user.uid)
        //Inserindo a imagem do usuário 
        let imagem = document.getElementById('imagemUsuario')

        user.photoURL ? imagem.innerHTML +=
        `<img src="${user.photoURL}" alt="Foto do usuário" title="${user.displayName}" class="img
        rounded-circle" width="48" />`
        : `<img src="images/logo-google.svg"
        class="img rounded-circle" width="48" />`
        } else {
        window.location.href = `${urlApp}/`
      }
    })
  }
  function logoutFirebase(){
  firebase.auth().signOut().then(function(){
    localStorage.removeItem('usuarioId')
    window.location.href = `${urlApp}/`
  })
  .catch(function(error){
    alert(`Não foi possível fazer o logout: ${error.message}`)
  })
}

async function salvaEstabelecimento(estabelecimento){
  let usuarioAtual = firebase.auth().currentUser

  return await firebase.database().ref('estabelecimentos').push({
    ...estabelecimento, 
    usuarioInclusao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName
    }
  }).then(()=>{
    alert('Registro incluído com sucesso!')
    //limpa o form
    document.getElementById('formCadastro').reset()
  }).catch(error => {
    alert(`Erro ao salvar: ${error.message}`)
  })
}