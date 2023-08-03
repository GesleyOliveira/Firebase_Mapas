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
        localStorage.setItem('Usuário não logado!')
        } else {
        window.location.href = `${urlApp}/`
      }
    })
  }