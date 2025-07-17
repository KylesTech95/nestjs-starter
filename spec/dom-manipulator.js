function DomManipulator() {}

DomManipulator.prototype.addDiv = function(id, text) {
  const newDiv = document.createElement('div');
  newDiv.id = id;
  newDiv.textContent = text;
  document.body.appendChild(newDiv);
};

module.exports = DomManipulator;
