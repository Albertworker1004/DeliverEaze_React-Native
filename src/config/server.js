const mode = 'prod';
let config = {};

if (mode === 'prod') {
    config = {
        urlUser: 'http://3.15.105.121/DeliverEaze/Backend/index.php/user/',
        url: 'http://3.15.105.121/DeliverEaze/Backend/index.php/'
    }
} else {
    config = {
        urlApi: '',
        url: ''
    }
}

export default config;