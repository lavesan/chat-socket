const fs = require('fs');
var path = require('path');

const path_file = path.join(__dirname, '..', 'db.json');
const encoding = 'utf8';

module.exports = {
    saveMsgOnDB: async body => {
        const msgs = await new Promise((success, reject) => {
            fs.readFile(path_file, encoding, (err, data) => {
                if (err) reject(err);
                success(JSON.parse(data));
            });
        });

        msgs.push(body);

        return await new Promise((success, reject) => {
            fs.writeFile(path_file, JSON.stringify(msgs), encoding, err => {
                if (err) {
                  reject(err);
                }
                success(body);
            });
        });
    },
    getMsgs: async () => {
        const msgs = await new Promise((success, reject) => {
            fs.readFile(path_file, encoding, (err, data) => {
                if (err) reject(err);
                success(JSON.parse(data));
            });
        });
        const groups = [];
        msgs.forEach(msg => {
            if (!groups.includes(msg.group)) groups.push(msg.group);
        });
        const res = {};
        groups.forEach(group => {
            res[group] = msgs.filter(msg => msg.group === group);
        });
        return res;
    },
}