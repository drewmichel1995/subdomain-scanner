import sqlite3
import json
# from json2html import *


# Returns subdomain JSON object for specified domain and writes JSON object to file
def subdomains_to_json(outfile, domain, json_str=True):
    # Erase content from original JSON dump
    f = open(outfile, 'w')
    f.close()
    # Create database connection
    db_filename = '../data/PenTest.db'
    conn = sqlite3.connect(db_filename)
    # This enables column access by name: row['column_name']
    conn.row_factory = sqlite3.Row
    db = conn.cursor()

    rows = db.execute('''
    Select s.domain, s.name, s.source, s.tag, a.ip, a.cidr, a.asn, a.desc from subdomains as s
    inner join addresses as a on s.domain=a.domain and s.name=a.name where s.domain=?''', (domain,)).fetchall()

    conn.commit()
    conn.close()
    if json_str:
        print(outfile.split(domain.split('.')[
              0] + '.json')[0] + domain.split('.')[0] + '.html')
# with open('../serve/templates/' + domain.split('.')[0] + '.html', 'w') as htmlfile:
#     htmlfile.write(json2html.convert(json.dumps([dict(ix) for ix in rows])))
# ,table_attributes="id=\"info-table\" class=\"table table-bordered\""))
        with open(outfile, 'w') as outfile:
            json.dump([dict(ix) for ix in rows], outfile, indent=4)
        return json.dumps([dict(ix) for ix in rows])  # CREATE JSON

    return rows


# Formats Amass JSON objects in file into JSON array
def amass_data(file):
    # Read in the file
    with open(file, 'r') as file:
        filedata = file.read()

    # Replace the target string
    filedata = filedata.replace("{\"name\":", ",{\"name\":")
    # Correct replacement of the first object of the array
    filedata = filedata.replace(",{\"name\":", "{\"name\":", 1)

    # Format as JSON block and return string
    return filedata
