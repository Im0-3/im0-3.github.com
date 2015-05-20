$(function(){
    var request = null;
    //ページャーをクリックした時
    $(document).on('click', '#pager a', function(e){
        e.preventDefault();
        var page = $(this).attr('href');
        if(page === location.pathname.replace('/', '')){
            return;
        }
        if(request){
	        request.abort();
        }
        history.pushState(null, null, page);
        changePager(this);
        loadingData('/data/' + page);
    });

    //戻る・進むボタンがクリックされた時
    $(window).on('popstate', function(e){
        e.preventDefault();
        var page = location.href.split('/').pop();
        $('#pager .page-num a').each(function(){
            if(page === $(this).attr('href')){
                changePager(this);
            }
        });
        loadingData('/data/' + page);
    });

    //ページャーを変更する
    function changePager(element){
		$('#pager a').removeClass('is-current');
        $(element).addClass('is-current');
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
