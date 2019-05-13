// https://glebbahmutov.com/blog/call-me-maybe/
export function get(object, path) {
    return path.split('.').reduce((xs, x) =>
        (xs && xs[x]) ? xs[x] : null, object);
}
