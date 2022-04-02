/**
 * Gestalt Input Plugin for Pixel Game Maker MV.
 * Copyright 2022 AgogPixel - All Rights Reserved.
 * Implemented by kidthales <kidthales@agogpixel.com>
 * This file is released under CC BY-ND 4.0 license: https://creativecommons.org/licenses/by-nd/4.0/
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@agogpixel/pgmmv-link-condition-support/src/json-logic/connective.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-link-condition-support/src/json-logic/connective.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonLogicConnective = void 0;
var JsonLogicConnective;
(function (JsonLogicConnective) {
    JsonLogicConnective["Not"] = "NOT";
    JsonLogicConnective["And"] = "AND";
    JsonLogicConnective["Or"] = "OR";
    JsonLogicConnective["Nand"] = "NAND";
    JsonLogicConnective["Nor"] = "NOR";
    JsonLogicConnective["Xor"] = "XOR";
    JsonLogicConnective["Xnor"] = "XNOR";
})(JsonLogicConnective = exports.JsonLogicConnective || (exports.JsonLogicConnective = {}));
//# sourceMappingURL=connective.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-link-condition-support/src/json-logic/create-clause-transform.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-link-condition-support/src/json-logic/create-clause-transform.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createJsonLogicClauseTransform = void 0;
var connective_1 = __webpack_require__(/*! ./connective */ "./node_modules/@agogpixel/pgmmv-link-condition-support/src/json-logic/connective.js");
function createJsonLogicClauseTransform(constraintFactory) {
    return function transformJsonLogicClause(clause) {
        var errors = [];
        function errorResult() {
            return false;
        }
        function parseJsonLogicClause(clause, path) {
            if (Array.isArray(clause)) {
                var result_1 = constraintFactory(clause);
                if (typeof result_1 === 'string') {
                    errors.push("".concat(path, ": ").concat(result_1));
                    return errorResult;
                }
                return result_1;
            }
            if (typeof clause !== 'object' || clause === null) {
                errors.push("".concat(path, ": Invalid JSON logic clause type; expected object"));
                return errorResult;
            }
            var connectives = Object.keys(clause);
            if (connectives.length !== 1) {
                errors.push("".concat(path, ": Invalid JSON logic connective object; expected only one connective (object key), found ").concat(connectives.length));
                return errorResult;
            }
            var connective = connectives[0];
            var subClauses = clause[connective];
            var currentPath = "".concat(path, ".").concat(connective);
            if (!Array.isArray(subClauses) || subClauses.length < 1) {
                errors.push("".concat(currentPath, ": Invalid JSON logic sub-clauses; expected array of length 1 or greater"));
                return errorResult;
            }
            if (connective === connective_1.JsonLogicConnective.Not) {
                if (subClauses.length > 1) {
                    errors.push("".concat(currentPath, ": Invalid JSON logic sub-clause for ").concat(connective_1.JsonLogicConnective.Not, " connective; array of length 1 required"));
                    return errorResult;
                }
                var innerConstraint_1 = parseJsonLogicClause(subClauses[0], "".concat(currentPath, "[0]"));
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return !innerConstraint_1.apply(void 0, args);
                };
            }
            if (subClauses.length < 2) {
                errors.push("".concat(currentPath, ": Invalid JSON logic sub-clause for connective; expected array of length 2 or greater"));
                return errorResult;
            }
            var subConstraints = [];
            switch (connective) {
                case connective_1.JsonLogicConnective.And:
                case connective_1.JsonLogicConnective.Or:
                case connective_1.JsonLogicConnective.Nand:
                case connective_1.JsonLogicConnective.Nor:
                case connective_1.JsonLogicConnective.Xor:
                case connective_1.JsonLogicConnective.Xnor:
                    for (var i = 0; i < subClauses.length; ++i) {
                        subConstraints.push(parseJsonLogicClause(subClauses[i], "".concat(currentPath, "[").concat(i, "]")));
                    }
                    break;
                default:
                    errors.push("".concat(currentPath, ": Unknown connective: ").concat(connective));
                    return errorResult;
            }
            switch (connective) {
                case connective_1.JsonLogicConnective.And:
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        for (var i = 0; i < subConstraints.length; ++i) {
                            if (!subConstraints[i].apply(subConstraints, args)) {
                                return false;
                            }
                        }
                        return true;
                    };
                case connective_1.JsonLogicConnective.Or:
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        for (var i = 0; i < subConstraints.length; ++i) {
                            if (subConstraints[i].apply(subConstraints, args)) {
                                return true;
                            }
                        }
                        return false;
                    };
                case connective_1.JsonLogicConnective.Nand:
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        for (var i = 0; i < subConstraints.length; ++i) {
                            if (!subConstraints[i].apply(subConstraints, args)) {
                                return true;
                            }
                        }
                        return false;
                    };
                case connective_1.JsonLogicConnective.Nor:
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        for (var i = 0; i < subConstraints.length; ++i) {
                            if (subConstraints[i].apply(subConstraints, args)) {
                                return false;
                            }
                        }
                        return true;
                    };
                case connective_1.JsonLogicConnective.Xor:
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var trueCount = 0;
                        for (var i = 0; i < subConstraints.length; ++i) {
                            if (subConstraints[i].apply(subConstraints, args)) {
                                ++trueCount;
                            }
                        }
                        return trueCount % 2 === 1;
                    };
                case connective_1.JsonLogicConnective.Xnor:
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var trueCount = 0;
                        for (var i = 0; i < subConstraints.length; ++i) {
                            if (subConstraints[i].apply(subConstraints, args)) {
                                ++trueCount;
                            }
                        }
                        return trueCount % 2 === 0;
                    };
            }
        }
        var result = parseJsonLogicClause(clause, 'ROOT');
        return !errors.length ? result : errors;
    };
}
exports.createJsonLogicClauseTransform = createJsonLogicClauseTransform;
//# sourceMappingURL=create-clause-transform.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-logging-support/src/create-logger.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-logging-support/src/create-logger.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLogger = void 0;
var get_unix_timestamp_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp */ "./node_modules/@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.js");
var to_json_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/json/to-json */ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/to-json.js");
var log_level_1 = __webpack_require__(/*! ./log-level */ "./node_modules/@agogpixel/pgmmv-logging-support/src/log-level.js");
/**
 *
 */
var defaultJsonIndentSize = 2;
/**
 *
 */
var defaultJsonStringifyFunctions = false;
/**
 *
 */
var jsonIndentSizeMin = 0;
/**
 *
 */
var jsonIndentSizeMax = 8;
/**
 *
 * @param config
 * @param internal
 * @returns
 */
function createLogger(config, internal) {
    var _a;
    /**
     *
     */
    var self = {};
    /**
     *
     */
    var internalApi = internal || {};
    /**
     *
     * @param value
     * @param min
     * @param max
     * @returns
     */
    function clamp(value, min, max) {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }
    /**
     *
     */
    internalApi.logLevel = config.logLevel || log_level_1.LogLevel.Info;
    /**
     *
     */
    internalApi.runtimeLog = config.runtimeLog || Agtk.log;
    /**
     *
     */
    internalApi.jsonIndentSize =
        typeof config.jsonIndentSize !== 'number'
            ? defaultJsonIndentSize
            : clamp(config.jsonIndentSize, jsonIndentSizeMin, jsonIndentSizeMax);
    /**
     *
     */
    internalApi.jsonStringifyFunctions = !!config.jsonStringifyFunctions || defaultJsonStringifyFunctions;
    /**
     *
     */
    internalApi.logLevelMap = config.logLevelMap || (_a = {},
        _a[log_level_1.LogLevel.Debug] = log_level_1.LogLevel[log_level_1.LogLevel.Debug],
        _a[log_level_1.LogLevel.Info] = log_level_1.LogLevel[log_level_1.LogLevel.Info],
        _a[log_level_1.LogLevel.Warn] = log_level_1.LogLevel[log_level_1.LogLevel.Warn],
        _a[log_level_1.LogLevel.Error] = log_level_1.LogLevel[log_level_1.LogLevel.Error],
        _a[log_level_1.LogLevel.Fatal] = log_level_1.LogLevel[log_level_1.LogLevel.Fatal],
        _a);
    /**
     *
     * @param data
     * @param level
     */
    self.log = function log(data, level) {
        if (typeof level !== 'string' && typeof level !== 'number') {
            internalApi.runtimeLog(typeof data === 'string'
                ? data
                : (0, to_json_1.toJson)(data, internalApi.jsonIndentSize, internalApi.jsonStringifyFunctions));
            return;
        }
        var logLevel = typeof level === 'string' ? log_level_1.LogLevel[level] : level;
        if (logLevel < internalApi.logLevel) {
            return;
        }
        var message = typeof data === 'string' ? data : (0, to_json_1.toJson)(data, internalApi.jsonIndentSize, internalApi.jsonStringifyFunctions);
        var messageLog = "[".concat((0, get_unix_timestamp_1.getUnixTimestamp)(), "] ").concat(internalApi.logLevelMap[logLevel], ": ").concat(message);
        internalApi.runtimeLog(messageLog);
    };
    /**
     *
     * @param data
     */
    self.debug = function debug(data) {
        self.log(data, log_level_1.LogLevel.Debug);
    };
    /**
     *
     * @param data
     */
    self.info = function info(data) {
        self.log(data, log_level_1.LogLevel.Info);
    };
    /**
     *
     * @param data
     */
    self.warn = function warn(data) {
        self.log(data, log_level_1.LogLevel.Warn);
    };
    /**
     *
     * @param data
     */
    self.error = function error(data) {
        self.log(data, log_level_1.LogLevel.Error);
    };
    /**
     *
     * @param data
     */
    self.fatal = function fatal(data) {
        self.log(data, log_level_1.LogLevel.Fatal);
    };
    /**
     *
     */
    self.getLogLevel = function getLogLevel() {
        return internalApi.logLevel;
    };
    /**
     *
     * @param level
     */
    self.setLogLevel = function setLogLevel(level) {
        internalApi.logLevel = level;
        return self;
    };
    /**
     *
     */
    self.getRuntimeLog = function getRuntimeLog() {
        return internalApi.runtimeLog;
    };
    /**
     *
     * @param log
     */
    self.setRuntimeLog = function setRuntimeLog(log) {
        internalApi.runtimeLog = log;
        return self;
    };
    /**
     *
     */
    self.getJsonIndentSize = function getJsonIndentSize() {
        return internalApi.jsonIndentSize;
    };
    /**
     *
     * @param size
     */
    self.setJsonIndentSize = function setJsonIndentSize(size) {
        internalApi.jsonIndentSize = clamp(size, jsonIndentSizeMin, jsonIndentSizeMax);
        return self;
    };
    /**
     *
     */
    self.getJsonStringifyFunctions = function getJsonStringifyFunctions() {
        return internalApi.jsonStringifyFunctions;
    };
    /**
     *
     * @param stringify
     */
    self.setJsonStringifyFunctions = function setJsonStringifyFunctions(stringify) {
        internalApi.jsonStringifyFunctions = stringify;
        return self;
    };
    /**
     *
     */
    self.getLogLevelMap = function getLogLevelMap() {
        return internalApi.logLevelMap;
    };
    /**
     *
     * @param map
     */
    self.setLogLevelMap = function setLogLevelMap(map) {
        internalApi.logLevelMap = map;
        return self;
    };
    return self;
}
exports.createLogger = createLogger;
//# sourceMappingURL=create-logger.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-logging-support/src/log-level.js":
/*!************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-logging-support/src/log-level.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
/**
 *
 */
var LogLevel;
(function (LogLevel) {
    /**
     *
     */
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    /**
     *
     */
    LogLevel[LogLevel["Info"] = 1] = "Info";
    /**
     *
     */
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    /**
     *
     */
    LogLevel[LogLevel["Error"] = 3] = "Error";
    /**
     *
     */
    LogLevel[LogLevel["Fatal"] = 4] = "Fatal";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=log-level.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-controller-id.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-controller-id.js ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getControllerId = void 0;
var get_variable_value_1 = __webpack_require__(/*! ./get-variable-value */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-variable-value.js");
function getControllerId(objectInstance) {
    // Controller ID values must be parsed for some reason - baz
    return parseInt((0, get_variable_value_1.getVariableValue)(objectInstance, Agtk.constants.objects.variables.ControllerIDId));
}
exports.getControllerId = getControllerId;
//# sourceMappingURL=get-controller-id.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getObjectInstance = void 0;
function getObjectInstance(instanceId) {
    return Agtk.objectInstances.get(instanceId);
}
exports.getObjectInstance = getObjectInstance;
//# sourceMappingURL=get-object-instance.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance-id.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance-id.js ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParentObjectInstanceId = void 0;
var get_variable_value_1 = __webpack_require__(/*! ./get-variable-value */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-variable-value.js");
function getParentObjectInstanceId(objectInstance) {
    return (0, get_variable_value_1.getVariableValue)(objectInstance, Agtk.constants.objects.variables.ParentObjectInstanceIDId);
}
exports.getParentObjectInstanceId = getParentObjectInstanceId;
//# sourceMappingURL=get-parent-object-instance-id.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParentObjectInstance = void 0;
var get_object_instance_1 = __webpack_require__(/*! ./get-object-instance */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.js");
var get_parent_object_instance_id_1 = __webpack_require__(/*! ./get-parent-object-instance-id */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance-id.js");
function getParentObjectInstance(childInstanceOrId) {
    var childInstance;
    if (typeof childInstanceOrId === 'number') {
        childInstance = (0, get_object_instance_1.getObjectInstance)(childInstanceOrId);
    }
    else {
        childInstance = childInstanceOrId;
    }
    var parentInstanceId = (0, get_parent_object_instance_id_1.getParentObjectInstanceId)(childInstance);
    if (parentInstanceId !== -1) {
        return (0, get_object_instance_1.getObjectInstance)(parentInstanceId);
    }
}
exports.getParentObjectInstance = getParentObjectInstance;
//# sourceMappingURL=get-parent-object-instance.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-variable-value.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-variable-value.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVariableValue = void 0;
var resolve_id_1 = __webpack_require__(/*! ./resolve-id */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/resolve-id.js");
function getVariableValue(objectInstance, key) {
    return objectInstance.variables.get((0, resolve_id_1.resolveId)(objectInstance, 'variables', key)).getValue();
}
exports.getVariableValue = getVariableValue;
//# sourceMappingURL=get-variable-value.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/resolve-id.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/resolve-id.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveId = void 0;
function resolveId(objectInstance, type, idOrName) {
    if (typeof idOrName === 'string') {
        return objectInstance[type].getIdByName(idOrName);
    }
    return idOrName;
}
exports.resolveId = resolveId;
//# sourceMappingURL=resolve-id.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/create-plugin.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/create-plugin.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPlugin = void 0;
var plugin_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/index.js");
var localization_1 = __webpack_require__(/*! ./localization */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/index.js");
/**
 *
 * @param config
 * @param internal
 * @returns
 */
function createPlugin(config, internal) {
    /**
     *
     */
    var self = {};
    /**
     *
     */
    var internalApi = internal || {};
    /**
     *
     */
    var parametersConfig = config.parameters || [];
    /**
     *
     */
    var actionCommandsConfig = config.actionCommands || [];
    /**
     *
     */
    var autoTilesConfig = config.autoTiles || undefined;
    /**
     *
     */
    var linkConditionsConfig = config.linkConditions || [];
    /**
     *
     */
    var localizedParameters;
    /**
     *
     */
    var localizedActionCommands;
    /**
     *
     */
    var localizedLinkConditions;
    /**
     *
     */
    internalApi.internalData = {};
    /**
     *
     */
    internalApi.localization = (0, localization_1.createPluginLocalizationManager)({ localizations: config.localizations });
    /**
     *
     * @returns
     */
    internalApi.getInfoParameter = function getInfoParameter() {
        if (!localizedParameters) {
            localizedParameters = internalApi.localization.processParameterLocale(parametersConfig);
        }
        return localizedParameters;
    };
    /**
     *
     * @returns
     */
    internalApi.getInfoInternal = function getInfoInternal() {
        return JSON.parse(JSON.stringify(internalApi.internalData));
    };
    /**
     *
     * @returns
     */
    internalApi.getInfoActionCommand = function getInfoActionCommand() {
        if (!localizedActionCommands) {
            localizedActionCommands = internalApi.localization.processExecuteCommandLocale(actionCommandsConfig);
        }
        return localizedActionCommands;
    };
    /**
     *
     * @returns
     */
    internalApi.getInfoLinkCondition = function getInfoLinkCondition() {
        if (!localizedLinkConditions) {
            localizedLinkConditions = internalApi.localization.processLinkConditionLocale(linkConditionsConfig);
        }
        return localizedLinkConditions;
    };
    /**
     *
     * @returns
     */
    internalApi.getInfoAutoTile = function getInfoAutoTile() {
        return autoTilesConfig;
    };
    /**
     *
     * @returns
     */
    internalApi.inEditor = function inEditor() {
        return !Agtk || typeof Agtk.log !== 'function';
    };
    /**
     *
     * @returns
     */
    internalApi.inPlayer = function inPlayer() {
        return !!Agtk && typeof Agtk.version === 'string' && /^player .+$/.test(Agtk.version);
    };
    /**
     *
     * @param arg1
     */
    self.setLocale = function setLocale(arg1) {
        internalApi.localization.setLocale(arg1);
    };
    /**
     *
     * @param category
     * @returns
     */
    self.getInfo = function getInfo(category) {
        var info;
        switch (category) {
            case plugin_1.AgtkPluginInfoCategory.Name:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Name);
                break;
            case plugin_1.AgtkPluginInfoCategory.Description:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Description);
                break;
            case plugin_1.AgtkPluginInfoCategory.Author:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Author);
                break;
            case plugin_1.AgtkPluginInfoCategory.Help:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Help);
                break;
            case plugin_1.AgtkPluginInfoCategory.Parameter:
                info = internalApi.getInfoParameter();
                break;
            case plugin_1.AgtkPluginInfoCategory.Internal:
                info = internalApi.getInfoInternal();
                break;
            case plugin_1.AgtkPluginInfoCategory.ActionCommand:
                info = internalApi.getInfoActionCommand();
                break;
            case plugin_1.AgtkPluginInfoCategory.LinkCondition:
                info = internalApi.getInfoLinkCondition();
                break;
            case plugin_1.AgtkPluginInfoCategory.AutoTile:
                info = internalApi.getInfoAutoTile();
                break;
        }
        return info;
    };
    /**
     *
     * @param data
     */
    self.initialize = function initialize(data) {
        if (data) {
            self.setInternal(data);
        }
    };
    /**
     *
     * @returns
     */
    self.finalize = function finalize() {
        return;
    };
    /**
     *
     * @returns
     */
    self.setParamValue = function setParamValue() {
        return;
    };
    /**
     *
     * @param data
     */
    self.setInternal = function setInternal(data) {
        internalApi.internalData = JSON.parse(JSON.stringify(data)) || internalApi.internalData;
    };
    /**
     *
     * @returns
     */
    self.call = function call() {
        return;
    };
    return self;
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=create-plugin.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/create-manager.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/create-manager.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPluginLocalizationManager = void 0;
var plugin_ui_parameter_type_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js");
/**
 *
 * @param config
 * @returns
 */
function createPluginLocalizationManager(config) {
    /**
     *
     */
    var self = {};
    // Resolve configuration.
    var localizations = config.localizations && config.localizations.length > 0
        ? config.localizations
        : [{ locale: 'en', data: {} }];
    /**
     *
     */
    var fallbackData = localizations[0].data;
    /**
     *
     */
    var currentLocale = localizations[0].locale;
    /**
     *
     */
    var localeMap = {};
    // Load locale map.
    for (var i = 0; i < localizations.length; ++i) {
        localeMap[localizations[i].locale] = localizations[i].data;
    }
    /**
     *
     */
    var inlineRegex = /^loca\((.+)\)$/;
    /**
     *
     * @param key
     * @returns
     */
    self.get = function get(key) {
        if (localeMap[currentLocale] && typeof localeMap[currentLocale][key] === 'string') {
            return localeMap[currentLocale][key];
        }
        if (typeof fallbackData[key] === 'string') {
            return fallbackData[key];
        }
        return "LOCA MISSING: ".concat(key);
    };
    /**
     *
     * @returns
     */
    self.getLocale = function getLocale() {
        return currentLocale;
    };
    /**
     *
     * @param locale
     * @returns
     */
    self.setLocale = function setLocale(locale) {
        if (!!localeMap[locale]) {
            return false;
        }
        currentLocale = locale;
        return true;
    };
    /**
     *
     * @param parameters
     * @returns
     */
    self.processParameterLocale = function processParameterLocale(parameters) {
        for (var i = 0; i < parameters.length; ++i) {
            var parameter = parameters[i];
            var matches = parameter.name.match(inlineRegex);
            if (matches && matches.length > 1) {
                parameter.name = self.get(matches[1]);
            }
            switch (parameter.type) {
                case plugin_ui_parameter_type_1.AgtkPluginUiParameterType.String:
                case plugin_ui_parameter_type_1.AgtkPluginUiParameterType.MultiLineString:
                    matches = parameter.defaultValue.match(inlineRegex);
                    if (matches && matches.length > 1) {
                        parameter.defaultValue = self.get(matches[1]);
                    }
                    break;
                case plugin_ui_parameter_type_1.AgtkPluginUiParameterType.CustomId:
                    for (var j = 0; j < parameter.customParam.length; ++j) {
                        var param = parameter.customParam[j];
                        matches = param.name.match(inlineRegex);
                        if (matches && matches.length > 1) {
                            param.name = self.get(matches[1]);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return parameters;
    };
    /**
     *
     * @param executeCommands
     * @returns
     */
    self.processExecuteCommandLocale = function processExecuteCommandLocale(executeCommands) {
        for (var i = 0; i < executeCommands.length; ++i) {
            var executeCommand = executeCommands[i];
            var matches = executeCommand.name.match(inlineRegex);
            if (matches && matches.length > 1) {
                executeCommand.name = self.get(matches[1]);
            }
            matches = executeCommand.description.match(inlineRegex);
            if (matches && matches.length > 1) {
                executeCommand.description = self.get(matches[1]);
            }
            self.processParameterLocale(executeCommand.parameter);
        }
        return executeCommands;
    };
    /**
     *
     * @param linkConditions
     * @returns
     */
    self.processLinkConditionLocale = function processLinkConditionLocale(linkConditions) {
        for (var i = 0; i < linkConditions.length; ++i) {
            var linkCondition = linkConditions[i];
            var matches = linkCondition.name.match(inlineRegex);
            if (matches && matches.length > 1) {
                linkCondition.name = self.get(matches[1]);
            }
            matches = linkCondition.description.match(inlineRegex);
            if (matches && matches.length > 1) {
                linkCondition.description = self.get(matches[1]);
            }
            self.processParameterLocale(linkCondition.parameter);
        }
        return linkConditions;
    };
    return self;
}
exports.createPluginLocalizationManager = createPluginLocalizationManager;
//# sourceMappingURL=create-manager.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/data.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/data.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var required_key_1 = __webpack_require__(/*! ./required-key */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/required-key.js");
//# sourceMappingURL=data.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/index.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./create-manager */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/create-manager.js"), exports);
__exportStar(__webpack_require__(/*! ./localization */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/localization.js"), exports);
__exportStar(__webpack_require__(/*! ./data */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/data.js"), exports);
__exportStar(__webpack_require__(/*! ./manager */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/manager.js"), exports);
__exportStar(__webpack_require__(/*! ./manager-config */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/manager-config.js"), exports);
__exportStar(__webpack_require__(/*! ./required-key */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/required-key.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/localization.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/localization.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=localization.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/manager-config.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/manager-config.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=manager-config.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/manager.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/manager.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/required-key.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/required-key.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PluginLocalizationRequiredKey = void 0;
/**
 *
 */
var PluginLocalizationRequiredKey;
(function (PluginLocalizationRequiredKey) {
    /**
     *
     */
    PluginLocalizationRequiredKey["Name"] = "PLUGIN_NAME";
    /**
     *
     */
    PluginLocalizationRequiredKey["Description"] = "PLUGIN_DESCRIPTION";
    /**
     *
     */
    PluginLocalizationRequiredKey["Author"] = "PLUGIN_AUTHOR";
    /**
     *
     */
    PluginLocalizationRequiredKey["Help"] = "PLUGIN_HELP";
})(PluginLocalizationRequiredKey = exports.PluginLocalizationRequiredKey || (exports.PluginLocalizationRequiredKey = {}));
//# sourceMappingURL=required-key.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/cache/create-cache.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/cache/create-cache.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createResourceCache = void 0;
/**
 *
 * @param internal
 * @returns
 */
function createResourceCache(internal) {
    /**
     *
     */
    var self = {};
    /**
     *
     */
    var internalApi = internal || {};
    /**
     *
     */
    internalApi.cache = {};
    /**
     *
     * @returns
     */
    self.clear = function clear() {
        var keys = Object.keys(internalApi.cache);
        for (var i = 0; i < keys.length; ++i) {
            delete internalApi.cache[keys[i]];
        }
        return self;
    };
    /**
     *
     * @param key
     * @returns
     */
    self.delete = function (key) {
        delete internalApi.cache[key];
        return self;
    };
    /**
     *
     * @param key
     * @returns
     */
    self.get = function get(key) {
        return internalApi.cache[key];
    };
    /**
     *
     * @param key
     * @returns
     */
    self.has = function has(key) {
        return !!internalApi.cache[key];
    };
    /**
     *
     * @param key
     * @param value
     * @returns
     */
    self.set = function set(key, value) {
        internalApi.cache[key] = value;
        return self;
    };
    return self;
}
exports.createResourceCache = createResourceCache;
//# sourceMappingURL=create-cache.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/to-json.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/json/to-json.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toJson = void 0;
/**
 *
 * @param value
 * @returns
 */
function isArray(value) {
    return Array.isArray(value) && typeof value === 'object';
}
/**
 *
 * @param value
 * @returns
 */
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 *
 * @param value
 * @returns
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 *
 * @param value
 * @returns
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 *
 * @param value
 * @returns
 */
function isNumber(value) {
    return typeof value === 'number';
}
/**
 *
 * @param value
 * @returns
 */
function isNull(value) {
    return value === null && typeof value === 'object';
}
/**
 *
 * @param value
 * @returns
 */
function isNotNumber(value) {
    return typeof value === 'number' && isNaN(value);
}
/**
 *
 * @param value
 * @returns
 */
function isInfinity(value) {
    return typeof value === 'number' && !isFinite(value);
}
/**
 *
 * @param value
 * @returns
 */
function isDate(value) {
    return typeof value === 'object' && value !== null && typeof value.getMonth === 'function';
}
/**
 *
 * @param value
 * @returns
 */
function isUndefined(value) {
    return value === undefined && typeof value === 'undefined';
}
/**
 *
 * @param value
 * @returns
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 *
 * @param value
 * @returns
 */
function isSymbol(value) {
    return typeof value === 'symbol';
}
/**
 *
 * @param value
 * @returns
 */
function restOfDataTypes(value) {
    return isNumber(value) || isString(value) || isBoolean(value);
}
/**
 *
 * @param value
 * @returns
 */
function ignoreDataTypes(value) {
    return isUndefined(value) || isSymbol(value);
}
/**
 *
 * @param value
 * @returns
 */
function nullDataTypes(value) {
    return isNotNumber(value) || isInfinity(value) || isNull(value);
}
/**
 *
 * @param value
 * @returns
 */
function arrayValuesNullTypes(value) {
    return isNotNumber(value) || isInfinity(value) || isNull(value) || ignoreDataTypes(value);
}
/**
 *
 * @param str
 * @param newline
 * @returns
 */
function removeComma(str, newline) {
    var tempArr;
    if (!newline) {
        tempArr = str.split('');
    }
    else {
        tempArr = str.trimRight().split('');
    }
    tempArr.pop();
    return tempArr.join('') + (newline ? '\n' : '');
}
/**
 *
 * @param value
 * @param space
 * @param stringifyFunctions
 * @returns
 */
function toJson(value, space, stringifyFunctions) {
    var seen = [];
    var indentSize = typeof space === 'number' && space >= 0 ? space : 2;
    function parse(obj, indent) {
        var _a;
        if (ignoreDataTypes(obj)) {
            return undefined;
        }
        if (isDate(obj)) {
            return "\"".concat(obj.toISOString(), "\"");
        }
        if (nullDataTypes(obj)) {
            return "".concat(null);
        }
        if (isSymbol(obj)) {
            return undefined;
        }
        if (isFunction(obj)) {
            if (stringifyFunctions) {
                var fnParts = (_a = (isFunction(obj === null || obj === void 0 ? void 0 : obj.toString) ? obj === null || obj === void 0 ? void 0 : obj.toString() : 'function')) === null || _a === void 0 ? void 0 : _a.split('\n');
                return fnParts === null || fnParts === void 0 ? void 0 : fnParts.join("".concat(!indentSize ? '' : '\n' + ' '.repeat(indentSize)));
            }
            return undefined;
        }
        if (restOfDataTypes(obj)) {
            var passQuotes = isString(obj) ? "\"" : '';
            return "".concat(passQuotes).concat(obj).concat(passQuotes);
        }
        if (isArray(obj) || isObject(obj)) {
            if (seen.indexOf(obj) >= 0) {
                return "[seen ".concat(isArray(obj) ? 'array' : 'object', "]");
            }
            seen.push(obj);
        }
        if (isArray(obj)) {
            var arrStr_1 = '';
            obj.forEach(function (eachValue) {
                arrStr_1 +=
                    ' '.repeat(indent + indentSize) +
                        (arrayValuesNullTypes(eachValue) ? parse(null, indent + indentSize) : parse(eachValue, indent + indentSize));
                arrStr_1 += ',' + (!indentSize ? '' : '\n');
            });
            return "[".concat(!indentSize ? '' : '\n').concat(removeComma(arrStr_1, !!indentSize)).concat(' '.repeat(indent), "]");
        }
        if (isObject(obj)) {
            var objStr_1 = '';
            var objKeys = Object.keys(obj);
            objKeys.forEach(function (eachKey) {
                var eachValue = obj[eachKey];
                objStr_1 += !ignoreDataTypes(eachValue)
                    ? "".concat(' '.repeat(indent + indentSize), "\"").concat(eachKey, "\":").concat(!indentSize ? '' : ' ').concat(parse(eachValue, indent + indentSize), ",").concat(!indentSize ? '' : '\n')
                    : '';
            });
            return "{".concat(!indentSize ? '' : '\n').concat(removeComma(objStr_1, !!indentSize)).concat(' '.repeat(indent), "}");
        }
    }
    return parse(value, 0);
}
exports.toJson = toJson;
//# sourceMappingURL=to-json.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUnixTimestamp = void 0;
/**
 *
 * @returns
 */
function getUnixTimestamp() {
    return Math.round(+new Date() / 1000);
}
exports.getUnixTimestamp = getUnixTimestamp;
//# sourceMappingURL=get-unix-timestamp.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/action-command-plugin.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/action-command-plugin.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=action-command-plugin.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/auto-tile-plugin.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/auto-tile-plugin.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=auto-tile-plugin.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/index.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./action-command-plugin */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/action-command-plugin.js"), exports);
__exportStar(__webpack_require__(/*! ./auto-tile-plugin */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/auto-tile-plugin.js"), exports);
__exportStar(__webpack_require__(/*! ./link-condition-plugin */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/link-condition-plugin.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-action-command */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-action-command.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-auto-tile-parameters */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-auto-tile-parameters.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-info */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-info-category */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info-category.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-link-condition */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-link-condition.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-custom-id-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-custom-id-parameter.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-custom-id-parameter-param */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-custom-id-parameter-param.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-embedded-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-embedded-parameter.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-id-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-id-parameter.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-json-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-json-parameter.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-number-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-number-parameter.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-parameter-type */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-ui-string-parameter */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-string-parameter.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/link-condition-plugin.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/link-condition-plugin.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=link-condition-plugin.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-action-command.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-action-command.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-action-command.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-auto-tile-parameters.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-auto-tile-parameters.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-auto-tile-parameters.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info-category.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info-category.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgtkPluginInfoCategory = void 0;
var AgtkPluginInfoCategory;
(function (AgtkPluginInfoCategory) {
    AgtkPluginInfoCategory["Name"] = "name";
    AgtkPluginInfoCategory["Description"] = "description";
    AgtkPluginInfoCategory["Author"] = "author";
    AgtkPluginInfoCategory["Help"] = "help";
    AgtkPluginInfoCategory["Parameter"] = "parameter";
    AgtkPluginInfoCategory["Internal"] = "internal";
    AgtkPluginInfoCategory["ActionCommand"] = "actionCommand";
    AgtkPluginInfoCategory["LinkCondition"] = "linkCondition";
    AgtkPluginInfoCategory["AutoTile"] = "autoTile";
})(AgtkPluginInfoCategory = exports.AgtkPluginInfoCategory || (exports.AgtkPluginInfoCategory = {}));
//# sourceMappingURL=plugin-info-category.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-info.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-link-condition.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-link-condition.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-link-condition.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-custom-id-parameter-param.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-custom-id-parameter-param.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-custom-id-parameter-param.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-custom-id-parameter.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-custom-id-parameter.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-custom-id-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-embedded-parameter.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-embedded-parameter.js ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-embedded-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-id-parameter.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-id-parameter.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-id-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-json-parameter.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-json-parameter.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-json-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-number-parameter.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-number-parameter.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-number-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgtkPluginUiParameterType = void 0;
var AgtkPluginUiParameterType;
(function (AgtkPluginUiParameterType) {
    AgtkPluginUiParameterType["String"] = "String";
    AgtkPluginUiParameterType["MultiLineString"] = "MultiLineString";
    AgtkPluginUiParameterType["Number"] = "Number";
    AgtkPluginUiParameterType["Json"] = "Json";
    AgtkPluginUiParameterType["ImageId"] = "ImageId";
    AgtkPluginUiParameterType["TextId"] = "TextId";
    AgtkPluginUiParameterType["SceneId"] = "SceneId";
    AgtkPluginUiParameterType["TilesetId"] = "TilesetId";
    AgtkPluginUiParameterType["AnimationId"] = "AnimationId";
    AgtkPluginUiParameterType["ObjectId"] = "ObjectId";
    AgtkPluginUiParameterType["FontId"] = "FontId";
    AgtkPluginUiParameterType["MovieId"] = "MovieId";
    AgtkPluginUiParameterType["BgmId"] = "BgmId";
    AgtkPluginUiParameterType["SeId"] = "SeId";
    AgtkPluginUiParameterType["VoiceId"] = "VoiceId";
    AgtkPluginUiParameterType["VariableId"] = "VariableId";
    AgtkPluginUiParameterType["SwitchId"] = "SwitchId";
    AgtkPluginUiParameterType["AnimOnlyId"] = "AnimOnlyId";
    AgtkPluginUiParameterType["PortalId"] = "PortalId";
    AgtkPluginUiParameterType["CustomId"] = "CustomId";
    AgtkPluginUiParameterType["Embedded"] = "Embedded";
    AgtkPluginUiParameterType["EmbeddedEditable"] = "EmbeddedEditable";
    AgtkPluginUiParameterType["SwitchVariableObjectId"] = "SwitchVariableObjectId";
    AgtkPluginUiParameterType["DatabaseId"] = "DatabaseId";
})(AgtkPluginUiParameterType = exports.AgtkPluginUiParameterType || (exports.AgtkPluginUiParameterType = {}));
//# sourceMappingURL=plugin-ui-parameter-type.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-string-parameter.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-string-parameter.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-ui-string-parameter.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin.js":
/*!********************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin.js.map

/***/ }),

/***/ "./src/create-gestalt-input-plugin.ts":
/*!********************************************!*\
  !*** ./src/create-gestalt-input-plugin.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createGestaltInputPlugin = void 0;
var create_logger_1 = __webpack_require__(/*! @agogpixel/pgmmv-logging-support/src/create-logger */ "./node_modules/@agogpixel/pgmmv-logging-support/src/create-logger.js");
var get_controller_id_1 = __webpack_require__(/*! @agogpixel/pgmmv-object-support/src/object-instance/get-controller-id */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-controller-id.js");
var get_object_instance_1 = __webpack_require__(/*! @agogpixel/pgmmv-object-support/src/object-instance/get-object-instance */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.js");
var get_parent_object_instance_1 = __webpack_require__(/*! @agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.js");
var create_plugin_1 = __webpack_require__(/*! @agogpixel/pgmmv-plugin-support/src/create-plugin */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/create-plugin.js");
var create_cache_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/cache/create-cache */ "./node_modules/@agogpixel/pgmmv-resource-support/src/cache/create-cache.js");
var input_condition_1 = __webpack_require__(/*! ./input-condition */ "./src/input-condition/index.ts");
var link_conditions_1 = __webpack_require__(/*! ./link-conditions */ "./src/link-conditions.ts");
var locale_1 = __importDefault(__webpack_require__(/*! ./locale */ "./src/locale/index.ts"));
/**
 *
 */
var pluginBanner = "\nGestalt Input Plugin v".concat("0.2.0-dev", "\nCopyright 2022 AgogPixel - All Rights Reserved\n");
/**
 *
 * @returns
 */
function createGestaltInputPlugin() {
    /**
     *
     */
    var internalApi = {};
    /**
     *
     */
    var self = (0, create_plugin_1.createPlugin)({ localizations: locale_1.default, linkConditions: link_conditions_1.linkConditions }, internalApi);
    /**
     *
     */
    var inputConditionCache = (0, create_cache_1.createResourceCache)();
    /**
     *
     */
    var allControllerIds;
    /**
     *
     */
    var logger;
    /**
     *
     * @param parameters
     * @returns
     */
    function extractInputConditionIdentifier(parameters) {
        for (var i = 0; i < parameters.length; ++i) {
            if (parameters[i].id === link_conditions_1.InputConditionParameterId.Identifier) {
                return parameters[i].value.trim();
            }
        }
        return link_conditions_1.inputConditionParameterDefaults.identifier;
    }
    /**
     *
     * @param parameters
     * @returns
     */
    function parseInputCondition(parameters) {
        var json = JSON.stringify(link_conditions_1.inputConditionParameterDefaults.json);
        var fallback = link_conditions_1.inputConditionParameterDefaults.fallback;
        var identifier = link_conditions_1.inputConditionParameterDefaults.identifier;
        for (var i = 0; i < parameters.length; ++i) {
            switch (parameters[i].id) {
                case link_conditions_1.InputConditionParameterId.Json:
                    json = parameters[i].value;
                    break;
                case link_conditions_1.InputConditionParameterId.Fallback:
                    fallback = parameters[i].value;
                    break;
                case link_conditions_1.InputConditionParameterId.Identifier:
                    identifier = parameters[i].value;
                    break;
            }
        }
        var intermediate = JSON.parse(json);
        var result = (0, input_condition_1.transformInputClause)(intermediate);
        if (Array.isArray(result)) {
            logger.error("parseInputCondition ".concat(identifier, ": Invalid JSON logic detected:\n").concat(result.join('\n  - ')));
            var warningLogged_1 = false;
            return [
                function () {
                    if (!warningLogged_1) {
                        logger.warn("".concat(identifier, ": Invalid input condition; defaulting to false & suppressing this message"));
                        warningLogged_1 = true;
                    }
                    return false;
                },
                fallback
            ];
        }
        return [result, fallback];
    }
    /**
     *
     * @param objectId
     * @param instanceId
     * @returns
     */
    function fetchControllerId(objectId, instanceId) {
        var obj = Agtk.objects.get(objectId);
        var instance = (0, get_object_instance_1.getObjectInstance)(instanceId);
        var controllerId = (0, get_controller_id_1.getControllerId)(instance);
        if (obj.operatable && controllerId >= 0) {
            return controllerId;
        }
        var parentInstance = (0, get_parent_object_instance_1.getParentObjectInstance)(instance);
        if (!parentInstance) {
            return -1;
        }
        return fetchControllerId(parentInstance.objectId, parentInstance.id);
    }
    /**
     *
     * @param objectId
     * @param instanceId
     * @param actionLinkId
     * @param commonActionStatus
     * @param parameters
     * @returns
     */
    function testInputCondition(objectId, instanceId, actionLinkId, parameters) {
        var identifier = extractInputConditionIdentifier(parameters);
        if (!identifier) {
            logger.warn("testInputCondition {objectId: ".concat(objectId, ", instanceId: ").concat(instanceId, ", actionLinkId: ").concat(actionLinkId, "}: Unset identifier; defaulting to false"));
            return false;
        }
        var cacheKey = "".concat(objectId, ",").concat(instanceId, ",").concat(identifier);
        var inputCondition;
        if (!inputConditionCache.has(cacheKey)) {
            inputCondition = parseInputCondition(parameters);
            inputConditionCache.set(cacheKey, inputCondition);
        }
        else {
            inputCondition = inputConditionCache.get(cacheKey);
        }
        var clause = inputCondition[0];
        var fallback = inputCondition[1];
        var controllerId = fetchControllerId(objectId, instanceId);
        if (controllerId < 0 && fallback === link_conditions_1.InputConditionFallbackParameterId.AlwaysFalse) {
            return false;
        }
        var controllerIds = controllerId >= 0 ? [controllerId] : allControllerIds;
        for (var i = 0; i < controllerIds.length; ++i) {
            if (clause(controllerIds[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     *
     * @param data
     * @returns
     */
    self.initialize = function initialize(data) {
        if (!data) {
            data = {};
        }
        self.setInternal(data);
        if (internalApi.inEditor()) {
            return;
        }
        allControllerIds = [];
        for (var i = 0; i <= Agtk.controllers.MaxControllerId; ++i) {
            allControllerIds.push(i);
        }
        logger = (0, create_logger_1.createLogger)({
            runtimeLog: function (arg1) {
                Agtk.log("[Gestalt Input Plugin] ".concat(arg1));
            }
        });
        Agtk.log(pluginBanner);
    };
    /**
     *
     * @param linkConditionIndex
     * @param parameter
     * @param objectId
     * @param instanceId
     * @param actionLinkId
     * @param commonActionStatus Bug: set to undefined.
     * @returns
     */
    self.execLinkCondition = function execLinkCondition(linkConditionIndex, parameter, objectId, instanceId, actionLinkId) {
        switch (linkConditionIndex) {
            case link_conditions_1.linkConditionIdToIndexMap[link_conditions_1.LinkConditionId.InputCondition]:
                return testInputCondition(objectId, instanceId, actionLinkId, parameter);
        }
        var identifier = "{linkConditionIndex: ".concat(linkConditionIndex, ", objectId: ").concat(objectId, ", instanceId: ").concat(instanceId, ", actionLinkId: ").concat(actionLinkId, "}");
        logger.warn("execLinkCondition ".concat(identifier, ": No matching link condition found; defaulting to false"));
        return false;
    };
    return self;
}
exports.createGestaltInputPlugin = createGestaltInputPlugin;


/***/ }),

/***/ "./src/input-condition/controller-constant-prefix.ts":
/*!***********************************************************!*\
  !*** ./src/input-condition/controller-constant-prefix.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerConstantPrefix = void 0;
/**
 *
 */
var ControllerConstantPrefix;
(function (ControllerConstantPrefix) {
    /**
     *
     */
    ControllerConstantPrefix["Op"] = "OperationKey";
    /**
     *
     */
    ControllerConstantPrefix["Pc"] = "ReservedKeyCodePc_";
})(ControllerConstantPrefix = exports.ControllerConstantPrefix || (exports.ControllerConstantPrefix = {}));


/***/ }),

/***/ "./src/input-condition/index.ts":
/*!**************************************!*\
  !*** ./src/input-condition/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./controller-constant-prefix */ "./src/input-condition/controller-constant-prefix.ts"), exports);
__exportStar(__webpack_require__(/*! ./input-key */ "./src/input-condition/input-key.ts"), exports);
__exportStar(__webpack_require__(/*! ./input-key-prefix */ "./src/input-condition/input-key-prefix.ts"), exports);
__exportStar(__webpack_require__(/*! ./transform-clause */ "./src/input-condition/transform-clause.ts"), exports);
__exportStar(__webpack_require__(/*! ./transform-input-condition */ "./src/input-condition/transform-input-condition.ts"), exports);
__exportStar(__webpack_require__(/*! ./validate-input-condition */ "./src/input-condition/validate-input-condition.ts"), exports);


/***/ }),

/***/ "./src/input-condition/input-key-prefix.ts":
/*!*************************************************!*\
  !*** ./src/input-condition/input-key-prefix.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputKeyPrefix = void 0;
/**
 *
 */
var InputKeyPrefix;
(function (InputKeyPrefix) {
    /**
     *
     */
    InputKeyPrefix["Op"] = "Op";
    /**
     *
     */
    InputKeyPrefix["Pc"] = "Pc";
})(InputKeyPrefix = exports.InputKeyPrefix || (exports.InputKeyPrefix = {}));


/***/ }),

/***/ "./src/input-condition/input-key.ts":
/*!******************************************!*\
  !*** ./src/input-condition/input-key.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputKey = void 0;
/**
 *
 */
var InputKey;
(function (InputKey) {
    InputKey["Op_A"] = "Op_A";
    InputKey["Op_B"] = "Op_B";
    InputKey["Op_X"] = "Op_X";
    InputKey["Op_Y"] = "Op_Y";
    InputKey["Op_R1"] = "Op_R1";
    InputKey["Op_R2"] = "Op_R2";
    InputKey["Op_L1"] = "Op_L1";
    InputKey["Op_L2"] = "Op_L2";
    InputKey["Op_Up"] = "Op_Up";
    InputKey["Op_Down"] = "Op_Down";
    InputKey["Op_Left"] = "Op_Left";
    InputKey["Op_Right"] = "Op_Right";
    InputKey["Op_LeftStickUp"] = "Op_LeftStickUp";
    InputKey["Op_LeftStickDown"] = "Op_LeftStickDown";
    InputKey["Op_LeftStickLeft"] = "Op_LeftStickLeft";
    InputKey["Op_LeftStickRight"] = "Op_LeftStickRight";
    InputKey["Op_RightStickUp"] = "Op_RightStickUp";
    InputKey["Op_RightStickDown"] = "Op_RightStickDown";
    InputKey["Op_RightStickLeft"] = "Op_RightStickLeft";
    InputKey["Op_RightStickRight"] = "Op_RightStickRight";
    InputKey["Op_LeftClick"] = "Op_LeftClick";
    InputKey["Op_RightClick"] = "Op_RightClick";
    InputKey["Op_Start"] = "Op_Start";
    InputKey["Op_Select"] = "Op_Select";
    InputKey["Op_Home"] = "Op_Home";
    InputKey["Op_Ok"] = "Op_Ok";
    InputKey["Op_Cancel"] = "Op_Cancel";
    InputKey["Pc_W"] = "Pc_W";
    InputKey["Pc_A"] = "Pc_A";
    InputKey["Pc_S"] = "Pc_S";
    InputKey["Pc_D"] = "Pc_D";
    InputKey["Pc_LeftClick"] = "Pc_LeftClick";
    InputKey["Pc_RightClick"] = "Pc_RightClick";
    InputKey["Pc_Up"] = "Pc_Up";
    InputKey["Pc_Right"] = "Pc_Right";
    InputKey["Pc_Down"] = "Pc_Down";
    InputKey["Pc_Left"] = "Pc_Left";
    InputKey["Pc_MiddleClick"] = "Pc_MiddleClick";
    InputKey["Pc_WheelUp"] = "Pc_WheelUp";
    InputKey["Pc_WhellDown"] = "Pc_WhellDown";
    InputKey["Pc_MousePointer"] = "Pc_MousePointer";
})(InputKey = exports.InputKey || (exports.InputKey = {}));


/***/ }),

/***/ "./src/input-condition/transform-clause.ts":
/*!*************************************************!*\
  !*** ./src/input-condition/transform-clause.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformInputClause = void 0;
var create_clause_transform_1 = __webpack_require__(/*! @agogpixel/pgmmv-link-condition-support/src/json-logic/create-clause-transform */ "./node_modules/@agogpixel/pgmmv-link-condition-support/src/json-logic/create-clause-transform.js");
var transform_input_condition_1 = __webpack_require__(/*! ./transform-input-condition */ "./src/input-condition/transform-input-condition.ts");
var validate_input_condition_1 = __webpack_require__(/*! ./validate-input-condition */ "./src/input-condition/validate-input-condition.ts");
/**
 *
 */
exports.transformInputClause = (0, create_clause_transform_1.createJsonLogicClauseTransform)(function (condition) {
    var result = (0, validate_input_condition_1.validateInputCondition)(condition);
    if (result !== true) {
        return result;
    }
    return (0, transform_input_condition_1.transformInputCondition)(condition);
});


/***/ }),

/***/ "./src/input-condition/transform-input-condition.ts":
/*!**********************************************************!*\
  !*** ./src/input-condition/transform-input-condition.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformInputCondition = void 0;
var controller_constant_prefix_1 = __webpack_require__(/*! ./controller-constant-prefix */ "./src/input-condition/controller-constant-prefix.ts");
var input_key_prefix_1 = __webpack_require__(/*! ./input-key-prefix */ "./src/input-condition/input-key-prefix.ts");
/**
 *
 * @param condition
 * @returns
 */
function transformInputCondition(condition) {
    var inputKey = condition[0];
    var desiredValue = condition[1];
    var inputKeyParts = inputKey.split('_');
    var propPrefix = inputKeyParts[0] === input_key_prefix_1.InputKeyPrefix.Pc ? controller_constant_prefix_1.ControllerConstantPrefix.Pc : controller_constant_prefix_1.ControllerConstantPrefix.Op;
    var prop = "".concat(propPrefix).concat(inputKeyParts[1]);
    if (inputKeyParts[0] === input_key_prefix_1.InputKeyPrefix.Pc) {
        return function (controllerId) {
            var pressed = !!Agtk.controllers.getKeyValue(controllerId, Agtk.constants.controllers[prop]);
            return desiredValue ? pressed : !pressed;
        };
    }
    return function (controllerId) {
        var pressed = Agtk.controllers.getOperationKeyPressed(controllerId, Agtk.constants.controllers[prop]);
        return desiredValue ? pressed : !pressed;
    };
}
exports.transformInputCondition = transformInputCondition;


/***/ }),

/***/ "./src/input-condition/validate-input-condition.ts":
/*!*********************************************************!*\
  !*** ./src/input-condition/validate-input-condition.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateInputCondition = void 0;
var input_key_1 = __webpack_require__(/*! ./input-key */ "./src/input-condition/input-key.ts");
/**
 *
 * @param condition
 * @returns
 */
function validateInputCondition(condition) {
    if (!Array.isArray(condition)) {
        return 'Input condition condition must be of type array';
    }
    if (condition.length !== 2) {
        return 'Input condition condition must be of type array with exact length of 2';
    }
    if (typeof condition[0] !== 'string') {
        return 'Input condition condition must be of type array with first element of type string';
    }
    if (typeof input_key_1.InputKey[condition[0]] !== 'string') {
        return "Input condition condition must be of type array with valid first element: '".concat(condition[0], "' is invalid");
    }
    if (typeof condition[1] !== 'boolean') {
        return 'Input condition condition must be of type array with second element of type boolean';
    }
    return true;
}
exports.validateInputCondition = validateInputCondition;


/***/ }),

/***/ "./src/link-conditions.ts":
/*!********************************!*\
  !*** ./src/link-conditions.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.linkConditions = exports.inputConditionParameterDefaults = exports.InputConditionFallbackParameterId = exports.InputConditionParameterId = exports.linkConditionIdToIndexMap = exports.LinkConditionId = void 0;
var plugin_ui_parameter_type_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js");
var LinkConditionId;
(function (LinkConditionId) {
    LinkConditionId[LinkConditionId["InputCondition"] = 8177408] = "InputCondition";
})(LinkConditionId = exports.LinkConditionId || (exports.LinkConditionId = {}));
exports.linkConditionIdToIndexMap = (_a = {},
    _a[LinkConditionId.InputCondition] = 0,
    _a);
var InputConditionParameterId;
(function (InputConditionParameterId) {
    InputConditionParameterId[InputConditionParameterId["Json"] = 8177409] = "Json";
    InputConditionParameterId[InputConditionParameterId["Fallback"] = 8177410] = "Fallback";
    InputConditionParameterId[InputConditionParameterId["Identifier"] = 8177411] = "Identifier";
})(InputConditionParameterId = exports.InputConditionParameterId || (exports.InputConditionParameterId = {}));
var InputConditionFallbackParameterId;
(function (InputConditionFallbackParameterId) {
    InputConditionFallbackParameterId[InputConditionFallbackParameterId["Default"] = 0] = "Default";
    InputConditionFallbackParameterId[InputConditionFallbackParameterId["AlwaysFalse"] = 1] = "AlwaysFalse";
})(InputConditionFallbackParameterId = exports.InputConditionFallbackParameterId || (exports.InputConditionFallbackParameterId = {}));
exports.inputConditionParameterDefaults = {
    json: ['Op_A', true],
    fallback: InputConditionFallbackParameterId.Default,
    identifier: 'Unique To Object'
};
exports.linkConditions = [
    {
        id: LinkConditionId.InputCondition,
        name: 'loca(LINK_CONDITION_0_NAME)',
        description: 'loca(LINK_CONDITION_0_DESCRIPTION)',
        parameter: [
            {
                id: InputConditionParameterId.Identifier,
                name: 'loca(LINK_CONDITION_0_PARAMETER_2_NAME)',
                type: plugin_ui_parameter_type_1.AgtkPluginUiParameterType.String,
                defaultValue: exports.inputConditionParameterDefaults.identifier
            },
            {
                id: InputConditionParameterId.Json,
                name: 'loca(LINK_CONDITION_0_PARAMETER_0_NAME)',
                type: plugin_ui_parameter_type_1.AgtkPluginUiParameterType.Json,
                defaultValue: exports.inputConditionParameterDefaults.json
            },
            {
                id: InputConditionParameterId.Fallback,
                name: 'loca(LINK_CONDITION_0_PARAMETER_1_NAME)',
                type: plugin_ui_parameter_type_1.AgtkPluginUiParameterType.CustomId,
                customParam: [
                    {
                        id: InputConditionFallbackParameterId.Default,
                        name: 'loca(LINK_CONDITION_0_PARAMETER_1_PARAM_0_NAME)'
                    },
                    { id: InputConditionFallbackParameterId.AlwaysFalse, name: 'loca(LINK_CONDITION_0_PARAMETER_1_PARAM_1_NAME)' }
                ],
                defaultValue: exports.inputConditionParameterDefaults.fallback
            }
        ]
    }
];


/***/ }),

/***/ "./src/locale/en/index.ts":
/*!********************************!*\
  !*** ./src/locale/en/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var data_json_1 = __importDefault(__webpack_require__(/*! ./data.json */ "./src/locale/en/data.json"));
data_json_1.default.PLUGIN_HELP = __webpack_require__(/*! ./help.md */ "./src/locale/en/help.md");
exports["default"] = {
    locale: 'en',
    data: data_json_1.default
};


/***/ }),

/***/ "./src/locale/index.ts":
/*!*****************************!*\
  !*** ./src/locale/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var en_1 = __importDefault(__webpack_require__(/*! ./en */ "./src/locale/en/index.ts"));
exports["default"] = [en_1.default];


/***/ }),

/***/ "./src/locale/en/help.md":
/*!*******************************!*\
  !*** ./src/locale/en/help.md ***!
  \*******************************/
/***/ (function(module) {

module.exports = "# Gestalt Input Plugin\n\nAn alternative way to define input link conditions with the following:\n\n-   JSON specification that maps an input key (`OperationKey` or `ReservedKeyCodePc`) to either a pressed (`true`) or released (`false`) state.\n    -   Available logic connectives: `NOT`, `AND`, `OR`, `NAND`, `NOR`, `XOR`, & `XNOR`.\n    -   Any errors in the input specification are output to the player's \"Runtime Console Log\"; an input condition will always return `false` in this case.\n-   Resolves any object instance to an operable controller.\n    -   Configurable fallback behavior when a controller is not found.\n\nThese features can open up new approaches to how you can structure your PGMMV games.\n\n> **⚠️Important⚠️**\n>\n> Make sure you setup up your controllable players as `Starting Points` in your scenes. Check out [baz](https://bazratcreates.itch.io/)'s [Multiplayer & Controller ID Setup tutorial](https://www.youtube.com/watch?v=FVp2UVoNpqc) for more details!\n\n## Link Condition Parameters\n\n-   **Gestalt Input Condition**\n    -   `Input Condition Identifier`: Non-empty string unique to the object.\n    -   `Input Condition JSON`: Domain specific JSON mapping input key to pressed/released state.\n    -   `Controller Fallback`: Define how this input condition behaves when no operable controller is found.\n        -   `ANY CONTROLLER`: Polls all controller IDs for first input condition satisfaction found. This is the default behavior for non-starting point objects.\n        -   `ALWAYS FALSE`: The link condition will never resolve to true.\n\n## Example Input Condition JSON\n\n`true` only when `Up Right` on the `Left Stick` is being pressed:\n\n```\n{\n  \"AND\": [\n    [\"Op_LeftStickDown\", false],\n    [\"Op_LeftStickUp\", true],\n    [\"Op_LeftStickRight\", true],\n    [\"Op_LeftStickLeft\", false]\n  ]\n}\n```\n\n`true` only when any direction other than `Up Right` is being pressed on the `Left Stick`:\n\n```\n{\n  \"OR\": [\n    {\n      \"AND\": [\n        [\"Op_LeftStickUp\", false],\n        {\n          \"OR\": [\n            [\"Op_LeftStickRight\", true],\n            [\"Op_LeftStickDown\", true],\n            [\"Op_LeftStickLeft\", true]\n          ]\n        }\n      ]\n    },\n    {\n      \"AND\": [\n        [\"Op_LeftStickRight\", false],\n        {\n          \"OR\": [\n            [\"Op_LeftStickDown\", true],\n            [\"Op_LeftStickUp\", true],\n            [\"Op_LeftStickLeft\", true]\n          ]\n        }\n      ]\n    }\n  ]\n}\n```\n\n## Input Condition JSON EBNF\n\n[Extended Backus-Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) representation:\n\n```\nclause       = not clause | and clause | or clause | nand clause | nor clause | xor clause | xnor clause | condition ;\nclause array = '[' , clauses , ']' ;\nclauses      = clause [ , ',' , clauses ] ;\nnot clause   = '{' , '\"NOT\"' , ':' , '[' , clause , ']', '}' ;\nand clause   = '{' , '\"AND\"' , ':' , clause array '}' ;\nor clause    = '{' , '\"OR\"' , ':' , clause array '}' ;\nnand clause  = '{' , '\"NAND\"' , ':' , clause array '}' ;\nnor clause   = '{' , '\"NOR\"' , ':' , clause array '}' ;\nxor clause   = '{' , '\"XOR\"' , ':' , clause array '}' ;\nxnor clause  = '{' , '\"XNOR\"' , ':' , clause array '}' ;\ncondition    = '[' , key , ',' , boolean , ']' ;\nboolean      = 'true' | 'false' ;\nkey          =\n    | '\"Op_A\"'\n    | '\"Op_B\"'\n    | '\"Op_X\"'\n    | '\"Op_Y\"'\n    | '\"Op_R1\"'\n    | '\"Op_R2\"'\n    | '\"Op_L1\"'\n    | '\"Op_L2\"'\n    | '\"Op_Up\"'\n    | '\"Op_Down\"'\n    | '\"Op_Left\"'\n    | '\"Op_Right\"'\n    | '\"Op_LeftStickUp\"'\n    | '\"Op_LeftStickDown\"'\n    | '\"Op_LeftStickLeft\"'\n    | '\"Op_LeftStickRight\"'\n    | '\"Op_RightStickUp\"'\n    | '\"Op_RightStickDown\"'\n    | '\"Op_RightStickLeft\"'\n    | '\"Op_RightStickRight\"'\n    | '\"Op_LeftClick\"'\n    | '\"Op_RightClick\"'\n    | '\"Op_Start\"'\n    | '\"Op_Select\"'\n    | '\"Op_Home\"'\n    | '\"Op_Ok\"'\n    | '\"Op_Cancel\"'\n    | '\"Pc_W\"'\n    | '\"Pc_A\"'\n    | '\"Pc_S\"'\n    | '\"Pc_D\"'\n    | '\"Pc_LeftClick\"'\n    | '\"Pc_RightClick\"'\n    | '\"Pc_Up\"'\n    | '\"Pc_Right\"'\n    | '\"Pc_Down\"'\n    | '\"Pc_Left\"'\n    | '\"Pc_MiddleClick\"'\n    | '\"Pc_WheelUp\"'\n    | '\"Pc_WhellDown\"'\n    | '\"Pc_MousePointer\"'\n    ;\n```\n\n## Notes\n\n-   **Input Condition JSON**: Parsed **once** (into a function) and then cached. Cache keys are constructed from the current `objectId`, `instanceId`, and user specified `Input Condition Identifier`; thus the `Input Condition Identifier` must be unique to the object/instance - no runtime checks are performed for correctness here (other than ensuring the identifier is a non-empty string).\n\n    -   While the editor takes care of validating the _structure_ any input JSON, additional checks are performed to ensure the JSON conforms to our _grammar_. Any errors are logged and the affected input condition will always return false.\n\n-   **Controller IDs**: Fetched on each link condition test as follows:\n\n    1. Current object is checked if `operable` and its instance's built-in `Controller ID` variable value is a valid controller ID.\n    2. When controller ID value is invalid, traverse to the instance's parent object instance (if it exists) and repeat step 1.\n    3. If search is exhausted (ie. no valid controller ID and no more ancestors to check), use specified fallback setting for this link condition.\n\n    We perform this search each time in case a child object gets swapped out to a different 'operable object hierarchy' during the course of gameplay. Beware of this when building objects that make of use of `Common Actions` with this link condition.\n\n> _gestalt_ - _an organized whole that is perceived as more than the sum of its parts._\n";

/***/ }),

/***/ "./src/locale/en/data.json":
/*!*********************************!*\
  !*** ./src/locale/en/data.json ***!
  \*********************************/
/***/ (function(module) {

module.exports = JSON.parse('{"PLUGIN_NAME":"Gestalt Input","PLUGIN_DESCRIPTION":"Input condition with JSON; Resolves to an operable controller*.","PLUGIN_AUTHOR":"kidthales <kidthales@agogpixel.com>","PLUGIN_HELP":"See help.md","LINK_CONDITION_0_NAME":"Gestalt Input Condition","LINK_CONDITION_0_DESCRIPTION":"Input condition with JSON; Resolves to an operable controller*.","LINK_CONDITION_0_PARAMETER_0_NAME":"Input Condition JSON","LINK_CONDITION_0_PARAMETER_1_NAME":"Controller Fallback","LINK_CONDITION_0_PARAMETER_1_PARAM_0_NAME":"ANY CONTROLLER","LINK_CONDITION_0_PARAMETER_1_PARAM_1_NAME":"ALWAYS FALSE","LINK_CONDITION_0_PARAMETER_2_NAME":"Input Condition Identifier"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
/* IIFEReturnPlugin */ return function() {
var exports = __webpack_exports__;
/*!****************************!*\
  !*** ./src/pgmmv-entry.ts ***!
  \****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var create_gestalt_input_plugin_1 = __webpack_require__(/*! ./create-gestalt-input-plugin */ "./src/create-gestalt-input-plugin.ts");
var plugin = (0, create_gestalt_input_plugin_1.createGestaltInputPlugin)();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
return plugin;

}();
/******/ })()
;