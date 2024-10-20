module.exports = async function (session) {
    // 1. Combien y-a-t’il de profils sur le compte netflix ? quels sont les comptes disponibles ?
    console.log("1.Combien y-a-t’il de profils sur le compte netflix ? quels sont les comptes disponibles ? ".black.bgGreen);

    const result = await session.run("MATCH (n:ProfileName) RETURN COUNT(n)")
    const nodes = result.records.map(record => record.get('COUNT(n)').toInt());
    console.log(nodes);

    // 2. Depuis quand le compte est-il abonné à Netflix ? (on partira du principe qu’il a consommé son abonnement le jour où il s’est abonné)
    console.log("2. Depuis quand le compte est-il abonné à Netflix ? (on partira du principe qu’il a consommé son abonnement le jour où il s’est abonné)".black.bgGreen);

    const result2 = await session.run("MATCH (t:Title) RETURN min(t.StartTime) AS oldestDate")
    const nodes2 = result2.records.map(record => record.get('oldestDate').toString());
    console.log(nodes2);

    // 3. Combien de temps chaque profil a passé sur Netflix ?
    console.log("3. Combien de temps chaque profil a passé sur Netflix ?".black.bgGreen);
    // J'ai une erreure que je n'ai pas comprise. t.Duration est au format Time(). 
    // Mais pour faire une somme de temps je dois les convertir au format Duration(). 
    // Pour pouvoir les convertir dans ce format je dois avoir deux valeur d'entrée Startime et Endtime pour avoir en sortie la durée. 
    // Mais t.duration est déjà une durée alors je n'ai pas de valeur EndTime. 
    // Donc pour avoir cette valeur il me suffit de faire duration(t.Starttime, t.Startime + t.duration). 
    // Sauf que je ne peux pas faire de calcul avec des valeur Time(). Donc je tourne en rond. 
    // Alors cette requete me donne un resultat mais pas celui escompté. 

    const result3 = await session.run("MATCH (t:Title)MATCH (p:ProfileName)RETURN sum(duration.inSeconds(datetime(),t.Duration)) AS totalDuration, p.name")
    const nodes3 = result3.records.map(record => {
        return {
            totalDuration: record.get('totalDuration'),
            name: record.get('p.name').toString()
        };
    });
    console.log(nodes3);

    // 4. Par profils, quels sont les 4 équipements les plus utilisés pour visionner Netflix ?
    console.log("4. Par profils, quels sont les 4 équipements les plus utilisés pour visionner Netflix ?".black.bgGreen);

    const henriQuery = await session.run('MATCH (p:ProfileName{name: "Henri"})-[:USED]->(d:DeviceType) MATCH (d)<-[:WATCHED_WITH]-(t:Title) RETURN d.name AS DeviceType, COUNT(t) AS TitleCount ORDER BY TitleCount DESC LIMIT 4 ')
    const okonaQuery = await session.run('MATCH (p:ProfileName{name: "Okona"})-[:USED]->(d:DeviceType) MATCH (d)<-[:WATCHED_WITH]-(t:Title) RETURN d.name AS DeviceType, COUNT(t) AS TitleCount ORDER BY TitleCount DESC LIMIT 4 ')
    const papaQuery = await session.run('MATCH (p:ProfileName{name: "Papa"})-[:USED]->(d:DeviceType) MATCH (d)<-[:WATCHED_WITH]-(t:Title) RETURN d.name AS DeviceType, COUNT(t) AS TitleCount ORDER BY TitleCount DESC LIMIT 4 ')
    const ensembleQuery = await session.run('MATCH (p:ProfileName{name: "À voir ensemble"})-[:USED]->(d:DeviceType) MATCH (d)<-[:WATCHED_WITH]-(t:Title) RETURN d.name AS DeviceType, COUNT(t) AS TitleCount ORDER BY TitleCount DESC LIMIT 4 ')
    const henri = henriQuery.records.map(record => record.get('DeviceType').toString());
    const okona = okonaQuery.records.map(record => record.get('DeviceType').toString());
    const papa = papaQuery.records.map(record => record.get('DeviceType').toString());
    const ensemble = ensembleQuery.records.map(record => record.get('DeviceType').toString());
    console.log("Henri",henri, "Okona", okona, "Papa", papa, "Ensemble", ensemble);

    // 5. Donnez la date et heure de début et de fin de visionnage de l’épisode 7 de la saison 3 des nouvelles aventures de Sabrina.
    console.log("5. Donnez la date et heure de début et de fin de visionnage de l’épisode 7 de la saison 3 des nouvelles aventures de Sabrina.".black.bgGreen);

    const result5 = await session.run('')
    const nodes5 = result5.records.map(record => record.get('',).toString());
    console.log(nodes5);
    

    // 6. Quelle est la dernière série regardée par Okona ?
    console.log("6. Quelle est la dernière série regardée par Okona ?".black.bgGreen);

    const result6 = await session.run('MATCH (p:ProfileName{name:"Okona"})-[:WATCHED]->(t:Title) WHERE t.Episode <> "Unkown Episode" AND t.Season <> "Unkown Season" RETURN t.name, t.StartTime ORDER BY t.StartTime DESC LIMIT 5')
    const nodes6 = result6.records.map(record => record.get('t.name',).toString());
    console.log(nodes6);

    // 7. Quel est le film le plus long regardé sur netflix ?
    console.log("7. Quel est le film le plus long regardé sur netflix ?".black.bgGreen);

    const result7 = await session.run('MATCH (t:Title) WHERE t.Season = "Unknown Season"AND  t.Episode = "Unknown Episode"RETURN t.name, t.Duration ORDER BY t.Duration DESC LIMIT 5')
    const nodes7 = result7.records.map(record => {
        return {
            Name: record.get('t.name').toString(),
            Duration: record.get('t.Duration').toString()
        }
    ;});
    console.log(nodes7);

    // 8. Lister toutes les séries regardées par le profil Henri ?
    console.log("8. Lister toutes les séries regardées par le profil Henri ?".black.bgGreen);

    const result8 = await session.run('MATCH (t:Title) MATCH (p:ProfileName{name : "Henri"}) WHERE t.Season <> "Unknown Episode" AND t.Episode <> "Unknown Episode" RETURN DISTINCT t.name, p.name')
    const nodes8 = result8.records.map(record => record.get('t.name',).toString());
    console.log(nodes8);

    // 9. Combien de séries et films différents ont étés regardés en 2020 (#COVID) ?
    console.log("9. Combien de séries et films différents ont étés regardés en 2020 (#COVID) ?".black.bgRed);

    const result9 = await session.run('')
    const nodes9 = result9.records.map(record => record.get('',).toString());
    console.log(nodes9);
    
    // 10. Combien de saisons compte la série Friends ? 
    console.log("10. Combien de saisons compte la série Friends ? ".black.bgGreen);

    const result10 = await session.run('MATCH (t:Title{name:"Friends"}) RETURN DISTINCT t.Season')
    const nodes10 = result10.records.map(record => record.get('t.Season',).toString());
    console.log(nodes10);

    // 11. Quelle est la série avec le plus d’épisodes ? 
    console.log("11. Quelle est la série avec le plus d’épisodes ? ".black.bgGreen);

    const result11 = await session.run('MATCH (t:Title) WHERE t.Season <> "Unkwown Season" AND t.Episode <> "Unkwown Episode" RETURN COUNT(DISTINCT t.Episode) AS CountOfEpisode, t.name ORDER BY CountOfEpisode DESC LIMIT 5')
    const nodes11 = result11.records.map(record => {
        return {
            CountOfEpisode: record.get('CountOfEpisode').toString(),
            name: record.get('t.name').toString()
        };
    });
    console.log(nodes11);

    // 12. Quelle vidéo a été vue par tous les profils ? 
    console.log("12. Quelle vidéo a été vue par tous les profils ? ".black.bgGreen);

    const result12 = await session.run("MATCH (t:Title)WHERE (:ProfileName {name: 'Henri'})-[:WATCHED]->(t)AND (:ProfileName {name: 'Okona'})-[:WATCHED]->(t)AND (:ProfileName {name: 'Papa'})-[:WATCHED]->(t)RETURN t LIMIT 5")
    const nodes12 = result12.records.map(record => record.get('t').toString());
    console.log(nodes12);


    // 13. Combien de fois la série Community a été vue en entier, en prenant en compte qu’un episode est considéré comme vu entièrement si son visionnage dure plus de 20 minutes.
    console.log("13. Combien de fois la série Community a été vue en entier, en prenant en compte qu’un episode est considéré comme vu entièrement si son visionnage dure plus de 20 minutes.".black.bgRed);

    const result13 = await session.run('')
    const nodes13 = result13.records.map(record => record.get('',).toString());
    console.log(nodes13);
}
