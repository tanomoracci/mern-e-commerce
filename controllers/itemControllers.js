const Item = require('../models/Items');

module.exports.get_items = (req, res) => {
    Item.find().sort({date: -1}).then(items => res.json(items));

};

module.exports.post_item = (req, res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
};

module.exports.update_item = (req, res) => {
    Item.findByIdAndUpdate({id: req.params.id}, req.body).then(function(item) {
        Item.findOne({id: req.params.id}).then(function(item){
            res.json(item);
        })
    })
};

module.exports.delete_item = (req, res) => {
    Item.findByIdAndDelete({id: req.params.id}).then(function(item){
        res.json({success: true});
    })
}



