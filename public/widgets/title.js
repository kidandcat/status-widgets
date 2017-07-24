(function() {
  var container = document.createElement('div');
  container.style.maxWidth = '400px';
  container.style.textAlign = 'center';
  container.style.width = '80%';
  container.style.marginLeft = '50%';
  container.style.transform = 'translate(-50%)';
  container.style.display = 'inline-block';
  container.id = 'title';
  checkBeforeNodeLoaded('body', function() {
    document.body.appendChild(container);
  });

  var logo = document.createElement('img');
  logo.src = '/img/logo.png';
  logo.style.width: '80%';
  logo.style.height: 'auto';
  container.appendChild(logo);

  container.animate([{
      marginTop: '0'
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
})()
