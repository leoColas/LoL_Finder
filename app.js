var summoner = "Ulamog23";
var region = "euw1";

const getSummonerData = async (summoner,region) => {

    //Global
    const APIkey = "RGAPI-42021622-052f-4515-a7ec-1681ab8c5a85";
    const nameArea = document.getElementById('name')
    let summonerName = summoner;
    let zone = region;
    let res = await fetch(`https://${zone}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${APIkey}`)
    let globalData = await res.json()
    nameArea.innerHTML = `<p>${globalData.name}</p> <p>Niveau ${globalData.summonerLevel}</p>`

    const getIcon = async () => {
        const iconImg = document.getElementById('icon')
        let iconLink = `https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${globalData.profileIconId}.png`
        iconImg.innerHTML = `<img src="${iconLink}">`
    }

    const getMastery = async () => {
        const masteryB1 = document.getElementById('champ1')
        const masteryB2 = document.getElementById('champ2')
        const masteryB3 = document.getElementById('champ3')

        let res = await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${globalData.id}?api_key=${APIkey}`)
        let data = await res.json();

        let mastery0 = data[0].championId
        let mastery1 = data[1].championId
        let mastery2 = data[2].championId

        let res2 = await fetch('https://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion.json')
        let data2 = await res2.json()

        const getChampNameFromId = (champId) => {
            for(i = 0;i < data2.data.length;i++){
                if(data2.data[i][1].key == champId){
                    return data2.data[i][1].id;
                }
            }   
        }

        data2.data = Object.entries(data2.data);

        mastery0 = getChampNameFromId(mastery0)
        mastery1 = getChampNameFromId(mastery1)
        mastery2 = getChampNameFromId(mastery2)

        masteryB1.textContent = `${mastery0}`
        masteryB2.textContent = `${mastery1}`
        masteryB3.textContent = `${mastery2}`
    }

    getIcon()
    getMastery()
}

getSummonerData(summoner,region)