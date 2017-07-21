(function() {
  var container = document.createElement('div');
  container.style.marginLeft = '50%';
  container.style.width = '50%';
  container.style.minWidth = '800px';
  container.style.transform = 'translate(-50%)';
  container.style.display = 'inline-block';
  container.style.marginBottom = '100px';
  container.id = 'description';
  checkBeforeNodeLoaded('#title', function() {
    document.body.appendChild(container);
  });

  var title = document.createElement('span');
  title.style.color = '#666';
  title.style.fontWeight = 500;
  title.style.lineHeight = '1.5em';
  title.style.fontSize = '2em';
  title.innerHTML = 'Sobre este sitio';
  container.appendChild(title);

  container.appendChild(document.createElement('br'));

  var text = document.createElement('span');
  text.style.color = '#AAAAAA';
  text.style.lineHeight = '1.5em';
  text.style.fontSize = '1em';
  text.innerHTML = 'Aqui podrás ver el estado de todos los servicios de indigitall así como sus tiempos de respuesta.';
  container.appendChild(text);

  container.animate([{
      marginTop: '30px'
    },
    {
      marginTop: '100px'
    }
  ], {
    duration: 500,
    iterations: 1,
    fill: 'forwards',
    easing: 'ease-in-out'
  });
})()
