/**
 * (MANUAL)
 * Copyright 2022 Tristan Bonsor - All Rights Reserved.
 *
 * This file, and its originating project files, are released under the MIT license: https://github.com/agogpixel/pgmmv-gestalt-input-plugin/blob/main/LICENSE
 *
 * For more information, please see:
 *  - Github Repository: https://github.com/agogpixel/pgmmv-gestalt-input-plugin
 *  - Published Builds: https://agogpixel.itch.io/pgmmv-gestalt-input-plugin
 *//******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@agogpixel/pgmmv-logging-support/src/create-logger.function.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-logging-support/src/create-logger.function.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLogger = exports.jsonIndentSizeMax = exports.jsonIndentSizeMin = exports.defaultJsonStringifyFunctions = exports.defaultJsonIndentSize = void 0;
/**
 * Exports create logger function & various defaults.
 *
 * @module create-logger.function
 */
var get_unix_timestamp_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.function */ "./node_modules/@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.function.js");
var to_json_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/json/to-json.function */ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/to-json.function.js");
var log_level_enum_1 = __webpack_require__(/*! ./log-level.enum */ "./node_modules/@agogpixel/pgmmv-logging-support/src/log-level.enum.js");
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
/**
 * Default JSON indent size.
 */
exports.defaultJsonIndentSize = 2;
/**
 * Default JSON stringify functions flag state.
 */
exports.defaultJsonStringifyFunctions = false;
/**
 * Minimum allowed JSON indent size value.
 */
exports.jsonIndentSizeMin = 0;
/**
 * Maximum allowed JSON indent size value.
 */
exports.jsonIndentSizeMax = 8;
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Create object instance that conforms to {@link Logger} API.
 *
 * @param config Logger configuration.
 * @param internal Provide an object to 'inherit' a reference to the logger's
 * internal {@link LoggerProtectedApi} implementation.
 * @returns An object instance that provides a base implementation for a
 * {@link Logger} API.
 */
function createLogger(config, internal) {
    var _a;
    // Public API container.
    var self = {};
    // Protected API container.
    var internalApi = internal || {};
    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Protected Properties
    //////////////////////////////////////////////////////////////////////////////
    internalApi.logLevel = config.logLevel || log_level_enum_1.LogLevel.Info;
    internalApi.jsonIndentSize =
        typeof config.jsonIndentSize !== 'number'
            ? exports.defaultJsonIndentSize
            : cc.clampf(config.jsonIndentSize, exports.jsonIndentSizeMin, exports.jsonIndentSizeMax);
    internalApi.jsonStringifyFunctions = !!config.jsonStringifyFunctions || exports.defaultJsonStringifyFunctions;
    internalApi.logLevelMap = config.logLevelMap || (_a = {},
        _a[log_level_enum_1.LogLevel.Debug] = log_level_enum_1.LogLevel[log_level_enum_1.LogLevel.Debug],
        _a[log_level_enum_1.LogLevel.Info] = log_level_enum_1.LogLevel[log_level_enum_1.LogLevel.Info],
        _a[log_level_enum_1.LogLevel.Warn] = log_level_enum_1.LogLevel[log_level_enum_1.LogLevel.Warn],
        _a[log_level_enum_1.LogLevel.Error] = log_level_enum_1.LogLevel[log_level_enum_1.LogLevel.Error],
        _a[log_level_enum_1.LogLevel.Fatal] = log_level_enum_1.LogLevel[log_level_enum_1.LogLevel.Fatal],
        _a);
    //////////////////////////////////////////////////////////////////////////////
    // Protected Methods
    //////////////////////////////////////////////////////////////////////////////
    internalApi.runtimeLog = config.runtimeLog || Agtk.log;
    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Public Methods
    //////////////////////////////////////////////////////////////////////////////
    self.log = function (data, level) {
        if (typeof level !== 'string' && typeof level !== 'number') {
            internalApi.runtimeLog(typeof data === 'string'
                ? data
                : (0, to_json_function_1.toJson)(data, internalApi.jsonIndentSize, internalApi.jsonStringifyFunctions));
            return;
        }
        var logLevel = typeof level === 'string' ? log_level_enum_1.LogLevel[level] : level;
        if (logLevel < internalApi.logLevel) {
            return;
        }
        var message = typeof data === 'string' ? data : (0, to_json_function_1.toJson)(data, internalApi.jsonIndentSize, internalApi.jsonStringifyFunctions);
        var messageLog = "[".concat((0, get_unix_timestamp_function_1.getUnixTimestamp)(), "] ").concat(internalApi.logLevelMap[logLevel], ": ").concat(message);
        internalApi.runtimeLog(messageLog);
    };
    self.debug = function (data) {
        self.log(data, log_level_enum_1.LogLevel.Debug);
    };
    self.info = function (data) {
        self.log(data, log_level_enum_1.LogLevel.Info);
    };
    self.warn = function (data) {
        self.log(data, log_level_enum_1.LogLevel.Warn);
    };
    self.error = function (data) {
        self.log(data, log_level_enum_1.LogLevel.Error);
    };
    self.fatal = function (data) {
        self.log(data, log_level_enum_1.LogLevel.Fatal);
    };
    self.getLogLevel = function () {
        return internalApi.logLevel;
    };
    self.setLogLevel = function (level) {
        internalApi.logLevel = level;
        return self;
    };
    self.getRuntimeLog = function () {
        return internalApi.runtimeLog;
    };
    self.setRuntimeLog = function (log) {
        internalApi.runtimeLog = log;
        return self;
    };
    self.getJsonIndentSize = function () {
        return internalApi.jsonIndentSize;
    };
    self.setJsonIndentSize = function (size) {
        internalApi.jsonIndentSize = cc.clampf(size, exports.jsonIndentSizeMin, exports.jsonIndentSizeMax);
        return self;
    };
    self.getJsonStringifyFunctions = function () {
        return internalApi.jsonStringifyFunctions;
    };
    self.setJsonStringifyFunctions = function (stringify) {
        internalApi.jsonStringifyFunctions = stringify;
        return self;
    };
    self.getLogLevelMap = function () {
        return internalApi.logLevelMap;
    };
    self.setLogLevelMap = function (map) {
        internalApi.logLevelMap = map;
        return self;
    };
    // Logger is ready!
    return self;
}
exports.createLogger = createLogger;
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
// None.
//# sourceMappingURL=create-logger.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-logging-support/src/log-level.enum.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-logging-support/src/log-level.enum.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports log level enumeration.
 *
 * @module log-level.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
/**
 * Log level enumeration.
 */
var LogLevel;
(function (LogLevel) {
    /**
     * Debug log level.
     */
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    /**
     * Info log level.
     */
    LogLevel[LogLevel["Info"] = 1] = "Info";
    /**
     * Warn log level.
     */
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    /**
     * Error log level.
     */
    LogLevel[LogLevel["Error"] = 3] = "Error";
    /**
     * Fatal log level.
     */
    LogLevel[LogLevel["Fatal"] = 4] = "Fatal";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=log-level.enum.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.function.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.function.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports get object instance function.
 *
 * @module object-instance/get-object-instance.function
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getObjectInstance = void 0;
/**
 * Get object instance with specified ID.
 *
 * @param instanceId Instance ID.
 * @returns Object instance.
 */
function getObjectInstance(instanceId) {
    return Agtk.objectInstances.get(instanceId);
}
exports.getObjectInstance = getObjectInstance;
//# sourceMappingURL=get-object-instance.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.function.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.function.js ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParentObjectInstance = void 0;
var get_object_instance_function_1 = __webpack_require__(/*! ./get-object-instance.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.function.js");
var get_parent_object_instance_id_function_1 = __webpack_require__(/*! ./variables/get-parent-object-instance-id.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-parent-object-instance-id.function.js");
/**
 * Get parent object instance.
 *
 * @param childInstanceOrId Child object instance or ID.
 * @returns Reference to parent object instance or `undefined`.
 */
function getParentObjectInstance(childInstanceOrId) {
    var childInstance;
    if (typeof childInstanceOrId === 'number') {
        childInstance = (0, get_object_instance_function_1.getObjectInstance)(childInstanceOrId);
    }
    else {
        childInstance = childInstanceOrId;
    }
    var parentInstanceId = (0, get_parent_object_instance_id_function_1.getParentObjectInstanceId)(childInstance);
    if (parentInstanceId !== undefined && parentInstanceId !== -1) {
        return (0, get_object_instance_function_1.getObjectInstance)(parentInstanceId);
    }
}
exports.getParentObjectInstance = getParentObjectInstance;
//# sourceMappingURL=get-parent-object-instance.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/object-instance-accessor-type.enum.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/object-instance-accessor-type.enum.js ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports object instance accessor type enumeration.
 *
 * @module object-instance/object-instance-accessor-type.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectInstanceAccessorType = void 0;
/**
 * Object instance accessor type enumeration.
 */
var ObjectInstanceAccessorType;
(function (ObjectInstanceAccessorType) {
    /**
     * Object instance switches.
     */
    ObjectInstanceAccessorType["Switches"] = "switches";
    /**
     * Object instance variables.
     */
    ObjectInstanceAccessorType["Variables"] = "variables";
})(ObjectInstanceAccessorType = exports.ObjectInstanceAccessorType || (exports.ObjectInstanceAccessorType = {}));
//# sourceMappingURL=object-instance-accessor-type.enum.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/resolve-id.function.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/resolve-id.function.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveId = void 0;
/**
 * Resolve switch or variable ID.
 *
 * @param objectInstance Object instance.
 * @param type Accessor type.
 * @param idOrName ID or name of switch/variable.
 * @returns ID or -1 when name not found.
 */
function resolveId(objectInstance, type, idOrName) {
    if (typeof idOrName === 'string') {
        return objectInstance[type].getIdByName(idOrName);
    }
    return idOrName;
}
exports.resolveId = resolveId;
//# sourceMappingURL=resolve-id.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-controller-id.function.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-controller-id.function.js ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getControllerId = void 0;
var get_variable_value_function_1 = __webpack_require__(/*! ./get-variable-value.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-variable-value.function.js");
/**
 * Get controller ID variable value.
 *
 * @param objectInstance Object instance.
 * @returns Variable value.
 */
function getControllerId(objectInstance) {
    // Controller ID values must be parsed for some reason - baz.
    return parseInt((0, get_variable_value_function_1.getVariableValue)(objectInstance, Agtk.constants.objects.variables.ControllerIDId));
}
exports.getControllerId = getControllerId;
//# sourceMappingURL=get-controller-id.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-parent-object-instance-id.function.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-parent-object-instance-id.function.js ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParentObjectInstanceId = void 0;
var get_variable_value_function_1 = __webpack_require__(/*! ./get-variable-value.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-variable-value.function.js");
/**
 * Get parent object instance ID variable value.
 *
 * @param objectInstance Object instance.
 * @returns Variable value.
 */
function getParentObjectInstanceId(objectInstance) {
    return (0, get_variable_value_function_1.getVariableValue)(objectInstance, Agtk.constants.objects.variables.ParentObjectInstanceIDId);
}
exports.getParentObjectInstanceId = getParentObjectInstanceId;
//# sourceMappingURL=get-parent-object-instance-id.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-variable-value.function.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-variable-value.function.js ***!
  \*******************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVariableValue = void 0;
var object_instance_accessor_type_enum_1 = __webpack_require__(/*! ../object-instance-accessor-type.enum */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/object-instance-accessor-type.enum.js");
var resolve_id_function_1 = __webpack_require__(/*! ../resolve-id.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/resolve-id.function.js");
/**
 * Get variable value in object instance.
 *
 * @param objectInstance Object instance.
 * @param key Variable ID or name.
 * @returns Resolved variable value or `undefined`.
 */
function getVariableValue(objectInstance, key) {
    var id = (0, resolve_id_function_1.resolveId)(objectInstance, object_instance_accessor_type_enum_1.ObjectInstanceAccessorType.Variables, key);
    if (id === -1) {
        return;
    }
    return objectInstance.variables.get(id).getValue();
}
exports.getVariableValue = getVariableValue;
//# sourceMappingURL=get-variable-value.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/create-plugin.function.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/create-plugin.function.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPlugin = void 0;
var plugin_info_category_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info-category */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-info-category.js");
var plugin_ui_parameter_type_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js");
var localization_1 = __webpack_require__(/*! ./localization */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/index.js");
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Create an object instance that provides a base implementation for PGMMV
 * plugins.
 *
 * @typeParam I Plugin's internal data type (default: `JsonValue`).
 * @typeParam P Plugin's public API type (default: `AgtkPlugin`).
 * @param config Plugin configuration.
 * @param internal Provide an object to 'inherit' a reference to the plugin's
 * internal {@link PluginProtectedApi} implementation.
 * @returns An object instance that provides a base implementation for a PGMMV
 * plugin.
 * @public
 * @static
 */
function createPlugin(config, internal) {
    // Public API container.
    var self = {};
    // Protected API container.
    var internalApi = internal || {};
    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Plugin UI parameter configurations.
     *
     * @private
     */
    var parametersConfig = config.parameters || [];
    /**
     * Plugin action command configurations.
     *
     * @private
     */
    var actionCommandsConfig = config.actionCommands || [];
    /**
     * Plugin auto tiles configurations.
     *
     * @private
     */
    var autoTilesConfig = config.autoTiles || undefined;
    /**
     * Plugin link condition configurations.
     *
     * @private
     */
    var linkConditionsConfig = config.linkConditions || [];
    /**
     * Localized plugin UI parameters.
     *
     * @private
     */
    var localizedParameters;
    /**
     * Localized plugin actions commands.
     *
     * @private
     */
    var localizedActionCommands;
    /**
     * Localized plugin link conditions.
     *
     * @private
     */
    var localizedLinkConditions;
    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Protected Properties
    //////////////////////////////////////////////////////////////////////////////
    internalApi.internalData = {};
    internalApi.localization = (0, localization_1.createPluginLocalizationManager)({ localizations: config.localizations });
    //////////////////////////////////////////////////////////////////////////////
    // Protected Methods
    //////////////////////////////////////////////////////////////////////////////
    internalApi.getInfoParameter = function () {
        if (!localizedParameters) {
            localizedParameters = internalApi.localization.processParameterLocale(parametersConfig);
        }
        return localizedParameters;
    };
    internalApi.getInfoInternal = function () {
        return JSON.parse(JSON.stringify(internalApi.internalData));
    };
    internalApi.getInfoActionCommand = function () {
        if (!localizedActionCommands) {
            localizedActionCommands = internalApi.localization.processActionCommandLocale(actionCommandsConfig);
        }
        return localizedActionCommands;
    };
    internalApi.getInfoLinkCondition = function () {
        if (!localizedLinkConditions) {
            localizedLinkConditions = internalApi.localization.processLinkConditionLocale(linkConditionsConfig);
        }
        return localizedLinkConditions;
    };
    internalApi.getInfoAutoTile = function () {
        return autoTilesConfig;
    };
    internalApi.inEditor = function () {
        return !Agtk || typeof Agtk.log !== 'function';
    };
    internalApi.inPlayer = function () {
        return !!Agtk && typeof Agtk.version === 'string' && /^player .+$/.test(Agtk.version);
    };
    internalApi.normalizeActionCommandParameters = function (actionCommandIndex, paramValue) {
        var vj = self.getInfo(plugin_info_category_1.AgtkPluginInfoCategory.ActionCommand)[actionCommandIndex];
        return normalizeParameters(paramValue, vj.parameter);
    };
    internalApi.normalizeLinkConditionParameters = function (linkConditionIndex, paramValue) {
        var vj = self.getInfo(plugin_info_category_1.AgtkPluginInfoCategory.LinkCondition)[linkConditionIndex];
        return normalizeParameters(paramValue, vj.parameter);
    };
    internalApi.normalizeUiParameters = function (paramValue) {
        return normalizeParameters(paramValue, self.getInfo(plugin_info_category_1.AgtkPluginInfoCategory.Parameter));
    };
    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Public Methods
    //////////////////////////////////////////////////////////////////////////////
    self.setLocale = function (arg1) {
        internalApi.localization.setLocale(arg1);
    };
    self.getInfo = function (category) {
        var info;
        switch (category) {
            case plugin_info_category_1.AgtkPluginInfoCategory.Name:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Name);
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.Description:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Description);
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.Author:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Author);
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.Help:
                info = internalApi.localization.get(localization_1.PluginLocalizationRequiredKey.Help);
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.Parameter:
                info = internalApi.getInfoParameter();
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.Internal:
                info = internalApi.getInfoInternal();
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.ActionCommand:
                info = internalApi.getInfoActionCommand();
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.LinkCondition:
                info = internalApi.getInfoLinkCondition();
                break;
            case plugin_info_category_1.AgtkPluginInfoCategory.AutoTile:
                info = internalApi.getInfoAutoTile();
                break;
        }
        return info;
    };
    self.initialize = function (data) {
        if (data) {
            self.setInternal(data);
        }
    };
    self.finalize = function () {
        return;
    };
    self.setParamValue = function () {
        return;
    };
    self.setInternal = function (data) {
        internalApi.internalData = JSON.parse(JSON.stringify(data)) || internalApi.internalData;
    };
    self.call = function call() {
        return;
    };
    // Plugin is ready!
    return self;
}
exports.createPlugin = createPlugin;
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Normalize plugin UI paramters.
 *
 * @param paramValue Plugin UI parameter values.
 * @param defaults Default plugin UI parameters.
 * @returns Normalized plugin UI parameters.
 * @private
 * @static
 */
function normalizeParameters(paramValue, defaults) {
    var normalized = {};
    for (var i = 0; i < defaults.length; i++) {
        var p = defaults[i];
        normalized[p.id] = (p.type === plugin_ui_parameter_type_1.AgtkPluginUiParameterType.Json ? JSON.stringify(p.defaultValue) : p.defaultValue);
    }
    for (var i = 0; i < paramValue.length; ++i) {
        var p = paramValue[i];
        normalized[p.id] = p.value;
    }
    return normalized;
}
//# sourceMappingURL=create-plugin.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/create-plugin-localization-manager.function.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/create-plugin-localization-manager.function.js ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPluginLocalizationManager = void 0;
/**
 * Exports plugin localization manager factory.
 *
 * @module localization/create-plugin-localization-manager.function
 */
var plugin_ui_parameter_type_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js");
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Create an object instance that provides an implementation for a plugin
 * localization manager.
 *
 * @param config Plugin localization manager configuration.
 * @returns An object instance that provides an implementation for a plugin
 * localization manager.
 * @public
 * @static
 */
function createPluginLocalizationManager(config) {
    // Public API container.
    var self = {};
    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Localization configurations.
     *
     * @private
     */
    var localizations = config.localizations && config.localizations.length > 0
        ? config.localizations
        : [{ locale: 'en', data: {} }];
    /**
     * Localization fallback data.
     *
     * @private
     */
    var fallbackData = localizations[0].data;
    /**
     * Current locale.
     *
     * @private
     */
    var currentLocale = localizations[0].locale;
    /**
     * Maps locale prefix to localization data.
     *
     * @private
     */
    var localeMap = {};
    // Load locale map.
    for (var i = 0; i < localizations.length; ++i) {
        localeMap[localizations[i].locale] = localizations[i].data;
    }
    /**
     * Inline locale regex for text replacement.
     *
     * @private
     */
    var inlineRegex = /^loca\((.+)\)$/;
    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Protected Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Protected Methods
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Public Methods
    //////////////////////////////////////////////////////////////////////////////
    self.get = function (key) {
        var loca = currentLocale.substring(0, 2);
        if (localeMap[loca] && typeof localeMap[loca][key] === 'string') {
            return localeMap[loca][key];
        }
        if (typeof fallbackData[key] === 'string') {
            return fallbackData[key];
        }
        return "LOCA MISSING: ".concat(key);
    };
    self.getLocale = function () {
        return currentLocale;
    };
    self.setLocale = function (locale) {
        if (!localeMap[locale.substring(0, 2)]) {
            return false;
        }
        currentLocale = locale;
        return true;
    };
    self.processParameterLocale = function (parameters) {
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
    self.processActionCommandLocale = function (actionCommands) {
        for (var i = 0; i < actionCommands.length; ++i) {
            var executeCommand = actionCommands[i];
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
        return actionCommands;
    };
    self.processLinkConditionLocale = function (linkConditions) {
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
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
// None.
//# sourceMappingURL=create-plugin-localization-manager.function.js.map

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
/**
 * Exports PGMMV plugin support localization APIs and implementations.
 *
 * @module localization
 */
__exportStar(__webpack_require__(/*! ./create-plugin-localization-manager.function */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/create-plugin-localization-manager.function.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-localization-data.type */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-data.type.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-localization-manager-config.interface */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-manager-config.interface.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-localization-manager.interface */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-manager.interface.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-localization-required-key.enum */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-required-key.enum.js"), exports);
__exportStar(__webpack_require__(/*! ./plugin-localization.interface */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization.interface.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-data.type.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-data.type.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Exports plugin localization data type.
 *
 * @module localization/plugin-localization-data.type
 */
var plugin_localization_required_key_enum_1 = __webpack_require__(/*! ./plugin-localization-required-key.enum */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-required-key.enum.js");
//# sourceMappingURL=plugin-localization-data.type.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-manager-config.interface.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-manager-config.interface.js ***!
  \***********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-localization-manager-config.interface.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-manager.interface.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-manager.interface.js ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-localization-manager.interface.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-required-key.enum.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization-required-key.enum.js ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports plugin localization required key enumeration.
 *
 * @module localization/plugin-localization-required-key.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PluginLocalizationRequiredKey = void 0;
/**
 * Plugin localization required key enumerations.
 */
var PluginLocalizationRequiredKey;
(function (PluginLocalizationRequiredKey) {
    /**
     * Plugin name.
     */
    PluginLocalizationRequiredKey["Name"] = "PLUGIN_NAME";
    /**
     * Plugin description.
     */
    PluginLocalizationRequiredKey["Description"] = "PLUGIN_DESCRIPTION";
    /**
     * Plugin author.
     */
    PluginLocalizationRequiredKey["Author"] = "PLUGIN_AUTHOR";
    /**
     * Plugin help.
     */
    PluginLocalizationRequiredKey["Help"] = "PLUGIN_HELP";
})(PluginLocalizationRequiredKey = exports.PluginLocalizationRequiredKey || (exports.PluginLocalizationRequiredKey = {}));
//# sourceMappingURL=plugin-localization-required-key.enum.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization.interface.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-plugin-support/src/localization/plugin-localization.interface.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=plugin-localization.interface.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/cache/create-resource-cache.function.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/cache/create-resource-cache.function.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createResourceCache = void 0;
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Create an object instance that implements the {@link ResourceCache}
 * interface. This is an in-memory cache with no TTL support.
 *
 * @typeParam T Key type.
 * @typeParam U Value type.
 * @param internal Provide an object to 'inherit' a reference to the resource
 * cache's internal {@link ResourceCacheProtectedApi} implementation.
 * @returns An object instance that implements the {@link ResourceCache}
 * interface.
 * @public
 * @static
 */
function createResourceCache(internal) {
    // Public API container.
    var self = {};
    // Protected API container.
    var internalApi = internal || {};
    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Protected Properties
    //////////////////////////////////////////////////////////////////////////////
    internalApi.cache = {};
    //////////////////////////////////////////////////////////////////////////////
    // Protected Methods
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////
    // None.
    //////////////////////////////////////////////////////////////////////////////
    // Public Methods
    //////////////////////////////////////////////////////////////////////////////
    self.clear = function () {
        var keys = Object.keys(internalApi.cache);
        for (var i = 0; i < keys.length; ++i) {
            delete internalApi.cache[keys[i]];
        }
        return self;
    };
    self.delete = function (key) {
        delete internalApi.cache[key];
        return self;
    };
    self.get = function (key) {
        return internalApi.cache[key];
    };
    self.has = function (key) {
        return !!internalApi.cache[key];
    };
    self.set = function (key, value) {
        internalApi.cache[key] = value;
        return self;
    };
    return self;
}
exports.createResourceCache = createResourceCache;
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
// None.
//# sourceMappingURL=create-resource-cache.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/logic/create-json-logic-clause-transform.function.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/json/logic/create-json-logic-clause-transform.function.js ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createJsonLogicClauseTransform = void 0;
var json_logic_connective_enum_1 = __webpack_require__(/*! ./json-logic-connective.enum */ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/logic/json-logic-connective.enum.js");
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Create a JSON logic clause transform function based on specified constraint
 * factory.
 *
 * @typeParam K Clause key type.
 * @typeParam P Clause paramater/value type.
 * @typeParam Q Constraint parameter types.
 * @param constraintFactory Function that generats constraints from
 * clauses/conditions.
 * @returns JSON logic clause transform function.
 * @public
 * @static
 */
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
            if (connective === json_logic_connective_enum_1.JsonLogicConnective.Not) {
                if (subClauses.length > 1) {
                    errors.push("".concat(currentPath, ": Invalid JSON logic sub-clause for ").concat(json_logic_connective_enum_1.JsonLogicConnective.Not, " connective; array of length 1 required"));
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
                case json_logic_connective_enum_1.JsonLogicConnective.And:
                case json_logic_connective_enum_1.JsonLogicConnective.Or:
                case json_logic_connective_enum_1.JsonLogicConnective.Nand:
                case json_logic_connective_enum_1.JsonLogicConnective.Nor:
                case json_logic_connective_enum_1.JsonLogicConnective.Xor:
                case json_logic_connective_enum_1.JsonLogicConnective.Xnor:
                    for (var i = 0; i < subClauses.length; ++i) {
                        subConstraints.push(parseJsonLogicClause(subClauses[i], "".concat(currentPath, "[").concat(i, "]")));
                    }
                    break;
                default:
                    errors.push("".concat(currentPath, ": Unknown connective: ").concat(connective));
                    return errorResult;
            }
            switch (connective) {
                case json_logic_connective_enum_1.JsonLogicConnective.And:
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
                case json_logic_connective_enum_1.JsonLogicConnective.Or:
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
                case json_logic_connective_enum_1.JsonLogicConnective.Nand:
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
                case json_logic_connective_enum_1.JsonLogicConnective.Nor:
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
                case json_logic_connective_enum_1.JsonLogicConnective.Xor:
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
                case json_logic_connective_enum_1.JsonLogicConnective.Xnor:
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
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
// None.
//# sourceMappingURL=create-json-logic-clause-transform.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/logic/json-logic-connective.enum.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/json/logic/json-logic-connective.enum.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports JSON logic connective enumeration.
 *
 * @module json/logic/json-logic-connective.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonLogicConnective = void 0;
/**
 * JSON logic connective string enumeration.
 */
var JsonLogicConnective;
(function (JsonLogicConnective) {
    /**
     * NOT logic connective.
     */
    JsonLogicConnective["Not"] = "NOT";
    /**
     * AND logic connective.
     */
    JsonLogicConnective["And"] = "AND";
    /**
     * OR logic connective.
     */
    JsonLogicConnective["Or"] = "OR";
    /**
     * NAND logic connective.
     */
    JsonLogicConnective["Nand"] = "NAND";
    /**
     * NOR logic connective.
     */
    JsonLogicConnective["Nor"] = "NOR";
    /**
     * XOR logic connective.
     */
    JsonLogicConnective["Xor"] = "XOR";
    /**
     * XNOR logic connective.
     */
    JsonLogicConnective["Xnor"] = "XNOR";
})(JsonLogicConnective = exports.JsonLogicConnective || (exports.JsonLogicConnective = {}));
//# sourceMappingURL=json-logic-connective.enum.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/to-json.function.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/json/to-json.function.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toJson = void 0;
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Custom JSON stringify method that can handle some non-JSON data types (Date,
 * Symbol, etc.). Capable of custom indent sizing & function stringification.
 *
 * Cycle safe - already visited references will result in "[seen object]" or
 * "[seen array]" string literals.
 *
 * @param value Value to convert to a JSON encoded string.
 * @param space Amount of space characters in an indent. 0 will result in a
 * single line.
 * @param stringifyFunctions Stringify functions?
 * @returns A JSON encoded string.
 * @public
 * @static
 */
function toJson(value, space, stringifyFunctions) {
    var seen = [];
    var indentSize = typeof space === 'number' && space >= 0 ? space : 2;
    function parse(obj, indent) {
        if (ignoreDataTypes(obj)) {
            return undefined;
        }
        if (isDate(obj)) {
            return "\"".concat(obj.toISOString(), "\"");
        }
        if (nullDataTypes(obj)) {
            return "".concat(null);
        }
        if (isFunction(obj)) {
            if (stringifyFunctions) {
                var fnParts = (isFunction(obj.toString)
                    ? obj.toString()
                    : '"function"').split('\n');
                return fnParts.join("".concat(!indentSize ? '' : '\n' + ' '.repeat(indentSize)));
            }
            return undefined;
        }
        if (restOfDataTypes(obj)) {
            var passQuotes = isString(obj) ? "\"" : '';
            return "".concat(passQuotes).concat(obj).concat(passQuotes);
        }
        if (isArray(obj) || isObject(obj)) {
            if (seen.indexOf(obj) >= 0) {
                return "\"[seen ".concat(isArray(obj) ? 'array' : 'object', "]\"");
            }
            seen.push(obj);
        }
        if (isArray(obj)) {
            var arrStr_1 = '';
            if (!obj.length) {
                return '[]';
            }
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
            if (!objKeys.length) {
                return '{}';
            }
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
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Test if specified value is an array.
 *
 * @param value Value to test.
 * @returns True when value is an array, false otherwise.
 * @private
 * @static
 */
function isArray(value) {
    return Array.isArray(value) && typeof value === 'object';
}
/**
 * Test if specified value is an object.
 *
 * @param value Value to test.
 * @returns True when value is a non-null & non-array object, false otherwise.
 * @private
 * @static
 */
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Test if specified value is a string.
 *
 * @param value Value to test.
 * @returns True when value is a string, false otherwise.
 * @private
 * @static
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Test if specified value is a boolean.
 *
 * @param value Value to test.
 * @returns True when value is a boolean, false otherwise.
 * @private
 * @static
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * Test if specified value is a number.
 *
 * @param value Value to test.
 * @returns True when value is a number, false otherwise.
 * @private
 * @static
 */
function isNumber(value) {
    return typeof value === 'number';
}
/**
 * Test if specified value is null.
 *
 * @param value Value to test.
 * @returns True when value is null, false otherwise.
 * @private
 * @static
 */
function isNull(value) {
    return value === null && typeof value === 'object';
}
/**
 * Test if value is a number type, but invalid.
 *
 * @param value Value to test.
 * @returns True when value is a number type but invalid, false otherwise.
 * @private
 * @static
 */
function isNotNumber(value) {
    return typeof value === 'number' && isNaN(value);
}
/**
 * Test if value is infinity.
 *
 * @param value Value to test.
 * @returns True when value is infinity, false otherwise.
 * @private
 * @static
 */
function isInfinity(value) {
    return typeof value === 'number' && !isFinite(value);
}
/**
 * Test if value is a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
 * instance.
 *
 * @param value Value to test.
 * @returns True when value is a Date instance, false otherwise.
 * @private
 * @static
 */
function isDate(value) {
    return typeof value === 'object' && value !== null && typeof value.getMonth === 'function';
}
/**
 * Test if value is undefined.
 *
 * @param value Value to test.
 * @returns True when value is undefined, false otherwise.
 * @private
 * @static
 */
function isUndefined(value) {
    return value === undefined && typeof value === 'undefined';
}
/**
 * Test if value is a function.
 *
 * @param value Value to test.
 * @returns True when value is a function, false otherwise.
 * @private
 * @static
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Test if value is a symbol.
 *
 * @param value Value to test.
 * @returns True when value is a symbol, false otherwise.
 * @private
 * @static
 */
function isSymbol(value) {
    return typeof value === 'symbol';
}
/**
 * Test if value is a number, string, or boolean.
 *
 * @param value Value to test.
 * @returns True when value is a number, string, or boolean. False otherwise.
 * @private
 * @static
 */
function restOfDataTypes(value) {
    return isNumber(value) || isString(value) || isBoolean(value);
}
/**
 * Test if value is undefined or a symbol.
 *
 * @param value Value to test.
 * @returns True when value is undefined or a symbol, false otherwise.
 * @private
 * @static
 */
function ignoreDataTypes(value) {
    return isUndefined(value) || isSymbol(value);
}
/**
 * Test if value is a number type (but invalid), infinity, or null.
 *
 * @param value Value to test.
 * @returns True when value is a number type (but invalid), infinity, or null.
 * False otherwise.
 * @private
 * @static
 */
function nullDataTypes(value) {
    return isNotNumber(value) || isInfinity(value) || isNull(value);
}
/**
 * Test if value is a number type (but invalid), infinity, null, undefined, or
 * symbol.
 *
 * @param value Value to test.
 * @returns True when value is a number type (but invalid), infinity, null,
 * undefined, or symbol. False otherwise.
 * @private
 * @static
 */
function arrayValuesNullTypes(value) {
    return nullDataTypes(value) || ignoreDataTypes(value);
}
/**
 * Remove a trailing comma from a string with trailing newline support.
 *
 * @param str String to remove comma from.
 * @param newline Account for trailing newline?
 * @returns A string with trailing comma removed.
 * @private
 * @static
 */
function removeComma(str, newline) {
    var tempArr;
    if (!newline) {
        tempArr = str.split('');
    }
    else {
        tempArr = str.trimEnd().split('');
    }
    tempArr.pop();
    return tempArr.join('') + (newline ? '\n' : '');
}
//# sourceMappingURL=to-json.function.js.map

/***/ }),

/***/ "./node_modules/@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.function.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@agogpixel/pgmmv-resource-support/src/time/get-unix-timestamp.function.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports unix timestamp function.
 *
 * @module time/get-unix-timestamp.function
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUnixTimestamp = void 0;
////////////////////////////////////////////////////////////////////////////////
// Public Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Private Static Properties
////////////////////////////////////////////////////////////////////////////////
// None.
////////////////////////////////////////////////////////////////////////////////
// Public Static Methods
////////////////////////////////////////////////////////////////////////////////
/**
 * Get a unix timestamp (time in seconds since Unix epoch).
 *
 * @returns Time in seconds since Unix epoch.
 * @public
 * @static
 */
function getUnixTimestamp() {
    return Math.round(+new Date() / 1000);
}
exports.getUnixTimestamp = getUnixTimestamp;
////////////////////////////////////////////////////////////////////////////////
// Private Static Methods
////////////////////////////////////////////////////////////////////////////////
// None.
//# sourceMappingURL=get-unix-timestamp.function.js.map

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

/***/ "./src/create-gestalt-input-plugin.function.ts":
/*!*****************************************************!*\
  !*** ./src/create-gestalt-input-plugin.function.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createGestaltInputPlugin = void 0;
/**
 * Exports a Gestalt Input plugin instance factory.
 *
 * @module
 */
var create_logger_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-logging-support/src/create-logger.function */ "./node_modules/@agogpixel/pgmmv-logging-support/src/create-logger.function.js");
var create_plugin_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-plugin-support/src/create-plugin.function */ "./node_modules/@agogpixel/pgmmv-plugin-support/src/create-plugin.function.js");
var create_resource_cache_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/cache/create-resource-cache.function */ "./node_modules/@agogpixel/pgmmv-resource-support/src/cache/create-resource-cache.function.js");
var link_conditions_1 = __webpack_require__(/*! ./link-conditions */ "./src/link-conditions/index.ts");
var locale_1 = __importDefault(__webpack_require__(/*! ./locale */ "./src/locale/index.ts"));
/**
 *
 */
var pluginBanner = "\nGestalt Input Plugin v".concat("0.2.0-dev", "\n");
/**
 * Creates a plugin instance.
 *
 * @returns Gestalt Input plugin instance.
 */
function createGestaltInputPlugin() {
    var internalApi = {};
    var self = (0, create_plugin_function_1.createPlugin)({ localizations: locale_1.default, linkConditions: link_conditions_1.linkConditions }, internalApi);
    internalApi.inputConditionCache = (0, create_resource_cache_function_1.createResourceCache)();
    self.initialize = function initialize(data) {
        if (!data) {
            data = {};
        }
        self.setInternal(data);
        if (internalApi.inEditor()) {
            return;
        }
        internalApi.allControllerIds = [];
        for (var i = 0; i <= Agtk.controllers.MaxControllerId; ++i) {
            internalApi.allControllerIds.push(i);
        }
        internalApi.logger = (0, create_logger_function_1.createLogger)({
            runtimeLog: function (arg1) {
                Agtk.log("[Gestalt Input Plugin] ".concat(arg1));
            }
        });
        Agtk.log(pluginBanner);
    };
    self.execLinkCondition = function (linkConditionIndex, parameter, objectId, instanceId, actionLinkId) {
        return (0, link_conditions_1.execLinkCondition)(internalApi, linkConditionIndex, internalApi.normalizeLinkConditionParameters(linkConditionIndex, parameter), objectId, instanceId, actionLinkId);
    };
    return self;
}
exports.createGestaltInputPlugin = createGestaltInputPlugin;


/***/ }),

/***/ "./src/link-conditions/exec-link-condition.function.ts":
/*!*************************************************************!*\
  !*** ./src/link-conditions/exec-link-condition.function.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execLinkCondition = void 0;
var link_condition_id_enum_1 = __webpack_require__(/*! ./link-condition-id.enum */ "./src/link-conditions/link-condition-id.enum.ts");
var link_condition_index_map_const_1 = __webpack_require__(/*! ./link-condition-index-map.const */ "./src/link-conditions/link-condition-index-map.const.ts");
var input_condition_1 = __webpack_require__(/*! ./input-condition */ "./src/link-conditions/input-condition/index.ts");
/**
 * Evaluates link condition.
 *
 * @param internalApi The plugin's internal API.
 * @param linkConditionIndex The index of a given link condition.
 * @param parameter Link condition data that is set in & provided by the PGMMV
 * editor or runtime & subsequently normalized.
 * @param objectId The object ID of the object instance through which the
 * link condition is evaluating.
 * @param instanceId The instance ID of the object instance through which the
 * link condition is evaluating.
 * @returns True if link condition is satisfied, false otherwise.
 */
function execLinkCondition(internalApi, linkConditionIndex, parameter, objectId, instanceId, actionLinkId) {
    switch (linkConditionIndex) {
        case link_condition_index_map_const_1.linkConditionIndexMap[link_condition_id_enum_1.LinkConditionId.InputCondition]:
            return (0, input_condition_1.execInputConditionLinkCondition)(internalApi, parameter, objectId, instanceId, actionLinkId);
        default:
            break;
    }
    var identifier = "{linkConditionIndex: ".concat(linkConditionIndex, ", objectId: ").concat(objectId, ", instanceId: ").concat(instanceId, ", actionLinkId: ").concat(actionLinkId, "}");
    internalApi.logger.warn("execLinkCondition ".concat(identifier, ": No matching link condition found; defaulting to false"));
    return false;
}
exports.execLinkCondition = execLinkCondition;


/***/ }),

/***/ "./src/link-conditions/index.ts":
/*!**************************************!*\
  !*** ./src/link-conditions/index.ts ***!
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
/**
 * Exports link condition configurations & functions.
 *
 * @module link-conditions
 */
__exportStar(__webpack_require__(/*! ./exec-link-condition.function */ "./src/link-conditions/exec-link-condition.function.ts"), exports);
__exportStar(__webpack_require__(/*! ./link-condition-id.enum */ "./src/link-conditions/link-condition-id.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./link-condition-index-map.const */ "./src/link-conditions/link-condition-index-map.const.ts"), exports);
__exportStar(__webpack_require__(/*! ./link-conditions.config */ "./src/link-conditions/link-conditions.config.ts"), exports);


/***/ }),

/***/ "./src/link-conditions/input-condition/controller-constant-prefix.enum.ts":
/*!********************************************************************************!*\
  !*** ./src/link-conditions/input-condition/controller-constant-prefix.enum.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports controller constant prefix enumeration.
 *
 * @module link-conditions/input-condition/controller-constant-prefix.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerConstantPrefix = void 0;
/**
 * Controller constant prefix enumeration.
 */
var ControllerConstantPrefix;
(function (ControllerConstantPrefix) {
    /**
     * Op key prefix.
     */
    ControllerConstantPrefix["Op"] = "OperationKey";
    /**
     * Pc key prefix.
     */
    ControllerConstantPrefix["Pc"] = "ReservedKeyCodePc_";
})(ControllerConstantPrefix = exports.ControllerConstantPrefix || (exports.ControllerConstantPrefix = {}));


/***/ }),

/***/ "./src/link-conditions/input-condition/exec-input-condition-link-condition.function.ts":
/*!*********************************************************************************************!*\
  !*** ./src/link-conditions/input-condition/exec-input-condition-link-condition.function.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execInputConditionLinkCondition = void 0;
var fetch_controller_id_function_1 = __webpack_require__(/*! ./fetch-controller-id.function */ "./src/link-conditions/input-condition/fetch-controller-id.function.ts");
var parameters_1 = __webpack_require__(/*! ./parameters */ "./src/link-conditions/input-condition/parameters/index.ts");
var parse_input_condition_parameters_function_1 = __webpack_require__(/*! ./parse-input-condition-parameters.function */ "./src/link-conditions/input-condition/parse-input-condition-parameters.function.ts");
/**
 * Exec 'Input Condition' link condition.
 *
 * @param internalApi Plugin internal API reference.
 * @param parameters Parsed link condition parameters.
 * @param objectId Object ID.
 * @param instanceId Instance ID.
 * @param actionLinkId Action link ID
 * @returns Boolean result based on current input & parsed input condition
 * state.
 */
function execInputConditionLinkCondition(internalApi, parameters, objectId, instanceId, actionLinkId) {
    var identifier = (parameters[parameters_1.InputConditionParameterId.Identifier] || '').trim();
    if (!identifier) {
        internalApi.logger.warn("testInputCondition {objectId: ".concat(objectId, ", instanceId: ").concat(instanceId, ", actionLinkId: ").concat(actionLinkId, "}: Unset identifier; defaulting to false"));
        return false;
    }
    var cacheKey = "".concat(objectId, ",").concat(instanceId, ",").concat(identifier);
    var inputCondition;
    if (!internalApi.inputConditionCache.has(cacheKey)) {
        inputCondition = (0, parse_input_condition_parameters_function_1.parseInputConditionParameters)(internalApi, parameters);
        internalApi.inputConditionCache.set(cacheKey, inputCondition);
    }
    else {
        inputCondition = internalApi.inputConditionCache.get(cacheKey);
    }
    var clause = inputCondition[0];
    var fallback = inputCondition[1];
    var controllerId = (0, fetch_controller_id_function_1.fetchControllerId)(objectId, instanceId);
    if (controllerId < 0 && fallback === parameters_1.InputConditionFallbackParameterId.AlwaysFalse) {
        return false;
    }
    var controllerIds = controllerId >= 0 ? [controllerId] : internalApi.allControllerIds;
    for (var i = 0; i < controllerIds.length; ++i) {
        if (clause(controllerIds[i])) {
            return true;
        }
    }
    return false;
}
exports.execInputConditionLinkCondition = execInputConditionLinkCondition;


/***/ }),

/***/ "./src/link-conditions/input-condition/fetch-controller-id.function.ts":
/*!*****************************************************************************!*\
  !*** ./src/link-conditions/input-condition/fetch-controller-id.function.ts ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchControllerId = void 0;
/**
 * Exports fetch controller ID function.
 *
 * @module link-conditions/input-condition/fetch-controller-id.function
 */
var get_object_instance_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-object-instance.function.js");
var get_parent_object_instance_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/get-parent-object-instance.function.js");
var get_controller_id_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-object-support/src/object-instance/variables/get-controller-id.function */ "./node_modules/@agogpixel/pgmmv-object-support/src/object-instance/variables/get-controller-id.function.js");
/**
 * Fetch controller ID.
 *
 * @param objectId Object ID.
 * @param instanceId Instance ID.
 * @returns Resolved controller ID or `-1`.
 */
function fetchControllerId(objectId, instanceId) {
    var obj = Agtk.objects.get(objectId);
    var instance = (0, get_object_instance_function_1.getObjectInstance)(instanceId);
    var controllerId = (0, get_controller_id_function_1.getControllerId)(instance);
    if (obj.operatable && controllerId >= 0) {
        return controllerId;
    }
    var parentInstance = (0, get_parent_object_instance_function_1.getParentObjectInstance)(instance);
    if (!parentInstance) {
        return -1;
    }
    return fetchControllerId(parentInstance.objectId, parentInstance.id);
}
exports.fetchControllerId = fetchControllerId;


/***/ }),

/***/ "./src/link-conditions/input-condition/index.ts":
/*!******************************************************!*\
  !*** ./src/link-conditions/input-condition/index.ts ***!
  \******************************************************/
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
/**
 * Exports 'Input Condition' link condition configurations & functions.
 *
 * @module link-conditions/input-condition
 */
__exportStar(__webpack_require__(/*! ./exec-input-condition-link-condition.function */ "./src/link-conditions/input-condition/exec-input-condition-link-condition.function.ts"), exports);
__exportStar(__webpack_require__(/*! ./input-condition.type */ "./src/link-conditions/input-condition/input-condition.type.ts"), exports);
__exportStar(__webpack_require__(/*! ./parameters */ "./src/link-conditions/input-condition/parameters/index.ts"), exports);


/***/ }),

/***/ "./src/link-conditions/input-condition/input-condition.type.ts":
/*!*********************************************************************!*\
  !*** ./src/link-conditions/input-condition/input-condition.type.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/link-conditions/input-condition/input-key-prefix.enum.ts":
/*!**********************************************************************!*\
  !*** ./src/link-conditions/input-condition/input-key-prefix.enum.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports input key prefix enumeration.
 *
 * @module link-conditions/input-condition/input-key-prefix.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputKeyPrefix = void 0;
/**
 * Input key prefix enumeration.
 */
var InputKeyPrefix;
(function (InputKeyPrefix) {
    /**
     * Op input key prefix.
     */
    InputKeyPrefix["Op"] = "Op";
    /**
     * Pc input key prefix.
     */
    InputKeyPrefix["Pc"] = "Pc";
})(InputKeyPrefix = exports.InputKeyPrefix || (exports.InputKeyPrefix = {}));


/***/ }),

/***/ "./src/link-conditions/input-condition/input-key.enum.ts":
/*!***************************************************************!*\
  !*** ./src/link-conditions/input-condition/input-key.enum.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports input key enumeration.
 *
 * @module link-conditions/input-condition/input-key.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputKey = void 0;
/**
 * Input Key enumeration.
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

/***/ "./src/link-conditions/input-condition/parameters/index.ts":
/*!*****************************************************************!*\
  !*** ./src/link-conditions/input-condition/parameters/index.ts ***!
  \*****************************************************************/
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
/**
 * Exports 'Input Condition' link condition UI parameters.
 *
 * @module link-conditions/input-condition/parameters
 */
__exportStar(__webpack_require__(/*! ./input-condition-fallback-parameter-id.enum */ "./src/link-conditions/input-condition/parameters/input-condition-fallback-parameter-id.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./input-condition-parameter-id.enum */ "./src/link-conditions/input-condition/parameters/input-condition-parameter-id.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./input-condition-parameters.config */ "./src/link-conditions/input-condition/parameters/input-condition-parameters.config.ts"), exports);


/***/ }),

/***/ "./src/link-conditions/input-condition/parameters/input-condition-fallback-parameter-id.enum.ts":
/*!******************************************************************************************************!*\
  !*** ./src/link-conditions/input-condition/parameters/input-condition-fallback-parameter-id.enum.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports 'Input Condition' link condition fallback parameter ID enumerations.
 *
 * @module link-conditions/input-condition/parameters/input-condition-fallback-parameter-id.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputConditionFallbackParameterId = void 0;
/**
 * 'Input Condition' link condition fallback parameter ID enumeration.
 */
var InputConditionFallbackParameterId;
(function (InputConditionFallbackParameterId) {
    /**
     * Default parameter ID.
     */
    InputConditionFallbackParameterId[InputConditionFallbackParameterId["Default"] = 1] = "Default";
    /**
     * Always false parameter ID.
     */
    InputConditionFallbackParameterId[InputConditionFallbackParameterId["AlwaysFalse"] = 2] = "AlwaysFalse";
})(InputConditionFallbackParameterId = exports.InputConditionFallbackParameterId || (exports.InputConditionFallbackParameterId = {}));


/***/ }),

/***/ "./src/link-conditions/input-condition/parameters/input-condition-parameter-id.enum.ts":
/*!*********************************************************************************************!*\
  !*** ./src/link-conditions/input-condition/parameters/input-condition-parameter-id.enum.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports 'Input Condition' link condition parameter ID enumerations.
 *
 * @module link-conditions/input-condition/parameters/input-condition-parameter-id.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputConditionParameterId = void 0;
/**
 * 'Input Condition' link condition parameter ID enumeration.
 */
var InputConditionParameterId;
(function (InputConditionParameterId) {
    /**
     * JSON parameter ID.
     */
    InputConditionParameterId[InputConditionParameterId["Json"] = 1] = "Json";
    /**
     * Fallback parameter ID.
     */
    InputConditionParameterId[InputConditionParameterId["Fallback"] = 2] = "Fallback";
    /**
     * Identifier parameter ID.
     */
    InputConditionParameterId[InputConditionParameterId["Identifier"] = 3] = "Identifier";
})(InputConditionParameterId = exports.InputConditionParameterId || (exports.InputConditionParameterId = {}));


/***/ }),

/***/ "./src/link-conditions/input-condition/parameters/input-condition-parameters.config.ts":
/*!*********************************************************************************************!*\
  !*** ./src/link-conditions/input-condition/parameters/input-condition-parameters.config.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inputConditionParameters = void 0;
/**
 * Exports 'Input Condition' link condition UI parameter configuration.
 *
 * @module link-conditions/input-condition/parameters/input-condition-parameters.config
 */
var plugin_ui_parameter_type_1 = __webpack_require__(/*! @agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type */ "./node_modules/@agogpixel/pgmmv-ts/api/agtk/plugin/plugin-ui-parameter-type.js");
var input_condition_fallback_parameter_id_enum_1 = __webpack_require__(/*! ./input-condition-fallback-parameter-id.enum */ "./src/link-conditions/input-condition/parameters/input-condition-fallback-parameter-id.enum.ts");
var input_condition_parameter_id_enum_1 = __webpack_require__(/*! ./input-condition-parameter-id.enum */ "./src/link-conditions/input-condition/parameters/input-condition-parameter-id.enum.ts");
/**
 * 'Input Condition' link condition UI parameter configuration.
 */
exports.inputConditionParameters = [
    {
        id: input_condition_parameter_id_enum_1.InputConditionParameterId.Identifier,
        name: 'loca(LINK_CONDITION_INPUT_CONDITION_PARAMETER_IDENTIFIER_NAME)',
        type: plugin_ui_parameter_type_1.AgtkPluginUiParameterType.String,
        defaultValue: 'loca(LINK_CONDITION_INPUT_CONDITION_PARAMETER_IDENTIFIER_DEFAULT_VALUE)'
    },
    {
        id: input_condition_parameter_id_enum_1.InputConditionParameterId.Json,
        name: 'loca(LINK_CONDITION_INPUT_CONDITION_PARAMETER_JSON_NAME)',
        type: plugin_ui_parameter_type_1.AgtkPluginUiParameterType.Json,
        defaultValue: ['Op_A', true]
    },
    {
        id: input_condition_parameter_id_enum_1.InputConditionParameterId.Fallback,
        name: 'loca(LINK_CONDITION_INPUT_CONDITION_PARAMETER_FALLBACK_NAME)',
        type: plugin_ui_parameter_type_1.AgtkPluginUiParameterType.CustomId,
        customParam: [
            {
                id: input_condition_fallback_parameter_id_enum_1.InputConditionFallbackParameterId.Default,
                name: 'loca(LINK_CONDITION_INPUT_CONDITION_PARAMETER_FALLBACK_PARAM_DEFAULT_NAME)'
            },
            {
                id: input_condition_fallback_parameter_id_enum_1.InputConditionFallbackParameterId.AlwaysFalse,
                name: 'loca(LINK_CONDITION_INPUT_CONDITION_PARAMETER_FALLBACK_PARAM_ALWAYS_FALSE_NAME)'
            }
        ],
        defaultValue: input_condition_fallback_parameter_id_enum_1.InputConditionFallbackParameterId.Default
    }
];


/***/ }),

/***/ "./src/link-conditions/input-condition/parse-input-condition-parameters.function.ts":
/*!******************************************************************************************!*\
  !*** ./src/link-conditions/input-condition/parse-input-condition-parameters.function.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseInputConditionParameters = void 0;
var parameters_1 = __webpack_require__(/*! ./parameters */ "./src/link-conditions/input-condition/parameters/index.ts");
var transform_input_clause_function_1 = __webpack_require__(/*! ./transform-input-clause.function */ "./src/link-conditions/input-condition/transform-input-clause.function.ts");
/**
 *
 * @param parameters
 * @returns
 */
function parseInputConditionParameters(internalApi, parameters) {
    var json = parameters[parameters_1.InputConditionParameterId.Json];
    var fallback = parameters[parameters_1.InputConditionParameterId.Fallback];
    var identifier = parameters[parameters_1.InputConditionParameterId.Identifier];
    var intermediate = JSON.parse(json);
    var result = (0, transform_input_clause_function_1.transformInputClause)(intermediate);
    if (Array.isArray(result)) {
        internalApi.logger.error("parseInputConditionParameters ".concat(identifier, ": Invalid JSON logic detected:\n").concat(result.join('\n  - ')));
        var warningLogged_1 = false;
        return [
            function () {
                if (!warningLogged_1) {
                    internalApi.logger.warn("".concat(identifier, ": Invalid input condition; defaulting to false & suppressing this message"));
                    warningLogged_1 = true;
                }
                return false;
            },
            fallback
        ];
    }
    return [result, fallback];
}
exports.parseInputConditionParameters = parseInputConditionParameters;


/***/ }),

/***/ "./src/link-conditions/input-condition/transform-input-clause.function.ts":
/*!********************************************************************************!*\
  !*** ./src/link-conditions/input-condition/transform-input-clause.function.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformInputClause = void 0;
var create_json_logic_clause_transform_function_1 = __webpack_require__(/*! @agogpixel/pgmmv-resource-support/src/json/logic/create-json-logic-clause-transform.function */ "./node_modules/@agogpixel/pgmmv-resource-support/src/json/logic/create-json-logic-clause-transform.function.js");
var transform_input_condition_function_1 = __webpack_require__(/*! ./transform-input-condition.function */ "./src/link-conditions/input-condition/transform-input-condition.function.ts");
var validate_input_condition_function_1 = __webpack_require__(/*! ./validate-input-condition.function */ "./src/link-conditions/input-condition/validate-input-condition.function.ts");
/**
 * Transform input clause.
 *
 * @param clause Input clause as JSON logic clause.
 * @returns Constraint fuction or array of error messages.
 */
exports.transformInputClause = (0, create_json_logic_clause_transform_function_1.createJsonLogicClauseTransform)(function (condition) {
    var result = (0, validate_input_condition_function_1.validateInputCondition)(condition);
    if (result !== true) {
        return result;
    }
    return (0, transform_input_condition_function_1.transformInputCondition)(condition);
});


/***/ }),

/***/ "./src/link-conditions/input-condition/transform-input-condition.function.ts":
/*!***********************************************************************************!*\
  !*** ./src/link-conditions/input-condition/transform-input-condition.function.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transformInputCondition = void 0;
var controller_constant_prefix_enum_1 = __webpack_require__(/*! ./controller-constant-prefix.enum */ "./src/link-conditions/input-condition/controller-constant-prefix.enum.ts");
var input_key_prefix_enum_1 = __webpack_require__(/*! ./input-key-prefix.enum */ "./src/link-conditions/input-condition/input-key-prefix.enum.ts");
/**
 * Transform input condition.
 *
 * @param condition JSON logic input condition.
 * @returns Transformed input condition as a JSON logic constraint.
 */
function transformInputCondition(condition) {
    var inputKey = condition[0];
    var desiredValue = condition[1];
    var inputKeyParts = inputKey.split('_');
    var propPrefix = inputKeyParts[0] === input_key_prefix_enum_1.InputKeyPrefix.Pc ? controller_constant_prefix_enum_1.ControllerConstantPrefix.Pc : controller_constant_prefix_enum_1.ControllerConstantPrefix.Op;
    var prop = "".concat(propPrefix).concat(inputKeyParts[1]);
    if (inputKeyParts[0] === input_key_prefix_enum_1.InputKeyPrefix.Pc) {
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

/***/ "./src/link-conditions/input-condition/validate-input-condition.function.ts":
/*!**********************************************************************************!*\
  !*** ./src/link-conditions/input-condition/validate-input-condition.function.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateInputCondition = void 0;
var input_key_enum_1 = __webpack_require__(/*! ./input-key.enum */ "./src/link-conditions/input-condition/input-key.enum.ts");
/**
 * Validate input condition.
 *
 * @param condition JSON logic input condition.
 * @returns True or error message.
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
    if (typeof input_key_enum_1.InputKey[condition[0]] !== 'string') {
        return "Input condition condition must be of type array with valid first element: '".concat(condition[0], "' is invalid");
    }
    if (typeof condition[1] !== 'boolean') {
        return 'Input condition condition must be of type array with second element of type boolean';
    }
    return true;
}
exports.validateInputCondition = validateInputCondition;


/***/ }),

/***/ "./src/link-conditions/link-condition-id.enum.ts":
/*!*******************************************************!*\
  !*** ./src/link-conditions/link-condition-id.enum.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {


/**
 * Exports link condition ID enumerations.
 *
 * @module link-conditions/link-condition-id.enum
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkConditionId = void 0;
/**
 * Link condition ID enumeration.
 */
var LinkConditionId;
(function (LinkConditionId) {
    /**
     * Input condition.
     */
    LinkConditionId[LinkConditionId["InputCondition"] = 1] = "InputCondition";
})(LinkConditionId = exports.LinkConditionId || (exports.LinkConditionId = {}));


/***/ }),

/***/ "./src/link-conditions/link-condition-index-map.const.ts":
/*!***************************************************************!*\
  !*** ./src/link-conditions/link-condition-index-map.const.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.linkConditionIndexMap = void 0;
var link_conditions_config_1 = __webpack_require__(/*! ./link-conditions.config */ "./src/link-conditions/link-conditions.config.ts");
/**
 * Map a link condition ID to its corresponding index within the
 * {@link AgtkPluginLinkCondition} parameter data provided by this plugin.
 *
 * Populated at runtime.
 */
exports.linkConditionIndexMap = {};
for (var i = 0; i < link_conditions_config_1.linkConditions.length; ++i) {
    exports.linkConditionIndexMap[link_conditions_config_1.linkConditions[i].id] = i;
}


/***/ }),

/***/ "./src/link-conditions/link-conditions.config.ts":
/*!*******************************************************!*\
  !*** ./src/link-conditions/link-conditions.config.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.linkConditions = void 0;
var input_condition_1 = __webpack_require__(/*! ./input-condition */ "./src/link-conditions/input-condition/index.ts");
var link_condition_id_enum_1 = __webpack_require__(/*! ./link-condition-id.enum */ "./src/link-conditions/link-condition-id.enum.ts");
/**
 * Link condition configurations.
 */
exports.linkConditions = [
    {
        id: link_condition_id_enum_1.LinkConditionId.InputCondition,
        name: 'loca(LINK_CONDITION_INPUT_CONDITION_NAME)',
        description: 'loca(LINK_CONDITION_INPUT_CONDITION_DESCRIPTION)',
        parameter: input_condition_1.inputConditionParameters
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

module.exports = JSON.parse('{"PLUGIN_NAME":"Gestalt Input","PLUGIN_DESCRIPTION":"Input condition with JSON; Resolves to an operable controller*.","PLUGIN_AUTHOR":"kidthales <kidthales@agogpixel.com>","PLUGIN_HELP":"See help.md","LINK_CONDITION_INPUT_CONDITION_NAME":"Gestalt Input Condition","LINK_CONDITION_INPUT_CONDITION_DESCRIPTION":"Input condition with JSON; Resolves to an operable controller*.","LINK_CONDITION_INPUT_CONDITION_PARAMETER_JSON_NAME":"Input Condition JSON","LINK_CONDITION_INPUT_CONDITION_PARAMETER_FALLBACK_NAME":"Controller Fallback","LINK_CONDITION_INPUT_CONDITION_PARAMETER_FALLBACK_PARAM_DEFAULT_NAME":"ANY CONTROLLER","LINK_CONDITION_INPUT_CONDITION_PARAMETER_FALLBACK_PARAM_ALWAYS_FALSE_NAME":"ALWAYS FALSE","LINK_CONDITION_INPUT_CONDITION_PARAMETER_IDENTIFIER_NAME":"Input Condition Identifier","LINK_CONDITION_INPUT_CONDITION_PARAMETER_IDENTIFIER_DEFAULT_VALUE":"Unique To Object"}');

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
var create_gestalt_input_plugin_function_1 = __webpack_require__(/*! ./create-gestalt-input-plugin.function */ "./src/create-gestalt-input-plugin.function.ts");
var plugin = (0, create_gestalt_input_plugin_function_1.createGestaltInputPlugin)();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
return plugin;

}();
/******/ })()
;
