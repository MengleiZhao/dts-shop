(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/echarts/lib/chart/helper/Symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/helper/Symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var _symbol = __webpack_require__(/*! ../../util/symbol */ "./node_modules/echarts/lib/util/symbol.js");

var createSymbol = _symbol.createSymbol;

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var _number = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

var parsePercent = _number.parsePercent;

var _labelHelper = __webpack_require__(/*! ./labelHelper */ "./node_modules/echarts/lib/chart/helper/labelHelper.js");

var getDefaultLabel = _labelHelper.getDefaultLabel;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @module echarts/chart/helper/Symbol
 */

/**
 * @constructor
 * @alias {module:echarts/chart/helper/Symbol}
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @extends {module:zrender/graphic/Group}
 */
function SymbolClz(data, idx, seriesScope) {
  graphic.Group.call(this);
  this.updateData(data, idx, seriesScope);
}

var symbolProto = SymbolClz.prototype;
/**
 * @public
 * @static
 * @param {module:echarts/data/List} data
 * @param {number} dataIndex
 * @return {Array.<number>} [width, height]
 */

var getSymbolSize = SymbolClz.getSymbolSize = function (data, idx) {
  var symbolSize = data.getItemVisual(idx, 'symbolSize');
  return symbolSize instanceof Array ? symbolSize.slice() : [+symbolSize, +symbolSize];
};

function getScale(symbolSize) {
  return [symbolSize[0] / 2, symbolSize[1] / 2];
}

function driftSymbol(dx, dy) {
  this.parent.drift(dx, dy);
}

symbolProto._createSymbol = function (symbolType, data, idx, symbolSize, keepAspect) {
  // Remove paths created before
  this.removeAll();
  var color = data.getItemVisual(idx, 'color'); // var symbolPath = createSymbol(
  //     symbolType, -0.5, -0.5, 1, 1, color
  // );
  // If width/height are set too small (e.g., set to 1) on ios10
  // and macOS Sierra, a circle stroke become a rect, no matter what
  // the scale is set. So we set width/height as 2. See #4150.

  var symbolPath = createSymbol(symbolType, -1, -1, 2, 2, color, keepAspect);
  symbolPath.attr({
    z2: 100,
    culling: true,
    scale: getScale(symbolSize)
  }); // Rewrite drift method

  symbolPath.drift = driftSymbol;
  this._symbolType = symbolType;
  this.add(symbolPath);
};
/**
 * Stop animation
 * @param {boolean} toLastFrame
 */


symbolProto.stopSymbolAnimation = function (toLastFrame) {
  this.childAt(0).stopAnimation(toLastFrame);
};
/**
 * FIXME:
 * Caution: This method breaks the encapsulation of this module,
 * but it indeed brings convenience. So do not use the method
 * unless you detailedly know all the implements of `Symbol`,
 * especially animation.
 *
 * Get symbol path element.
 */


symbolProto.getSymbolPath = function () {
  return this.childAt(0);
};
/**
 * Get scale(aka, current symbol size).
 * Including the change caused by animation
 */


symbolProto.getScale = function () {
  return this.childAt(0).scale;
};
/**
 * Highlight symbol
 */


symbolProto.highlight = function () {
  this.childAt(0).trigger('emphasis');
};
/**
 * Downplay symbol
 */


symbolProto.downplay = function () {
  this.childAt(0).trigger('normal');
};
/**
 * @param {number} zlevel
 * @param {number} z
 */


symbolProto.setZ = function (zlevel, z) {
  var symbolPath = this.childAt(0);
  symbolPath.zlevel = zlevel;
  symbolPath.z = z;
};

symbolProto.setDraggable = function (draggable) {
  var symbolPath = this.childAt(0);
  symbolPath.draggable = draggable;
  symbolPath.cursor = draggable ? 'move' : 'pointer';
};
/**
 * Update symbol properties
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @param {Object} [seriesScope]
 * @param {Object} [seriesScope.itemStyle]
 * @param {Object} [seriesScope.hoverItemStyle]
 * @param {Object} [seriesScope.symbolRotate]
 * @param {Object} [seriesScope.symbolOffset]
 * @param {module:echarts/model/Model} [seriesScope.labelModel]
 * @param {module:echarts/model/Model} [seriesScope.hoverLabelModel]
 * @param {boolean} [seriesScope.hoverAnimation]
 * @param {Object} [seriesScope.cursorStyle]
 * @param {module:echarts/model/Model} [seriesScope.itemModel]
 * @param {string} [seriesScope.symbolInnerColor]
 * @param {Object} [seriesScope.fadeIn=false]
 */


symbolProto.updateData = function (data, idx, seriesScope) {
  this.silent = false;
  var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
  var seriesModel = data.hostModel;
  var symbolSize = getSymbolSize(data, idx);
  var isInit = symbolType !== this._symbolType;

  if (isInit) {
    var keepAspect = data.getItemVisual(idx, 'symbolKeepAspect');

    this._createSymbol(symbolType, data, idx, symbolSize, keepAspect);
  } else {
    var symbolPath = this.childAt(0);
    symbolPath.silent = false;
    graphic.updateProps(symbolPath, {
      scale: getScale(symbolSize)
    }, seriesModel, idx);
  }

  this._updateCommon(data, idx, symbolSize, seriesScope);

  if (isInit) {
    var symbolPath = this.childAt(0);
    var fadeIn = seriesScope && seriesScope.fadeIn;
    var target = {
      scale: symbolPath.scale.slice()
    };
    fadeIn && (target.style = {
      opacity: symbolPath.style.opacity
    });
    symbolPath.scale = [0, 0];
    fadeIn && (symbolPath.style.opacity = 0);
    graphic.initProps(symbolPath, target, seriesModel, idx);
  }

  this._seriesModel = seriesModel;
}; // Update common properties


var normalStyleAccessPath = ['itemStyle'];
var emphasisStyleAccessPath = ['emphasis', 'itemStyle'];
var normalLabelAccessPath = ['label'];
var emphasisLabelAccessPath = ['emphasis', 'label'];
/**
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @param {Array.<number>} symbolSize
 * @param {Object} [seriesScope]
 */

symbolProto._updateCommon = function (data, idx, symbolSize, seriesScope) {
  var symbolPath = this.childAt(0);
  var seriesModel = data.hostModel;
  var color = data.getItemVisual(idx, 'color'); // Reset style

  if (symbolPath.type !== 'image') {
    symbolPath.useStyle({
      strokeNoScale: true
    });
  }

  var itemStyle = seriesScope && seriesScope.itemStyle;
  var hoverItemStyle = seriesScope && seriesScope.hoverItemStyle;
  var symbolRotate = seriesScope && seriesScope.symbolRotate;
  var symbolOffset = seriesScope && seriesScope.symbolOffset;
  var labelModel = seriesScope && seriesScope.labelModel;
  var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
  var hoverAnimation = seriesScope && seriesScope.hoverAnimation;
  var cursorStyle = seriesScope && seriesScope.cursorStyle;

  if (!seriesScope || data.hasItemOption) {
    var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx); // Color must be excluded.
    // Because symbol provide setColor individually to set fill and stroke

    itemStyle = itemModel.getModel(normalStyleAccessPath).getItemStyle(['color']);
    hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();
    symbolRotate = itemModel.getShallow('symbolRotate');
    symbolOffset = itemModel.getShallow('symbolOffset');
    labelModel = itemModel.getModel(normalLabelAccessPath);
    hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);
    hoverAnimation = itemModel.getShallow('hoverAnimation');
    cursorStyle = itemModel.getShallow('cursor');
  } else {
    hoverItemStyle = zrUtil.extend({}, hoverItemStyle);
  }

  var elStyle = symbolPath.style;
  symbolPath.attr('rotation', (symbolRotate || 0) * Math.PI / 180 || 0);

  if (symbolOffset) {
    symbolPath.attr('position', [parsePercent(symbolOffset[0], symbolSize[0]), parsePercent(symbolOffset[1], symbolSize[1])]);
  }

  cursorStyle && symbolPath.attr('cursor', cursorStyle); // PENDING setColor before setStyle!!!

  symbolPath.setColor(color, seriesScope && seriesScope.symbolInnerColor);
  symbolPath.setStyle(itemStyle);
  var opacity = data.getItemVisual(idx, 'opacity');

  if (opacity != null) {
    elStyle.opacity = opacity;
  }

  var liftZ = data.getItemVisual(idx, 'liftZ');
  var z2Origin = symbolPath.__z2Origin;

  if (liftZ != null) {
    if (z2Origin == null) {
      symbolPath.__z2Origin = symbolPath.z2;
      symbolPath.z2 += liftZ;
    }
  } else if (z2Origin != null) {
    symbolPath.z2 = z2Origin;
    symbolPath.__z2Origin = null;
  }

  var useNameLabel = seriesScope && seriesScope.useNameLabel;
  graphic.setLabelStyle(elStyle, hoverItemStyle, labelModel, hoverLabelModel, {
    labelFetcher: seriesModel,
    labelDataIndex: idx,
    defaultText: getLabelDefaultText,
    isRectText: true,
    autoColor: color
  }); // Do not execute util needed.

  function getLabelDefaultText(idx, opt) {
    return useNameLabel ? data.getName(idx) : getDefaultLabel(data, idx);
  }

  symbolPath.off('mouseover').off('mouseout').off('emphasis').off('normal');
  symbolPath.hoverStyle = hoverItemStyle; // FIXME
  // Do not use symbol.trigger('emphasis'), but use symbol.highlight() instead.

  graphic.setHoverStyle(symbolPath);
  var scale = getScale(symbolSize);

  if (hoverAnimation && seriesModel.isAnimationEnabled()) {
    var onEmphasis = function () {
      // Do not support this hover animation util some scenario required.
      // Animation can only be supported in hover layer when using `el.incremetal`.
      if (this.incremental) {
        return;
      }

      var ratio = scale[1] / scale[0];
      this.animateTo({
        scale: [Math.max(scale[0] * 1.1, scale[0] + 3), Math.max(scale[1] * 1.1, scale[1] + 3 * ratio)]
      }, 400, 'elasticOut');
    };

    var onNormal = function () {
      if (this.incremental) {
        return;
      }

      this.animateTo({
        scale: scale
      }, 400, 'elasticOut');
    };

    symbolPath.on('mouseover', onEmphasis).on('mouseout', onNormal).on('emphasis', onEmphasis).on('normal', onNormal);
  }
};
/**
 * @param {Function} cb
 * @param {Object} [opt]
 * @param {Object} [opt.keepLabel=true]
 */


symbolProto.fadeOut = function (cb, opt) {
  var symbolPath = this.childAt(0); // Avoid mistaken hover when fading out

  this.silent = symbolPath.silent = true; // Not show text when animating

  !(opt && opt.keepLabel) && (symbolPath.style.text = null);
  graphic.updateProps(symbolPath, {
    style: {
      opacity: 0
    },
    scale: [0, 0]
  }, this._seriesModel, this.dataIndex, cb);
};

zrUtil.inherits(SymbolClz, graphic.Group);
var _default = SymbolClz;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/helper/SymbolDraw.js":
/*!*************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/helper/SymbolDraw.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var SymbolClz = __webpack_require__(/*! ./Symbol */ "./node_modules/echarts/lib/chart/helper/Symbol.js");

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var isObject = _util.isObject;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @module echarts/chart/helper/SymbolDraw
 */

/**
 * @constructor
 * @alias module:echarts/chart/helper/SymbolDraw
 * @param {module:zrender/graphic/Group} [symbolCtor]
 */
function SymbolDraw(symbolCtor) {
  this.group = new graphic.Group();
  this._symbolCtor = symbolCtor || SymbolClz;
}

var symbolDrawProto = SymbolDraw.prototype;

function symbolNeedsDraw(data, point, idx, opt) {
  return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt.isIgnore && opt.isIgnore(idx)) // We do not set clipShape on group, because it will cut part of
  // the symbol element shape. We use the same clip shape here as
  // the line clip.
  && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, 'symbol') !== 'none';
}
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} [opt] Or isIgnore
 * @param {Function} [opt.isIgnore]
 * @param {Object} [opt.clipShape]
 */


symbolDrawProto.updateData = function (data, opt) {
  opt = normalizeUpdateOpt(opt);
  var group = this.group;
  var seriesModel = data.hostModel;
  var oldData = this._data;
  var SymbolCtor = this._symbolCtor;
  var seriesScope = makeSeriesScope(data); // There is no oldLineData only when first rendering or switching from
  // stream mode to normal mode, where previous elements should be removed.

  if (!oldData) {
    group.removeAll();
  }

  data.diff(oldData).add(function (newIdx) {
    var point = data.getItemLayout(newIdx);

    if (symbolNeedsDraw(data, point, newIdx, opt)) {
      var symbolEl = new SymbolCtor(data, newIdx, seriesScope);
      symbolEl.attr('position', point);
      data.setItemGraphicEl(newIdx, symbolEl);
      group.add(symbolEl);
    }
  }).update(function (newIdx, oldIdx) {
    var symbolEl = oldData.getItemGraphicEl(oldIdx);
    var point = data.getItemLayout(newIdx);

    if (!symbolNeedsDraw(data, point, newIdx, opt)) {
      group.remove(symbolEl);
      return;
    }

    if (!symbolEl) {
      symbolEl = new SymbolCtor(data, newIdx);
      symbolEl.attr('position', point);
    } else {
      symbolEl.updateData(data, newIdx, seriesScope);
      graphic.updateProps(symbolEl, {
        position: point
      }, seriesModel);
    } // Add back


    group.add(symbolEl);
    data.setItemGraphicEl(newIdx, symbolEl);
  }).remove(function (oldIdx) {
    var el = oldData.getItemGraphicEl(oldIdx);
    el && el.fadeOut(function () {
      group.remove(el);
    });
  }).execute();
  this._data = data;
};

symbolDrawProto.isPersistent = function () {
  return true;
};

symbolDrawProto.updateLayout = function () {
  var data = this._data;

  if (data) {
    // Not use animation
    data.eachItemGraphicEl(function (el, idx) {
      var point = data.getItemLayout(idx);
      el.attr('position', point);
    });
  }
};

symbolDrawProto.incrementalPrepareUpdate = function (data) {
  this._seriesScope = makeSeriesScope(data);
  this._data = null;
  this.group.removeAll();
};
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} [opt] Or isIgnore
 * @param {Function} [opt.isIgnore]
 * @param {Object} [opt.clipShape]
 */


symbolDrawProto.incrementalUpdate = function (taskParams, data, opt) {
  opt = normalizeUpdateOpt(opt);

  function updateIncrementalAndHover(el) {
    if (!el.isGroup) {
      el.incremental = el.useHoverLayer = true;
    }
  }

  for (var idx = taskParams.start; idx < taskParams.end; idx++) {
    var point = data.getItemLayout(idx);

    if (symbolNeedsDraw(data, point, idx, opt)) {
      var el = new this._symbolCtor(data, idx, this._seriesScope);
      el.traverse(updateIncrementalAndHover);
      el.attr('position', point);
      this.group.add(el);
      data.setItemGraphicEl(idx, el);
    }
  }
};

function normalizeUpdateOpt(opt) {
  if (opt != null && !isObject(opt)) {
    opt = {
      isIgnore: opt
    };
  }

  return opt || {};
}

symbolDrawProto.remove = function (enableAnimation) {
  var group = this.group;
  var data = this._data; // Incremental model do not have this._data.

  if (data && enableAnimation) {
    data.eachItemGraphicEl(function (el) {
      el.fadeOut(function () {
        group.remove(el);
      });
    });
  } else {
    group.removeAll();
  }
};

function makeSeriesScope(data) {
  var seriesModel = data.hostModel;
  return {
    itemStyle: seriesModel.getModel('itemStyle').getItemStyle(['color']),
    hoverItemStyle: seriesModel.getModel('emphasis.itemStyle').getItemStyle(),
    symbolRotate: seriesModel.get('symbolRotate'),
    symbolOffset: seriesModel.get('symbolOffset'),
    hoverAnimation: seriesModel.get('hoverAnimation'),
    labelModel: seriesModel.getModel('label'),
    hoverLabelModel: seriesModel.getModel('emphasis.label'),
    cursorStyle: seriesModel.get('cursor')
  };
}

var _default = SymbolDraw;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line.js":
/*!************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__(/*! ../echarts */ "./node_modules/echarts/lib/echarts.js");

__webpack_require__(/*! ./line/LineSeries */ "./node_modules/echarts/lib/chart/line/LineSeries.js");

__webpack_require__(/*! ./line/LineView */ "./node_modules/echarts/lib/chart/line/LineView.js");

var visualSymbol = __webpack_require__(/*! ../visual/symbol */ "./node_modules/echarts/lib/visual/symbol.js");

var layoutPoints = __webpack_require__(/*! ../layout/points */ "./node_modules/echarts/lib/layout/points.js");

var dataSample = __webpack_require__(/*! ../processor/dataSample */ "./node_modules/echarts/lib/processor/dataSample.js");

__webpack_require__(/*! ../component/gridSimple */ "./node_modules/echarts/lib/component/gridSimple.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// In case developer forget to include grid component
echarts.registerVisual(visualSymbol('line', 'circle', 'line'));
echarts.registerLayout(layoutPoints('line')); // Down sample after filter

echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, dataSample('line'));

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/LineSeries.js":
/*!***********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/LineSeries.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _config = __webpack_require__(/*! ../../config */ "./node_modules/echarts/lib/config.js");

var __DEV__ = _config.__DEV__;

var createListFromArray = __webpack_require__(/*! ../helper/createListFromArray */ "./node_modules/echarts/lib/chart/helper/createListFromArray.js");

var SeriesModel = __webpack_require__(/*! ../../model/Series */ "./node_modules/echarts/lib/model/Series.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = SeriesModel.extend({
  type: 'series.line',
  dependencies: ['grid', 'polar'],
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this);
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    hoverAnimation: true,
    // stack: null
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // polarIndex: 0,
    // If clip the overflow value
    clipOverflow: true,
    // cursor: null,
    label: {
      position: 'top'
    },
    // itemStyle: {
    // },
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    // areaStyle: {
    // origin of areaStyle. Valid values:
    // `'auto'/null/undefined`: from axisLine to data
    // `'start'`: from min to data
    // `'end'`: from data to max
    // origin: 'auto'
    // },
    // false, 'start', 'end', 'middle'
    step: false,
    // Disabled if step is true
    smooth: false,
    smoothMonotone: null,
    symbol: 'emptyCircle',
    symbolSize: 4,
    symbolRotate: null,
    showSymbol: true,
    // `false`: follow the label interval strategy.
    // `true`: show all symbols.
    // `'auto'`: If possible, show all symbols, otherwise
    //           follow the label interval strategy.
    showAllSymbol: 'auto',
    // Whether to connect break point.
    connectNulls: false,
    // Sampling for large data. Can be: 'average', 'max', 'min', 'sum'.
    sampling: 'none',
    animationEasing: 'linear',
    // Disable progressive
    progressive: 0,
    hoverLayerThreshold: Infinity
  }
});

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/LineView.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/LineView.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _config = __webpack_require__(/*! ../../config */ "./node_modules/echarts/lib/config.js");

var __DEV__ = _config.__DEV__;

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var SymbolDraw = __webpack_require__(/*! ../helper/SymbolDraw */ "./node_modules/echarts/lib/chart/helper/SymbolDraw.js");

var SymbolClz = __webpack_require__(/*! ../helper/Symbol */ "./node_modules/echarts/lib/chart/helper/Symbol.js");

var lineAnimationDiff = __webpack_require__(/*! ./lineAnimationDiff */ "./node_modules/echarts/lib/chart/line/lineAnimationDiff.js");

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var modelUtil = __webpack_require__(/*! ../../util/model */ "./node_modules/echarts/lib/util/model.js");

var _poly = __webpack_require__(/*! ./poly */ "./node_modules/echarts/lib/chart/line/poly.js");

var Polyline = _poly.Polyline;
var Polygon = _poly.Polygon;

var ChartView = __webpack_require__(/*! ../../view/Chart */ "./node_modules/echarts/lib/view/Chart.js");

var _number = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

var round = _number.round;

var _helper = __webpack_require__(/*! ./helper */ "./node_modules/echarts/lib/chart/line/helper.js");

var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
var getStackedOnPoint = _helper.getStackedOnPoint;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME step not support polar
function isPointsSame(points1, points2) {
  if (points1.length !== points2.length) {
    return;
  }

  for (var i = 0; i < points1.length; i++) {
    var p1 = points1[i];
    var p2 = points2[i];

    if (p1[0] !== p2[0] || p1[1] !== p2[1]) {
      return;
    }
  }

  return true;
}

function getSmooth(smooth) {
  return typeof smooth === 'number' ? smooth : smooth ? 0.5 : 0;
}

function getAxisExtentWithGap(axis) {
  var extent = axis.getGlobalExtent();

  if (axis.onBand) {
    // Remove extra 1px to avoid line miter in clipped edge
    var halfBandWidth = axis.getBandWidth() / 2 - 1;
    var dir = extent[1] > extent[0] ? 1 : -1;
    extent[0] += dir * halfBandWidth;
    extent[1] -= dir * halfBandWidth;
  }

  return extent;
}
/**
 * @param {module:echarts/coord/cartesian/Cartesian2D|module:echarts/coord/polar/Polar} coordSys
 * @param {module:echarts/data/List} data
 * @param {Object} dataCoordInfo
 * @param {Array.<Array.<number>>} points
 */


function getStackedOnPoints(coordSys, data, dataCoordInfo) {
  if (!dataCoordInfo.valueDim) {
    return [];
  }

  var points = [];

  for (var idx = 0, len = data.count(); idx < len; idx++) {
    points.push(getStackedOnPoint(dataCoordInfo, coordSys, data, idx));
  }

  return points;
}

function createGridClipShape(cartesian, hasAnimation, forSymbol, seriesModel) {
  var xExtent = getAxisExtentWithGap(cartesian.getAxis('x'));
  var yExtent = getAxisExtentWithGap(cartesian.getAxis('y'));
  var isHorizontal = cartesian.getBaseAxis().isHorizontal();
  var x = Math.min(xExtent[0], xExtent[1]);
  var y = Math.min(yExtent[0], yExtent[1]);
  var width = Math.max(xExtent[0], xExtent[1]) - x;
  var height = Math.max(yExtent[0], yExtent[1]) - y; // Avoid float number rounding error for symbol on the edge of axis extent.
  // See #7913 and `test/dataZoom-clip.html`.

  if (forSymbol) {
    x -= 0.5;
    width += 0.5;
    y -= 0.5;
    height += 0.5;
  } else {
    var lineWidth = seriesModel.get('lineStyle.width') || 2; // Expand clip shape to avoid clipping when line value exceeds axis

    var expandSize = seriesModel.get('clipOverflow') ? lineWidth / 2 : Math.max(width, height);

    if (isHorizontal) {
      y -= expandSize;
      height += expandSize * 2;
    } else {
      x -= expandSize;
      width += expandSize * 2;
    }
  }

  var clipPath = new graphic.Rect({
    shape: {
      x: x,
      y: y,
      width: width,
      height: height
    }
  });

  if (hasAnimation) {
    clipPath.shape[isHorizontal ? 'width' : 'height'] = 0;
    graphic.initProps(clipPath, {
      shape: {
        width: width,
        height: height
      }
    }, seriesModel);
  }

  return clipPath;
}

function createPolarClipShape(polar, hasAnimation, forSymbol, seriesModel) {
  var angleAxis = polar.getAngleAxis();
  var radiusAxis = polar.getRadiusAxis();
  var radiusExtent = radiusAxis.getExtent().slice();
  radiusExtent[0] > radiusExtent[1] && radiusExtent.reverse();
  var angleExtent = angleAxis.getExtent();
  var RADIAN = Math.PI / 180; // Avoid float number rounding error for symbol on the edge of axis extent.

  if (forSymbol) {
    radiusExtent[0] -= 0.5;
    radiusExtent[1] += 0.5;
  }

  var clipPath = new graphic.Sector({
    shape: {
      cx: round(polar.cx, 1),
      cy: round(polar.cy, 1),
      r0: round(radiusExtent[0], 1),
      r: round(radiusExtent[1], 1),
      startAngle: -angleExtent[0] * RADIAN,
      endAngle: -angleExtent[1] * RADIAN,
      clockwise: angleAxis.inverse
    }
  });

  if (hasAnimation) {
    clipPath.shape.endAngle = -angleExtent[0] * RADIAN;
    graphic.initProps(clipPath, {
      shape: {
        endAngle: -angleExtent[1] * RADIAN
      }
    }, seriesModel);
  }

  return clipPath;
}

function createClipShape(coordSys, hasAnimation, forSymbol, seriesModel) {
  return coordSys.type === 'polar' ? createPolarClipShape(coordSys, hasAnimation, forSymbol, seriesModel) : createGridClipShape(coordSys, hasAnimation, forSymbol, seriesModel);
}

function turnPointsIntoStep(points, coordSys, stepTurnAt) {
  var baseAxis = coordSys.getBaseAxis();
  var baseIndex = baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1;
  var stepPoints = [];

  for (var i = 0; i < points.length - 1; i++) {
    var nextPt = points[i + 1];
    var pt = points[i];
    stepPoints.push(pt);
    var stepPt = [];

    switch (stepTurnAt) {
      case 'end':
        stepPt[baseIndex] = nextPt[baseIndex];
        stepPt[1 - baseIndex] = pt[1 - baseIndex]; // default is start

        stepPoints.push(stepPt);
        break;

      case 'middle':
        // default is start
        var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
        var stepPt2 = [];
        stepPt[baseIndex] = stepPt2[baseIndex] = middle;
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt);
        stepPoints.push(stepPt2);
        break;

      default:
        stepPt[baseIndex] = pt[baseIndex];
        stepPt[1 - baseIndex] = nextPt[1 - baseIndex]; // default is start

        stepPoints.push(stepPt);
    }
  } // Last points


  points[i] && stepPoints.push(points[i]);
  return stepPoints;
}

function getVisualGradient(data, coordSys) {
  var visualMetaList = data.getVisual('visualMeta');

  if (!visualMetaList || !visualMetaList.length || !data.count()) {
    // When data.count() is 0, gradient range can not be calculated.
    return;
  }

  if (coordSys.type !== 'cartesian2d') {
    return;
  }

  var coordDim;
  var visualMeta;

  for (var i = visualMetaList.length - 1; i >= 0; i--) {
    var dimIndex = visualMetaList[i].dimension;
    var dimName = data.dimensions[dimIndex];
    var dimInfo = data.getDimensionInfo(dimName);
    coordDim = dimInfo && dimInfo.coordDim; // Can only be x or y

    if (coordDim === 'x' || coordDim === 'y') {
      visualMeta = visualMetaList[i];
      break;
    }
  }

  if (!visualMeta) {
    return;
  } // If the area to be rendered is bigger than area defined by LinearGradient,
  // the canvas spec prescribes that the color of the first stop and the last
  // stop should be used. But if two stops are added at offset 0, in effect
  // browsers use the color of the second stop to render area outside
  // LinearGradient. So we can only infinitesimally extend area defined in
  // LinearGradient to render `outerColors`.


  var axis = coordSys.getAxis(coordDim); // dataToCoor mapping may not be linear, but must be monotonic.

  var colorStops = zrUtil.map(visualMeta.stops, function (stop) {
    return {
      coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
      color: stop.color
    };
  });
  var stopLen = colorStops.length;
  var outerColors = visualMeta.outerColors.slice();

  if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
    colorStops.reverse();
    outerColors.reverse();
  }

  var tinyExtent = 10; // Arbitrary value: 10px

  var minCoord = colorStops[0].coord - tinyExtent;
  var maxCoord = colorStops[stopLen - 1].coord + tinyExtent;
  var coordSpan = maxCoord - minCoord;

  if (coordSpan < 1e-3) {
    return 'transparent';
  }

  zrUtil.each(colorStops, function (stop) {
    stop.offset = (stop.coord - minCoord) / coordSpan;
  });
  colorStops.push({
    offset: stopLen ? colorStops[stopLen - 1].offset : 0.5,
    color: outerColors[1] || 'transparent'
  });
  colorStops.unshift({
    // notice colorStops.length have been changed.
    offset: stopLen ? colorStops[0].offset : 0.5,
    color: outerColors[0] || 'transparent'
  }); // zrUtil.each(colorStops, function (colorStop) {
  //     // Make sure each offset has rounded px to avoid not sharp edge
  //     colorStop.offset = (Math.round(colorStop.offset * (end - start) + start) - start) / (end - start);
  // });

  var gradient = new graphic.LinearGradient(0, 0, 0, 0, colorStops, true);
  gradient[coordDim] = minCoord;
  gradient[coordDim + '2'] = maxCoord;
  return gradient;
}

function getIsIgnoreFunc(seriesModel, data, coordSys) {
  var showAllSymbol = seriesModel.get('showAllSymbol');
  var isAuto = showAllSymbol === 'auto';

  if (showAllSymbol && !isAuto) {
    return;
  }

  var categoryAxis = coordSys.getAxesByScale('ordinal')[0];

  if (!categoryAxis) {
    return;
  } // Note that category label interval strategy might bring some weird effect
  // in some scenario: users may wonder why some of the symbols are not
  // displayed. So we show all symbols as possible as we can.


  if (isAuto // Simplify the logic, do not determine label overlap here.
  && canShowAllSymbolForCategory(categoryAxis, data)) {
    return;
  } // Otherwise follow the label interval strategy on category axis.


  var categoryDataDim = data.mapDimension(categoryAxis.dim);
  var labelMap = {};
  zrUtil.each(categoryAxis.getViewLabels(), function (labelItem) {
    labelMap[labelItem.tickValue] = 1;
  });
  return function (dataIndex) {
    return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
  };
}

function canShowAllSymbolForCategory(categoryAxis, data) {
  // In mose cases, line is monotonous on category axis, and the label size
  // is close with each other. So we check the symbol size and some of the
  // label size alone with the category axis to estimate whether all symbol
  // can be shown without overlap.
  var axisExtent = categoryAxis.getExtent();
  var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
  isNaN(availSize) && (availSize = 0); // 0/0 is NaN.
  // Sampling some points, max 5.

  var dataLen = data.count();
  var step = Math.max(1, Math.round(dataLen / 5));

  for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
    if (SymbolClz.getSymbolSize(data, dataIndex // Only for cartesian, where `isHorizontal` exists.
    )[categoryAxis.isHorizontal() ? 1 : 0] // Empirical number
    * 1.5 > availSize) {
      return false;
    }
  }

  return true;
}

var _default = ChartView.extend({
  type: 'line',
  init: function () {
    var lineGroup = new graphic.Group();
    var symbolDraw = new SymbolDraw();
    this.group.add(symbolDraw.group);
    this._symbolDraw = symbolDraw;
    this._lineGroup = lineGroup;
  },
  render: function (seriesModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var group = this.group;
    var data = seriesModel.getData();
    var lineStyleModel = seriesModel.getModel('lineStyle');
    var areaStyleModel = seriesModel.getModel('areaStyle');
    var points = data.mapArray(data.getItemLayout);
    var isCoordSysPolar = coordSys.type === 'polar';
    var prevCoordSys = this._coordSys;
    var symbolDraw = this._symbolDraw;
    var polyline = this._polyline;
    var polygon = this._polygon;
    var lineGroup = this._lineGroup;
    var hasAnimation = seriesModel.get('animation');
    var isAreaChart = !areaStyleModel.isEmpty();
    var valueOrigin = areaStyleModel.get('origin');
    var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
    var stackedOnPoints = getStackedOnPoints(coordSys, data, dataCoordInfo);
    var showSymbol = seriesModel.get('showSymbol');
    var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys); // Remove temporary symbols

    var oldData = this._data;
    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    }); // Remove previous created symbols if showSymbol changed to false

    if (!showSymbol) {
      symbolDraw.remove();
    }

    group.add(lineGroup); // FIXME step not support polar

    var step = !isCoordSysPolar && seriesModel.get('step'); // Initialization animation or coordinate system changed

    if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: createClipShape(coordSys, false, true, seriesModel)
      });

      if (step) {
        // TODO If stacked series is not step
        points = turnPointsIntoStep(points, coordSys, step);
        stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
      }

      polyline = this._newPolyline(points, coordSys, hasAnimation);

      if (isAreaChart) {
        polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation);
      }

      lineGroup.setClipPath(createClipShape(coordSys, true, false, seriesModel));
    } else {
      if (isAreaChart && !polygon) {
        // If areaStyle is added
        polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation);
      } else if (polygon && !isAreaChart) {
        // If areaStyle is removed
        lineGroup.remove(polygon);
        polygon = this._polygon = null;
      } // Update clipPath


      lineGroup.setClipPath(createClipShape(coordSys, false, false, seriesModel)); // Always update, or it is wrong in the case turning on legend
      // because points are not changed

      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: createClipShape(coordSys, false, true, seriesModel)
      }); // Stop symbol animation and sync with line points
      // FIXME performance?

      data.eachItemGraphicEl(function (el) {
        el.stopAnimation(true);
      }); // In the case data zoom triggerred refreshing frequently
      // Data may not change if line has a category axis. So it should animate nothing

      if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points)) {
        if (hasAnimation) {
          this._updateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin);
        } else {
          // Not do it in update with animation
          if (step) {
            // TODO If stacked series is not step
            points = turnPointsIntoStep(points, coordSys, step);
            stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
          }

          polyline.setShape({
            points: points
          });
          polygon && polygon.setShape({
            points: points,
            stackedOnPoints: stackedOnPoints
          });
        }
      }
    }

    var visualColor = getVisualGradient(data, coordSys) || data.getVisual('color');
    polyline.useStyle(zrUtil.defaults( // Use color in lineStyle first
    lineStyleModel.getLineStyle(), {
      fill: 'none',
      stroke: visualColor,
      lineJoin: 'bevel'
    }));
    var smooth = seriesModel.get('smooth');
    smooth = getSmooth(seriesModel.get('smooth'));
    polyline.setShape({
      smooth: smooth,
      smoothMonotone: seriesModel.get('smoothMonotone'),
      connectNulls: seriesModel.get('connectNulls')
    });

    if (polygon) {
      var stackedOnSeries = data.getCalculationInfo('stackedOnSeries');
      var stackedOnSmooth = 0;
      polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
        fill: visualColor,
        opacity: 0.7,
        lineJoin: 'bevel'
      }));

      if (stackedOnSeries) {
        stackedOnSmooth = getSmooth(stackedOnSeries.get('smooth'));
      }

      polygon.setShape({
        smooth: smooth,
        stackedOnSmooth: stackedOnSmooth,
        smoothMonotone: seriesModel.get('smoothMonotone'),
        connectNulls: seriesModel.get('connectNulls')
      });
    }

    this._data = data; // Save the coordinate system for transition animation when data changed

    this._coordSys = coordSys;
    this._stackedOnPoints = stackedOnPoints;
    this._points = points;
    this._step = step;
    this._valueOrigin = valueOrigin;
  },
  dispose: function () {},
  highlight: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (!symbol) {
        // Create a temporary symbol if it is not exists
        var pt = data.getItemLayout(dataIndex);

        if (!pt) {
          // Null data
          return;
        }

        symbol = new SymbolClz(data, dataIndex);
        symbol.position = pt;
        symbol.setZ(seriesModel.get('zlevel'), seriesModel.get('z'));
        symbol.ignore = isNaN(pt[0]) || isNaN(pt[1]);
        symbol.__temp = true;
        data.setItemGraphicEl(dataIndex, symbol); // Stop scale animation

        symbol.stopSymbolAnimation(true);
        this.group.add(symbol);
      }

      symbol.highlight();
    } else {
      // Highlight whole series
      ChartView.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
    }
  },
  downplay: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    if (dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (symbol) {
        if (symbol.__temp) {
          data.setItemGraphicEl(dataIndex, null);
          this.group.remove(symbol);
        } else {
          symbol.downplay();
        }
      }
    } else {
      // FIXME
      // can not downplay completely.
      // Downplay whole series
      ChartView.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
    }
  },

  /**
   * @param {module:zrender/container/Group} group
   * @param {Array.<Array.<number>>} points
   * @private
   */
  _newPolyline: function (points) {
    var polyline = this._polyline; // Remove previous created polyline

    if (polyline) {
      this._lineGroup.remove(polyline);
    }

    polyline = new Polyline({
      shape: {
        points: points
      },
      silent: true,
      z2: 10
    });

    this._lineGroup.add(polyline);

    this._polyline = polyline;
    return polyline;
  },

  /**
   * @param {module:zrender/container/Group} group
   * @param {Array.<Array.<number>>} stackedOnPoints
   * @param {Array.<Array.<number>>} points
   * @private
   */
  _newPolygon: function (points, stackedOnPoints) {
    var polygon = this._polygon; // Remove previous created polygon

    if (polygon) {
      this._lineGroup.remove(polygon);
    }

    polygon = new Polygon({
      shape: {
        points: points,
        stackedOnPoints: stackedOnPoints
      },
      silent: true
    });

    this._lineGroup.add(polygon);

    this._polygon = polygon;
    return polygon;
  },

  /**
   * @private
   */
  // FIXME Two value axis
  _updateAnimation: function (data, stackedOnPoints, coordSys, api, step, valueOrigin) {
    var polyline = this._polyline;
    var polygon = this._polygon;
    var seriesModel = data.hostModel;
    var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
    var current = diff.current;
    var stackedOnCurrent = diff.stackedOnCurrent;
    var next = diff.next;
    var stackedOnNext = diff.stackedOnNext;

    if (step) {
      // TODO If stacked series is not step
      current = turnPointsIntoStep(diff.current, coordSys, step);
      stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step);
      next = turnPointsIntoStep(diff.next, coordSys, step);
      stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step);
    } // `diff.current` is subset of `current` (which should be ensured by
    // turnPointsIntoStep), so points in `__points` can be updated when
    // points in `current` are update during animation.


    polyline.shape.__points = diff.current;
    polyline.shape.points = current;
    graphic.updateProps(polyline, {
      shape: {
        points: next
      }
    }, seriesModel);

    if (polygon) {
      polygon.setShape({
        points: current,
        stackedOnPoints: stackedOnCurrent
      });
      graphic.updateProps(polygon, {
        shape: {
          points: next,
          stackedOnPoints: stackedOnNext
        }
      }, seriesModel);
    }

    var updatedDataInfo = [];
    var diffStatus = diff.status;

    for (var i = 0; i < diffStatus.length; i++) {
      var cmd = diffStatus[i].cmd;

      if (cmd === '=') {
        var el = data.getItemGraphicEl(diffStatus[i].idx1);

        if (el) {
          updatedDataInfo.push({
            el: el,
            ptIdx: i // Index of points

          });
        }
      }
    }

    if (polyline.animators && polyline.animators.length) {
      polyline.animators[0].during(function () {
        for (var i = 0; i < updatedDataInfo.length; i++) {
          var el = updatedDataInfo[i].el;
          el.attr('position', polyline.shape.__points[updatedDataInfo[i].ptIdx]);
        }
      });
    }
  },
  remove: function (ecModel) {
    var group = this.group;
    var oldData = this._data;

    this._lineGroup.removeAll();

    this._symbolDraw.remove(true); // Remove temporary created elements when highlighting


    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    });
    this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
  }
});

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/helper.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/helper.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _dataStackHelper = __webpack_require__(/*! ../../data/helper/dataStackHelper */ "./node_modules/echarts/lib/data/helper/dataStackHelper.js");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var map = _util.map;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @param {Object} coordSys
 * @param {module:echarts/data/List} data
 * @param {string} valueOrigin lineSeries.option.areaStyle.origin
 */
function prepareDataCoordInfo(coordSys, data, valueOrigin) {
  var baseAxis = coordSys.getBaseAxis();
  var valueAxis = coordSys.getOtherAxis(baseAxis);
  var valueStart = getValueStart(valueAxis, valueOrigin);
  var baseAxisDim = baseAxis.dim;
  var valueAxisDim = valueAxis.dim;
  var valueDim = data.mapDimension(valueAxisDim);
  var baseDim = data.mapDimension(baseAxisDim);
  var baseDataOffset = valueAxisDim === 'x' || valueAxisDim === 'radius' ? 1 : 0;
  var dims = map(coordSys.dimensions, function (coordDim) {
    return data.mapDimension(coordDim);
  });
  var stacked;
  var stackResultDim = data.getCalculationInfo('stackResultDimension');

  if (stacked |= isDimensionStacked(data, dims[0]
  /*, dims[1]*/
  )) {
    // jshint ignore:line
    dims[0] = stackResultDim;
  }

  if (stacked |= isDimensionStacked(data, dims[1]
  /*, dims[0]*/
  )) {
    // jshint ignore:line
    dims[1] = stackResultDim;
  }

  return {
    dataDimsForPoint: dims,
    valueStart: valueStart,
    valueAxisDim: valueAxisDim,
    baseAxisDim: baseAxisDim,
    stacked: !!stacked,
    valueDim: valueDim,
    baseDim: baseDim,
    baseDataOffset: baseDataOffset,
    stackedOverDimension: data.getCalculationInfo('stackedOverDimension')
  };
}

function getValueStart(valueAxis, valueOrigin) {
  var valueStart = 0;
  var extent = valueAxis.scale.getExtent();

  if (valueOrigin === 'start') {
    valueStart = extent[0];
  } else if (valueOrigin === 'end') {
    valueStart = extent[1];
  } // auto
  else {
      // Both positive
      if (extent[0] > 0) {
        valueStart = extent[0];
      } // Both negative
      else if (extent[1] < 0) {
          valueStart = extent[1];
        } // If is one positive, and one negative, onZero shall be true

    }

  return valueStart;
}

function getStackedOnPoint(dataCoordInfo, coordSys, data, idx) {
  var value = NaN;

  if (dataCoordInfo.stacked) {
    value = data.get(data.getCalculationInfo('stackedOverDimension'), idx);
  }

  if (isNaN(value)) {
    value = dataCoordInfo.valueStart;
  }

  var baseDataOffset = dataCoordInfo.baseDataOffset;
  var stackedData = [];
  stackedData[baseDataOffset] = data.get(dataCoordInfo.baseDim, idx);
  stackedData[1 - baseDataOffset] = value;
  return coordSys.dataToPoint(stackedData);
}

exports.prepareDataCoordInfo = prepareDataCoordInfo;
exports.getStackedOnPoint = getStackedOnPoint;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/lineAnimationDiff.js":
/*!******************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/lineAnimationDiff.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _helper = __webpack_require__(/*! ./helper */ "./node_modules/echarts/lib/chart/line/helper.js");

var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
var getStackedOnPoint = _helper.getStackedOnPoint;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// var arrayDiff = require('zrender/src/core/arrayDiff');
// 'zrender/src/core/arrayDiff' has been used before, but it did
// not do well in performance when roam with fixed dataZoom window.
// function convertToIntId(newIdList, oldIdList) {
//     // Generate int id instead of string id.
//     // Compare string maybe slow in score function of arrDiff
//     // Assume id in idList are all unique
//     var idIndicesMap = {};
//     var idx = 0;
//     for (var i = 0; i < newIdList.length; i++) {
//         idIndicesMap[newIdList[i]] = idx;
//         newIdList[i] = idx++;
//     }
//     for (var i = 0; i < oldIdList.length; i++) {
//         var oldId = oldIdList[i];
//         // Same with newIdList
//         if (idIndicesMap[oldId]) {
//             oldIdList[i] = idIndicesMap[oldId];
//         }
//         else {
//             oldIdList[i] = idx++;
//         }
//     }
// }
function diffData(oldData, newData) {
  var diffResult = [];
  newData.diff(oldData).add(function (idx) {
    diffResult.push({
      cmd: '+',
      idx: idx
    });
  }).update(function (newIdx, oldIdx) {
    diffResult.push({
      cmd: '=',
      idx: oldIdx,
      idx1: newIdx
    });
  }).remove(function (idx) {
    diffResult.push({
      cmd: '-',
      idx: idx
    });
  }).execute();
  return diffResult;
}

function _default(oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys, oldValueOrigin, newValueOrigin) {
  var diff = diffData(oldData, newData); // var newIdList = newData.mapArray(newData.getId);
  // var oldIdList = oldData.mapArray(oldData.getId);
  // convertToIntId(newIdList, oldIdList);
  // // FIXME One data ?
  // diff = arrayDiff(oldIdList, newIdList);

  var currPoints = [];
  var nextPoints = []; // Points for stacking base line

  var currStackedPoints = [];
  var nextStackedPoints = [];
  var status = [];
  var sortedIndices = [];
  var rawIndices = [];
  var newDataOldCoordInfo = prepareDataCoordInfo(oldCoordSys, newData, oldValueOrigin);
  var oldDataNewCoordInfo = prepareDataCoordInfo(newCoordSys, oldData, newValueOrigin);

  for (var i = 0; i < diff.length; i++) {
    var diffItem = diff[i];
    var pointAdded = true; // FIXME, animation is not so perfect when dataZoom window moves fast
    // Which is in case remvoing or add more than one data in the tail or head

    switch (diffItem.cmd) {
      case '=':
        var currentPt = oldData.getItemLayout(diffItem.idx);
        var nextPt = newData.getItemLayout(diffItem.idx1); // If previous data is NaN, use next point directly

        if (isNaN(currentPt[0]) || isNaN(currentPt[1])) {
          currentPt = nextPt.slice();
        }

        currPoints.push(currentPt);
        nextPoints.push(nextPt);
        currStackedPoints.push(oldStackedOnPoints[diffItem.idx]);
        nextStackedPoints.push(newStackedOnPoints[diffItem.idx1]);
        rawIndices.push(newData.getRawIndex(diffItem.idx1));
        break;

      case '+':
        var idx = diffItem.idx;
        currPoints.push(oldCoordSys.dataToPoint([newData.get(newDataOldCoordInfo.dataDimsForPoint[0], idx), newData.get(newDataOldCoordInfo.dataDimsForPoint[1], idx)]));
        nextPoints.push(newData.getItemLayout(idx).slice());
        currStackedPoints.push(getStackedOnPoint(newDataOldCoordInfo, oldCoordSys, newData, idx));
        nextStackedPoints.push(newStackedOnPoints[idx]);
        rawIndices.push(newData.getRawIndex(idx));
        break;

      case '-':
        var idx = diffItem.idx;
        var rawIndex = oldData.getRawIndex(idx); // Data is replaced. In the case of dynamic data queue
        // FIXME FIXME FIXME

        if (rawIndex !== idx) {
          currPoints.push(oldData.getItemLayout(idx));
          nextPoints.push(newCoordSys.dataToPoint([oldData.get(oldDataNewCoordInfo.dataDimsForPoint[0], idx), oldData.get(oldDataNewCoordInfo.dataDimsForPoint[1], idx)]));
          currStackedPoints.push(oldStackedOnPoints[idx]);
          nextStackedPoints.push(getStackedOnPoint(oldDataNewCoordInfo, newCoordSys, oldData, idx));
          rawIndices.push(rawIndex);
        } else {
          pointAdded = false;
        }

    } // Original indices


    if (pointAdded) {
      status.push(diffItem);
      sortedIndices.push(sortedIndices.length);
    }
  } // Diff result may be crossed if all items are changed
  // Sort by data index


  sortedIndices.sort(function (a, b) {
    return rawIndices[a] - rawIndices[b];
  });
  var sortedCurrPoints = [];
  var sortedNextPoints = [];
  var sortedCurrStackedPoints = [];
  var sortedNextStackedPoints = [];
  var sortedStatus = [];

  for (var i = 0; i < sortedIndices.length; i++) {
    var idx = sortedIndices[i];
    sortedCurrPoints[i] = currPoints[idx];
    sortedNextPoints[i] = nextPoints[idx];
    sortedCurrStackedPoints[i] = currStackedPoints[idx];
    sortedNextStackedPoints[i] = nextStackedPoints[idx];
    sortedStatus[i] = status[idx];
  }

  return {
    current: sortedCurrPoints,
    next: sortedNextPoints,
    stackedOnCurrent: sortedCurrStackedPoints,
    stackedOnNext: sortedNextStackedPoints,
    status: sortedStatus
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/poly.js":
/*!*****************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/poly.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Path = __webpack_require__(/*! zrender/lib/graphic/Path */ "./node_modules/zrender/lib/graphic/Path.js");

var vec2 = __webpack_require__(/*! zrender/lib/core/vector */ "./node_modules/zrender/lib/core/vector.js");

var fixClipWithShadow = __webpack_require__(/*! zrender/lib/graphic/helper/fixClipWithShadow */ "./node_modules/zrender/lib/graphic/helper/fixClipWithShadow.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Poly path support NaN point
var vec2Min = vec2.min;
var vec2Max = vec2.max;
var scaleAndAdd = vec2.scaleAndAdd;
var v2Copy = vec2.copy; // Temporary variable

var v = [];
var cp0 = [];
var cp1 = [];

function isPointNull(p) {
  return isNaN(p[0]) || isNaN(p[1]);
}

function drawSegment(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  // if (smoothMonotone == null) {
  //     if (isMono(points, 'x')) {
  //         return drawMono(ctx, points, start, segLen, allLen,
  //             dir, smoothMin, smoothMax, smooth, 'x', connectNulls);
  //     }
  //     else if (isMono(points, 'y')) {
  //         return drawMono(ctx, points, start, segLen, allLen,
  //             dir, smoothMin, smoothMax, smooth, 'y', connectNulls);
  //     }
  //     else {
  //         return drawNonMono.apply(this, arguments);
  //     }
  // }
  // else if (smoothMonotone !== 'none' && isMono(points, smoothMonotone)) {
  //     return drawMono.apply(this, arguments);
  // }
  // else {
  //     return drawNonMono.apply(this, arguments);
  // }
  if (smoothMonotone === 'none' || !smoothMonotone) {
    return drawNonMono.apply(this, arguments);
  } else {
    return drawMono.apply(this, arguments);
  }
}
/**
 * Check if points is in monotone.
 *
 * @param {number[][]} points         Array of points which is in [x, y] form
 * @param {string}     smoothMonotone 'x', 'y', or 'none', stating for which
 *                                    dimension that is checking.
 *                                    If is 'none', `drawNonMono` should be
 *                                    called.
 *                                    If is undefined, either being monotone
 *                                    in 'x' or 'y' will call `drawMono`.
 */
// function isMono(points, smoothMonotone) {
//     if (points.length <= 1) {
//         return true;
//     }
//     var dim = smoothMonotone === 'x' ? 0 : 1;
//     var last = points[0][dim];
//     var lastDiff = 0;
//     for (var i = 1; i < points.length; ++i) {
//         var diff = points[i][dim] - last;
//         if (!isNaN(diff) && !isNaN(lastDiff)
//             && diff !== 0 && lastDiff !== 0
//             && ((diff >= 0) !== (lastDiff >= 0))
//         ) {
//             return false;
//         }
//         if (!isNaN(diff) && diff !== 0) {
//             lastDiff = diff;
//             last = points[i][dim];
//         }
//     }
//     return true;
// }

/**
 * Draw smoothed line in monotone, in which only vertical or horizontal bezier
 * control points will be used. This should be used when points are monotone
 * either in x or y dimension.
 */


function drawMono(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  var prevIdx = 0;
  var idx = start;

  for (var k = 0; k < segLen; k++) {
    var p = points[idx];

    if (idx >= allLen || idx < 0) {
      break;
    }

    if (isPointNull(p)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }

      break;
    }

    if (idx === start) {
      ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
    } else {
      if (smooth > 0) {
        var prevP = points[prevIdx];
        var dim = smoothMonotone === 'y' ? 1 : 0; // Length of control point to p, either in x or y, but not both

        var ctrlLen = (p[dim] - prevP[dim]) * smooth;
        v2Copy(cp0, prevP);
        cp0[dim] = prevP[dim] + ctrlLen;
        v2Copy(cp1, p);
        cp1[dim] = p[dim] - ctrlLen;
        ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    }

    prevIdx = idx;
    idx += dir;
  }

  return k;
}
/**
 * Draw smoothed line in non-monotone, in may cause undesired curve in extreme
 * situations. This should be used when points are non-monotone neither in x or
 * y dimension.
 */


function drawNonMono(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  var prevIdx = 0;
  var idx = start;

  for (var k = 0; k < segLen; k++) {
    var p = points[idx];

    if (idx >= allLen || idx < 0) {
      break;
    }

    if (isPointNull(p)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }

      break;
    }

    if (idx === start) {
      ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
      v2Copy(cp0, p);
    } else {
      if (smooth > 0) {
        var nextIdx = idx + dir;
        var nextP = points[nextIdx];

        if (connectNulls) {
          // Find next point not null
          while (nextP && isPointNull(points[nextIdx])) {
            nextIdx += dir;
            nextP = points[nextIdx];
          }
        }

        var ratioNextSeg = 0.5;
        var prevP = points[prevIdx];
        var nextP = points[nextIdx]; // Last point

        if (!nextP || isPointNull(nextP)) {
          v2Copy(cp1, p);
        } else {
          // If next data is null in not connect case
          if (isPointNull(nextP) && !connectNulls) {
            nextP = p;
          }

          vec2.sub(v, nextP, prevP);
          var lenPrevSeg;
          var lenNextSeg;

          if (smoothMonotone === 'x' || smoothMonotone === 'y') {
            var dim = smoothMonotone === 'x' ? 0 : 1;
            lenPrevSeg = Math.abs(p[dim] - prevP[dim]);
            lenNextSeg = Math.abs(p[dim] - nextP[dim]);
          } else {
            lenPrevSeg = vec2.dist(p, prevP);
            lenNextSeg = vec2.dist(p, nextP);
          } // Use ratio of seg length


          ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);
          scaleAndAdd(cp1, p, v, -smooth * (1 - ratioNextSeg));
        } // Smooth constraint


        vec2Min(cp0, cp0, smoothMax);
        vec2Max(cp0, cp0, smoothMin);
        vec2Min(cp1, cp1, smoothMax);
        vec2Max(cp1, cp1, smoothMin);
        ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]); // cp0 of next segment

        scaleAndAdd(cp0, p, v, smooth * ratioNextSeg);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    }

    prevIdx = idx;
    idx += dir;
  }

  return k;
}

function getBoundingBox(points, smoothConstraint) {
  var ptMin = [Infinity, Infinity];
  var ptMax = [-Infinity, -Infinity];

  if (smoothConstraint) {
    for (var i = 0; i < points.length; i++) {
      var pt = points[i];

      if (pt[0] < ptMin[0]) {
        ptMin[0] = pt[0];
      }

      if (pt[1] < ptMin[1]) {
        ptMin[1] = pt[1];
      }

      if (pt[0] > ptMax[0]) {
        ptMax[0] = pt[0];
      }

      if (pt[1] > ptMax[1]) {
        ptMax[1] = pt[1];
      }
    }
  }

  return {
    min: smoothConstraint ? ptMin : ptMax,
    max: smoothConstraint ? ptMax : ptMin
  };
}

var Polyline = Path.extend({
  type: 'ec-polyline',
  shape: {
    points: [],
    smooth: 0,
    smoothConstraint: true,
    smoothMonotone: null,
    connectNulls: false
  },
  style: {
    fill: null,
    stroke: '#000'
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var points = shape.points;
    var i = 0;
    var len = points.length;
    var result = getBoundingBox(points, shape.smoothConstraint);

    if (shape.connectNulls) {
      // Must remove first and last null values avoid draw error in polygon
      for (; len > 0; len--) {
        if (!isPointNull(points[len - 1])) {
          break;
        }
      }

      for (; i < len; i++) {
        if (!isPointNull(points[i])) {
          break;
        }
      }
    }

    while (i < len) {
      i += drawSegment(ctx, points, i, len, len, 1, result.min, result.max, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1;
    }
  }
});
var Polygon = Path.extend({
  type: 'ec-polygon',
  shape: {
    points: [],
    // Offset between stacked base points and points
    stackedOnPoints: [],
    smooth: 0,
    stackedOnSmooth: 0,
    smoothConstraint: true,
    smoothMonotone: null,
    connectNulls: false
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var points = shape.points;
    var stackedOnPoints = shape.stackedOnPoints;
    var i = 0;
    var len = points.length;
    var smoothMonotone = shape.smoothMonotone;
    var bbox = getBoundingBox(points, shape.smoothConstraint);
    var stackedOnBBox = getBoundingBox(stackedOnPoints, shape.smoothConstraint);

    if (shape.connectNulls) {
      // Must remove first and last null values avoid draw error in polygon
      for (; len > 0; len--) {
        if (!isPointNull(points[len - 1])) {
          break;
        }
      }

      for (; i < len; i++) {
        if (!isPointNull(points[i])) {
          break;
        }
      }
    }

    while (i < len) {
      var k = drawSegment(ctx, points, i, len, len, 1, bbox.min, bbox.max, shape.smooth, smoothMonotone, shape.connectNulls);
      drawSegment(ctx, stackedOnPoints, i + k - 1, k, len, -1, stackedOnBBox.min, stackedOnBBox.max, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls);
      i += k + 1;
      ctx.closePath();
    }
  }
});
exports.Polyline = Polyline;
exports.Polygon = Polygon;

/***/ }),

/***/ "./node_modules/echarts/lib/layout/points.js":
/*!***************************************************!*\
  !*** ./node_modules/echarts/lib/layout/points.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var map = _util.map;

var createRenderPlanner = __webpack_require__(/*! ../chart/helper/createRenderPlanner */ "./node_modules/echarts/lib/chart/helper/createRenderPlanner.js");

var _dataStackHelper = __webpack_require__(/*! ../data/helper/dataStackHelper */ "./node_modules/echarts/lib/data/helper/dataStackHelper.js");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType) {
  return {
    seriesType: seriesType,
    plan: createRenderPlanner(),
    reset: function (seriesModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var pipelineContext = seriesModel.pipelineContext;
      var isLargeRender = pipelineContext.large;

      if (!coordSys) {
        return;
      }

      var dims = map(coordSys.dimensions, function (dim) {
        return data.mapDimension(dim);
      }).slice(0, 2);
      var dimLen = dims.length;
      var stackResultDim = data.getCalculationInfo('stackResultDimension');

      if (isDimensionStacked(data, dims[0]
      /*, dims[1]*/
      )) {
        dims[0] = stackResultDim;
      }

      if (isDimensionStacked(data, dims[1]
      /*, dims[0]*/
      )) {
        dims[1] = stackResultDim;
      }

      function progress(params, data) {
        var segCount = params.end - params.start;
        var points = isLargeRender && new Float32Array(segCount * dimLen);

        for (var i = params.start, offset = 0, tmpIn = [], tmpOut = []; i < params.end; i++) {
          var point;

          if (dimLen === 1) {
            var x = data.get(dims[0], i);
            point = !isNaN(x) && coordSys.dataToPoint(x, null, tmpOut);
          } else {
            var x = tmpIn[0] = data.get(dims[0], i);
            var y = tmpIn[1] = data.get(dims[1], i); // Also {Array.<number>}, not undefined to avoid if...else... statement

            point = !isNaN(x) && !isNaN(y) && coordSys.dataToPoint(tmpIn, null, tmpOut);
          }

          if (isLargeRender) {
            points[offset++] = point ? point[0] : NaN;
            points[offset++] = point ? point[1] : NaN;
          } else {
            data.setItemLayout(i, point && point.slice() || [NaN, NaN]);
          }
        }

        isLargeRender && data.setLayout('symbolPoints', points);
      }

      return dimLen && {
        progress: progress
      };
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/processor/dataSample.js":
/*!**********************************************************!*\
  !*** ./node_modules/echarts/lib/processor/dataSample.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var samplers = {
  average: function (frame) {
    var sum = 0;
    var count = 0;

    for (var i = 0; i < frame.length; i++) {
      if (!isNaN(frame[i])) {
        sum += frame[i];
        count++;
      }
    } // Return NaN if count is 0


    return count === 0 ? NaN : sum / count;
  },
  sum: function (frame) {
    var sum = 0;

    for (var i = 0; i < frame.length; i++) {
      // Ignore NaN
      sum += frame[i] || 0;
    }

    return sum;
  },
  max: function (frame) {
    var max = -Infinity;

    for (var i = 0; i < frame.length; i++) {
      frame[i] > max && (max = frame[i]);
    } // NaN will cause illegal axis extent.


    return isFinite(max) ? max : NaN;
  },
  min: function (frame) {
    var min = Infinity;

    for (var i = 0; i < frame.length; i++) {
      frame[i] < min && (min = frame[i]);
    } // NaN will cause illegal axis extent.


    return isFinite(min) ? min : NaN;
  },
  // TODO
  // Median
  nearest: function (frame) {
    return frame[0];
  }
};

var indexSampler = function (frame, value) {
  return Math.round(frame.length / 2);
};

function _default(seriesType) {
  return {
    seriesType: seriesType,
    modifyOutputEnd: true,
    reset: function (seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var sampling = seriesModel.get('sampling');
      var coordSys = seriesModel.coordinateSystem; // Only cartesian2d support down sampling

      if (coordSys.type === 'cartesian2d' && sampling) {
        var baseAxis = coordSys.getBaseAxis();
        var valueAxis = coordSys.getOtherAxis(baseAxis);
        var extent = baseAxis.getExtent(); // Coordinste system has been resized

        var size = extent[1] - extent[0];
        var rate = Math.round(data.count() / size);

        if (rate > 1) {
          var sampler;

          if (typeof sampling === 'string') {
            sampler = samplers[sampling];
          } else if (typeof sampling === 'function') {
            sampler = sampling;
          }

          if (sampler) {
            // Only support sample the first dim mapped from value axis.
            seriesModel.setData(data.downSample(data.mapDimension(valueAxis.dim), 1 / rate, sampler, indexSampler));
          }
        }
      }
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/visual/symbol.js":
/*!***************************************************!*\
  !*** ./node_modules/echarts/lib/visual/symbol.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType, defaultSymbolType, legendSymbol) {
  // Encoding visual for all series include which is filtered for legend drawing
  return {
    seriesType: seriesType,
    // For legend.
    performRawSeries: true,
    reset: function (seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var symbolType = seriesModel.get('symbol') || defaultSymbolType;
      var symbolSize = seriesModel.get('symbolSize');
      var keepAspect = seriesModel.get('symbolKeepAspect');
      data.setVisual({
        legendSymbol: legendSymbol || symbolType,
        symbol: symbolType,
        symbolSize: symbolSize,
        symbolKeepAspect: keepAspect
      }); // Only visible series has each data be visual encoded

      if (ecModel.isSeriesFiltered(seriesModel)) {
        return;
      }

      var hasCallback = typeof symbolSize === 'function';

      function dataEach(data, idx) {
        if (typeof symbolSize === 'function') {
          var rawValue = seriesModel.getRawValue(idx); // FIXME

          var params = seriesModel.getDataParams(idx);
          data.setItemVisual(idx, 'symbolSize', symbolSize(rawValue, params));
        }

        if (data.hasItemOption) {
          var itemModel = data.getItemModel(idx);
          var itemSymbolType = itemModel.getShallow('symbol', true);
          var itemSymbolSize = itemModel.getShallow('symbolSize', true);
          var itemSymbolKeepAspect = itemModel.getShallow('symbolKeepAspect', true); // If has item symbol

          if (itemSymbolType != null) {
            data.setItemVisual(idx, 'symbol', itemSymbolType);
          }

          if (itemSymbolSize != null) {
            // PENDING Transform symbolSize ?
            data.setItemVisual(idx, 'symbolSize', itemSymbolSize);
          }

          if (itemSymbolKeepAspect != null) {
            data.setItemVisual(idx, 'symbolKeepAspect', itemSymbolKeepAspect);
          }
        }
      }

      return {
        dataEach: data.hasItemOption || hasCallback ? dataEach : null
      };
    }
  };
}

module.exports = _default;

/***/ })

}]);
//# sourceMappingURL=4.js.map