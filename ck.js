window.ck= (function(_d){

    var _video  = _d.getElementById('video'),
        _canvas = _d.getElementById('canvas'),
        _ctx    = _canvas.getContext('2d'),
        _n      = navigator,
        _w      = window,
        _width  = 0,
        _height = 0,
        // criamos um canvas virtual
        _tmpCtx = _d.createElement('canvas');
    
    // e setamos nele, os valores do canvas real
    _tmpCtx.width= _canvas.offsetWidth;
    _tmpCtx.height= _canvas.offsetHeight;
    // pegando seu context
    _tmpCtx= _tmpCtx.getContext('2d');
    
    var _videoPlaying= function(){
        
        var frame= '',
            data= null,
            // criamos algumas variáveis como helpers
            l,
            r, g, b;
        
        if(!_width){
            _width= _video.offsetWidth;
            _height= _video.offsetHeight;
        }
        
        // desenhamos no canvas virtual (melhor performance para o processamento)
        _tmpCtx.drawImage(_video, 0, 0, _width, _height);
        
        // frame, torna-se os dados da imagem no canvas(pixel a pixel)
        frame= _tmpCtx.getImageData(0, 0, _width, _height);
        
        // jogamos estes pixels no canvas real
        _ctx.putImageData(frame, 0, 0);
        
    };
    
    var _constructor= function(){
        
        _w.URL= _w.URL || _w.webkitURL;
        _n.getUserMedia= _n.getUserMedia||_n.webkitGetUserMedia||_n.mozGetUserMedia||false;
        
        if(_n.getUserMedia){
            
            _n.getUserMedia({
                audio: false,
                video: true
            }, function(stream){
                
                try{
                    stream= _w.URL.createObjectURL(stream);
                }catch(e){}
                
                _video.src= stream;
                _video.play();
                
                setInterval(_videoPlaying, 60);
                
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
            