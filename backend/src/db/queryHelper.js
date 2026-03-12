const db = require('./connection.js');

// const query = (sql, value = []) => {
//     return new Promise((resolve, reject) => {
//         db.query(sql, value, (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(result)
//         });
//     });
// };
const query = async (sql, values = []) => {
    try {
        const result = await db.query(sql, values);
        return result.rows;
    } catch (err) {
        console.error("Database Query Error:", err);
        throw err;
    }
};

const insertData = async (table, data, returning = "*") => {
    const fields = Object.keys(data);
    console.log('fieldsInsert:', fields);

    const value = Object.values(data);
    console.log("valueInsert:", value);

    const placeHolder = fields.map((_, index) => `$${index + 1}`).join(', ');
    console.log("placeHolderInsert:", placeHolder);

    const sql = `insert into ${table} (${fields.join(', ')}) values (${placeHolder}) returning ${returning} `;
    console.log("sqlInsert:", sql);

    return await query(sql, value);
}

const selectData = async (table, fields = ["*"], where = {}, options = {}) => {
    if (!Array.isArray(fields)) {
        where = fields;
        fields = ["*"];
    };

    const fieldList = fields.join(', ');
    console.log("fieldListSelect:", fieldList);

    let sql = `select ${fieldList} from ${table} `;

    const values = [];
    let paramIndex = 1;

    if (options.join) sql += `${options.join} `;

    const keys = Object.keys(where);
    console.log("keysSelect:", keys);

    if (keys.length) {
        const whereData = keys.map(key => {
            values.push(where[key]);
            return `${key} = $${paramIndex++}`;
        }).join(" and ");
        console.log("whereDataSelect:", whereData);

        sql += `where ${whereData}`
    }

    if (options.like) {
        const likeKeys = Object.keys(options.like);
        console.log("likeKeysSelect:", likeKeys);

        if (likeKeys.length) {
            const likeData = likeKeys.map(key => {
                values.push(`%${options.like[key]}%`);
                return `${key} like $${paramIndex++}`;
            }).join(" and ");
            console.log("likeDataSelect:", likeData);

            if (!keys.length) {
                console.log('inWhere');
                sql += `where ${likeData} `;
            } else {
                console.log('inAnd');
                sql += `and ${likeData} `;
            };
        };
    };

    if (options.groupBy) sql += `group by ${options.groupBy} `;
    if (options.orderBy) sql += `order by ${options.orderBy} `;
    if (options.limit) sql += `limit ${options.limit} `;

    console.log("sqlSelect:", sql);
    console.log("valuesSelect:", values);

    return await query(sql, values);

}

module.exports = { insertData, selectData }