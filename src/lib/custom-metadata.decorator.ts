import { DiscoveryService } from '@nestjs/core';

// create a decorator with discoveryService
export const FeatureFlag = DiscoveryService.createDecorator();
