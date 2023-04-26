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
  data.entries.unshift(entry);
  for (let i = 1; i < $img.length; i++) {
    $img[i].setAttribute('src', 'images/placeholder-image.png');
  }
  $form.reset();
}
