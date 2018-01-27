import subprocess
import os

project_path = os.path.dirname(__file__)
p1 = subprocess.Popen(['python', project_path+'/combot/conversation_server.py'])
p2 = subprocess.Popen(['python', project_path+'/SimpleWebSocketServer/SimpleExampleServer.py'])
p3 = subprocess.Popen(['python', project_path+'/chatUI/open_html.py'])

p1.wait()
p2.wait()
p3.wait()

