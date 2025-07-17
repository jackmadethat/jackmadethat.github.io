const img = document.getElementById("container");

fetch('https://api.giphy.com/v1/gifs/translate?api_key=QCZJkcdvqouXQtRfuYWQKN9msixZoHxV&s=fail', {mode: 'cors'})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  img.src = response.data.images.original.url;
});