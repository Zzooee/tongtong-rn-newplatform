import superagent from 'superagent';

const methods = [
    'get',
    'head',
    'post',
    'postForm',
    'put',
    'del',
    'options',
    'patch'
];

class _Api {

    constructor(opts) {

        this.opts = opts || {};

        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');

        methods.forEach(method =>
            this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
                var request ;
                if(method == 'postForm'){
                    request = superagent['post']('http://localhost:8080'+path).type('form').withCredentials();
                }else{
                    request = superagent[method](this.opts.baseURI+path);
                }
                if (params) {
                    request.query(params);
                }

                if (this.opts.headers) {
                    request.set(this.opts.headers);
                }

                if (data) {
                    request.send(data);
                }

                request.end((err, res) => err ? reject(err || res) : resolve(res));
            })
        );
    }

}

const Api = _Api;

export default Api;
