import * as path from 'path'

export default class LoadConfig {
    // 根目录
    private rootPath: string;

    constructor(rootPath) {
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
    private readStepByStep(obj: Object, steps: string[]): any {
        let step = steps.shift();
        if (!step) {
            return obj;
        }
        if (step in obj) {
            return this.readStepByStep(obj[step], steps);
        } else {
            throw new Error(`${step} is invalid key`);
        }
    }

    /**
     * 获取某个config的值
     * 
     * @static
     * @param {string} key
     * @returns {*}
     * 
     * @memberOf LoadConfig
     */
    public config(key: string): any {
        let words = key.split('.');
        let fileName = words.shift();
        if (!fileName) {
            throw new Error('config not exist');
        }
        let configPath = path.resolve(this.rootPath, fileName);
        let config = require(configPath);
        try {
            return this.readStepByStep(config, words);
        } catch (error) {
            throw new Error(`key is unexpected: ${key}`)
        }
    }
}
