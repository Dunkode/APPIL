import Geocoder from "react-native-geocoding"
import geocoderConfig from "../config/geocoder-auth"


export const searchByAddress = (endereco) => {
    console.log(geocoderConfig.value)
    Geocoder.init(geocoderConfig.value)

    return new Promise((resolve, reject) => {

        Geocoder.from(endereco)
            .then(result => {
                var location = result.results[0].geometry.location //devolve lat e lng
                //console.log(location)
                resolve(location)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })

}