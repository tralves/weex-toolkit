"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vueInstance = undefined;
exports.initVue = initVue;

var _debugger = require("./libs/debugger");

var _ = require("underscore");

var LOG_LEVEL_LIST = ["all", "verbose", "debug", "info", "warn", "error"];

var vueInstance = exports.vueInstance = undefined;
function initVue() {
    window._vueInstance = exports.vueInstance = vueInstance = new Vue({
        el: '#logs',
        data: {
            logs: [
                // {content:'log content',flag: 'log flag'} //
            ],
            feLogLevel: "info",
            feLogLevelForClass: [],
            feLogLevelClassObj: { error: false, warn: false, info: false, debug: false, verbose: false, all: false },
            deviceLevel: "",
            deviceLevelClassObj: { error: false, warn: false, info: false, debug: false, verbose: false, all: false }
        },
        methods: {
            clearLog: function clearLog() {
                this.logs = [];
            },
            changeDisplayLevel: function changeDisplayLevel(e) {
                var displayLevel = $(e.target).data("level");
                if (!displayLevel) {
                    return;
                }
                this.feLogLevel = displayLevel;
                this.updateFeLogLevel();
            },
            updateFeLogLevel: function updateFeLogLevel() {
                var currentLevel = this.feLogLevel;
                var i = LOG_LEVEL_LIST.indexOf(currentLevel);
                var targetLevels = LOG_LEVEL_LIST.slice(i);
                targetLevels = _.map(targetLevels, function (l) {
                    return "level-" + l;
                });
                this.feLogLevelForClass = targetLevels;
                for (var l in this.feLogLevelClassObj) {
                    this.feLogLevelClassObj["" + l] = false;
                }
                this.feLogLevelClassObj["" + currentLevel] = true;
            },
            changeDeviceLevel: function changeDeviceLevel(e) {
                var level = $(e.target).data("level");
                if (!level) {
                    return;
                }
                this.deviceLevel = level;
                this.updateDeviceLevel();
                (0, _debugger.setLogLevel)(level);
            },
            updateDeviceLevel: function updateDeviceLevel() {
                if (!this.deviceLevel || this.deviceLevel.length < 1) {
                    return;
                }
                for (var l in this.deviceLevelClassObj) {
                    this.deviceLevelClassObj["" + l] = false;
                }
                this.deviceLevelClassObj["" + this.deviceLevel] = true;
            }
        }
    });
    vueInstance.updateFeLogLevel();
}