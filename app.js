var summoner = "Ulamog23";
var region = "euw1";

const getSummonerData = async (summoner,region) => {

    //Global
    const APIkey = "RGAPI-42021622-052f-4515-a7ec-1681ab8c5a85";
    const nameArea = document.getElementById('name')
    const lvlArea = document.getElementById('lvl')

    let summonerName = summoner;
    let zone = region;
    let res = await fetch(`https://${zone}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${APIkey}`)
    let globalData = await res.json()

    nameArea.innerHTML = `<p class="white">${globalData.name}</p>`
    lvlArea.innerHTML = `<p class="white">Niveau ${globalData.summonerLevel}</p>`

    const getIcon = async () => {
        const iconImg = document.getElementById('iconB')
        let iconLink = `https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${globalData.profileIconId}.png`
        iconImg.innerHTML = `<img id='icon' src="${iconLink}" alt="">`
    }

    const getMastery = async () => {
        const masteryB1 = document.getElementById('champ1')
        const masteryB2 = document.getElementById('champ2')
        const masteryB3 = document.getElementById('champ3')

        let res = await fetch(`https://${zone}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${globalData.id}?api_key=${APIkey}`)
        let data = await res.json();

        let mastery0 = data[0].championId
        let mastery1 = data[1].championId
        let mastery2 = data[2].championId
        let masteryLvl0 = data[0].championLevel
        let masteryLvl1 = data[1].championLevel
        let masteryLvl2 = data[2].championLevel

        let res2 = await fetch('https://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/champion.json')
        let data2 = await res2.json()

        const getChampNameFromId = (champId) => {
            for(i = 0;i < data2.data.length;i++){
                if(data2.data[i][1].key == champId){
                    return data2.data[i][1].id;
                }
            }   
        }

        const getIconFromChamp = (champName) => {
            return `<img class="border" src='https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/${champName}.png' alt="">`
        }

        data2.data = Object.entries(data2.data);

        mastery0 = getChampNameFromId(mastery0)
        mastery1 = getChampNameFromId(mastery1)
        mastery2 = getChampNameFromId(mastery2)

        masteryB1.innerHTML = `${getIconFromChamp(mastery0)}<p class="center">${mastery0}</p><p class="center">Niveau ${masteryLvl0}</p>`
        masteryB2.innerHTML = `${getIconFromChamp(mastery1)}<p class="center">${mastery1}</p><p class="center">Niveau ${masteryLvl1}</p>`
        masteryB3.innerHTML = `${getIconFromChamp(mastery2)}<p class="center">${mastery2}</p><p class="center">Niveau ${masteryLvl2}</p>`

    }

    getIcon()
    getMastery()
}

getSummonerData(summoner,region)

//https://www.masterypoints.com/assets/img/lol/mastery_profile/4.png