"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.set = set;
exports.pickBy = pickBy;
function get(obj, key) {
    const branches = key.split(".");
    let current = obj;
    let branch;
    while(branch = branches.shift()){
        if (!(branch in current)) {
            return null;
        }
        current = current[branch];
    }
    return current;
}
function set(obj, key, value) {
    const branches = key.split(".");
    let current = obj;
    let branch;
    while(branch = branches.shift()){
        if (branches.length === 0) {
            current[branch] = value;
            return obj;
        }
        if (!(branch in current)) {
            current[branch] = {};
        }
        current = current[branch];
    }
    return null;
}
function pickBy(obj, predicate) {
    return Object.entries(obj).reduce((acc, [key, value])=>{
        if (predicate(value, key)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

//# sourceMappingURL=obj.js.map