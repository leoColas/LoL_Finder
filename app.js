const APIkey = "RGAPI-42021622-052f-4515-a7ec-1681ab8c5a85";
var summoner = "Ulamog23";
var region = "euw1";

const getSummonerData = async (summoner,region) => {

    //Global
    const nameArea = document.getElementById('name')
    let summonerName = summoner;
    let zone = region;
    let res = await fetch(`https://${zone}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${APIkey}`)
    let data = await res.json()
    nameArea.innerHTML = `<p>${data.name}</p> <p>Niveau ${data.summonerLevel}</p>`

    const getIcon = () => {
        const iconImg = document.getElementById('icon')
        let iconLink = `https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${data.profileIconId}.png`
        iconImg.innerHTML = `<img src="${iconLink}">`
    }

    const getMastery = () => {
        
    }
}

getSummonerData(summoner,region)