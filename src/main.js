var pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

let userHeight;
let userWeight;
let avatarName;
let avatarImageLink = "./src/images/"
$('#trainerForm').on('submit', function(e) {
	e.preventDefault();

    userHeight = $('#userHeight').val();
    userWeight = $('#userWeight').val();
    avatarName = $('#userAvatar').val();

    console.log(userHeight);
    console.log(userWeight);
    console.log(avatarName);

    if (userHeight === "") {
        $('#userHeight').addClass('error');
    }if (userWeight === "") {
        $('#userWeight').addClass('error');
    }
});

$('#compareForm').on('submit', function(e) {
	e.preventDefault();
    let pokemonName1 = $('#pokemonName1').val().toLowerCase();
    
	// I have already added my app key to the end here!
	let pokemonObjectUrl1 = pokemonUrl + pokemonName1 + '/';

	// Here is another way to call API's.
	// We are using the AJAX method
	$.ajax({
		// I have already added my app key to the end here!
		url: pokemonObjectUrl1,
		method: 'GET',
		// Now we can handle errors!!
		error: function(pokemon1) {
            console.log(pokemon1);
            $('#pokemonName1').addClass('error');
        },
		success: function(pokemon1) {
            console.log(pokemon1);
            $('#pokemonName1').removeClass('error');
            let pokemonWeight1 = pokemon1.weight * .22;
            let pokemonHeight1 = pokemon1.height / .25;
            pokemonImage1 = pokemon1.sprites.front_default;
            console.log(pokemonWeight1);
            console.log(pokemonHeight1);
            let radioValue = $("input[name='compareRadioBtn']:checked").val();
            console.log(radioValue);
            if (radioValue === 'trainer') {
                if ($('#userHeight').val() === "") {
                    $('#userHeight').addClass('error');
                }if ($('#userWeight').val() === "") {
                    $('#userWeight').addClass('error');
                }else{
                    let avatarImage = avatarImageLink + avatarName.toLowerCase() + '.png';
                    $('#comparisons').html('');
                    let template = createComparisonCard(pokemonName1, pokemonWeight1, pokemonHeight1, pokemonImage1, avatarName, userWeight, userHeight, avatarImage);
                    $('#comparisons').append(template);
                }
            }else if (radioValue === 'pokemon2') {
                let pokemonName2 = $('#pokemonName2').val().toLowerCase();
                let pokemonObjectUrl2 = pokemonUrl + pokemonName2 + '/';
                $.ajax({
                    url: pokemonObjectUrl2,
                    method: 'GET',
                    error:  function(pokemon2){
                        console.log(pokemon2);
                        $('#pokemonName2').addClass('error');
                    },
                    success: function(pokemon2){
                        console.log(pokemon2);
                        let pokemonWeight2 = pokemon2.weight * .22;
                        let pokemonHeight2 = pokemon2.height / .25;
                        pokemonImage2 = pokemon2.sprites.front_default;
                        console.log(pokemonWeight2);
                        console.log(pokemonHeight2);
                        $('#comparisons').html('');
                        let template = createComparisonCard(pokemonName1, pokemonWeight1, pokemonHeight1, pokemonImage1, pokemonName2, pokemonWeight2, pokemonHeight2, pokemonImage2);
                        $('#comparisons').append(template);
                    }
                })
            }
		}
	});
});

function createComparisonCard(name1, weight1, height1, imageUrl1, name2, weight2, height2, imageUrl2) {
    let card = `
        <div class="card">
        <div class="card-header">
            ${name1.toUpperCase()} vs. ${name2.toUpperCase()}
        </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card card-block">
                            <img class="card-img-top" src="${imageUrl1}" alt="${name1.toUpperCase()} image" id="comparisonImage" style="height:${height1}px; width:auto">
                            <div class="card-body">
                                <h5 class="card-title">${name1.toUpperCase()}</h5>
                                <p class="card-text">Weight: ${weight1} ibs (${(weight1 / weight2).toFixed(2)}x)</p>
                                <p class="card-text">Height: ${height1} inches (${(height1 / height2).toFixed(2)}x)</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card card-block">
                            <img class="card-img-top" src="${imageUrl2}" alt="${name2.toUpperCase()} image" id="comparisonImage" style="height:${height2}px; width:auto">
                            <div class="card-body">
                                <h5 class="card-title">${name2.toUpperCase()}</h5>
                                <p class="card-text">Weight: ${weight2} ibs (${(weight2 / weight1).toFixed(2)}x)</p>
                                <p class="card-text">Height: ${height2} inches (${(height2 / height1).toFixed(2)}x)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    return card;
}
