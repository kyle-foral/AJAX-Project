
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
  const $cardpicker = document.querySelector('.cardpicker');
  const $li = document.querySelectorAll('li');
  event.preventDefault();
  let entry = {};
  if (data.editing !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].party = $cardpicker.children[0][0].value;
        data.entries[i].pokemon1 = $poke1.src;
        data.entries[i].pokemon2 = $poke2.src;
        data.entries[i].pokemon3 = $poke3.src;
        data.entries[i].pokemon4 = $poke4.src;
        data.entries[i].pokemon5 = $poke5.src;
        data.entries[i].pokemon6 = $poke6.src;
        data.entries[i].pokemontext1 = $cardpicker.children[0][2].value;
        data.entries[i].pokemontext2 = $cardpicker.children[0][3].value;
        data.entries[i].pokemontext3 = $cardpicker.children[0][4].value;
        data.entries[i].pokemontext4 = $cardpicker.children[0][5].value;
        data.entries[i].pokemontext5 = $cardpicker.children[0][6].value;
        data.entries[i].pokemontext6 = $cardpicker.children[0][7].value;
        const $edited = renderEntry(data.editing);
        for (let e = 0; e < $li.length; e++) {
          if (Number($li[e].getAttribute('data-entry-id')) === data.editing.entryId) {
            $li[e].replaceWith($edited);
          }
        }
      }
    }
  } else {
    entry = {
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
    const $ul = document.querySelector('ul');
    $ul.appendChild(renderEntry(entry));
    data.nextEntryId++;
    data.entries.unshift(entry);
  }
  cardSwap('viewcards');
  for (let i = 1; i < $img.length; i++) {
    $img[i].setAttribute('src', 'images/placeholder-image.png');
  }
  $form.reset();
  data.editing = null;
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
  $star.setAttribute('data-entry-id', entry.entryId);

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

const newOl = document.querySelector('ol');
let counter = 0;
newOl.addEventListener('click', function (event) {
  const $cardpicker = document.querySelector('.cardpicker');

  const $li = document.querySelectorAll('li');
  if (event.target.matches('.fa-star')) {
    const pickedStar = event.target.closest('.fa-star');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(event.target.closest('.fa-star').getAttribute('data-entry-id'))) {
        counter++;
        if (counter % 2 === 0) {
          pickedStar.style.color = 'yellow';
        } else {
          pickedStar.style.color = 'black';
          if (pickedStar.style.color === 'black') {
            for (let j = 0; j < data.entries.length; j++) {
              if (data.entries[j].entryId === Number(event.target.closest('.fa-star').getAttribute('data-entry-id'))) {
                data.editing = data.entries[j];
                $cardpicker.children[0][0].value = data.entries[j].party;
                $poke1.src = data.entries[j].pokemon1;
                $poke2.src = data.entries[j].pokemon2;
                $poke3.src = data.entries[j].pokemon3;
                $poke4.src = data.entries[j].pokemon4;
                $poke5.src = data.entries[j].pokemon5;
                $poke6.src = data.entries[j].pokemon6;

                for (let o = 0; o < $li.length; o++) {
                  if ($li[o].getAttribute('data-entry-id') === pickedStar.getAttribute('data-entry-id')) {
                    $li[o].remove();
                  }
                }
                $ul.appendChild(renderEntry(data.entries[i]));
                counter = 0;
              }
            }
          }
        }
      }
    }
  }
}
);
const $ul = document.querySelector('ul');
let starCounter = 0;
$ul.addEventListener('click', function (event) {
  const $cardpicker = document.querySelector('.cardpicker');
  if (event.target.matches('.fa-pencil')) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
        $cardpicker.children[0][0].value = data.entries[i].party;
        $poke1.src = data.entries[i].pokemon1;
        $poke2.src = data.entries[i].pokemon2;
        $poke3.src = data.entries[i].pokemon3;
        $poke4.src = data.entries[i].pokemon4;
        $poke5.src = data.entries[i].pokemon5;
        $poke6.src = data.entries[i].pokemon6;
        $cardpicker.children[0][2].value = data.entries[i].pokemontext1;
        $cardpicker.children[0][3].value = data.entries[i].pokemontext2;
        $cardpicker.children[0][4].value = data.entries[i].pokemontext2;
        $cardpicker.children[0][5].value = data.entries[i].pokemontext4;
        $cardpicker.children[0][6].value = data.entries[i].pokemontext5;
        $cardpicker.children[0][7].value = data.entries[i].pokemontext6;
        cardSwap('cardpicker');
      }
    }
  }

  const $li = document.querySelectorAll('li');

  if (event.target.matches('.fa-star')) {
    const pickedStar = event.target.closest('.fa-star');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(event.target.closest('.fa-star').getAttribute('data-entry-id'))) {
        starCounter++;
        if (starCounter % 2 === 0) {
          pickedStar.style.color = 'black';
        } else {
          pickedStar.style.color = 'yellow';
          if (pickedStar.style.color === 'yellow') {
            for (let j = 0; j < data.entries.length; j++) {
              if (data.entries[j].entryId === Number(event.target.closest('.fa-star').getAttribute('data-entry-id'))) {
                data.editing = data.entries[j];
                $cardpicker.children[0][0].value = data.entries[i].party;
                $poke1.src = data.entries[j].pokemon1;
                $poke2.src = data.entries[j].pokemon2;
                $poke3.src = data.entries[j].pokemon3;
                $poke4.src = data.entries[j].pokemon4;
                $poke5.src = data.entries[j].pokemon5;
                $poke6.src = data.entries[j].pokemon6;
                data.fentries = data.entries[j];

                for (let o = 0; o < $li.length; o++) {

                  if ($li[o].getAttribute('data-entry-id') === pickedStar.getAttribute('data-entry-id')) {
                    $li[o].remove();
                  }
                }
                newOl.appendChild(renderEntry(data.entries[j]));
                starCounter = 0;
                break;
              }
            }
          }
        }
      }
    }
  }
}
);

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  cardSwap(data.view);
});

function cardSwap(cardpicker) {
  const $cardpicker = document.querySelector('.cardpicker');
  const $viewcards = document.querySelector('.viewcards');
  const $favorites = document.querySelector('.favoritecards');
  if (cardpicker === 'cardpicker') {
    $cardpicker.className = 'cardpicker';
    $viewcards.className = 'viewcards hidden';
    $favorites.className = 'favoritecards hidden';
  } else if (cardpicker === 'viewcards') {
    $cardpicker.className = 'cardpicker hidden';
    $viewcards.className = 'viewcards';
    $favorites.className = 'favoritecards hidden';
  } else {
    $cardpicker.className = 'cardpicker hidden';
    $viewcards.className = 'viewcards hidden';
    $favorites.className = 'favoritecards';
  }
  data.view = cardpicker;
}

const $view = document.querySelector('.view');
$view.addEventListener('click', function () {
  cardSwap('viewcards');
});

const $favorites = document.querySelector('.favorites');
$favorites.addEventListener('click', function () {
  cardSwap('favoritecards');
});

const $add = document.querySelector('.add');
$add.addEventListener('click', function () {
  const $cardpicker = document.querySelector('.cardpicker');
  $cardpicker.children[0][0].value = null;
  $poke1.src = 'images/card-backside.png';
  $poke2.src = 'images/card-backside.png';
  $poke3.src = 'images/card-backside.png';
  $poke4.src = 'images/card-backside.png';
  $poke5.src = 'images/card-backside.png';
  $poke6.src = 'images/card-backside.png';
  $cardpicker.children[0][2].value = null;
  $cardpicker.children[0][3].value = null;
  $cardpicker.children[0][4].value = null;
  $cardpicker.children[0][5].value = null;
  $cardpicker.children[0][6].value = null;
  $cardpicker.children[0][7].value = null;
  cardSwap('cardpicker');
});

const deleteParty = document.querySelector('.delete');
const yes = document.querySelector('#no-button');
const no = document.querySelector('#cancel');
const background = document.querySelector('.row-modal');
const shader = document.querySelector('.column-full-modal');

deleteParty.addEventListener('click', popup);
no.addEventListener('click', closed);
yes.addEventListener('click', deleteteam);

function popup(event) {
  shader.setAttribute('class', 'dark');
  background.setAttribute('class', 'show');
}

function closed(event) {
  shader.setAttribute('class', 'overlay');
  background.setAttribute('class', 'noshow');
}

function deleteteam(event) {
  const $li = document.querySelectorAll('li');
  for (let d = 0; d < $li.length; d++) {
    if (Number($li[d].getAttribute('data-entry-id')) === data.editing.entryId) {
      $li[d].remove();
    }
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        const removed = data.entries[i].entryId;
        data.entries.splice(0, removed);
      }
    }
  }
  shader.setAttribute('class', 'overlay');
  background.setAttribute('class', 'noshow');
  data.editing = null;
  cardSwap('viewcards');
}
