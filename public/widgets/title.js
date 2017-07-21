(function() {
  var container = document.createElement('div');
  container.style.marginLeft = '50%';
  container.style.transform = 'translate(-50%)';
  container.style.display = 'inline-block';
  container.id = 'title';
  checkBeforeNodeLoaded('body', function(){
    document.body.appendChild(container);
  });

  var logo = document.createElement('img');
  logo.src = '/img/logo.png';
  container.appendChild(logo);

  container.animate([
    {
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
