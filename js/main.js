function getPokemonData(event) {
  const curInputId = event.target.id;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=!name:' + event.target.value);
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-Api-Key', 'eeb741e2-0d06-436f-90ca-f25488d4f1d4');
  xhr.addEventListener('load', function () {
    document.querySelector(`#img${curInputId}`).setAttribute('src', xhr.response.data[0].images.large);
  });
  xhr.send();
}
const $img = document.querySelectorAll('img');
const $form = document.getElementById('card-pick');
$form.addEventListener('change', getPokemonData);

$form.addEventListener('submit', submitPokeball);

function submitPokeball(event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    pokemon1: event.target.elements.pokemon1.value,
    pokemon2: event.target.elements.pokemon2.value,
    pokemon3: event.target.elements.pokemon3.value,
    pokemon4: event.target.elements.pokemon4.value,
    pokemon5: event.target.elements.pokemon5.value,
    pokemon6: event.target.elements.pokemon6.value
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  for (let i = 1; i < $img.length; i++) {
    $img[i].setAttribute('src', 'images/placeholder-image.png');
  }
  $form.reset();
}

function renderEntry(entry) {

  const $li = document.createElement('li');

  const $viewRow = document.createElement('div');
  $viewRow.className = 'row-view';

  const $viewColumn = document.createElement('div');
  $viewColumn.className = 'column-view';

  const $pokemon1 = document.createElement('img');
  $pokemon1.src = entry.pokemon1;

  const $pokemon2 = document.createElement('img');
  $pokemon2.src = entry.pokemon2;

  const $pokemon3 = document.createElement('img');
  $pokemon3.src = entry.pokemon3;

  const $pokemon4 = document.createElement('img');
  $pokemon4.src = entry.pokemon4;

  const $pokemon5 = document.createElement('img');
  $pokemon5.src = entry.pokemon5;

  const $pokemon6 = document.createElement('img');
  $pokemon6.src = entry.pokemon6;

  $li.appendChild($viewRow);
  $viewRow.appendChild($viewColumn);
  $viewColumn.appendChild($pokemon1);
  $viewColumn.appendChild($pokemon2);
  $viewColumn.appendChild($pokemon3);
  $viewColumn.appendChild($pokemon4);
  $viewColumn.appendChild($pokemon5);
  $viewColumn.appendChild($pokemon6);

  return $li;
}

renderEntry();
