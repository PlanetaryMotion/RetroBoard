# Render index.html from templates if the user navigates to /
from flask import render_template
from utils import api
from ledTasks import test

@api.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# Rotating block demo api call
@api.route('/api/rotate', methods=['GET'])
def runRotate():
    # Create the object
    rotating_block_generator = ledTasks.RotatingBlockGenerator()
    
    # Try running the block rotation
    try:
        rotating_block_generator.run({})
    except Exception as e:
        print("Error starting animation\n")
        print(e)

    return 'block rotation done'

@api.route('/api/clock', methods=['GET'])
def runClock():
    # Create the object
    run_text = ledTasks.RunText()
    
    # Try running the block rotation
    try:
        run_text.run({})
    except Exception as e:
        print("Error starting animation\n")
        print(e)

    return 'clock done'

@api.route('/api/pixel', methods=['GET'])
def pixel():
    # Try running the block rotation
    try:
        task = test.delay()
        task.wait()
    except Exception as e:
        print("Error starting animation\n")
        print(e)
    return 'pixel done'