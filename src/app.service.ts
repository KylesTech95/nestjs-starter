import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { FeatureFlag } from './custom-metadata.decorator';

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
