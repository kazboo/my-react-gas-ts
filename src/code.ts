function doGet() {
    return HtmlService.createTemplateFromFile('index').evaluate();
};

function doPost() {
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