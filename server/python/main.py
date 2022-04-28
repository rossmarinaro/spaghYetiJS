# open browser

import webbrowser
import subprocess

""" run sh script """

print "start"
subprocess.call(["sh", "./build.sh"])
print "end"

""" open browser """



webbrowser.open('http://localhost:7070')



