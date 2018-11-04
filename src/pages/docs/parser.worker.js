import {parse, resolver} from 'react-docgen';

onmessage = (event) => {
    self.postMessage(parse(event.data, resolver.findAllComponentDefinitions));
};
