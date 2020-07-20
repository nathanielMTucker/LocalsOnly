const port = 5000;
const url = 'http://localhost';

module.exports = {
    apiURL:function(){
        return url+':'+port;
    }
}