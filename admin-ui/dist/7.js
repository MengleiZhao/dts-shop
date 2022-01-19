(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/echarts/lib/chart/bar.js":
/*!***********************************************!*\
  !*** ./node_modules/echarts/lib/chart/bar.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__(/*! ../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var _barGrid = __webpack_require__(/*! ../layout/barGrid */ "./node_modules/echarts/lib/layout/barGrid.js");

var layout = _barGrid.layout;
var largeLayout = _barGrid.largeLayout;

__webpack_require__(/*! ../coord/cartesian/Grid */ "./node_modules/echarts/lib/coord/cartesian/Grid.js");

__webpack_require__(/*! ./bar/BarSeries */ "./node_modules/echarts/lib/chart/bar/BarSeries.js");

__webpack_require__(/*! ./bar/BarView */ "./node_modules/echarts/lib/chart/bar/BarView.js");

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
echarts.registerLayout(zrUtil.curry(layout, 'bar')); // Should after normal bar layout, otherwise it is blocked by normal bar layout.

echarts.registerLayout(largeLayout);
echarts.registerVisual({
  seriesType: 'bar',
  reset: function (seriesModel) {
    // Visual coding for legend
    seriesModel.getData().setVisual('legendSymbol', 'roundRect');
  }
});

/***/ }),

/***/ "./node_modules/echarts/lib/chart/bar/BarSeries.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/bar/BarSeries.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BaseBarSeries = __webpack_require__(/*! ./BaseBarSeries */ "./node_modules/echarts/lib/chart/bar/BaseBarSeries.js");

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
var _default = BaseBarSeries.extend({
  type: 'series.bar',
  dependencies: ['grid', 'polar'],
  brushSelector: 'rect',

  /**
   * @override
   */
  getProgressive: function () {
    // Do not support progressive in normal mode.
    return this.get('large') ? this.get('progressive') : false;
  },

  /**
   * @override
   */
  getProgressiveThreshold: function () {
    // Do not support progressive in normal mode.
    var progressiveThreshold = this.get('progressiveThreshold');
    var largeThreshold = this.get('largeThreshold');

    if (largeThreshold > progressiveThreshold) {
      progressiveThreshold = largeThreshold;
    }

    return progressiveThreshold;
  }
});

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/bar/BarView.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/chart/bar/BarView.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _config = __webpack_require__(/*! ../../config */ "./node_modules/echarts/lib/config.js");

var __DEV__ = _config.__DEV__;

var echarts = __webpack_require__(/*! ../../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var _helper = __webpack_require__(/*! ./helper */ "./node_modules/echarts/lib/chart/bar/helper.js");

var setLabel = _helper.setLabel;

var Model = __webpack_require__(/*! ../../model/Model */ "./node_modules/echarts/lib/model/Model.js");

var barItemStyle = __webpack_require__(/*! ./barItemStyle */ "./node_modules/echarts/lib/chart/bar/barItemStyle.js");

var Path = __webpack_require__(/*! zrender/lib/graphic/Path */ "./node_modules/zrender/lib/graphic/Path.js");

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
var BAR_BORDER_WIDTH_QUERY = ['itemStyle', 'barBorderWidth']; // FIXME
// Just for compatible with ec2.

zrUtil.extend(Model.prototype, barItemStyle);

var _default = echarts.extendChartView({
  type: 'bar',
  render: function (seriesModel, ecModel, api) {
    this._updateDrawMode(seriesModel);

    var coordinateSystemType = seriesModel.get('coordinateSystem');

    if (coordinateSystemType === 'cartesian2d' || coordinateSystemType === 'polar') {
      this._isLargeDraw ? this._renderLarge(seriesModel, ecModel, api) : this._renderNormal(seriesModel, ecModel, api);
    } else {}

    return this.group;
  },
  incrementalPrepareRender: function (seriesModel, ecModel, api) {
    this._clear();

    this._updateDrawMode(seriesModel);
  },
  incrementalRender: function (params, seriesModel, ecModel, api) {
    // Do not support progressive in normal mode.
    this._incrementalRenderLarge(params, seriesModel);
  },
  _updateDrawMode: function (seriesModel) {
    var isLargeDraw = seriesModel.pipelineContext.large;

    if (this._isLargeDraw == null || isLargeDraw ^ this._isLargeDraw) {
      this._isLargeDraw = isLargeDraw;

      this._clear();
    }
  },
  _renderNormal: function (seriesModel, ecModel, api) {
    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;
    var coord = seriesModel.coordinateSystem;
    var baseAxis = coord.getBaseAxis();
    var isHorizontalOrRadial;

    if (coord.type === 'cartesian2d') {
      isHorizontalOrRadial = baseAxis.isHorizontal();
    } else if (coord.type === 'polar') {
      isHorizontalOrRadial = baseAxis.dim === 'angle';
    }

    var animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;
    data.diff(oldData).add(function (dataIndex) {
      if (!data.hasValue(dataIndex)) {
        return;
      }

      var itemModel = data.getItemModel(dataIndex);
      var layout = getLayout[coord.type](data, dataIndex, itemModel);
      var el = elementCreator[coord.type](data, dataIndex, itemModel, layout, isHorizontalOrRadial, animationModel);
      data.setItemGraphicEl(dataIndex, el);
      group.add(el);
      updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
    }).update(function (newIndex, oldIndex) {
      var el = oldData.getItemGraphicEl(oldIndex);

      if (!data.hasValue(newIndex)) {
        group.remove(el);
        return;
      }

      var itemModel = data.getItemModel(newIndex);
      var layout = getLayout[coord.type](data, newIndex, itemModel);

      if (el) {
        graphic.updateProps(el, {
          shape: layout
        }, animationModel, newIndex);
      } else {
        el = elementCreator[coord.type](data, newIndex, itemModel, layout, isHorizontalOrRadial, animationModel, true);
      }

      data.setItemGraphicEl(newIndex, el); // Add back

      group.add(el);
      updateStyle(el, data, newIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
    }).remove(function (dataIndex) {
      var el = oldData.getItemGraphicEl(dataIndex);

      if (coord.type === 'cartesian2d') {
        el && removeRect(dataIndex, animationModel, el);
      } else {
        el && removeSector(dataIndex, animationModel, el);
      }
    }).execute();
    this._data = data;
  },
  _renderLarge: function (seriesModel, ecModel, api) {
    this._clear();

    createLarge(seriesModel, this.group);
  },
  _incrementalRenderLarge: function (params, seriesModel) {
    createLarge(seriesModel, this.group, true);
  },
  dispose: zrUtil.noop,
  remove: function (ecModel) {
    this._clear(ecModel);
  },
  _clear: function (ecModel) {
    var group = this.group;
    var data = this._data;

    if (ecModel && ecModel.get('animation') && data && !this._isLargeDraw) {
      data.eachItemGraphicEl(function (el) {
        if (el.type === 'sector') {
          removeSector(el.dataIndex, ecModel, el);
        } else {
          removeRect(el.dataIndex, ecModel, el);
        }
      });
    } else {
      group.removeAll();
    }

    this._data = null;
  }
});

var elementCreator = {
  cartesian2d: function (data, dataIndex, itemModel, layout, isHorizontal, animationModel, isUpdate) {
    var rect = new graphic.Rect({
      shape: zrUtil.extend({}, layout)
    }); // Animation

    if (animationModel) {
      var rectShape = rect.shape;
      var animateProperty = isHorizontal ? 'height' : 'width';
      var animateTarget = {};
      rectShape[animateProperty] = 0;
      animateTarget[animateProperty] = layout[animateProperty];
      graphic[isUpdate ? 'updateProps' : 'initProps'](rect, {
        shape: animateTarget
      }, animationModel, dataIndex);
    }

    return rect;
  },
  polar: function (data, dataIndex, itemModel, layout, isRadial, animationModel, isUpdate) {
    // Keep the same logic with bar in catesion: use end value to control
    // direction. Notice that if clockwise is true (by default), the sector
    // will always draw clockwisely, no matter whether endAngle is greater
    // or less than startAngle.
    var clockwise = layout.startAngle < layout.endAngle;
    var sector = new graphic.Sector({
      shape: zrUtil.defaults({
        clockwise: clockwise
      }, layout)
    }); // Animation

    if (animationModel) {
      var sectorShape = sector.shape;
      var animateProperty = isRadial ? 'r' : 'endAngle';
      var animateTarget = {};
      sectorShape[animateProperty] = isRadial ? 0 : layout.startAngle;
      animateTarget[animateProperty] = layout[animateProperty];
      graphic[isUpdate ? 'updateProps' : 'initProps'](sector, {
        shape: animateTarget
      }, animationModel, dataIndex);
    }

    return sector;
  }
};

function removeRect(dataIndex, animationModel, el) {
  // Not show text when animating
  el.style.text = null;
  graphic.updateProps(el, {
    shape: {
      width: 0
    }
  }, animationModel, dataIndex, function () {
    el.parent && el.parent.remove(el);
  });
}

function removeSector(dataIndex, animationModel, el) {
  // Not show text when animating
  el.style.text = null;
  graphic.updateProps(el, {
    shape: {
      r: el.shape.r0
    }
  }, animationModel, dataIndex, function () {
    el.parent && el.parent.remove(el);
  });
}

var getLayout = {
  cartesian2d: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    var fixedLineWidth = getLineWidth(itemModel, layout); // fix layout with lineWidth

    var signX = layout.width > 0 ? 1 : -1;
    var signY = layout.height > 0 ? 1 : -1;
    return {
      x: layout.x + signX * fixedLineWidth / 2,
      y: layout.y + signY * fixedLineWidth / 2,
      width: layout.width - signX * fixedLineWidth,
      height: layout.height - signY * fixedLineWidth
    };
  },
  polar: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    return {
      cx: layout.cx,
      cy: layout.cy,
      r0: layout.r0,
      r: layout.r,
      startAngle: layout.startAngle,
      endAngle: layout.endAngle
    };
  }
};

function updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontal, isPolar) {
  var color = data.getItemVisual(dataIndex, 'color');
  var opacity = data.getItemVisual(dataIndex, 'opacity');
  var itemStyleModel = itemModel.getModel('itemStyle');
  var hoverStyle = itemModel.getModel('emphasis.itemStyle').getBarItemStyle();

  if (!isPolar) {
    el.setShape('r', itemStyleModel.get('barBorderRadius') || 0);
  }

  el.useStyle(zrUtil.defaults({
    fill: color,
    opacity: opacity
  }, itemStyleModel.getBarItemStyle()));
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && el.attr('cursor', cursorStyle);
  var labelPositionOutside = isHorizontal ? layout.height > 0 ? 'bottom' : 'top' : layout.width > 0 ? 'left' : 'right';

  if (!isPolar) {
    setLabel(el.style, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside);
  }

  graphic.setHoverStyle(el, hoverStyle);
} // In case width or height are too small.


function getLineWidth(itemModel, rawLayout) {
  var lineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
  return Math.min(lineWidth, Math.abs(rawLayout.width), Math.abs(rawLayout.height));
}

var LargePath = Path.extend({
  type: 'largeBar',
  shape: {
    points: []
  },
  buildPath: function (ctx, shape) {
    // Drawing lines is more efficient than drawing
    // a whole line or drawing rects.
    var points = shape.points;
    var startPoint = this.__startPoint;
    var valueIdx = this.__valueIdx;

    for (var i = 0; i < points.length; i += 2) {
      startPoint[this.__valueIdx] = points[i + valueIdx];
      ctx.moveTo(startPoint[0], startPoint[1]);
      ctx.lineTo(points[i], points[i + 1]);
    }
  }
});

function createLarge(seriesModel, group, incremental) {
  // TODO support polar
  var data = seriesModel.getData();
  var startPoint = [];
  var valueIdx = data.getLayout('valueAxisHorizontal') ? 1 : 0;
  startPoint[1 - valueIdx] = data.getLayout('valueAxisStart');
  var el = new LargePath({
    shape: {
      points: data.getLayout('largePoints')
    },
    incremental: !!incremental,
    __startPoint: startPoint,
    __valueIdx: valueIdx
  });
  group.add(el);
  setLargeStyle(el, seriesModel, data);
}

function setLargeStyle(el, seriesModel, data) {
  var borderColor = data.getVisual('borderColor') || data.getVisual('color');
  var itemStyle = seriesModel.getModel('itemStyle').getItemStyle(['color', 'borderColor']);
  el.useStyle(itemStyle);
  el.style.fill = null;
  el.style.stroke = borderColor;
  el.style.lineWidth = data.getLayout('barWidth');
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/bar/BaseBarSeries.js":
/*!*************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/bar/BaseBarSeries.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SeriesModel = __webpack_require__(/*! ../../model/Series */ "./node_modules/echarts/lib/model/Series.js");

var createListFromArray = __webpack_require__(/*! ../helper/createListFromArray */ "./node_modules/echarts/lib/chart/helper/createListFromArray.js");

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
  type: 'series.__base_bar__',
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this);
  },
  getMarkerPosition: function (value) {
    var coordSys = this.coordinateSystem;

    if (coordSys) {
      // PENDING if clamp ?
      var pt = coordSys.dataToPoint(coordSys.clampData(value));
      var data = this.getData();
      var offset = data.getLayout('offset');
      var size = data.getLayout('size');
      var offsetIndex = coordSys.getBaseAxis().isHorizontal() ? 0 : 1;
      pt[offsetIndex] += offset + size / 2;
      return pt;
    }

    return [NaN, NaN];
  },
  defaultOption: {
    zlevel: 0,
    // 一级层叠
    z: 2,
    // 二级层叠
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    // stack: null
    // Cartesian coordinate system
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // 最小高度改为0
    barMinHeight: 0,
    // 最小角度为0，仅对极坐标系下的柱状图有效
    barMinAngle: 0,
    // cursor: null,
    large: false,
    largeThreshold: 400,
    progressive: 5e3,
    progressiveChunkMode: 'mod',
    // barMaxWidth: null,
    // 默认自适应
    // barWidth: null,
    // 柱间距离，默认为柱形宽度的30%，可设固定值
    // barGap: '30%',
    // 类目间柱形距离，默认为类目间距的20%，可设固定值
    // barCategoryGap: '20%',
    // label: {
    //      show: false
    // },
    itemStyle: {},
    emphasis: {}
  }
});

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/bar/barItemStyle.js":
/*!************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/bar/barItemStyle.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var makeStyleMapper = __webpack_require__(/*! ../../model/mixin/makeStyleMapper */ "./node_modules/echarts/lib/model/mixin/makeStyleMapper.js");

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
var getBarItemStyle = makeStyleMapper([['fill', 'color'], ['stroke', 'borderColor'], ['lineWidth', 'borderWidth'], // Compatitable with 2
['stroke', 'barBorderColor'], ['lineWidth', 'barBorderWidth'], ['opacity'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['shadowColor']]);
var _default = {
  getBarItemStyle: function (excludes) {
    var style = getBarItemStyle(this, excludes);

    if (this.getBorderLineDash) {
      var lineDash = this.getBorderLineDash();
      lineDash && (style.lineDash = lineDash);
    }

    return style;
  }
};
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/bar/helper.js":
/*!******************************************************!*\
  !*** ./node_modules/echarts/lib/chart/bar/helper.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var _labelHelper = __webpack_require__(/*! ../helper/labelHelper */ "./node_modules/echarts/lib/chart/helper/labelHelper.js");

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
function setLabel(normalStyle, hoverStyle, itemModel, color, seriesModel, dataIndex, labelPositionOutside) {
  var labelModel = itemModel.getModel('label');
  var hoverLabelModel = itemModel.getModel('emphasis.label');
  graphic.setLabelStyle(normalStyle, hoverStyle, labelModel, hoverLabelModel, {
    labelFetcher: seriesModel,
    labelDataIndex: dataIndex,
    defaultText: getDefaultLabel(seriesModel.getData(), dataIndex),
    isRectText: true,
    autoColor: color
  });
  fixPosition(normalStyle);
  fixPosition(hoverStyle);
}

function fixPosition(style, labelPositionOutside) {
  if (style.textPosition === 'outside') {
    style.textPosition = labelPositionOutside;
  }
}

exports.setLabel = setLabel;

/***/ })

}]);
//# sourceMappingURL=7.js.map