function getPokemonData(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=name:' + name);
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-Api-Key', 'eeb741e2-0d06-436f-90ca-f25488d4f1d4');
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
  });
  xhr.send();
}

getPokemonData('ditto');
