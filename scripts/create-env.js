const fs = require('fs');

// PARA CUANDO SUBA EL PROYECTO A UN SERVIDOR, PUEDEA LEER LO QUE HAY EN MIS .ENV Y COMPILE CORRECTAMENTE ... /
fs.writeFileSync('../.env', `API=${process.env.API}\n`);