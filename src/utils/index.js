export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        var res = value.promise && typeof value.promise.then === 'function';
        return res;
    }
}
