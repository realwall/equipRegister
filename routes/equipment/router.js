
var requireMod = {};

requireMod.record_list = require('./record_list');
requireMod.add = require('./add');
requireMod.my = require('./my');
requireMod.register = require('./register');


exports.route = function(router){
    // 首页
    router.get('/equipment/index', function(req, res) {
        res.render('equipment/index', { title: 'Express' });
    });

    // 登记列表
    router.get('/equipment/record_list', function(req, res) {
        res.render('equipment/record_list', { title: 'Express' });
    });

    // 添加设备页面展示
    router.get('/equipment/add', requireMod.add.init);
    // 添加设备
    router.post('/equipment/add/add_equipment', requireMod.add.add_equipment);


    // 我的设备
    router.get('/equipment/my', requireMod.my.init);

    // 关于
    router.get('/equipment/about', function(req, res) {
        res.render('equipment/about', { title: 'Express' });
    });


    // 设备登记页面展示
    router.get('/equipment/register/:id', requireMod.register.init);
    // 设备登记
    router.post('/equipment/register/add', requireMod.register.add);
};
