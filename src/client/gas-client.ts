/**
 * GAS のclient side APIが文法エラーと判定されてしまうため、jsで外部ファイル化
 * "google.script.run"はserver側コードでhtml返却時、evaluate()が必要
 */ 
const GasClient = {
    
    getDelayList(success: any, error: any) {
        google.script.run
            .withSuccessHandler(success)
            .withFailureHandler(error)
            .getDelayList();
    },

    getBookList(success: any, error: any) {
        google.script.run
            .withSuccessHandler(success)
            .withFailureHandler(error)
            .getBookList();
    },

    getBookJoinList(success: any, error: any) {
        google.script.run
            .withSuccessHandler(success)
            .withFailureHandler(error)
            .getBookJoinList();
    },

    getAccount(success: any, error: any) {
        google.script.run
            .withSuccessHandler(success)
            .withFailureHandler(error)
            .getAccount();
    },

    getWorkingHours(
        username: string,
        password: string,
        startOfWeek: string,
        success: any,
        error: any) {
        google.script.run
            .withSuccessHandler(success)
            .withFailureHandler(error)
            .getWorkingHours(username, password, startOfWeek);
    }
}

export default GasClient;