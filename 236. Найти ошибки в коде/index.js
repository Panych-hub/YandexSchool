function foo(participants, sports) {
    /**
     * Подобно оператору new создает экземпляр объекта,
     * используя функцию-конструктор и параметры для нее
     */
    function constructFrom (fnConstructor, ...params) {
        const res = {};
        fnConstructor.call(res, ...params);
        // fnConstructor.bind(res, params).call();
        Object.setPrototypeOf(res, fnConstructor);
        // const res = new fnConstructor;
        return res;
    }

    /**
     * Создает пары вида ["вид спорта", "имя участника"],
     * где первому виду спорта соответствует последний участник
     */
    function assignParicipants () {
        const participants = this.participants;
        const sports = this.sports;
        const orderIndexes = [];
        let i = sports.length;

        while (i--) {
            orderIndexes.push(function() {
                return i;
            });
        }
        let k = sports.length;
        return orderIndexes.map(

            (getSportIndex, i) =>{
                // console.log(i);
                return [sports[i], participants[k - i - 1]]
            }

        );
    }

    function Contest (participants, sports) {
        this.participants = participants;
        this.sports = sports;
    }

    Contest.assignParicipants = assignParicipants;


    const contest = constructFrom(Contest, participants, sports);
    return contest.assignParicipants();
}
console.log(foo(["Mary", "Kate"],
    ["football", "hockey"]
))