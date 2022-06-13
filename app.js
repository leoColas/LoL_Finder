var summoner = prompt("Ton pseudo");
var region = "euw1";

const getSummonerData = async (summoner,region) => {

    //Global
    const APIkey = "RGAPI-07b4eb66-1ba8-46e5-be5b-0b7b26faf32a";
    const nameArea = document.getElementById('name')
    const lvlArea = document.getElementById('lvl')

    let summonerName = summoner;
    let zone = region;
    let res = await fetch(`https://${zone}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${APIkey}`)
    let globalData = await res.json()

    nameArea.innerHTML = `<p class="white">${globalData.name}</p>`
    lvlArea.innerHTML = `<p class="white">Niveau <span class="red">${globalData.summonerLevel}</span></p>`

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
            return `<img class="p" src='https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/${champName}.png' alt="">`
        }

        data2.data = Object.entries(data2.data);

        mastery0 = getChampNameFromId(mastery0)
        mastery1 = getChampNameFromId(mastery1)
        mastery2 = getChampNameFromId(mastery2)

        masteryB1.innerHTML = `<img class="c" src="https://www.masterypoints.com/assets/img/lol/mastery_profile/${masteryLvl0}.png" alt="">${getIconFromChamp(mastery0)}<p class="center big">${mastery0}</p><p class="center">Niveau <span class="red">${masteryLvl0}</span></p>`
        masteryB2.innerHTML = `<img class="c" src="https://www.masterypoints.com/assets/img/lol/mastery_profile/${masteryLvl1}.png" alt="">${getIconFromChamp(mastery1)}<p class="center big">${mastery1}</p><p class="center">Niveau <span class="red">${masteryLvl1}</span></p>`
        masteryB3.innerHTML = `<img class="c" src="https://www.masterypoints.com/assets/img/lol/mastery_profile/${masteryLvl2}.png" alt="">${getIconFromChamp(mastery2)}<p class="center big">${mastery2}</p><p class="center">Niveau <span class="red">${masteryLvl2}</p>`

    }

    const getMatches = async () => {
        const mainBox = document.getElementById('lastGame')
        const rightTeam = document.getElementById('right')
        const leftTeam = document.getElementById('left')

        let res = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${globalData.puuid}/ids?start=0&count=20&api_key=${APIkey}`)
        let data = await res.json()

        let matchId = data[0]

        let match0 = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${APIkey}`)
        match0 = await match0.json()
        console.log(match0)
        const getIconBlueTeam = async (matchData) => {
            let match0 = matchData
            let summonerInfo = await fetch(`https://${zone}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match0.info.participants[i].puuid}?api_key=${APIkey}`)
            let data3 = await summonerInfo.json()
            return `https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${data3.profileIconId}.png`
        }

        const getIconRedTeam = async (matchData) => {
            let match01 = matchData
            let summonerInfo2 = await fetch(`https://${zone}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${match01.info.participants[i].puuid}?api_key=${APIkey}`)
            let data4 = await summonerInfo2.json()
            return `https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${data4.profileIconId}.png`
        }

        var playerIconLinks = Array();

        for(i = 0;i < 10;i++){
            if(i > 4){
                await playerIconLinks.push(await getIconBlueTeam(match0))
                //leftTeam.innerHTML = leftTeam.innerHTML + `<div class="nameBox"><img src="${}" alt="icon"><p class="small blue name">${match0.info.participants[i].summonerName}</p></div>`
            }else{
                await playerIconLinks.push(await getIconRedTeam(match0))
                //rightTeam.innerHTML = rightTeam.innerHTML + `<div class="nameBox"><img src="${getIconRedTeam(match0)}" alt="icon"><p class="small red name">${match0.info.participants[i].summonerName}</p></div>`                
            }
        }

        playerIconLinks.toString()
        console.log(playerIconLinks)

        for(i = 0;i < 10;i++){
            if(i > 4){
                leftTeam.innerHTML = leftTeam.innerHTML + `<div class="nameBox"><img class="icon" src="${playerIconLinks[i]}" alt="icon"><p class="small blue name">${match0.info.participants[i].summonerName}</p></div>`                
            }else{
                rightTeam.innerHTML = rightTeam.innerHTML + `<div class="nameBox"><img class="icon" src="${playerIconLinks[i]}" alt="icon"><p class="small red name">${match0.info.participants[i].summonerName}</p></div>`                
            }
        }

        mainBox.innerHTML = `<div id="left">${leftTeam.innerHTML}</div><img id="map" src="https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map${match0.info.mapId}.png" alt=""><div id="right">${rightTeam.innerHTML}</div>`
    }
    

    getIcon()
    getMastery()
    getMatches()
}

getSummonerData(summoner,region)