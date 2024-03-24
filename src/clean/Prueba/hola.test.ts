import 'reflect-metadata';
import 'jest';
import { container } from "tsyringe";
import { registerDependecies } from '../../utils/registerDependecies';
import { data } from './data';
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const sharp = require('sharp');


beforeEach(()=>{
    registerDependecies();
    jest.setTimeout(30000);
})


class Flag {
    realName: string;
    englishName: string;
    flagName: string;
    callingCodes: string; // obtener el primer lugar del arreglo
}

describe('hola', () => {

    it('do it', async () => {
        const ownFlags: Flag[] = [];

        const flags = data;
        flags.forEach((flag)=> {
            ownFlags.push({
                callingCodes: flag.callingCodes[0],
                englishName: flag.name,
                realName: flag.nativeName,
                flagName: path.basename(flag.flags.png),
            })
            downloadFile(flag.flags.png, 'flagspng')
        })

        var filepath = "flags.json";
        fs.writeFile(filepath, JSON.stringify(ownFlags), (err) => {
            if (err) throw err;
        }); 

        //console.log(JSON.stringify(ownFlags))
        
    });

  
});


// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (url, downloadFolder) => {
    // Get the file name
    const fileName = path.basename(url);
  
    // The path of the downloaded file on our machine
    const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
    try {

      let res = await axios({ url, responseType: "arraybuffer" })
      //const buffer = Buffer.from(requirements.fileData, 'binary');
      const data = await sharp(res.data).resize({ width: 100, height: 100 }).toFile(`${downloadFolder}2\\${fileName}`)
      console.log(data, 'holaaaa')


      // const w = response.data.pipe(fs.createWriteStream(localFilePath));
      // w.on('finish', () => {
      //   // sharp(`${downloadFolder}\\${fileName}`)
      //   // .rotate()
      //   // .resize(50)
      //   // .toFile(`${downloadFolder}2\\${fileName}`)
      // });
    } catch (err: unknown) { 
      //throw new Error(err);
    }
  }; 