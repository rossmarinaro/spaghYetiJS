# start server, open browser

#import os
import webbrowser
from http.server import HTTPServer, CGIHTTPRequestHandler


#os.chdir('C:\project data\projects\spagYeti_game_engine\server\dist')

""" serve on port """

PORT = 1776


server_object = HTTPServer(server_address=('', PORT), RequestHandlerClass=CGIHTTPRequestHandler)

print("python serving at port", PORT)


""" open browser """

webbrowser.open("http://localhost:{}/my_cool_game".format(PORT))    #/dist


server_object.serve_forever()









