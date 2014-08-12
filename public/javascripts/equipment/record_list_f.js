/**
 * 查找设备页面
 * @author realwallliu
 * @date 2014-7-26
 */

var tpl_record = $('#tpl_record').html();

var pageG = {
    'limit': 5,
    'offset': 0,
    'condition': {},
    'pageIndex': 0,
    'curData': null
}

var Logic = {
    'onFillList': function(data, callback){
        $('#js_record_list').html(Eapp.format(tpl_record, data.list));
        callback && callback();
    },
    'isParamOk': function(param){
        return true;
        for(var i = 0; i < param.length; i++){
            if(param[i].value){
                return true;
            }
        }
        return false;
    },
    'queryData': function(config){
        $.ajax({
            'type': 'POST',
            'url': '/equipment/record_list/search',
            'data': config.data || {},
            'success': config.success || function(){},
            'dataType': 'JSON'
        });
    },
    'onClickSearch': function(e){
        e.preventDefault();
        var paramArr = $('#record_list_form').serializeArray();
        var param = {};
        for(var i = 0; i < paramArr.length; i++){
            param[paramArr[i].name] = paramArr[i].value;
        }
        if(!Logic.isParamOk(paramArr)){
            return ;
        }
        pageG.condition = param;
        param.offset = pageG.offset = 0;
        param.limit = pageG.limit;
        var config = {
            'data': param,
            'success': function(data){
                console.log(data);
                pageG.curData = data;
                if(data.retcode == 0){
                    pageG.pageIndex = 0;
                    Logic.onFillList(data, function(){
                        if(pageG.curData.total > pageG.limit){
                            $('#previous').parent().addClass('disabled');
                            $('#next').parent().removeClass('disabled');
                            $('#js_pager').removeClass('hide');
                        }else{
                            $('#js_pager').addClass('hide');
                        }
                    });
                }else{

                }
            }
        }
        Logic.queryData(config);
    },
    'onPreviousClick': function(e){
        e.preventDefault();
        if($('#previous').parent().hasClass('disabled')){
            return ;
        }
        var pageConfig = {};
        pageConfig.data = $.extend({}, pageG.condition);
        pageG.offset -= pageG.limit;
        pageConfig.data.offset = pageG.offset;
        pageConfig.data.limit = pageG.limit;
        pageConfig.success = function(data){
            console.log(data);
            pageG.curData = data;
            if(data.retcode == 0){
                pageG.pageIndex--;
                Logic.onFillList(data, function(){
                    $('#next').parent().removeClass('disabled');
                    if(pageG.pageIndex <= 0){
                        pageG.pageIndex = 0;
                        $('#previous').parent().addClass('disabled');
                    }else{
                        $('#previous').parent().removeClass('disabled');
                    }
                });
            }else{

            }
        };
        Logic.queryData(pageConfig);
    },
    'onNextClick': function(e){
        e.preventDefault();
        if($('#next').parent().hasClass('disabled')){
            return ;
        }
        var pageConfig = {};
        pageConfig.data = $.extend({}, pageG.condition);
        pageG.offset += pageG.limit;
        pageConfig.data.offset = pageG.offset;
        pageConfig.data.limit = pageG.limit;
        pageConfig.success = function(data){
            console.log(data);
            pageG.curData = data;
            if(data.retcode == 0){
                pageG.pageIndex++;
                Logic.onFillList(data, function(){
                    $('#previous').parent().removeClass('disabled');
                    if(pageG.curData.total > pageG.limit * pageG.pageIndex + pageG.curData.list.length){
                        $('#next').parent().removeClass('disabled');
                    }else{
                        $('#next').parent().addClass('disabled');
                    }
                });
            }else{

            }
        };
        Logic.queryData(pageConfig);
    },
    'bindEvent': function(){
        $('#js_search_btn').on('click', Logic.onClickSearch);
        if(pageG.curData.total > pageG.limit){  // 记录总数大于单页记录数
            $('#previous').parent().addClass('disabled');
            $('#next').parent().removeClass('disabled');
            $('#js_pager').removeClass('hide');
        }else{
            $('#js_pager').addClass('hide');
        }
        $('#next').on('click', Logic.onNextClick);
        $('#previous').on('click', Logic.onPreviousClick);
    },
    'initView': function(){
        var param = {
            'offset': 0,
            'limit': pageG.limit
        }
        var config = {
            'data': param,
            'success': function(data){
                pageG.curData = data;
                Logic.onFillList(data, Logic.bindEvent());
            }
        };
        Logic.queryData(config);
    },
    'init': function(){
        Logic.initView();
    }
}

Logic.init();