'use strict';

var scrollDocument = require('./scroll-document')
  , cursorPosition = require('./cursor-position');

module.exports = function() {
  var createPointer = function(position, elem) {
    var liElem = document.createElement('li')
      , divElem = document.createElement('div')
      , aElem = document.createElement('a');

    var documentHeight = document.body.scrollHeight
      , heightPercent = documentHeight / 100
      , scrollTop = position * heightPercent;

    divElem.className = 'title';
    aElem.href = '#';
    aElem.dataset.position = position;
    liElem.style.top = 'calc('+position+'% - 5px)';
    liElem.style.top = position+'%';

    liElem.appendChild(divElem);
    liElem.appendChild(aElem);

    aElem.addEventListener('click', function() {
      scrollDocument.toOffset(elem.offsetTop);
      cursorPosition.toElement(elem);
    });

    return liElem;
  };

  var documentHeight = document.getElementById('editor').scrollHeight
    , mapElement = document.getElementById('map')
    , chapters = document.querySelectorAll('h2')
    , frag = document.createDocumentFragment()
    , heightPercent = documentHeight / 100
    , pointers = [];

  for (var i = 0, chapter; chapter = chapters[i]; i++) {
    var position = parseInt(chapter.offsetTop / heightPercent);
    pointers.push(createPointer(position, chapter));
  }

  for (var i = 0; i < pointers.length; ++i) {
    frag.appendChild(pointers[i]);
  }

  while (mapElement.firstChild)
    mapElement.removeChild(mapElement.firstChild);

  mapElement.appendChild(frag);
};
