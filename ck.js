window.ck= (function(_d){

    var _video  = _d.getElementById('video'),
        _canvas = _d.getElementById('canvas'),
        _ctx    = _canvas.getContext('2d'),
        _n      = navigator,
        _w      = window,
        _width  = 0,
        _height = 0;
    
    
    // função executada para cada quadro
    var _videoPlaying= function(){
        
        var frame= '',
            data= null;
        
        // na primeira vez, pega as dimenções do video
        if(!_width){
            _width= _video.offsetWidth;
            _height= _video.offsetHeight;
        }
        
        _ctx.drawImage(_video, 0, 0, _width, _height);
        //_ctx.drawImage(_video, -200, -200, _width + 400, _height + 400);
        
    };
    //
    
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
                
                // atualizamos o canvas a cada quadro
                //requestAnimationFrame(_videoPlaying);
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
            