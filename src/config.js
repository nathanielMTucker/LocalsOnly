const port = process.env.PORT || 5000;
const url = 'http://localhost';

module.exports = {
    apiURL: `${url + ':' + port}`,
}