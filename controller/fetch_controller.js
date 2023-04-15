require('../models/fetch_model');

module.export = {
    fetchData: (req, res) => {
        fetch_model.fetchData((data) => {
            res.render('index', {questData: data});
            console.log(questData);
        })
    }
}