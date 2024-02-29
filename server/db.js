const { Client } = require('pg');

const where = (conditions) => {
    let clause = '';
    const args = [];
    let i = 1;
    for (const key in conditions) {
        let value = conditions[key];
        let condition;
        if (typeof value === 'number') {
            condition = `${key} = $${i}`;
        } else if (typeof value === 'object') {
            const operator = value.operator;
            value = value.value;
            condition = `${key}  ${operator}($${i}::int[])`;
        } else if (typeof value === 'string') {
            if (value.startsWith('IN')) {
                value = value.substring(2);
                condition = `${key} IN ($${i}::int[])`;
            }
            if (value.startsWith('>=')) {
                condition = `${key} >= $${i}`;
                value = value.substring(2);
            } else if (value.startsWith('<=')) {
                condition = `${key} <= $${i}`;
                value = value.substring(2);
            } else if (value.startsWith('<>')) {
                condition = `${key} <> $${i}`;
                value = value.substring(2);
            } else if (value.startsWith('>')) {
                condition = `${key} > $${i}`;
                value = value.substring(1);
            } else if (value.startsWith('<')) {
                condition = `${key} < $${i}`;
                value = value.substring(1);
            } else if (value.includes('*') || value.includes('?')) {
                value = value.replace(/\*/g, '%').replace(/\?/g, '_');
                condition = `${key} LIKE $${i}`;
            } else {
                condition = `${key} = $${i}`;
            }
        }
        i++;
        args.push(value);
        clause = clause ? `${clause} AND ${condition}` : condition;
    }
    return { clause, args };
};

const MODE_ROWS = 0;
const MODE_VALUE = 1;
const MODE_ROW = 2;
const MODE_COL = 3;
const MODE_COUNT = 4;

class Cursor {
    constructor(database, table) {
        this.database = database;
        this.table = table;
        this.cols = null;
        this.rows = null;
        this.rowCount = 0;
        this.ready = false;
        this.mode = MODE_ROWS;
        this.whereClause = undefined;
        this.columns = ['*'];
        this.args = [];
        this.orderBy = undefined;
        this.limit = 10;
        this.offset;
    }

    resolve(result) {
        const { rows, fields, rowCount } = result;
        this.rows = rows;
        this.cols = fields;
        this.rowCount = rowCount;
    }

    where(conditions) {
        const { clause, args } = where(conditions);
        this.whereClause = clause;
        this.args = args;
        return this;
    }

    fields(list) {
        this.columns = list;
        return this;
    }

    value() {
        this.mode = MODE_VALUE;
        return this;
    }

    row() {
        this.mode = MODE_ROW;
        return this;
    }

    col(name) {
        this.mode = MODE_COL;
        this.columnName = name;
        return this;
    }

    count() {
        this.mode = MODE_COUNT;
        return this;
    }

    order(name) {
        this.orderBy = name;
        return this;
    }

    setLimit(count = 10) {
        this.limit = count;
        return this;
    }

    setOffset(offset) {
        this.offset = offset;
        return this;
    }

    async query(callback) {
        // TODO: store callback to pool
        const { mode, table, columns, args } = this;
        const { whereClause, orderBy, columnName, limit, offset } = this;
        const fields = columns.join(', ');
        let sql = `SELECT ${fields} FROM ${table}`;
        if (whereClause) sql += ` WHERE ${whereClause}`;
        if (orderBy) sql += ` ORDER BY ${orderBy}`;
        if (limit) sql += ` LIMIT ${limit}`;
        if (offset) sql += ` OFFSET ${offset}`;
        const res = await this.database.query(sql, args);
        this.resolve(res);
        const { rows, cols } = this;
        if (mode === MODE_VALUE) {
            const col = cols[0];
            const row = rows[0];
            return row[col.name];
        } else if (mode === MODE_ROW) {
            return rows[0];
        } else if (mode === MODE_COL) {
            const col = [];
            for (const row of rows) {
                col.push(row[columnName]);
            }
            return col;
        } else if (mode === MODE_COUNT) {
            return this.rowCount;
        } else {
            return rows;
        }
        return this;
    }

    async queryRowsCount() {
        const { table, args } = this;
        const { whereClause, orderBy } = this;
        let sql = `SELECT COUNT(*) FROM ${table}`;
        if (whereClause) sql += ` WHERE ${whereClause}`;
        const res = await this.database.query(sql, args);
        return res.rows[0].count;
    }
}

class Database {
    constructor() {
        this.client = new Client({
            host: 'localhost',
            port: 5432,
            database: 'node-shop',
            user: 'postgres',
            password: 'postgres',
        });
        // this.config = config;
        // this.logger = logger;
    }

    async query(sql, values, callback) {
        if (typeof values === 'function') {
            callback = values;
            values = [];
        }
        const startTime = new Date().getTime();
        console.log({ sql, values });
        const endTime = new Date().getTime();
        const result = await this.client.query(sql, values);
        const executionTime = endTime - startTime;
        console.log(`Execution time: ${executionTime}`);
        return result;
    }

    select(table) {
        return new Cursor(this, table);
    }

    close() {
        this.client.end();
    }
}

module.exports = new Database();
