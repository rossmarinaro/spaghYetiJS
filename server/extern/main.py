# start server, open browser

import os
import webbrowser
from http.server import HTTPServer, CGIHTTPRequestHandler

os.chdir("C:\my_cool_game")

cwd = os.getcwd()

print("Current directory: ", cwd)

""" serve on port """

PORT = 1776


server_object = HTTPServer(server_address=('', PORT), RequestHandlerClass=CGIHTTPRequestHandler)

print("python serving at port", PORT)


""" open browser """

webbrowser.open("http://localhost:{}".format(PORT))    #/dist etc


server_object.serve_forever()









