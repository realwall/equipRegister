/**
 * 设备登记页面
 * @author realwallliu
 * @date 2014-7-20
 */



var Logic = {
    'onClickBackI': function(e){
        e.preventDefault();
        $('#js_i_warp').removeClass('hide');
        $('#js_other_warp').addClass('hide');
    },
    'onClickOtherHold': function(e){
        e.preventDefault();
        $('#js_i_warp').addClass('hide');
        $('#js_other_warp').removeClass('hide');
    },
    'onClickIHold': function(e){
        e.preventDefault();
        var param = {
            'holder': 'iiii'
        };
        Logic.register(param);
    },
    'onClickRegister': function(e){
        e.preventDefault();
        var param = {
            'holder': $('#js_holder_text').prop('value')
        };
        Logic.register(param);
    },
    'register': function(param){
        var idreg = /\/(\d+)$|\/(\d+)\?/gi;
        var resArr = idreg.exec(location.href);
        console.log(resArr);
        param.equip_id = resArr[1] || resArr[2];
        console.log(param);
        $.ajax({
            'type': 'POST',
            'url': '/equipment/register/add',
            'data': param,
            'success': function(data){
                console.log(data);
                if(data.retcode == 0){
                    
                }else{
                    
                }
            },
            'dataType': 'JSON'
        });
    },
    'bindEvent': function(){
        $('#js_i_hold').on('click', Logic.onClickIHold);
        $('#js_register_btn').on('click', Logic.onClickRegister);
        $('#js_other_hold').on('click', Logic.onClickOtherHold);
        $('#js_back_i').on('click', Logic.onClickBackI);
    },
    'init': function(){
        Logic.bindEvent();
    }
}

Logic.init();