import { Test, TestingModule } from '@nestjs/testing'; // import test and testingmodule
import { INestApplication } from '@nestjs/common'; // import INestApplication
import * as request from 'supertest'; // import * as request from supertest
import { App } from 'supertest/types'; // import app from supertest/types
import { AppModule } from './../src/app.module'; // import appmodule from app.module

describe('AppController (e2e)', () => {
  let app: INestApplication<App>; //Interface defining the core NestApplication object.

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
      || // or operator
      request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Jello Shots!')
  });
});
