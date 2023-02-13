/* HTTP REQUESTS FROM WEB, CORDOVA, ELECTRON ENVIRONMENTS */


export class Ajax { 


    private static headers: any
    private static method: string

    //proxy server address (mobile version) or null if same 

    private static proxyConnection: string | null =  null;

//-------------------------- make xhr http request

    public static async xhr(_path: string, method: string, body: Object): Promise<XMLHttpRequest>
    {

        const baseDir = Ajax.proxyConnection ? Ajax.proxyConnection :
                        (window as any).fetch_electron ? 'http://localhost:8080/' : '/', 

              path = baseDir + _path,
              format: any = await Ajax.request(method, body),
              electron = (window as any).fetch_electron && typeof (window as any).fetch_electron === 'function',

            request = { 
                method: format.method, 
                headers: format.headers,
                body: electron ? format['body'] : JSON.stringify(format['body'])     
            };
   
        
        if (electron)
            return (window as any).fetch_electron(path, request);
        

        const standardFetch = await fetch(path, request),
              data = await standardFetch.json();

        return data;
    }


//------------------ format request

    private static async request(type: string, body: Object): Promise<{method: string, headers: any}>
    {
        Ajax.headers = { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.getItem('webtoken')
            //mode: 'cors', same-origin
            //credentials: 'include', //GET ONLY
        };

        switch (type)
        {
            case 'GET': Ajax.method = 'GET'; break;
            case 'POST': Ajax.method = 'POST'; break;
            case 'PUT': Ajax.method = 'PUT'; break;
        }

        const format: any = {
            method: Ajax.method,
            headers: Ajax.headers
        };

        type === 'POST' || type === 'PUT' ? 
            format['body'] = body : delete format['body'];

        return format;
    }  
} 






