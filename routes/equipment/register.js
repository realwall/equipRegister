
/**
 * 添加设备页面请求
 */

var mysqlOperate = require('./mod/mysql_operate');

var Logic = {

    'init': function(req, res){
        console.log(req.params);
        var config = {
            'table': 'equip',
            'data': {},
            'pool': mysqlOperate.getPool(),
            'sql': 'select * from equip where id=' + req.params.id,
            'success': function(err, result){
                Logic.onSuccess.call(this, req, res, err, result);
            },
            'fail': function(err, result){
                res.json(JSON.stringify({'retcode': 100, 'retmsg': 'add equipment record to mysql error'}));
            }
        };
        mysqlOperate.select(config);
    },
    'onSuccess': function(req, res, err, result){
        // result = result.map(function(item,index){
        //     item.tr_class = index % 2 ? '' : 'active';
        //     return item;
        // });
        res.render('equipment/register', { title: 'Express' , list: result});
    },
    'add': function(req, res){
        console.log(JSON.stringify(req.body));
        var data = req.body;
        data.pass_time = (new Date()).getTime();
        data.recorder = req.body.recorder || 'unknow';
        for(var key in data){
            data[key] = data[key].toString().replace(/\'/g, ' ').replace(/\"/g, ' ').replace(/\;/g, ' ');
        }
        var config = {
            'table': 'pass',
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
        Logic.init(req, res);
        // res.render('equipment/register', { title: 'Express' });
    },
    'add': function(req, res){
        Logic.add(req, res);
    }
};