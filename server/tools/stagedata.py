import sqlite3
import json
import os
import datetime
import formatdata as format
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model

db_filename = os.path.abspath('../data/PenTest.db')
db = SqliteDatabase(db_filename)


class pending_domains(Model):
    domain = CharField()
    date = CharField(default=datetime.datetime.now().ctime())
    isScanning = BooleanField(default=False)

    class Meta:
        database = db


class domains(Model):
    domain = CharField()
    total = IntegerField()
    date = CharField(default=datetime.datetime.now().ctime())
    isScanning = BooleanField(default=False)

    class Meta:
        database = db


class subdomains(Model):
    domain = CharField()
    name = CharField()
    ip = CharField()
    source = CharField()
    tag = CharField()
    cidr = CharField()
    asn = CharField()
    desc = CharField()

    class Meta:
        database = db
# Inserts subdomains into database


def subdomains_to_db(file):
    try:
        db.create_tables([subdomains])
    except:
        print("Subdomain table exists")

    subdomain = json.loads(format.amass_data(file=file))
    set_domains(subdomain[0]['domain'], len(subdomain))
    # delete_pending_domain(subdomain[0]['domain'])
    # Insert each subdomain and address into the database
    for subdom in subdomain:
        sd = subdomains(domain=subdom['domain'], name=subdom['name'], ip=subdom['ip'], source=subdom['source'],
                        tag=subdom['tag'], cidr=subdom['cidr'], asn=subdom['asn'], desc=subdom['desc'])
        print(subdom['name'])
        sd.save()

    setIsScanning(subdomain[0]['domain'], False)
    delete_pending_domain(subdomain[0]['domain'])


def add_pending_domain(name):
    try:
        db.create_tables([pending_domains])
    except:
        print("PD table exists")

    pendingDom = pending_domains(domain=name)
    pendingDom.save()


def get_pending_domains():
    all_domains = list(pending_domains.select().dicts())

    return json.dumps(all_domains)


def delete_pending_domain(name):
    domain = pending_domains.select().where(pending_domains.domain == name).get()
    domain.delete_instance()

    return True


def get_subdomains(name):
    match_domains = list(subdomains.select().where(
        subdomains.domain.contains(name + ".")).dicts())
    return json.dumps(match_domains)


def get_domains():
    match_domains = list(domains.select().dicts())
    return json.dumps(match_domains)


def set_domains(name, size):
    try:
        db.create_tables([domains])
    except:
        print("Domains")

    newDom = domains(domain=name, total=size)
    newDom.save()


def setIsScanning(name, scanning):
    domain = pending_domains.update(isScanning=scanning).where(
        pending_domains.domain == name)
    domain.execute()
    domain = domains.update(isScanning=scanning).where(
        domains.domain == name)
    domain.execute()
