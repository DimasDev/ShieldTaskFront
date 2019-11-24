const nums = {
  0: [true, true, true, true, false, true, true],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, true, false, false],
  4: [false, true, true, false, true, true, false],
  5: [true, false, true, true, true, true, false],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, true, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, true, true, false]
};

let flexClass;

export function generateCounter(counterClass, flexBoxesClass, offClass, onClass) {
  flexClass = flexBoxesClass;
  const divCounter = document.createElement('div');

  const delimiter = '<svg id="delimiter2" viewBox="0 0 105 211" class="' + flexClass + '">' +
    '<polygon class="' + offClass + ' ' + onClass + '" points="42.5, 47 62.5, 47 62.5, 67 42.5, 67 42.5, 47"/>' +
    '<polygon class="' + offClass + ' ' + onClass + '" points="42.5, 142 62.5, 142 62.5, 162 42.5, 162 42.5, 142"/>' +
    '</svg>';
  const dot = '<svg id="delimiter1" viewBox="0 0 105 211" class="' + flexClass + '">' +
    '<polygon class="' + offClass + ' ' + onClass + '" points="42.5, 191 62.5, 191 62.5, 211 42.5, 211 42.5, 191"/>' +
    '</svg>';
  divCounter.innerHTML = symbol('minDozens', offClass, onClass) + symbol('min', offClass, onClass) + delimiter +
    symbol('secDozens', offClass, onClass) + symbol('sec', offClass, onClass) + dot +
    symbol('msDozens', offClass, onClass) + symbol('ms', offClass, onClass);
  divCounter.classList.add(counterClass);
  return divCounter;
}

function symbol(id, offClass, onClass) {
  return '<svg id="' + id + '" viewBox="0 0 105 211" class="' + flexClass + '">' +
  '<path class="' + offClass + ' ' + onClass + '" d="M 13 0 L 85 0 L 78 20 L 20 20 L 0 13 C 0 6.5, 6.5 0, 13 0"/>' +
  '<path class="' + offClass + ' ' + onClass + '" d="M 92 0 C 98.5 0, 105 6.5, 105 13 L 105 98 L 100 103 L 85 88 L 85 20 L 92 0"/>' +
  '<path class="' + offClass + ' ' + onClass +
    '" d="M 100 108 L 105 113 L 105 198 C 105 204.5, 98.5 211, 92 211 L 85 191 L 85 123 L 100 108"/>' +
  '<path class="' + offClass + ' ' + onClass + '" d="M 13 211 L 85 211 L 78 191 L 20 191 L 0 198 C 0 204.5, 6.5 211, 13 211"/>' +
  '<path class="' + offClass + '" d="M 93 105.5 L 83 115.5 L 22 115.5 L 12 105.5 L 22 95.5 L 83 95.5 L 93 105.5"/>' +
  '<path class="' + offClass + ' ' + onClass + '" d="M 0 20 L 0 98 L 5 103 L 20 88 L 20 27 L 0 20"/>' +
  '<path class="' + offClass + ' ' + onClass + '" d="M 5 108 L 20 123 L 20 184 L 0 191 L 0 113 L 5 108"/>' +
  '</svg>';
}

export function stringToLCD(counterDiv, time, offClass, onClass, delimiterClass) {
  const resultDiv = counterDiv;
  const timeCropped = time.replace(':', '').replace('.', '');
  let counter = 0;
  resultDiv.childNodes.forEach((svg: any) => {
    if (svg.childElementCount > 2) {
      const currentNum = nums[timeCropped.toString().charAt(counter)];
      counter++;
      for (let j = 0; j < 7; j++) {
        currentNum[j] ? svg.childNodes[j].classList.value = onClass : svg.childNodes[j].classList.value = offClass;
      }
    } else if (svg.childElementCount === 2) {
      svg.childNodes.forEach(polygon => {
        polygon.classList.value = delimiterClass;
      });
    }
  });
  return resultDiv;
}
