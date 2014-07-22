
/**
 * 数据库操作库
 * @author realwallliu
 * @date 2014-7-15
 */

var mysql = require('mysql');
var mysqlPool;

var Logic = {
    /**
     * 获取数据库连接池
     * @author realwallliu
     * @date 2014-7-15
     */
    'getPool': function(){
        try{
            if(!mysqlPool){
                mysqlPool = mysql.createPool({
                    'host': 'localhost',
                    'user': 'root',
                    'password': '',
                    'port': '3306',
                    'database': 'equipment'
                });
            }
        }catch(e){
            console.log(e);
        }
        
        return mysqlPool;
    },
    /**
     * mysql数据库操作
     * @author realwallliu
     * @param {Object} config 配置
     */
    'insert': function(config){
        config.database = config.database || 'equipment';
        var data = config.data;
        var nameList = [];
        var valueList = [];
        var dlen = data.length;
        for(var key in data){
            nameList.push("`" + key + "`");
            valueList.push("'" + data[key] + "'");
        }

        var sqlStr = "INSERT INTO `" + config.database + "`.`" + config.table+ "` (" + nameList.join(',') + ") VALUES (" + valueList.join(',') + ")";
        console.log(sqlStr);
        // 执行SQL语句
        config.pool.getConnection(function(err, connection){
            connection.query(sqlStr, function(err, result){
                if(err){
                    connection.rollback(function(){
                        // 执行失败回调
                        typeof config.success == 'function' && config.failure.call(config, err, result);
                        // throw err;
                    });
                }
                // 将连接释放到连接池
                connection.release();
                // 执行成功回调
                typeof config.success == 'function' && config.success.call(config, err, result);
            });
        });
    },
    /**
     * 查询数据
     * @author realwallliu
     * @date 2014-7-15
     */
    'select': function(config){
        var sqlStr = config.sql || "select * from equip order by id desc";
        console.log(sqlStr);
        // 执行SQL语句
        config.pool.getConnection(function(err, connection){
            connection.query(sqlStr, function(err, result){
                console.log('select result: ' + JSON.stringify(result));
                if(err){
                    connection.rollback(function(){
                        // 执行失败回调
                        typeof config.fail == 'function' && config.fail.call(config, err, result);
                        // throw err;
                    });
                }
                // 将连接释放到连接池
                connection.release();
                // 执行成功回调
                typeof config.success == 'function' && config.success.call(config, err, result);
            });
        });
        return mysqlPool;
    }
};


module.exports = {
    'getPool': Logic.getPool,
    'insert': Logic.insert,
    'select': Logic.select
};
