window.ck= (function(_d){

    var _video  = _d.getElementById('video'),
        _canvas = _d.getElementById('canvas'),
        _ctx    = _canvas.getContext('2d'),
        _n      = navigator,
        _w      = window,
        _width  = 0,
        _height = 0;
    
    var _constructor= function(){
        
        // um objecto URL
        _w.URL= _w.URL || _w.webkitURL;
        
        _n.getUserMedia= _n.getUserMedia||_n.webkitGetUserMedia||_n.mozGetUserMedia||false;
        
        if(_n.getUserMedia){
            
            _n.getUserMedia({
                audio: false,
                video: true
            }, function(stream){
                
                // transformamos o stream em um objeto URL
                try{
                    stream= _w.URL.createObjectURL(stream);
                }catch(e){}
                
                // e o passamos para o src do elemento de vídeo
                _video.src= stream;
                // agora, podemos dar play no vídeo
                _video.play();
                
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
            