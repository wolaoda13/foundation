mt.glogin = {
    page: '-/guest/login',
    init: function () {
        mt.t.head1();
        $('.logwx').attr('href', $('.logwx').attr('href') + '?from=' + encodeURIComponent(gourl));
        // 第一屏上下滚动效果-
        $('.logmobile').on('click', function () {
            $('.ldiv').eq(1).removeClass('none');
            $('.lpage').eq(0).css('margin-top', '-1000px');
        });
        if (!mt.t.isweixin) {
            $('.ldiv').eq(0).addClass('none');
            $('.ldiv').eq(1).removeClass('none');
        } else {
            var y0 = 0, y1 = 0;
            $('.ldiv').on('touchstart', function (ev) {
                y0 = ev['touches'][0].clientY;
            }).on('touchmove', function (ev) {
                y1 = ev['touches'][0].clientY;
                if (y0 > 0 && y1 - y0 > 50) {
                    y0 = 0;
                    $('.lpage').eq(0).css('margin-top', '0px');
                    setTimeout(function () {
                        $('.ldiv').eq(1).addClass('none');
                    }, 500);
                } else if (y0 > 0 && y1 - y0 < -50) {
                    $('.logmobile').click();
                }
                ev.preventDefault();
            }).on('touchend', function (ev) {
                y0 = 0;
            });
        }
        // 登录-
        mt.p.high_button();
        $('.rbtn').on('click', mt.p.smscode);
        $('.logsave').eq(0).on('click', mt.p.login);
        $('.logsave').eq(1).on('click', mt.p.register);
    }
    , in_page: function (i) {
        $('.pages').css('margin-left', (-750 * i) + 'px');
    }
    , high_button: function () {
        $('#mobile').focus(function () {
            mt.p.inm = setInterval(function () {
                if ($('#mobile').val().length == 11) {
                    if ($('.rbtn').html() == '获取')
                        $('.rbtn').removeClass('transbtn');
                } else {
                    $('.rbtn').addClass('transbtn');
                }
            }, 20);
        }).blur(function () {
            clearInterval(mt.p.inm);
        });
        $('#code').focus(function () {
            mt.p.inc = setInterval(function () {
                if ($('#code').val() && $('#mobile').val().length == 11) {
                    $('.logsave').eq(0).removeClass('transbtn');
                } else {
                    $('.logsave').eq(0).addClass('transbtn');
                }
            }, 20);
        }).blur(function () {
            clearInterval(mt.p.inc);
        });
        $('#nick').focus(function () {
            mt.p.inn = setInterval(function () {
                if ($('#nick').val()) {
                    $('.logsave').eq(1).removeClass('transbtn');
                } else {
                    $('.logsave').eq(1).addClass('transbtn');
                }
            }, 20);
        }).blur(function () {
            clearInterval(mt.p.inn);
        });
    }
    , smscode: function () {
        if ($('.rbtn').html() != '获取') return;
        
        var data = {
            mobile: $.trim($('#mobile').val()),
            type: 'login_silent',
            sk: window._sk || ''
        };
        var err = mt.p.check_form(data);
        if (!!err) {
            mt.t.alert(err);
            return;
        }
        mt.t.wait();
        $.post('?sms=other/smscode', data, function (ret) {
            mt.t.waitok();
            if (!ret.status) {
                mt.t.alert(ret.error);
                return;
            }
            var i = 60;
            $('.rbtn').html(i + 's').addClass('transbtn');
            var inter = setInterval(function () {
                $('.rbtn').html(--i + 's');
                if (i == 0) {
                    $('.rbtn').html('获取').removeClass('transbtn');
                    clearInterval(inter);
                }
            }, 1000);
        });

    }
    , login: function () {
        var data = {
            mobile: $.trim($('#mobile').val()),
            code: $('#code').val()
        };
        var err = mt.p.check_form(data, true);
        if (!!err) {
            mt.t.alert(err);
            return;
        }
        mt.t.wait();
        mt.t.post('q=users/loginToNickname&m=get&tp=log', data, function (ret) {
            if (ret.id) {
                if (gourl == '/acc/home') gourl += '?_t' + (new Date()).getTime();
                location = gourl;
            } else {
                mt.t.waitok();
                mt.p.in_page(1);
            }
        });
    }
    , register: function () {
        var data = {
            mobile: $.trim($('#mobile').val()),
            code: $('#code').val(),
            nickname: $('#nick').val()
        };
        var err = mt.p.check_form(data, true, true);
        if (!!err) {
            mt.t.alert(err, function () {
                if (err.indexOf('昵称') == -1) {
                    mt.p.in_page(0);
                }
            });
            return;
        }
        mt.t.wait();
        mt.t.post('q=users/createAfterNickname&m=get&tp=log', data, function (ret) {
            location = gourl;
        });
    }
    , check_form: function (data, hasCode, hasNick) {
        if (!data.mobile) {
            return '请输入您的手机号';
        }
        if (!mt.t.check.mobile(data.mobile)) {
            return '手机号格式不正确，请重新输入';
        }
        if (hasCode) {
            if (!data.code) {
                return '请输入验证码';
            }
        }
        if (hasNick) {
            if (!data.nickname) {
                return '请输入您的昵称';
            }
            if (!mt.t.check.nick(data.nickname)) {
                return '昵称不符合规范，请使用汉字、字母、数字或下划线的任意组合';
            }
        }
        return '';
    }
};
mt.gwxlogin = {
    page: '-/guest/wxlogin',
    init: function () {
    }
};
mt.gbindmobile = {
    page: '-/guest/bindmobile',
    init: function () {
        mt.t.head1();
        if (location.search.indexOf('ism=1') == -1) {
            $('.hdbtnr').addClass('hdbtnr2').html('跳过').off('click').on('click', function () {
                location = gourl;
            });
        }
        $('.btn-red2').click(mt.p.smscode);
        $('.btn-red').click(mt.p.save);
    }
    , check: function (data) {
        if (!data.mobile) {
            mt.t.alert('请输入您的手机号'); return false;
        }
        if (!mt.t.check.mobile(data.mobile)) {
            mt.t.alert('手机号格式不正确，请重新输入'); return false;
        }
        return true;
    }
    , smscode: function () {
        if ($('.btn-red2').hasClass('btn-gray')) return;

        var data = {
            user_id: sjson.data.id,
            mobile: $.trim($('#mobile').val())
        };
        if (!mt.p.check(data)) return;
        // send sms code
        mt.t.wait();
        mt.t.jsonp('users/bindMobile', data, function () {
            mt.t.waitok();
            var i = 60;
            $('.btn-red2').html(i + 's').addClass('btn-gray');
            var inter = setInterval(function () {
                $('.btn-red2').html(--i + 's');
                if (i == 0) {
                    $('.btn-red2').html('获 取').removeClass('btn-gray');
                    clearInterval(inter);
                }
            }, 1000);
        });

    }
    , save: function () {
        var data = {
            user_id: sjson.data.id,
            mobile: $.trim($('#mobile').val()),
            code: $('#code').val()
        };
        if (!mt.p.check(data)) return;
        if (!data.code) {
            mt.t.alert('请输入验证码'); return;
        }
        mt.t.wait();
        mt.t.post('q=users/bindMobile&tp=log', data, function (ret) {
            mt.t.waitok();
            mt.t.alert('手机绑定成功', function () {
                location = gourl;
            });
        });
    }
};
mt.t.curr_page(true);

