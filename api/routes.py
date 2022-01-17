# Render index.html from templates if the user navigates to /
from flask import render_template, request
from utils import api, settings
import ledTasks
import logging
import threading
import asyncio

#-------------------------------------------------------------------------
# Routes:
#-------------------------------------------------------------------------
# Index route for api
@api.route('/', methods=['GET'])
def index_route():
	return render_template('index.html')

# App route for api
@api.route('/api/app', methods=['POST'])
def pixel_route():
	request_form = request.get_json()
	logging.debug('API request received for {}. Tasks currently running {}'.format(request_form['app'], ledTasks.running_tasks))



	return 'OK'

# App route for settings pull
@api.route('/api/settings', methods=['GET', 'POST'])
def settings_route():
	logging.debug('settings request received')
	if request.method == 'GET':
		# Get the settings from the settings task
		with open('/home/pi/RetroBoard/settings.json', 'r') as filehandle:
			return filehandle.read()
	
	elif request.method == 'POST':
		settingsFromWeb = request.json
		# Write the settings to webpagesettings.txt
		settings.dump_settings(settingsFromWeb)
		settings.import_settings()
		return "OK"