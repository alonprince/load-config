"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var LoadConfig = (function () {
    function LoadConfig(rootPath) {
        this.rootPath = rootPath;
    }
    /**
     * 按照层级读obj数据
     *
     * @private
     * @param {Object} obj
     * @param {string[]} steps
     * @returns {*}
     *
     * @memberOf LoadConfig
     */
    LoadConfig.prototype.readStepByStep = function (obj, steps) {
        var step = steps.shift();
        if (!step) {
            return obj;
        }
        if (step in obj) {
            return this.readStepByStep(obj[step], steps);
        }
        else {
            throw new Error(step + " is invalid key");
        }
    };
    /**
     * 获取某个config的值
     *
     * @static
     * @param {string} key
     * @returns {*}
     *
     * @memberOf LoadConfig
     */
    LoadConfig.prototype.config = function (key) {
        var words = key.split('.');
        var fileName = words.shift();
        if (!fileName) {
            throw new Error('config not exist');
        }
        var configPath = path.resolve(this.rootPath, fileName);
        var config = require(configPath);
        try {
            return this.readStepByStep(config, words);
        }
        catch (error) {
            throw new Error("key is unexpected: " + key);
        }
    };
    return LoadConfig;
}());
exports.default = LoadConfig;
//# sourceMappingURL=loadConfig.js.map