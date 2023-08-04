async function carregaMapa(){
    const geo = {
        lat: -23.536692,
        long: -47.443943
    }
    let map = L.map('map').setView([geo.lat, geo.long], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19, attribution: 'OpenStreetMap'}).addTo(map)
}
