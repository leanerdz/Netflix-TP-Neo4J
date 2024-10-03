module.exports = async function (session) {
    let fs = require('fs');
    const csv = require('csv-parser');
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const processedData = [];
    console.debug("Starting");

    reader = fs.createReadStream('viewingActivity.csv');
    reader
    .pipe(csv())
    .on('data', function (chunk) {
        const titleParts = chunk.Title.split(':');
        const newRow = {
            ProfileName: chunk.ProfileName,
            StartTime: chunk.StartTime,
            Duration: chunk.Duration,
            Attributes: chunk.Attributes,
            SupplementalVideoType: chunk.SupplementalVideoType,
            DeviceType: chunk.DeviceType,
            Bookmark: chunk.Bookmark,
            LatestBookmark: chunk.LatestBookmark,
            Country: chunk.Country,
            Title: titleParts[0].trim(),
        };
        if (titleParts.length > 1) {
            newRow.Season = titleParts[1].trim();
        }

        if (titleParts.length > 2) {
            newRow.Episode = titleParts[2].trim();
        }

        processedData.push(newRow);
    });
    reader.on('end', function () {
        console.debug("File Read successfully");
        console.debug("Writing new file...");
        const csvWriter = createCsvWriter({
            path: 'cleanNetflixData.csv',
            header: Object.keys(processedData[0]).map((key) => ({ id: key, title: key })),
        });
        csvWriter
            .writeRecords(processedData)
            .then(() => console.log('Le fichier CSV a été écrit avec succès'));
    });
    

}
