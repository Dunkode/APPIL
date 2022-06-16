import Geocoder from "react-native-geocoding"
import geocoderConfig from "../config/geocoder-auth"


export const searchByAddress = (endereco) => {
    Geocoder.init(geocoderConfig.value)

    return new Promise((resolve, reject) => {

        Geocoder.from(endereco)
            .then(result => {
                var location = result.results[0].geometry.location //devolve lat e lng
                resolve(location)
            })
            .catch(error => reject(error))
    })

}