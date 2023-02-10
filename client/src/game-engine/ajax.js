export class Ajax { 

    request(type, body)
    {
        this.headers = { 
            'Accept': 'application/json',  //text/html
            'Content-Type': 'application/json',
          //  mode:  'same-origin',
           // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
           // credentials: 'include',
            'Access-Control-Allow-Origin': /* 'https://pastaboss-deathmatch.herokuapp.com' */ '*'
        };
        switch (type)
        {
            case 'GET': this.method = 'GET'; break;
            case 'POST': this.method = 'POST';
            break;
            case 'PUT': this.method = 'PUT'; break;
        }
        const _ = {
            method: this.method,
            headers: this.headers
        }
        type === 'POST' || type === 'PUT' ? 
            _['body'] = body : delete _['body'];

        return _;
    }  
} 