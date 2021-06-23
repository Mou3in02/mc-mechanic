import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('mc-mechanic.db')

export const initDatabase = () => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                // 'DROP TABLE Task ',
                'CREATE TABLE IF NOT EXISTS Task ( ' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
                'model STRING NVARCHAR(100) NULL, '+
                'tel STRING NVARCHAR(100) NULL, '+
                'earn STRING NVARCHAR(100) NULL, '+
                'spent STRING NVARCHAR(100) NULL, '+
                'createdAt STRING NVARCHAR(100) NULL, '+
                'description STRING NVARCHAR(200) NULL, '+
                'status boolean NULL );',
                [],
                (_var, result) => {
                    resolve(_var, result)
                },
                (_var, error) => {
                    reject(error)
                }
            )

        })
    })
}
export const insertTask = (task) => {
    const {model, tel, earn, spent, createdAt, description, status} = task
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO Task (model,tel,earn,spent,createdAt,description,status) '+
                'VALUES (?, ?, ?, ?, ?, ?, ?);',
                [model, tel, earn, spent, createdAt, description, status],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )

        })
    })
}
export const getTasks = (limit , offset) => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Task ORDER BY id DESC LIMIT ? OFFSET ? ;',
                [limit,offset],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const getTaskById = (id) => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Task WHERE id = ? ;',
                [id],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const updateTaskFromDatabase = (task) => {
    const {id, model, tel, earn, spent, createdAt, description, status} = task
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'UPDATE Task '+
                'SET model=?, tel=?, earn=?, spent=?, createdAt=?, description=?, status=? '+
                'WHERE id=? ;',
                [model, tel, earn, spent, createdAt, description, status, id],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const deleteTaskFromDatabase = (id) => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Task '+
                'WHERE id=? ;',
                [id],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const deleteAllTasks = () => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Task ;',
                [],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const countTasks = () => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT COUNT(id) as numbers FROM Task ;',
                [],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const searchTasksByModel = (model) => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Task '+
                'WHERE model LIKE ? ;',
                ['%'+model+'%'],
                (_var, result) => {
                    resolve(result)
                },
                (_var, error) => {
                    reject(error)
                }
            )
        })
    })
}
