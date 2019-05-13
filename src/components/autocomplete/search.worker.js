import Fuse from 'fuse.js';
let fuse;
onmessage = (event) => {
    const msg = event.data;
    switch (msg.type) {
        case 'init':
            fuse = new Fuse(msg.data, msg.settings);
            break;
        case 'search':
            self.postMessage(fuse.search(msg.value));
            break;
    }
};
