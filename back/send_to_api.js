// Requires "axios" and "form-data" to be installed (see https://www.npmjs.com/package/axios and https://www.npmjs.com/package/form-data)
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

module.exports = async function send_to_api(image_path , fileName, color) {
    const inputPath = image_path;
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
    
    // formData.append('bg_color', color);
    
    
    
    await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'jUQgAzeGs4vGetqBxyskTryP',
    },
    encoding: null
    })
    .then((response) => {
    if(response.status != 200) return console.error('Error:', response.status, response.statusText);
        fs.writeFileSync(__dirname + "/upload_image/no_bg_" + fileName , response.data);
    })
    .catch((error) => {
        return console.error('Request failed:', error);
    });

}