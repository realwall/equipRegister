
/**
 * 添加设备页面请求
 */

var mysqlOperate = require('./mod/mysql_operate');

var Logic = {
    'onSuccess': function(req, res, err, result){
        result = result.map(function(item,index){
            item.tr_class = index % 2 ? '' : 'active';
            return item;
        });
        res.render('equipment/my', { title: 'Express' , list: result});
    },
    'init': function(req, res){
        
        var config = {
            'table': 'equip',
            'data': {},
            'pool': mysqlOperate.getPool(),
            'success': function(err, result){
                Logic.onSuccess.call(this, req, res, err, result);
            },
            'failure': function(err, result){
                res.json(JSON.stringify({'retcode': 100, 'retmsg': 'add equipment record to mysql error'}));
            }
        };
        console.log()
        mysqlOperate.select(config);
    }
};
 


module.exports = {
    'init': function(req, res){
        Logic.init(req, res);
    }
};