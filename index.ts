import { isFunction, camelCase, isPlainObject, isObject } from 'lodash';

/**
 * This may not work in the future, and has caveats
 * @link https://stackoverflow.com/a/30759109
 * @param {*} v
 * @returns {boolean}
 */
const isClass = (v) => isFunction(v) && /^\s*class\s+/.test(v.toString());

/**
 * Instantiates all classes in the structure and wraps each function
 * @param {Function} wrappingFunction
 * @param {object} classes
 * @param {object} services
 * @param {object} config
 * @returns {any}
 */
export function createAndWrapClasses(wrappingFunction: Function, classes, services, config): any {
  if (!isFunction(wrappingFunction)) {
    throw new TypeError('wrappingFunction must be a function');
  }

  if (!isObject(classes)) {
    throw new TypeError('classes must be a object');
  }

  return Object.keys(classes).reduce((result, key) => {
    if (isClass(classes[key])) {
      const methods = Object.getOwnPropertyNames(classes[key].prototype)
        .filter((method) => method !== 'constructor')
        .filter((method) => !method.startsWith('_'));

      const instanceName = camelCase(key);

      result[instanceName] = new classes[key](services, config);
      result[instanceName] = methods.reduce((instance, method) => {
        instance[method] = wrappingFunction(instance[method]);
        return instance;
      }, result[instanceName]);

      return result;
    }

    if (isPlainObject(classes[key])) {
      result[key] = createAndWrapClasses(wrappingFunction, classes[key], services, config);
      return result;
    }

    result[key] = classes[key];
    return result;
  }, {});
}
