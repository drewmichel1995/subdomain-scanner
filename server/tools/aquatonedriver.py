import json
import os


def load_subdomains(name):
    with open("../output/" + name + "/" + name + ".json") as infile:
        subdomains = json.load(infile)

    subdomainlist = list()
    for sd in subdomains:
        subdomainlist.append(sd['name'])

    subdomainlist.sort()
    subdomainset = set(subdomainlist)
    with open("../output/" + name + "/" + name + "_subdomains.json", "a+") as outfile:
        for subdomain in subdomainset:
            outfile.write(subdomain + '\r\n')

    return


#def write_subdomains(name):
#    with open("../output/" + name + "/" + name + "_subdomains.json", "w+") as outfile:
#        outfile.write(load_subdomains(name))
#    return


def run_aquatone(name):
    load_subdomains(name)
    subdomfolder = "../output/" + name + "/"
    subdomfile = subdomfolder + name + ".json"
    os.system("cat " + subdomfile + " | aquatone -out " + subdomfolder)
    return





