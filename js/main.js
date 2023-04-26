function getPokemonData(event) {
  const curInputId = event.target.id;
  // console.log('name', `img${curInputId}`);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=!name:' + event.target.value);
  xhr.responseType = 'json';
  xhr.setRequestHeader('X-Api-Key', 'eeb741e2-0d06-436f-90ca-f25488d4f1d4');
  xhr.addEventListener('load', function () {

    document.querySelector(`#img${curInputId}`).setAttribute('src', xhr.response.data[0].images.large);

    // console.log(xhr.status);
    // console.log(xhr.response.data[0].images.large);
  });
  xhr.send();
}

const $form = document.getElementById('card-pick');
$form.addEventListener('change', getPokemonData);
