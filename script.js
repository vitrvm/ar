window.onload = () => {
    var places = []
    navigator.geolocation.getCurrentPosition(success, error, options);
    renderPlaces(places);
};

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function success(pos) {
    var crd = pos.coords;
    places = [
        {
            name: 'Magnemite',
            location: {
                lat: crd.latitude,
                lng: crd.longitude,
            }
        },
    ];
};
  
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};



function staticLoadPlaces() {
   return [
       {
           name: 'Magnemite',
           location: {
               lat: 40.57948,
               lng: -3.93122,
           }
       },
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
       model.setAttribute('rotation', '0 0 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.5 0.5 0.5');
       model.setAttribute('postion', '2,2,2')

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}