(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/@tinymce/tinymce-vue/lib/es2015/ScriptLoader.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-vue/lib/es2015/ScriptLoader.js ***!
  \**********************************************************************/
/*! exports provided: create, load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/Utils.js");
/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

var injectScriptTag = function (scriptId, doc, url, callback) {
    var scriptTag = doc.createElement('script');
    scriptTag.type = 'application/javascript';
    scriptTag.id = scriptId;
    scriptTag.addEventListener('load', callback);
    scriptTag.src = url;
    doc.head.appendChild(scriptTag);
};
var create = function () {
    return {
        listeners: [],
        scriptId: Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["uuid"])('tiny-script'),
        scriptLoaded: false
    };
};
var load = function (state, doc, url, callback) {
    if (state.scriptLoaded) {
        callback();
    }
    else {
        state.listeners.push(callback);
        if (!doc.getElementById(state.scriptId)) {
            injectScriptTag(state.scriptId, doc, url, function () {
                state.listeners.forEach(function (fn) { return fn(); });
                state.scriptLoaded = true;
            });
        }
    }
};


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-vue/lib/es2015/TinyMCE.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-vue/lib/es2015/TinyMCE.js ***!
  \*****************************************************************/
/*! exports provided: getTinymce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTinymce", function() { return getTinymce; });
/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var getGlobal = function () { return (typeof window !== 'undefined' ? window : global); };
var getTinymce = function () {
    var global = getGlobal();
    return global && global.tinymce ? global.tinymce : null;
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@tinymce/tinymce-vue/lib/es2015/Utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-vue/lib/es2015/Utils.js ***!
  \***************************************************************/
/*! exports provided: bindHandlers, bindModelHandlers, initEditor, uuid, isTextarea, mergePlugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindHandlers", function() { return bindHandlers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindModelHandlers", function() { return bindModelHandlers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initEditor", function() { return initEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuid", function() { return uuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTextarea", function() { return isTextarea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergePlugins", function() { return mergePlugins; });
/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var validEvents = [
    'onActivate',
    'onAddUndo',
    'onBeforeAddUndo',
    'onBeforeExecCommand',
    'onBeforeGetContent',
    'onBeforeRenderUI',
    'onBeforeSetContent',
    'onBeforePaste',
    'onBlur',
    'onChange',
    'onClearUndos',
    'onClick',
    'onContextMenu',
    'onCopy',
    'onCut',
    'onDblclick',
    'onDeactivate',
    'onDirty',
    'onDrag',
    'onDragDrop',
    'onDragEnd',
    'onDragGesture',
    'onDragOver',
    'onDrop',
    'onExecCommand',
    'onFocus',
    'onFocusIn',
    'onFocusOut',
    'onGetContent',
    'onHide',
    'onInit',
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',
    'onLoadContent',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onNodeChange',
    'onObjectResizeStart',
    'onObjectResized',
    'onObjectSelected',
    'onPaste',
    'onPostProcess',
    'onPostRender',
    'onPreProcess',
    'onProgressState',
    'onRedo',
    'onRemove',
    'onReset',
    'onSaveContent',
    'onSelectionChange',
    'onSetAttrib',
    'onSetContent',
    'onShow',
    'onSubmit',
    'onUndo',
    'onVisualAid'
];
var isValidKey = function (key) { return validEvents.indexOf(key) !== -1; };
var bindHandlers = function (initEvent, listeners, editor) {
    Object.keys(listeners)
        .filter(isValidKey)
        .forEach(function (key) {
        var handler = listeners[key];
        if (typeof handler === 'function') {
            if (key === 'onInit') {
                handler(initEvent, editor);
            }
            else {
                editor.on(key.substring(2), function (e) { return handler(e, editor); });
            }
        }
    });
};
var bindModelHandlers = function (ctx, editor) {
    var modelEvents = ctx.$props.modelEvents ? ctx.$props.modelEvents : null;
    var normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents;
    var currentContent;
    ctx.$watch('value', function (val, prevVal) {
        if (editor && typeof val === 'string' && val !== currentContent && val !== prevVal) {
            editor.setContent(val);
            currentContent = val;
        }
    });
    editor.on(normalizedEvents ? normalizedEvents : 'change keyup undo redo', function () {
        currentContent = editor.getContent();
        ctx.$emit('input', currentContent);
    });
};
var initEditor = function (initEvent, ctx, editor) {
    var value = ctx.$props.value ? ctx.$props.value : '';
    var initialValue = ctx.$props.initialValue ? ctx.$props.initialValue : '';
    editor.setContent(value || initialValue);
    // checks if the v-model shorthand is used (which sets an v-on:input listener) and then binds either
    // specified the events or defaults to "change keyup" event and emits the editor content on that event
    if (ctx.$listeners.input) {
        bindModelHandlers(ctx, editor);
    }
    bindHandlers(initEvent, ctx.$listeners, editor);
};
var unique = 0;
var uuid = function (prefix) {
    var date = new Date();
    var time = date.getTime();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
var isTextarea = function (element) {
    return element !== null && element.tagName.toLowerCase() === 'textarea';
};
var normalizePluginArray = function (plugins) {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
var mergePlugins = function (initPlugins, inputPlugins) {
    return normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
};


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-vue/lib/es2015/components/Editor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-vue/lib/es2015/components/Editor.js ***!
  \***************************************************************************/
/*! exports provided: Editor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony import */ var _ScriptLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ScriptLoader */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/ScriptLoader.js");
/* harmony import */ var _TinyMCE__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TinyMCE */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/TinyMCE.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/Utils.js");
/* harmony import */ var _EditorPropTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorPropTypes */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/components/EditorPropTypes.js");
/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




var scriptState = _ScriptLoader__WEBPACK_IMPORTED_MODULE_0__["create"]();
var renderInline = function (h, id, tagName) {
    return h(tagName ? tagName : 'div', {
        attrs: { id: id }
    });
};
var renderIframe = function (h, id) {
    return h('textarea', {
        attrs: { id: id },
        style: { visibility: 'hidden' }
    });
};
var initialise = function (ctx) { return function () {
    var finalInit = __assign({}, ctx.$props.init, { readonly: ctx.$props.disabled, selector: "#" + ctx.elementId, plugins: Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["mergePlugins"])(ctx.$props.init && ctx.$props.init.plugins, ctx.$props.plugins), toolbar: ctx.$props.toolbar || (ctx.$props.init && ctx.$props.init.toolbar), inline: ctx.inlineEditor, setup: function (editor) {
            ctx.editor = editor;
            editor.on('init', function (e) { return Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["initEditor"])(e, ctx, editor); });
            if (ctx.$props.init && typeof ctx.$props.init.setup === 'function') {
                ctx.$props.init.setup(editor);
            }
        } });
    if (Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["isTextarea"])(ctx.element)) {
        ctx.element.style.visibility = '';
    }
    Object(_TinyMCE__WEBPACK_IMPORTED_MODULE_1__["getTinymce"])().init(finalInit);
}; };
var Editor = {
    props: _EditorPropTypes__WEBPACK_IMPORTED_MODULE_3__["editorProps"],
    created: function () {
        this.elementId = this.$props.id || Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["uuid"])('tiny-vue');
        this.inlineEditor = (this.$props.init && this.$props.init.inline) || this.$props.inline;
    },
    watch: {
        disabled: function () {
            this.editor.setMode(this.disabled ? 'readonly' : 'design');
        }
    },
    mounted: function () {
        this.element = this.$el;
        if (Object(_TinyMCE__WEBPACK_IMPORTED_MODULE_1__["getTinymce"])() !== null) {
            initialise(this)();
        }
        else if (this.element) {
            var doc = this.element.ownerDocument;
            var channel = this.$props.cloudChannel ? this.$props.cloudChannel : 'stable';
            var apiKey = this.$props.apiKey ? this.$props.apiKey : '';
            var url = "https://cloud.tinymce.com/" + channel + "/tinymce.min.js?apiKey=" + apiKey;
            _ScriptLoader__WEBPACK_IMPORTED_MODULE_0__["load"](scriptState, doc, url, initialise(this));
        }
    },
    beforeDestroy: function () {
        if (Object(_TinyMCE__WEBPACK_IMPORTED_MODULE_1__["getTinymce"])() !== null) {
            Object(_TinyMCE__WEBPACK_IMPORTED_MODULE_1__["getTinymce"])().remove(this.editor);
        }
    },
    render: function (h) {
        return this.inlineEditor ? renderInline(h, this.elementId, this.$props.tagName) : renderIframe(h, this.elementId);
    }
};


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-vue/lib/es2015/components/EditorPropTypes.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-vue/lib/es2015/components/EditorPropTypes.js ***!
  \************************************************************************************/
/*! exports provided: editorProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorProps", function() { return editorProps; });
/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var editorProps = {
    apiKey: String,
    cloudChannel: String,
    id: String,
    init: Object,
    initialValue: String,
    inline: Boolean,
    modelEvents: [String, Array],
    plugins: [String, Array],
    tagName: String,
    toolbar: [String, Array],
    value: String,
    disabled: Boolean
};


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-vue/lib/es2015/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-vue/lib/es2015/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Editor */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/components/Editor.js");
/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* harmony default export */ __webpack_exports__["default"] = (_components_Editor__WEBPACK_IMPORTED_MODULE_0__["Editor"]);


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/goods/edit.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "./node_modules/babel-runtime/core-js/object/assign.js");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_business_goods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/business/goods */ "./src/api/business/goods.js");
/* harmony import */ var _api_business_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/business/storage */ "./src/api/business/storage.js");
/* harmony import */ var _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tinymce/tinymce-vue */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/index.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! element-ui */ "./node_modules/element-ui/lib/element-ui.common.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/auth */ "./src/utils/auth.js");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'GoodsEdit',
  components: { Editor: _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_3__["default"] },
  data: function data() {
    return {
      uploadPath: _api_business_storage__WEBPACK_IMPORTED_MODULE_2__["uploadPath"],
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      galleryFileList: [],
      categoryList: [],
      brandList: [],
      categoryIds: [],
      goods: { gallery: [] },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: {
        id: 0,
        specifications: [],
        price: 0.0,
        number: 0,
        url: ''
      },
      products: [{ id: 0, specifications: ['标准'], price: 0.0, number: 0, url: '' }],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
      rules: {
        goodsSn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
          var formData = new FormData();
          formData.append('file', blobInfo.blob());
          Object(_api_business_storage__WEBPACK_IMPORTED_MODULE_2__["createStorage"])(formData).then(function (res) {
            success(res.data.data.url);
          }).catch(function () {
            failure('上传失败，请重新上传');
          });
        }
      }
    };
  },

  computed: {
    headers: function headers() {
      return {
        'X-Dts-Admin-Token': Object(_utils_auth__WEBPACK_IMPORTED_MODULE_5__["getToken"])()
      };
    }
  },
  created: function created() {
    this.init();
  },

  methods: {
    init: function init() {
      var _this = this;

      if (this.$route.query.id == null) {
        return;
      }

      var goodsId = this.$route.query.id;
      Object(_api_business_goods__WEBPACK_IMPORTED_MODULE_1__["detailGoods"])(goodsId).then(function (response) {
        _this.goods = response.data.data.goods;
        _this.specifications = response.data.data.specifications;
        _this.products = response.data.data.products;
        _this.attributes = response.data.data.attributes;
        _this.categoryIds = response.data.data.categoryIds;

        _this.galleryFileList = [];
        for (var i = 0; i < _this.goods.gallery.length; i++) {
          _this.galleryFileList.push({
            url: _this.goods.gallery[i]
          });
        }
        var keywords = response.data.data.goods.keywords;
        if (keywords !== null) {
          _this.keywords = keywords.split(',');
        }
      });

      Object(_api_business_goods__WEBPACK_IMPORTED_MODULE_1__["listCatAndBrand"])().then(function (response) {
        _this.categoryList = response.data.data.categoryList;
        _this.brandList = response.data.data.brandList;
      });
    },
    handleCategoryChange: function handleCategoryChange(value) {
      this.goods.categoryId = value[value.length - 1];
    },

    handleCancel: function handleCancel() {
      this.$router.push({ path: '/goods/list' });
    },
    handleEdit: function handleEdit() {
      var _this2 = this;

      var finalGoods = {
        goods: this.goods,
        specifications: this.specifications,
        products: this.products,
        attributes: this.attributes
      };
      Object(_api_business_goods__WEBPACK_IMPORTED_MODULE_1__["editGoods"])(finalGoods).then(function (response) {
        _this2.$notify.success({
          title: '成功',
          message: '创建成功'
        });
        _this2.$router.push({ path: '/goods/list' });
      }).catch(function (response) {
        element_ui__WEBPACK_IMPORTED_MODULE_4__["MessageBox"].alert('业务错误：' + response.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        });
      });
    },
    handleClose: function handleClose(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1);
      this.goods.keywords = this.keywords.toString();
    },
    showInput: function showInput() {
      var _this3 = this;

      this.newKeywordVisible = true;
      this.$nextTick(function (_) {
        _this3.$refs.newKeywordInput.$refs.input.focus();
      });
    },
    handleInputConfirm: function handleInputConfirm() {
      var newKeyword = this.newKeyword;
      if (newKeyword) {
        this.keywords.push(newKeyword);
        this.goods.keywords = this.keywords.toString();
      }
      this.newKeywordVisible = false;
      this.newKeyword = '';
    },

    uploadPicUrl: function uploadPicUrl(response) {
      this.goods.picUrl = response.data.url;
    },
    uploadOverrun: function uploadOverrun() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      });
    },
    handleGalleryUrl: function handleGalleryUrl(response, file, fileList) {
      if (response.errno === 0) {
        this.goods.gallery.push(response.data.url);
      }
    },

    handleRemove: function handleRemove(file, fileList) {
      for (var i = 0; i < this.goods.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url;
        if (file.response === undefined) {
          url = file.url;
        } else {
          url = file.response.data.url;
        }

        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1);
        }
      }
    },
    specChanged: function specChanged(label) {
      if (label === false) {
        this.specifications = [{ specification: '规格', value: '标准', picUrl: '' }];
        this.products = [{ id: 0, specifications: ['标准'], price: 0.0, number: 0, url: '' }];
      } else {
        this.specifications = [];
        this.products = [];
      }
    },
    uploadSpecPicUrl: function uploadSpecPicUrl(response) {
      this.specForm.picUrl = response.data.url;
    },
    handleSpecificationShow: function handleSpecificationShow() {
      this.specForm = { specification: '', value: '', picUrl: '' };
      this.specVisiable = true;
    },
    handleSpecificationAdd: function handleSpecificationAdd() {
      var index = this.specifications.length - 1;
      for (var i = 0; i < this.specifications.length; i++) {
        var v = this.specifications[i];
        if (v.specification === this.specForm.specification) {
          index = i;
        }
      }

      this.specifications.splice(index + 1, 0, this.specForm);
      this.specVisiable = false;

      this.specToProduct();
    },
    handleSpecificationDelete: function handleSpecificationDelete(row) {
      var index = this.specifications.indexOf(row);
      this.specifications.splice(index, 1);
      this.specToProduct();
    },
    specToProduct: function specToProduct() {
      if (this.specifications.length === 0) {
        return;
      }
      // 根据specifications创建临时规格列表
      var specValues = [];
      var spec = this.specifications[0].specification;
      var values = [];
      values.push(0);

      for (var i = 1; i < this.specifications.length; i++) {
        var aspec = this.specifications[i].specification;

        if (aspec === spec) {
          values.push(i);
        } else {
          specValues.push(values);
          spec = aspec;
          values = [];
          values.push(i);
        }
      }
      specValues.push(values);

      // 根据临时规格列表生产货品规格
      // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
      var productsIndex = 0;
      var products = [];
      var combination = [];
      var n = specValues.length;
      for (var s = 0; s < n; s++) {
        combination[s] = 0;
      }
      var index = 0;
      var isContinue = false;
      do {
        var specifications = [];
        for (var x = 0; x < n; x++) {
          var z = specValues[x][combination[x]];
          specifications.push(this.specifications[z].value);
        }
        products[productsIndex] = {
          id: productsIndex,
          specifications: specifications,
          price: 0.0,
          number: 0,
          url: ''
        };
        productsIndex++;

        index++;
        combination[n - 1] = index;
        for (var j = n - 1; j >= 0; j--) {
          if (combination[j] >= specValues[j].length) {
            combination[j] = 0;
            index = 0;
            if (j - 1 >= 0) {
              combination[j - 1] = combination[j - 1] + 1;
            }
          }
        }
        isContinue = false;
        for (var p = 0; p < n; p++) {
          if (combination[p] !== 0) {
            isContinue = true;
          }
        }
      } while (isContinue);

      this.products = products;
    },
    handleProductShow: function handleProductShow(row) {
      this.productForm = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, row);
      this.productVisiable = true;
    },

    uploadProductUrl: function uploadProductUrl(response) {
      this.productForm.url = response.data.url;
    },
    handleProductEdit: function handleProductEdit() {
      for (var i = 0; i < this.products.length; i++) {
        var v = this.products[i];
        if (v.id === this.productForm.id) {
          this.products.splice(i, 1, this.productForm);
          break;
        }
      }
      this.productVisiable = false;
    },
    handleAttributeShow: function handleAttributeShow() {
      this.attributeForm = {};
      this.attributeVisiable = true;
    },
    handleAttributeAdd: function handleAttributeAdd() {
      this.attributes.unshift(this.attributeForm);
      this.attributeVisiable = false;
    },
    handleAttributeDelete: function handleAttributeDelete(row) {
      var index = this.attributes.indexOf(row);
      this.attributes.splice(index, 1);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/goods/edit.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.el-card {\r\n  margin-bottom: 10px;\n}\n.el-tag + .el-tag {\r\n  margin-left: 10px;\n}\n.input-new-keyword {\r\n  width: 90px;\r\n  margin-left: 10px;\r\n  vertical-align: bottom;\n}\n.avatar-uploader .el-upload {\r\n  border: 1px dashed #d9d9d9;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  position: relative;\r\n  overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\r\n  border-color: #20a0ff;\n}\n.avatar-uploader-icon {\r\n  font-size: 28px;\r\n  color: #8c939d;\r\n  width: 120px;\r\n  height: 120px;\r\n  line-height: 120px;\r\n  text-align: center;\n}\n.avatar {\r\n  width: 145px;\r\n  height: 145px;\r\n  display: block;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=template&id=a48d0a04&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/goods/edit.vue?vue&type=template&id=a48d0a04& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-container"},[_c('el-card',{staticClass:"box-card"},[_c('h3',[_vm._v("商品介绍")]),_vm._v(" "),_c('el-form',{ref:"goods",attrs:{"rules":_vm.rules,"model":_vm.goods,"label-width":"150px"}},[_c('el-form-item',{attrs:{"label":"商品编号","prop":"goodsSn"}},[_c('el-input',{model:{value:(_vm.goods.goodsSn),callback:function ($$v) {_vm.$set(_vm.goods, "goodsSn", $$v)},expression:"goods.goodsSn"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"商品名称","prop":"name"}},[_c('el-input',{model:{value:(_vm.goods.name),callback:function ($$v) {_vm.$set(_vm.goods, "name", $$v)},expression:"goods.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"专柜价格","prop":"counterPrice"}},[_c('el-input',{attrs:{"placeholder":"0.00"},model:{value:(_vm.goods.counterPrice),callback:function ($$v) {_vm.$set(_vm.goods, "counterPrice", $$v)},expression:"goods.counterPrice"}},[_c('template',{slot:"append"},[_vm._v("元")])],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"当前价格","prop":"retailPrice"}},[_c('el-input',{attrs:{"placeholder":"0.00"},model:{value:(_vm.goods.retailPrice),callback:function ($$v) {_vm.$set(_vm.goods, "retailPrice", $$v)},expression:"goods.retailPrice"}},[_c('template',{slot:"append"},[_vm._v("元")])],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否新品","prop":"isNew"}},[_c('el-radio-group',{model:{value:(_vm.goods.isNew),callback:function ($$v) {_vm.$set(_vm.goods, "isNew", $$v)},expression:"goods.isNew"}},[_c('el-radio',{attrs:{"label":true}},[_vm._v("新品")]),_vm._v(" "),_c('el-radio',{attrs:{"label":false}},[_vm._v("非新品")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否热卖","prop":"isHot"}},[_c('el-radio-group',{model:{value:(_vm.goods.isHot),callback:function ($$v) {_vm.$set(_vm.goods, "isHot", $$v)},expression:"goods.isHot"}},[_c('el-radio',{attrs:{"label":false}},[_vm._v("普通")]),_vm._v(" "),_c('el-radio',{attrs:{"label":true}},[_vm._v("热卖")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否在售","prop":"isOnSale"}},[_c('el-radio-group',{model:{value:(_vm.goods.isOnSale),callback:function ($$v) {_vm.$set(_vm.goods, "isOnSale", $$v)},expression:"goods.isOnSale"}},[_c('el-radio',{attrs:{"label":true}},[_vm._v("在售")]),_vm._v(" "),_c('el-radio',{attrs:{"label":false}},[_vm._v("未售")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"商品图片"}},[_c('el-upload',{staticClass:"avatar-uploader",attrs:{"headers":_vm.headers,"action":_vm.uploadPath,"show-file-list":false,"on-success":_vm.uploadPicUrl,"accept":".jpg,.jpeg,.png,.gif"}},[(_vm.goods.picUrl)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.goods.picUrl}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"宣传画廊"}},[_c('el-upload',{attrs:{"action":_vm.uploadPath,"headers":_vm.headers,"limit":5,"file-list":_vm.galleryFileList,"on-exceed":_vm.uploadOverrun,"on-success":_vm.handleGalleryUrl,"on-remove":_vm.handleRemove,"multiple":"","accept":".jpg,.jpeg,.png,.gif","list-type":"picture-card"}},[_c('i',{staticClass:"el-icon-plus"})])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"商品单位"}},[_c('el-input',{attrs:{"placeholder":"件 / 个 / 盒"},model:{value:(_vm.goods.unit),callback:function ($$v) {_vm.$set(_vm.goods, "unit", $$v)},expression:"goods.unit"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"关键字"}},[_vm._l((_vm.keywords),function(tag){return _c('el-tag',{key:tag,attrs:{"closable":"","type":"primary"},on:{"close":function($event){_vm.handleClose(tag)}}},[_vm._v("\n          "+_vm._s(tag)+"\n        ")])}),_vm._v(" "),(_vm.newKeywordVisible)?_c('el-input',{ref:"newKeywordInput",staticClass:"input-new-keyword",attrs:{"size":"small"},on:{"blur":_vm.handleInputConfirm},nativeOn:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleInputConfirm($event)}},model:{value:(_vm.newKeyword),callback:function ($$v) {_vm.newKeyword=$$v},expression:"newKeyword"}}):_c('el-button',{staticClass:"button-new-keyword",attrs:{"size":"small","type":"primary"},on:{"click":_vm.showInput}},[_vm._v("+ 增加")])],2),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属分类"}},[_c('el-cascader',{attrs:{"options":_vm.categoryList,"expand-trigger":"hover"},on:{"change":_vm.handleCategoryChange},model:{value:(_vm.categoryIds),callback:function ($$v) {_vm.categoryIds=$$v},expression:"categoryIds"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属品牌商"}},[_c('el-select',{model:{value:(_vm.goods.brandId),callback:function ($$v) {_vm.$set(_vm.goods, "brandId", $$v)},expression:"goods.brandId"}},_vm._l((_vm.brandList),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"商品简介"}},[_c('el-input',{model:{value:(_vm.goods.brief),callback:function ($$v) {_vm.$set(_vm.goods, "brief", $$v)},expression:"goods.brief"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"商品详细介绍"}},[_c('editor',{attrs:{"init":_vm.editorInit},model:{value:(_vm.goods.detail),callback:function ($$v) {_vm.$set(_vm.goods, "detail", $$v)},expression:"goods.detail"}})],1)],1)],1),_vm._v(" "),_c('el-card',{staticClass:"box-card"},[_c('h3',[_vm._v("商品规格")]),_vm._v(" "),_c('el-button',{attrs:{"plain":true,"type":"primary"},on:{"click":_vm.handleSpecificationShow}},[_vm._v("添加")]),_vm._v(" "),_c('el-table',{attrs:{"data":_vm.specifications}},[_c('el-table-column',{attrs:{"property":"specification","label":"规格名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"value","label":"规格值"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-tag',{attrs:{"type":"primary"}},[_vm._v("\n            "+_vm._s(scope.row.value)+"\n          ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"picUrl","label":"规格图片"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.picUrl)?_c('img',{attrs:{"src":scope.row.picUrl,"width":"40"}}):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","label":"操作","width":"250","class-name":"small-padding fixed-width"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"type":"danger","size":"mini"},on:{"click":function($event){_vm.handleSpecificationDelete(scope.row)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('el-dialog',{attrs:{"visible":_vm.specVisiable,"title":"设置规格"},on:{"update:visible":function($event){_vm.specVisiable=$event}}},[_c('el-form',{ref:"specForm",staticStyle:{"width":"400px","margin-left":"50px"},attrs:{"rules":_vm.rules,"model":_vm.specForm,"status-icon":"","label-position":"left","label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"规格名","prop":"specification"}},[_c('el-input',{model:{value:(_vm.specForm.specification),callback:function ($$v) {_vm.$set(_vm.specForm, "specification", $$v)},expression:"specForm.specification"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"规格值","prop":"value"}},[_c('el-input',{model:{value:(_vm.specForm.value),callback:function ($$v) {_vm.$set(_vm.specForm, "value", $$v)},expression:"specForm.value"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"规格图片","prop":"picUrl"}},[_c('el-upload',{staticClass:"avatar-uploader",attrs:{"headers":_vm.headers,"action":_vm.uploadPath,"show-file-list":false,"on-success":_vm.uploadSpecPicUrl,"accept":".jpg,.jpeg,.png,.gif"}},[(_vm.specForm.picUrl)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.specForm.picUrl}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.specVisiable = false}}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleSpecificationAdd}},[_vm._v("确定")])],1)],1)],1),_vm._v(" "),_c('el-card',{staticClass:"box-card"},[_c('h3',[_vm._v("商品库存")]),_vm._v(" "),_c('el-table',{attrs:{"data":_vm.products}},[_c('el-table-column',{attrs:{"property":"value","label":"货品规格"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _vm._l((scope.row.specifications),function(tag){return _c('el-tag',{key:tag},[_vm._v("\n            "+_vm._s(tag)+"\n          ")])})}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"price","width":"100","label":"货品售价"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"number","width":"100","label":"货品数量"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"url","width":"100","label":"货品图片"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.url)?_c('img',{attrs:{"src":scope.row.url,"width":"40"}}):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","label":"操作","width":"100","class-name":"small-padding fixed-width"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.handleProductShow(scope.row)}}},[_vm._v("设置")])]}}])})],1),_vm._v(" "),_c('el-dialog',{attrs:{"visible":_vm.productVisiable,"title":"设置货品"},on:{"update:visible":function($event){_vm.productVisiable=$event}}},[_c('el-form',{ref:"productForm",staticStyle:{"width":"400px","margin-left":"50px"},attrs:{"model":_vm.productForm,"status-icon":"","label-position":"left","label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"货品规格列","prop":"specifications"}},_vm._l((_vm.productForm.specifications),function(tag){return _c('el-tag',{key:tag},[_vm._v("\n            "+_vm._s(tag)+"\n          ")])})),_vm._v(" "),_c('el-form-item',{attrs:{"label":"货品售价","prop":"price"}},[_c('el-input',{model:{value:(_vm.productForm.price),callback:function ($$v) {_vm.$set(_vm.productForm, "price", $$v)},expression:"productForm.price"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"货品数量","prop":"number"}},[_c('el-input',{model:{value:(_vm.productForm.number),callback:function ($$v) {_vm.$set(_vm.productForm, "number", $$v)},expression:"productForm.number"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"货品图片","prop":"url"}},[_c('el-upload',{staticClass:"avatar-uploader",attrs:{"headers":_vm.headers,"action":_vm.uploadPath,"show-file-list":false,"on-success":_vm.uploadProductUrl,"accept":".jpg,.jpeg,.png,.gif"}},[(_vm.productForm.url)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.productForm.url}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.productVisiable = false}}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleProductEdit}},[_vm._v("确定")])],1)],1)],1),_vm._v(" "),_c('el-card',{staticClass:"box-card"},[_c('h3',[_vm._v("商品参数")]),_vm._v(" "),_c('el-button',{attrs:{"plain":true,"type":"primary"},on:{"click":_vm.handleAttributeShow}},[_vm._v("添加")]),_vm._v(" "),_c('el-table',{attrs:{"data":_vm.attributes}},[_c('el-table-column',{attrs:{"property":"attribute","label":"商品参数名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"value","label":"商品参数值"}}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","label":"操作","width":"100","class-name":"small-padding fixed-width"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"type":"danger","size":"mini"},on:{"click":function($event){_vm.handleAttributeDelete(scope.row)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('el-dialog',{attrs:{"visible":_vm.attributeVisiable,"title":"设置商品参数"},on:{"update:visible":function($event){_vm.attributeVisiable=$event}}},[_c('el-form',{ref:"attributeForm",staticStyle:{"width":"400px","margin-left":"50px"},attrs:{"model":_vm.attributeForm,"status-icon":"","label-position":"left","label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"商品参数名称","prop":"attribute"}},[_c('el-input',{model:{value:(_vm.attributeForm.attribute),callback:function ($$v) {_vm.$set(_vm.attributeForm, "attribute", $$v)},expression:"attributeForm.attribute"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"商品参数值","prop":"value"}},[_c('el-input',{model:{value:(_vm.attributeForm.value),callback:function ($$v) {_vm.$set(_vm.attributeForm, "value", $$v)},expression:"attributeForm.value"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.attributeVisiable = false}}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleAttributeAdd}},[_vm._v("确定")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"op-container"},[_c('el-button',{on:{"click":_vm.handleCancel}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleEdit}},[_vm._v("更新商品")])],1)],1)}
var staticRenderFns = []



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/goods/edit.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./edit.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=style&index=0&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("57162823", content, true, {});

/***/ }),

/***/ "./src/api/business/goods.js":
/*!***********************************!*\
  !*** ./src/api/business/goods.js ***!
  \***********************************/
/*! exports provided: listGoods, deleteGoods, publishGoods, detailGoods, editGoods, listCatAndBrand */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listGoods", function() { return listGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteGoods", function() { return deleteGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishGoods", function() { return publishGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detailGoods", function() { return detailGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editGoods", function() { return editGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listCatAndBrand", function() { return listCatAndBrand; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");


function listGoods(query) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/goods/list',
    method: 'get',
    params: query
  });
}

function deleteGoods(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/goods/delete',
    method: 'post',
    data: data
  });
}

function publishGoods(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/goods/create',
    method: 'post',
    data: data
  });
}

function detailGoods(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/goods/detail',
    method: 'get',
    params: { id: id }
  });
}

function editGoods(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/goods/update',
    method: 'post',
    data: data
  });
}

function listCatAndBrand() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/goods/catAndBrand',
    method: 'get'
  });
}

/***/ }),

/***/ "./src/api/business/storage.js":
/*!*************************************!*\
  !*** ./src/api/business/storage.js ***!
  \*************************************/
/*! exports provided: listStorage, createStorage, readStorage, updateStorage, deleteStorage, uploadPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listStorage", function() { return listStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStorage", function() { return createStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readStorage", function() { return readStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStorage", function() { return updateStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteStorage", function() { return deleteStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadPath", function() { return uploadPath; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");


function listStorage(query) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/storage/list',
    method: 'get',
    params: query
  });
}

function createStorage(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/storage/create',
    method: 'post',
    data: data
  });
}

function readStorage(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/storage/read',
    method: 'get',
    data: data
  });
}

function updateStorage(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/storage/update',
    method: 'post',
    data: data
  });
}

function deleteStorage(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/storage/delete',
    method: 'post',
    data: data
  });
}

var uploadPath = "http://124.223.32.86:8083/demo/admin" + '/storage/create';


/***/ }),

/***/ "./src/views/goods/edit.vue":
/*!**********************************!*\
  !*** ./src/views/goods/edit.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_vue_vue_type_template_id_a48d0a04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit.vue?vue&type=template&id=a48d0a04& */ "./src/views/goods/edit.vue?vue&type=template&id=a48d0a04&");
/* harmony import */ var _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit.vue?vue&type=script&lang=js& */ "./src/views/goods/edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit.vue?vue&type=style&index=0&lang=css& */ "./src/views/goods/edit.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_vue_vue_type_template_id_a48d0a04___WEBPACK_IMPORTED_MODULE_0__["render"],
  _edit_vue_vue_type_template_id_a48d0a04___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/goods/edit.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/views/goods/edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_cacheDirectory_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib?cacheDirectory!../../../node_modules/vue-loader/lib??vue-loader-options!./edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_cacheDirectory_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/goods/edit.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************!*\
  !*** ./src/views/goods/edit.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./edit.vue?vue&type=style&index=0&lang=css& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/goods/edit.vue?vue&type=template&id=a48d0a04&":
/*!*****************************************************************!*\
  !*** ./src/views/goods/edit.vue?vue&type=template&id=a48d0a04& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_a48d0a04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./edit.vue?vue&type=template&id=a48d0a04& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/goods/edit.vue?vue&type=template&id=a48d0a04&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_a48d0a04___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_a48d0a04___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=29.js.map