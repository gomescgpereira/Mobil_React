const functions = require('firebase-functions');
//Permite fazer requisiçao qualquer origem
const cors = require('cors')({ origin: true });
//Vou trabalhar com file system
const fs = require('fs');
// Gerra um unico ID
const uuid = require('uuid-v4');
// Usuar google-cloud storage
const { Storage } = require('@google-cloud/storage');
// E voi instanciar storage
const storage = new Storage({
    projectId: 'lambe-244a8',
    keyFilename: 'lambe-244a8-firebase.json'
})



 exports.uploadImage = functions.https.onRequest((request, response) => {
   cors(request, response, () => {
      try {
        fs.writeFileSync('/tmp/imageToSave.jpg', 
        request.body.image, 'base64') 
        //Nome bucket no firebase -> local de storage

        const bucket = storage.bucket('lambe-244a8.appspot.com');
        const id = uuid()
        bucket.upload('/tmp/imageToSave.jpg',{
           uploadType:  'media',
           destination: `/posts/${id}.jpg`,
           metadata: {
               metadata: {
                   contentType: 'image/jpeg',
                   firebaseStorageDownloadTokens: id 
               }
           }
        }, (err,file) => {
             if (err) {
                 console.log(err)
                 return response.status(500).json({ error: err})
             } else {
                 const fileName = encodeURIComponent(file.name)
                 const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                return response.status(201).json({ imageUrl: imageUrl })
             }

        })


      } catch(err) {
          console.log(err)
          return response.status(500).json({ error: err } )
        }

   })
 });
