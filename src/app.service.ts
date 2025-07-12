import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { FeatureFlag } from './custom-metadata.decorator';
import { parseCssProperty } from './lib/parseCssProperty';
// Injectable is a provider
@Injectable()
@FeatureFlag('experimental')
export class AppService {

  constructor(private readonly discoveryService: DiscoveryService) {

    // discover providers
    const providers = this.discoveryService.getProviders();
    // console.log(providers);
    const [provider] = providers.filter(
      (item) =>
        this.discoveryService.getMetadataByDecorator(FeatureFlag, item) ===
        'experimental',
    );

    // console.log(
    //   'Providers with the "experimental" feature flag metadata:',
    //   provider,
    // );

    // discover controllers
    const controllers = this.discoveryService.getControllers()
    // console.log(controllers)
  }
  // say hello
  getHello(): string {
    return 'Hello World!';
  }

  // add sum
  addSum(a:number,b:number): number {
    return a + b;
  }
}

@Injectable()
@FeatureFlag('experimental')
export class FlappyService {
  constructor(private readonly discoveryService: DiscoveryService){
     // discover providers
    const providers = this.discoveryService.getProviders();
    // console.log(providers);
    const [provider] = providers.filter(
      (item) =>
        this.discoveryService.getMetadataByDecorator(FeatureFlag, item) ===
        'experimental',
    );

    // discover controllers
    const controllers = this.discoveryService.getControllers()
    // console.log(controllers)
  }

  // initialize canvas
    initalizeCanvas(height:number,width:number, options: object) : string {
        for(let prop in options){
          if(!options[prop]||options[prop]==undefined){
             delete options[prop]
          } else {
            console.log(prop);
            console.log(options[prop])
          }
        }
        console.log(options)

         // plug in height and width
        let formatStyles: string = [...Object.keys(options)]
          .filter(property=> options[property]!==undefined)
          .map((key,index)=>`${parseCssProperty(key)}:${options[key]}`)
          .join(";");
          // console.log(formatStyles)
     
        // let red = 'background-color:red;' // testing a random color
        // let canvas = `<canvas height=${height} width=${width} ${options ? "style="+red : ""}></canvas>`;
        let canvas = `<canvas height=${height} width=${width} ${options ? "style="+formatStyles : ""}></canvas>`;
    //  return element
     return canvas;
    }
}
