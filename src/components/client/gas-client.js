// GAS のclient side APIが文法エラーと判定されてしまうため、jsで外部ファイル化
const GasClient = {
    
    getDelayList(success, error) {
        // server側コードでhtml返却時、evaluate()が必要
        google.script.run
            .withSuccessHandler(success)
            .withFailureHandler(error)
            .getDelayList();
    }
}

export default GasClient;