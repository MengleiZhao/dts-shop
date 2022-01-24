(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/vue-loader/lib/index.js?!./src/views/stat/goods.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/stat/goods.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_business_stat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/business/stat */ "./src/api/business/stat.js");
/* harmony import */ var v_charts_lib_line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! v-charts/lib/line */ "./node_modules/v-charts/lib/line.js");
/* harmony import */ var v_charts_lib_line__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(v_charts_lib_line__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: { VeLine: v_charts_lib_line__WEBPACK_IMPORTED_MODULE_1___default.a },
  data: function data() {
    return {
      chartData: {},
      chartSettings: {},
      chartExtend: {}
    };
  },
  created: function created() {
    var _this = this;

    Object(_api_business_stat__WEBPACK_IMPORTED_MODULE_0__["statGoods"])().then(function (response) {
      _this.chartData = response.data.data;
      _this.chartSettings = {
        labelMap: {
          'orders': '订单量',
          'products': '下单货品数量',
          'amount': '下单货品总额'
        }
      };
      _this.chartExtend = {
        xAxis: { boundaryGap: true }
      };
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/stat/goods.vue?vue&type=template&id=e3ef2640&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/stat/goods.vue?vue&type=template&id=e3ef2640& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-container"},[_c('ve-line',{attrs:{"extend":_vm.chartExtend,"data":_vm.chartData,"settings":_vm.chartSettings}})],1)}
var staticRenderFns = []



/***/ }),

/***/ "./src/api/business/stat.js":
/*!**********************************!*\
  !*** ./src/api/business/stat.js ***!
  \**********************************/
/*! exports provided: statUser, statOrder, statGoods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statUser", function() { return statUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statOrder", function() { return statOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statGoods", function() { return statGoods; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");


function statUser(query) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/stat/user',
    method: 'get',
    params: query
  });
}

function statOrder(query) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/stat/order',
    method: 'get',
    params: query
  });
}

function statGoods(query) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/stat/goods',
    method: 'get',
    params: query
  });
}

/***/ }),

/***/ "./src/views/stat/goods.vue":
/*!**********************************!*\
  !*** ./src/views/stat/goods.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goods_vue_vue_type_template_id_e3ef2640___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goods.vue?vue&type=template&id=e3ef2640& */ "./src/views/stat/goods.vue?vue&type=template&id=e3ef2640&");
/* harmony import */ var _goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goods.vue?vue&type=script&lang=js& */ "./src/views/stat/goods.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _goods_vue_vue_type_template_id_e3ef2640___WEBPACK_IMPORTED_MODULE_0__["render"],
  _goods_vue_vue_type_template_id_e3ef2640___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "goods.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/stat/goods.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/views/stat/goods.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_cacheDirectory_node_modules_vue_loader_lib_index_js_vue_loader_options_goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib?cacheDirectory!../../../node_modules/vue-loader/lib??vue-loader-options!./goods.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/vue-loader/lib/index.js?!./src/views/stat/goods.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_cacheDirectory_node_modules_vue_loader_lib_index_js_vue_loader_options_goods_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/stat/goods.vue?vue&type=template&id=e3ef2640&":
/*!*****************************************************************!*\
  !*** ./src/views/stat/goods.vue?vue&type=template&id=e3ef2640& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_goods_vue_vue_type_template_id_e3ef2640___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./goods.vue?vue&type=template&id=e3ef2640& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/stat/goods.vue?vue&type=template&id=e3ef2640&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_goods_vue_vue_type_template_id_e3ef2640___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_goods_vue_vue_type_template_id_e3ef2640___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=45.js.map