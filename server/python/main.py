# start server, open browser

import webbrowser
from http.server import HTTPServer, CGIHTTPRequestHandler

""" serve on port """

PORT = 7071


server_object = HTTPServer(server_address=('', PORT), RequestHandlerClass=CGIHTTPRequestHandler)

print("python serving at port", PORT)


""" open browser """

webbrowser.open("http://localhost:{}/dist".format(PORT))


server_object.serve_forever()









