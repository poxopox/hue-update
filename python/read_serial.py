import serial
import json
import socket

HOST = "127.0.0.1"
PORT = 43481
ser = serial.Serial(port='/dev/ttyS1', baudrate=9600, timeout=2)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(5)
while True:
    print('waiting for a connection')
    con, client_addr = s.accept()
    try:
        print('connection from ', client_addr)
        while True:
            data = con.recv(16)
            if data:
                out = ser.readline()
                pos = json.loads(out)
                print(pos)
                print('sending data to client')
                con.sendall(json.dumps(pos))
            else:
                print('no more data from client')
                break
    except KeyboardInterrupt:
        if con:  # <---
            con.close()
            print("closing socket")
            s.close()
        break  #
    finally:
        con.close()
        print("closing socket")
        s.close()
