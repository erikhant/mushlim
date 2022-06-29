import { isArray, isArrayLikeObject, isString, toString } from 'lodash';

export const searchLike = ({term, objectSearch, keyTerm}) => {
    if (!term || !objectSearch || !keyTerm) throw new Error('paramaters is required');

    if (!isString(term)) throw TypeError('Parameters must is not valid type: The term must be a string');
    if (!isArrayLikeObject(objectSearch)) throw TypeError('Parameters must is not valid type: The object Search must be a array of object');
    if (!isString(keyTerm)) throw TypeError('Parameters must is not valid type: The key term must be a string');

    let keyTarget = keyTerm.split('.');
    let termLower = term.toLowerCase();

    const matchKey = (objectMap) => {
        let obj = objectMap;
        keyTarget.forEach(key => {
            obj = obj[key];
            if(!obj) throw Error('Cannot access at undefined object key');
        });
        return isString(obj) ? obj.toLowerCase() : toString(obj);
    }

    const matchTerm = objectSearch.filter(item => {
        const source = matchKey(item);
        return source.includes(termLower);
    });
    
    return matchTerm;

}