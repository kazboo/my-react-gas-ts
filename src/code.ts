function doGet() {
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('React, TypeScript on GAS Sample')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
};

function getAccount() {
    return {
        email: Session.getActiveUser().getEmail(),
    }
}

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

const dummyResponse =  [
    {
        date: "19/03/01(金)",
        workingHour: "8:00",
    },
    {
        date: "19/03/02(土)",
        workingHour: "3:00"
    },
    {
        date: "19/03/03(日)",
        workingHour: " "
    },
    {
        date: "19/03/04(月)",
        workingHour: "9:30"
    },
    {
        date: "19/03/05(火)",
        workingHour: "11:00"
    },
    {
        date: "19/03/06(水)",
        workingHour: "10:30"
    },
    {
        date: "19/03/07(木)",
        workingHour: "9:00"
    },
    {
        date: "19/03/08(金)",
        workingHour: "10:45"
    },
    {
        date: "19/03/09(土)",
        workingHour: " "
    },
    {
        date: "19/03/10(日)",
        workingHour: "5:00"
    },
    {
        date: "19/03/11(月)",
        workingHour: "10:30"
    },
    {
        date: "19/03/12(火)",
        workingHour: "7:30"
    },
];

function getWorkingHours(username: string, password: string, startOfWeek: string) {
    const startDate = new Date(startOfWeek);
    const month = startDate.getMonth() + 1;
    const year = startDate.getFullYear();

    sleep(5000);
    // for Error Debug
    // throw new Error("error occurred.");
    
    return dummyResponse.map(w => {
        return {
            date: `${username}/${password}: ${w.date}, ${year}年${month}月`,
            actualWorkingHour: toHour(w.workingHour)
        }
    });
}

function sleep(msec: number){
    const dt1 = new Date().getTime();
    while (true){
        const dt2 = new Date().getTime();
        if (dt2 - dt1 > msec) {
            return;
        }
    }
}

function toHour(value: string) {
    if (!value) {
        return 0;
    }
    const split = value.split(":");
    if (split.length < 2) {
        return 0;
    }

    const [hour, min] = split;
    return parseInt(hour) + parseInt(min) / 60;
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