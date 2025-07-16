const { Jimp } = require('jimp');
const sharp = require('sharp')
const path = require('path')
// const [input,output] = ['input.jpg','output.png'] // input file (jpg) and output file (png)
const [input,output] = ['input/bird.png','output/bird.png'] // input file (png) and output file (jpeg)
const fs = require('fs');


// convert('..',input,output,'..')
// convertWebpToPng(path.resolve(__dirname,'..',input),path.resolve(__dirname,'..',output))
// convert('../input','pipe.png','pipe.jpg','../output',{width:120,height:650})
// convert('../input','bird.png','bird-flap-down.png','../output',{x:0,y:0,h:63,w:90,height:100,width:100})
// convert('../input','bird.png','bird-flap-neutral.png','../output',{x:90,y:0,h:63,w:90,height:100,width:100})
// convert('../input','bird.png','bird-flap-up.png','../output',{x:180,y:0,h:63,w:90,height:90,width:90})


/*-----------------------------*/
// convert jpg to png
async function convert(directory,input,output,outDir,options={height:undefined,width:undefined,x:undefined,y:undefined,h:undefined,w:undefined,deg:undefined}){
    let { height,width,x,y,h,w,deg } = options
    // get absolute path
    input = path.resolve(__dirname,directory,input) // going to directory from this file's directory (__dirname)
    // jimp reads input file and stores in image
    let image = await Jimp.read(input)

    // edit the image here (crop,resize,etc...)
  /*----------------------------------------*/  
//   console.log(image)
    x>=0&&y>=0&&h&&w ? image.crop({x:x,y:y,w:w,h:h}) : null;
    height && width ? image.resize({w:width,h:height}) : null
    deg ? image.rotate(deg) : null
  /*----------------------------------------*/  

    // check if filename is the same
    const sameFile = checkSameFileName(outDir,fs,output).samefile;
    const fileLen = checkSameFileName(outDir,fs,output).len;
    const files = checkSameFileName(outDir,fs,output).files

    // console.log(files)
    if(sameFile){
        let split = output.split('.');
        split[0]+=(fileLen);
        output = split.join`.`;
    } 
        // console.log(output)


    // image writes to output.jpg (new file name)
    image.write(path.resolve(__dirname,outDir,output));
}

function checkSameFileName(directory,{readdirSync} = require('fs'),filename){
    let result = false;
    let splitFile = filename.split`.`;
    let [fname,ext] = [splitFile[0],splitFile[1]]
    let locateFiles = [...readdirSync(path.resolve(__dirname,(directory||null)),'utf-8')]
                    .filter(file => new RegExp(`^(${filename}|${fname}[1-9]?\.${ext})`,'g').test(file)); // filter files by regex
    // gather information from same files
    const len = locateFiles.length;
    const filenames = [...locateFiles]
    // console.log("filenames: "+filenames)
    filenames.length < 1 ? result = false : result = true;
    console.log("bool: "+result)
    // return object
    return {
        samefile:result,
        files:len<1?undefined:len > 0 && len < 2?filenames[0]:filenames,
        len:len
    }
}
// checkSameFileName('.',fs,output)

async function convertWebpToPng(input,output){
    try{
        await sharp(input).toFormat('png').toFile(output);
        console.log('conversion successful')
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = { convert }