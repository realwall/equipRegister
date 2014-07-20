/**
 * 设备登记页面
 * @author realwallliu
 * @date 2014-7-20
 */



var Logic = {
    'getElesByFormName': function(name){
        var form = $("form[name='" + name + "']")||$(name);
        var eles = form.length > 0 ? form[0].elements : []
        
        eles = $.grep(eles,function(v){
            return v.tagName != "FIELDSET";
        })

        return eles;
    },
    'checkForm': function(form){
        var els = Logic.getElesByFormName(form);
        console.log(els);
        var ret = true;
        $.each(els, function(index, item){
            if($(item).attr('require') != null && $(item).prop('value') == ''){
                ret = false;
                // Eapp.box.show({
                //     'content': $(item).data('empty')
                // });
                Eapp.alert.show({
                    'id': 'js_form_warp',
                    'content': $(item).data('empty')
                });
            }
        });
        return ret;
    },
    'register': function(e){
        if(!Logic.checkForm('add_form')){
            return ;
        };
        Eapp.alert.hide({'id': 'js_form_warp'});
        e.preventDefault();
        var param = $('#add_form').serialize();
        $.ajax({
            'type': 'POST',
            'url': '/equipment/register/register',
            'data': param,
            'success': function(data){
                console.log(data);
                $('#js_form_warp').addClass('hide');
                if(data.retcode == 0){
                    $('#js_res_warp .alert').addClass('alert-success').html('添加成功，可在“我的设备”中查看');
                }else{
                    $('#js_res_warp .alert').addClass('alert-danger').html('添加失败');
                }
                $('#js_res_warp').removeClass('hide');
            },
            'dataType': 'JSON'
        });
    },
    'bindEvent': function(){
        $('#js_i_hold').on('click', Logic.onClickAdd);
    },
    'init': function(){
        Logic.bindEvent();
    }
}

Logic.init();