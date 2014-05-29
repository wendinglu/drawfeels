var models = ['./family.js', './member.js', './request.js', './drawing.js'];
exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};
