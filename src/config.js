const port = process.env.PORT;
const url = 'http://localhost';

module.exports = {
    apiURL: `${url + ':' + port}`,
}