import fetch from 'node-fetch';
import { json } from 'stream/consumers';

// let jsonData = require('C:/Users/velizar.stoyanov/Downloads/test.json');
// jsonData.features.map((feature: any) => 
// feature.properties.type_kv === "1" && geoLocations.push(feature.properties.kvname.split(". ").slice(-1)[0]
// ))


const getDistricts = async function () {
    const geoLocations: string[] = [];
    let blobData = await fetch("https://api.sofiaplan.bg/datasets/297");
    const textData = await (await blobData.blob()).text();
    const jsonData = JSON.parse(textData);
    console.log(jsonData.features);

    jsonData.features.map((feature: any) => 
feature.properties.type_kv === "1" && geoLocations.push(feature.properties.kvname.split(". ").slice(-1)[0]
))
    return geoLocations;
}


export default getDistricts;