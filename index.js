const verifier = require('email-verify');
 
const verifyEmail = async function(email) {
  return new Promise((resolve, reject) => {
    verifier.verify(email, function( err, info ){
      if(err) {
        reject(err)
      } else {
        resolve(info)
      }
    });
  });
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
});

lineReader.on('line', async function (line) {
  try {
    const result = await verifyEmail(line.trim())
    console.log(line + "," + (result.success === true))
  } catch (err) {
    console.log(line + "," + err)
  }
});
