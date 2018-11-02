import {parse} from 'react-docgen';

onmessage = (event) => {
    self.postMessage(parse(event.data));
};
