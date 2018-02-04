import { IToDoListEntry } from '../../../interfaces/todo-list';
import { ToDoListModel, ToDoListMongooseModel } from '../models/todo-list-model';
import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import { expect } from 'chai';

describe('ToDoListModel', () => {
  describe('create', () => {
    let createStub: SinonStub;

    beforeEach(() => {
      createStub = sinon.stub(ToDoListMongooseModel, 'create').resolves();
    });

    afterEach(() => {
      createStub.restore();
    });

    it('should create a new todo list with title "New List" and an empty entries array by default', (done) => {
      ToDoListModel.create().then(() => {
        sinon.assert.calledWith(createStub, { title: 'New List', entries: [] });
        done();
      });
    });

    it('should create a new todo list with given entries', (done) => {
      const entries: IToDoListEntry[] = [
        { name: 'test', description: 'test', done: false }
      ];

      ToDoListModel.create({ title: 'Test', entries }).then(() => {
        sinon.assert.calledWith(createStub, {
          title: 'Test',
          entries: [
            { name: 'test', description: 'test', done: false }
          ]
        });
        done();
      });
    });
  });

  describe('read', () => {
    let findStub: SinonStub;
    let findByIdStub: SinonStub;

    beforeEach(() => {
      findStub = sinon.stub(ToDoListMongooseModel, 'find')
        .resolves([
          { title: 'test1', entries: [] },
          { title: 'test2', entries: [] }
        ]);

      findByIdStub = sinon.stub(ToDoListMongooseModel, 'findById')
        .resolves({ title: 'test', entries: [] });
    });

    afterEach(() => {
      findStub.restore();
      findByIdStub.restore();
    });

    it('should return all todo lists when no specific ID is given', (done) => {
      ToDoListModel.read().then((res: any) => {
        expect(Array.isArray(res)).to.be.true;
        expect(res.length).to.equal(2);

        done();
      });
    });

    it('should return a specific todo lists when an ID is given', (done) => {
      ToDoListModel.read('test').then((res: any) => {
        expect(Array.isArray(res)).to.be.false;
        expect(res.title).to.equal('test');

        done();
      });
    });
  });

  describe('update', () => {
    let findByIdAndUpdateStub: SinonStub;

    beforeEach(() => {
      findByIdAndUpdateStub = sinon.stub(ToDoListMongooseModel, 'findByIdAndUpdate').resolves();
    });

    afterEach(() => {
      findByIdAndUpdateStub.restore();
    });

    it('should update a todo list for the given ID with the data', (done) => {
      ToDoListModel.update('test', {}).then(() => {
        sinon.assert.calledWith(findByIdAndUpdateStub, 'test', {})
        done();
      });
    });
  });

  describe('delete', () => {
    let findByIdAndRemoveStub: SinonStub;

    beforeEach(() => {
      findByIdAndRemoveStub = sinon.stub(ToDoListMongooseModel, 'findByIdAndRemove').resolves();
    });

    afterEach(() => {
      findByIdAndRemoveStub.restore();
    });

    it('should delete a todo list with the given ID', (done) => {
      ToDoListModel.delete('test').then(() => {
        sinon.assert.calledWith(findByIdAndRemoveStub, 'test');
        done();
      });
    });
  });
});
