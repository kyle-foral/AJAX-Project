
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

const $poke1 = document.querySelector('#imgpokemon1');
const $poke2 = document.querySelector('#imgpokemon2');
const $poke3 = document.querySelector('#imgpokemon3');
const $poke4 = document.querySelector('#imgpokemon4');
const $poke5 = document.querySelector('#imgpokemon5');
const $poke6 = document.querySelector('#imgpokemon6');

const $form = document.getElementById('formId');
$form.addEventListener('change', getPokemonData);
$form.addEventListener('submit', submitPokeball);

function submitPokeball(event) {

  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    party: event.target.elements.party.value,
    pokemon1: $poke1.src,
    pokemon2: $poke2.src,
    pokemon3: $poke3.src,
    pokemon4: $poke4.src,
    pokemon5: $poke5.src,
    pokemon6: $poke6.src
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

  const $partyRow = document.createElement('div');
  $partyRow.className = 'row1';

  const $partyColumn = document.createElement('div');
  $partyColumn.className = 'column-full';

  const $partyTitle = document.createElement('p');
  $partyTitle.textContent = entry.party;

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

  $li.appendChild($partyRow);
  $partyRow.appendChild($partyColumn);
  $partyColumn.appendChild($partyTitle);
  $partyColumn.appendChild($viewRow);
  $viewRow.appendChild($viewColumn);
  $viewColumn.appendChild($pokemon1);
  $viewColumn.appendChild($pokemon2);
  $viewColumn.appendChild($pokemon3);
  $viewColumn.appendChild($pokemon4);
  $viewColumn.appendChild($pokemon5);
  $viewColumn.appendChild($pokemon6);

  return $li;
}

const $ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});

function cardSwap(pick) {
  const $pick = document.querySelector('.pick');
  const $view = document.querySelector('.view');
  if (pick === 'pick') {
    $pick.className = 'pick';
    $view.classname = 'view hidden';
  } else {
    $pick.className = 'pick hidden';
    $view.className = 'view';
  }
  data.view = pick;
}

cardSwap();
