module.exports = async function (session) {

    // Ceci est la première requete que j'ai faite pour charger mes données. 

    const result = await session.run("LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/leanerdz/Netflix-TP-Neo4J/refs/heads/master/cleanNetflixData.csv' AS row  MERGE (p:ProfileName {name: toString(row.ProfileName)})  MERGE (d:DeviceType {name: row.DeviceType}) MERGE (c:Country {name: row.Country}) MERGE (t:Title {name: row.Title, StartTime: datetime(row.StartTime), Duration: time(row.Duration), Attributes: COALESCE(row.Attributes,''), SupplementalVideoType: COALESCE(row.SupplementalVideoType,''), Episode: COALESCE(row.Episode, 'Unknown Episode'), Season: COALESCE(row.Season, 'Unknown Season')})   MERGE (p)-[:WATCHED ]->(t)  MERGE (p)-[:USED]->(d)  MERGE (p)-[:LOCATED_IN]->(c)  MERGE (t)-[:WATCHED_WITH]->(d)")
    console.log("Loaded succesfully");

}

// Ceci est la deuxièeme que j'ai faite pour charger les données. 

// LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/leanerdz/Netflix-TP-Neo4J/refs/heads/master/cleanNetflixData.csv' AS row  
// MERGE (p:ProfileName {name: toString(row.ProfileName)})
// MERGE (d:DeviceType {name: row.DeviceType})
// MERGE (c:Country {name: row.Country})
// MERGE (t:Title {name: row.Title})

// MERGE (p)-[:WATCHED ]->(p)
// MERGE (p)-[:USED]->(d)
// MERGE (p)-[:LOCATED_IN]->(c)
// MERGE (t)-[:WATCHED_WITH]->(d)

// WITH row, t
// WHERE row.Episode IS NOT NULL AND row.Season IS NOT NULL
// CREATE (s:Season {name: COALESCE(row.Season, 'Unknown')})
// CREATE (s)-[:SEASON_OF]->(t)

// WITH row, s
// WHERE row.Episode IS NOT NULL AND row.Season IS NOT NULL
// MERGE (e:Episode {name: COALESCE(row.Episode, 'Unknown'),StartTime: datetime(row.StartTime), Duration: time(row.Duration), Attributes: COALESCE(row.Attributes,''), SupplementalVideoType: COALESCE(row.SupplementalVideoType,'')})
// MERGE (e)-[:EPISODE_OF]->(s)
