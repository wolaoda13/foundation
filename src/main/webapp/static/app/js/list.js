mt.curr = {
    init: function () {
        mt.p = mt.curr;
        mt.p.qdate = mt.t.query('begin_date');

        mt.p.in_head();
        mt.p.in_bottom();

      
    }
    , getapical: function () {
        var pdata = {
            city_id: mt.t.city_id,
            pro_type: mt.t.query('pro_type'),
            route_type: mt.t.query('route_type')
        };
        mt.t.jsonp('sProduct/getCalendarDatas', pdata, function (ret) {
            mt.p.rili = ret;
            if (ret.length == 0) {
                return;
            }
            $('.h88').removeClass('none');
            var min = ret[0].date;
            var max = ret[ret.length - 1].date;
            if (mt.p.qdate) {
                if (mt.p.qdate <= min) {
                    $('.hdcal2 .btnl').addClass('btnl2');
                }
                if (mt.p.qdate >= max) {
                    $('.hdcal2 .btnr').addClass('btnr2');
                }
            }
            // 填充日历-
            mt.p.in_cal(min.toDate(), max.toDate());
        });
    }
    , in_head: function () {
        $('.hdbtnl').removeClass('hide').html('').off('click').on('click', function () {
            location = ctx+'/web/index.jsp';
        }).addClass('hdbtnl2');

        $('.head').append($('.listhd'));

        $('.hdbtnr').addClass('hdbtnsc').off('click').on('click', function () {
            mt.p.in_search();
            $('.put0').focus();
        });
        var kw = mt.t.query('keyword');
        if (kw) {
            mt.p.in_search();
            $('.put0').val(kw);
            document.title = kw;
        }
        $('.mcity a').attr('href', function () {
            return this.href += '&pro_type={0}&route_type={1}'.format(
                mt.t.query('pro_type'), mt.t.query('route_type'));
        });
        if (mt.p.qdate) {
            $('.hdcal').eq(0).addClass('none');
            $('.hdcal2,.hdcalbtn').removeClass('none');
            $('.hdcal i').eq(1).html(mt.p.qdate.substr(5));
            
            // 前/后一天事件-
            $('.hdcal2 .btnl').on('click', function () {
                if ($(this).hasClass('btnl2')) return;
                var d = mt.p.qdate.toDate();
                d.setDate(d.getDate() - 1);
                location = mt.t.reurl('begin_date', d.toDate());
            });
            $('.hdcal2 .btnr').on('click', function () {
                if ($(this).hasClass('btnr2')) return;
                var d = mt.p.qdate.toDate();
                d.setDate(d.getDate() + 1);
                location = mt.t.reurl('begin_date', d.toDate());
            });
        }
        $('.hdcal').on('click', function () {
            mt.t.shide();
            $('.hdcalbody').removeClass('none');
            
            // 点击空白处关闭日历-
            $('.shide2').on('touchstart', function (ev) {
                if (ev.touches[0].pageY > 700) {
                    $('.hdcalbody').addClass('none');
                    $('.shide2').remove();
                    ev.preventDefault();
                    return false;
                }
            });
        });
        $('.hdcalbtn').on('click', function () {
            location = mt.t.reurl('begin_date');
        });
    }
    , in_search: function () {
        mt.home.in_search();

        $('.hdlogo .put0').on('focus', function () {
            $('.listhd').addClass('none');
        }).on('blur', function () {
            setTimeout(function () {
                $('.listhd').removeClass('none');
                if (!mt.t.query('keyword')) {
                    $('.hdlogo').on('click', function () {
                        location = ctx+'/web/index.jsp';
                    }).removeClass('hdlogo2').html('');

                    $('.hdbtnr').off('click').on('click', function () {
                        mt.home.in_search();
                        $('.put0').focus();
                    });
                }
            }, 100);
        });
    }
    , gosearch: function (k) {
        location = mt.t.reurl('keyword', (k));
    }
    , in_bottom: function () {
        

        
       
    }
    , getfilter: function () {
        var q = '';
        $('.lbfcr div[data-key]').each(function () {
            var t = $(this), key = t.attr('data-key'), val = [];
            t.find('http://m.maitao.com/content/scripts/p.act').each(function () {
                var a = $(this).attr('data-val');
                if (a) val.push(a);
            });
            if (val.length > 0) {
                q += '&{0}={1}'.format(key, val.join(','));
            }
        });
        $('.lbfcl>p.fdot').removeClass('fdot');
        $('.lbfcr>div').each(function (i,e) {
            var isf = $(this).find('p').eq(0).hasClass('act');
            if (!isf) {
                $('.lbfcl>p').eq(i).addClass('fdot');
            }
        });
        return q;
    }
    , requery: function (sort_type) {
        var url = location.href;
        $('.lbfcr div').each(function () {
            var k = $(this).attr('data-key');
            if (k) {
                url = mt.t.reurl(k, '', url);
            }
        });

        url += mt.p.getfilter();
        url = mt.t.reurl('sort_type', sort_type || '', url);
        if (url.indexOf('?') == -1) url = url.replace('&', '?');

        location = url;
    }
    , in_cal: function (d1, d2) {
        var year = d1.getFullYear(), month = d1.getMonth();
        var mm = d2.getFullYear() * 12 + d2.getMonth() - (year * 12 + month);
        for (var i = 0; i <= mm; i++) {            
            var s = '<div class="cali">' + mt.p.getcal(year, month) + '</div>';
            $('#calbox2').append(s);
            month++;
            if (month > 11) {
                year += 1;
                month -= 12;
            }
        }
        $('.cal>div[data-date="' + (new Date().toDate()) + '"]').find('.ri').html('今天');

        if (mt.p.qdate) {
            $('.cal>div').each(function () {
                var t = $(this);
                if (t.attr('data-date') == mt.p.qdate) {
                    t.addClass('hover');
                    var left = (t.parent().parent().index() * -750);
                    $('#calbox2').css('left', left + 'px');
                }
            });
        }
        $('.mprev').eq(0).addClass('mprev2');
        $('.mnext').eq($('.mnext').length - 1).addClass('mnext2');
        
        $('.cal .act,.cal .dis').on('click', function () {
            location = mt.t.reurl('begin_date', $(this).attr('data-date'));
        });
        mt.p.chgcal = function (i) {
            var left = parseInt($('#calbox2').css('left'), 10);
            if (i > 0) {
                if (left * -1 + 760 > $('.cali').length * 750) return;
            }
            if (i < 0 && left > -10) {
                return;
            }
            left -= (750 * i);
            $('#calbox2').css('left', left + 'px');
        };
        // 上个月-
        $('.mprev').on('click', function () {
            if ($(this).hasClass('mprev2')) return;
            mt.p.chgcal(-1);
        });
        // 下个月-
        $('.mnext').on('click', function () {
            if ($(this).hasClass('mnext2')) return;
            mt.p.chgcal(1);
        });
        mt.p.calslide();
    }
    , getcal: function (year, month) {
        var s = '';
        var mm = month + 1;
        if (mm < 10) mm = '0' + mm;
        s += '<div class="calhd"><i class="v2icon mprev">PREV</i><i>{0}年{1}月</i><i class="v2icon mnext">NEXT</i></div>'.format(year, mm);
        s += '<div class="calwk"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>';
        s += '<div class="cal">';
        var a1 = new Date(year, month, 1).getDay();
        var r = 0;
        for (var i = 0; i < a1; i++) {
            s += '<div{0}></div>'.format(r % 7 == 0 ? ' class="ll"' : '');
            r++;
        }
        var dd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        if (year % 4 == 0 && month == 1) dd = 29;
        for (var i = 1; i <= dd; i++) {
            var curr_d = '{0}-{1}-{2}'.format(year, mm, i < 10 ? '0' + i : i);
            var m = mt.p.getitem(curr_d);
            if (!m) {
                s += '<div{0} data-date="{1}"><i class="ri">{2}</i></div>'.format(
                    (r % 7 == 0 ? ' class="ll"' : ''), curr_d, i);
            } else {
                s += '<div class="{0}{1}" data-date="{2}"><i class="ri">{3}</i><i class="green">{4}</i></div>'.format(
                    (m.status ? 'act' : 'dis'), (r % 7 == 0 ? ' ll' : ''), curr_d, i, m.text
                    );
            }
            r++;
        }
        while (r % 7 > 0) {
            s += '<div></div>';
            r++;
        }
        s += '</div>';
        return s;
    }
    , load_data: function () {

        var q = location.search || '?';
        q = mt.t.reurl('pro_type', mt.t.query('pro_type'), q);
        q = mt.t.reurl('route_type', mt.t.query('route_type'), q);
        if (mt.t.query('sort_type') == '1') {
            var loc = mt.t.getLocation();
            if (loc) {
                q += '&lon=' + loc.split(',')[0];
                q += '&lat=' + loc.split(',')[1];
            }
        }
        q += '&start=' + $('.act-box').length;
        q += '&limit=10';
        
        mt.t.loadacts2(q.substr(1), '', true);
    }
    , getitem: function (date) {
        for (var i in mt.p.rili) {
            if (mt.p.rili[i].date == date) return mt.p.rili[i];
        }
        return null;
    }
    , calslide: function () {
        var ip_x = 0;
        $('.cal').on('touchstart', function (ev) {
            ip_x = ev.touches[0].clientX;
        }).on('touchmove', function (ev) {
            if (!ip_x) return;
            var x = ev.touches[0].clientX;
            var yet = 0;
            if (x - ip_x < -30) {
                yet = 1;
                mt.p.chgcal(1);
            }
            if (x - ip_x > 30) {
                yet = -1;
                mt.p.chgcal(-1);
            }
            if (yet != 0) {
                ip_x = 0;
                ev.preventDefault();
                return false;
            }
        })
    }
};
mt.curr.init();