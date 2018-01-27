#!/usr/bin/env python
# -*- coding: utf-8 -*-
#!/usr/bin/env python
import codecs
import shutil
import signal
import ssl
import subprocess
import sys
from optparse import OptionParser

from bot.SimpleWebSocketServer import WebSocket, SimpleWebSocketServer, SimpleSSLWebSocketServer
import os
import requests
from subprocess import Popen, CREATE_NEW_CONSOLE

class SimpleChat(WebSocket):

    def handleMessage(self):
        project_path = os.path.dirname(os.path.dirname(__file__))
        file = codecs.open(project_path+'/bot/combot/conversation_tree.xml', "w", "utf-8")
        file.write(self.data)
        file.close()

        zip = shutil.make_archive("C:\\Users\\Chen\\Documents\\combot\\app\\bot", 'zip',"C:\\Users\\Chen\\PycharmProjects\\CCai\\bot")
        p1 = subprocess.Popen(['python', project_path+'/bot/combot/conversation_server.py'], creationflags=CREATE_NEW_CONSOLE)
        p2 = subprocess.Popen(['python', project_path+'/bot/SimpleWebSocketServer/SimpleExampleServer.py'], creationflags=CREATE_NEW_CONSOLE)
        p3 = subprocess.Popen(['python', project_path+'/bot/chatUI/open_html.py'], creationflags=CREATE_NEW_CONSOLE)

        self.handleClose()

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')


if __name__ == "__main__":
    print("starting server")
    parser = OptionParser(usage="usage: %prog [options]", version="%prog 1.0")
    parser.add_option("--host", default='', type='string', action="store", dest="host", help="hostname (localhost)")
    parser.add_option("--port", default=7200, type='int', action="store", dest="port", help="port (8000)")
    parser.add_option("--example", default='echo', type='string', action="store", dest="example", help="echo, chat")
    parser.add_option("--ssl", default=0, type='int', action="store", dest="ssl", help="ssl (1: on, 0: off (default))")
    parser.add_option("--cert", default='./cert.pem', type='string', action="store", dest="cert", help="cert (./cert.pem)")
    parser.add_option("--ver", default=ssl.PROTOCOL_TLSv1, type=int, action="store", dest="ver", help="ssl version")

    (options, args) = parser.parse_args()
    cls = SimpleChat

    if options.ssl == 1:
        server = SimpleSSLWebSocketServer(options.host, options.port, cls, options.cert, options.cert, version=options.ver)
    else:
        server = SimpleWebSocketServer(options.host, options.port, cls)

    def close_sig_handler(signal, frame):
        server.close()
        sys.exit()

    signal.signal(signal.SIGINT, close_sig_handler)

    server.serveforever()

