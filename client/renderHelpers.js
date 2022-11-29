import {fetchAllPlayers, fetchSinglePlayer, addNewPlayer, removePlayer} from './ajaxHelpers';

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

export const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if(!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  playerList.map(pup => {
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="delete-button" data-id=${pup.id}>Remove from Bowl</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  });

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  detailButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const dog = await fetchSinglePlayer(button.dataset.id);
      renderSinglePlayer(dog)
    });
  });

  let deleteButtons = [...document.getElementsByClassName('delete-button')];
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const dog = await fetchSinglePlayer(btn.dataset.id);
      await removePlayer(dog.id);
      const allDogs = await fetchAllPlayers()
      renderAllPlayers(allDogs);
    })
  })

};

export const renderSinglePlayer = (playerObj) => {
  console.log('HERE', playerObj)
  if(!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${playerObj.name} the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;

  playerContainer.innerHTML = pupHTML;


  const allPlayersBtn = document.querySelector('#see-all');
allPlayersBtn.addEventListener('click', async () => {
  console.log('all')
  const allDogs = await fetchAllPlayers();
  renderAllPlayers(allDogs);
})
}



export const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const breed = event.target[1].value
    console.log(name, breed)
    await addNewPlayer({name, breed})
    const allDogs = await fetchAllPlayers();
    renderAllPlayers(allDogs)
    form.reset()
  });
}
