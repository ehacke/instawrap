import { expect } from 'chai';
import { createAndWrapClasses } from '../index';

describe('utils unit tests', () => {
  it('create all classes and wrap member functions', () => {
    // eslint-disable-next-line global-require
    const controllers = require('./resources/utils');

    const wrapped = createAndWrapClasses((func) => () => `prefix${func()}`, controllers, {}, {});

    expect(wrapped.root instanceof controllers.Root).to.eql(true);
    expect(wrapped.deep.alsoLevelOne instanceof controllers.deep.AlsoLevelOne).to.eql(true);
    expect(wrapped.deep.alsoLevelOne.getThis()).to.eql('prefixfooAlso');
    expect(wrapped.deep.levelOne instanceof controllers.deep.LevelOne).to.eql(true);

    expect(wrapped.root.getThis()).to.eql('prefixrootFoo');
    expect(wrapped.root._privateThing()).to.eql('unmodified');

    const instance = new controllers.Root();
    expect(instance.getThis()).to.eql('rootFoo');
  });
});
