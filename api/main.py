#!/usr/bin/env python3
from utils import api
import routes 
from ledTasks import *

# Start the quart server if this file was called
if __name__ == '__main__':
    api.run(host='0.0.0.0')
