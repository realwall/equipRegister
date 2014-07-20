/**
 * 设备登记系统全局js
 * @author realwallliu
 * @date 2014-7-15
 */

(function(window){

    var _Eapp = {};
    var Env = {
        'alertTpl': '<div class="alert alert-danger fade in" role="alert">'
                        + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>'
                        + '<strong class="js_title">$!{title}</strong><span class="js_content">$!{content}</span>'
                    + '</div>'
    };

    $.extend(_Eapp, {
        // 获取URL参数
        'getParameter': function(name,param){
            var obj = {},
                str = param||window.location.search.replace("?","");
            var arr = str.split("&");
            if(arr.length > 0){
                for(var i = 0,l=arr.length ;i<l;i++){
                    try{
                        if(/(.*?)=(.*)/.test(arr[i])){
                            obj[RegExp.$1] = decodeURIComponent(RegExp.$2);
                        }
                    }catch(e){}
                }
            }
            return name ? obj[name] : obj;
        },
        // 模版填充
        'format' : function(tpl, metaData,filter,rules){
            var data = [],
                reg = null,
                rules = rules||{},
                tmp_str,
                tmp_tpl;
           
            if(tpl && metaData){
                if(Object.prototype.toString.call(metaData) == '[object Object]'){ //如果是纯对象则转换为数组
                    metaData = [metaData];
                }
                if(Object.prototype.toString.call(metaData) == '[object Array]'){
                    $.each(metaData,function(k,v){
                        if(!filter || filter(v,k,metaData)){
                            tmp_str = tpl;
                            tmp_tpl = tpl;
                           
                            $.each(v,function(m,n){
                                n = (rules[m] && Object.prototype.toString.call(rules[m]) == '[object Function]') ? rules[m].call(v,n,m,k,metaData) : n;
                                reg = new RegExp("\\$\\!?\\{" + m +"\\}", "gm");
                                tmp_str = tmp_tpl = tmp_tpl.replace(reg,decodeURIComponent(n));
                            })
                            data.push(tmp_str);
                        }
                    });
                    tmp_str = data.join("");
                    reg = new RegExp("\\$\\!\\{[^\\{\\}]+\\}", "gm");
                   
                    return tmp_str.replace(reg,"");
                }else{
                    return "";
                }
            }else{
                return "";
            }
        },
        /**
         * 格式化日期文本为日期对象
         *
         * @method str2Date         
         * @param {String} date 文本日期
         * @param {String} [p:%Y-%M-%d %h:%m:%s] 文本日期的格式
         * @return {Date}
         */
        str2Date: function(date, p) {
            p = p || '%Y-%M-%d %h:%m:%s';
            p = p.replace(/\-/g, '\\-');
            p = p.replace(/\|/g, '\\|');
            p = p.replace(/\./g, '\\.');
            p = p.replace(/\+/g, '\\+');
            p = p.replace('%Y', '(\\d{4})');
            p = p.replace('%M', '(\\d{1,2})');
            p = p.replace('%d', '(\\d{1,2})');
            p = p.replace('%h', '(\\d{1,2})');
            p = p.replace('%m', '(\\d{1,2})');
            p = p.replace('%s', '(\\d{1,2})');
            
            var regExp = new RegExp('^' + p + '$'),
                group = regExp.exec(date),
                Y = (group[1] || 0) - 0,
                M = (group[2] || 1) - 1,
                d = (group[3] || 0) - 0,
                h = (group[4] || 0) - 0,
                m = (group[5] || 0) - 0,
                s = (group[6] || 0) - 0;
                
            return new Date(Y, M, d, h, m, s);
        },
        
        /**
         * 格式化日期为指定的格式
         *
         * @method date2Str
         * @param {Date} date
         * @param {String} p 输出格式, %Y/%M/%d/%h/%m/%s的组合
         * @param {Boolean} [isFill:false] 不足两位是否补0
         * @return {String}
         */
        date2Str: function(date, p, isFill) {
            var Y = date.getFullYear(),
                M = date.getMonth() + 1,
                d = date.getDate(),
                h = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
                
            if (isFill) {
                M = (M < 10) ? ('0' + M) : M;
                d = (d < 10) ? ('0' + d) : d;
                h = (h < 10) ? ('0' + h) : h;
                m = (m < 10) ? ('0' + m) : m;
                s = (s < 10) ? ('0' + s) : s;
            }
            p = p || '%Y-%M-%d %h:%m:%s';
            p = p.replace(/%Y/g, Y).replace(/%M/g, M).replace(/%d/g, d).replace(/%h/g, h).replace(/%m/g, m).replace(/%s/g, s);
            return p;
        }
    });

    $.extend(_Eapp, {
        'box': {
            'show': function(config){
                config = config || {};
                config.id = config.id || 'myModal';
                config.title = config.title || '提示';
                config.content = config.content || '';
                // 设置标题和内容
                $('#' + config.id + ' .modal-title').html(config.title);
                $('#' + config.id + ' .modal-body').html(config.content);
                $('#' + config.id).modal('show');
            },
            'hide': function(config){
                config = config || {};
                config.id = config.id || 'myModal';
                $('#' + config.id).modal('hide');
            }
        },
        'alert': {
            'show': function(config){
                config = config || {};
                config.id = config.id || '';
                config.title = config.title || '';
                config.content = config.content || '';
                console.log(config)
                $('#' + config.id).html(_Eapp.format(Env.alertTpl, config));
                // $('#' + config.id + ' js-title').html(config.title);
                // $('#' + config.id + ' js-content').html(config.content);
                $('#' + config.id + ' .alert').alert();
            },
            'hide': function(config){
                config = config || {};
                config.id = config.id || '';
                $('#' + config.id + ' .alert').alert('close');
            }
        }
    });
    window.Eapp = _Eapp;
})(window);




