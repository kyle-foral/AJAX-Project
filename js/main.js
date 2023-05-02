
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
const $text1 = document.querySelector('#pokemon1');
const $text2 = document.querySelector('#pokemon2');
const $text3 = document.querySelector('#pokemon3');
const $text4 = document.querySelector('#pokemon4');
const $text5 = document.querySelector('#pokemon5');
const $text6 = document.querySelector('#pokemon6');

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
    pokemon6: $poke6.src,
    pokemontext1: $text1.value,
    pokemontext2: $text2.value,
    pokemontext3: $text3.value,
    pokemontext4: $text4.value,
    pokemontext5: $text5.value,
    pokemontext6: $text6.value
  };
  cardSwap('viewcards');
  data.nextEntryId++;
  data.entries.unshift(entry);
  for (let i = 1; i < $img.length; i++) {
    $img[i].setAttribute('src', 'images/placeholder-image.png');
  }
  $form.reset();
}

function renderEntry(entry) {

  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $partyRow = document.createElement('div');
  $partyRow.className = 'row1';

  const $partyColumn = document.createElement('div');
  $partyColumn.className = 'column-full';

  const $partyTitle = document.createElement('span');
  $partyTitle.textContent = entry.party;

  const $viewRow = document.createElement('div');
  $viewRow.className = 'row-view';

  const $viewColumn = document.createElement('div');
  $viewColumn.className = 'column-view';

  const $pokemon1 = document.createElement('img');
  $pokemon1.src = entry.pokemon1;
  $pokemon1.alt = entry.pokemontext1;

  const $pokemon2 = document.createElement('img');
  $pokemon2.src = entry.pokemon2;
  $pokemon2.alt = entry.pokemontext2;

  const $pokemon3 = document.createElement('img');
  $pokemon3.src = entry.pokemon3;
  $pokemon3.alt = entry.pokemontext3;

  const $pokemon4 = document.createElement('img');
  $pokemon4.src = entry.pokemon4;
  $pokemon4.alt = entry.pokemontext4;

  const $pokemon5 = document.createElement('img');
  $pokemon5.src = entry.pokemon5;
  $pokemon5.alt = entry.pokemontext5;

  const $pokemon6 = document.createElement('img');
  $pokemon6.src = entry.pokemon6;
  $pokemon6.alt = entry.pokemontext6;

  const $pen = document.createElement('i');
  $pen.className = 'fa fa-pencil';

  const $star = document.createElement('i');
  $star.className = 'fa fa-star';

  const $topline = document.createElement('div');
  $topline.className = 'topline';

  $li.appendChild($partyRow);
  $partyRow.appendChild($partyColumn);
  $partyColumn.appendChild($topline);
  $topline.appendChild($star);
  $topline.appendChild($partyTitle);
  $topline.appendChild($pen);
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

$ul.addEventListener('click', function (event) {
  const $cardpicker = document.querySelector('.cardpicker');
  // const $viewcards = document.querySelector('.viewcards');
  // const $formId = document.querySelector('#formId');
  if (event.target.matches('.fa-pencil')) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
        $cardpicker.children[0][0].value = data.entries[i].party;
        // data.entries.pokemon1 = data.entries[i].pokemon1;
        $cardpicker.children[0][2].value = data.entries[i].pokemontext1;
        $cardpicker.children[0][3].value = data.entries[i].pokemontext2;
        $cardpicker.children[0][4].value = data.entries[i].pokemontext2;
        $cardpicker.children[0][5].value = data.entries[i].pokemontext4;
        $cardpicker.children[0][6].value = data.entries[i].pokemontext5;
        $cardpicker.children[0][7].value = data.entries[i].pokemontext6;
        // console.log('card', data.entries[i], 'pokemon', data.entries[i].pokemon1, 'view', $formId.elements);
        cardSwap('cardpicker');
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});

function cardSwap(cardpicker) {
  const $cardpicker = document.querySelector('.cardpicker');
  const $viewcards = document.querySelector('.viewcards');
  if (cardpicker === 'cardpicker') {
    $cardpicker.className = 'cardpicker';
    $viewcards.className = 'viewcards hidden';
  } else {
    $cardpicker.className = 'cardpicker hidden';
    $viewcards.className = 'viewcards';
  }
  data.view = cardpicker;
}

const $view = document.querySelector('.view');
$view.addEventListener('click', function () {
  cardSwap('viewcards');
});

const $add = document.querySelector('.add');
$add.addEventListener('click', function () {
  cardSwap('cardpicker');
});
