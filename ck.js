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
            l,
            r, g, b;
        
        if(!_width){
            _width= _video.offsetWidth;
            _height= _video.offsetHeight;
        }
        
        _tmpCtx.drawImage(_video, 0, 0, _width, _height);
        
        frame= _tmpCtx.getImageData(0, 0, _width, _height);
        
        // coletamos as informações dos pixels do canvas
        data= frame.data;
        
        // cada pixel, possui 4 bites, e estão em uma lista única
        l= data.length/4;
        while(l--){
            r= data[l*4];
            g= data[l*4+1];
            b= data[l*4+2];
            // a= data[l*4+3]; // poderíamos usar o alpha, mas não é o caso neste momento
            // aqui, r, g e b vao de 0 a 255
        }
        
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
            