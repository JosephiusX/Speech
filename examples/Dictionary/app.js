//Dictonary
function buildMap() {
    var item,
      pathArray;

    for (var i = 0; i < dictionary.length; i++) {
      item = dictionary[i];
      pathArray = item.word.split('');

      addItemToMap(map, pathArray, item.weight, i);
    };
  };

  function addItemToMap(mapNode, pathArray, weight, index) {
    var letter;

    if (pathArray && pathArray.length) {
      letter = pathArray.shift();

      if (mapNode[letter]) {
        managePredictions(mapNode[letter].predictions, index);
      } else {
        mapNode[letter] = {
          predictions: [index],
          children: {}
        }
      }
      addItemToMap(mapNode[letter].children, pathArray, weight, index);
    }
  };

  // Prediction function 

  function predict(searchTerm) {
    var predictionObject = findPredictions(searchTerm.split(''), map),
      result = [];

    if (predictionObject) {
      for (var i = 0; i < predictionObject.predictions.length; i++) {
        result.push(dictionary[predictionObject.predictions[i]].word);
      };
      return result;
    }
  };

  function findPredictions(searchTermArray, object) {
    var pathArray,
      key;

    if (searchTermArray && searchTermArray.length) {
      key = searchTermArray.shift();
      if (object[key] && object[key].children && searchTermArray && searchTermArray.length) {
        return findPredictions(searchTermArray, object[key].children);
      } else {
        return object[key];
      }
    }
  };