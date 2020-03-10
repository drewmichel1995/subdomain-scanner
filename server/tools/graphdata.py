import json
import os
import formatdata as format
import stagedata as stage


def runScan(domain):
    line = domain
    stage.setIsScanning(domain, True)
    print("********* " + line + " *********")
    outfile = '../output/' + line.split('.')[0] + '/'
    filename = line.split('.')[0] + '.json'
    os.system('mkdir -p ' + outfile)
    os.system('rm -f ' + outfile + line.split('.')[0] + '.json')
    amass = '~/.linuxbrew/bin/amass enum -d ' + line + \
        ' -json ' + outfile + filename + ' >/dev/null'
    os.system(amass)
    stage.subdomains_to_db(file=outfile+filename)
