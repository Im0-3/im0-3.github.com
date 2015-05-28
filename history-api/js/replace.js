$(function(){
  var $replace = $('#replace');
  var $push = $('#push');
  var before = null;
  var after = null;
  var name = null;

  //replaceStateボタン
  $replace.on('click', function(){
    clickHandler(runReplaceState);
  });

  //pushStateボタン
  $push.on('click', function(){
    clickHandler(runPushState);
  });

  //クリック時実行する関数
  function clickHandler(callback){
    before = history.length;
    name = callback();
    after = history.length;
    alertDetial();
  }

  //pushState()を実行する
  function runPushState(){
    history.pushState(null, null, '#push');
    return 'pushState()';
  }

  //replaceState()を実行する
  function runReplaceState(){
    history.replaceState(null, null, '#push');
    return 'replaceState()';
  }

  //alert()を実行する
  function alertDetial(){
    alert(name + 'が実行されました。\nボタンを押す前の履歴の数は' + before + '\nボタンを押した後の履歴の数は' + after + 'です。');
  }
});
