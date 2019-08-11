function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('React, TypeScript on GAS Sample')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
};

function getDelayList() {
    return {
            message: `success!`,
            delayList: [
                {
                    name: "真岡線",
                    company: "真岡鐵道"
                },
                {
                    name: "東海道線（静岡地区）",
                    company: "JR東海"
                },
                {
                    name: "芸備線",
                    company: "JR西日本"
                }
            ]
        };
}

function getBookList() {

    const response = UrlFetchApp.fetch(
        'https://www.googleapis.com/books/v1/volumes?q=GoogleAppsScript',
        {
            method: 'get'
        });
    
    if (response.getResponseCode() === 200) {
        const content: string = response.getContentText();
        return JSON.parse(content);
    }
    throw new Error('failed to get book information.');
}

function getBookJoinList() {

    const responses = UrlFetchApp.fetchAll(
        [
            {
                url: 'https://www.googleapis.com/books/v1/volumes?q=GoogleAppsScript',
                method: 'get'
            },
            {
                url: 'https://www.googleapis.com/books/v1/volumes?q=GoogleCloudPlatform',
                method: 'get'
            }
        ]
    );

    const jsons = responses
        .filter(
            res => res.getResponseCode() === 200)
        .map(
            res => JSON.parse(res.getContentText()));

    jsons[0].items = jsons[0].items.concat(jsons[1].items);
    
    return jsons[0];
}