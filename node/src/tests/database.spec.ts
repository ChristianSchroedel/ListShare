import * as sinon from 'sinon';
import * as mongoose from 'mongoose';
import { Database } from '../database';
import { SinonStub } from 'sinon';

describe('Database', () => {
  describe('connect', () => {
    let connectionStub: SinonStub;

    beforeEach(() => {
      connectionStub = sinon.stub(mongoose, 'connect');
    });

    afterEach(() => {
      connectionStub.restore();
    });

    it('should resolve if connection to database was successful', (done) => {
      connectionStub.resolves();

      const sut = new Database('test');

      sut.connect().then(() => {
        done();
      });
    });

    it('should reject if connection to database was not successful', (done) => {
      connectionStub.rejects();

      const sut = new Database('test');

      sut.connect().catch(() => {
        done();
      })
    });
  });
});
