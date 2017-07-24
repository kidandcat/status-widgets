(function() {
  window.statuss = [];

  var socket = io();
  socket.on('update', function(data) {
    if (typeof statuss[data.name] == 'undefined') {
      init(data.name, data.time);
    } else {
      update(data.name, data.time);
    }
    statuss[data.name] = data.time;
  });

  function init(url, time) {
    var container = document.createElement('div');
    container.style.marginLeft = '50%';
    container.style.width = '80%';
    container.style.maxWidth = '800px';
    container.style.transform = 'translate(-50%)';
    container.style.display = 'inline-block';
    container.style.border = 'none';
    container.style.backgroundColor = 'rgb(217, 217, 217)';
    container.style.borderRadius = '7px';
    container.style.padding = '20px';
    container.classList.add('status');
    if (!document.querySelector('.status')) {
      checkBeforeNodeLoaded('#description', function() {
        document.body.appendChild(container);
      });
    } else {
      checkBeforeNodeLoaded('.status:last-of-type', function() {
        document.body.appendChild(container);
      });
    }

    var sphere = document.createElement('div');
    sphere.style.backgroundColor = '#666';
    sphere.style.width = '15px';
    sphere.style.height = '15px';
    sphere.style.opacity = '0.8';
    sphere.style.marginRight = '15px';
    sphere.style.display = 'inline-block';
    sphere.style.borderRadius = '100px';
    sphere.id = 'SPHERE' + url.hashCode();
    container.appendChild(sphere);
    statusColor(sphere, time);

    var title = document.createElement('span');
    title.style.color = '#666';
    title.style.lineHeight = '1em';
    title.style.fontSize = '1.3em';
    title.innerHTML = url;
    container.appendChild(title);

    var ms = document.createElement('span');
    ms.style.color = '#666';
    ms.style.lineHeight = '1em';
    ms.style.fontSize = '1.3em';
    ms.style.float = 'right';
    ms.innerHTML = time + 'ms';
    ms.id = 'STATUS' + url.hashCode();
    container.appendChild(ms);

    container.animate([{
        marginTop: '0px'
      },
      {
        marginTop: '30px'
      }
    ], {
      duration: 500,
      iterations: 1,
      fill: 'forwards',
      easing: 'ease-in-out'
    });
  }

  function update(url, time) {
    var t = document.querySelector('#STATUS' + url.hashCode()).innerHTML;
    t = time + 'ms';
    statusColor(document.querySelector('#SPHERE' + url.hashCode()), time);
    document.querySelector('#STATUS' + url.hashCode()).innerHTML = t;
  }

  function statusColor(elem, time) {
    if (time > 300 && time < 2000) {
      blink(elem.parentNode, false);
      elem.style.backgroundColor = 'rgb(154, 125, 18)';
    } else if (time > 0 && time < 300) {
      blink(elem.parentNode, false);
      elem.style.backgroundColor = 'rgb(20, 98, 0)';
    } else {
      blink(elem.parentNode, true);
      elem.style.backgroundColor = 'rgb(182, 0, 0)';
    }
  }

  function blink(elem, doit) {
    if(doit && typeof elem.animation != 'undefined' && elem.animation.playState == 'running'){
      return true;
    }
    if (doit) {
      var animation = elem.animate([{
          backgroundColor: 'rgba(255, 0, 0, 0)'
        },
        {
          backgroundColor: 'rgba(255, 0, 0, 0.55)'
        }
      ], {
        duration: 1000,
        iterations: Infinity,
        direction: 'alternate',
        fill: 'forwards',
        easing: 'ease-in-out'
      });
      elem.animation = animation;
    } else {
      try{
        elem.animation.cancel();
      }catch(e){}
    }
  }
})()
