const mapbox_token="pk.eyJ1Ijoicm9ybzY5IiwiYSI6ImNrbnNlbmpjZzJmYjAydnBldjhjZGZrenAifQ.6A6lowHBJUjJ0NYHFdwScg";
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1.5,
    center: [0, 20]
});

const getColor = count =>{
    if(count>=5000){
        return "red";
    }
    if(count>=1000){
        return "blue";
    }
    return "grey";
}

var popup = new mapboxgl.Popup({ closeOnClick: false})
.setLngLat([28.0339, 1.6596])
.setHTML('<h4>Red active cases greater than 5000</h4> <h4>Blue active cases greater than 1000</h4> <h4>grey active cases less than 1000</h4>')
.addTo(map);


fetch("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=OBJECTID,Country_Region,Last_Update,Lat,Long_,Confirmed,Deaths,Recovered,Active&outSR=4326&f=json")
.then(response => response.json())
.then(data => data)
   .then(data=>{
       //console.log(data);
       data.features.forEach(report => {
        //    console.log(report.attributes.Country_Region);
        //    var country=report.attributes.Country_Region;
        //    var count=report.attributes.Active;
            const {Active, Country_Region, OBJECTID} = report.attributes
            //console.log(Active, Country_Region, OBJECTID);
            var marker = new mapboxgl.Marker({
                color: getColor(Active)
                })
                .setLngLat([report.attributes.Long_, report.attributes.Lat])
                .addTo(map);
                
        });
   });


    