// @preval

const {
    readFileSync,
} = require('fs');
const {
    relative,
    join
} = require('path');
const glob = require('fast-glob');

const {
    parse,
    resolver,
} = require('react-docgen');

// Find all components and load their sources
const DIR = join(__dirname, '../../components/**/*.jsx');
const files = glob.sync(DIR);

let docs = [];

files.forEach((path, index) => {
    const source = readFileSync(path).toString();
    let spec = null;
    try {
        spec = parse(source, resolver.findAllExportedComponentDefinitions);
    } catch (e) {
        console.error(e);
    }
    docs.push({
        spec,
        relativePath: './' + relative(join(__dirname, '../../components/'), path)
    });
});

module.exports = docs;
