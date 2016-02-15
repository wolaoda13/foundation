var mt = {
    doing: false,
    version: 2.50,
    p: {} // 当前页
};

// 通用/工具 
mt.t = {
    down: {
        ios: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.maitao.mtqzy'
        , android: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.maitao.mtqzy'
    }
    , init: function () {
        $('.hdbtnl').on('click', function () {
            $('.menu').addClass('none');
            if ($('.mcity').hasClass('none')) {
                $('.mcity').removeClass('none').off('touchmove').on('touchmove', function () {
                    $('.mcity').addClass('none');
                });
            } else {
                $('.mcity').addClass('none');
            }
        });
        $('.hdbtnl').html(mt.t.getcityname(mt.t.city_id));

        if ($('.hdbtnl').length>0 && $('.hdbtnl').html().length > 2) {            
            setTimeout(function () {
                $('.hdbtnl').css('width', '124px');
                $('.hdlogo').css('margin-left', '30px');
            }, 100);
        }

        $('.hdbtnr').on('click', function () {
            $('.mcity').addClass('none');
            if ($('.menu').hasClass('none')) {
                $('.menu').removeClass('none');
            } else {
                $('.menu').addClass('none');
            }
        });
        $('.hdlogo').on('click', function () {
            location = ctx+'/web/index.jsp';
        });

        // 上下滑动展示/隐藏菜单-
        $('.body').on('touchstart', function (ev) {
            window.pos1 = { x: ev['touches'][0].clientX, y: ev['touches'][0].clientY };
            window.pos2 = null;
            $('.mcity,.menu').addClass('none');
            var t = $(ev.target), find = false;
            while (t.length > 0) {
                if (t.hasClass('lmenu') || t.hasClass('ltab')) {
                    find = true; break;
                }
                t = t.parent();
            }
            if (!find) {
                $('.lmenu2').addClass('none');
                $('.ltab2').removeClass('hover');
            }
        }).on('touchmove', function (ev) {
            window.pos2 = { x: ev['touches'][0].clientX, y: ev['touches'][0].clientY };
            var c = mt.t.isandroid ? 5 : 90;            
            if (mt.t.top() < 100) {
                $('.head').removeClass('none');
            } else {
                if (pos2.y - pos1.y > c) { // 下滚-
                    $('.head').removeClass('none');
                    pos1 = pos2;
                    mt.mdown && mt.mdown();
                }
                if (pos2.y - pos1.y < c * -1) { // 上滚-
                    $('.head').addClass('none');
                    pos1 = pos2;
                    mt.mup && mt.mup();
                }
            }
            $('.lmenu2').addClass('none');
            $('.ltab2').removeClass('hover');
        });
        setInterval(function () {
            var t = mt.t.top();
            if (t < 100) {
                $('.head').removeClass('none');
            }
            if (t > 2000) {
                $('.totop').removeClass('none');
            } else {
                $('.totop').addClass('none');
            }
        }, 100);

        mt.t.goto();

        setTimeout(function () {
            mt.t.wxshare('http://img.maitao.com/635627318209928748'
                , (window.wxtit || document.title)
                , '麦淘亲子游 和孩子一起探索世界');
        }, 2000);
    }
    , curr_page: function (is_sub) {
        var path = location.pathname.replace('//','/');
        for (var i in mt) {
            if (mt[i].page) {
                var s = mt[i].page;
                if (is_sub) s = s.substr(1);
                var reg = new RegExp('^' + s + '$', 'i');
                if (reg.test(path)) {
                    mt.p = mt[i];
                    mt.p.init && mt.p.init();
                    break;
                }
            }
        }
    }
    , isandroid: (function () {
        return navigator.userAgent.toLowerCase().indexOf('android') != -1;
    })()
    , isios: (function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1;
    })()
    , isweixin: (function () {
        return navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
    })()
    , ispc: function () {
        return !(mt.t.isandroid || mt.t.isios);
    }
    , getcityname: function (city_id) {
        var cityname = '';
        $('.mcity a').each(function () {
            if ($(this).attr('data-val') == city_id) {
                cityname = this.innerHTML;
            }
        });
        return cityname;
    }
    // 格式验证 
    , check: {
        mobile: function (s) {
            return /^1\d{10}$/.test(s);
        }
        , email: function (s) {
            return /^([a-z0-9][a-z0-9_\-\.]*)@([a-z0-9][a-z0-9\.\-]{0,20})\.([a-z]{2,4})$/i.test(s);
        }
        , nick: function (s, canSpace) {
            if (canSpace) s = s.replace(/\s+/g, '');
            var ok = /^[a-z0-9_\u4e00-\u9fa5]{2,20}$/i.test(s);
            if (ok) {
                ok = !/admin|master|管理员/i.test(s);
            }
            return ok;
        }
        , cardid: function (s) {
            return /^\d{15}(\d{2}(\d|x))?$/i.test(s);
        }
        , namecn: function (s) {
            return /^[\u4e00-\u9fa5]{2,5}$/.test(s);
        }
        , nameen: function (s) {
            return /^[a-z]{2,20}(\s[a-z]{1,20})*$/i.test(s);
        }
        // 转换成固定日期格式yyyy-mm-dd 
        , date: function (s) {
            var reg = /^(\d{4})[-/.]?(0?[1-9]|1[0-2])[-/.]?([0-3]?[0-9])$/;
            var res = reg.exec(s);
            if (!res) return '';
            return res[1] + '-' + res[2] + '-' + res[3];
        }
        // 转换成固定日期格式yyyymmdd 
        , date2: function (s) {
            if (!s) return '';
            return s.split(' ')[0];//.replace(/-/g, '');
        }
    }
    , query: function (name, url) {
        if (!url) url = location.href;
        var mat = new RegExp('[?&]' + name + '=(.*?)(&|#|$)').exec(url);
        if (!mat) mat = new RegExp('/' + name + '-([^/]*)').exec(url);
        if (mat) return decodeURIComponent(mat[1]);
        return '';
    }
    , cookie: {
        get: function (key) {
            var mat = new RegExp('(^|[^a-z])' + key + '=(.*?)(;|$)', 'i').exec(document.cookie);
            return mat ? decodeURIComponent(mat[2]) : '';
        }
        , set: function (key, val, days) {
            var ck = key + '=' + encodeURIComponent(val);
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 3600 * 1000);
                ck += "; expires="+date.toGMTString();
            }
            ck += '; path=/';
            document.cookie = ck;
        }
        , del: function (key) {
            mt.t.cookie.set(key, '', -10);
        }
    }
    , obj2str: function (obj) {
        var s = '';
        for (var a in obj) {
            s += ',"' + a + '":';
            var b = obj[a];
            if (typeof b == 'string') {
                s += '"' + b.replace(/[\r\n]/g, '').replace('\\', '\\\\').replace('"', '\\"') + '"';
            } else if (typeof b == 'object') {
                s += mt.t.obj2str(b);
            } else {
                s += b;
            }
        }
        s = '{' + s.substr(1) + '}';
        return s;
    }
    , goto: function () {
        $('.goto').each(function () {
            var t = $(this);
            if (!t.hasClass('goto2')) {
                t.on('click', function () {
                    var href = $(this).attr('data-href');
                    var log = mt.t.cookie.get('homelog');
                    if (log) {
                        var id = href.split('/detail/')[1];
                        mt.t.cookie.set(id, log, 0.02);
                    }
                    location = href;
                });
                t.addClass('goto2');
            }
        });
    }
    , alert: function (msg, func_ok) {
        window.alert_ok = func_ok || function () { };
        var s = '<div class="shide">'
            + '<div class="alert">'
            + '<div class="botl con center">{0}</div>'
            + '<div class="cfbot" onclick="mt.t.delshide();alert_ok();"><i class="green">确定</i></div>'
            + '</div></div>';
        s = s.format(msg);
        $(document.body).append(s);
        $('.shide').on('touchmove', function (ev) {
            ev.preventDefault();
            return false;
        });
    }
    , confirm: function (msg, func_cancel, func_ok) {
        window.confirm_cancel = func_cancel || function () { };
        window.confirm_ok = func_ok || function () { };
        var s = '<div class="shide">'
            + '<div class="alert">'
            + '<div class="botl con center">{0}</div>'
            + '<div class="cfbot">'
            + '<i class="green left" onclick="mt.t.delshide();confirm_cancel()">取消</i>'
            + '<i class="green right" onclick="mt.t.delshide();confirm_ok()">确定</i></div>'
            + '</div></div>';
        s = s.format(msg);
        $(document.body).append(s);
        $('.shide').on('touchmove', function (ev) {
            ev.preventDefault();
            return false;
        });
    }
    , delshide: function () {
        // 不立即删除是因为callback可能会用到弹窗的内容-
        $('.shide').addClass('none');
        setTimeout(function () {
            $('.shide').remove();
        }, 10);
    }
    , wxnote: function(msg) {
        var s = '<div class="shide" onclick="$(this).remove()">';
        s += '<div class="note"><div class="note-n">';
        s += '<p>请点击右上角按钮</p><p>' + msg + '</p>';
        s += '</div></div></div>';
        $(s).appendTo($(document.body));
    }
    , wait: function (msg) {
        var s = '<div class="loading">';
        s += '<div class="ld">';
        s += '<img src="../images/loading_L.gif"/*tpa=http://m.maitao.com/content/images/loading_L.gif*/ />';
        s += '<p>' + (msg || '加载中...') + '</p>';
        s += '</div></div>';
        $(document.body).append(s);
        mt.doing = true;
    }
    , waitok: function () {
        $('.loading').remove();
        mt.doing = false;
    }
    , loading: function (done) {
        if (!done) $('.body').append('<p id="pld" class="center c6"><br /><br />加载中...</p>');
        else $('#pld').remove();
    }
    , shide: function (hide) {
        if (hide) {
            $('.shide2').remove();
        } else {
            var s = '<div class="shide2"></div>';
            $(document.body).append(s);
        }
    }
    , top: function (y) {
        if (typeof y == 'undefined') return document.body.scrollTop;
        document.body.scrollTop = y;
        if (y < 90) $('.head').removeClass('none');
    }
    // 优化浏览器onclick
    , mclick: function (selector, callback) {
        if (mt.t.ispc()) {
            $(selector).on('click', function () {
                if (!!callback) { callback(this); }
                else { location = $(this).attr('data-href'); }
            });
            return;
        }
        var pos1 = [0, 0], pos2;
        $(selector).off('touchstart').on('touchstart', function (ev) {
            pos1 = [ev['touches'][0].clientX, ev['touches'][0].clientY];
        }).off('touchmove').on('touchmove', function (ev) {
            pos2 = [ev['touches'][0].clientX, ev['touches'][0].clientY];
        }).off('touchend').on('touchend', function (ev) {
            if (pos2) {
                var movepx = Math.abs(pos2[0] - pos1[0]) + Math.abs(pos2[1] - pos1[1]);
                pos2 = null;
                if (movepx > 10) return;
            }
            if (!!callback) {
                callback(this);
            } else {
                var e = $(this);
                var gourl = e.addClass('hover').attr('data-href');
                setTimeout(function () {
                    e.removeClass('hover');
                    location = gourl;
                }, 200);
            }
            ev.preventDefault();
            return false;
        }).addClass('nosel');
    }
    , mclick2: function (selector, callback) {
        if (mt.t.ispc()) {
            $(selector).on('click', function () { $(this).addClass('hover'); callback(this); });
            return;
        }
        var pos1 = [0, 0], pos2;
        $(selector).on('touchstart', function (ev) {
            pos1 = [ev['touches'][0].clientX, ev['touches'][0].clientY];
            $(this).addClass('hover');
        }).on('touchmove', function (ev) {
            pos2 = [ev['touches'][0].clientX, ev['touches'][0].clientY];
        }).on('touchend', function (ev) {
            if (pos2) {
                var movepx = Math.abs(pos2[0] - pos1[0]) + Math.abs(pos2[1] - pos1[1]);
                pos2 = null;
                if (movepx > 10) return;
            }
            if (!!callback) {
                $(this).removeClass('hover');
                callback(this);
            }
            ev.preventDefault();
            return false;
        }).addClass('nosel');
    }
    // 美化下拉-
    , good_select: function () {
        $('.form select').each(function () {
            var t = $(this);
            var val = t.attr('data-val');
            if (val) {
                t.val(val).removeAttr('data-val');
            }
            if (!t.hasClass('fdc')) {
                t.addClass('fdc trans');
                var defv = (t.attr('placeholder') || val || '');
                var s = '<input class="put0 r" type="text" placeholder="' + defv + '" readonly />';
                t.parent().addClass('fdp').append(s);
                t.change(function () {
                    var t = $(this);
                    t.next().val(t.val());
                }).change();
            }
        });
    }
    // ios下美化日期控件-
    , good_date: function () {
        if (!mt.t.isios) return;
        $('.pdate').each(function () {
            var t = $(this);
            if (!t.parent().hasClass('fdp')) {
                var val = mt.t.check.date(t.val());
                if (!val) val = function () {
                    var d = new Date();
                    var _m = d.getMonth() + 1;
                    if (_m < 10) _m = '0' + _m;
                    var _d = d.getDate();
                    if (_d < 10) _d = '0' + _d;
                    return '{0}-{1}-{2}'.format(d.getFullYear() - 6, _m, _d);
                }();
                t.after('<input type="date" class="put0 fdc trans" value="' + val
                    + '" onchange="$(this).prev().val(this.value)" onfocus="$(this).prev().val(this.value)" />');
                t.addClass('r').css('display', 'inhert').parent().addClass('fdp');
                if (!t.val()) t.val(val);
            }
        });
    }
    // 图片预览功能-
    , imgprev: function (urls, i) {
        if (mt.t.isweixin) {
            wx.previewImage({
                current: urls[i],
                urls: urls
            });
            return;
        }
        var _w = (mt.t.w || 750) * -1;
        var ip_idx = i, ip_len = urls.length, ip_x = 0;
        var ss = '<div class="imgprev" style="left:{0}px">'.format(_w * ip_idx);
        for (var j in urls) {
            ss += '<i style="background-image:url({0});"></i>'.format(urls[j]);
        }
        ss += '</div>';
        $('.body').append(ss);
        mt.t.shide();

        $('.imgprev').on('touchstart', function (ev) {
            ip_x = ev.touches[0].clientX;
        }).on('touchmove', function (ev) {
            if (!ip_x) return;
            var x = ev.touches[0].clientX;
            var yet = 0;
            if (x - ip_x < -30 && ip_idx + 1 < ip_len) {
                yet = 1;
            }
            if (x - ip_x > 30 && ip_idx > 0) {
                yet = -1;
            }
            if (yet != 0) {
                ip_idx += yet;
                $('.imgprev').css('left', _w * ip_idx + 'px');
                ip_x = 0;
                ev.preventDefault();
                return false;
            }
        }).on('click', function () {
            $('.imgprev').remove();
            mt.t.shide(1);
        });
    }
    , getdate: function (begin, end, project_cnt) {
        var d1 = begin.toDate();
        var d2 = end.toDate();
        var w = '日一二三四五六';
        var s = '';
        if (begin.split(' ')[0] == end.split(' ')[0]) {
            s = '{0}月{1}日 周{2}'.format(d1.getMonth() + 1, d1.getDate(), w[d1.getDay()]);
        } else {
            s = '{0}月{1}日 - {2}月{3}日 周{4} - 周{5}'.format(
                d1.getMonth() + 1, d1.getDate()
                , d2.getMonth() + 1, d2.getDate()
                , w[d1.getDay()], w[d2.getDay()]
                );
        }
        if (project_cnt && project_cnt > 1) s += ' 共{0}场'.format(project_cnt);
        return s;
    }
    , getdistance: function (distance) {
        if (distance <= 0) return '';
        return '距离 '+ (distance > 1000 ? (distance / 1000).toFixed(1) + 'km' : distance + 'm');
    }
    , loadJs: function (src, cb) {
        var sc = document.createElement('script');
        sc.setAttribute("type", "text/javascript");
        sc.src = src + '?' + mt.version;
        if (cb) sc.onload = cb;
        //sc.onreadystatechange = function () { console.log(this.readyState); };
        document.body.appendChild(sc);
    }
    // get请求的入口-
    , jsonp: function (url, data, callback) {
        if (!!data) {
            if (typeof data == 'string') {
                if (data.indexOf('city_id=')==-1) data += '&city_id=' + mt.t.city_id;
                if (data.substr(0, 1) == '&') data = data.substr(1);
            } else {
                if (!data.city_id) data.city_id = mt.t.city_id;
            }
        } else {
            data = { city_id: mt.t.city_id };
        }
        mt.t.post('q={0}&m=get'.format(url), data, function (ret) {
            //mt.t.waitok();
            callback && callback(ret);
        });
    }
    // post请求入口-
    , post: function (query, data, callback) {

        
    }
    , actitem: (function () {
        var s = '';
        s += '<div class="act-item botl zoom goto" data-href="../../detail/{0}-b_city_id=2.htm"/*tpa=http://m.maitao.com/detail/{0}*/>';
        s += '<img class="act-img2" src="{1}" />';
        s += '<h2 class="f34">{2}</h2>';
        s += '<p class="f22">{3}</p>';
        s += '<p class="join_cnt f22">{8}</p>';
        s += '<i class="price"><i class="f24">{4}</i><i class="money">{5}</i><i class="dw">起</i></i>';
        s += '<i class="active{6}"><i class="f22">{7}</i></i>';
        s += '</div>';
        return s;
    }())
    , actitem2: (function () {
        var s = '';
        s += '<div class="act-box goto" data-href="../../detail/{0}-b_city_id=2.htm"/*tpa=http://m.maitao.com/detail/{0}*/>';
        s += '<div class="act-img">';
        s += '<img class="imgw" src="{1}" />';
        s += '<i class="price"><i class="f24">{2}</i><i class="money m2">{3}</i><i class="dw">起</i></i>';
        s += '<i class="join_cnt f26">{4}</i>';
        s += '</div>';
        s += '<div class="con1"><h2 class="f34">{5}</h2><p class="f22">{6}</p><p class="ptag f24">{7}</p></div>';
        s += '</div>';
        return s;
    }())
    // detail,special,joinsuccess
    , loadacts: function (query, api, callback) {
        if (!api) api = 'product/list';

        mt.t.jsonp(api, query, function (ret) {
            if (!ret || !ret.list) return;
            var ss = '';
            for (var i = 0; i < ret.list.length; i++) {
                var m = ret.list[i];
                ss += mt.t.actitem.format(m.id
                    , mt.t.reimg(m.logo, 180, 180), m.title
                    , m.sub_title, (m.payment_type == 2 ? '订金' : '')
                    , m.price, (m.status ? '' : ' full'), m.status_txt
                    , m.paid_cnt
                    );
            }            
            if (!!callback) {
                callback(ss);
            } else {
                $('#dacts2').html(ss);
                mt.t.goto();
            }
        });
    }
    , loadacts2: function (query, api, more, jq_more) {
        if (!api) api = '';

        mt.t.jsonp(api, query, function (ret) {
            if (!ret || !ret.list) return;

            var s = mt.t.actitem2;
            var ss = '';
            for (var i = 0; i < ret.list.length; i++) {
                var m = ret.list[i];
                var dj = (m.payment_type == 2 ? '订金' : '');
                if (!m.status) {
                    dj = '<b class="none">{0}</b>'.format(m.status_txt);
                }
                var tg = '';
                for (var j in m.labels) {
                    tg += '<i>{0}</i>'.format(m.labels[j].name.substr(0, 6));
                    if (j == 2) break;
                }
                var aid = m.id;
                if (m.position_id) {
                    aid = '{0}" data-log="{1}^{2}^{3}'.format(aid, m.position_id, m.content_type, m.content_id);
                }
                ss += s.format(aid
                    , mt.t.reimg(m.logo, 750, 376)
                    , dj, m.price, m.paid_cnt
                    , m.title, m.sub_title
                    , tg);
            }
            if (ss) {
                $('#dacts1').append(ss);
                mt.t.goto();
                $('#dacts1 .price .none').each(function () {
                    $(this).parent().parent().addClass('pricedis').html($(this).html());
                });
                if (more) {
                    if (ret.list.length < 10) {
                        (jq_more || $('#pmore')).html('已加载全部数据');
                        document.onscroll = null;
                    } else {
                        (jq_more || $('#pmore')).html('上拉继续加载');
                    }
                }
            } else {
                if ($('.act-box').length == 0) {
                    (jq_more || $('#pmore')).addClass('none');
                    $('.nodata').removeClass('none');
                } else {
                    (jq_more || $('#pmore')).html('已加载全部数据');
                    document.onscroll = null;
                }
            }
        });
    }
    , getLocation: function (callback, cb2) {

        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') != -1 && ua.indexOf('macintosh') != -1) {
            // mac safari bug
            return '';
        }

        var loc = mt.t.cookie.get('loc');
        if (!loc || loc == '0' || loc=='1') {
            // 没有具体位置，取IP的位置-
            loc = mt.t.cookie.get('loc2');
        }
        if (loc && loc != '0') {
            mt.t.getloc_auto(); // 刷新位置-
            return loc;
        }
        navigator.geolocation.getCurrentPosition(function (res) {
            
            loc = (res.coords.longitude + ',' + res.coords.latitude);
            mt.t.cookie.set('loc', loc, 3);
            mt.t.cookie.set('loc_at', 1, 0.02); // 记录30分钟-
            if (!!callback) callback(loc);

            $.get('http://m.maitao.com/api.aspx?q=cityapi', { pos: loc }, function (ret) {
                if (ret.status) {
                    var ct = mt.t.getcityname(ret.data);
                    if (mt.t.city_id == 0) {
                        mt.t.cookie.set('city_id', ret.data, 3);
                        $('.hdbtnl').html(ct);

                        if (!callback) location.reload();
                    } else if (mt.t.city_id != ret.data) {
                        mt.t.confirm('系统定位您现在在{0}，是否切换到{0}？'.format(ct), null, function () {
                            mt.t.cookie.set('city_id', ret.data, 3);
                            location.reload();
                        });
                    }
                }
            });

        }, function (res) {
            if (!!cb2) cb2();
            mt.t.getloc_failed();
            if (res.code == res.PERMISSION_DENIED) {
                // 用户拒绝，记录cookie，1天内不再询问-
                mt.t.cookie.set('loc', '1', 1);
            }
        }, { enableHighAcuracy: false, timeout: 5000, maximumAge: 30000 });

        setTimeout(function () {
            mt.t.getloc_failed();
        }, 15000);

        mt.t.cookie.set('loc', '0', 0.001);
        return '';

    }
    // 获取位置失败-
    , getloc_failed: function () {
        if (mt.t.cookie.get('loc') != '0') return;
        if (mt.t.cookie.get('loc2') != '') return;
        mt.t.cookie.set('loc2', '0', 1);
        // 通过ip获取位置-
        $.get('../../api.aspx-q=locapi.js'/*tpa=http://m.maitao.com/api.aspx?q=locapi*/, function (ret) {
            if (ret.status) {
                // ip获取到位置记录1天-
                mt.t.cookie.set('loc2', ret.data.loc, 1);
                var ct = mt.t.getcityname(ret.data.city_id);
                if (mt.t.city_id == 0) {
                    mt.t.cookie.set('city_id', ret.data.city_id, 3);
                    $('.hdbtnl').html(ct);
                } else if (mt.t.city_id != ret.data.city_id) {
                    mt.t.confirm('系统定位您现在在{0}，是否切换到{0}？'.format(ct), null, function () {
                        mt.t.cookie.set('city_id', ret.data.city_id, 3);
                        location.reload();
                    });
                }
            } else {
                mt.t.alert('定位不成功，无法获得您的位置～');
            }
        });
    }
    // 自动获取/刷新位置-
    , getloc_auto: function () {
        // 刚获取过-
        if (mt.t.cookie.get('loc_at') == '1') return;
        // 决绝提供-
        if (mt.t.cookie.get('loc') == '1') return;

        navigator.geolocation.getCurrentPosition(function (res) {
            var loc = (res.coords.longitude + ',' + res.coords.latitude);
            mt.t.cookie.set('loc', loc, 3);
            mt.t.cookie.set('loc_at', 1, 0.02);
        }, function (res) {
            if (res.code == res.PERMISSION_DENIED) {
                mt.t.cookie.set('loc', '1', 1);
            }
        });
    }
    , auto_more: function(callback,jq_more) {
        if (!callback) {
            document.onscroll = null;
            return;
        }
        document.onscroll = function () {
            var h0 = document.documentElement.scrollHeight;
            var h1 = document.documentElement.clientHeight;
            var top = mt.t.top();
            if (h0 - h1 - top < 600) {
                if (!mt.doing && !!callback) {
                    mt.doing = true;
                    setTimeout(function () { mt.doing = false; }, 3000);
                    if ((jq_more || $('#pmore')).length > 0 && (jq_more || $('#pmore')).html().indexOf('全部') == -1) callback();
                }
            }
        };
    }
    , ads: {
        bot: function () {
            if (mt.t.cookie.get('ad_bot')) return;
            if (!mt.t.cookie.get('uid')) {
                mt.t.ads.bot2();
            } else {
                $.post('../../api.aspx-q=other-bannerStatus.htm'/*tpa=http://m.maitao.com/api.aspx?q=other/bannerStatus*/, '', function (ret) {
                    if (!ret.status) mt.t.ads.bot2();
                });
            }
        }
        , bot2: function () {
            var s = '<div class="ad_bot"><i class="addown"><i class="adclose"></i></i></div>';
            $(document.body).append(s);
            $('.adclose').mousedown(function () {
                $('.ad_bot').remove();
                mt.t.cookie.set('ad_bot', '1', 1);
            });
            $('.addown').click(function () {
                location = 'http://m.maitao.com/api.aspx?q=adclick&tourl=' + encodeURIComponent(mt.t.down.ios);
            });
        }
        , top: function () {
            if (!mt.t.cookie.get('uid')) {
                mt.t.ads.top2();
            } else {
                $.post('../../api.aspx-q=other-bannerStatus.htm'/*tpa=http://m.maitao.com/api.aspx?q=other/bannerStatus*/, '', function (ret) {
                    if (!ret.status) mt.t.ads.top2();
                });
            }
        }
        , top2: function () {
            var s = '<div class="ad_top"></div>';
            $(s).insertBefore($('.head').parent());
            $('.ad_top').click(function () {
                location = 'http://m.maitao.com/api.aspx?q=adclick&tourl=' + encodeURIComponent(mt.t.down.ios);
            });
            mt.t.head1();
        }
    }
    , head1: function () {
        $('.head').addClass('head1');
        $('.mcity').css('position', 'absolute');
        $('.menu').css('position', 'absolute');
        $('.body').off('touchmove');
    }
    , reimg: function (src, width, height) {
        if (typeof src == 'object') src = src.small;
        src = src.split('?')[0];
        if (!height) {
            return src + '?imageView2/2/w/' + width + '/q/80/format/jpg';
        } else {
            return src + '?imageView2/1/w/' + width + '/h/' + height + '/q/80/format/jpg';
        }
    }
    , reurl: function (name, val, url) {
        var url = url || location.href;
        url = url.replace(new RegExp('/' + name + '-[^/]*'), '');
        url = url.replace(new RegExp('[?&]' + name + '=[^&]*'), '');
        if (!!val) url += '{0}{1}={2}'.format((url.indexOf('?') == -1 ? '?' : '&'), name, encodeURIComponent(val));
        return url;
    }
    , wxshare: function (logo, title, desc) {
        if (mt.t.isweixin) {
            if (!!mt.t.wxshared) return;
            mt.t.wxshared = true;
            var aurl = location.href.split('#')[0];
            $.get('/api.aspx?q=jsapi&url=' + encodeURIComponent(aurl), function (ret2) {
                window.wxdata = {
                    img: logo,
                    url: aurl,
                    title: title,
                    desc: desc,
                    sdata: ret2.data.split(',')
                };
                mt.t.loadJs('wxbtn.js-0.1.js'/*tpa=http://m.maitao.com/content/scripts/wxbtn.js?0.1*/);
            });
        }
    }
    , appshare: function (logo, title, desc, url, cb) {
        var shareData = {
            title: title,
            desc: desc,
            logo: logo,
            url: url,
            callback: cb
        };
        if (typeof nativeObject != 'undefined') {
            nativeObject.call_native('share', mt.t.obj2str(shareData));
        } else {
            shareData.action = 'share';
            location = 'mtqzh5://call_native?' + encodeURIComponent(mt.t.obj2str(shareData));
        }
    }
    , alog: function (cat, key) {
        new Image().src = '../../api.aspx-q=actionlog&cat={0}&key={1}&con={2}.htm'/*tpa=http://m.maitao.com/api.aspx?q=actionlog&cat={0}&key={1}&con={2}*/.format(cat, encodeURIComponent(key), encodeURIComponent(location.href));
    }
    , rsa: function (ss) {
        if (!ss) {
            mt.t.loadJs('jsencrypt.min.js'/*tpa=http://m.maitao.com/content/scripts/jsencrypt.min.js*/);
            return;
        }
        var key = '-----BEGIN PUBLIC KEY-----'
            + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0W5XOg0pOM8dIdXuLpgf8JLDF'
            + 'R6EIYiINIvVz9bfOFS6BySurbIJjWpBet8Xg9XQTgyDpKvyyI/lxVrLXdhJgurv8'
            + 'vG7f6QkV0epOzOAIaNf6Qy/k7OWcg49SMMQV7TKowGpJhQ+gBc/BdeL8mtpp2qg1'
            + 'mkkr07EzjnZTMX8tKwIDAQAB'
            + '-----END PUBLIC KEY-----';
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(key);
        var str = encrypt.encrypt(ss);
        return str;
    }
};
// url path中的id
mt.t.id = (function () {
    var ss = location.pathname.split('/');
    for (var i = ss.length - 1; i > 1; i--) {
        if (ss[i] && ss[i].indexOf('-') == -1) return ss[i];
    }
    return '';
}());
// url或cookie中的city_id
mt.t.city_id = (function () {
    return mt.t.query('city_id') || mt.t.cookie.get('city_id') || 2;
}());

/*==以下是每个页面的js定义==*/
// 首页
mt.home = {
    page: '/home'
    , init: function () {
        $('.hdbtnl').removeClass('hide');
        $('.hdbtnr').off('click').on('click', function () {
            location = ctx + '/app/appIndex/toMine';
        }).addClass('hd_me2');
        $('.mcity a').on('click', function () {
            mt.t.cookie.del('b_city_id');
        });

        mt.p.in_page();
        
        $('.goto').off('click').on('click', mt.p.hclick);
        
        //mt.t.loadacts2({ limit: 2 }, 'sProduct/getProductListForIndex', false);

        mt.t.getLocation();
        mt.t.ads.bot();
        mt.p.in_search();
        mt.p.insearch2();

        if (mt.t.isweixin) {
            mt.t.wxshare('http://maitian.qiniudn.com/635627318209928748'
                , '麦淘亲子游'
                , '麦淘亲子游，汇聚众多有意思的亲子活动，提供非凡的亲子体验，打开奇妙的环球视野。携手孩子寻找一起玩的小伙伴，获得不同的成长经历，共享难忘的幸福时光。'
                );
            document.title = '麦淘亲子游';
        }
        if (!!mt.t.cookie.get('uid')) {
            mt.t.post('q=users/somethingNew&c=uid', '', function (ret) {
                if (ret.something_new) {
                    $('.hd_me2').html('<i></i>');
                }
            });
        }
    }
    , in_page: function () {
       

       
        //mt.t.mclick2('.h2btns>div', mt.p.hclick);
        $('#spkeys>a').on('click', mt.p.hclick);
        //$('.h2btag>a').on('click', mt.p.hclick);
    }
    , click_log: function (e) {
        var log = $(e).attr('data-log') || '';
        if (!log) return;

        log = log.replace(/null/gi, '');
        var val = '{0}^{1}^{2}'.format(mt.t.city_id, log, new Date().toTime());
        mt.t.cookie.set(log.split('^')[2] || 'homelog', val, 0.02);

        var data = {
            position_id: log.split('^')[0],
            target_url: ($(e).attr('href') || $(e).attr('data-href'))
        };
        mt.t.jsonp('other/click', data);
    }
    , hclick: function (e) {
        var e = (this == window) ? e : this;        
        mt.p.click_log(e);
        var gourl = $(e).attr('data-href') || $(e).attr('href');
        setTimeout(function () {
            location = gourl;
        }, 200);
        return false;
    }
    , in_search: function () {
        var s = '<input type="text" class="put0" placeholder="请输入活动名称" />';
        if (mt.p.page == '/home') s += '<b class="scbtn"></b>';
        $('.hdlogo').addClass('hdlogo2').html(s).off('click');

        $('.hdlogo .put0').on('focus', function () {
            var arr = mt.t.cookie.get('sc_his').split('-');
            if (!arr[0]) arr = [];
            var ss = '';
            for (var i in arr) {
                ss += '<div class="ico ico2"><p>{0}</p></div>'.format(arr[i]);
            }
            if (arr.length > 0) {
                ss += '<div class="center">清空历史记录</div>';
            }

            ss = '<div id="dhis" class="bgfbox">' + ss + '</div>';
            $('#dhis').remove();
            $(document.body).append(ss);
            $('.body').addClass('none');

            $('#dhis p').on('click', function (ev) {
                if (ev.pageX > 650) $('.hdlogo .put0').val(this.innerHTML);
                else {
                    mt.p.gosearch(this.innerHTML);
                }
                ev.preventDefault();
                return false;
            });
            $('#dhis .center').on('click', function (ev) {
                $('#dhis').remove();
                mt.t.cookie.del('sc_his');
                ev.preventDefault();
                return false;
            });
            setTimeout(function () { 
                $('html').one('click', function (ev) {
                    var e = window.event ? event.srcElement : ev.target;
                    if (e.tagName == 'HTML' || e.tagName == 'BODY') {
                        setTimeout(function () {
                            $('#dhis').remove();
                            $('.body').removeClass('none');
                        }, 100);
                    }
                });
            }, 10);

            $('.mcity').addClass('none');
        }).on('keypress', function (event) {
            if ((event.keyCode || event.which) == 13) {
                $('.scbtn,.hdbtnsc').click();
            }
        }).on('touchstart', function () {
            mt.t.top(0);
        });
        $('.scbtn,.hdbtnsc').off('click').on('click', function () {
            var k = $('.hdlogo .put0').val();
            if (!k) {
                if (mt.p.page != '/') mt.p.gosearch(k);
                return;
            }
            var arr = mt.t.cookie.get('sc_his').split('-');
            if (!arr[0]) arr = [];
            if (arr.indexOf(k) == -1) {
                arr.splice(0, 0, k);
                arr = arr.slice(0, 8);
            }
            mt.t.cookie.set('sc_his', arr.join('-'), 30);
            mt.p.gosearch(k);
        });
    }
    , insearch2: function () {
        var ph = '请输入搜索关键词';
        $('.hdlogo2 .put0').attr('placeholder', '').val(ph).on('focus', function () {
            if (this.value == ph) {
                $(this).val('').css('color', '#ffffff');
            }
        }).on('blur', function () {
            if (this.value == '') {
                $(this).val(ph).css('color', '#a5debf');
            }
        });
    }
    , gosearch: function (k) {
        location = '../../list2-keyword=.htm'/*tpa=http://m.maitao.com/list2?keyword=*/ + encodeURIComponent(k);
    }
};

// 直播间-
mt.live = {
    page: '/live/(.+?)'
    , init: function () {
        mt.t.loadJs('live.js'/*tpa=http://m.maitao.com/content/scripts/live.js*/);
    }
};

mt.list = {
    page: '/(\\w+/)?list(/.+)*'
    , init: function () {
        mt.t.loadJs('list.js'/*tpa=http://m.maitao.com/content/scripts/list.js*/);
    }
};

// 酒店票务等-
mt.list2 = {
    page: '/(\\w+/)?list2(/.+)*'
    , init: function () {
        
        $('.hdbtnl').removeClass('hide').html('').off('click').on('click', function () {
            location = ctx+'/web/index.jsp';
        }).addClass('hdbtnl2');

        $('.hdbtnr').addClass('hdbtnsc').off('click').on('click', function () {
            mt.p.in_search();
            $('.put0').focus();
        });
        var kw = mt.t.query('keyword');
        if (kw) {
            mt.p.in_search();
            $('.put0').val(kw);
        }

        //mt.p.load_data();
        mt.t.auto_more(function () {
            $('#pmore').html('加载中...');
            mt.p.load_data();
        });
        
        
    }
    , load_data: function () {
        var pdata = {
            pro_type: mt.t.id
            , keyword: mt.t.query('keyword')
            , city_id: mt.t.city_id
            , start: $('.act-box').length
            , limit: 10
        };
        mt.t.loadacts2(pdata, '', true);
    }
    , in_search: function () {
        mt.home.in_search();

        $('.hdlogo .put0').on('blur', function () {
            setTimeout(function () {
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
};

// 组织方的活动-
mt.partner = {
    page: '/partner/\\w+'
    , init: function () {
        $('.hdbtnl').removeClass('hide').html('').off('click').on('click', function () {
            location = ctx+'/web/index.jsp';
        }).addClass('hdbtnl2');

        $('.l3tab>a').on('click', function () {
            $('.l3tab>a.act').removeClass('act');
            $('#ddiv0,#ddiv1,#ddiv2').addClass('none');
            var idx = $(this).addClass('act').index();
            $('#ddiv' + idx).removeClass('none');

            var jqm = $('.pmore').eq(idx);
            if (idx == 1) {
                mt.t.auto_more(function () {
                    jqm.html('加载中...');
                    mt.p.load_data(jqm);
                }, jqm);
            } else if (idx == 2) {
                mt.t.auto_more(function () {
                    jqm.html('加载中...');
                    mt.p.load_cmt(jqm);
                }, jqm);
            }
            return false;
        });
        var jqm = $('.pmore').eq(1);
        mt.p.load_data(jqm);
        mt.t.auto_more(function () {
            jqm.html('加载中...');
            mt.p.load_data(jqm);
        }, jqm);
        
        if ($('#cmtcnt').html() == 0) {
            $('#ddiv2').html('<div class="nodata"><p>暂时没有用户评价</p></div>');
        } else {
            setTimeout(function () {
                mt.p.load_cmt($('.pmore').eq(2));
            }, 1000);
        }
        if (mt.t.isweixin) {
            mt.t.wxshare($('.pnhd .avatar').attr('src'), document.title.split('-')[0], $('meta[name=description]').attr('content'));
        }
    }
    , load_data: function (jq_more) {
        var pdata = {
            partner_id: mt.t.id
            , start: $('.act-box').length
            , limit: 10
        };
        mt.t.loadacts2(pdata, '', true, jq_more);
    }
    , load_cmt: function (jq_more) {
        var data = { start: $('.dcmti').length, limit: 10, partner_id: mt.t.id };
        mt.t.jsonp('comment/getByActivity', data, function (ret) {

            if (ret.comments.length > 0) {
                var s = '<div class="dcmti"><div class="zoom">';
                s += '<a href="http://m.maitao.com/user/{7}"><img class="left avatar" src="{0}" /></a>';
                s += '<a href="http://m.maitao.com/user/{7}"><b>{1}{2}</b></a>';
                s += '<div class="right"><i class="score1"><i class="score2" style="width:{3}%;"></i></i></div>';
                s += '</div><div class="con">';
                s += '<div><i class="f24">{4}</i></div>';
                s += '<div class="cdesc"><i>{5}</i></div>';
                s += '<div class="cimgs zoom">{8}</div>';
                s += '<div><i class="f24 c6 cmtcc">{6}</i>';
                s += '</div></div>';
                var ss = '';
                for (var i in ret.comments) {
                    var m = ret.comments[i];
                    var s2 = '';
                    for (var j = 0; j < m.images.length; j++) {
                        s2 += '<img src="{0}" onclick="mt.p.imgprev(this,{1})" />'.format(
                            mt.t.reimg(m.images[j], 200, 200), j);
                    }
                    ss += s.format(m.user_img_path.small
                        , m.nick_name, (m.user_is_verified ? '<i class="v">V</i>' : '')
                        , (m.overall_score * 100 / 5 - 2)
                        , m.create_date, m.content, m.activity_title
                        , m.user_id, s2);
                }
                $('.dcmtbox').append(ss);
                mt.p.in_cmt();

                if (ret.comments.length < 10) {
                    jq_more.html('');
                    //document.onscroll = null;
                } else {
                    jq_more.html('上拉继续加载');
                }
            } else {
                jq_more.html('');
                //document.onscroll = null;
            }
            mt.doing = false;
        });
    }
    , in_cmt: function () {
        $('.cdesc').each(function () {
            if (this.offsetHeight > 230 && !$(this).hasClass('cdesc2')) {
                $(this).addClass('cdesc2').on('click', function () {
                    var t = $(this);
                    if (t.hasClass('cdesc2')) {
                        t.removeClass('cdesc2');
                    } else {
                        t.addClass('cdesc2');
                    }
                }).after('<p class="cdmore"></p>');
            }
        });
        $('.cdmore').off('click').on('click', function () {
            var t = $(this).prev();
            if (t.hasClass('cdesc2')) {
                t.removeClass('cdesc2');
            } else {
                t.addClass('cdesc2');
            }
        });
    }
    // 图片预览功能-
    , imgprev: function (e, i) {
        var s = [];
        $(e).parent().find('img').each(function () {
            s.push(mt.t.reimg(this.src, 750));
        });
        mt.t.imgprev(s, i);
    }
};
// 活动日历 
mt.calendar = {
    page: '/calendar'
    , init: function () {
        mt.t.loadJs('calendar.js'/*tpa=http://m.maitao.com/content/scripts/calendar.js*/);
    }
};
// 活动详情 
mt.details = {
    page: '/detail/\\w+(/.+)*'
    , init: function () {
        mt.t.loadJs('detail.js'/*tpa=http://m.maitao.com/content/scripts/detail.js*/);
    }
};
// 活动游伴 
mt.actorders = {
    page: '/orders/\\w+'
    , init: function () {
        mt.t.jsonp('product/getCompanionList', { product_id: mt.t.id,gro_id:mt.t.query('gro_id') }, function (ret) {

            $('#pbot').html(ret.buttom_txt.replace('。','。<br>'));
            if (ret.list.length == 0) return;

            $('#udiv').html(mt.p.getitems(ret));

            mt.t.goto();

            $('.uboxhd').click(function () {
                var t = $(this);
                if (t.hasClass('uboxhd2')) {
                    t.removeClass('uboxhd2');
                    t.next().addClass('none');
                } else {
                    t.addClass('uboxhd2');
                    t.next().removeClass('none');
                }
            });
            mt.p.show_items();
        });
    }
    , getitems: function (ret) {

        var s1 = '<div class="uboxhd botl bgf">';
        s1 += '<i class="left ubday f22">{0}</i>';
        s1 += '<h2 class="f30">{1}</h2>';
        s1 += '<p class="f22 c6">{2}</p>';
        s1 += '</div>';
        var s = '';
        s += '<div class="accitem goto" data-href="http://m.maitao.com/user/{0}">';
        s += '<img class="avatar left" src="{1}" />';
        s += '<div class="left">';
        s += '<div class="zoom"><b class="left f34"{2}>{3}</b>{4}{5}</div>';
        s += '<p class="c6 f26">{6}</p><p>{7}</p></div>';
        s += '</div>';
        //
        var ss = '';
        for (var k in ret.list) {
            var pp = ret.list[k];
            ss += s1.format(pp.calendar.substr(8, 2), pp.title, pp.sub_title);
            ss += '<div class="ubox none">';
            if (pp.users.length == 0) {
                ss += '<div class="nodata"><p>暂时还没人报名</p></div>';
            }
            for (var i = 0; i < pp.users.length; i++) {
                var o = pp.users[i];
                var s2 = '';
                for (var j = 0; j < o.members.length && j < 4; j++) {
                    var m = o.members[j];
                    if (m.gender == '男孩') {
                        s2 += '<i class="tag tagb">男孩<i class="right">{0}岁</i></i>'.format(m.age);
                    } else {
                        s2 += '<i class="tag tagg">女孩<i class="right">{0}岁</i></i>'.format(m.age);
                    }
                }
                if (!s2) { s2 = '<i class="f26">' + o.sub_text + '</i>'; }

                var s3 = '';
                if (o.status == '1') { s3 = '<i class="aipaid">已付款</i>'; }
                //if (o.is_wait) { s3 = '<i class="aipaid aiwait">候补</i>'; }

                ss += s.format(o.user_id, o.avatar.small
                    , (!!o.school ? ' style="margin-top:0"' : '')
                    , o.user_name, (o.verify ? '<i class="left v f34">V</i>' : ''), s3
                    , o.school || '', s2
                    );
            }
            ss += '</div>';
        }
        return ss;
    }
    , show_items: function () {
        var cnt = 0;
        $('.uboxhd').each(function () {
            var t = $(this);
            var len = t.next().find('.accitem').length;
            if (len > 0) t.click();
            cnt += len;
            if (cnt > 6) return false;
        });
    }
};
mt.userpage = {
    page: '/user/\\w+'
    , init: function () {

        if (mt.t.isweixin) {
            $('.avatar').on('click', function () {
                var src = mt.t.reimg(this.src, 800);
                wx.previewImage({
                    current: src,
                    urls: [src]
                });
            });
        }
        mt.t.goto();
    }
};
// 下单-
mt.order = {
    page: '/order/\\w+(/\\w+)?'
    , init: function () {
        mt.t.loadJs('orders.js'/*tpa=http://m.maitao.com/content/scripts/orders.js*/);
    }
};

// 回顾/达人-
mt.his_ex = {
    page: '/(history|expert)/[\\w\/]*'
    , init: function () {
        mt.t.loadJs('his_ex.js'/*tpa=http://m.maitao.com/content/scripts/his_ex.js*/);
    }
};

// 登录/注册-
mt.login = {
    page: '/(login|register)'
    , init: function () {
        mt.t.loadJs('login.js'/*tpa=http://m.maitao.com/content/scripts/login.js*/);
    }
};
mt.guest = {
    page: '/guest/(.+?)'
    , init: function () {
        mt.t.loadJs('guest.js'/*tpa=http://m.maitao.com/content/scripts/guest.js*/);
    }
};
// 用户中心-
mt.acc = {
    page: '/acc/(.+?)'
    , init: function () {
        mt.t.loadJs('acc.js'/*tpa=http://m.maitao.com/content/scripts/acc.js*/);
    }
};
// 邀请好友-
mt.invite = {
    page: '/plus/invite/\\w+'
    , init: function () {
        mt.t.jsonp('users/details', { id: mt.t.id }, function (ret) {
            $('#av1').attr('src', ret.avatar.small);
            $('.nick').html(ret.nickname || ret.realname);
            $('.fcode').html(ret.fcode);
        });
        if (mt.t.isandroid) {
            $('.btn-red').attr('href', mt.t.down.android);
        } else {
            $('.btn-red').attr('href', mt.t.down.ios);
        }
    }
};
// 问卷-
mt.question = {
    page: '/plus/question/\\w+'
    , init: function () {
        mt.t.loadJs('question.js'/*tpa=http://m.maitao.com/content/scripts/question.js*/);
    }
};
// 投票-
mt.vote = {
    page: '/plus/vote/\\w+'
    , init: function () {
        mt.t.loadJs('vote.js'/*tpa=http://m.maitao.com/content/scripts/vote.js*/);
    }
};
// 专题-
mt.special = {
    page: '/plus/special[23]?/\\w+'
    , init: function () {
        var is2 = mt.p.is2 = location.pathname.indexOf('special2') != -1;

        if ($('.act-box').length == 0) mt.p.in_data(0);

        if (mt.t.isweixin) {
            mt.t.wxshare(mt.t.reimg(sdata.data.imgPath, 200, 200), sdata.data.title, sdata.data.description);
            if (mt.t.cookie.get('uid')) {
                window.wxback = function (res, type) {
                    if (type == 'timeline') {
                        mt.t.post('q=credit/gain/share&c=uid&m=post');
                    }
                };
            }
        }
        $('.body').off('touchmove');
    }
    , in_data: function (idx) {
        var gcnt = sdata.data.groups.length;
        if (gcnt <= idx) { // load over-
            if (gcnt > 1) {
                mt.p.items = $('.hdhd');
                $('.body').on('touchmove', mt.p.scroll_group);
                setInterval(mt.p.scroll_group, 100);
            }
            return;
        }
        var m = sdata.data.groups[idx];
        
        if (gcnt > 1) {
            var ss = '<div class="hdhd green f34 botl topl">{0}</div>'.format(m.gTitle);
            $('#dacts2').append(ss);
        }
        mt.t.loadacts({ ids: m.actIds, sort: 'canorder', limit: 1000 }, '', function (ss) {
            if (mt.p.is2) ss = ss.replace(/\/detail\//g, 'app:///detail.html?id=');
            $('#dacts2').append(ss);
            mt.p.go_to();
            mt.p.in_data(idx + 1);
        });
    }
    , go_to: function () {
        $('.goto').off('click').on('click', function () {
            var href = $(this).attr('data-href');
            var log = mt.t.cookie.get(mt.t.id);
            if (log) {
                var id = mt.p.is2 ? href.split('=')[1] : href.split('/detail/')[1];
                mt.t.cookie.set(id, log, 0.02);
            }
            location = href;
        });
    }
    , scroll_group: function () {
        var top = mt.t.top();
        if (top < 460) {
            $('.hdhd2').addClass('none');
        } else {
            var y0 = 90;
            var arr = mt.p.items;
            for (var ix = arr.length; ix--; ix > 0) {
                var e = arr.eq(ix);
                var y1 = e.offset().top - top;
                if (y1 < y0) {
                    $('.hdhd2').html(e.html()).removeClass('none');
                    break;
                }
            }
        }
    }
};
// 定制活动-
mt.actcustom = {
    page: '/plus/actcustom/\\w+'
    , init: function () {
        $('.btn-red').click(mt.p.save);
    }
    , save: function () {
        var data = {
            id: mt.t.id,
            name: $('#name').val(),
            mobile: $('#mobile').val()
        };
        if (!data.mobile) {
            mt.t.alert('请输入您的手机号'); return;
        }
        if (!mt.t.check.mobile(data.mobile)) {
            mt.t.alert('手机号格式不正确，请重新输入'); return;
        }
        mt.t.wait();
        mt.t.post('q=activity/applycustomize', data, function (ret) {
            mt.t.waitok();
            mt.t.alert('提交成功！', function () {
                if (mt.t.query('token')) {
                    location = 'app:///detail.html?id=' + data.id + '&action=goBack';
                }
                else location = '../../detail/-b_city_id=2.htm'/*tpa=http://m.maitao.com/detail/*/ + data.id;
            });
        });
    }
};
// 静态内容-
mt.plusother = {
    page: '/plus/(about|coupon|terms)'
    , init: function () {
        var f = mt.t.query('from');
        if (f == 'ios' || f == 'android') {
            $('.head').addClass('none');
        }
    }
};

$(function () {
    mt.t.init();
    mt.t.curr_page();
});

String.prototype.format = function () {
    var s = this;
    for (var i = 0; i < arguments.length; i++) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }
    return s;
};
String.prototype.toDate = function () {
    var s = this;
    if (!s || s.length < 10) return new Date();
    return new Date(s.substr(0, 4), parseInt(s.substr(5, 2),10)-1, s.substr(8, 2));
};
Date.prototype.toDate = function () {
    var m = this.getMonth() + 1;
    if (m < 10) m = '0' + m;
    var d = this.getDate();
    if (d < 10) d = '0' + d;
    return this.getFullYear() + '-' + m + '-' + d;
};
Date.prototype.toTime = function () {
    var h = this.getHours(), m = this.getMinutes(), s = this.getSeconds();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    return '{0} {1}:{2}:{3}'.format(this.toDate(), h, m, s);
};

var index = {};
index.toIndex = function(){
	window.location.href = ctx + "/web/index.jsp";
}
