
/**
 * 添加设备页面请求
 */

var mysqlOperate = require('./mod/mysql_operate');

var Logic = {
    'add_equipment': function(req, res){
        var data = req.body;
        data.register_date = (new Date()).getTime();
        data.recorder = req.body.recorder || 'unknow';
        console.log(111)
        console.log(data);
        for(var key in data){
            data[key] = data[key].toString().replace(/\'/g, ' ').replace(/\"/g, ' ').replace(/\;/g, ' ');
        }
        console.log(data);
        var config = {
            'table': 'equip',
            'data': data,
            'pool': mysqlOperate.getPool(),
            'success': function(err, result){
                res.json({'retcode': 0, 'retmsg': 'ok'});
            },
            'failure': function(err, result){
                res.json(JSON.stringify({'retcode': 100, 'retmsg': 'add equipment record to mysql error'}));
            }
        };
        mysqlOperate.insert(config);
    }
};
 


module.exports = {
    'init': function(req, res){
        res.render('equipment/add', { title: 'Express' });
    },
    'add_equipment': function(req, res){
        Logic.add_equipment(req, res);
    }
};