from sqlite3 import dbapi2 as sqlite


def unlock_db(db_filename):
    connection = sqlite.connect(db_filename)
    connection.commit()
    connection.close()


filename = './PenTest.db'
unlock_db(filename)



