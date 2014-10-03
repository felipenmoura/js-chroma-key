window.ck= (function(_d){

    var _video  = _d.getElementById('video'),
        _canvas = _d.getElementById('canvas'),
        _ctx    = _canvas.getContext('2d'),
        _n      = navigator,
        _w      = window,
        _width  = 0,
        _height = 0;
    
    var _constructor= function(){
        // verificamos qual acesso ao userMedia está disponível
        _n.getUserMedia= _n.getUserMedia||_n.webkitGetUserMedia||_n.mozGetUserMedia||false;
        
        // se houver suporte...
        if(_n.getUserMedia){
            
            // solicitamos o uso da mídia
            _n.getUserMedia({
                audio: false,
                video: true
            }, function(stream){
                
                // usaremos o stream aqui
                
            }, function(){
                alert('O usuário não permitiu!');
            });
            
        }else{
            alert('Não suportado!');
        }
    }
    
    return {
        start: _constructor
    };
    
})(document);
            