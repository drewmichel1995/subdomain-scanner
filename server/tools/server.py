from flask import Flask, abort, redirect, url_for, render_template, request
from flask_cors import CORS, cross_origin
import json
import os
import stagedata as stage
import graphdata as graph

rootDir = '../output/'
app = Flask(__name__, template_folder=rootDir)
CORS(app)


@app.route('/')
def root():
    return render_template('index.json')


@app.route('/<path:path>')
def get_dir(path):
    return stage.get_subdomains(path)


@app.route('/getPendingScans', methods=['GET'])
def get_pending_scans():
    return stage.get_pending_domains()


@app.route('/deletePendingScan', methods=['POST'])
def delete_pending_scan():
    request.get_json(force=True)
    if request.method == 'POST':
        data = request.json
    success = stage.delete_pending_domain(data['name'])
    return json.dumps({'success': success}), 501, {'ContentType': 'application/json'}


@app.route('/getAvailableDomains', methods=['GET'])
def get_available_domains():
    return stage.get_domains()


@app.route('/addDomain', methods=['GET', 'POST', 'DELETE'])
def add_domain():
    request.get_json(force=True)
    if request.method == 'POST':
        data = request.json  # a multi-dict containing POST data
        print(data['name'])
        stage.add_pending_domain(data['name'])

        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/scanDomain', methods=['POST'])
def scan_domain():
    request.get_json(force=True)
    try:
        data = request.json
        graph.runScan(data['name'])

        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    except IOError:
        return json.dumps({'success': IOError}), 200, {'ContentType': 'application/json'}


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
