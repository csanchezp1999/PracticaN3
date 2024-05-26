
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

const firebaseConfig = {
    apiKey: "AIzaSyAVrLGOW66TGrWGbFWcMae5fLEYYrxkhOg",
    authDomain: "practica-3-a0cc6.firebaseapp.com",
    projectId: "practica-3-a0cc6",
    storageBucket: "practica-3-a0cc6.appspot.com",
    messagingSenderId: "169935133945",
    appId: "1:169935133945:web:e2cd3e81c06226c8339628"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const reviews = "reviews";


// envio info a firebase
function addReviews(){
    const $ciudad = document.getElementById("ciudad").value
    const $pais = document.getElementById("pais").value
    const $fecha = document.getElementById("fecha").value
    const $infoExtra = document.getElementById("infoExtra").value   
    const loader = document.getElementById("loader")
    const msg_confirmacion=document.getElementById("msg-confirmacion")
    const boton_enviar = document.getElementById("divbutton")

    db.collection(reviews).add({
            Ciudad: $ciudad,
            Pais: $pais,
            Fecha: $fecha,
            ExtraInfo: $infoExtra,
            })
            .then((docRef) => {
              //  meto un efecto como para mostrar que envio info y hay un server detrás cargando
                console.log("Document written with ID: ", docRef.id);
                loader.style.display='inline-block'
                botonEnviar.style.display='none'
                setTimeout(function() {
                   loader.style.display='none'
                }, 2000);
                setTimeout(function() {
                    msg_confirmacion.style.display='block'
                 }, 2300);
                 setTimeout(function() {
                    msg_confirmacion.style.display='none'
                    botonEnviar.style.display='inline'
                   
                 }, 4000);
                
                
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                loader.style.display ="none";
            });
            
}
//llamo a las funciones
function loadReviews(){
    db.collection(reviews).get().then((querySnapshot) => {
        drawReviews(querySnapshot);
    });
}



//función para pintar las reviews enviadas desde el form
function drawReviews(allreviews){
    const $list= document.getElementById("list")
    $list.innerHTML=""

    allreviews.forEach(reviews => {
      const reviewsDat = `
      <div class="col-lg-3 col-sm-4">
      <div class="card text-bg-info mb-3" style="max-width: 24rem;">
        <div class="card-header">${reviews.data().Pais} </div>
        <div class="card-header">Fecha: </div>
        <div class="card-body">
          <h5 class="card-title">${reviews.data().Ciudad}</h5>
          <p class="card-text">${reviews.data().ExtraInfo}</p>
        </div>  
        <div class="col">
          <div class="col-lg-2 col-sm-2 d-flex align-items-start m-3">
            <button type="button" class="btn btn-success" onclick="AgregarClick('${reviews.data().Ciudad}')">Agregar </button>
          </div>
          <div class="col-lg-1 col-sm-1 d-flex align-items-end m-3">
            <button type="button" class="btn btn-danger" onclick="QuitarClick('${reviews.data().Ciudad}')">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
      `
            $list.innerHTML += reviewsDat;
    });

};
var lugaresVi="lugaresvisitados";

function AgregarClick(ciudadV) {

  db.collection(lugaresVi).add({
    CiudadV:ciudadV,
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function QuitarClick(ciudad) {
  // Asumiendo que 'ciudadV' es el nombre de la ciudad que quieres eliminar
  var ciudadV = ciudad;
  var lugaresViRef = db.collection(lugaresVi);
  lugaresViRef.where('Ciudad', '==', ciudadV).get()
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      // Recorremos todos los documentos que coinciden con la consulta
      querySnapshot.forEach((doc) => {
        // Eliminamos cada documento encontrado
        lugaresViRef.doc(doc.id).delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      });
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });

}  

loadReviews()

function LOADpaisesV(){
  db.collection(lugaresVi).get().then((querySnapshot) => {
      PaisesViajados(querySnapshot);
  });
}

// función para pintar las paises viajados
function PaisesViajados(paisesV){
    const $list2= document.getElementById("list2")
    $list2.innerHTML=""
    paisesV.forEach(paisesViajados=>{
    const paisesData =  `<div class="col-lg-3 col-sm-4">
        <div class="card text-bg-info mb-3" style="max-width: 24rem;">
          <div class="card-header"></div>
          <div class="card-header"></div>
          <div class="card-body">
            <h5 class="card-title">He viajado a </h5>
            <p class="card-text">${paisesViajados.data().CiudadV}</p>
          </div>
        </div>
      </div> `
      $list2.innerHTML += paisesData;

   })

}

LOADpaisesV()