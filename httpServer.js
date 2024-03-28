const http = require('http');
const lodash = require('lodash');
const axios = require('axios');
const moment = require('moment');

const port = 8085;




const server = http.createServer((req, res) => {
  console.log(req.method, req.url);


  switch(req.url) {
    case ('/api/v2/users'):
      switch(req.method) {
        case ('GET'):
          res.writeHead(200, { "Content-Type": "application/json" })
          res.write(JSON.stringify([
            { name: 'Uco' },
            { name: 'Maciel' }
          ]));
          res.end();
        break;
        case('POST'):
          let data = '';
          req.on('data', chunk => {
            data += chunk;
          })
          req.on('end', () => {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.write(data);
            console.log(data);
            res.end();
          })
        break;
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" })
      res.write(JSON.stringify({
        value: 'Resource not found'
      }));
      res.end();
  }
  

})



const practice = async () => {
  // Lodash
  // console.log('is empty', lodash.isEmpty({}), lodash.isEmpty({ hola: 'hola' }), lodash.isEmpty([]), lodash.isEmpty(null), lodash.isEmpty(''), lodash.isEmpty('testing'), lodash.isEmpty(undefined), lodash.isEmpty(0), lodash.isEmpty(1), lodash.isEmpty(new Set()))
  // console.log('upperFirst', lodash.upperFirst('uno')); 


  // Strings
  /*
  console.log('startsWith', 'asdf'.startsWith('a'));
  console.log('startsWith', 'asdf'.startsWith('d'));
  console.log('includes', 'asdf'.includes('f'));
  console.log('replace', 'asdf'.replace('f', '5'));
  console.log('replace', 'asdf'.replace('df', '89'));
  console.log('replace', 'asdf'.replace('sdf', ''));
  */

  // API request
  // Axios
  /* try {
    const result = await axios.get('https://developer.api.autodesk.com/bim360/admin/v1/health?detailed');
    console.log(result.data.status.redis);
  } catch (error) {
    console.log(error)
  }
  */ 

  // Moment
  console.log(moment()); 
  console.log('default', moment().format()); 
  console.log('format', moment().format('YYYY-MM-DDTHH:mm:ssZZZ'))
  console.log('default utc', moment().format(moment.defaultFormatUtc));
  console.log('default utc plus one minute', moment().add(1, 'minutes').format(moment.defaultFormatUtc));
  console.log(' utc ', moment().utc().add(1, 'minutes').format(moment.defaultFormatUtc));
  console.log(' utc no format', moment().add(1, 'minutes').utc().format());
  

  // obtain 2023-04-19T19:26:35Z 
}


server.listen(port, () => {
  console.log(`server running on port ${port}`);
  practice();
})