"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findLastIndex = findLastIndex;
exports.intersecting = intersecting;
exports.replaceValue = replaceValue;
exports.uniqBy = uniqBy;
exports.chunk = chunk;
exports.groupBy = groupBy;
function findLastIndex(array, predicate) {
    for(let i = array.length - 1; i >= 0; i--){
        if (predicate(array[i])) {
            return i;
        }
    }
    return -1;
}
function intersecting(a, b) {
    const [c, d] = a.length > b.length ? [
        a,
        b
    ] : [
        b,
        a
    ];
    return c.filter((value)=>d.includes(value)
    );
}
function replaceValue(values, original, replacement) {
    const index = values.indexOf(original);
    if (index > -1) {
        values[index] = replacement;
    }
    return values;
}
function uniqBy(array, key) {
    const seen = {};
    return array.filter((item)=>{
        const k = key(item);
        if (seen[k]) {
            return false;
        }
        seen[k] = true;
        return true;
    });
}
function chunk(array, size) {
    const chunked = [];
    let index = 0;
    while(index < array.length){
        chunked.push(array.slice(index, index += size));
    }
    return chunked;
}
function groupBy(list, getKey) {
    return list.reduce((previous, currentItem)=>{
        const group = getKey(currentItem);
        if (!previous[group]) {
            previous[group] = [];
        }
        previous[group].push(currentItem);
        return previous;
    }, {});
}

//# sourceMappingURL=array.js.map