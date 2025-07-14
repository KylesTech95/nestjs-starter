import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { FeatureFlag } from './lib/custom-metadata.decorator';
import { parseCssProperty } from './lib/parseCssProperty';
import { getCanvasElement } from './lib/elements/canvas';
// import { customInterface } from './lib/customInterface';
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
    initalizeCanvas(height:(number|string),width:(number|string), options: object) : string {
        /*------------------------------- */
         // foormat styles
        let formatStyles: string = [...Object.keys(options['style'])]
          .filter(property=> options['style'][property]!==undefined)
          .map((key,index)=>{
            // console.log(key)
            // console.log(options['style'][key])
            return `${parseCssProperty(key)}:${options['style'][key]}`
          })
          .join(";");

        // format classes
        let formatClasses: string = options['class'] // array
          .map((item:string,index:number)=>item)
          .join(" ");

        let canvas =  getCanvasElement(height,width,options,formatClasses,formatStyles)

    //  return element
     return canvas;
    }
}
