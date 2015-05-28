$(function(){
    var BASE_PATH = '/history-api/data/';
    var request = null;
    var $pager = $('#pager').find('a');

    //ページャーをクリックした時
    $pager.on('click', clickHandler);
    //戻る・進むボタンがクリックされた時
    $(window).on('popstate', popstateHandler);

    //クリックした際に実行される関数
    function clickHandler(e){
        e.preventDefault();
        var self = this;
        var page = $(self).attr('href');
        var currentPage = getCurrentPage();
        //クリックしたリンク先のURLと現在のURLが一致する場合は処理を終える
        if(page === currentPage){
            return;
        }
        //履歴の追加
        history.pushState(null, null, page);
        //ページャーの変更
        changePager.apply(self);
        //データをロードする
        loadingData(BASE_PATH + page);
    }

    //戻る・進むボタンがクリックされた時に実行される関数
    function popstateHandler(e){
        e.preventDefault();
        var currentPage = getCurrentPage();
        $pager.each(function(){
            var self = this;
            var page = $(self).attr('href');
            if(page === currentPage){
                changePager.apply(self);
            }
        });
        loadingData(BASE_PATH + currentPage);
    }

    //現在のページ名を取得する
    function getCurrentPage(){
      return location.pathname.split('/').pop();
    }

    //ページャーを変更する
    function changePager(){
      $pager.removeClass('is-current');
        $(this).addClass('is-current');
    }

    //データを取得する
    function loadingData(url){
        if(request){
            request.abort();
        }
        request = $.ajax({
           type: 'GET',
           dataType: 'html',
           url: url
        }).done(function(data){
            $('#photo').html(data);
        });
    }
});
