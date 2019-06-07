window.ck= (function(_d){

    var _video  = _d.getElementById('video'),
        _canvas = _d.getElementById('canvas'),
        _ctx    = _canvas.getContext('2d'),
        _n      = navigator,
        _w      = window,
        _width  = 0,
        _height = 0,
        _tmpCtx = _d.createElement('canvas'),
        _colors = [0, 0, 200],
        _range  = 80;
    
    _tmpCtx.width= _canvas.offsetWidth;
    _tmpCtx.height= _canvas.offsetHeight;
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
        data= frame.data;
        
        l= data.length/4;
        while(l--){
            r= data[l*4];
            g= data[l*4+1];
            b= data[l*4+2];
            
            if(Math.abs(r - _colors[0]) < 250 - _range
                &&
               Math.abs(g - _colors[1]) < 250 - _range
                &&
               Math.abs(b - _colors[2]) < 250 - _range)
            {
                frame.data[l*4+3]= 0;
            }
        }
        
        _ctx.putImageData(frame, 0, 0);
    };
    
    var _videoClick= function(evt){
        var line= evt.offsetY,
            col= evt.offsetX,
            frame= _ctx.getImageData(col, line, 1, 1),
            px= [frame.data[0], frame.data[1], frame.data[2]];
        _colors= px;
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
                _video.srcObject= stream;
                _video.play();
                
                setInterval(_videoPlaying, 60);

                _d.getElementById('range').addEventListener('change', function(){
                    _range= 255 - this.value;
                });
                _canvas.addEventListener('click', _videoClick);
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
            
