export const ajaxHeaders = {
    get: {
        method: 'GET', 
        mode: 'same-origin', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }
    },
    post: {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        body: null
    }
}