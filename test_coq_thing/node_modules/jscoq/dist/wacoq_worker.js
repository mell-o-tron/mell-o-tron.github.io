var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// backend/wasm/shims/process-shim.js
var browser, env, cwd;
var init_process_shim = __esm({
  "backend/wasm/shims/process-shim.js"() {
    browser = true;
    env = {};
    cwd = () => "/";
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    init_process_shim();
    init_buffer_shim();
    exports.read = function(buffer2, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer2[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer2[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/isarray/index.js
var require_isarray = __commonJS({
  "node_modules/isarray/index.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var isArray = require_isarray();
    exports.Buffer = Buffer4;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    Buffer4.TYPED_ARRAY_SUPPORT = self.TYPED_ARRAY_SUPPORT !== void 0 ? self.TYPED_ARRAY_SUPPORT : typedArraySupport();
    exports.kMaxLength = kMaxLength();
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
          return 42;
        } };
        return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === "function" && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0;
      } catch (e) {
        return false;
      }
    }
    function kMaxLength() {
      return Buffer4.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }
    function createBuffer(that, length) {
      if (kMaxLength() < length) {
        throw new RangeError("Invalid typed array length");
      }
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        that = new Uint8Array(length);
        that.__proto__ = Buffer4.prototype;
      } else {
        if (that === null) {
          that = new Buffer4(length);
        }
        that.length = length;
      }
      return that;
    }
    function Buffer4(arg, encodingOrOffset, length) {
      if (!Buffer4.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer4)) {
        return new Buffer4(arg, encodingOrOffset, length);
      }
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new Error(
            "If encoding is specified then the first argument must be a string"
          );
        }
        return allocUnsafe(this, arg);
      }
      return from(this, arg, encodingOrOffset, length);
    }
    Buffer4.poolSize = 8192;
    Buffer4._augment = function(arr) {
      arr.__proto__ = Buffer4.prototype;
      return arr;
    };
    function from(that, value, encodingOrOffset, length) {
      if (typeof value === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length);
      }
      if (typeof value === "string") {
        return fromString(that, value, encodingOrOffset);
      }
      return fromObject(that, value);
    }
    Buffer4.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    if (Buffer4.TYPED_ARRAY_SUPPORT) {
      Buffer4.prototype.__proto__ = Uint8Array.prototype;
      Buffer4.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer4[Symbol.species] === Buffer4) {
        Object.defineProperty(Buffer4, Symbol.species, {
          value: null,
          configurable: true
        });
      }
    }
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be a number');
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }
    function alloc(that, size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(that, size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
      }
      return createBuffer(that, size);
    }
    Buffer4.alloc = function(size, fill, encoding) {
      return alloc(null, size, fill, encoding);
    };
    function allocUnsafe(that, size) {
      assertSize(size);
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
      if (!Buffer4.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0;
        }
      }
      return that;
    }
    Buffer4.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer4.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    function fromString(that, string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer4.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }
      var length = byteLength(string, encoding) | 0;
      that = createBuffer(that, length);
      var actual = that.write(string, encoding);
      if (actual !== length) {
        that = that.slice(0, actual);
      }
      return that;
    }
    function fromArrayLike(that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      that = createBuffer(that, length);
      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255;
      }
      return that;
    }
    function fromArrayBuffer(that, array, byteOffset, length) {
      array.byteLength;
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError("'length' is out of bounds");
      }
      if (byteOffset === void 0 && length === void 0) {
        array = new Uint8Array(array);
      } else if (length === void 0) {
        array = new Uint8Array(array, byteOffset);
      } else {
        array = new Uint8Array(array, byteOffset, length);
      }
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        that = array;
        that.__proto__ = Buffer4.prototype;
      } else {
        that = fromArrayLike(that, array);
      }
      return that;
    }
    function fromObject(that, obj) {
      if (Buffer4.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        that = createBuffer(that, len);
        if (that.length === 0) {
          return that;
        }
        obj.copy(that, 0, 0, len);
        return that;
      }
      if (obj) {
        if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
          if (typeof obj.length !== "number" || isnan(obj.length)) {
            return createBuffer(that, 0);
          }
          return fromArrayLike(that, obj);
        }
        if (obj.type === "Buffer" && isArray(obj.data)) {
          return fromArrayLike(that, obj.data);
        }
      }
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    function checked(length) {
      if (length >= kMaxLength()) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer4.alloc(+length);
    }
    Buffer4.isBuffer = function isBuffer(b) {
      return !!(b != null && b._isBuffer);
    };
    Buffer4.compare = function compare(a, b) {
      if (!Buffer4.isBuffer(a) || !Buffer4.isBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a === b)
        return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer4.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer4.concat = function concat(list, length) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer4.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer2 = Buffer4.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!Buffer4.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer2, pos);
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength(string, encoding) {
      if (Buffer4.isBuffer(string)) {
        return string.length;
      }
      if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        string = "" + string;
      }
      var len = string.length;
      if (len === 0)
        return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
          case void 0:
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase)
              return utf8ToBytes(string).length;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.prototype._isBuffer = true;
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer4.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer4.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer4.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer4.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer4.prototype.equals = function equals(b) {
      if (!Buffer4.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer4.compare(this, b) === 0;
    };
    Buffer4.prototype.inspect = function inspect() {
      var str = "";
      var max2 = exports.INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString("hex", 0, max2).match(/.{2}/g).join(" ");
        if (this.length > max2)
          str += " ... ";
      }
      return "<Buffer " + str + ">";
    };
    Buffer4.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (!Buffer4.isBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (isNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer4.from(val, encoding);
      }
      if (Buffer4.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (Buffer4.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (strLen % 2 !== 0)
        throw new TypeError("Invalid hex string");
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer4.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer4.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer4.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer4.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer4(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer4.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer4.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer4.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max2, min) {
      if (!Buffer4.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max2 || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer4.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (value < 0)
        value = 65535 + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
      }
    }
    Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (value < 0)
        value = 4294967295 + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
      }
    }
    Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer4.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer4.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max2, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer4.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i;
      if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1e3 || !Buffer4.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer4.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer4.isBuffer(val) ? val : utf8ToBytes(new Buffer4(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = stringtrim(str).replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function stringtrim(str) {
      if (str.trim)
        return str.trim();
      return str.replace(/^\s+|\s+$/g, "");
    }
    function toHex(n) {
      if (n < 16)
        return "0" + n.toString(16);
      return n.toString(16);
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isnan(val) {
      return val !== val;
    }
  }
});

// backend/wasm/shims/buffer-shim.js
var import_buffer;
var init_buffer_shim = __esm({
  "backend/wasm/shims/buffer-shim.js"() {
    import_buffer = __toESM(require_buffer(), 1);
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter7() {
      EventEmitter7.init.call(this);
    }
    module.exports = EventEmitter7;
    module.exports.once = once;
    EventEmitter7.EventEmitter = EventEmitter7;
    EventEmitter7.prototype._events = void 0;
    EventEmitter7.prototype._eventsCount = 0;
    EventEmitter7.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter7, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter7.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter7.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter7.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter7.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter7.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err2 = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err2.context = er;
        throw err2;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter7.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter7.prototype.on = EventEmitter7.prototype.addListener;
    EventEmitter7.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter7.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter7.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter7.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter7.prototype.off = EventEmitter7.prototype.removeListener;
    EventEmitter7.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter7.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter7.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter7.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter7.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter7.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err2) {
          emitter.removeListener(name, resolver);
          reject(err2);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/browser-or-node/lib/index.js
var require_lib = __commonJS({
  "node_modules/browser-or-node/lib/index.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var isBrowser3 = typeof window !== "undefined" && typeof window.document !== "undefined";
    var isNode2 = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
    var isWebWorker2 = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";
    var isJsDom = typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));
    var isDeno = typeof Deno !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";
    exports.isBrowser = isBrowser3;
    exports.isWebWorker = isWebWorker2;
    exports.isNode = isNode2;
    exports.isJsDom = isJsDom;
    exports.isDeno = isDeno;
  }
});

// node_modules/wasi-kernel/src/kernel/bits/queue.ts
var SharedQueue, MaybeSharedArrayBuffer;
var init_queue = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/queue.ts"() {
    init_process_shim();
    init_buffer_shim();
    SharedQueue = class {
      constructor(props) {
        this._data = props.data;
        this._wait = props.wait || new Int32Array(new MaybeSharedArrayBuffer(4 * 2));
      }
      static from(props) {
        return new SharedQueue(props);
      }
      to() {
        return { data: this._data, wait: this._wait };
      }
      enqueue(v) {
        let head = Atomics.load(this._wait, 0), tail = Atomics.load(this._wait, 1);
        head ? head-- : head = this._data.length;
        if (head != tail) {
          Atomics.store(this._data, tail++, v);
          Atomics.store(this._wait, 1, tail);
          Atomics.notify(this._wait, 1, 1);
          return 1;
        } else
          return 0;
      }
      enqueueAll(vs) {
        let head = Atomics.load(this._wait, 0), tail = Atomics.load(this._wait, 1);
        head ? head-- : head = this._data.length;
        var i;
        for (i = 0; head != tail && i < vs.length; i++) {
          Atomics.store(this._data, tail++, vs[i]);
        }
        if (i > 0) {
          Atomics.store(this._wait, 1, tail);
          Atomics.notify(this._wait, 1, 1);
        }
        return i;
      }
      wait() {
        let head = Atomics.load(this._wait, 0), tail = Atomics.load(this._wait, 1);
        while (head == tail) {
          Atomics.wait(this._wait, 1, tail);
          tail = Atomics.load(this._wait, 1);
        }
      }
      dequeue() {
        this.wait();
        let head = Atomics.load(this._wait, 0), top = Atomics.load(this._data, head++);
        Atomics.store(this._wait, 0, head);
        Atomics.notify(this._wait, 0, 1);
        return top;
      }
      dequeueSome(count, out, offset) {
        if (count == 0)
          return 0;
        this.wait();
        let head = Atomics.load(this._wait, 0), tail = Atomics.load(this._wait, 1);
        var i;
        for (i = 0; head != tail && offset < count; i++) {
          out[offset++] = Atomics.load(this._data, head++);
          if (tail >= this._data.length)
            tail = 0;
        }
        Atomics.store(this._wait, 0, head);
        Atomics.notify(this._wait, 0, 1);
        return i;
      }
      isEmpty() {
        let head = Atomics.load(this._wait, 0), tail = Atomics.load(this._wait, 1);
        return head == tail;
      }
    };
    MaybeSharedArrayBuffer = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : ArrayBuffer;
  }
});

// node_modules/wasi-kernel/src/kernel/streams.ts
var import_events, SimplexStream, MaybeSharedArrayBuffer2;
var init_streams = __esm({
  "node_modules/wasi-kernel/src/kernel/streams.ts"() {
    init_process_shim();
    init_buffer_shim();
    import_events = __toESM(require_events());
    init_queue();
    SimplexStream = class extends import_events.EventEmitter {
      constructor(_from = {}) {
        super();
        this.queue = SharedQueue.from(_from.queue || { data: new Uint8Array(new MaybeSharedArrayBuffer2(1024)) });
        this.meta = _from.meta || new Int32Array(new MaybeSharedArrayBuffer2(4));
        if (!_from.meta)
          this.length = -1;
        this.pos = 0;
        this.blocking = true;
      }
      static from(props) {
        return new SimplexStream(props);
      }
      to() {
        return { queue: this.queue.to(), meta: this.meta };
      }
      get length() {
        return Atomics.load(this.meta, 0);
      }
      set length(l) {
        Atomics.store(this.meta, 0, l);
      }
      read(readBuffer, offset, length, position) {
        if (length > readBuffer.length)
          length = readBuffer.length;
        if (this.queue.isEmpty()) {
          if (offset > 0)
            return 0;
          else if (!this.blocking)
            throw { errno: 35, code: "EAGAIN" };
        }
        if (this.length >= 0 && this.pos >= this.length)
          return 0;
        var readc = this.queue.dequeueSome(length, readBuffer, offset);
        if (readc > 0) {
          if (this.length >= 0)
            readc = Math.min(this.length - this.pos, readc);
          this.pos += readc;
          this.emit("data", readBuffer.slice(offset, readc));
        }
        return readc;
      }
      write(writeBuffer) {
        let writec = this.queue.enqueueAll(writeBuffer);
        this.pos += writec;
        return writec;
      }
      end() {
        this.length = this.pos;
        this.queue.enqueue(0);
      }
      reset() {
        this.length = -1;
        this.pos = 0;
        this.blocking = true;
      }
    };
    MaybeSharedArrayBuffer2 = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : ArrayBuffer;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var bind = require_function_bind();
    module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "node_modules/is-arguments/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS({
  "node_modules/is-generator-function/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var generatorFunc = getGeneratorFunc();
    var GeneratorFunction = getProto && generatorFunc ? getProto(generatorFunc) : false;
    module.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      return getProto && getProto(fn) === GeneratorFunction;
    };
  }
});

// node_modules/foreach/index.js
var require_foreach = __commonJS({
  "node_modules/foreach/index.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    var hasOwn = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    module.exports = function forEach(obj, fn, ctx) {
      if (toString.call(fn) !== "[object Function]") {
        throw new TypeError("iterator must be a function");
      }
      var l = obj.length;
      if (l === +l) {
        for (var i = 0; i < l; i++) {
          fn.call(ctx, obj[i], i, obj);
        }
      } else {
        for (var k in obj) {
          if (hasOwn.call(obj, k)) {
            fn.call(ctx, obj[k], k, obj);
          }
        }
      }
    };
  }
});

// node_modules/array-filter/index.js
var require_array_filter = __commonJS({
  "node_modules/array-filter/index.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    module.exports = function(arr, fn, self2) {
      if (arr.filter)
        return arr.filter(fn, self2);
      if (void 0 === arr || null === arr)
        throw new TypeError();
      if ("function" != typeof fn)
        throw new TypeError();
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
        if (!hasOwn.call(arr, i))
          continue;
        var val = arr[i];
        if (fn.call(self2, val, i, arr))
          ret.push(val);
      }
      return ret;
    };
    var hasOwn = Object.prototype.hasOwnProperty;
  }
});

// node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var filter = require_array_filter();
    module.exports = function availableTypedArrays() {
      return filter([
        "BigInt64Array",
        "BigUint64Array",
        "Float32Array",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Uint8Array",
        "Uint8ClampedArray"
      ], function(typedArray) {
        return typeof self[typedArray] === "function";
      });
    };
  }
});

// node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js
var require_getOwnPropertyDescriptor = __commonJS({
  "node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%");
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var forEach = require_foreach();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var hasSymbols = require_has_symbols()();
    var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === "symbol";
    var typedArrays = availableTypedArrays();
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var gOPD = require_getOwnPropertyDescriptor();
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new self[typedArray]();
        if (!(Symbol.toStringTag in arr)) {
          throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
        }
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        toStrTags[typedArray] = descriptor.get;
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var anyTrue = false;
      forEach(toStrTags, function(getter, typedArray) {
        if (!anyTrue) {
          try {
            anyTrue = getter.call(value) === typedArray;
          } catch (e) {
          }
        }
      });
      return anyTrue;
    };
    module.exports = function isTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        return $indexOf(typedArrays, tag) > -1;
      }
      if (!gOPD) {
        return false;
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var forEach = require_foreach();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var hasSymbols = require_has_symbols()();
    var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === "symbol";
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var gOPD = require_getOwnPropertyDescriptor();
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        if (typeof self[typedArray] === "function") {
          var arr = new self[typedArray]();
          if (!(Symbol.toStringTag in arr)) {
            throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
          }
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          toStrTags[typedArray] = descriptor.get;
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var foundName = false;
      forEach(toStrTags, function(getter, typedArray) {
        if (!foundName) {
          try {
            var name = getter.call(value);
            if (name === typedArray) {
              foundName = name;
            }
          } catch (e) {
          }
        }
      });
      return foundName;
    };
    var isTypedArray = require_is_typed_array();
    module.exports = function whichTypedArray(value) {
      if (!isTypedArray(value)) {
        return false;
      }
      if (!hasToStringTag) {
        return $slice($toString(value), 8, -1);
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/util/support/types.js
var require_types = __commonJS({
  "node_modules/util/support/types.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    var bigIntValue;
    if (SymbolSupported) {
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    var symbolValue;
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  }
});

// node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS({
  "node_modules/util/support/isBufferBrowser.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/util/util.js
var require_util = __commonJS({
  "node_modules/util/util.js"(exports) {
    init_process_shim();
    init_buffer_shim();
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process !== "undefined" && process.noDeprecation === true) {
        return fn;
      }
      if (typeof process === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (env.NODE_DEBUG) {
      debugEnv = env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    var debugEnv;
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").substr(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = require_types();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = /* @__PURE__ */ new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err2, value) {
          if (err2) {
            promiseReject(err2);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err2) {
          promiseReject(err2);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  }
});

// node_modules/assert/build/internal/errors.js
var require_errors = __commonJS({
  "node_modules/assert/build/internal/errors.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var codes = {};
    var assert4;
    var util;
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inherits(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          var _this;
          _classCallCheck(this, NodeError2);
          _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError2).call(this, getMessage(arg1, arg2, arg3)));
          _this.code = code;
          return _this;
        }
        return NodeError2;
      }(Base);
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      if (assert4 === void 0)
        assert4 = require_assert();
      assert4(typeof name === "string", "'name' must be a string");
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg += ". Received type ".concat(_typeof(actual));
      return msg;
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_VALUE", function(name, value) {
      var reason = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
      if (util === void 0)
        util = require_util();
      var inspected = util.inspect(value);
      if (inspected.length > 128) {
        inspected = "".concat(inspected.slice(0, 128), "...");
      }
      return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
    }, TypeError, RangeError);
    createErrorType("ERR_INVALID_RETURN_VALUE", function(input, name, value) {
      var type;
      if (value && value.constructor && value.constructor.name) {
        type = "instance of ".concat(value.constructor.name);
      } else {
        type = "type ".concat(_typeof(value));
      }
      return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
    }, TypeError);
    createErrorType("ERR_MISSING_ARGS", function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (assert4 === void 0)
        assert4 = require_assert();
      assert4(args.length > 0, "At least one arg needs to be specified");
      var msg = "The ";
      var len = args.length;
      args = args.map(function(a) {
        return '"'.concat(a, '"');
      });
      switch (len) {
        case 1:
          msg += "".concat(args[0], " argument");
          break;
        case 2:
          msg += "".concat(args[0], " and ").concat(args[1], " arguments");
          break;
        default:
          msg += args.slice(0, len - 1).join(", ");
          msg += ", and ".concat(args[len - 1], " arguments");
          break;
      }
      return "".concat(msg, " must be specified");
    }, TypeError);
    module.exports.codes = codes;
  }
});

// node_modules/assert/build/internal/assert/assertion_error.js
var require_assertion_error = __commonJS({
  "node_modules/assert/build/internal/assert/assertion_error.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
      _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
        if (Class2 === null || !_isNativeFunction(Class2))
          return Class2;
        if (typeof Class2 !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class2))
            return _cache.get(Class2);
          _cache.set(Class2, Wrapper);
        }
        function Wrapper() {
          return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
        return _setPrototypeOf(Wrapper, Class2);
      };
      return _wrapNativeSuper(Class);
    }
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct2(Parent2, args2, Class2) {
          var a = [null];
          a.push.apply(a, args2);
          var Constructor = Function.bind.apply(Parent2, a);
          var instance = new Constructor();
          if (Class2)
            _setPrototypeOf(instance, Class2.prototype);
          return instance;
        };
      }
      return _construct.apply(null, arguments);
    }
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    var _require = require_util();
    var inspect = _require.inspect;
    var _require2 = require_errors();
    var ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function repeat(str, count) {
      count = Math.floor(count);
      if (str.length == 0 || count == 0)
        return "";
      var maxCount = str.length * count;
      count = Math.floor(Math.log(count) / Math.log(2));
      while (count) {
        str += str;
        count--;
      }
      str += str.substring(0, maxCount - str.length);
      return str;
    }
    var blue = "";
    var green = "";
    var red = "";
    var white = "";
    var kReadableOperator = {
      deepStrictEqual: "Expected values to be strictly deep-equal:",
      strictEqual: "Expected values to be strictly equal:",
      strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
      deepEqual: "Expected values to be loosely deep-equal:",
      equal: "Expected values to be loosely equal:",
      notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
      notStrictEqual: 'Expected "actual" to be strictly unequal to:',
      notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
      notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
      notEqual: 'Expected "actual" to be loosely unequal to:',
      notIdentical: "Values identical but not reference-equal:"
    };
    var kMaxShortLength = 10;
    function copyError(source) {
      var keys = Object.keys(source);
      var target = Object.create(Object.getPrototypeOf(source));
      keys.forEach(function(key) {
        target[key] = source[key];
      });
      Object.defineProperty(target, "message", {
        value: source.message
      });
      return target;
    }
    function inspectValue(val) {
      return inspect(val, {
        compact: false,
        customInspect: false,
        depth: 1e3,
        maxArrayLength: Infinity,
        // Assert compares only enumerable properties (with a few exceptions).
        showHidden: false,
        // Having a long line as error is better than wrapping the line for
        // comparison for now.
        // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
        // have meta information about the inspected properties (i.e., know where
        // in what line the property starts and ends).
        breakLength: Infinity,
        // Assert does not detect proxies currently.
        showProxy: false,
        sorted: true,
        // Inspect getters as we also check them when comparing entries.
        getters: true
      });
    }
    function createErrDiff(actual, expected, operator) {
      var other = "";
      var res = "";
      var lastPos = 0;
      var end = "";
      var skipped = false;
      var actualInspected = inspectValue(actual);
      var actualLines = actualInspected.split("\n");
      var expectedLines = inspectValue(expected).split("\n");
      var i = 0;
      var indicator = "";
      if (operator === "strictEqual" && _typeof(actual) === "object" && _typeof(expected) === "object" && actual !== null && expected !== null) {
        operator = "strictEqualObject";
      }
      if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
        var inputLength = actualLines[0].length + expectedLines[0].length;
        if (inputLength <= kMaxShortLength) {
          if ((_typeof(actual) !== "object" || actual === null) && (_typeof(expected) !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
            return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
          }
        } else if (operator !== "strictEqualObject") {
          var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
          if (inputLength < maxLength) {
            while (actualLines[0][i] === expectedLines[0][i]) {
              i++;
            }
            if (i > 2) {
              indicator = "\n  ".concat(repeat(" ", i), "^");
              i = 0;
            }
          }
        }
      }
      var a = actualLines[actualLines.length - 1];
      var b = expectedLines[expectedLines.length - 1];
      while (a === b) {
        if (i++ < 2) {
          end = "\n  ".concat(a).concat(end);
        } else {
          other = a;
        }
        actualLines.pop();
        expectedLines.pop();
        if (actualLines.length === 0 || expectedLines.length === 0)
          break;
        a = actualLines[actualLines.length - 1];
        b = expectedLines[expectedLines.length - 1];
      }
      var maxLines = Math.max(actualLines.length, expectedLines.length);
      if (maxLines === 0) {
        var _actualLines = actualInspected.split("\n");
        if (_actualLines.length > 30) {
          _actualLines[26] = "".concat(blue, "...").concat(white);
          while (_actualLines.length > 27) {
            _actualLines.pop();
          }
        }
        return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
      }
      if (i > 3) {
        end = "\n".concat(blue, "...").concat(white).concat(end);
        skipped = true;
      }
      if (other !== "") {
        end = "\n  ".concat(other).concat(end);
        other = "";
      }
      var printedLines = 0;
      var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
      var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
      for (i = 0; i < maxLines; i++) {
        var cur = i - lastPos;
        if (actualLines.length < i + 1) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(expectedLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(expectedLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
          printedLines++;
        } else if (expectedLines.length < i + 1) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += "\n".concat(blue, "...").concat(white);
              skipped = true;
            } else if (cur > 3) {
              res += "\n  ".concat(actualLines[i - 2]);
              printedLines++;
            }
            res += "\n  ".concat(actualLines[i - 1]);
            printedLines++;
          }
          lastPos = i;
          res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
          printedLines++;
        } else {
          var expectedLine = expectedLines[i];
          var actualLine = actualLines[i];
          var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
          if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
            divergingLines = false;
            actualLine += ",";
          }
          if (divergingLines) {
            if (cur > 1 && i > 2) {
              if (cur > 4) {
                res += "\n".concat(blue, "...").concat(white);
                skipped = true;
              } else if (cur > 3) {
                res += "\n  ".concat(actualLines[i - 2]);
                printedLines++;
              }
              res += "\n  ".concat(actualLines[i - 1]);
              printedLines++;
            }
            lastPos = i;
            res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
            other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
            printedLines += 2;
          } else {
            res += other;
            other = "";
            if (cur === 1 || i === 0) {
              res += "\n  ".concat(actualLine);
              printedLines++;
            }
          }
        }
        if (printedLines > 20 && i < maxLines - 2) {
          return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
        }
      }
      return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
    }
    var AssertionError = /* @__PURE__ */ function(_Error) {
      _inherits(AssertionError2, _Error);
      function AssertionError2(options) {
        var _this;
        _classCallCheck(this, AssertionError2);
        if (_typeof(options) !== "object" || options === null) {
          throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
        var actual = options.actual, expected = options.expected;
        var limit = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        if (message != null) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, String(message)));
        } else {
          if (process.stderr && process.stderr.isTTY) {
            if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
              blue = "\x1B[34m";
              green = "\x1B[32m";
              white = "\x1B[39m";
              red = "\x1B[31m";
            } else {
              blue = "";
              green = "";
              white = "";
              red = "";
            }
          }
          if (_typeof(actual) === "object" && actual !== null && _typeof(expected) === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
            actual = copyError(actual);
            expected = copyError(expected);
          }
          if (operator === "deepStrictEqual" || operator === "strictEqual") {
            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, createErrDiff(actual, expected, operator)));
          } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
            var base = kReadableOperator[operator];
            var res = inspectValue(actual).split("\n");
            if (operator === "notStrictEqual" && _typeof(actual) === "object" && actual !== null) {
              base = kReadableOperator.notStrictEqualObject;
            }
            if (res.length > 30) {
              res[26] = "".concat(blue, "...").concat(white);
              while (res.length > 27) {
                res.pop();
              }
            }
            if (res.length === 1) {
              _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(base, " ").concat(res[0])));
            } else {
              _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n")));
            }
          } else {
            var _res = inspectValue(actual);
            var other = "";
            var knownOperators = kReadableOperator[operator];
            if (operator === "notDeepEqual" || operator === "notEqual") {
              _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
              if (_res.length > 1024) {
                _res = "".concat(_res.slice(0, 1021), "...");
              }
            } else {
              other = "".concat(inspectValue(expected));
              if (_res.length > 512) {
                _res = "".concat(_res.slice(0, 509), "...");
              }
              if (other.length > 512) {
                other = "".concat(other.slice(0, 509), "...");
              }
              if (operator === "deepEqual" || operator === "equal") {
                _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
              } else {
                other = " ".concat(operator, " ").concat(other);
              }
            }
            _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError2).call(this, "".concat(_res).concat(other)));
          }
        }
        Error.stackTraceLimit = limit;
        _this.generatedMessage = !message;
        Object.defineProperty(_assertThisInitialized(_this), "name", {
          value: "AssertionError [ERR_ASSERTION]",
          enumerable: false,
          writable: true,
          configurable: true
        });
        _this.code = "ERR_ASSERTION";
        _this.actual = actual;
        _this.expected = expected;
        _this.operator = operator;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
        }
        _this.stack;
        _this.name = "AssertionError";
        return _possibleConstructorReturn(_this);
      }
      _createClass(AssertionError2, [{
        key: "toString",
        value: function toString() {
          return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
        }
      }, {
        key: inspect.custom,
        value: function value(recurseTimes, ctx) {
          return inspect(this, _objectSpread({}, ctx, {
            customInspect: false,
            depth: 0
          }));
        }
      }]);
      return AssertionError2;
    }(_wrapNativeSuper(Error));
    module.exports = AssertionError;
  }
});

// node_modules/es6-object-assign/index.js
var require_es6_object_assign = __commonJS({
  "node_modules/es6-object-assign/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function assign(target, firstSource) {
      if (target === void 0 || target === null) {
        throw new TypeError("Cannot convert first argument to object");
      }
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === void 0 || nextSource === null) {
          continue;
        }
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
    function polyfill() {
      if (!Object.assign) {
        Object.defineProperty(Object, "assign", {
          enumerable: false,
          configurable: true,
          writable: true,
          value: assign
        });
      }
    }
    module.exports = {
      assign,
      polyfill
    };
  }
});

// node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/object-keys/isArguments.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var toStr = Object.prototype.toString;
    module.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// node_modules/object-keys/implementation.js
var require_implementation2 = __commonJS({
  "node_modules/object-keys/implementation.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module.exports = keysShim;
  }
});

// node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "node_modules/object-keys/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var slice = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation2();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        }(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module.exports = keysShim;
  }
});

// node_modules/define-properties/index.js
var require_define_properties = __commonJS({
  "node_modules/define-properties/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var keys = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat = Array.prototype.concat;
    var origDefineProperty = Object.defineProperty;
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    };
    var arePropertyDescriptorsSupported = function() {
      var obj = {};
      try {
        origDefineProperty(obj, "x", { enumerable: false, value: obj });
        for (var _ in obj) {
          return false;
        }
        return obj.x === obj;
      } catch (e) {
        return false;
      }
    };
    var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object && (!isFunction(predicate) || !predicate())) {
        return;
      }
      if (supportsDescriptors) {
        origDefineProperty(object, name, {
          configurable: true,
          enumerable: false,
          value,
          writable: true
        });
      } else {
        object[name] = value;
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = concat.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module.exports = defineProperties;
  }
});

// node_modules/object-is/implementation.js
var require_implementation3 = __commonJS({
  "node_modules/object-is/implementation.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var numberIsNaN = function(value) {
      return value !== value;
    };
    module.exports = function is(a, b) {
      if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
      }
      if (a === b) {
        return true;
      }
      if (numberIsNaN(a) && numberIsNaN(b)) {
        return true;
      }
      return false;
    };
  }
});

// node_modules/object-is/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/object-is/polyfill.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var implementation = require_implementation3();
    module.exports = function getPolyfill() {
      return typeof Object.is === "function" ? Object.is : implementation;
    };
  }
});

// node_modules/object-is/shim.js
var require_shim = __commonJS({
  "node_modules/object-is/shim.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var getPolyfill = require_polyfill();
    var define = require_define_properties();
    module.exports = function shimObjectIs() {
      var polyfill = getPolyfill();
      define(Object, { is: polyfill }, {
        is: function testObjectIs() {
          return Object.is !== polyfill;
        }
      });
      return polyfill;
    };
  }
});

// node_modules/object-is/index.js
var require_object_is = __commonJS({
  "node_modules/object-is/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var define = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation3();
    var getPolyfill = require_polyfill();
    var shim = require_shim();
    var polyfill = callBind(getPolyfill(), Object);
    define(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = polyfill;
  }
});

// node_modules/is-nan/implementation.js
var require_implementation4 = __commonJS({
  "node_modules/is-nan/implementation.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    module.exports = function isNaN2(value) {
      return value !== value;
    };
  }
});

// node_modules/is-nan/polyfill.js
var require_polyfill2 = __commonJS({
  "node_modules/is-nan/polyfill.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var implementation = require_implementation4();
    module.exports = function getPolyfill() {
      if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) {
        return Number.isNaN;
      }
      return implementation;
    };
  }
});

// node_modules/is-nan/shim.js
var require_shim2 = __commonJS({
  "node_modules/is-nan/shim.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var define = require_define_properties();
    var getPolyfill = require_polyfill2();
    module.exports = function shimNumberIsNaN() {
      var polyfill = getPolyfill();
      define(Number, { isNaN: polyfill }, {
        isNaN: function testIsNaN() {
          return Number.isNaN !== polyfill;
        }
      });
      return polyfill;
    };
  }
});

// node_modules/is-nan/index.js
var require_is_nan = __commonJS({
  "node_modules/is-nan/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var callBind = require_call_bind();
    var define = require_define_properties();
    var implementation = require_implementation4();
    var getPolyfill = require_polyfill2();
    var shim = require_shim2();
    var polyfill = callBind(getPolyfill(), Number);
    define(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = polyfill;
  }
});

// node_modules/assert/build/internal/util/comparisons.js
var require_comparisons = __commonJS({
  "node_modules/assert/build/internal/util/comparisons.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err2) {
        _d = true;
        _e = err2;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    var regexFlagsSupported = /a/g.flags !== void 0;
    var arrayFromSet = function arrayFromSet2(set) {
      var array = [];
      set.forEach(function(value) {
        return array.push(value);
      });
      return array;
    };
    var arrayFromMap = function arrayFromMap2(map) {
      var array = [];
      map.forEach(function(value, key) {
        return array.push([key, value]);
      });
      return array;
    };
    var objectIs = Object.is ? Object.is : require_object_is();
    var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
      return [];
    };
    var numberIsNaN = Number.isNaN ? Number.isNaN : require_is_nan();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
    var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
    var objectToString = uncurryThis(Object.prototype.toString);
    var _require$types = require_util().types;
    var isAnyArrayBuffer = _require$types.isAnyArrayBuffer;
    var isArrayBufferView = _require$types.isArrayBufferView;
    var isDate = _require$types.isDate;
    var isMap = _require$types.isMap;
    var isRegExp = _require$types.isRegExp;
    var isSet = _require$types.isSet;
    var isNativeError = _require$types.isNativeError;
    var isBoxedPrimitive = _require$types.isBoxedPrimitive;
    var isNumberObject = _require$types.isNumberObject;
    var isStringObject = _require$types.isStringObject;
    var isBooleanObject = _require$types.isBooleanObject;
    var isBigIntObject = _require$types.isBigIntObject;
    var isSymbolObject = _require$types.isSymbolObject;
    var isFloat32Array = _require$types.isFloat32Array;
    var isFloat64Array = _require$types.isFloat64Array;
    function isNonIndex(key) {
      if (key.length === 0 || key.length > 10)
        return true;
      for (var i = 0; i < key.length; i++) {
        var code = key.charCodeAt(i);
        if (code < 48 || code > 57)
          return true;
      }
      return key.length === 10 && key >= Math.pow(2, 32);
    }
    function getOwnNonIndexProperties(value) {
      return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
    }
    function compare(a, b) {
      if (a === b) {
        return 0;
      }
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) {
        return -1;
      }
      if (y < x) {
        return 1;
      }
      return 0;
    }
    var ONLY_ENUMERABLE = void 0;
    var kStrict = true;
    var kLoose = false;
    var kNoIterator = 0;
    var kIsArray = 1;
    var kIsSet = 2;
    var kIsMap = 3;
    function areSimilarRegExps(a, b) {
      return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
    }
    function areSimilarFloatArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      for (var offset = 0; offset < a.byteLength; offset++) {
        if (a[offset] !== b[offset]) {
          return false;
        }
      }
      return true;
    }
    function areSimilarTypedArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
    }
    function areEqualArrayBuffers(buf1, buf2) {
      return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
    }
    function isEqualBoxedPrimitive(val1, val2) {
      if (isNumberObject(val1)) {
        return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
      }
      if (isStringObject(val1)) {
        return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
      }
      if (isBooleanObject(val1)) {
        return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
      }
      if (isBigIntObject(val1)) {
        return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
      }
      return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
    }
    function innerDeepEqual(val1, val2, strict, memos) {
      if (val1 === val2) {
        if (val1 !== 0)
          return true;
        return strict ? objectIs(val1, val2) : true;
      }
      if (strict) {
        if (_typeof(val1) !== "object") {
          return typeof val1 === "number" && numberIsNaN(val1) && numberIsNaN(val2);
        }
        if (_typeof(val2) !== "object" || val1 === null || val2 === null) {
          return false;
        }
        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
          return false;
        }
      } else {
        if (val1 === null || _typeof(val1) !== "object") {
          if (val2 === null || _typeof(val2) !== "object") {
            return val1 == val2;
          }
          return false;
        }
        if (val2 === null || _typeof(val2) !== "object") {
          return false;
        }
      }
      var val1Tag = objectToString(val1);
      var val2Tag = objectToString(val2);
      if (val1Tag !== val2Tag) {
        return false;
      }
      if (Array.isArray(val1)) {
        if (val1.length !== val2.length) {
          return false;
        }
        var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
        var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
      }
      if (val1Tag === "[object Object]") {
        if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
          return false;
        }
      }
      if (isDate(val1)) {
        if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
          return false;
        }
      } else if (isRegExp(val1)) {
        if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
          return false;
        }
      } else if (isNativeError(val1) || val1 instanceof Error) {
        if (val1.message !== val2.message || val1.name !== val2.name) {
          return false;
        }
      } else if (isArrayBufferView(val1)) {
        if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
          if (!areSimilarFloatArrays(val1, val2)) {
            return false;
          }
        } else if (!areSimilarTypedArrays(val1, val2)) {
          return false;
        }
        var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
        var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
        if (_keys.length !== _keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
      } else if (isSet(val1)) {
        if (!isSet(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsSet);
      } else if (isMap(val1)) {
        if (!isMap(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, strict, memos, kIsMap);
      } else if (isAnyArrayBuffer(val1)) {
        if (!areEqualArrayBuffers(val1, val2)) {
          return false;
        }
      } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
        return false;
      }
      return keyCheck(val1, val2, strict, memos, kNoIterator);
    }
    function getEnumerables(val, keys) {
      return keys.filter(function(k) {
        return propertyIsEnumerable(val, k);
      });
    }
    function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
      if (arguments.length === 5) {
        aKeys = Object.keys(val1);
        var bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
          return false;
        }
      }
      var i = 0;
      for (; i < aKeys.length; i++) {
        if (!hasOwnProperty(val2, aKeys[i])) {
          return false;
        }
      }
      if (strict && arguments.length === 5) {
        var symbolKeysA = objectGetOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
          var count = 0;
          for (i = 0; i < symbolKeysA.length; i++) {
            var key = symbolKeysA[i];
            if (propertyIsEnumerable(val1, key)) {
              if (!propertyIsEnumerable(val2, key)) {
                return false;
              }
              aKeys.push(key);
              count++;
            } else if (propertyIsEnumerable(val2, key)) {
              return false;
            }
          }
          var symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
            return false;
          }
        } else {
          var _symbolKeysB = objectGetOwnPropertySymbols(val2);
          if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
            return false;
          }
        }
      }
      if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
        return true;
      }
      if (memos === void 0) {
        memos = {
          val1: /* @__PURE__ */ new Map(),
          val2: /* @__PURE__ */ new Map(),
          position: 0
        };
      } else {
        var val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== void 0) {
          var val2MemoB = memos.val2.get(val2);
          if (val2MemoB !== void 0) {
            return val2MemoA === val2MemoB;
          }
        }
        memos.position++;
      }
      memos.val1.set(val1, memos.position);
      memos.val2.set(val2, memos.position);
      var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
      memos.val1.delete(val1);
      memos.val2.delete(val2);
      return areEq;
    }
    function setHasEqualElement(set, val1, strict, memo) {
      var setValues = arrayFromSet(set);
      for (var i = 0; i < setValues.length; i++) {
        var val2 = setValues[i];
        if (innerDeepEqual(val1, val2, strict, memo)) {
          set.delete(val2);
          return true;
        }
      }
      return false;
    }
    function findLooseMatchingPrimitives(prim) {
      switch (_typeof(prim)) {
        case "undefined":
          return null;
        case "object":
          return void 0;
        case "symbol":
          return false;
        case "string":
          prim = +prim;
        case "number":
          if (numberIsNaN(prim)) {
            return false;
          }
      }
      return true;
    }
    function setMightHaveLoosePrim(a, b, prim) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null)
        return altValue;
      return b.has(altValue) && !a.has(altValue);
    }
    function mapMightHaveLoosePrim(a, b, prim, item, memo) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) {
        return altValue;
      }
      var curB = b.get(altValue);
      if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
        return false;
      }
      return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
    }
    function setEquiv(a, b, strict, memo) {
      var set = null;
      var aValues = arrayFromSet(a);
      for (var i = 0; i < aValues.length; i++) {
        var val = aValues[i];
        if (_typeof(val) === "object" && val !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        } else if (!b.has(val)) {
          if (strict)
            return false;
          if (!setMightHaveLoosePrim(a, b, val)) {
            return false;
          }
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        }
      }
      if (set !== null) {
        var bValues = arrayFromSet(b);
        for (var _i = 0; _i < bValues.length; _i++) {
          var _val = bValues[_i];
          if (_typeof(_val) === "object" && _val !== null) {
            if (!setHasEqualElement(set, _val, strict, memo))
              return false;
          } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
            return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
      var setValues = arrayFromSet(set);
      for (var i = 0; i < setValues.length; i++) {
        var key2 = setValues[i];
        if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
          set.delete(key2);
          return true;
        }
      }
      return false;
    }
    function mapEquiv(a, b, strict, memo) {
      var set = null;
      var aEntries = arrayFromMap(a);
      for (var i = 0; i < aEntries.length; i++) {
        var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
        if (_typeof(key) === "object" && key !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(key);
        } else {
          var item2 = b.get(key);
          if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
            if (strict)
              return false;
            if (!mapMightHaveLoosePrim(a, b, key, item1, memo))
              return false;
            if (set === null) {
              set = /* @__PURE__ */ new Set();
            }
            set.add(key);
          }
        }
      }
      if (set !== null) {
        var bEntries = arrayFromMap(b);
        for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
          var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), key = _bEntries$_i[0], item = _bEntries$_i[1];
          if (_typeof(key) === "object" && key !== null) {
            if (!mapHasEqualEntry(set, a, key, item, strict, memo))
              return false;
          } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
            return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    function objEquiv(a, b, strict, keys, memos, iterationType) {
      var i = 0;
      if (iterationType === kIsSet) {
        if (!setEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsMap) {
        if (!mapEquiv(a, b, strict, memos)) {
          return false;
        }
      } else if (iterationType === kIsArray) {
        for (; i < a.length; i++) {
          if (hasOwnProperty(a, i)) {
            if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
              return false;
            }
          } else if (hasOwnProperty(b, i)) {
            return false;
          } else {
            var keysA = Object.keys(a);
            for (; i < keysA.length; i++) {
              var key = keysA[i];
              if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
                return false;
              }
            }
            if (keysA.length !== Object.keys(b).length) {
              return false;
            }
            return true;
          }
        }
      }
      for (i = 0; i < keys.length; i++) {
        var _key = keys[i];
        if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
          return false;
        }
      }
      return true;
    }
    function isDeepEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kLoose);
    }
    function isDeepStrictEqual(val1, val2) {
      return innerDeepEqual(val1, val2, kStrict);
    }
    module.exports = {
      isDeepEqual,
      isDeepStrictEqual
    };
  }
});

// node_modules/assert/build/assert.js
var require_assert = __commonJS({
  "node_modules/assert/build/assert.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var _require = require_errors();
    var _require$codes = _require.codes;
    var ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE;
    var ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var AssertionError = require_assertion_error();
    var _require2 = require_util();
    var inspect = _require2.inspect;
    var _require$types = require_util().types;
    var isPromise = _require$types.isPromise;
    var isRegExp = _require$types.isRegExp;
    var objectAssign = Object.assign ? Object.assign : require_es6_object_assign().assign;
    var objectIs = Object.is ? Object.is : require_object_is();
    var isDeepEqual;
    var isDeepStrictEqual;
    function lazyLoadComparison() {
      var comparison = require_comparisons();
      isDeepEqual = comparison.isDeepEqual;
      isDeepStrictEqual = comparison.isDeepStrictEqual;
    }
    var warned = false;
    var assert4 = module.exports = ok;
    var NO_EXCEPTION_SENTINEL = {};
    function innerFail(obj) {
      if (obj.message instanceof Error)
        throw obj.message;
      throw new AssertionError(obj);
    }
    function fail(actual, expected, message, operator, stackStartFn) {
      var argsLen = arguments.length;
      var internalMessage;
      if (argsLen === 0) {
        internalMessage = "Failed";
      } else if (argsLen === 1) {
        message = actual;
        actual = void 0;
      } else {
        if (warned === false) {
          warned = true;
          var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
          warn("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
        }
        if (argsLen === 2)
          operator = "!=";
      }
      if (message instanceof Error)
        throw message;
      var errArgs = {
        actual,
        expected,
        operator: operator === void 0 ? "fail" : operator,
        stackStartFn: stackStartFn || fail
      };
      if (message !== void 0) {
        errArgs.message = message;
      }
      var err2 = new AssertionError(errArgs);
      if (internalMessage) {
        err2.message = internalMessage;
        err2.generatedMessage = true;
      }
      throw err2;
    }
    assert4.fail = fail;
    assert4.AssertionError = AssertionError;
    function innerOk(fn, argLen, value, message) {
      if (!value) {
        var generatedMessage = false;
        if (argLen === 0) {
          generatedMessage = true;
          message = "No value argument passed to `assert.ok()`";
        } else if (message instanceof Error) {
          throw message;
        }
        var err2 = new AssertionError({
          actual: value,
          expected: true,
          message,
          operator: "==",
          stackStartFn: fn
        });
        err2.generatedMessage = generatedMessage;
        throw err2;
      }
    }
    function ok() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      innerOk.apply(void 0, [ok, args.length].concat(args));
    }
    assert4.ok = ok;
    assert4.equal = function equal(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual != expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "==",
          stackStartFn: equal
        });
      }
    };
    assert4.notEqual = function notEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (actual == expected) {
        innerFail({
          actual,
          expected,
          message,
          operator: "!=",
          stackStartFn: notEqual
        });
      }
    };
    assert4.deepEqual = function deepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (!isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepEqual",
          stackStartFn: deepEqual
        });
      }
    };
    assert4.notDeepEqual = function notDeepEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (isDeepEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepEqual",
          stackStartFn: notDeepEqual
        });
      }
    };
    assert4.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (!isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "deepStrictEqual",
          stackStartFn: deepStrictEqual
        });
      }
    };
    assert4.notDeepStrictEqual = notDeepStrictEqual;
    function notDeepStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (isDeepEqual === void 0)
        lazyLoadComparison();
      if (isDeepStrictEqual(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notDeepStrictEqual",
          stackStartFn: notDeepStrictEqual
        });
      }
    }
    assert4.strictEqual = function strictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (!objectIs(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "strictEqual",
          stackStartFn: strictEqual
        });
      }
    };
    assert4.notStrictEqual = function notStrictEqual(actual, expected, message) {
      if (arguments.length < 2) {
        throw new ERR_MISSING_ARGS("actual", "expected");
      }
      if (objectIs(actual, expected)) {
        innerFail({
          actual,
          expected,
          message,
          operator: "notStrictEqual",
          stackStartFn: notStrictEqual
        });
      }
    };
    var Comparison = function Comparison2(obj, keys, actual) {
      var _this = this;
      _classCallCheck(this, Comparison2);
      keys.forEach(function(key) {
        if (key in obj) {
          if (actual !== void 0 && typeof actual[key] === "string" && isRegExp(obj[key]) && obj[key].test(actual[key])) {
            _this[key] = actual[key];
          } else {
            _this[key] = obj[key];
          }
        }
      });
    };
    function compareExceptionKey(actual, expected, key, message, keys, fn) {
      if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
        if (!message) {
          var a = new Comparison(actual, keys);
          var b = new Comparison(expected, keys, actual);
          var err2 = new AssertionError({
            actual: a,
            expected: b,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err2.actual = actual;
          err2.expected = expected;
          err2.operator = fn.name;
          throw err2;
        }
        innerFail({
          actual,
          expected,
          message,
          operator: fn.name,
          stackStartFn: fn
        });
      }
    }
    function expectedException(actual, expected, msg, fn) {
      if (typeof expected !== "function") {
        if (isRegExp(expected))
          return expected.test(actual);
        if (arguments.length === 2) {
          throw new ERR_INVALID_ARG_TYPE("expected", ["Function", "RegExp"], expected);
        }
        if (_typeof(actual) !== "object" || actual === null) {
          var err2 = new AssertionError({
            actual,
            expected,
            message: msg,
            operator: "deepStrictEqual",
            stackStartFn: fn
          });
          err2.operator = fn.name;
          throw err2;
        }
        var keys = Object.keys(expected);
        if (expected instanceof Error) {
          keys.push("name", "message");
        } else if (keys.length === 0) {
          throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
        }
        if (isDeepEqual === void 0)
          lazyLoadComparison();
        keys.forEach(function(key) {
          if (typeof actual[key] === "string" && isRegExp(expected[key]) && expected[key].test(actual[key])) {
            return;
          }
          compareExceptionKey(actual, expected, key, msg, keys, fn);
        });
        return true;
      }
      if (expected.prototype !== void 0 && actual instanceof expected) {
        return true;
      }
      if (Error.isPrototypeOf(expected)) {
        return false;
      }
      return expected.call({}, actual) === true;
    }
    function getActual(fn) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
      }
      try {
        fn();
      } catch (e) {
        return e;
      }
      return NO_EXCEPTION_SENTINEL;
    }
    function checkIsPromise(obj) {
      return isPromise(obj) || obj !== null && _typeof(obj) === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
    }
    function waitForActual(promiseFn) {
      return Promise.resolve().then(function() {
        var resultPromise;
        if (typeof promiseFn === "function") {
          resultPromise = promiseFn();
          if (!checkIsPromise(resultPromise)) {
            throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
          }
        } else if (checkIsPromise(promiseFn)) {
          resultPromise = promiseFn;
        } else {
          throw new ERR_INVALID_ARG_TYPE("promiseFn", ["Function", "Promise"], promiseFn);
        }
        return Promise.resolve().then(function() {
          return resultPromise;
        }).then(function() {
          return NO_EXCEPTION_SENTINEL;
        }).catch(function(e) {
          return e;
        });
      });
    }
    function expectsError(stackStartFn, actual, error, message) {
      if (typeof error === "string") {
        if (arguments.length === 4) {
          throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
        }
        if (_typeof(actual) === "object" && actual !== null) {
          if (actual.message === error) {
            throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
          }
        } else if (actual === error) {
          throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
        }
        message = error;
        error = void 0;
      } else if (error != null && _typeof(error) !== "object" && typeof error !== "function") {
        throw new ERR_INVALID_ARG_TYPE("error", ["Object", "Error", "Function", "RegExp"], error);
      }
      if (actual === NO_EXCEPTION_SENTINEL) {
        var details = "";
        if (error && error.name) {
          details += " (".concat(error.name, ")");
        }
        details += message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
        innerFail({
          actual: void 0,
          expected: error,
          operator: stackStartFn.name,
          message: "Missing expected ".concat(fnType).concat(details),
          stackStartFn
        });
      }
      if (error && !expectedException(actual, error, message, stackStartFn)) {
        throw actual;
      }
    }
    function expectsNoError(stackStartFn, actual, error, message) {
      if (actual === NO_EXCEPTION_SENTINEL)
        return;
      if (typeof error === "string") {
        message = error;
        error = void 0;
      }
      if (!error || expectedException(actual, error)) {
        var details = message ? ": ".concat(message) : ".";
        var fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
        innerFail({
          actual,
          expected: error,
          operator: stackStartFn.name,
          message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
          stackStartFn
        });
      }
      throw actual;
    }
    assert4.throws = function throws(promiseFn) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
    };
    assert4.rejects = function rejects(promiseFn) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return waitForActual(promiseFn).then(function(result) {
        return expectsError.apply(void 0, [rejects, result].concat(args));
      });
    };
    assert4.doesNotThrow = function doesNotThrow(fn) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
    };
    assert4.doesNotReject = function doesNotReject(fn) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return waitForActual(fn).then(function(result) {
        return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
      });
    };
    assert4.ifError = function ifError(err2) {
      if (err2 !== null && err2 !== void 0) {
        var message = "ifError got unwanted exception: ";
        if (_typeof(err2) === "object" && typeof err2.message === "string") {
          if (err2.message.length === 0 && err2.constructor) {
            message += err2.constructor.name;
          } else {
            message += err2.message;
          }
        } else {
          message += inspect(err2);
        }
        var newErr = new AssertionError({
          actual: err2,
          expected: null,
          operator: "ifError",
          message,
          stackStartFn: ifError
        });
        var origStack = err2.stack;
        if (typeof origStack === "string") {
          var tmp2 = origStack.split("\n");
          tmp2.shift();
          var tmp1 = newErr.stack.split("\n");
          for (var i = 0; i < tmp2.length; i++) {
            var pos = tmp1.indexOf(tmp2[i]);
            if (pos !== -1) {
              tmp1 = tmp1.slice(0, pos);
              break;
            }
          }
          newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
        }
        throw newErr;
      }
    };
    function strict() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      innerOk.apply(void 0, [strict, args.length].concat(args));
    }
    assert4.strict = objectAssign(strict, assert4, {
      equal: assert4.strictEqual,
      deepEqual: assert4.deepStrictEqual,
      notEqual: assert4.notStrictEqual,
      notDeepEqual: assert4.notDeepStrictEqual
    });
    assert4.strict.strict = assert4.strict;
  }
});

// node_modules/path-browserify/index.js
var require_path_browserify = __commonJS({
  "node_modules/path-browserify/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length)
          code = path2.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) {
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path2.slice(lastSlash + 1, i);
            else
              res = path2.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      // path.resolve([from ...], to)
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd2;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path2;
          if (i >= 0)
            path2 = arguments[i];
          else {
            if (cwd2 === void 0)
              cwd2 = cwd();
            path2 = cwd2;
          }
          assertPath(path2);
          if (path2.length === 0) {
            continue;
          }
          resolvedPath = path2 + "/" + resolvedPath;
          resolvedAbsolute = path2.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var isAbsolute = path2.charCodeAt(0) === 47;
        var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
        path2 = normalizeStringPosix(path2, !isAbsolute);
        if (path2.length === 0 && !isAbsolute)
          path2 = ".";
        if (path2.length > 0 && trailingSeparator)
          path2 += "/";
        if (isAbsolute)
          return "/" + path2;
        return path2;
      },
      isAbsolute: function isAbsolute(path2) {
        assertPath(path2);
        return path2.length > 0 && path2.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to)
          return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to)
          return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path2) {
        return path2;
      },
      dirname: function dirname(path2) {
        assertPath(path2);
        if (path2.length === 0)
          return ".";
        var code = path2.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path2.length - 1; i >= 1; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1)
          return hasRoot ? "/" : ".";
        if (hasRoot && end === 1)
          return "//";
        return path2.slice(0, end);
      },
      basename: function basename(path2, ext) {
        if (ext !== void 0 && typeof ext !== "string")
          throw new TypeError('"ext" argument must be a string');
        assertPath(path2);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
          if (ext.length === path2.length && ext === path2)
            return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path2.length - 1; i >= 0; --i) {
            var code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end)
            end = firstNonSlashEnd;
          else if (end === -1)
            end = path2.length;
          return path2.slice(start, end);
        } else {
          for (i = path2.length - 1; i >= 0; --i) {
            if (path2.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path2.slice(start, end);
        }
      },
      extname: function extname(path2) {
        assertPath(path2);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path2.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path2) {
        assertPath(path2);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path2.length === 0)
          return ret;
        var code = path2.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path2.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute)
              ret.base = ret.name = path2.slice(1, end);
            else
              ret.base = ret.name = path2.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path2.slice(1, startDot);
            ret.base = path2.slice(1, end);
          } else {
            ret.name = path2.slice(startPart, startDot);
            ret.base = path2.slice(startPart, end);
          }
          ret.ext = path2.slice(startDot, end);
        }
        if (startPart > 0)
          ret.dir = path2.slice(0, startPart - 1);
        else if (isAbsolute)
          ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    module.exports = posix;
  }
});

// node_modules/@wasmer/wasi/lib/polyfills/bigint.js
var require_bigint = __commonJS({
  "node_modules/@wasmer/wasi/lib/polyfills/bigint.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globalObj = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : {};
    exports.BigIntPolyfill = typeof BigInt !== "undefined" ? BigInt : globalObj.BigInt || Number;
  }
});

// node_modules/@wasmer/wasi/lib/constants.js
var require_constants = __commonJS({
  "node_modules/@wasmer/wasi/lib/constants.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var bigint_1 = require_bigint();
    exports.WASI_ESUCCESS = 0;
    exports.WASI_E2BIG = 1;
    exports.WASI_EACCES = 2;
    exports.WASI_EADDRINUSE = 3;
    exports.WASI_EADDRNOTAVAIL = 4;
    exports.WASI_EAFNOSUPPORT = 5;
    exports.WASI_EAGAIN = 6;
    exports.WASI_EALREADY = 7;
    exports.WASI_EBADF = 8;
    exports.WASI_EBADMSG = 9;
    exports.WASI_EBUSY = 10;
    exports.WASI_ECANCELED = 11;
    exports.WASI_ECHILD = 12;
    exports.WASI_ECONNABORTED = 13;
    exports.WASI_ECONNREFUSED = 14;
    exports.WASI_ECONNRESET = 15;
    exports.WASI_EDEADLK = 16;
    exports.WASI_EDESTADDRREQ = 17;
    exports.WASI_EDOM = 18;
    exports.WASI_EDQUOT = 19;
    exports.WASI_EEXIST = 20;
    exports.WASI_EFAULT = 21;
    exports.WASI_EFBIG = 22;
    exports.WASI_EHOSTUNREACH = 23;
    exports.WASI_EIDRM = 24;
    exports.WASI_EILSEQ = 25;
    exports.WASI_EINPROGRESS = 26;
    exports.WASI_EINTR = 27;
    exports.WASI_EINVAL = 28;
    exports.WASI_EIO = 29;
    exports.WASI_EISCONN = 30;
    exports.WASI_EISDIR = 31;
    exports.WASI_ELOOP = 32;
    exports.WASI_EMFILE = 33;
    exports.WASI_EMLINK = 34;
    exports.WASI_EMSGSIZE = 35;
    exports.WASI_EMULTIHOP = 36;
    exports.WASI_ENAMETOOLONG = 37;
    exports.WASI_ENETDOWN = 38;
    exports.WASI_ENETRESET = 39;
    exports.WASI_ENETUNREACH = 40;
    exports.WASI_ENFILE = 41;
    exports.WASI_ENOBUFS = 42;
    exports.WASI_ENODEV = 43;
    exports.WASI_ENOENT = 44;
    exports.WASI_ENOEXEC = 45;
    exports.WASI_ENOLCK = 46;
    exports.WASI_ENOLINK = 47;
    exports.WASI_ENOMEM = 48;
    exports.WASI_ENOMSG = 49;
    exports.WASI_ENOPROTOOPT = 50;
    exports.WASI_ENOSPC = 51;
    exports.WASI_ENOSYS = 52;
    exports.WASI_ENOTCONN = 53;
    exports.WASI_ENOTDIR = 54;
    exports.WASI_ENOTEMPTY = 55;
    exports.WASI_ENOTRECOVERABLE = 56;
    exports.WASI_ENOTSOCK = 57;
    exports.WASI_ENOTSUP = 58;
    exports.WASI_ENOTTY = 59;
    exports.WASI_ENXIO = 60;
    exports.WASI_EOVERFLOW = 61;
    exports.WASI_EOWNERDEAD = 62;
    exports.WASI_EPERM = 63;
    exports.WASI_EPIPE = 64;
    exports.WASI_EPROTO = 65;
    exports.WASI_EPROTONOSUPPORT = 66;
    exports.WASI_EPROTOTYPE = 67;
    exports.WASI_ERANGE = 68;
    exports.WASI_EROFS = 69;
    exports.WASI_ESPIPE = 70;
    exports.WASI_ESRCH = 71;
    exports.WASI_ESTALE = 72;
    exports.WASI_ETIMEDOUT = 73;
    exports.WASI_ETXTBSY = 74;
    exports.WASI_EXDEV = 75;
    exports.WASI_ENOTCAPABLE = 76;
    exports.WASI_SIGABRT = 0;
    exports.WASI_SIGALRM = 1;
    exports.WASI_SIGBUS = 2;
    exports.WASI_SIGCHLD = 3;
    exports.WASI_SIGCONT = 4;
    exports.WASI_SIGFPE = 5;
    exports.WASI_SIGHUP = 6;
    exports.WASI_SIGILL = 7;
    exports.WASI_SIGINT = 8;
    exports.WASI_SIGKILL = 9;
    exports.WASI_SIGPIPE = 10;
    exports.WASI_SIGQUIT = 11;
    exports.WASI_SIGSEGV = 12;
    exports.WASI_SIGSTOP = 13;
    exports.WASI_SIGTERM = 14;
    exports.WASI_SIGTRAP = 15;
    exports.WASI_SIGTSTP = 16;
    exports.WASI_SIGTTIN = 17;
    exports.WASI_SIGTTOU = 18;
    exports.WASI_SIGURG = 19;
    exports.WASI_SIGUSR1 = 20;
    exports.WASI_SIGUSR2 = 21;
    exports.WASI_SIGVTALRM = 22;
    exports.WASI_SIGXCPU = 23;
    exports.WASI_SIGXFSZ = 24;
    exports.WASI_FILETYPE_UNKNOWN = 0;
    exports.WASI_FILETYPE_BLOCK_DEVICE = 1;
    exports.WASI_FILETYPE_CHARACTER_DEVICE = 2;
    exports.WASI_FILETYPE_DIRECTORY = 3;
    exports.WASI_FILETYPE_REGULAR_FILE = 4;
    exports.WASI_FILETYPE_SOCKET_DGRAM = 5;
    exports.WASI_FILETYPE_SOCKET_STREAM = 6;
    exports.WASI_FILETYPE_SYMBOLIC_LINK = 7;
    exports.WASI_FDFLAG_APPEND = 1;
    exports.WASI_FDFLAG_DSYNC = 2;
    exports.WASI_FDFLAG_NONBLOCK = 4;
    exports.WASI_FDFLAG_RSYNC = 8;
    exports.WASI_FDFLAG_SYNC = 16;
    exports.WASI_RIGHT_FD_DATASYNC = bigint_1.BigIntPolyfill(1);
    exports.WASI_RIGHT_FD_READ = bigint_1.BigIntPolyfill(2);
    exports.WASI_RIGHT_FD_SEEK = bigint_1.BigIntPolyfill(4);
    exports.WASI_RIGHT_FD_FDSTAT_SET_FLAGS = bigint_1.BigIntPolyfill(8);
    exports.WASI_RIGHT_FD_SYNC = bigint_1.BigIntPolyfill(16);
    exports.WASI_RIGHT_FD_TELL = bigint_1.BigIntPolyfill(32);
    exports.WASI_RIGHT_FD_WRITE = bigint_1.BigIntPolyfill(64);
    exports.WASI_RIGHT_FD_ADVISE = bigint_1.BigIntPolyfill(128);
    exports.WASI_RIGHT_FD_ALLOCATE = bigint_1.BigIntPolyfill(256);
    exports.WASI_RIGHT_PATH_CREATE_DIRECTORY = bigint_1.BigIntPolyfill(512);
    exports.WASI_RIGHT_PATH_CREATE_FILE = bigint_1.BigIntPolyfill(1024);
    exports.WASI_RIGHT_PATH_LINK_SOURCE = bigint_1.BigIntPolyfill(2048);
    exports.WASI_RIGHT_PATH_LINK_TARGET = bigint_1.BigIntPolyfill(4096);
    exports.WASI_RIGHT_PATH_OPEN = bigint_1.BigIntPolyfill(8192);
    exports.WASI_RIGHT_FD_READDIR = bigint_1.BigIntPolyfill(16384);
    exports.WASI_RIGHT_PATH_READLINK = bigint_1.BigIntPolyfill(32768);
    exports.WASI_RIGHT_PATH_RENAME_SOURCE = bigint_1.BigIntPolyfill(65536);
    exports.WASI_RIGHT_PATH_RENAME_TARGET = bigint_1.BigIntPolyfill(131072);
    exports.WASI_RIGHT_PATH_FILESTAT_GET = bigint_1.BigIntPolyfill(262144);
    exports.WASI_RIGHT_PATH_FILESTAT_SET_SIZE = bigint_1.BigIntPolyfill(524288);
    exports.WASI_RIGHT_PATH_FILESTAT_SET_TIMES = bigint_1.BigIntPolyfill(1048576);
    exports.WASI_RIGHT_FD_FILESTAT_GET = bigint_1.BigIntPolyfill(2097152);
    exports.WASI_RIGHT_FD_FILESTAT_SET_SIZE = bigint_1.BigIntPolyfill(4194304);
    exports.WASI_RIGHT_FD_FILESTAT_SET_TIMES = bigint_1.BigIntPolyfill(8388608);
    exports.WASI_RIGHT_PATH_SYMLINK = bigint_1.BigIntPolyfill(16777216);
    exports.WASI_RIGHT_PATH_REMOVE_DIRECTORY = bigint_1.BigIntPolyfill(33554432);
    exports.WASI_RIGHT_PATH_UNLINK_FILE = bigint_1.BigIntPolyfill(67108864);
    exports.WASI_RIGHT_POLL_FD_READWRITE = bigint_1.BigIntPolyfill(134217728);
    exports.WASI_RIGHT_SOCK_SHUTDOWN = bigint_1.BigIntPolyfill(268435456);
    exports.RIGHTS_ALL = exports.WASI_RIGHT_FD_DATASYNC | exports.WASI_RIGHT_FD_READ | exports.WASI_RIGHT_FD_SEEK | exports.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports.WASI_RIGHT_FD_SYNC | exports.WASI_RIGHT_FD_TELL | exports.WASI_RIGHT_FD_WRITE | exports.WASI_RIGHT_FD_ADVISE | exports.WASI_RIGHT_FD_ALLOCATE | exports.WASI_RIGHT_PATH_CREATE_DIRECTORY | exports.WASI_RIGHT_PATH_CREATE_FILE | exports.WASI_RIGHT_PATH_LINK_SOURCE | exports.WASI_RIGHT_PATH_LINK_TARGET | exports.WASI_RIGHT_PATH_OPEN | exports.WASI_RIGHT_FD_READDIR | exports.WASI_RIGHT_PATH_READLINK | exports.WASI_RIGHT_PATH_RENAME_SOURCE | exports.WASI_RIGHT_PATH_RENAME_TARGET | exports.WASI_RIGHT_PATH_FILESTAT_GET | exports.WASI_RIGHT_PATH_FILESTAT_SET_SIZE | exports.WASI_RIGHT_PATH_FILESTAT_SET_TIMES | exports.WASI_RIGHT_FD_FILESTAT_GET | exports.WASI_RIGHT_FD_FILESTAT_SET_TIMES | exports.WASI_RIGHT_FD_FILESTAT_SET_SIZE | exports.WASI_RIGHT_PATH_SYMLINK | exports.WASI_RIGHT_PATH_UNLINK_FILE | exports.WASI_RIGHT_PATH_REMOVE_DIRECTORY | exports.WASI_RIGHT_POLL_FD_READWRITE | exports.WASI_RIGHT_SOCK_SHUTDOWN;
    exports.RIGHTS_BLOCK_DEVICE_BASE = exports.RIGHTS_ALL;
    exports.RIGHTS_BLOCK_DEVICE_INHERITING = exports.RIGHTS_ALL;
    exports.RIGHTS_CHARACTER_DEVICE_BASE = exports.RIGHTS_ALL;
    exports.RIGHTS_CHARACTER_DEVICE_INHERITING = exports.RIGHTS_ALL;
    exports.RIGHTS_REGULAR_FILE_BASE = exports.WASI_RIGHT_FD_DATASYNC | exports.WASI_RIGHT_FD_READ | exports.WASI_RIGHT_FD_SEEK | exports.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports.WASI_RIGHT_FD_SYNC | exports.WASI_RIGHT_FD_TELL | exports.WASI_RIGHT_FD_WRITE | exports.WASI_RIGHT_FD_ADVISE | exports.WASI_RIGHT_FD_ALLOCATE | exports.WASI_RIGHT_FD_FILESTAT_GET | exports.WASI_RIGHT_FD_FILESTAT_SET_SIZE | exports.WASI_RIGHT_FD_FILESTAT_SET_TIMES | exports.WASI_RIGHT_POLL_FD_READWRITE;
    exports.RIGHTS_REGULAR_FILE_INHERITING = bigint_1.BigIntPolyfill(0);
    exports.RIGHTS_DIRECTORY_BASE = exports.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports.WASI_RIGHT_FD_SYNC | exports.WASI_RIGHT_FD_ADVISE | exports.WASI_RIGHT_PATH_CREATE_DIRECTORY | exports.WASI_RIGHT_PATH_CREATE_FILE | exports.WASI_RIGHT_PATH_LINK_SOURCE | exports.WASI_RIGHT_PATH_LINK_TARGET | exports.WASI_RIGHT_PATH_OPEN | exports.WASI_RIGHT_FD_READDIR | exports.WASI_RIGHT_PATH_READLINK | exports.WASI_RIGHT_PATH_RENAME_SOURCE | exports.WASI_RIGHT_PATH_RENAME_TARGET | exports.WASI_RIGHT_PATH_FILESTAT_GET | exports.WASI_RIGHT_PATH_FILESTAT_SET_SIZE | exports.WASI_RIGHT_PATH_FILESTAT_SET_TIMES | exports.WASI_RIGHT_FD_FILESTAT_GET | exports.WASI_RIGHT_FD_FILESTAT_SET_TIMES | exports.WASI_RIGHT_PATH_SYMLINK | exports.WASI_RIGHT_PATH_UNLINK_FILE | exports.WASI_RIGHT_PATH_REMOVE_DIRECTORY | exports.WASI_RIGHT_POLL_FD_READWRITE;
    exports.RIGHTS_DIRECTORY_INHERITING = exports.RIGHTS_DIRECTORY_BASE | exports.RIGHTS_REGULAR_FILE_BASE;
    exports.RIGHTS_SOCKET_BASE = exports.WASI_RIGHT_FD_READ | exports.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports.WASI_RIGHT_FD_WRITE | exports.WASI_RIGHT_FD_FILESTAT_GET | exports.WASI_RIGHT_POLL_FD_READWRITE | exports.WASI_RIGHT_SOCK_SHUTDOWN;
    exports.RIGHTS_SOCKET_INHERITING = exports.RIGHTS_ALL;
    exports.RIGHTS_TTY_BASE = exports.WASI_RIGHT_FD_READ | exports.WASI_RIGHT_FD_FDSTAT_SET_FLAGS | exports.WASI_RIGHT_FD_WRITE | exports.WASI_RIGHT_FD_FILESTAT_GET | exports.WASI_RIGHT_POLL_FD_READWRITE;
    exports.RIGHTS_TTY_INHERITING = bigint_1.BigIntPolyfill(0);
    exports.WASI_CLOCK_REALTIME = 0;
    exports.WASI_CLOCK_MONOTONIC = 1;
    exports.WASI_CLOCK_PROCESS_CPUTIME_ID = 2;
    exports.WASI_CLOCK_THREAD_CPUTIME_ID = 3;
    exports.WASI_EVENTTYPE_CLOCK = 0;
    exports.WASI_EVENTTYPE_FD_READ = 1;
    exports.WASI_EVENTTYPE_FD_WRITE = 2;
    exports.WASI_FILESTAT_SET_ATIM = 1 << 0;
    exports.WASI_FILESTAT_SET_ATIM_NOW = 1 << 1;
    exports.WASI_FILESTAT_SET_MTIM = 1 << 2;
    exports.WASI_FILESTAT_SET_MTIM_NOW = 1 << 3;
    exports.WASI_O_CREAT = 1 << 0;
    exports.WASI_O_DIRECTORY = 1 << 1;
    exports.WASI_O_EXCL = 1 << 2;
    exports.WASI_O_TRUNC = 1 << 3;
    exports.WASI_PREOPENTYPE_DIR = 0;
    exports.WASI_DIRCOOKIE_START = 0;
    exports.WASI_STDIN_FILENO = 0;
    exports.WASI_STDOUT_FILENO = 1;
    exports.WASI_STDERR_FILENO = 2;
    exports.WASI_WHENCE_SET = 0;
    exports.WASI_WHENCE_CUR = 1;
    exports.WASI_WHENCE_END = 2;
    exports.ERROR_MAP = {
      E2BIG: exports.WASI_E2BIG,
      EACCES: exports.WASI_EACCES,
      EADDRINUSE: exports.WASI_EADDRINUSE,
      EADDRNOTAVAIL: exports.WASI_EADDRNOTAVAIL,
      EAFNOSUPPORT: exports.WASI_EAFNOSUPPORT,
      EALREADY: exports.WASI_EALREADY,
      EAGAIN: exports.WASI_EAGAIN,
      // EBADE: WASI_EBADE,
      EBADF: exports.WASI_EBADF,
      // EBADFD: WASI_EBADFD,
      EBADMSG: exports.WASI_EBADMSG,
      // EBADR: WASI_EBADR,
      // EBADRQC: WASI_EBADRQC,
      // EBADSLT: WASI_EBADSLT,
      EBUSY: exports.WASI_EBUSY,
      ECANCELED: exports.WASI_ECANCELED,
      ECHILD: exports.WASI_ECHILD,
      // ECHRNG: WASI_ECHRNG,
      // ECOMM: WASI_ECOMM,
      ECONNABORTED: exports.WASI_ECONNABORTED,
      ECONNREFUSED: exports.WASI_ECONNREFUSED,
      ECONNRESET: exports.WASI_ECONNRESET,
      EDEADLOCK: exports.WASI_EDEADLK,
      EDESTADDRREQ: exports.WASI_EDESTADDRREQ,
      EDOM: exports.WASI_EDOM,
      EDQUOT: exports.WASI_EDQUOT,
      EEXIST: exports.WASI_EEXIST,
      EFAULT: exports.WASI_EFAULT,
      EFBIG: exports.WASI_EFBIG,
      EHOSTDOWN: exports.WASI_EHOSTUNREACH,
      EHOSTUNREACH: exports.WASI_EHOSTUNREACH,
      // EHWPOISON: WASI_EHWPOISON,
      EIDRM: exports.WASI_EIDRM,
      EILSEQ: exports.WASI_EILSEQ,
      EINPROGRESS: exports.WASI_EINPROGRESS,
      EINTR: exports.WASI_EINTR,
      EINVAL: exports.WASI_EINVAL,
      EIO: exports.WASI_EIO,
      EISCONN: exports.WASI_EISCONN,
      EISDIR: exports.WASI_EISDIR,
      ELOOP: exports.WASI_ELOOP,
      EMFILE: exports.WASI_EMFILE,
      EMLINK: exports.WASI_EMLINK,
      EMSGSIZE: exports.WASI_EMSGSIZE,
      EMULTIHOP: exports.WASI_EMULTIHOP,
      ENAMETOOLONG: exports.WASI_ENAMETOOLONG,
      ENETDOWN: exports.WASI_ENETDOWN,
      ENETRESET: exports.WASI_ENETRESET,
      ENETUNREACH: exports.WASI_ENETUNREACH,
      ENFILE: exports.WASI_ENFILE,
      ENOBUFS: exports.WASI_ENOBUFS,
      ENODEV: exports.WASI_ENODEV,
      ENOENT: exports.WASI_ENOENT,
      ENOEXEC: exports.WASI_ENOEXEC,
      ENOLCK: exports.WASI_ENOLCK,
      ENOLINK: exports.WASI_ENOLINK,
      ENOMEM: exports.WASI_ENOMEM,
      ENOMSG: exports.WASI_ENOMSG,
      ENOPROTOOPT: exports.WASI_ENOPROTOOPT,
      ENOSPC: exports.WASI_ENOSPC,
      ENOSYS: exports.WASI_ENOSYS,
      ENOTCONN: exports.WASI_ENOTCONN,
      ENOTDIR: exports.WASI_ENOTDIR,
      ENOTEMPTY: exports.WASI_ENOTEMPTY,
      ENOTRECOVERABLE: exports.WASI_ENOTRECOVERABLE,
      ENOTSOCK: exports.WASI_ENOTSOCK,
      ENOTTY: exports.WASI_ENOTTY,
      ENXIO: exports.WASI_ENXIO,
      EOVERFLOW: exports.WASI_EOVERFLOW,
      EOWNERDEAD: exports.WASI_EOWNERDEAD,
      EPERM: exports.WASI_EPERM,
      EPIPE: exports.WASI_EPIPE,
      EPROTO: exports.WASI_EPROTO,
      EPROTONOSUPPORT: exports.WASI_EPROTONOSUPPORT,
      EPROTOTYPE: exports.WASI_EPROTOTYPE,
      ERANGE: exports.WASI_ERANGE,
      EROFS: exports.WASI_EROFS,
      ESPIPE: exports.WASI_ESPIPE,
      ESRCH: exports.WASI_ESRCH,
      ESTALE: exports.WASI_ESTALE,
      ETIMEDOUT: exports.WASI_ETIMEDOUT,
      ETXTBSY: exports.WASI_ETXTBSY,
      EXDEV: exports.WASI_EXDEV
    };
    exports.SIGNAL_MAP = {
      [exports.WASI_SIGHUP]: "SIGHUP",
      [exports.WASI_SIGINT]: "SIGINT",
      [exports.WASI_SIGQUIT]: "SIGQUIT",
      [exports.WASI_SIGILL]: "SIGILL",
      [exports.WASI_SIGTRAP]: "SIGTRAP",
      [exports.WASI_SIGABRT]: "SIGABRT",
      [exports.WASI_SIGBUS]: "SIGBUS",
      [exports.WASI_SIGFPE]: "SIGFPE",
      [exports.WASI_SIGKILL]: "SIGKILL",
      [exports.WASI_SIGUSR1]: "SIGUSR1",
      [exports.WASI_SIGSEGV]: "SIGSEGV",
      [exports.WASI_SIGUSR2]: "SIGUSR2",
      [exports.WASI_SIGPIPE]: "SIGPIPE",
      [exports.WASI_SIGALRM]: "SIGALRM",
      [exports.WASI_SIGTERM]: "SIGTERM",
      [exports.WASI_SIGCHLD]: "SIGCHLD",
      [exports.WASI_SIGCONT]: "SIGCONT",
      [exports.WASI_SIGSTOP]: "SIGSTOP",
      [exports.WASI_SIGTSTP]: "SIGTSTP",
      [exports.WASI_SIGTTIN]: "SIGTTIN",
      [exports.WASI_SIGTTOU]: "SIGTTOU",
      [exports.WASI_SIGURG]: "SIGURG",
      [exports.WASI_SIGXCPU]: "SIGXCPU",
      [exports.WASI_SIGXFSZ]: "SIGXFSZ",
      [exports.WASI_SIGVTALRM]: "SIGVTALRM"
    };
  }
});

// node_modules/wasi-kernel/src/kernel/bits/stubs.ts
var names, stubs, stubs_default;
var init_stubs = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/stubs.ts"() {
    init_process_shim();
    init_buffer_shim();
    names = [
      "signal",
      "raise",
      "pipe",
      "dup",
      "dup2",
      "dup3",
      "execv",
      "execl",
      "execvp",
      "execlp",
      "getpwnam",
      "getpwnam_r",
      "getpwent",
      "tcsetpgrp",
      "kill",
      "killpg",
      "fork",
      "realpath",
      "getpid",
      "getpgid",
      "setpgid",
      "getpgrp",
      "setpgrp",
      "issetugid",
      "strsignal",
      "wait4",
      "waitpid",
      "getuid",
      "geteuid",
      "getgid",
      "getegid",
      "getsid",
      "setegid",
      "seteuid",
      "setgid",
      "setuid",
      "setsid",
      "umask",
      "getrlimit",
      "setrlimit",
      "getpriority",
      "setpriority",
      "sigfillset",
      "sigprocmask",
      "sigsetmask",
      "siginterrupt",
      "sigaltstack",
      "sigwait",
      "sigpending",
      "getppid",
      "tcgetpgrp",
      "gethostname",
      "tzset",
      "flockfile",
      "ftrylockfile",
      "funlockfile",
      "getpwuid",
      "getpwuid_r",
      "setpwent",
      "endpwent",
      "getgrgid",
      "setreuid",
      "setregid",
      "strmode",
      "acl_get_file",
      "acl_free",
      "acl_get_entry",
      "fchdir",
      "chown",
      "fchown",
      "lchown",
      "fchownat",
      "chmod",
      "fchmod",
      "fchmodat",
      "lchmod",
      "chflags",
      "fchflags",
      "lchflags",
      "chroot",
      "getgroups",
      "utimes",
      "futimes",
      "lutimes",
      "clock_gettime",
      "clock_settime",
      "alarm",
      "system",
      "mkfifo",
      "mkstemp",
      "mkstemps",
      "mkostemp",
      "mkostemps",
      "tmpfile",
      "settimeofday",
      "bsd_signal",
      "ttyname",
      "ttyname_r",
      "ctermid_r",
      "socket",
      "connect",
      "popen",
      "pclose",
      "sync",
      "nice",
      "errx",
      //???
      "vwarnx",
      //???
      // posix
      "posix_spawn",
      "posix_spawnp",
      "posix_spawnattr_init",
      "posix_spawnattr_destroy",
      "posix_spawnattr_setflags",
      "posix_spawnattr_setsigmask",
      "posix_spawn_file_actions_init",
      "posix_spawn_file_actions_destroy",
      "posix_spawn_file_actions_addopen",
      "posix_spawn_file_actions_addclose",
      "posix_spawn_file_actions_adddup2",
      // pthreads
      "pthread_mutex_init",
      "pthread_mutex_lock",
      "pthread_cond_timedwait",
      "pthread_cond_signal",
      "pthread_mutex_unlock",
      "pthread_cond_destroy",
      "pthread_mutex_destroy",
      "pthread_cond_wait",
      "pthread_cond_init",
      "pthread_attr_init",
      "pthread_attr_setstacksize",
      "pthread_attr_destroy",
      "pthread_create",
      "pthread_detach",
      "pthread_self",
      "pthread_kill",
      "pthread_exit",
      "pthread_mutex_trylock",
      "pthread_key_create",
      "pthread_key_delete",
      "pthread_setspecific",
      "pthread_getspecific",
      "pthread_sigmask",
      "pthread_attr_getscope",
      "pthread_attr_setscope",
      "posix_spawnattr_setpgroup",
      "posix_spawnattr_setsigdefault",
      // curses (terminfo)
      "tgetent",
      "tgetflag",
      "tgetnum",
      "tgetstr",
      "tgoto",
      "tputs",
      // termios
      "cfgetospeed",
      "cfgetispeed",
      "cfsetospeed",
      "cfsetispeed",
      "tcsendbreak",
      "tcdrain",
      "tcflush",
      "tcflow",
      "tcgetsid",
      // util (tty)
      "login",
      "login_tty",
      "logout",
      "logwtmp",
      "opendev",
      "openpty",
      "fparseln",
      "forkpty",
      "pidlock",
      "ttylock",
      "ttyunlock",
      "ttyaction",
      "ttymsg"
    ];
    stubs = {
      debug: (message) => {
      }
    };
    for (let nm of names) {
      stubs[nm] = function() {
        stubs.debug(`stub for ${nm} [${[...arguments]}]`);
      };
    }
    stubs_default = stubs;
  }
});

// node_modules/wasi-kernel/src/kernel/bits/autogen/delegation.ts
var delegation_default;
var init_delegation = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/autogen/delegation.ts"() {
    init_process_shim();
    init_buffer_shim();
    delegation_default = { "0": [0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 6, 1, 4, 0, 16, 0, 11], "1": [0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 8, 1, 6, 0, 32, 0, 16, 0, 11], "2": [0, 97, 115, 109, 1, 0, 0, 0, 1, 7, 1, 96, 2, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 10, 1, 8, 0, 32, 0, 32, 1, 16, 0, 11], "3": [0, 97, 115, 109, 1, 0, 0, 0, 1, 8, 1, 96, 3, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 12, 1, 10, 0, 32, 0, 32, 1, 32, 2, 16, 0, 11], "4": [0, 97, 115, 109, 1, 0, 0, 0, 1, 9, 1, 96, 4, 127, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 14, 1, 12, 0, 32, 0, 32, 1, 32, 2, 32, 3, 16, 0, 11], "5": [0, 97, 115, 109, 1, 0, 0, 0, 1, 10, 1, 96, 5, 127, 127, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 16, 1, 14, 0, 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 16, 0, 11], "6": [0, 97, 115, 109, 1, 0, 0, 0, 1, 11, 1, 96, 6, 127, 127, 127, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 18, 1, 16, 0, 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 32, 5, 16, 0, 11], "7": [0, 97, 115, 109, 1, 0, 0, 0, 1, 12, 1, 96, 7, 127, 127, 127, 127, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 20, 1, 18, 0, 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 32, 5, 32, 6, 16, 0, 11], "8": [0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 1, 96, 8, 127, 127, 127, 127, 127, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 22, 1, 20, 0, 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 32, 5, 32, 6, 32, 7, 16, 0, 11], "9": [0, 97, 115, 109, 1, 0, 0, 0, 1, 14, 1, 96, 9, 127, 127, 127, 127, 127, 127, 127, 127, 127, 1, 127, 2, 16, 1, 3, 101, 110, 118, 8, 100, 101, 108, 101, 103, 97, 116, 101, 0, 0, 3, 2, 1, 0, 7, 8, 1, 4, 103, 108, 117, 101, 0, 1, 10, 24, 1, 22, 0, 32, 0, 32, 1, 32, 2, 32, 3, 32, 4, 32, 5, 32, 6, 32, 7, 32, 8, 16, 0, 11] };
  }
});

// node_modules/wasi-kernel/src/kernel/bits/dyld.ts
function bindAll(instance, methods) {
  return methods.reduce((d, m) => Object.assign(d, { [m]: instance[m].bind(instance) }), {});
}
var DynamicLoader, DynamicLibrary, EM_GLOBAL_NS, EM_ALIASES;
var init_dyld = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/dyld.ts"() {
    init_process_shim();
    init_buffer_shim();
    init_delegation();
    DynamicLoader = class {
      constructor(core) {
        this.core = core;
      }
      preload(path2, uri, reloc) {
        if (!this.dylibTable)
          this.dylibTable = new DynamicLibrary.Table();
        if (this.dylibTable.def.has(path2))
          return;
        return this.core.fetchCompile(uri).then((w) => {
          this.dylibTable.def.set(path2, new DynamicLibrary.Def(w, reloc, { path: path2, uri }));
        });
      }
      get import() {
        return bindAll(this, ["dlopen", "dlsym", "dlclose"]);
      }
      get extlib() {
        return bindAll(this, ["dlerror_get"]);
      }
      // -----------
      // Loader Part
      // -----------
      dlopen(path2, flags) {
        var path_str = this.userGetCString(path2).toString("utf-8");
        this.core.trace.syscalls(`dlopen("${path_str}", ${flags})`);
        if (!this.dylibTable)
          return 0;
        var def = this.dylibTable.def.get(path_str);
        if (def) {
          var instance = def.instantiate(this.core), handle = this.dylibTable.ref.size + 1;
          this.dylibTable.ref.set(handle, { def, instance });
          return handle;
        } else {
          return 0;
        }
      }
      dlsym(handle, symbol) {
        var symbol_str = this.userGetCString(symbol).toString("utf-8");
        this.core.trace.syscalls(`dlsym(${handle}, "${symbol_str}")`);
        var ref = this.dylibTable.ref.get(handle);
        if (ref) {
          var sym = ref.instance.exports[symbol_str];
          if (sym && sym instanceof Function) {
            return this.allocateFunc(sym);
          }
          var js = ref.def.reloc?.js?.[symbol_str], d = js && this.allocateDelegate(js);
          if (d !== void 0)
            return d;
        }
        return 0;
      }
      dlclose(handle) {
      }
      dlerror_get(pbuf) {
        var ret = "not found\0";
        return this.userCStringMalloc(ret, pbuf);
      }
      allocateFunc(func) {
        var h = this.core.proc.funcTable.grow(1);
        this.core.proc.funcTable.set(h, func);
        return h;
      }
      allocateDelegate(func) {
        var bin = delegation_default[func.length];
        if (bin) {
          var mod = new WebAssembly.Module(new Uint8Array(bin)), inst = new WebAssembly.Instance(mod, { env: { delegate: func } });
          return this.allocateFunc(inst.exports["glue"]);
        } else {
          console.warn(`cannot delegate function with ${func.length} arguments:`, func);
        }
      }
      // - some helpers from Proc
      userGetCString(addr) {
        return this.core.proc.userGetCString(addr);
      }
      userCStringMalloc(s, pbuf) {
        return this.core.proc.userCStringMalloc(s, pbuf);
      }
    };
    ((DynamicLibrary2) => {
      class Table {
        constructor() {
          this.def = /* @__PURE__ */ new Map();
          this.ref = /* @__PURE__ */ new Map();
        }
      }
      DynamicLibrary2.Table = Table;
      class Def {
        /** @todo */
        constructor(module, reloc = {}, metadata = {}) {
          this.stackSize = 1 << 16;
          /** @todo */
          this.memBlocks = 10;
          /** @todo */
          this.tblSize = 1024;
          this.module = module;
          this.reloc = reloc;
          this.metadata = metadata;
        }
        instantiate(core) {
          var stack_base = core.wasi.memory.buffer.byteLength, mem_base = stack_base + this.stackSize, tbl_base = core.proc.funcTable.length;
          core.wasi.memory.grow(this.memBlocks);
          core.proc.funcTable.grow(this.tblSize);
          var globals = this.globals(this.module, core.wasm.instance);
          var instance = new WebAssembly.Instance(this.module, {
            env: {
              memory: core.wasi.memory,
              table: core.proc.funcTable,
              // <--- Emscripten
              __indirect_function_table: core.proc.funcTable,
              __memory_base: mem_base,
              __table_base: tbl_base,
              __stack_pointer: this._mkglobal(mem_base),
              // stack grows down?
              stackSave: () => mem_base,
              // <--- Emscripten
              stackRestore: () => {
              },
              ...this.relocTable(this.module, core.wasm.instance, core.proc.import),
              ...this.emglobals(this.module, mem_base, core.wasm.instance, () => instance)
            },
            ...globals,
            wasik_ext: core.proc.extlib
          });
          this.globalsInit(instance, mem_base, globals["GOT.mem"] || {});
          var init = instance.exports.__post_instantiate;
          if (init instanceof Function)
            init();
          var ctors = instance.exports.__wasm_call_ctors;
          if (ctors instanceof Function)
            ctors();
          return instance;
        }
        relocTable(module, main2, std) {
          var imports = WebAssembly.Module.imports(module), env2 = {};
          for (let imp of imports) {
            if (imp.module == "env" && imp.kind === "function") {
              var exp = this.reloc.js?.[imp.name] || main2.exports[EM_ALIASES[imp.name] || imp.name] || std[imp.name];
              if (exp instanceof Function)
                env2[imp.name] = exp;
              else {
                console.warn("unresolved symbol:", imp, "\nin", this.metadata);
                env2[imp.name] = () => 0;
              }
            }
          }
          return env2;
        }
        globals(module, main2) {
          var imports = WebAssembly.Module.imports(module), g = {};
          for (let imp of imports) {
            if (imp.kind === "global" && imp.module.match(EM_GLOBAL_NS)) {
              var exp = main2.exports[imp.name];
              g[imp.module] ??= {};
              g[imp.module][imp.name] = this._mkglobal(
                exp instanceof WebAssembly.Global ? exp.value : void 0
              );
            }
          }
          return g;
        }
        globalsInit(instance, mem_base, globals) {
          for (let g in globals) {
            var exp = instance.exports[g];
            if (exp instanceof WebAssembly.Global)
              globals[g].value = mem_base + exp.value;
          }
        }
        /**
         * [internal] creates a table of self-referenced globals.
         * Specific to Emscripten.
         */
        emglobals(module, mem_base, main2, instance) {
          var imports = WebAssembly.Module.imports(module), exports = WebAssembly.Module.exports(module), resolve = (symbol) => mem_base + +instance().exports[symbol], g = {};
          for (let imp of imports) {
            if (imp.kind === "function" && imp.name.startsWith("g$")) {
              let name = imp.name.slice(2), bud;
              if (bud = main2.exports[name])
                g[imp.name] = () => bud;
              else if (bud = exports.find((wed) => wed.name == name))
                g[imp.name] = () => resolve(name);
            }
          }
          return g;
        }
        _mkglobal(initial = 3735928559) {
          return new WebAssembly.Global({ value: "i32", mutable: true }, initial);
        }
      }
      DynamicLibrary2.Def = Def;
    })(DynamicLibrary || (DynamicLibrary = {}));
    EM_GLOBAL_NS = /^GOT[.]/;
    EM_ALIASES = { fiprintf: "fprintf" };
  }
});

// node_modules/wasi-kernel/src/kernel/bits/fs.ts
var constants, FsServices, fs;
var init_fs = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/fs.ts"() {
    init_process_shim();
    init_buffer_shim();
    constants = {
      O_RDONLY: 0,
      O_WRONLY: 1,
      O_RDWR: 2,
      S_IFMT: 61440,
      S_IFREG: 32768,
      S_IFDIR: 16384,
      S_IFCHR: 8192,
      S_IFBLK: 24576,
      S_IFIFO: 4096,
      S_IFLNK: 40960,
      S_IFSOCK: 49152,
      O_CREAT: 512,
      O_EXCL: 2048,
      O_NOCTTY: 131072,
      O_TRUNC: 1024,
      O_APPEND: 8,
      O_DIRECTORY: 1048576,
      O_NOFOLLOW: 256,
      O_SYNC: 128,
      O_DSYNC: 4194304,
      O_SYMLINK: 2097152,
      O_NONBLOCK: 4,
      S_IRWXU: 448,
      S_IRUSR: 256,
      S_IWUSR: 128,
      S_IXUSR: 64,
      S_IRWXG: 56,
      S_IRGRP: 32,
      S_IWGRP: 16,
      S_IXGRP: 8,
      S_IRWXO: 7,
      S_IROTH: 4,
      S_IWOTH: 2,
      S_IXOTH: 1,
      F_OK: 0,
      R_OK: 4,
      W_OK: 2,
      X_OK: 1,
      UV_FS_COPYFILE_EXCL: 1,
      COPYFILE_EXCL: 1
    };
    FsServices = class {
      constructor() {
        this.constants = constants;
      }
      strmode(mode) {
        const c = constants;
        let ret = "";
        let d = {
          [c.S_IFDIR]: "d",
          [c.S_IFCHR]: "c",
          [c.S_IFBLK]: "b",
          [c.S_IFREG]: "-",
          [c.S_IFLNK]: "l",
          [c.S_IFSOCK]: "s",
          [c.S_IFIFO]: "p"
        };
        ret += d[mode & c.S_IFMT] || "?";
        ret += mode & c.S_IRUSR ? "r" : "-";
        ret += mode & c.S_IWUSR ? "w" : "-";
        ret += mode & c.S_IXUSR ? "x" : "-";
        ret += mode & c.S_IRGRP ? "r" : "-";
        ret += mode & c.S_IWGRP ? "w" : "-";
        ret += mode & c.S_IXGRP ? "x" : "-";
        ret += mode & c.S_IROTH ? "r" : "-";
        ret += mode & c.S_IWOTH ? "w" : "-";
        ret += mode & c.S_IXOTH ? "x" : "-";
        return ret;
      }
    };
    fs = new FsServices();
  }
});

// node_modules/wasi-kernel/src/kernel/bindings/utf8.ts
var utf8encode, utf8decode;
var init_utf8 = __esm({
  "node_modules/wasi-kernel/src/kernel/bindings/utf8.ts"() {
    init_process_shim();
    init_buffer_shim();
    if (typeof TextEncoder !== "undefined") {
      utf8encode = (text) => new TextEncoder().encode(text);
    } else {
      utf8encode = (text) => import_buffer.Buffer.from(text);
    }
    if (typeof TextDecoder !== "undefined") {
      utf8decode = (ui8a) => new TextDecoder().decode(ui8a);
    } else {
      utf8decode = (ui8a) => import_buffer.Buffer.from(ui8a).toString("utf-8");
    }
  }
});

// node_modules/wasi-kernel/src/kernel/bits/proc.ts
function bindAll2(instance, methods) {
  return methods.reduce((d, m) => Object.assign(d, { [m]: instance[m].bind(instance) }), {});
}
var import_assert, import_path, import_events2, constants2, import_buffer2, Proc, AT_FDCWD, RIGHTS_ALL2, SignalVector, PATH_MAX, NSIG, ExecvCall, Longjmp, MaybeSharedArrayBuffer3;
var init_proc = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/proc.ts"() {
    init_process_shim();
    init_buffer_shim();
    import_assert = __toESM(require_assert());
    import_path = __toESM(require_path_browserify());
    import_events2 = __toESM(require_events());
    constants2 = __toESM(require_constants());
    init_stubs();
    import_buffer2 = __toESM(require_buffer());
    init_queue();
    init_dyld();
    init_fs();
    init_utf8();
    Proc = class extends import_events2.EventEmitter {
      constructor(core, opts = {}) {
        super();
        this.core = core;
        this.opts = opts;
        this.sigvec = new SignalVector();
        this.sigvec.on("signal", (ev) => this.emit("syscall", {
          func: "signal",
          data: ev
        }));
        this.childq = new SharedQueue({ data: new Uint32Array(new MaybeSharedArrayBuffer3(4 * 128)) });
        this.childset = /* @__PURE__ */ new Set();
        this.dyld = new DynamicLoader(core);
        this.pending = [];
      }
      init() {
        const newfd = this.newfd() + 1, fdcwd = {
          /* type File is not exported by wasmer :( */
          real: newfd,
          rights: RIGHTS_ALL2,
          // uhm
          filetype: constants2.WASI_FILETYPE_DIRECTORY,
          path: ".",
          fakePath: "."
        };
        this.core.wasi.FD_MAP.set(AT_FDCWD, fdcwd);
        this.core.wasi.FD_MAP.set(newfd, fdcwd);
        this.core.wasmFs.fs.writeFileSync("/dev/null", "");
      }
      get import() {
        this.sigvec.debug = this.debug;
        if (!this.funcTable) {
          this.funcTable = new WebAssembly.Table({
            initial: this.opts.funcTableSz || 1024,
            element: "anyfunc"
          });
        }
        return {
          ...stubs_default,
          __indirect_function_table: this.funcTable,
          ...bindAll2(this, [
            "geteuid",
            "strmode",
            "__control_setjmp",
            "__control_setjmp_with_return",
            "setjmp",
            "longjmp",
            "sigsetjmp",
            "siglongjmp",
            "vfork",
            "__control_fork",
            "wait",
            "wait3",
            "execve",
            "sigkill",
            "sigsuspend",
            "sigaction",
            "getpagesize",
            "posix_spawn"
          ]),
          ...this.dyld.import
        };
      }
      get extlib() {
        return {
          ...bindAll2(this, [
            "trace",
            "sorry",
            "dupfd",
            "progname_get",
            "login_get"
          ]),
          ...this.dyld.extlib
        };
      }
      get path() {
        return {
          ...import_path.default,
          resolve: (dir, ...paths) => {
            if (dir == ".")
              dir = this.core.env.PWD;
            return import_path.default.resolve(dir || "/", ...paths);
          }
        };
      }
      get mem() {
        this.core.wasi.refreshMemory();
        return this.core.wasi.view;
      }
      get membuf() {
        return import_buffer2.Buffer.from(this.core.wasi.memory.buffer);
      }
      /**
       * This is a nasty hack and so deserves an apology.
       */
      sorry() {
        for (var f; f = this.pending.pop(); f())
          ;
      }
      // ----------------
      // Environment Part
      // ----------------
      getenv_all() {
        var wasik_environ = this.core.wasm.instance.exports.wasik_environ;
        return typeof wasik_environ === "function" ? this.parse_env(wasik_environ()) : {};
      }
      parse_env(environ) {
        var d = {};
        for (let envvar of this.userGetCStrings(environ)) {
          this._parse_envvar(envvar, d);
        }
        return d;
      }
      _parse_envvar(buf, d) {
        try {
          var text = new TextDecoder().decode(buf), mo = text.match(/^(.*?)=(.*)$/);
          if (mo)
            d[mo[1]] = mo[2];
          else
            console.warn(`invalid envvar? '${text}'`);
        } catch (e) {
          console.warn("parse_env", e);
        }
      }
      progname_get(pbuf) {
        var ret = this.core.argv[0] + "\0";
        return this.userCStringMalloc(ret, pbuf);
      }
      login_get(pbuf) {
        var ret = "user\0";
        return this.userCStringMalloc(ret, pbuf);
      }
      geteuid() {
        return 0;
      }
      trace(message) {
        var buf = this.userGetCString(message);
        this.core.trace.user(buf);
      }
      // ----------
      // Files Part
      // ----------
      realpath(file_name, resolved_name) {
        var arg = this.userGetCString(file_name);
        if (resolved_name === 0)
          throw "realpath(0): not implemented";
        let ret = import_path.default.resolve(this.core.env.PWD, utf8decode(arg)) + "\0";
        if (ret.length > PATH_MAX)
          throw { errno: 1, code: "ERANGE" };
        this.membuf.write(ret, resolved_name);
        return resolved_name;
      }
      newfd(minfd = 0) {
        var highest = Math.max(...this.core.wasi.FD_MAP.keys());
        return Math.max(minfd, highest + 1);
      }
      dupfd(fd2, minfd, cloexec) {
        this.core.trace.syscalls(`dupfd(${fd2}, ${minfd}, ${cloexec}`);
        var desc = this.core.wasi.FD_MAP.get(fd2);
        if (!desc)
          return -1;
        var newfd = this.newfd(minfd);
        this.core.wasi.FD_MAP.set(newfd, this.dupdesc(desc));
        return newfd;
      }
      dupdesc(desc) {
        var newreal = this.core.wasmFs.volume.openSync("/", "r");
        var realFD_MAP = this.core.wasmFs.volume.fds;
        realFD_MAP[newreal] = realFD_MAP[desc.real];
        return Object.assign({}, desc, { real: newreal });
      }
      strmode(mode, buf) {
        let ret = fs.strmode(mode) + "\0";
        this.membuf.write(ret, buf);
      }
      // ------------
      // Control Part
      // ------------
      __control_setjmp(env2, block) {
        this.debug(`__control_setjmp [${env2}, ${block}]`);
        this.mem.setUint32(env2, 0);
        let impl = this.blockImpl(block), val = 0;
        try {
          while (true) {
            try {
              return impl(val);
            } catch (e) {
              this.debug(`setjmp caught ${JSON.stringify(e)}`);
              if (e instanceof Longjmp && e.env == env2)
                val = e.val;
              else
                throw e;
            }
          }
        } finally {
          this.debug(`__control_setjmp exiting`);
        }
      }
      __control_setjmp_with_return(env2, block) {
        return this.__control_setjmp(env2, block);
      }
      setjmp(env2) {
        console.warn("setjmp", env2);
        return 0;
      }
      longjmp(env2, val) {
        this.debug(`longjmp [${env2}] ${val}`);
        throw new Longjmp(env2, val);
      }
      sigsetjmp(env2, save_mask) {
        this.core.trace.syscalls(`sigsetjmp(${env2}, ${save_mask})`);
        return 0;
      }
      siglongjmp(env2, val) {
        this.longjmp(env2, val);
      }
      vfork() {
        this.core.trace.syscalls("vfork()");
        var pid = Math.max(0, ...this.childset) + 1;
        this.childset.add(pid);
        this.onJoin = (onset) => {
          if (onset instanceof ExecvCall) {
            let e = onset;
            this.emit("syscall", {
              func: "spawn",
              data: { pid, execv: e.copy(), env: this.getenv_all() }
            });
          } else
            throw onset;
        };
        return pid;
      }
      __control_fork(v1, v2, block) {
        let impl = this.blockImpl(block);
        try {
          impl(v1);
          if (this.onJoin)
            this.onJoin(null);
        } catch (e) {
          if (this.onJoin)
            this.onJoin(e);
        }
        this.onJoin = null;
        impl(v2);
      }
      execve(path2, argv, envp) {
        this.core.trace.syscalls(`execv(${path2}, ${argv}, ${envp})`);
        throw new ExecvCall(
          utf8decode(this.userGetCString(path2)),
          this.userGetCStrings(argv),
          this.userGetCStrings(envp)
        );
      }
      posix_spawn(pid, path2, file_actions, attrp, argv, envp) {
        var pathStr = utf8decode(this.userGetCString(path2));
        this.core.trace.syscalls(`posix_spawn(${pid}, "${pathStr}", ${file_actions}, ${attrp}, ...})`);
        var execv = new ExecvCall(
          pathStr,
          this.userGetCStrings(argv),
          this.userGetCStrings(envp)
        ), newPid = Math.max(0, ...this.childset) + 1;
        this.emit("syscall", {
          func: "spawn",
          data: { pid: newPid, execv, env: this.core.env }
        });
        this.mem.setUint32(pid, newPid, true);
        return 0;
      }
      wait(stat_loc) {
        this.core.trace.syscalls(`wait(${stat_loc})`);
        return this.waitBase(stat_loc);
      }
      wait3(stat_loc, options, rusage) {
        this.core.trace.syscalls(`wait3(${stat_loc}, ${options}, ${rusage})`);
        return this.waitBase(stat_loc);
      }
      waitBase(stat_loc) {
        var pid = this.childq.dequeue(), exitcode = this.childq.dequeue();
        this.debug(`  -> ${pid}`);
        if (stat_loc !== 0)
          this.mem.setUint32(stat_loc, exitcode << 8, true);
        return pid;
      }
      // - some helpers
      userGetCString(addr) {
        if (addr == 0)
          return null;
        let mem = import_buffer2.Buffer.from(this.core.wasi.memory.buffer);
        return mem.slice(addr, mem.indexOf(0, addr));
      }
      userGetCStrings(addr) {
        if (addr == 0)
          return null;
        let l = [];
        while (1) {
          let s = this.mem.getUint32(addr, true);
          if (s === 0)
            break;
          l.push(this.userGetCString(s));
          addr += 4;
        }
        return l;
      }
      userCStringMalloc(s, pbuf) {
        this.pending.push(() => {
          let buf = this.mem.getUint32(pbuf, true);
          this.membuf.write(s, buf);
        });
        return s.length;
      }
      /**
       * Used to invoke blocks: returns a function
       * @param block a C block pointer
       */
      blockImpl(block) {
        let impl = this.funcTable.get(
          this.mem.getUint32(block + 12, true)
        );
        return (...args) => impl(block, ...args);
      }
      // ------------
      // Signals Part
      // ------------
      sigkill(signum) {
        this.sigvec.send(signum);
      }
      sigsuspend() {
        this.sigvec.receive();
      }
      sigaction(signum, act, oact) {
        this.core.trace.syscalls(`sigaction(${signum}, ${act}, ${oact})`);
        if (act != 0) {
          var sa_handler = this.mem.getUint32(act, true);
          var h = this.funcTable.get(sa_handler);
          this.core.trace.syscalls(" -->", sa_handler, h);
          this.sigvec.handlers[signum] = h;
        }
        if (oact != 0) {
          this.mem.setUint32(oact, 0);
        }
      }
      // -----------
      // Memory Part
      // -----------
      getpagesize() {
        return 4096;
      }
    };
    AT_FDCWD = -100;
    RIGHTS_ALL2 = {
      base: constants2.RIGHTS_ALL,
      inheriting: constants2.RIGHTS_ALL
    };
    SignalVector = class extends import_events2.EventEmitter {
      constructor(_from = {}) {
        super();
        this.wait = _from.wait || new Int32Array(new MaybeSharedArrayBuffer3(4 * NSIG));
        this.handlers = Array(NSIG);
      }
      static from(props) {
        return new SignalVector(props);
      }
      to() {
        return { wait: this.wait };
      }
      send(signum) {
        (0, import_assert.default)(0 < signum && signum < NSIG);
        Atomics.add(this.wait, 0, 1);
        Atomics.add(this.wait, signum, 1);
        Atomics.notify(this.wait, 0, 1);
      }
      receive(signums) {
        if (!this._snapshot)
          this._snapshot = new Int32Array(NSIG);
        Atomics.wait(this.wait, 0, Atomics.load(this.wait, 0));
        this.sweep(signums);
        return -1;
      }
      sweep(signums) {
        for (let i = 1; i < NSIG; i++) {
          if (!signums || signums.includes(i)) {
            let h = this.handlers[i];
            if (h && this._snapshot[i] < this.wait[i]) {
              this.debug("calling", h);
              h(i);
            }
            this._snapshot[i] = this.wait[i];
          }
        }
      }
    };
    PATH_MAX = 256;
    NSIG = 20;
    ExecvCall = class {
      constructor(prog, argv, envp) {
        this.prog = prog;
        this.argv = argv;
        this.envp = envp;
      }
      /**
       * (internal) This is needed in order to transfer the `ExecvCall`
       * via `postMessage`.
       */
      copy() {
        var cpa = (bs) => bs.map((b) => import_buffer2.Buffer.from(b));
        return new ExecvCall(
          this.prog,
          cpa(this.argv),
          cpa(this.envp)
        );
      }
    };
    Longjmp = class {
      constructor(env2, val) {
        this.env = env2;
        this.val = val;
      }
    };
    MaybeSharedArrayBuffer3 = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : ArrayBuffer;
  }
});

// node_modules/wasi-kernel/src/infra/arch.ts
var isNode, isBrowser;
var init_arch = __esm({
  "node_modules/wasi-kernel/src/infra/arch.ts"() {
    init_process_shim();
    init_buffer_shim();
    isNode = self.process && self.process.versions && self.process.versions.node;
    isBrowser = typeof window === "object" || typeof DedicatedWorkerGlobalScope === "function";
  }
});

// node_modules/memfs/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/memfs/lib/constants.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.constants = {
      O_RDONLY: 0,
      O_WRONLY: 1,
      O_RDWR: 2,
      S_IFMT: 61440,
      S_IFREG: 32768,
      S_IFDIR: 16384,
      S_IFCHR: 8192,
      S_IFBLK: 24576,
      S_IFIFO: 4096,
      S_IFLNK: 40960,
      S_IFSOCK: 49152,
      O_CREAT: 64,
      O_EXCL: 128,
      O_NOCTTY: 256,
      O_TRUNC: 512,
      O_APPEND: 1024,
      O_DIRECTORY: 65536,
      O_NOATIME: 262144,
      O_NOFOLLOW: 131072,
      O_SYNC: 1052672,
      O_DIRECT: 16384,
      O_NONBLOCK: 2048,
      S_IRWXU: 448,
      S_IRUSR: 256,
      S_IWUSR: 128,
      S_IXUSR: 64,
      S_IRWXG: 56,
      S_IRGRP: 32,
      S_IWGRP: 16,
      S_IXGRP: 8,
      S_IRWXO: 7,
      S_IROTH: 4,
      S_IWOTH: 2,
      S_IXOTH: 1,
      F_OK: 0,
      R_OK: 4,
      W_OK: 2,
      X_OK: 1,
      UV_FS_SYMLINK_DIR: 1,
      UV_FS_SYMLINK_JUNCTION: 2,
      UV_FS_COPYFILE_EXCL: 1,
      UV_FS_COPYFILE_FICLONE: 2,
      UV_FS_COPYFILE_FICLONE_FORCE: 4,
      COPYFILE_EXCL: 1,
      COPYFILE_FICLONE: 2,
      COPYFILE_FICLONE_FORCE: 4
    };
  }
});

// node_modules/memfs/lib/getBigInt.js
var require_getBigInt = __commonJS({
  "node_modules/memfs/lib/getBigInt.js"(exports) {
    init_process_shim();
    init_buffer_shim();
    if (typeof BigInt === "function")
      exports.default = BigInt;
    else
      exports.default = function BigIntNotSupported() {
        throw new Error("BigInt is not supported in this environment.");
      };
  }
});

// node_modules/memfs/lib/Stats.js
var require_Stats = __commonJS({
  "node_modules/memfs/lib/Stats.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants2();
    var getBigInt_1 = require_getBigInt();
    var S_IFMT = constants_1.constants.S_IFMT;
    var S_IFDIR = constants_1.constants.S_IFDIR;
    var S_IFREG = constants_1.constants.S_IFREG;
    var S_IFBLK = constants_1.constants.S_IFBLK;
    var S_IFCHR = constants_1.constants.S_IFCHR;
    var S_IFLNK = constants_1.constants.S_IFLNK;
    var S_IFIFO = constants_1.constants.S_IFIFO;
    var S_IFSOCK = constants_1.constants.S_IFSOCK;
    var Stats = (
      /** @class */
      function() {
        function Stats2() {
        }
        Stats2.build = function(node, bigint) {
          if (bigint === void 0) {
            bigint = false;
          }
          var stats = new Stats2();
          var uid = node.uid, gid = node.gid, atime = node.atime, mtime = node.mtime, ctime = node.ctime;
          var getStatNumber = !bigint ? function(number) {
            return number;
          } : getBigInt_1.default;
          stats.uid = getStatNumber(uid);
          stats.gid = getStatNumber(gid);
          stats.rdev = getStatNumber(0);
          stats.blksize = getStatNumber(4096);
          stats.ino = getStatNumber(node.ino);
          stats.size = getStatNumber(node.getSize());
          stats.blocks = getStatNumber(1);
          stats.atime = atime;
          stats.mtime = mtime;
          stats.ctime = ctime;
          stats.birthtime = ctime;
          stats.atimeMs = getStatNumber(atime.getTime());
          stats.mtimeMs = getStatNumber(mtime.getTime());
          var ctimeMs = getStatNumber(ctime.getTime());
          stats.ctimeMs = ctimeMs;
          stats.birthtimeMs = ctimeMs;
          stats.dev = getStatNumber(0);
          stats.mode = getStatNumber(node.mode);
          stats.nlink = getStatNumber(node.nlink);
          return stats;
        };
        Stats2.prototype._checkModeProperty = function(property) {
          return (Number(this.mode) & S_IFMT) === property;
        };
        Stats2.prototype.isDirectory = function() {
          return this._checkModeProperty(S_IFDIR);
        };
        Stats2.prototype.isFile = function() {
          return this._checkModeProperty(S_IFREG);
        };
        Stats2.prototype.isBlockDevice = function() {
          return this._checkModeProperty(S_IFBLK);
        };
        Stats2.prototype.isCharacterDevice = function() {
          return this._checkModeProperty(S_IFCHR);
        };
        Stats2.prototype.isSymbolicLink = function() {
          return this._checkModeProperty(S_IFLNK);
        };
        Stats2.prototype.isFIFO = function() {
          return this._checkModeProperty(S_IFIFO);
        };
        Stats2.prototype.isSocket = function() {
          return this._checkModeProperty(S_IFSOCK);
        };
        return Stats2;
      }()
    );
    exports.Stats = Stats;
    exports.default = Stats;
  }
});

// node_modules/memfs/lib/internal/buffer.js
var require_buffer2 = __commonJS({
  "node_modules/memfs/lib/internal/buffer.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var buffer_1 = require_buffer();
    exports.Buffer = buffer_1.Buffer;
    function bufferV0P12Ponyfill(arg0) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return new (buffer_1.Buffer.bind.apply(buffer_1.Buffer, __spreadArrays([void 0, arg0], args)))();
    }
    var bufferAllocUnsafe = buffer_1.Buffer.allocUnsafe || bufferV0P12Ponyfill;
    exports.bufferAllocUnsafe = bufferAllocUnsafe;
    var bufferFrom = buffer_1.Buffer.from || bufferV0P12Ponyfill;
    exports.bufferFrom = bufferFrom;
  }
});

// node_modules/memfs/lib/internal/errors.js
var require_errors2 = __commonJS({
  "node_modules/memfs/lib/internal/errors.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b3) {
          d2.__proto__ = b3;
        } || function(d2, b3) {
          for (var p in b3)
            if (b3.hasOwnProperty(p))
              d2[p] = b3[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert4 = require_assert();
    var util = require_util();
    var kCode = typeof Symbol === "undefined" ? "_kCode" : Symbol("code");
    var messages = {};
    function makeNodeError(Base) {
      return (
        /** @class */
        function(_super) {
          __extends(NodeError, _super);
          function NodeError(key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this, message(key, args)) || this;
            _this.code = key;
            _this[kCode] = key;
            _this.name = _super.prototype.name + " [" + _this[kCode] + "]";
            return _this;
          }
          return NodeError;
        }(Base)
      );
    }
    var AssertionError = (
      /** @class */
      function(_super) {
        __extends(AssertionError2, _super);
        function AssertionError2(options) {
          var _this = this;
          if (typeof options !== "object" || options === null) {
            throw new exports.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
          }
          if (options.message) {
            _this = _super.call(this, options.message) || this;
          } else {
            _this = _super.call(this, util.inspect(options.actual).slice(0, 128) + " " + (options.operator + " " + util.inspect(options.expected).slice(0, 128))) || this;
          }
          _this.generatedMessage = !options.message;
          _this.name = "AssertionError [ERR_ASSERTION]";
          _this.code = "ERR_ASSERTION";
          _this.actual = options.actual;
          _this.expected = options.expected;
          _this.operator = options.operator;
          exports.Error.captureStackTrace(_this, options.stackStartFunction);
          return _this;
        }
        return AssertionError2;
      }(self.Error)
    );
    exports.AssertionError = AssertionError;
    function message(key, args) {
      assert4.strictEqual(typeof key, "string");
      var msg = messages[key];
      assert4(msg, "An invalid error message key was used: " + key + ".");
      var fmt;
      if (typeof msg === "function") {
        fmt = msg;
      } else {
        fmt = util.format;
        if (args === void 0 || args.length === 0)
          return msg;
        args.unshift(msg);
      }
      return String(fmt.apply(null, args));
    }
    exports.message = message;
    function E(sym, val) {
      messages[sym] = typeof val === "function" ? val : String(val);
    }
    exports.E = E;
    exports.Error = makeNodeError(self.Error);
    exports.TypeError = makeNodeError(self.TypeError);
    exports.RangeError = makeNodeError(self.RangeError);
    E("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
    E("ERR_ASSERTION", "%s");
    E("ERR_BUFFER_OUT_OF_BOUNDS", bufferOutOfBounds);
    E("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
    E("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
    E("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
    E("ERR_DNS_SET_SERVERS_FAILED", function(err2, servers) {
      return 'c-ares failed to set servers: "' + err2 + '" [' + servers + "]";
    });
    E("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
    E("ERR_ENCODING_NOT_SUPPORTED", function(enc) {
      return 'The "' + enc + '" encoding is not supported';
    });
    E("ERR_ENCODING_INVALID_ENCODED_DATA", function(enc) {
      return "The encoded data was not valid for encoding " + enc;
    });
    E("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
    E("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
    E("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
    E("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
    E("ERR_INVALID_ARG_TYPE", invalidArgType);
    E("ERR_INVALID_ARRAY_LENGTH", function(name, len, actual) {
      assert4.strictEqual(typeof actual, "number");
      return 'The array "' + name + '" (length ' + actual + ") must be of length " + len + ".";
    });
    E("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
    E("ERR_INVALID_CALLBACK", "Callback must be a function");
    E("ERR_INVALID_CHAR", "Invalid character in %s");
    E("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
    E("ERR_INVALID_FD", '"fd" must be a positive integer: %s');
    E("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s');
    E("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
    E("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
    E("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
    E("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + String(value) + '" is invalid for option "' + name + '"';
    });
    E("ERR_INVALID_OPT_VALUE_ENCODING", function(value) {
      return 'The value "' + String(value) + '" is invalid for option "encoding"';
    });
    E("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL');
    E("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
    E("ERR_INVALID_THIS", 'Value of "this" must be of type %s');
    E("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
    E("ERR_INVALID_URL", "Invalid URL: %s");
    E("ERR_INVALID_URL_SCHEME", function(expected) {
      return "The URL must be " + oneOf(expected, "scheme");
    });
    E("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
    E("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
    E("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
    E("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
    E("ERR_MISSING_ARGS", missingArgs);
    E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    E("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
    E("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
    E("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
    E("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
    E("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
    E("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
    E("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
    E("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
    E("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
    E("ERR_SOCKET_CLOSED", "Socket is closed");
    E("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
    E("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
    E("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
    E("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
    E("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
    E("ERR_TLS_DH_PARAM_SIZE", function(size) {
      return "DH parameter size " + size + " is less than 2048";
    });
    E("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
    E("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
    E("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext');
    E("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
    E("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
    E("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
    E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
    E("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
    E("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
    E("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
    E("ERR_V8BREAKITERATOR", "Full ICU data not installed. See https://github.com/nodejs/node/wiki/Intl");
    function invalidArgType(name, expected, actual) {
      assert4(name, "name is required");
      var determiner;
      if (expected.includes("not ")) {
        determiner = "must not be";
        expected = expected.split("not ")[1];
      } else {
        determiner = "must be";
      }
      var msg;
      if (Array.isArray(name)) {
        var names2 = name.map(function(val) {
          return '"' + val + '"';
        }).join(", ");
        msg = "The " + names2 + " arguments " + determiner + " " + oneOf(expected, "type");
      } else if (name.includes(" argument")) {
        msg = "The " + name + " " + determiner + " " + oneOf(expected, "type");
      } else {
        var type = name.includes(".") ? "property" : "argument";
        msg = 'The "' + name + '" ' + type + " " + determiner + " " + oneOf(expected, "type");
      }
      if (arguments.length >= 3) {
        msg += ". Received type " + (actual !== null ? typeof actual : "null");
      }
      return msg;
    }
    function missingArgs() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      assert4(args.length > 0, "At least one arg needs to be specified");
      var msg = "The ";
      var len = args.length;
      args = args.map(function(a) {
        return '"' + a + '"';
      });
      switch (len) {
        case 1:
          msg += args[0] + " argument";
          break;
        case 2:
          msg += args[0] + " and " + args[1] + " arguments";
          break;
        default:
          msg += args.slice(0, len - 1).join(", ");
          msg += ", and " + args[len - 1] + " arguments";
          break;
      }
      return msg + " must be specified";
    }
    function oneOf(expected, thing) {
      assert4(expected, "expected is required");
      assert4(typeof thing === "string", "thing is required");
      if (Array.isArray(expected)) {
        var len = expected.length;
        assert4(len > 0, "At least one expected value needs to be specified");
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of " + thing + " " + expected.slice(0, len - 1).join(", ") + ", or " + expected[len - 1];
        } else if (len === 2) {
          return "one of " + thing + " " + expected[0] + " or " + expected[1];
        } else {
          return "of " + thing + " " + expected[0];
        }
      } else {
        return "of " + thing + " " + String(expected);
      }
    }
    function bufferOutOfBounds(name, isWriting) {
      if (isWriting) {
        return "Attempt to write outside buffer bounds";
      } else {
        return '"' + name + '" is outside of buffer bounds';
      }
    }
  }
});

// node_modules/memfs/lib/encoding.js
var require_encoding = __commonJS({
  "node_modules/memfs/lib/encoding.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var buffer_1 = require_buffer2();
    var errors = require_errors2();
    exports.ENCODING_UTF8 = "utf8";
    function assertEncoding(encoding) {
      if (encoding && !buffer_1.Buffer.isEncoding(encoding))
        throw new errors.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", encoding);
    }
    exports.assertEncoding = assertEncoding;
    function strToEncoding(str, encoding) {
      if (!encoding || encoding === exports.ENCODING_UTF8)
        return str;
      if (encoding === "buffer")
        return new buffer_1.Buffer(str);
      return new buffer_1.Buffer(str).toString(encoding);
    }
    exports.strToEncoding = strToEncoding;
  }
});

// node_modules/memfs/lib/Dirent.js
var require_Dirent = __commonJS({
  "node_modules/memfs/lib/Dirent.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants2();
    var encoding_1 = require_encoding();
    var S_IFMT = constants_1.constants.S_IFMT;
    var S_IFDIR = constants_1.constants.S_IFDIR;
    var S_IFREG = constants_1.constants.S_IFREG;
    var S_IFBLK = constants_1.constants.S_IFBLK;
    var S_IFCHR = constants_1.constants.S_IFCHR;
    var S_IFLNK = constants_1.constants.S_IFLNK;
    var S_IFIFO = constants_1.constants.S_IFIFO;
    var S_IFSOCK = constants_1.constants.S_IFSOCK;
    var Dirent = (
      /** @class */
      function() {
        function Dirent2() {
          this.name = "";
          this.mode = 0;
        }
        Dirent2.build = function(link, encoding) {
          var dirent = new Dirent2();
          var mode = link.getNode().mode;
          dirent.name = encoding_1.strToEncoding(link.getName(), encoding);
          dirent.mode = mode;
          return dirent;
        };
        Dirent2.prototype._checkModeProperty = function(property) {
          return (this.mode & S_IFMT) === property;
        };
        Dirent2.prototype.isDirectory = function() {
          return this._checkModeProperty(S_IFDIR);
        };
        Dirent2.prototype.isFile = function() {
          return this._checkModeProperty(S_IFREG);
        };
        Dirent2.prototype.isBlockDevice = function() {
          return this._checkModeProperty(S_IFBLK);
        };
        Dirent2.prototype.isCharacterDevice = function() {
          return this._checkModeProperty(S_IFCHR);
        };
        Dirent2.prototype.isSymbolicLink = function() {
          return this._checkModeProperty(S_IFLNK);
        };
        Dirent2.prototype.isFIFO = function() {
          return this._checkModeProperty(S_IFIFO);
        };
        Dirent2.prototype.isSocket = function() {
          return this._checkModeProperty(S_IFSOCK);
        };
        return Dirent2;
      }()
    );
    exports.Dirent = Dirent;
    exports.default = Dirent;
  }
});

// node_modules/process/browser.js
var require_browser = __commonJS({
  "node_modules/process/browser.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    var process2 = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process2.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process2.title = "browser";
    process2.browser = true;
    process2.env = {};
    process2.argv = [];
    process2.version = "";
    process2.versions = {};
    function noop() {
    }
    process2.on = noop;
    process2.addListener = noop;
    process2.once = noop;
    process2.off = noop;
    process2.removeListener = noop;
    process2.removeAllListeners = noop;
    process2.emit = noop;
    process2.prependListener = noop;
    process2.prependOnceListener = noop;
    process2.listeners = function(name) {
      return [];
    };
    process2.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process2.cwd = function() {
      return "/";
    };
    process2.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process2.umask = function() {
      return 0;
    };
  }
});

// node_modules/memfs/lib/setImmediate.js
var require_setImmediate = __commonJS({
  "node_modules/memfs/lib/setImmediate.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var _setImmediate;
    if (typeof setImmediate === "function")
      _setImmediate = setImmediate.bind(self);
    else
      _setImmediate = setTimeout.bind(self);
    exports.default = _setImmediate;
  }
});

// node_modules/memfs/lib/process.js
var require_process = __commonJS({
  "node_modules/memfs/lib/process.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var maybeReturnProcess = function() {
      if (typeof process !== "undefined") {
        return process;
      }
      try {
        return require_browser();
      } catch (_a2) {
        return void 0;
      }
    };
    function createProcess() {
      var p = maybeReturnProcess() || {};
      if (!p.getuid)
        p.getuid = function() {
          return 0;
        };
      if (!p.getgid)
        p.getgid = function() {
          return 0;
        };
      if (!p.cwd)
        p.cwd = function() {
          return "/";
        };
      if (!p.nextTick)
        p.nextTick = require_setImmediate().default;
      if (!p.emitWarning)
        p.emitWarning = function(message, type) {
          console.warn("" + type + (type ? ": " : "") + message);
        };
      if (!p.env)
        p.env = {};
      return p;
    }
    exports.createProcess = createProcess;
    exports.default = createProcess();
  }
});

// node_modules/memfs/lib/node.js
var require_node = __commonJS({
  "node_modules/memfs/lib/node.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b3) {
          d2.__proto__ = b3;
        } || function(d2, b3) {
          for (var p in b3)
            if (b3.hasOwnProperty(p))
              d2[p] = b3[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var process_1 = require_process();
    var buffer_1 = require_buffer2();
    var constants_1 = require_constants2();
    var events_1 = require_events();
    var Stats_1 = require_Stats();
    var S_IFMT = constants_1.constants.S_IFMT;
    var S_IFDIR = constants_1.constants.S_IFDIR;
    var S_IFREG = constants_1.constants.S_IFREG;
    var S_IFBLK = constants_1.constants.S_IFBLK;
    var S_IFCHR = constants_1.constants.S_IFCHR;
    var S_IFLNK = constants_1.constants.S_IFLNK;
    var S_IFIFO = constants_1.constants.S_IFIFO;
    var S_IFSOCK = constants_1.constants.S_IFSOCK;
    var O_APPEND = constants_1.constants.O_APPEND;
    exports.SEP = "/";
    var Node2 = (
      /** @class */
      function(_super) {
        __extends(Node3, _super);
        function Node3(ino, perm) {
          if (perm === void 0) {
            perm = 438;
          }
          var _this = _super.call(this) || this;
          _this.uid = process_1.default.getuid();
          _this.gid = process_1.default.getgid();
          _this.atime = /* @__PURE__ */ new Date();
          _this.mtime = /* @__PURE__ */ new Date();
          _this.ctime = /* @__PURE__ */ new Date();
          _this.perm = 438;
          _this.mode = S_IFREG;
          _this.nlink = 1;
          _this.perm = perm;
          _this.mode |= perm;
          _this.ino = ino;
          return _this;
        }
        Node3.prototype.getString = function(encoding) {
          if (encoding === void 0) {
            encoding = "utf8";
          }
          return this.getBuffer().toString(encoding);
        };
        Node3.prototype.setString = function(str) {
          this.buf = buffer_1.bufferFrom(str, "utf8");
          this.touch();
        };
        Node3.prototype.getBuffer = function() {
          if (!this.buf)
            this.setBuffer(buffer_1.bufferAllocUnsafe(0));
          return buffer_1.bufferFrom(this.buf);
        };
        Node3.prototype.setBuffer = function(buf) {
          this.buf = buffer_1.bufferFrom(buf);
          this.touch();
        };
        Node3.prototype.getSize = function() {
          return this.buf ? this.buf.length : 0;
        };
        Node3.prototype.setModeProperty = function(property) {
          this.mode = this.mode & ~S_IFMT | property;
        };
        Node3.prototype.setIsFile = function() {
          this.setModeProperty(S_IFREG);
        };
        Node3.prototype.setIsDirectory = function() {
          this.setModeProperty(S_IFDIR);
        };
        Node3.prototype.setIsSymlink = function() {
          this.setModeProperty(S_IFLNK);
        };
        Node3.prototype.isFile = function() {
          return (this.mode & S_IFMT) === S_IFREG;
        };
        Node3.prototype.isDirectory = function() {
          return (this.mode & S_IFMT) === S_IFDIR;
        };
        Node3.prototype.isSymlink = function() {
          return (this.mode & S_IFMT) === S_IFLNK;
        };
        Node3.prototype.makeSymlink = function(steps) {
          this.symlink = steps;
          this.setIsSymlink();
        };
        Node3.prototype.write = function(buf, off, len, pos) {
          if (off === void 0) {
            off = 0;
          }
          if (len === void 0) {
            len = buf.length;
          }
          if (pos === void 0) {
            pos = 0;
          }
          if (!this.buf)
            this.buf = buffer_1.bufferAllocUnsafe(0);
          if (pos + len > this.buf.length) {
            var newBuf = buffer_1.bufferAllocUnsafe(pos + len);
            this.buf.copy(newBuf, 0, 0, this.buf.length);
            this.buf = newBuf;
          }
          buf.copy(this.buf, pos, off, off + len);
          this.touch();
          return len;
        };
        Node3.prototype.read = function(buf, off, len, pos) {
          if (off === void 0) {
            off = 0;
          }
          if (len === void 0) {
            len = buf.byteLength;
          }
          if (pos === void 0) {
            pos = 0;
          }
          if (!this.buf)
            this.buf = buffer_1.bufferAllocUnsafe(0);
          var actualLen = len;
          if (actualLen > buf.byteLength) {
            actualLen = buf.byteLength;
          }
          if (actualLen + pos > this.buf.length) {
            actualLen = this.buf.length - pos;
          }
          this.buf.copy(buf, off, pos, pos + actualLen);
          return actualLen;
        };
        Node3.prototype.truncate = function(len) {
          if (len === void 0) {
            len = 0;
          }
          if (!len)
            this.buf = buffer_1.bufferAllocUnsafe(0);
          else {
            if (!this.buf)
              this.buf = buffer_1.bufferAllocUnsafe(0);
            if (len <= this.buf.length) {
              this.buf = this.buf.slice(0, len);
            } else {
              var buf = buffer_1.bufferAllocUnsafe(0);
              this.buf.copy(buf);
              buf.fill(0, len);
            }
          }
          this.touch();
        };
        Node3.prototype.chmod = function(perm) {
          this.perm = perm;
          this.mode = this.mode & ~511 | perm;
          this.touch();
        };
        Node3.prototype.chown = function(uid, gid) {
          this.uid = uid;
          this.gid = gid;
          this.touch();
        };
        Node3.prototype.touch = function() {
          this.mtime = /* @__PURE__ */ new Date();
          this.emit("change", this);
        };
        Node3.prototype.canRead = function(uid, gid) {
          if (uid === void 0) {
            uid = process_1.default.getuid();
          }
          if (gid === void 0) {
            gid = process_1.default.getgid();
          }
          if (this.perm & 4) {
            return true;
          }
          if (gid === this.gid) {
            if (this.perm & 32) {
              return true;
            }
          }
          if (uid === this.uid) {
            if (this.perm & 256) {
              return true;
            }
          }
          return false;
        };
        Node3.prototype.canWrite = function(uid, gid) {
          if (uid === void 0) {
            uid = process_1.default.getuid();
          }
          if (gid === void 0) {
            gid = process_1.default.getgid();
          }
          if (this.perm & 2) {
            return true;
          }
          if (gid === this.gid) {
            if (this.perm & 16) {
              return true;
            }
          }
          if (uid === this.uid) {
            if (this.perm & 128) {
              return true;
            }
          }
          return false;
        };
        Node3.prototype.del = function() {
          this.emit("delete", this);
        };
        Node3.prototype.toJSON = function() {
          return {
            ino: this.ino,
            uid: this.uid,
            gid: this.gid,
            atime: this.atime.getTime(),
            mtime: this.mtime.getTime(),
            ctime: this.ctime.getTime(),
            perm: this.perm,
            mode: this.mode,
            nlink: this.nlink,
            symlink: this.symlink,
            data: this.getString()
          };
        };
        return Node3;
      }(events_1.EventEmitter)
    );
    exports.Node = Node2;
    var Link2 = (
      /** @class */
      function(_super) {
        __extends(Link3, _super);
        function Link3(vol, parent, name) {
          var _this = _super.call(this) || this;
          _this.children = {};
          _this.steps = [];
          _this.ino = 0;
          _this.length = 0;
          _this.vol = vol;
          _this.parent = parent;
          _this.steps = parent ? parent.steps.concat([name]) : [name];
          return _this;
        }
        Link3.prototype.setNode = function(node) {
          this.node = node;
          this.ino = node.ino;
        };
        Link3.prototype.getNode = function() {
          return this.node;
        };
        Link3.prototype.createChild = function(name, node) {
          if (node === void 0) {
            node = this.vol.createNode();
          }
          var link = new Link3(this.vol, this, name);
          link.setNode(node);
          if (node.isDirectory()) {
          }
          this.setChild(name, link);
          return link;
        };
        Link3.prototype.setChild = function(name, link) {
          if (link === void 0) {
            link = new Link3(this.vol, this, name);
          }
          this.children[name] = link;
          link.parent = this;
          this.length++;
          this.emit("child:add", link, this);
          return link;
        };
        Link3.prototype.deleteChild = function(link) {
          delete this.children[link.getName()];
          this.length--;
          this.emit("child:delete", link, this);
        };
        Link3.prototype.getChild = function(name) {
          if (Object.hasOwnProperty.call(this.children, name)) {
            return this.children[name];
          }
        };
        Link3.prototype.getPath = function() {
          return this.steps.join(exports.SEP);
        };
        Link3.prototype.getName = function() {
          return this.steps[this.steps.length - 1];
        };
        Link3.prototype.walk = function(steps, stop, i) {
          if (stop === void 0) {
            stop = steps.length;
          }
          if (i === void 0) {
            i = 0;
          }
          if (i >= steps.length)
            return this;
          if (i >= stop)
            return this;
          var step = steps[i];
          var link = this.getChild(step);
          if (!link)
            return null;
          return link.walk(steps, stop, i + 1);
        };
        Link3.prototype.toJSON = function() {
          return {
            steps: this.steps,
            ino: this.ino,
            children: Object.keys(this.children)
          };
        };
        return Link3;
      }(events_1.EventEmitter)
    );
    exports.Link = Link2;
    var File = (
      /** @class */
      function() {
        function File2(link, node, flags, fd2) {
          this.position = 0;
          this.link = link;
          this.node = node;
          this.flags = flags;
          this.fd = fd2;
        }
        File2.prototype.getString = function(encoding) {
          if (encoding === void 0) {
            encoding = "utf8";
          }
          return this.node.getString();
        };
        File2.prototype.setString = function(str) {
          this.node.setString(str);
        };
        File2.prototype.getBuffer = function() {
          return this.node.getBuffer();
        };
        File2.prototype.setBuffer = function(buf) {
          this.node.setBuffer(buf);
        };
        File2.prototype.getSize = function() {
          return this.node.getSize();
        };
        File2.prototype.truncate = function(len) {
          this.node.truncate(len);
        };
        File2.prototype.seekTo = function(position) {
          this.position = position;
        };
        File2.prototype.stats = function() {
          return Stats_1.default.build(this.node);
        };
        File2.prototype.write = function(buf, offset, length, position) {
          if (offset === void 0) {
            offset = 0;
          }
          if (length === void 0) {
            length = buf.length;
          }
          if (typeof position !== "number")
            position = this.position;
          if (this.flags & O_APPEND)
            position = this.getSize();
          var bytes = this.node.write(buf, offset, length, position);
          this.position = position + bytes;
          return bytes;
        };
        File2.prototype.read = function(buf, offset, length, position) {
          if (offset === void 0) {
            offset = 0;
          }
          if (length === void 0) {
            length = buf.byteLength;
          }
          if (typeof position !== "number")
            position = this.position;
          var bytes = this.node.read(buf, offset, length, position);
          this.position = position + bytes;
          return bytes;
        };
        File2.prototype.chmod = function(perm) {
          this.node.chmod(perm);
        };
        File2.prototype.chown = function(uid, gid) {
          this.node.chown(uid, gid);
        };
        return File2;
      }()
    );
    exports.File = File;
  }
});

// node_modules/memfs/lib/setTimeoutUnref.js
var require_setTimeoutUnref = __commonJS({
  "node_modules/memfs/lib/setTimeoutUnref.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    function setTimeoutUnref(callback, time, args) {
      var ref = setTimeout.apply(null, arguments);
      if (ref && typeof ref === "object" && typeof ref.unref === "function")
        ref.unref();
      return ref;
    }
    exports.default = setTimeoutUnref;
  }
});

// node_modules/readable-stream/lib/internal/streams/stream-browser.js
var require_stream_browser = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    module.exports = require_events().EventEmitter;
  }
});

// (disabled):node_modules/util/util.js
var require_util2 = __commonJS({
  "(disabled):node_modules/util/util.js"() {
    init_process_shim();
    init_buffer_shim();
  }
});

// node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var _require = require_buffer();
    var Buffer4 = _require.Buffer;
    var _require2 = require_util2();
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer4.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0)
            return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) {
            ret += s + p.data;
          }
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0)
            return Buffer4.alloc(0);
          var ret = Buffer4.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next)
                  this.head = p.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer4.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next)
                  this.head = p.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread({}, options, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function destroy(err2, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err2);
        } else if (err2) {
          if (!this._writableState) {
            process.nextTick(emitErrorNT, this, err2);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process.nextTick(emitErrorNT, this, err2);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err2 || null, function(err3) {
        if (!cb && err3) {
          if (!_this._writableState) {
            process.nextTick(emitErrorAndCloseNT, _this, err3);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process.nextTick(emitErrorAndCloseNT, _this, err3);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process.nextTick(emitCloseNT, _this);
          cb(err3);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err2) {
      emitErrorNT(self2, err2);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err2) {
      self2.emit("error", err2);
    }
    function errorOrDestroy(stream, err2) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err2);
      else
        stream.emit("error", err2);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// node_modules/readable-stream/errors-browser.js
var require_errors_browser = __commonJS({
  "node_modules/readable-stream/errors-browser.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});

// node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});

// node_modules/util-deprecate/browser.js
var require_browser2 = __commonJS({
  "node_modules/util-deprecate/browser.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    module.exports = deprecate;
    function deprecate(fn, msg) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg);
          } else if (config("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    function config(name) {
      try {
        if (!self.localStorage)
          return false;
      } catch (_) {
        return false;
      }
      var val = self.localStorage[name];
      if (null == val)
        return false;
      return String(val).toLowerCase() === "true";
    }
  }
});

// node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    module.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_browser2()
    };
    var Stream = require_stream_browser();
    var Buffer4 = require_buffer().Buffer;
    var OurUint8Array = self.Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer4.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer4.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits_browser()(Writable, Stream);
    function nop2() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this))
        return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer4.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop2;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer4.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        process.nextTick(cb, er);
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer2 = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer2[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer2.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer2, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err2) {
        state.pendingcb--;
        if (err2) {
          errorOrDestroy(stream, err2);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          process.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          process.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err2) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err2);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err2, cb) {
      cb(err2);
    };
  }
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) {
        keys2.push(key);
      }
      return keys2;
    };
    module.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits_browser()(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      process.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    var buffer2 = require_buffer();
    var Buffer4 = buffer2.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer4.from && Buffer4.alloc && Buffer4.allocUnsafe && Buffer4.allocUnsafeSlow) {
      module.exports = buffer2;
    } else {
      copyProps(buffer2, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer4(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer4.prototype);
    copyProps(Buffer4, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer4(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer4(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer4(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer2.SlowBuffer(size);
    };
  }
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "node_modules/string_decoder/lib/string_decoder.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var Buffer4 = require_safe_buffer().Buffer;
    var isEncoding = Buffer4.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc)
        return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried)
              return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer4.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer4.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0)
        return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0)
          return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length)
        return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127)
        return 0;
      else if (byte >> 5 === 6)
        return 2;
      else if (byte >> 4 === 14)
        return 3;
      else if (byte >> 3 === 30)
        return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i)
        return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2)
            nb = 0;
          else
            self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0)
        return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed)
        return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0)
        return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err2) {
        callback.call(stream, err2);
      };
      var onclose = function onclose2() {
        var err2;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err2 = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err2);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err2 = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err2);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});

// node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var finished = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      process.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            process.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err2) {
          if (err2) {
            reject(err2);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err2) {
        if (err2 && err2.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err2);
          }
          iterator[kError] = err2;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});

// node_modules/readable-stream/lib/internal/streams/from-browser.js
var require_from_browser = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});

// node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    module.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require_events().EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream_browser();
    var Buffer4 = require_buffer().Buffer;
    var OurUint8Array = self.Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer4.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer4.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = require_util2();
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function debug2() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits_browser()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable))
        return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err2, cb) {
      cb(err2);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer4.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer4.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n !== n) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length)
        return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        process.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
          dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
        }
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
        ;
      }
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
  }
});

// node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    module.exports = Transform;
    var _require$codes = require_errors_browser().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits_browser()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err2, cb) {
      Duplex.prototype._destroy.call(this, err2, function(err22) {
        cb(err22);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    module.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits_browser()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors_browser().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err2) {
      if (err2)
        throw err2;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0)
        eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err2) {
        if (err2)
          return callback(err2);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err2) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isRequest(stream))
          return stream.abort();
        if (typeof stream.destroy === "function")
          return stream.destroy();
        callback(err2 || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length)
        return noop;
      if (typeof streams[streams.length - 1] !== "function")
        return noop;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err2) {
          if (!error)
            error = err2;
          if (err2)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module.exports = pipeline;
  }
});

// node_modules/stream-browserify/index.js
var require_stream_browserify = __commonJS({
  "node_modules/stream-browserify/index.js"(exports, module) {
    init_process_shim();
    init_buffer_shim();
    module.exports = Stream;
    var EE = require_events().EventEmitter;
    var inherits = require_inherits_browser();
    inherits(Stream, EE);
    Stream.Readable = require_stream_readable();
    Stream.Writable = require_stream_writable();
    Stream.Duplex = require_stream_duplex();
    Stream.Transform = require_stream_transform();
    Stream.PassThrough = require_stream_passthrough();
    Stream.finished = require_end_of_stream();
    Stream.pipeline = require_pipeline();
    Stream.Stream = Stream;
    function Stream() {
      EE.call(this);
    }
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  }
});

// node_modules/fast-extend/index.js
var require_fast_extend = __commonJS({
  "node_modules/fast-extend/index.js"(exports) {
    init_process_shim();
    init_buffer_shim();
    var slice = Array.prototype.slice;
    exports.extend = function extend(a, b) {
      for (var key in b)
        a[key] = b[key];
      return arguments.length < 3 ? a : extend.apply(null, [a].concat(slice.call(arguments, 2)));
    };
  }
});

// node_modules/memfs/lib/promises.js
var require_promises = __commonJS({
  "node_modules/memfs/lib/promises.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    function promisify(vol, fn, getResult) {
      if (getResult === void 0) {
        getResult = function(input) {
          return input;
        };
      }
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new Promise(function(resolve, reject) {
          vol[fn].bind(vol).apply(void 0, __spreadArrays(args, [function(error, result) {
            if (error)
              return reject(error);
            return resolve(getResult(result));
          }]));
        });
      };
    }
    var FileHandle = (
      /** @class */
      function() {
        function FileHandle2(vol, fd2) {
          this.vol = vol;
          this.fd = fd2;
        }
        FileHandle2.prototype.appendFile = function(data, options) {
          return promisify(this.vol, "appendFile")(this.fd, data, options);
        };
        FileHandle2.prototype.chmod = function(mode) {
          return promisify(this.vol, "fchmod")(this.fd, mode);
        };
        FileHandle2.prototype.chown = function(uid, gid) {
          return promisify(this.vol, "fchown")(this.fd, uid, gid);
        };
        FileHandle2.prototype.close = function() {
          return promisify(this.vol, "close")(this.fd);
        };
        FileHandle2.prototype.datasync = function() {
          return promisify(this.vol, "fdatasync")(this.fd);
        };
        FileHandle2.prototype.read = function(buffer2, offset, length, position) {
          return promisify(this.vol, "read", function(bytesRead) {
            return { bytesRead, buffer: buffer2 };
          })(this.fd, buffer2, offset, length, position);
        };
        FileHandle2.prototype.readFile = function(options) {
          return promisify(this.vol, "readFile")(this.fd, options);
        };
        FileHandle2.prototype.stat = function(options) {
          return promisify(this.vol, "fstat")(this.fd, options);
        };
        FileHandle2.prototype.sync = function() {
          return promisify(this.vol, "fsync")(this.fd);
        };
        FileHandle2.prototype.truncate = function(len) {
          return promisify(this.vol, "ftruncate")(this.fd, len);
        };
        FileHandle2.prototype.utimes = function(atime, mtime) {
          return promisify(this.vol, "futimes")(this.fd, atime, mtime);
        };
        FileHandle2.prototype.write = function(buffer2, offset, length, position) {
          return promisify(this.vol, "write", function(bytesWritten) {
            return { bytesWritten, buffer: buffer2 };
          })(this.fd, buffer2, offset, length, position);
        };
        FileHandle2.prototype.writeFile = function(data, options) {
          return promisify(this.vol, "writeFile")(this.fd, data, options);
        };
        return FileHandle2;
      }()
    );
    exports.FileHandle = FileHandle;
    function createPromisesApi(vol) {
      if (typeof Promise === "undefined")
        return null;
      return {
        FileHandle,
        access: function(path2, mode) {
          return promisify(vol, "access")(path2, mode);
        },
        appendFile: function(path2, data, options) {
          return promisify(vol, "appendFile")(path2 instanceof FileHandle ? path2.fd : path2, data, options);
        },
        chmod: function(path2, mode) {
          return promisify(vol, "chmod")(path2, mode);
        },
        chown: function(path2, uid, gid) {
          return promisify(vol, "chown")(path2, uid, gid);
        },
        copyFile: function(src, dest, flags) {
          return promisify(vol, "copyFile")(src, dest, flags);
        },
        lchmod: function(path2, mode) {
          return promisify(vol, "lchmod")(path2, mode);
        },
        lchown: function(path2, uid, gid) {
          return promisify(vol, "lchown")(path2, uid, gid);
        },
        link: function(existingPath, newPath) {
          return promisify(vol, "link")(existingPath, newPath);
        },
        lstat: function(path2, options) {
          return promisify(vol, "lstat")(path2, options);
        },
        mkdir: function(path2, options) {
          return promisify(vol, "mkdir")(path2, options);
        },
        mkdtemp: function(prefix, options) {
          return promisify(vol, "mkdtemp")(prefix, options);
        },
        open: function(path2, flags, mode) {
          return promisify(vol, "open", function(fd2) {
            return new FileHandle(vol, fd2);
          })(path2, flags, mode);
        },
        readdir: function(path2, options) {
          return promisify(vol, "readdir")(path2, options);
        },
        readFile: function(id, options) {
          return promisify(vol, "readFile")(id instanceof FileHandle ? id.fd : id, options);
        },
        readlink: function(path2, options) {
          return promisify(vol, "readlink")(path2, options);
        },
        realpath: function(path2, options) {
          return promisify(vol, "realpath")(path2, options);
        },
        rename: function(oldPath, newPath) {
          return promisify(vol, "rename")(oldPath, newPath);
        },
        rmdir: function(path2) {
          return promisify(vol, "rmdir")(path2);
        },
        stat: function(path2, options) {
          return promisify(vol, "stat")(path2, options);
        },
        symlink: function(target, path2, type) {
          return promisify(vol, "symlink")(target, path2, type);
        },
        truncate: function(path2, len) {
          return promisify(vol, "truncate")(path2, len);
        },
        unlink: function(path2) {
          return promisify(vol, "unlink")(path2);
        },
        utimes: function(path2, atime, mtime) {
          return promisify(vol, "utimes")(path2, atime, mtime);
        },
        writeFile: function(id, data, options) {
          return promisify(vol, "writeFile")(id instanceof FileHandle ? id.fd : id, data, options);
        }
      };
    }
    exports.default = createPromisesApi;
  }
});

// (disabled):url
var require_url = __commonJS({
  "(disabled):url"() {
    init_process_shim();
    init_buffer_shim();
  }
});

// node_modules/fs-monkey/lib/correctPath.js
var require_correctPath = __commonJS({
  "node_modules/fs-monkey/lib/correctPath.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.unixify = unixify;
    exports.correctPath = correctPath;
    var isWin = process.platform === "win32";
    function removeTrailingSeparator(str) {
      var i = str.length - 1;
      if (i < 2) {
        return str;
      }
      while (isSeparator(str, i)) {
        i--;
      }
      return str.substr(0, i + 1);
    }
    function isSeparator(str, i) {
      var char = str[i];
      return i > 0 && (char === "/" || isWin && char === "\\");
    }
    function normalizePath(str, stripTrailing) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      str = str.replace(/[\\\/]+/g, "/");
      if (stripTrailing !== false) {
        str = removeTrailingSeparator(str);
      }
      return str;
    }
    function unixify(filepath) {
      var stripTrailing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (isWin) {
        filepath = normalizePath(filepath, stripTrailing);
        return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
      }
      return filepath;
    }
    function correctPath(filepath) {
      return unixify(filepath.replace(/^\\\\\?\\.:\\/, "\\"));
    }
  }
});

// node_modules/memfs/lib/volume.js
var require_volume = __commonJS({
  "node_modules/memfs/lib/volume.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b3) {
          d2.__proto__ = b3;
        } || function(d2, b3) {
          for (var p in b3)
            if (b3.hasOwnProperty(p))
              d2[p] = b3[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var pathModule = require_path_browserify();
    var node_1 = require_node();
    var Stats_1 = require_Stats();
    var Dirent_1 = require_Dirent();
    var buffer_1 = require_buffer2();
    var setImmediate_1 = require_setImmediate();
    var process_1 = require_process();
    var setTimeoutUnref_1 = require_setTimeoutUnref();
    var stream_1 = require_stream_browserify();
    var constants_1 = require_constants2();
    var events_1 = require_events();
    var encoding_1 = require_encoding();
    var errors = require_errors2();
    var extend = require_fast_extend().extend;
    var util = require_util();
    var promises_1 = require_promises();
    var resolveCrossPlatform = pathModule.resolve;
    var O_RDONLY = constants_1.constants.O_RDONLY;
    var O_WRONLY = constants_1.constants.O_WRONLY;
    var O_RDWR = constants_1.constants.O_RDWR;
    var O_CREAT = constants_1.constants.O_CREAT;
    var O_EXCL = constants_1.constants.O_EXCL;
    var O_TRUNC = constants_1.constants.O_TRUNC;
    var O_APPEND = constants_1.constants.O_APPEND;
    var O_SYNC = constants_1.constants.O_SYNC;
    var O_DIRECTORY = constants_1.constants.O_DIRECTORY;
    var F_OK = constants_1.constants.F_OK;
    var COPYFILE_EXCL = constants_1.constants.COPYFILE_EXCL;
    var COPYFILE_FICLONE_FORCE = constants_1.constants.COPYFILE_FICLONE_FORCE;
    var sep;
    var relative;
    if (pathModule.posix) {
      posix = pathModule.posix;
      sep = posix.sep;
      relative = posix.relative;
    } else {
      sep = pathModule.sep;
      relative = pathModule.relative;
    }
    var posix;
    var isWin = process_1.default.platform === "win32";
    var kMinPoolSpace = 128;
    var ERRSTR = {
      PATH_STR: "path must be a string or Buffer",
      // FD:             'file descriptor must be a unsigned 32-bit integer',
      FD: "fd must be a file descriptor",
      MODE_INT: "mode must be an int",
      CB: "callback must be a function",
      UID: "uid must be an unsigned int",
      GID: "gid must be an unsigned int",
      LEN: "len must be an integer",
      ATIME: "atime must be an integer",
      MTIME: "mtime must be an integer",
      PREFIX: "filename prefix is required",
      BUFFER: "buffer must be an instance of Buffer or StaticBuffer",
      OFFSET: "offset must be an integer",
      LENGTH: "length must be an integer",
      POSITION: "position must be an integer"
    };
    var ERRSTR_OPTS = function(tipeof) {
      return "Expected options to be either an object or a string, but got " + tipeof + " instead";
    };
    var ENOENT = "ENOENT";
    var EBADF = "EBADF";
    var EINVAL = "EINVAL";
    var EPERM = "EPERM";
    var EPROTO = "EPROTO";
    var EEXIST = "EEXIST";
    var ENOTDIR = "ENOTDIR";
    var EMFILE = "EMFILE";
    var EACCES = "EACCES";
    var EISDIR = "EISDIR";
    var ENOTEMPTY = "ENOTEMPTY";
    var ENOSYS = "ENOSYS";
    function formatError(errorCode, func, path2, path22) {
      if (func === void 0) {
        func = "";
      }
      if (path2 === void 0) {
        path2 = "";
      }
      if (path22 === void 0) {
        path22 = "";
      }
      var pathFormatted = "";
      if (path2)
        pathFormatted = " '" + path2 + "'";
      if (path22)
        pathFormatted += " -> '" + path22 + "'";
      switch (errorCode) {
        case ENOENT:
          return "ENOENT: no such file or directory, " + func + pathFormatted;
        case EBADF:
          return "EBADF: bad file descriptor, " + func + pathFormatted;
        case EINVAL:
          return "EINVAL: invalid argument, " + func + pathFormatted;
        case EPERM:
          return "EPERM: operation not permitted, " + func + pathFormatted;
        case EPROTO:
          return "EPROTO: protocol error, " + func + pathFormatted;
        case EEXIST:
          return "EEXIST: file already exists, " + func + pathFormatted;
        case ENOTDIR:
          return "ENOTDIR: not a directory, " + func + pathFormatted;
        case EISDIR:
          return "EISDIR: illegal operation on a directory, " + func + pathFormatted;
        case EACCES:
          return "EACCES: permission denied, " + func + pathFormatted;
        case ENOTEMPTY:
          return "ENOTEMPTY: directory not empty, " + func + pathFormatted;
        case EMFILE:
          return "EMFILE: too many open files, " + func + pathFormatted;
        case ENOSYS:
          return "ENOSYS: function not implemented, " + func + pathFormatted;
        default:
          return errorCode + ": error occurred, " + func + pathFormatted;
      }
    }
    function createError(errorCode, func, path2, path22, Constructor) {
      if (func === void 0) {
        func = "";
      }
      if (path2 === void 0) {
        path2 = "";
      }
      if (path22 === void 0) {
        path22 = "";
      }
      if (Constructor === void 0) {
        Constructor = Error;
      }
      var error = new Constructor(formatError(errorCode, func, path2, path22));
      error.code = errorCode;
      return error;
    }
    var FLAGS;
    (function(FLAGS2) {
      FLAGS2[FLAGS2["r"] = O_RDONLY] = "r";
      FLAGS2[FLAGS2["r+"] = O_RDWR] = "r+";
      FLAGS2[FLAGS2["rs"] = O_RDONLY | O_SYNC] = "rs";
      FLAGS2[FLAGS2["sr"] = FLAGS2.rs] = "sr";
      FLAGS2[FLAGS2["rs+"] = O_RDWR | O_SYNC] = "rs+";
      FLAGS2[FLAGS2["sr+"] = FLAGS2["rs+"]] = "sr+";
      FLAGS2[FLAGS2["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w";
      FLAGS2[FLAGS2["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
      FLAGS2[FLAGS2["xw"] = FLAGS2.wx] = "xw";
      FLAGS2[FLAGS2["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+";
      FLAGS2[FLAGS2["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
      FLAGS2[FLAGS2["xw+"] = FLAGS2["wx+"]] = "xw+";
      FLAGS2[FLAGS2["a"] = O_WRONLY | O_APPEND | O_CREAT] = "a";
      FLAGS2[FLAGS2["ax"] = O_WRONLY | O_APPEND | O_CREAT | O_EXCL] = "ax";
      FLAGS2[FLAGS2["xa"] = FLAGS2.ax] = "xa";
      FLAGS2[FLAGS2["a+"] = O_RDWR | O_APPEND | O_CREAT] = "a+";
      FLAGS2[FLAGS2["ax+"] = O_RDWR | O_APPEND | O_CREAT | O_EXCL] = "ax+";
      FLAGS2[FLAGS2["xa+"] = FLAGS2["ax+"]] = "xa+";
    })(FLAGS = exports.FLAGS || (exports.FLAGS = {}));
    function flagsToNumber(flags) {
      if (typeof flags === "number")
        return flags;
      if (typeof flags === "string") {
        var flagsNum = FLAGS[flags];
        if (typeof flagsNum !== "undefined")
          return flagsNum;
      }
      throw new errors.TypeError("ERR_INVALID_OPT_VALUE", "flags", flags);
    }
    exports.flagsToNumber = flagsToNumber;
    function getOptions(defaults2, options) {
      var opts;
      if (!options)
        return defaults2;
      else {
        var tipeof = typeof options;
        switch (tipeof) {
          case "string":
            opts = extend({}, defaults2, { encoding: options });
            break;
          case "object":
            opts = extend({}, defaults2, options);
            break;
          default:
            throw TypeError(ERRSTR_OPTS(tipeof));
        }
      }
      if (opts.encoding !== "buffer")
        encoding_1.assertEncoding(opts.encoding);
      return opts;
    }
    function optsGenerator(defaults2) {
      return function(options) {
        return getOptions(defaults2, options);
      };
    }
    function validateCallback(callback) {
      if (typeof callback !== "function")
        throw TypeError(ERRSTR.CB);
      return callback;
    }
    function optsAndCbGenerator(getOpts) {
      return function(options, callback) {
        return typeof options === "function" ? [getOpts(), options] : [getOpts(options), validateCallback(callback)];
      };
    }
    var optsDefaults = {
      encoding: "utf8"
    };
    var getDefaultOpts = optsGenerator(optsDefaults);
    var getDefaultOptsAndCb = optsAndCbGenerator(getDefaultOpts);
    var readFileOptsDefaults = {
      flag: "r"
    };
    var getReadFileOptions = optsGenerator(readFileOptsDefaults);
    var writeFileDefaults = {
      encoding: "utf8",
      mode: 438,
      flag: FLAGS[FLAGS.w]
    };
    var getWriteFileOptions = optsGenerator(writeFileDefaults);
    var appendFileDefaults = {
      encoding: "utf8",
      mode: 438,
      flag: FLAGS[FLAGS.a]
    };
    var getAppendFileOpts = optsGenerator(appendFileDefaults);
    var getAppendFileOptsAndCb = optsAndCbGenerator(getAppendFileOpts);
    var realpathDefaults = optsDefaults;
    var getRealpathOptions = optsGenerator(realpathDefaults);
    var getRealpathOptsAndCb = optsAndCbGenerator(getRealpathOptions);
    var mkdirDefaults = {
      mode: 511,
      recursive: false
    };
    var getMkdirOptions = function(options) {
      if (typeof options === "number")
        return extend({}, mkdirDefaults, { mode: options });
      return extend({}, mkdirDefaults, options);
    };
    var rmdirDefaults = {
      recursive: false
    };
    var getRmdirOptions = function(options) {
      return extend({}, rmdirDefaults, options);
    };
    var readdirDefaults = {
      encoding: "utf8",
      withFileTypes: false
    };
    var getReaddirOptions = optsGenerator(readdirDefaults);
    var getReaddirOptsAndCb = optsAndCbGenerator(getReaddirOptions);
    var statDefaults = {
      bigint: false
    };
    var getStatOptions = function(options) {
      if (options === void 0) {
        options = {};
      }
      return extend({}, statDefaults, options);
    };
    var getStatOptsAndCb = function(options, callback) {
      return typeof options === "function" ? [getStatOptions(), options] : [getStatOptions(options), validateCallback(callback)];
    };
    function getPathFromURLPosix(url) {
      if (url.hostname !== "") {
        throw new errors.TypeError("ERR_INVALID_FILE_URL_HOST", process_1.default.platform);
      }
      var pathname = url.pathname;
      for (var n = 0; n < pathname.length; n++) {
        if (pathname[n] === "%") {
          var third = pathname.codePointAt(n + 2) | 32;
          if (pathname[n + 1] === "2" && third === 102) {
            throw new errors.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
          }
        }
      }
      return decodeURIComponent(pathname);
    }
    function pathToFilename(path2) {
      if (typeof path2 !== "string" && !buffer_1.Buffer.isBuffer(path2)) {
        try {
          if (!(path2 instanceof require_url().URL))
            throw new TypeError(ERRSTR.PATH_STR);
        } catch (err2) {
          throw new TypeError(ERRSTR.PATH_STR);
        }
        path2 = getPathFromURLPosix(path2);
      }
      var pathString = String(path2);
      nullCheck(pathString);
      return pathString;
    }
    exports.pathToFilename = pathToFilename;
    var resolve = function(filename, base) {
      if (base === void 0) {
        base = process_1.default.cwd();
      }
      return resolveCrossPlatform(base, filename);
    };
    if (isWin) {
      _resolve_1 = resolve;
      unixify_1 = require_correctPath().unixify;
      resolve = function(filename, base) {
        return unixify_1(_resolve_1(filename, base));
      };
    }
    var _resolve_1;
    var unixify_1;
    function filenameToSteps2(filename, base) {
      var fullPath = resolve(filename, base);
      var fullPathSansSlash = fullPath.substr(1);
      if (!fullPathSansSlash)
        return [];
      return fullPathSansSlash.split(sep);
    }
    exports.filenameToSteps = filenameToSteps2;
    function pathToSteps(path2) {
      return filenameToSteps2(pathToFilename(path2));
    }
    exports.pathToSteps = pathToSteps;
    function dataToStr(data, encoding) {
      if (encoding === void 0) {
        encoding = encoding_1.ENCODING_UTF8;
      }
      if (buffer_1.Buffer.isBuffer(data))
        return data.toString(encoding);
      else if (data instanceof Uint8Array)
        return buffer_1.bufferFrom(data).toString(encoding);
      else
        return String(data);
    }
    exports.dataToStr = dataToStr;
    function dataToBuffer(data, encoding) {
      if (encoding === void 0) {
        encoding = encoding_1.ENCODING_UTF8;
      }
      if (buffer_1.Buffer.isBuffer(data))
        return data;
      else if (data instanceof Uint8Array)
        return buffer_1.bufferFrom(data);
      else
        return buffer_1.bufferFrom(String(data), encoding);
    }
    exports.dataToBuffer = dataToBuffer;
    function bufferToEncoding(buffer2, encoding) {
      if (!encoding || encoding === "buffer")
        return buffer2;
      else
        return buffer2.toString(encoding);
    }
    exports.bufferToEncoding = bufferToEncoding;
    function nullCheck(path2, callback) {
      if (("" + path2).indexOf("\0") !== -1) {
        var er = new Error("Path must be a string without null bytes");
        er.code = ENOENT;
        if (typeof callback !== "function")
          throw er;
        process_1.default.nextTick(callback, er);
        return false;
      }
      return true;
    }
    function _modeToNumber(mode, def) {
      if (typeof mode === "number")
        return mode;
      if (typeof mode === "string")
        return parseInt(mode, 8);
      if (def)
        return modeToNumber(def);
      return void 0;
    }
    function modeToNumber(mode, def) {
      var result = _modeToNumber(mode, def);
      if (typeof result !== "number" || isNaN(result))
        throw new TypeError(ERRSTR.MODE_INT);
      return result;
    }
    function isFd(path2) {
      return path2 >>> 0 === path2;
    }
    function validateFd(fd2) {
      if (!isFd(fd2))
        throw TypeError(ERRSTR.FD);
    }
    function toUnixTimestamp(time) {
      if (typeof time === "string" && +time == time) {
        return +time;
      }
      if (time instanceof Date) {
        return time.getTime() / 1e3;
      }
      if (isFinite(time)) {
        if (time < 0) {
          return Date.now() / 1e3;
        }
        return time;
      }
      throw new Error("Cannot parse time: " + time);
    }
    exports.toUnixTimestamp = toUnixTimestamp;
    function validateUid(uid) {
      if (typeof uid !== "number")
        throw TypeError(ERRSTR.UID);
    }
    function validateGid(gid) {
      if (typeof gid !== "number")
        throw TypeError(ERRSTR.GID);
    }
    var Volume2 = (
      /** @class */
      function() {
        function Volume3(props) {
          if (props === void 0) {
            props = {};
          }
          this.ino = 0;
          this.inodes = {};
          this.releasedInos = [];
          this.fds = {};
          this.releasedFds = [];
          this.maxFiles = 1e4;
          this.openFiles = 0;
          this.promisesApi = promises_1.default(this);
          this.statWatchers = {};
          this.props = extend({ Node: node_1.Node, Link: node_1.Link, File: node_1.File }, props);
          var root = this.createLink();
          root.setNode(this.createNode(true));
          var self2 = this;
          this.StatWatcher = /** @class */
          function(_super) {
            __extends(StatWatcher2, _super);
            function StatWatcher2() {
              return _super.call(this, self2) || this;
            }
            return StatWatcher2;
          }(StatWatcher);
          var _ReadStream = FsReadStream;
          this.ReadStream = /** @class */
          function(_super) {
            __extends(class_1, _super);
            function class_1() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return _super.apply(this, __spreadArrays([self2], args)) || this;
            }
            return class_1;
          }(_ReadStream);
          var _WriteStream = FsWriteStream;
          this.WriteStream = /** @class */
          function(_super) {
            __extends(class_2, _super);
            function class_2() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return _super.apply(this, __spreadArrays([self2], args)) || this;
            }
            return class_2;
          }(_WriteStream);
          this.FSWatcher = /** @class */
          function(_super) {
            __extends(FSWatcher2, _super);
            function FSWatcher2() {
              return _super.call(this, self2) || this;
            }
            return FSWatcher2;
          }(FSWatcher);
          this.root = root;
        }
        Volume3.fromJSON = function(json, cwd2) {
          var vol = new Volume3();
          vol.fromJSON(json, cwd2);
          return vol;
        };
        Object.defineProperty(Volume3.prototype, "promises", {
          get: function() {
            if (this.promisesApi === null)
              throw new Error("Promise is not supported in this environment.");
            return this.promisesApi;
          },
          enumerable: true,
          configurable: true
        });
        Volume3.prototype.createLink = function(parent, name, isDirectory, perm) {
          if (isDirectory === void 0) {
            isDirectory = false;
          }
          if (!parent) {
            return new this.props.Link(this, null, "");
          }
          if (!name) {
            throw new Error("createLink: name cannot be empty");
          }
          return parent.createChild(name, this.createNode(isDirectory, perm));
        };
        Volume3.prototype.deleteLink = function(link) {
          var parent = link.parent;
          if (parent) {
            parent.deleteChild(link);
            return true;
          }
          return false;
        };
        Volume3.prototype.newInoNumber = function() {
          var releasedFd = this.releasedInos.pop();
          if (releasedFd)
            return releasedFd;
          else {
            this.ino = (this.ino + 1) % 4294967295;
            return this.ino;
          }
        };
        Volume3.prototype.newFdNumber = function() {
          var releasedFd = this.releasedFds.pop();
          return typeof releasedFd === "number" ? releasedFd : Volume3.fd--;
        };
        Volume3.prototype.createNode = function(isDirectory, perm) {
          if (isDirectory === void 0) {
            isDirectory = false;
          }
          var node = new this.props.Node(this.newInoNumber(), perm);
          if (isDirectory)
            node.setIsDirectory();
          this.inodes[node.ino] = node;
          return node;
        };
        Volume3.prototype.getNode = function(ino) {
          return this.inodes[ino];
        };
        Volume3.prototype.deleteNode = function(node) {
          node.del();
          delete this.inodes[node.ino];
          this.releasedInos.push(node.ino);
        };
        Volume3.prototype.genRndStr = function() {
          var str = (Math.random() + 1).toString(36).substr(2, 6);
          if (str.length === 6)
            return str;
          else
            return this.genRndStr();
        };
        Volume3.prototype.getLink = function(steps) {
          return this.root.walk(steps);
        };
        Volume3.prototype.getLinkOrThrow = function(filename, funcName) {
          var steps = filenameToSteps2(filename);
          var link = this.getLink(steps);
          if (!link)
            throw createError(ENOENT, funcName, filename);
          return link;
        };
        Volume3.prototype.getResolvedLink = function(filenameOrSteps) {
          var steps = typeof filenameOrSteps === "string" ? filenameToSteps2(filenameOrSteps) : filenameOrSteps;
          var link = this.root;
          var i = 0;
          while (i < steps.length) {
            var step = steps[i];
            link = link.getChild(step);
            if (!link)
              return null;
            var node = link.getNode();
            if (node.isSymlink()) {
              steps = node.symlink.concat(steps.slice(i + 1));
              link = this.root;
              i = 0;
              continue;
            }
            i++;
          }
          return link;
        };
        Volume3.prototype.getResolvedLinkOrThrow = function(filename, funcName) {
          var link = this.getResolvedLink(filename);
          if (!link)
            throw createError(ENOENT, funcName, filename);
          return link;
        };
        Volume3.prototype.resolveSymlinks = function(link) {
          return this.getResolvedLink(link.steps.slice(1));
        };
        Volume3.prototype.getLinkAsDirOrThrow = function(filename, funcName) {
          var link = this.getLinkOrThrow(filename, funcName);
          if (!link.getNode().isDirectory())
            throw createError(ENOTDIR, funcName, filename);
          return link;
        };
        Volume3.prototype.getLinkParent = function(steps) {
          return this.root.walk(steps, steps.length - 1);
        };
        Volume3.prototype.getLinkParentAsDirOrThrow = function(filenameOrSteps, funcName) {
          var steps = filenameOrSteps instanceof Array ? filenameOrSteps : filenameToSteps2(filenameOrSteps);
          var link = this.getLinkParent(steps);
          if (!link)
            throw createError(ENOENT, funcName, sep + steps.join(sep));
          if (!link.getNode().isDirectory())
            throw createError(ENOTDIR, funcName, sep + steps.join(sep));
          return link;
        };
        Volume3.prototype.getFileByFd = function(fd2) {
          return this.fds[String(fd2)];
        };
        Volume3.prototype.getFileByFdOrThrow = function(fd2, funcName) {
          if (!isFd(fd2))
            throw TypeError(ERRSTR.FD);
          var file = this.getFileByFd(fd2);
          if (!file)
            throw createError(EBADF, funcName);
          return file;
        };
        Volume3.prototype.getNodeByIdOrCreate = function(id, flags, perm) {
          if (typeof id === "number") {
            var file = this.getFileByFd(id);
            if (!file)
              throw Error("File nto found");
            return file.node;
          } else {
            var steps = pathToSteps(id);
            var link = this.getLink(steps);
            if (link)
              return link.getNode();
            if (flags & O_CREAT) {
              var dirLink = this.getLinkParent(steps);
              if (dirLink) {
                var name_1 = steps[steps.length - 1];
                link = this.createLink(dirLink, name_1, false, perm);
                return link.getNode();
              }
            }
            throw createError(ENOENT, "getNodeByIdOrCreate", pathToFilename(id));
          }
        };
        Volume3.prototype.wrapAsync = function(method, args, callback) {
          var _this = this;
          validateCallback(callback);
          setImmediate_1.default(function() {
            try {
              callback(null, method.apply(_this, args));
            } catch (err2) {
              callback(err2);
            }
          });
        };
        Volume3.prototype._toJSON = function(link, json, path2) {
          var _a2;
          if (link === void 0) {
            link = this.root;
          }
          if (json === void 0) {
            json = {};
          }
          var isEmpty = true;
          var children = link.children;
          if (link.getNode().isFile()) {
            children = (_a2 = {}, _a2[link.getName()] = link.parent.getChild(link.getName()), _a2);
            link = link.parent;
          }
          for (var name_2 in children) {
            isEmpty = false;
            var child = link.getChild(name_2);
            if (!child) {
              throw new Error("_toJSON: unexpected undefined");
            }
            var node = child.getNode();
            if (node.isFile()) {
              var filename = child.getPath();
              if (path2)
                filename = relative(path2, filename);
              json[filename] = node.getString();
            } else if (node.isDirectory()) {
              this._toJSON(child, json, path2);
            }
          }
          var dirPath = link.getPath();
          if (path2)
            dirPath = relative(path2, dirPath);
          if (dirPath && isEmpty) {
            json[dirPath] = null;
          }
          return json;
        };
        Volume3.prototype.toJSON = function(paths, json, isRelative) {
          if (json === void 0) {
            json = {};
          }
          if (isRelative === void 0) {
            isRelative = false;
          }
          var links = [];
          if (paths) {
            if (!(paths instanceof Array))
              paths = [paths];
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
              var path2 = paths_1[_i];
              var filename = pathToFilename(path2);
              var link = this.getResolvedLink(filename);
              if (!link)
                continue;
              links.push(link);
            }
          } else {
            links.push(this.root);
          }
          if (!links.length)
            return json;
          for (var _a2 = 0, links_1 = links; _a2 < links_1.length; _a2++) {
            var link = links_1[_a2];
            this._toJSON(link, json, isRelative ? link.getPath() : "");
          }
          return json;
        };
        Volume3.prototype.fromJSON = function(json, cwd2) {
          if (cwd2 === void 0) {
            cwd2 = process_1.default.cwd();
          }
          for (var filename in json) {
            var data = json[filename];
            if (typeof data === "string") {
              filename = resolve(filename, cwd2);
              var steps = filenameToSteps2(filename);
              if (steps.length > 1) {
                var dirname = sep + steps.slice(0, steps.length - 1).join(sep);
                this.mkdirpBase(
                  dirname,
                  511
                  /* DIR */
                );
              }
              this.writeFileSync(filename, data);
            } else {
              this.mkdirpBase(
                filename,
                511
                /* DIR */
              );
            }
          }
        };
        Volume3.prototype.reset = function() {
          this.ino = 0;
          this.inodes = {};
          this.releasedInos = [];
          this.fds = {};
          this.releasedFds = [];
          this.openFiles = 0;
          this.root = this.createLink();
          this.root.setNode(this.createNode(true));
        };
        Volume3.prototype.mountSync = function(mountpoint, json) {
          this.fromJSON(json, mountpoint);
        };
        Volume3.prototype.openLink = function(link, flagsNum, resolveSymlinks) {
          if (resolveSymlinks === void 0) {
            resolveSymlinks = true;
          }
          if (this.openFiles >= this.maxFiles) {
            throw createError(EMFILE, "open", link.getPath());
          }
          var realLink = link;
          if (resolveSymlinks)
            realLink = this.resolveSymlinks(link);
          if (!realLink)
            throw createError(ENOENT, "open", link.getPath());
          var node = realLink.getNode();
          if (node.isDirectory()) {
            if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY)
              throw createError(EISDIR, "open", link.getPath());
          } else {
            if (flagsNum & O_DIRECTORY)
              throw createError(ENOTDIR, "open", link.getPath());
          }
          if (!(flagsNum & O_WRONLY)) {
            if (!node.canRead()) {
              throw createError(EACCES, "open", link.getPath());
            }
          }
          if (flagsNum & O_RDWR) {
          }
          var file = new this.props.File(link, node, flagsNum, this.newFdNumber());
          this.fds[file.fd] = file;
          this.openFiles++;
          if (flagsNum & O_TRUNC)
            file.truncate();
          return file;
        };
        Volume3.prototype.openFile = function(filename, flagsNum, modeNum, resolveSymlinks) {
          if (resolveSymlinks === void 0) {
            resolveSymlinks = true;
          }
          var steps = filenameToSteps2(filename);
          var link = resolveSymlinks ? this.getResolvedLink(steps) : this.getLink(steps);
          if (!link && flagsNum & O_CREAT) {
            var dirLink = this.getResolvedLink(steps.slice(0, steps.length - 1));
            if (!dirLink)
              throw createError(ENOENT, "open", sep + steps.join(sep));
            if (flagsNum & O_CREAT && typeof modeNum === "number") {
              link = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
            }
          }
          if (link)
            return this.openLink(link, flagsNum, resolveSymlinks);
          throw createError(ENOENT, "open", filename);
        };
        Volume3.prototype.openBase = function(filename, flagsNum, modeNum, resolveSymlinks) {
          if (resolveSymlinks === void 0) {
            resolveSymlinks = true;
          }
          var file = this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
          if (!file)
            throw createError(ENOENT, "open", filename);
          return file.fd;
        };
        Volume3.prototype.openSync = function(path2, flags, mode) {
          if (mode === void 0) {
            mode = 438;
          }
          var modeNum = modeToNumber(mode);
          var fileName = pathToFilename(path2);
          var flagsNum = flagsToNumber(flags);
          return this.openBase(fileName, flagsNum, modeNum);
        };
        Volume3.prototype.open = function(path2, flags, a, b) {
          var mode = a;
          var callback = b;
          if (typeof a === "function") {
            mode = 438;
            callback = a;
          }
          mode = mode || 438;
          var modeNum = modeToNumber(mode);
          var fileName = pathToFilename(path2);
          var flagsNum = flagsToNumber(flags);
          this.wrapAsync(this.openBase, [fileName, flagsNum, modeNum], callback);
        };
        Volume3.prototype.closeFile = function(file) {
          if (!this.fds[file.fd])
            return;
          this.openFiles--;
          delete this.fds[file.fd];
          this.releasedFds.push(file.fd);
        };
        Volume3.prototype.closeSync = function(fd2) {
          validateFd(fd2);
          var file = this.getFileByFdOrThrow(fd2, "close");
          this.closeFile(file);
        };
        Volume3.prototype.close = function(fd2, callback) {
          validateFd(fd2);
          this.wrapAsync(this.closeSync, [fd2], callback);
        };
        Volume3.prototype.openFileOrGetById = function(id, flagsNum, modeNum) {
          if (typeof id === "number") {
            var file = this.fds[id];
            if (!file)
              throw createError(ENOENT);
            return file;
          } else {
            return this.openFile(pathToFilename(id), flagsNum, modeNum);
          }
        };
        Volume3.prototype.readBase = function(fd2, buffer2, offset, length, position) {
          var file = this.getFileByFdOrThrow(fd2);
          return file.read(buffer2, Number(offset), Number(length), position);
        };
        Volume3.prototype.readSync = function(fd2, buffer2, offset, length, position) {
          validateFd(fd2);
          return this.readBase(fd2, buffer2, offset, length, position);
        };
        Volume3.prototype.read = function(fd2, buffer2, offset, length, position, callback) {
          var _this = this;
          validateCallback(callback);
          if (length === 0) {
            return process_1.default.nextTick(function() {
              if (callback)
                callback(null, 0, buffer2);
            });
          }
          setImmediate_1.default(function() {
            try {
              var bytes = _this.readBase(fd2, buffer2, offset, length, position);
              callback(null, bytes, buffer2);
            } catch (err2) {
              callback(err2);
            }
          });
        };
        Volume3.prototype.readFileBase = function(id, flagsNum, encoding) {
          var result;
          var isUserFd = typeof id === "number";
          var userOwnsFd = isUserFd && isFd(id);
          var fd2;
          if (userOwnsFd)
            fd2 = id;
          else {
            var filename = pathToFilename(id);
            var steps = filenameToSteps2(filename);
            var link = this.getResolvedLink(steps);
            if (link) {
              var node = link.getNode();
              if (node.isDirectory())
                throw createError(EISDIR, "open", link.getPath());
            }
            fd2 = this.openSync(id, flagsNum);
          }
          try {
            result = bufferToEncoding(this.getFileByFdOrThrow(fd2).getBuffer(), encoding);
          } finally {
            if (!userOwnsFd) {
              this.closeSync(fd2);
            }
          }
          return result;
        };
        Volume3.prototype.readFileSync = function(file, options) {
          var opts = getReadFileOptions(options);
          var flagsNum = flagsToNumber(opts.flag);
          return this.readFileBase(file, flagsNum, opts.encoding);
        };
        Volume3.prototype.readFile = function(id, a, b) {
          var _a2 = optsAndCbGenerator(getReadFileOptions)(a, b), opts = _a2[0], callback = _a2[1];
          var flagsNum = flagsToNumber(opts.flag);
          this.wrapAsync(this.readFileBase, [id, flagsNum, opts.encoding], callback);
        };
        Volume3.prototype.writeBase = function(fd2, buf, offset, length, position) {
          var file = this.getFileByFdOrThrow(fd2, "write");
          return file.write(buf, offset, length, position);
        };
        Volume3.prototype.writeSync = function(fd2, a, b, c, d) {
          validateFd(fd2);
          var encoding;
          var offset;
          var length;
          var position;
          var isBuffer = typeof a !== "string";
          if (isBuffer) {
            offset = (b || 0) | 0;
            length = c;
            position = d;
          } else {
            position = b;
            encoding = c;
          }
          var buf = dataToBuffer(a, encoding);
          if (isBuffer) {
            if (typeof length === "undefined") {
              length = buf.length;
            }
          } else {
            offset = 0;
            length = buf.length;
          }
          return this.writeBase(fd2, buf, offset, length, position);
        };
        Volume3.prototype.write = function(fd2, a, b, c, d, e) {
          var _this = this;
          validateFd(fd2);
          var offset;
          var length;
          var position;
          var encoding;
          var callback;
          var tipa = typeof a;
          var tipb = typeof b;
          var tipc = typeof c;
          var tipd = typeof d;
          if (tipa !== "string") {
            if (tipb === "function") {
              callback = b;
            } else if (tipc === "function") {
              offset = b | 0;
              callback = c;
            } else if (tipd === "function") {
              offset = b | 0;
              length = c;
              callback = d;
            } else {
              offset = b | 0;
              length = c;
              position = d;
              callback = e;
            }
          } else {
            if (tipb === "function") {
              callback = b;
            } else if (tipc === "function") {
              position = b;
              callback = c;
            } else if (tipd === "function") {
              position = b;
              encoding = c;
              callback = d;
            }
          }
          var buf = dataToBuffer(a, encoding);
          if (tipa !== "string") {
            if (typeof length === "undefined")
              length = buf.length;
          } else {
            offset = 0;
            length = buf.length;
          }
          var cb = validateCallback(callback);
          setImmediate_1.default(function() {
            try {
              var bytes = _this.writeBase(fd2, buf, offset, length, position);
              if (tipa !== "string") {
                cb(null, bytes, buf);
              } else {
                cb(null, bytes, a);
              }
            } catch (err2) {
              cb(err2);
            }
          });
        };
        Volume3.prototype.writeFileBase = function(id, buf, flagsNum, modeNum) {
          var isUserFd = typeof id === "number";
          var fd2;
          if (isUserFd)
            fd2 = id;
          else {
            fd2 = this.openBase(pathToFilename(id), flagsNum, modeNum);
          }
          var offset = 0;
          var length = buf.length;
          var position = flagsNum & O_APPEND ? void 0 : 0;
          try {
            while (length > 0) {
              var written = this.writeSync(fd2, buf, offset, length, position);
              offset += written;
              length -= written;
              if (position !== void 0)
                position += written;
            }
          } finally {
            if (!isUserFd)
              this.closeSync(fd2);
          }
        };
        Volume3.prototype.writeFileSync = function(id, data, options) {
          var opts = getWriteFileOptions(options);
          var flagsNum = flagsToNumber(opts.flag);
          var modeNum = modeToNumber(opts.mode);
          var buf = dataToBuffer(data, opts.encoding);
          this.writeFileBase(id, buf, flagsNum, modeNum);
        };
        Volume3.prototype.writeFile = function(id, data, a, b) {
          var options = a;
          var callback = b;
          if (typeof a === "function") {
            options = writeFileDefaults;
            callback = a;
          }
          var cb = validateCallback(callback);
          var opts = getWriteFileOptions(options);
          var flagsNum = flagsToNumber(opts.flag);
          var modeNum = modeToNumber(opts.mode);
          var buf = dataToBuffer(data, opts.encoding);
          this.wrapAsync(this.writeFileBase, [id, buf, flagsNum, modeNum], cb);
        };
        Volume3.prototype.linkBase = function(filename1, filename2) {
          var steps1 = filenameToSteps2(filename1);
          var link1 = this.getLink(steps1);
          if (!link1)
            throw createError(ENOENT, "link", filename1, filename2);
          var steps2 = filenameToSteps2(filename2);
          var dir2 = this.getLinkParent(steps2);
          if (!dir2)
            throw createError(ENOENT, "link", filename1, filename2);
          var name = steps2[steps2.length - 1];
          if (dir2.getChild(name))
            throw createError(EEXIST, "link", filename1, filename2);
          var node = link1.getNode();
          node.nlink++;
          dir2.createChild(name, node);
        };
        Volume3.prototype.copyFileBase = function(src, dest, flags) {
          var buf = this.readFileSync(src);
          if (flags & COPYFILE_EXCL) {
            if (this.existsSync(dest)) {
              throw createError(EEXIST, "copyFile", src, dest);
            }
          }
          if (flags & COPYFILE_FICLONE_FORCE) {
            throw createError(ENOSYS, "copyFile", src, dest);
          }
          this.writeFileBase(
            dest,
            buf,
            FLAGS.w,
            438
            /* DEFAULT */
          );
        };
        Volume3.prototype.copyFileSync = function(src, dest, flags) {
          var srcFilename = pathToFilename(src);
          var destFilename = pathToFilename(dest);
          return this.copyFileBase(srcFilename, destFilename, (flags || 0) | 0);
        };
        Volume3.prototype.copyFile = function(src, dest, a, b) {
          var srcFilename = pathToFilename(src);
          var destFilename = pathToFilename(dest);
          var flags;
          var callback;
          if (typeof a === "function") {
            flags = 0;
            callback = a;
          } else {
            flags = a;
            callback = b;
          }
          validateCallback(callback);
          this.wrapAsync(this.copyFileBase, [srcFilename, destFilename, flags], callback);
        };
        Volume3.prototype.linkSync = function(existingPath, newPath) {
          var existingPathFilename = pathToFilename(existingPath);
          var newPathFilename = pathToFilename(newPath);
          this.linkBase(existingPathFilename, newPathFilename);
        };
        Volume3.prototype.link = function(existingPath, newPath, callback) {
          var existingPathFilename = pathToFilename(existingPath);
          var newPathFilename = pathToFilename(newPath);
          this.wrapAsync(this.linkBase, [existingPathFilename, newPathFilename], callback);
        };
        Volume3.prototype.unlinkBase = function(filename) {
          var steps = filenameToSteps2(filename);
          var link = this.getLink(steps);
          if (!link)
            throw createError(ENOENT, "unlink", filename);
          if (link.length)
            throw Error("Dir not empty...");
          this.deleteLink(link);
          var node = link.getNode();
          node.nlink--;
          if (node.nlink <= 0) {
            this.deleteNode(node);
          }
        };
        Volume3.prototype.unlinkSync = function(path2) {
          var filename = pathToFilename(path2);
          this.unlinkBase(filename);
        };
        Volume3.prototype.unlink = function(path2, callback) {
          var filename = pathToFilename(path2);
          this.wrapAsync(this.unlinkBase, [filename], callback);
        };
        Volume3.prototype.symlinkBase = function(targetFilename, pathFilename) {
          var pathSteps = filenameToSteps2(pathFilename);
          var dirLink = this.getLinkParent(pathSteps);
          if (!dirLink)
            throw createError(ENOENT, "symlink", targetFilename, pathFilename);
          var name = pathSteps[pathSteps.length - 1];
          if (dirLink.getChild(name))
            throw createError(EEXIST, "symlink", targetFilename, pathFilename);
          var symlink = dirLink.createChild(name);
          symlink.getNode().makeSymlink(filenameToSteps2(targetFilename));
          return symlink;
        };
        Volume3.prototype.symlinkSync = function(target, path2, type) {
          var targetFilename = pathToFilename(target);
          var pathFilename = pathToFilename(path2);
          this.symlinkBase(targetFilename, pathFilename);
        };
        Volume3.prototype.symlink = function(target, path2, a, b) {
          var callback = validateCallback(typeof a === "function" ? a : b);
          var targetFilename = pathToFilename(target);
          var pathFilename = pathToFilename(path2);
          this.wrapAsync(this.symlinkBase, [targetFilename, pathFilename], callback);
        };
        Volume3.prototype.realpathBase = function(filename, encoding) {
          var steps = filenameToSteps2(filename);
          var realLink = this.getResolvedLink(steps);
          if (!realLink)
            throw createError(ENOENT, "realpath", filename);
          return encoding_1.strToEncoding(realLink.getPath(), encoding);
        };
        Volume3.prototype.realpathSync = function(path2, options) {
          return this.realpathBase(pathToFilename(path2), getRealpathOptions(options).encoding);
        };
        Volume3.prototype.realpath = function(path2, a, b) {
          var _a2 = getRealpathOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
          var pathFilename = pathToFilename(path2);
          this.wrapAsync(this.realpathBase, [pathFilename, opts.encoding], callback);
        };
        Volume3.prototype.lstatBase = function(filename, bigint) {
          if (bigint === void 0) {
            bigint = false;
          }
          var link = this.getLink(filenameToSteps2(filename));
          if (!link)
            throw createError(ENOENT, "lstat", filename);
          return Stats_1.default.build(link.getNode(), bigint);
        };
        Volume3.prototype.lstatSync = function(path2, options) {
          return this.lstatBase(pathToFilename(path2), getStatOptions(options).bigint);
        };
        Volume3.prototype.lstat = function(path2, a, b) {
          var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
          this.wrapAsync(this.lstatBase, [pathToFilename(path2), opts.bigint], callback);
        };
        Volume3.prototype.statBase = function(filename, bigint) {
          if (bigint === void 0) {
            bigint = false;
          }
          var link = this.getResolvedLink(filenameToSteps2(filename));
          if (!link)
            throw createError(ENOENT, "stat", filename);
          return Stats_1.default.build(link.getNode(), bigint);
        };
        Volume3.prototype.statSync = function(path2, options) {
          return this.statBase(pathToFilename(path2), getStatOptions(options).bigint);
        };
        Volume3.prototype.stat = function(path2, a, b) {
          var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
          this.wrapAsync(this.statBase, [pathToFilename(path2), opts.bigint], callback);
        };
        Volume3.prototype.fstatBase = function(fd2, bigint) {
          if (bigint === void 0) {
            bigint = false;
          }
          var file = this.getFileByFd(fd2);
          if (!file)
            throw createError(EBADF, "fstat");
          return Stats_1.default.build(file.node, bigint);
        };
        Volume3.prototype.fstatSync = function(fd2, options) {
          return this.fstatBase(fd2, getStatOptions(options).bigint);
        };
        Volume3.prototype.fstat = function(fd2, a, b) {
          var _a2 = getStatOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
          this.wrapAsync(this.fstatBase, [fd2, opts.bigint], callback);
        };
        Volume3.prototype.renameBase = function(oldPathFilename, newPathFilename) {
          var link = this.getLink(filenameToSteps2(oldPathFilename));
          if (!link)
            throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
          var newPathSteps = filenameToSteps2(newPathFilename);
          var newPathDirLink = this.getLinkParent(newPathSteps);
          if (!newPathDirLink)
            throw createError(ENOENT, "rename", oldPathFilename, newPathFilename);
          var oldLinkParent = link.parent;
          if (oldLinkParent) {
            oldLinkParent.deleteChild(link);
          }
          var name = newPathSteps[newPathSteps.length - 1];
          link.steps = __spreadArrays(newPathDirLink.steps, [name]);
          newPathDirLink.setChild(link.getName(), link);
        };
        Volume3.prototype.renameSync = function(oldPath, newPath) {
          var oldPathFilename = pathToFilename(oldPath);
          var newPathFilename = pathToFilename(newPath);
          this.renameBase(oldPathFilename, newPathFilename);
        };
        Volume3.prototype.rename = function(oldPath, newPath, callback) {
          var oldPathFilename = pathToFilename(oldPath);
          var newPathFilename = pathToFilename(newPath);
          this.wrapAsync(this.renameBase, [oldPathFilename, newPathFilename], callback);
        };
        Volume3.prototype.existsBase = function(filename) {
          return !!this.statBase(filename);
        };
        Volume3.prototype.existsSync = function(path2) {
          try {
            return this.existsBase(pathToFilename(path2));
          } catch (err2) {
            return false;
          }
        };
        Volume3.prototype.exists = function(path2, callback) {
          var _this = this;
          var filename = pathToFilename(path2);
          if (typeof callback !== "function")
            throw Error(ERRSTR.CB);
          setImmediate_1.default(function() {
            try {
              callback(_this.existsBase(filename));
            } catch (err2) {
              callback(false);
            }
          });
        };
        Volume3.prototype.accessBase = function(filename, mode) {
          var link = this.getLinkOrThrow(filename, "access");
        };
        Volume3.prototype.accessSync = function(path2, mode) {
          if (mode === void 0) {
            mode = F_OK;
          }
          var filename = pathToFilename(path2);
          mode = mode | 0;
          this.accessBase(filename, mode);
        };
        Volume3.prototype.access = function(path2, a, b) {
          var mode = F_OK;
          var callback;
          if (typeof a !== "function") {
            mode = a | 0;
            callback = validateCallback(b);
          } else {
            callback = a;
          }
          var filename = pathToFilename(path2);
          this.wrapAsync(this.accessBase, [filename, mode], callback);
        };
        Volume3.prototype.appendFileSync = function(id, data, options) {
          if (options === void 0) {
            options = appendFileDefaults;
          }
          var opts = getAppendFileOpts(options);
          if (!opts.flag || isFd(id))
            opts.flag = "a";
          this.writeFileSync(id, data, opts);
        };
        Volume3.prototype.appendFile = function(id, data, a, b) {
          var _a2 = getAppendFileOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
          if (!opts.flag || isFd(id))
            opts.flag = "a";
          this.writeFile(id, data, opts, callback);
        };
        Volume3.prototype.readdirBase = function(filename, options) {
          var steps = filenameToSteps2(filename);
          var link = this.getResolvedLink(steps);
          if (!link)
            throw createError(ENOENT, "readdir", filename);
          var node = link.getNode();
          if (!node.isDirectory())
            throw createError(ENOTDIR, "scandir", filename);
          if (options.withFileTypes) {
            var list_1 = [];
            for (var name_3 in link.children) {
              var child = link.getChild(name_3);
              if (!child) {
                continue;
              }
              list_1.push(Dirent_1.default.build(child, options.encoding));
            }
            if (!isWin && options.encoding !== "buffer")
              list_1.sort(function(a, b) {
                if (a.name < b.name)
                  return -1;
                if (a.name > b.name)
                  return 1;
                return 0;
              });
            return list_1;
          }
          var list = [];
          for (var name_4 in link.children) {
            list.push(encoding_1.strToEncoding(name_4, options.encoding));
          }
          if (!isWin && options.encoding !== "buffer")
            list.sort();
          return list;
        };
        Volume3.prototype.readdirSync = function(path2, options) {
          var opts = getReaddirOptions(options);
          var filename = pathToFilename(path2);
          return this.readdirBase(filename, opts);
        };
        Volume3.prototype.readdir = function(path2, a, b) {
          var _a2 = getReaddirOptsAndCb(a, b), options = _a2[0], callback = _a2[1];
          var filename = pathToFilename(path2);
          this.wrapAsync(this.readdirBase, [filename, options], callback);
        };
        Volume3.prototype.readlinkBase = function(filename, encoding) {
          var link = this.getLinkOrThrow(filename, "readlink");
          var node = link.getNode();
          if (!node.isSymlink())
            throw createError(EINVAL, "readlink", filename);
          var str = sep + node.symlink.join(sep);
          return encoding_1.strToEncoding(str, encoding);
        };
        Volume3.prototype.readlinkSync = function(path2, options) {
          var opts = getDefaultOpts(options);
          var filename = pathToFilename(path2);
          return this.readlinkBase(filename, opts.encoding);
        };
        Volume3.prototype.readlink = function(path2, a, b) {
          var _a2 = getDefaultOptsAndCb(a, b), opts = _a2[0], callback = _a2[1];
          var filename = pathToFilename(path2);
          this.wrapAsync(this.readlinkBase, [filename, opts.encoding], callback);
        };
        Volume3.prototype.fsyncBase = function(fd2) {
          this.getFileByFdOrThrow(fd2, "fsync");
        };
        Volume3.prototype.fsyncSync = function(fd2) {
          this.fsyncBase(fd2);
        };
        Volume3.prototype.fsync = function(fd2, callback) {
          this.wrapAsync(this.fsyncBase, [fd2], callback);
        };
        Volume3.prototype.fdatasyncBase = function(fd2) {
          this.getFileByFdOrThrow(fd2, "fdatasync");
        };
        Volume3.prototype.fdatasyncSync = function(fd2) {
          this.fdatasyncBase(fd2);
        };
        Volume3.prototype.fdatasync = function(fd2, callback) {
          this.wrapAsync(this.fdatasyncBase, [fd2], callback);
        };
        Volume3.prototype.ftruncateBase = function(fd2, len) {
          var file = this.getFileByFdOrThrow(fd2, "ftruncate");
          file.truncate(len);
        };
        Volume3.prototype.ftruncateSync = function(fd2, len) {
          this.ftruncateBase(fd2, len);
        };
        Volume3.prototype.ftruncate = function(fd2, a, b) {
          var len = typeof a === "number" ? a : 0;
          var callback = validateCallback(typeof a === "number" ? b : a);
          this.wrapAsync(this.ftruncateBase, [fd2, len], callback);
        };
        Volume3.prototype.truncateBase = function(path2, len) {
          var fd2 = this.openSync(path2, "r+");
          try {
            this.ftruncateSync(fd2, len);
          } finally {
            this.closeSync(fd2);
          }
        };
        Volume3.prototype.truncateSync = function(id, len) {
          if (isFd(id))
            return this.ftruncateSync(id, len);
          this.truncateBase(id, len);
        };
        Volume3.prototype.truncate = function(id, a, b) {
          var len = typeof a === "number" ? a : 0;
          var callback = validateCallback(typeof a === "number" ? b : a);
          if (isFd(id))
            return this.ftruncate(id, len, callback);
          this.wrapAsync(this.truncateBase, [id, len], callback);
        };
        Volume3.prototype.futimesBase = function(fd2, atime, mtime) {
          var file = this.getFileByFdOrThrow(fd2, "futimes");
          var node = file.node;
          node.atime = new Date(atime * 1e3);
          node.mtime = new Date(mtime * 1e3);
        };
        Volume3.prototype.futimesSync = function(fd2, atime, mtime) {
          this.futimesBase(fd2, toUnixTimestamp(atime), toUnixTimestamp(mtime));
        };
        Volume3.prototype.futimes = function(fd2, atime, mtime, callback) {
          this.wrapAsync(this.futimesBase, [fd2, toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
        };
        Volume3.prototype.utimesBase = function(filename, atime, mtime) {
          var fd2 = this.openSync(filename, "r+");
          try {
            this.futimesBase(fd2, atime, mtime);
          } finally {
            this.closeSync(fd2);
          }
        };
        Volume3.prototype.utimesSync = function(path2, atime, mtime) {
          this.utimesBase(pathToFilename(path2), toUnixTimestamp(atime), toUnixTimestamp(mtime));
        };
        Volume3.prototype.utimes = function(path2, atime, mtime, callback) {
          this.wrapAsync(this.utimesBase, [pathToFilename(path2), toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
        };
        Volume3.prototype.mkdirBase = function(filename, modeNum) {
          var steps = filenameToSteps2(filename);
          if (!steps.length) {
            throw createError(EISDIR, "mkdir", filename);
          }
          var dir = this.getLinkParentAsDirOrThrow(filename, "mkdir");
          var name = steps[steps.length - 1];
          if (dir.getChild(name))
            throw createError(EEXIST, "mkdir", filename);
          dir.createChild(name, this.createNode(true, modeNum));
        };
        Volume3.prototype.mkdirpBase = function(filename, modeNum) {
          var steps = filenameToSteps2(filename);
          var link = this.root;
          for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (!link.getNode().isDirectory())
              throw createError(ENOTDIR, "mkdir", link.getPath());
            var child = link.getChild(step);
            if (child) {
              if (child.getNode().isDirectory())
                link = child;
              else
                throw createError(ENOTDIR, "mkdir", child.getPath());
            } else {
              link = link.createChild(step, this.createNode(true, modeNum));
            }
          }
        };
        Volume3.prototype.mkdirSync = function(path2, options) {
          var opts = getMkdirOptions(options);
          var modeNum = modeToNumber(opts.mode, 511);
          var filename = pathToFilename(path2);
          if (opts.recursive)
            this.mkdirpBase(filename, modeNum);
          else
            this.mkdirBase(filename, modeNum);
        };
        Volume3.prototype.mkdir = function(path2, a, b) {
          var opts = getMkdirOptions(a);
          var callback = validateCallback(typeof a === "function" ? a : b);
          var modeNum = modeToNumber(opts.mode, 511);
          var filename = pathToFilename(path2);
          if (opts.recursive)
            this.wrapAsync(this.mkdirpBase, [filename, modeNum], callback);
          else
            this.wrapAsync(this.mkdirBase, [filename, modeNum], callback);
        };
        Volume3.prototype.mkdirpSync = function(path2, mode) {
          this.mkdirSync(path2, { mode, recursive: true });
        };
        Volume3.prototype.mkdirp = function(path2, a, b) {
          var mode = typeof a === "function" ? void 0 : a;
          var callback = validateCallback(typeof a === "function" ? a : b);
          this.mkdir(path2, { mode, recursive: true }, callback);
        };
        Volume3.prototype.mkdtempBase = function(prefix, encoding, retry) {
          if (retry === void 0) {
            retry = 5;
          }
          var filename = prefix + this.genRndStr();
          try {
            this.mkdirBase(
              filename,
              511
              /* DIR */
            );
            return encoding_1.strToEncoding(filename, encoding);
          } catch (err2) {
            if (err2.code === EEXIST) {
              if (retry > 1)
                return this.mkdtempBase(prefix, encoding, retry - 1);
              else
                throw Error("Could not create temp dir.");
            } else
              throw err2;
          }
        };
        Volume3.prototype.mkdtempSync = function(prefix, options) {
          var encoding = getDefaultOpts(options).encoding;
          if (!prefix || typeof prefix !== "string")
            throw new TypeError("filename prefix is required");
          nullCheck(prefix);
          return this.mkdtempBase(prefix, encoding);
        };
        Volume3.prototype.mkdtemp = function(prefix, a, b) {
          var _a2 = getDefaultOptsAndCb(a, b), encoding = _a2[0].encoding, callback = _a2[1];
          if (!prefix || typeof prefix !== "string")
            throw new TypeError("filename prefix is required");
          if (!nullCheck(prefix))
            return;
          this.wrapAsync(this.mkdtempBase, [prefix, encoding], callback);
        };
        Volume3.prototype.rmdirBase = function(filename, options) {
          var opts = getRmdirOptions(options);
          var link = this.getLinkAsDirOrThrow(filename, "rmdir");
          if (link.length && !opts.recursive)
            throw createError(ENOTEMPTY, "rmdir", filename);
          this.deleteLink(link);
        };
        Volume3.prototype.rmdirSync = function(path2, options) {
          this.rmdirBase(pathToFilename(path2), options);
        };
        Volume3.prototype.rmdir = function(path2, a, b) {
          var opts = getRmdirOptions(a);
          var callback = validateCallback(typeof a === "function" ? a : b);
          this.wrapAsync(this.rmdirBase, [pathToFilename(path2), opts], callback);
        };
        Volume3.prototype.fchmodBase = function(fd2, modeNum) {
          var file = this.getFileByFdOrThrow(fd2, "fchmod");
          file.chmod(modeNum);
        };
        Volume3.prototype.fchmodSync = function(fd2, mode) {
          this.fchmodBase(fd2, modeToNumber(mode));
        };
        Volume3.prototype.fchmod = function(fd2, mode, callback) {
          this.wrapAsync(this.fchmodBase, [fd2, modeToNumber(mode)], callback);
        };
        Volume3.prototype.chmodBase = function(filename, modeNum) {
          var fd2 = this.openSync(filename, "r+");
          try {
            this.fchmodBase(fd2, modeNum);
          } finally {
            this.closeSync(fd2);
          }
        };
        Volume3.prototype.chmodSync = function(path2, mode) {
          var modeNum = modeToNumber(mode);
          var filename = pathToFilename(path2);
          this.chmodBase(filename, modeNum);
        };
        Volume3.prototype.chmod = function(path2, mode, callback) {
          var modeNum = modeToNumber(mode);
          var filename = pathToFilename(path2);
          this.wrapAsync(this.chmodBase, [filename, modeNum], callback);
        };
        Volume3.prototype.lchmodBase = function(filename, modeNum) {
          var fd2 = this.openBase(filename, O_RDWR, 0, false);
          try {
            this.fchmodBase(fd2, modeNum);
          } finally {
            this.closeSync(fd2);
          }
        };
        Volume3.prototype.lchmodSync = function(path2, mode) {
          var modeNum = modeToNumber(mode);
          var filename = pathToFilename(path2);
          this.lchmodBase(filename, modeNum);
        };
        Volume3.prototype.lchmod = function(path2, mode, callback) {
          var modeNum = modeToNumber(mode);
          var filename = pathToFilename(path2);
          this.wrapAsync(this.lchmodBase, [filename, modeNum], callback);
        };
        Volume3.prototype.fchownBase = function(fd2, uid, gid) {
          this.getFileByFdOrThrow(fd2, "fchown").chown(uid, gid);
        };
        Volume3.prototype.fchownSync = function(fd2, uid, gid) {
          validateUid(uid);
          validateGid(gid);
          this.fchownBase(fd2, uid, gid);
        };
        Volume3.prototype.fchown = function(fd2, uid, gid, callback) {
          validateUid(uid);
          validateGid(gid);
          this.wrapAsync(this.fchownBase, [fd2, uid, gid], callback);
        };
        Volume3.prototype.chownBase = function(filename, uid, gid) {
          var link = this.getResolvedLinkOrThrow(filename, "chown");
          var node = link.getNode();
          node.chown(uid, gid);
        };
        Volume3.prototype.chownSync = function(path2, uid, gid) {
          validateUid(uid);
          validateGid(gid);
          this.chownBase(pathToFilename(path2), uid, gid);
        };
        Volume3.prototype.chown = function(path2, uid, gid, callback) {
          validateUid(uid);
          validateGid(gid);
          this.wrapAsync(this.chownBase, [pathToFilename(path2), uid, gid], callback);
        };
        Volume3.prototype.lchownBase = function(filename, uid, gid) {
          this.getLinkOrThrow(filename, "lchown").getNode().chown(uid, gid);
        };
        Volume3.prototype.lchownSync = function(path2, uid, gid) {
          validateUid(uid);
          validateGid(gid);
          this.lchownBase(pathToFilename(path2), uid, gid);
        };
        Volume3.prototype.lchown = function(path2, uid, gid, callback) {
          validateUid(uid);
          validateGid(gid);
          this.wrapAsync(this.lchownBase, [pathToFilename(path2), uid, gid], callback);
        };
        Volume3.prototype.watchFile = function(path2, a, b) {
          var filename = pathToFilename(path2);
          var options = a;
          var listener = b;
          if (typeof options === "function") {
            listener = a;
            options = null;
          }
          if (typeof listener !== "function") {
            throw Error('"watchFile()" requires a listener function');
          }
          var interval = 5007;
          var persistent = true;
          if (options && typeof options === "object") {
            if (typeof options.interval === "number")
              interval = options.interval;
            if (typeof options.persistent === "boolean")
              persistent = options.persistent;
          }
          var watcher = this.statWatchers[filename];
          if (!watcher) {
            watcher = new this.StatWatcher();
            watcher.start(filename, persistent, interval);
            this.statWatchers[filename] = watcher;
          }
          watcher.addListener("change", listener);
          return watcher;
        };
        Volume3.prototype.unwatchFile = function(path2, listener) {
          var filename = pathToFilename(path2);
          var watcher = this.statWatchers[filename];
          if (!watcher)
            return;
          if (typeof listener === "function") {
            watcher.removeListener("change", listener);
          } else {
            watcher.removeAllListeners("change");
          }
          if (watcher.listenerCount("change") === 0) {
            watcher.stop();
            delete this.statWatchers[filename];
          }
        };
        Volume3.prototype.createReadStream = function(path2, options) {
          return new this.ReadStream(path2, options);
        };
        Volume3.prototype.createWriteStream = function(path2, options) {
          return new this.WriteStream(path2, options);
        };
        Volume3.prototype.watch = function(path2, options, listener) {
          var filename = pathToFilename(path2);
          var givenOptions = options;
          if (typeof options === "function") {
            listener = options;
            givenOptions = null;
          }
          var _a2 = getDefaultOpts(givenOptions), persistent = _a2.persistent, recursive = _a2.recursive, encoding = _a2.encoding;
          if (persistent === void 0)
            persistent = true;
          if (recursive === void 0)
            recursive = false;
          var watcher = new this.FSWatcher();
          watcher.start(filename, persistent, recursive, encoding);
          if (listener) {
            watcher.addListener("change", listener);
          }
          return watcher;
        };
        Volume3.fd = 2147483647;
        return Volume3;
      }()
    );
    exports.Volume = Volume2;
    function emitStop(self2) {
      self2.emit("stop");
    }
    var StatWatcher = (
      /** @class */
      function(_super) {
        __extends(StatWatcher2, _super);
        function StatWatcher2(vol) {
          var _this = _super.call(this) || this;
          _this.onInterval = function() {
            try {
              var stats = _this.vol.statSync(_this.filename);
              if (_this.hasChanged(stats)) {
                _this.emit("change", stats, _this.prev);
                _this.prev = stats;
              }
            } finally {
              _this.loop();
            }
          };
          _this.vol = vol;
          return _this;
        }
        StatWatcher2.prototype.loop = function() {
          this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
        };
        StatWatcher2.prototype.hasChanged = function(stats) {
          if (stats.mtimeMs > this.prev.mtimeMs)
            return true;
          if (stats.nlink !== this.prev.nlink)
            return true;
          return false;
        };
        StatWatcher2.prototype.start = function(path2, persistent, interval) {
          if (persistent === void 0) {
            persistent = true;
          }
          if (interval === void 0) {
            interval = 5007;
          }
          this.filename = pathToFilename(path2);
          this.setTimeout = persistent ? setTimeout : setTimeoutUnref_1.default;
          this.interval = interval;
          this.prev = this.vol.statSync(this.filename);
          this.loop();
        };
        StatWatcher2.prototype.stop = function() {
          clearTimeout(this.timeoutRef);
          process_1.default.nextTick(emitStop, this);
        };
        return StatWatcher2;
      }(events_1.EventEmitter)
    );
    exports.StatWatcher = StatWatcher;
    var pool;
    function allocNewPool(poolSize) {
      pool = buffer_1.bufferAllocUnsafe(poolSize);
      pool.used = 0;
    }
    util.inherits(FsReadStream, stream_1.Readable);
    exports.ReadStream = FsReadStream;
    function FsReadStream(vol, path2, options) {
      if (!(this instanceof FsReadStream))
        return new FsReadStream(vol, path2, options);
      this._vol = vol;
      options = extend({}, getOptions(options, {}));
      if (options.highWaterMark === void 0)
        options.highWaterMark = 64 * 1024;
      stream_1.Readable.call(this, options);
      this.path = pathToFilename(path2);
      this.fd = options.fd === void 0 ? null : options.fd;
      this.flags = options.flags === void 0 ? "r" : options.flags;
      this.mode = options.mode === void 0 ? 438 : options.mode;
      this.start = options.start;
      this.end = options.end;
      this.autoClose = options.autoClose === void 0 ? true : options.autoClose;
      this.pos = void 0;
      this.bytesRead = 0;
      if (this.start !== void 0) {
        if (typeof this.start !== "number") {
          throw new TypeError('"start" option must be a Number');
        }
        if (this.end === void 0) {
          this.end = Infinity;
        } else if (typeof this.end !== "number") {
          throw new TypeError('"end" option must be a Number');
        }
        if (this.start > this.end) {
          throw new Error('"start" option must be <= "end" option');
        }
        this.pos = this.start;
      }
      if (typeof this.fd !== "number")
        this.open();
      this.on("end", function() {
        if (this.autoClose) {
          if (this.destroy)
            this.destroy();
        }
      });
    }
    FsReadStream.prototype.open = function() {
      var self2 = this;
      this._vol.open(this.path, this.flags, this.mode, function(er, fd2) {
        if (er) {
          if (self2.autoClose) {
            if (self2.destroy)
              self2.destroy();
          }
          self2.emit("error", er);
          return;
        }
        self2.fd = fd2;
        self2.emit("open", fd2);
        self2.read();
      });
    };
    FsReadStream.prototype._read = function(n) {
      if (typeof this.fd !== "number") {
        return this.once("open", function() {
          this._read(n);
        });
      }
      if (this.destroyed)
        return;
      if (!pool || pool.length - pool.used < kMinPoolSpace) {
        allocNewPool(this._readableState.highWaterMark);
      }
      var thisPool = pool;
      var toRead = Math.min(pool.length - pool.used, n);
      var start = pool.used;
      if (this.pos !== void 0)
        toRead = Math.min(this.end - this.pos + 1, toRead);
      if (toRead <= 0)
        return this.push(null);
      var self2 = this;
      this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread);
      if (this.pos !== void 0)
        this.pos += toRead;
      pool.used += toRead;
      function onread(er, bytesRead) {
        if (er) {
          if (self2.autoClose && self2.destroy) {
            self2.destroy();
          }
          self2.emit("error", er);
        } else {
          var b = null;
          if (bytesRead > 0) {
            self2.bytesRead += bytesRead;
            b = thisPool.slice(start, start + bytesRead);
          }
          self2.push(b);
        }
      }
    };
    FsReadStream.prototype._destroy = function(err2, cb) {
      this.close(function(err22) {
        cb(err2 || err22);
      });
    };
    FsReadStream.prototype.close = function(cb) {
      var _this = this;
      if (cb)
        this.once("close", cb);
      if (this.closed || typeof this.fd !== "number") {
        if (typeof this.fd !== "number") {
          this.once("open", closeOnOpen);
          return;
        }
        return process_1.default.nextTick(function() {
          return _this.emit("close");
        });
      }
      this.closed = true;
      this._vol.close(this.fd, function(er) {
        if (er)
          _this.emit("error", er);
        else
          _this.emit("close");
      });
      this.fd = null;
    };
    function closeOnOpen(fd2) {
      this.close();
    }
    util.inherits(FsWriteStream, stream_1.Writable);
    exports.WriteStream = FsWriteStream;
    function FsWriteStream(vol, path2, options) {
      if (!(this instanceof FsWriteStream))
        return new FsWriteStream(vol, path2, options);
      this._vol = vol;
      options = extend({}, getOptions(options, {}));
      stream_1.Writable.call(this, options);
      this.path = pathToFilename(path2);
      this.fd = options.fd === void 0 ? null : options.fd;
      this.flags = options.flags === void 0 ? "w" : options.flags;
      this.mode = options.mode === void 0 ? 438 : options.mode;
      this.start = options.start;
      this.autoClose = options.autoClose === void 0 ? true : !!options.autoClose;
      this.pos = void 0;
      this.bytesWritten = 0;
      if (this.start !== void 0) {
        if (typeof this.start !== "number") {
          throw new TypeError('"start" option must be a Number');
        }
        if (this.start < 0) {
          throw new Error('"start" must be >= zero');
        }
        this.pos = this.start;
      }
      if (options.encoding)
        this.setDefaultEncoding(options.encoding);
      if (typeof this.fd !== "number")
        this.open();
      this.once("finish", function() {
        if (this.autoClose) {
          this.close();
        }
      });
    }
    FsWriteStream.prototype.open = function() {
      this._vol.open(this.path, this.flags, this.mode, function(er, fd2) {
        if (er) {
          if (this.autoClose && this.destroy) {
            this.destroy();
          }
          this.emit("error", er);
          return;
        }
        this.fd = fd2;
        this.emit("open", fd2);
      }.bind(this));
    };
    FsWriteStream.prototype._write = function(data, encoding, cb) {
      if (!(data instanceof buffer_1.Buffer))
        return this.emit("error", new Error("Invalid data"));
      if (typeof this.fd !== "number") {
        return this.once("open", function() {
          this._write(data, encoding, cb);
        });
      }
      var self2 = this;
      this._vol.write(this.fd, data, 0, data.length, this.pos, function(er, bytes) {
        if (er) {
          if (self2.autoClose && self2.destroy) {
            self2.destroy();
          }
          return cb(er);
        }
        self2.bytesWritten += bytes;
        cb();
      });
      if (this.pos !== void 0)
        this.pos += data.length;
    };
    FsWriteStream.prototype._writev = function(data, cb) {
      if (typeof this.fd !== "number") {
        return this.once("open", function() {
          this._writev(data, cb);
        });
      }
      var self2 = this;
      var len = data.length;
      var chunks = new Array(len);
      var size = 0;
      for (var i = 0; i < len; i++) {
        var chunk = data[i].chunk;
        chunks[i] = chunk;
        size += chunk.length;
      }
      var buf = buffer_1.Buffer.concat(chunks);
      this._vol.write(this.fd, buf, 0, buf.length, this.pos, function(er, bytes) {
        if (er) {
          if (self2.destroy)
            self2.destroy();
          return cb(er);
        }
        self2.bytesWritten += bytes;
        cb();
      });
      if (this.pos !== void 0)
        this.pos += size;
    };
    FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
    FsWriteStream.prototype.close = FsReadStream.prototype.close;
    FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end;
    var FSWatcher = (
      /** @class */
      function(_super) {
        __extends(FSWatcher2, _super);
        function FSWatcher2(vol) {
          var _this = _super.call(this) || this;
          _this._filename = "";
          _this._filenameEncoded = "";
          _this._recursive = false;
          _this._encoding = encoding_1.ENCODING_UTF8;
          _this._onNodeChange = function() {
            _this._emit("change");
          };
          _this._onParentChild = function(link) {
            if (link.getName() === _this._getName()) {
              _this._emit("rename");
            }
          };
          _this._emit = function(type) {
            _this.emit("change", type, _this._filenameEncoded);
          };
          _this._persist = function() {
            _this._timer = setTimeout(_this._persist, 1e6);
          };
          _this._vol = vol;
          return _this;
        }
        FSWatcher2.prototype._getName = function() {
          return this._steps[this._steps.length - 1];
        };
        FSWatcher2.prototype.start = function(path2, persistent, recursive, encoding) {
          if (persistent === void 0) {
            persistent = true;
          }
          if (recursive === void 0) {
            recursive = false;
          }
          if (encoding === void 0) {
            encoding = encoding_1.ENCODING_UTF8;
          }
          this._filename = pathToFilename(path2);
          this._steps = filenameToSteps2(this._filename);
          this._filenameEncoded = encoding_1.strToEncoding(this._filename);
          this._recursive = recursive;
          this._encoding = encoding;
          try {
            this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
          } catch (err2) {
            var error = new Error("watch " + this._filename + " " + err2.code);
            error.code = err2.code;
            error.errno = err2.code;
            throw error;
          }
          this._link.getNode().on("change", this._onNodeChange);
          this._link.on("child:add", this._onNodeChange);
          this._link.on("child:delete", this._onNodeChange);
          var parent = this._link.parent;
          if (parent) {
            parent.setMaxListeners(parent.getMaxListeners() + 1);
            parent.on("child:delete", this._onParentChild);
          }
          if (persistent)
            this._persist();
        };
        FSWatcher2.prototype.close = function() {
          clearTimeout(this._timer);
          this._link.getNode().removeListener("change", this._onNodeChange);
          var parent = this._link.parent;
          if (parent) {
            parent.removeListener("child:delete", this._onParentChild);
          }
        };
        return FSWatcher2;
      }(events_1.EventEmitter)
    );
    exports.FSWatcher = FSWatcher;
  }
});

// node_modules/fs-monkey/lib/util/lists.js
var require_lists = __commonJS({
  "node_modules/fs-monkey/lib/util/lists.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var fsProps = exports.fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"];
    var fsSyncMethods = exports.fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "createReadStream", "createWriteStream"];
    var fsAsyncMethods = exports.fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "watchFile", "unwatchFile", "watch"];
  }
});

// node_modules/memfs/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/memfs/lib/index.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Stats_1 = require_Stats();
    var Dirent_1 = require_Dirent();
    var volume_1 = require_volume();
    var _a2 = require_lists();
    var fsSyncMethods = _a2.fsSyncMethods;
    var fsAsyncMethods = _a2.fsAsyncMethods;
    var constants_1 = require_constants2();
    var F_OK = constants_1.constants.F_OK;
    var R_OK = constants_1.constants.R_OK;
    var W_OK = constants_1.constants.W_OK;
    var X_OK = constants_1.constants.X_OK;
    exports.Volume = volume_1.Volume;
    exports.vol = new volume_1.Volume();
    function createFsFromVolume2(vol) {
      var fs2 = { F_OK, R_OK, W_OK, X_OK, constants: constants_1.constants, Stats: Stats_1.default, Dirent: Dirent_1.default };
      for (var _i = 0, fsSyncMethods_1 = fsSyncMethods; _i < fsSyncMethods_1.length; _i++) {
        var method = fsSyncMethods_1[_i];
        if (typeof vol[method] === "function")
          fs2[method] = vol[method].bind(vol);
      }
      for (var _a3 = 0, fsAsyncMethods_1 = fsAsyncMethods; _a3 < fsAsyncMethods_1.length; _a3++) {
        var method = fsAsyncMethods_1[_a3];
        if (typeof vol[method] === "function")
          fs2[method] = vol[method].bind(vol);
      }
      fs2.StatWatcher = vol.StatWatcher;
      fs2.FSWatcher = vol.FSWatcher;
      fs2.WriteStream = vol.WriteStream;
      fs2.ReadStream = vol.ReadStream;
      fs2.promises = vol.promises;
      fs2._toUnixTimestamp = volume_1.toUnixTimestamp;
      return fs2;
    }
    exports.createFsFromVolume = createFsFromVolume2;
    exports.fs = createFsFromVolume2(exports.vol);
    module.exports = __assign(__assign({}, module.exports), exports.fs);
    module.exports.semantic = true;
  }
});

// node_modules/@wasmer/wasi/lib/polyfills/dataview.js
var require_dataview = __commonJS({
  "node_modules/@wasmer/wasi/lib/polyfills/dataview.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var bigint_1 = require_bigint();
    var exportedDataView = DataView;
    if (!exportedDataView.prototype.setBigUint64) {
      exportedDataView.prototype.setBigUint64 = function(byteOffset, value, littleEndian) {
        let lowWord;
        let highWord;
        if (value < 2 ** 32) {
          lowWord = Number(value);
          highWord = 0;
        } else {
          var bigNumberAsBinaryStr = value.toString(2);
          var bigNumberAsBinaryStr2 = "";
          for (var i = 0; i < 64 - bigNumberAsBinaryStr.length; i++) {
            bigNumberAsBinaryStr2 += "0";
          }
          bigNumberAsBinaryStr2 += bigNumberAsBinaryStr;
          highWord = parseInt(bigNumberAsBinaryStr2.substring(0, 32), 2);
          lowWord = parseInt(bigNumberAsBinaryStr2.substring(32), 2);
        }
        this.setUint32(byteOffset + (littleEndian ? 0 : 4), lowWord, littleEndian);
        this.setUint32(byteOffset + (littleEndian ? 4 : 0), highWord, littleEndian);
      };
      exportedDataView.prototype.getBigUint64 = function(byteOffset, littleEndian) {
        let lowWord = this.getUint32(byteOffset + (littleEndian ? 0 : 4), littleEndian);
        let highWord = this.getUint32(byteOffset + (littleEndian ? 4 : 0), littleEndian);
        var lowWordAsBinaryStr = lowWord.toString(2);
        var highWordAsBinaryStr = highWord.toString(2);
        var lowWordAsBinaryStrPadded = "";
        for (var i = 0; i < 32 - lowWordAsBinaryStr.length; i++) {
          lowWordAsBinaryStrPadded += "0";
        }
        lowWordAsBinaryStrPadded += lowWordAsBinaryStr;
        return bigint_1.BigIntPolyfill("0b" + highWordAsBinaryStr + lowWordAsBinaryStrPadded);
      };
    }
    exports.DataViewPolyfill = exportedDataView;
  }
});

// node_modules/@wasmer/wasi/lib/polyfills/buffer.js
var require_buffer3 = __commonJS({
  "node_modules/@wasmer/wasi/lib/polyfills/buffer.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isomorphicBuffer = import_buffer.Buffer;
    exports.default = isomorphicBuffer;
  }
});

// node_modules/@wasmer/wasi/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@wasmer/wasi/lib/index.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var bigint_1 = require_bigint();
    var dataview_1 = require_dataview();
    var buffer_1 = require_buffer3();
    var defaultBindings;
    var constants_1 = require_constants();
    var STDIN_DEFAULT_RIGHTS = constants_1.WASI_RIGHT_FD_DATASYNC | constants_1.WASI_RIGHT_FD_READ | constants_1.WASI_RIGHT_FD_SYNC | constants_1.WASI_RIGHT_FD_ADVISE | constants_1.WASI_RIGHT_FD_FILESTAT_GET | constants_1.WASI_RIGHT_POLL_FD_READWRITE;
    var STDOUT_DEFAULT_RIGHTS = constants_1.WASI_RIGHT_FD_DATASYNC | constants_1.WASI_RIGHT_FD_WRITE | constants_1.WASI_RIGHT_FD_SYNC | constants_1.WASI_RIGHT_FD_ADVISE | constants_1.WASI_RIGHT_FD_FILESTAT_GET | constants_1.WASI_RIGHT_POLL_FD_READWRITE;
    var STDERR_DEFAULT_RIGHTS = STDOUT_DEFAULT_RIGHTS;
    var msToNs = (ms) => {
      const msInt = Math.trunc(ms);
      const decimal = bigint_1.BigIntPolyfill(Math.round((ms - msInt) * 1e6));
      const ns = bigint_1.BigIntPolyfill(msInt) * bigint_1.BigIntPolyfill(1e6);
      return ns + decimal;
    };
    var nsToMs = (ns) => {
      if (typeof ns === "number") {
        ns = Math.trunc(ns);
      }
      const nsInt = bigint_1.BigIntPolyfill(ns);
      return Number(nsInt / bigint_1.BigIntPolyfill(1e6));
    };
    var wrap = (f) => (...args) => {
      try {
        return f(...args);
      } catch (e) {
        if (e && e.code && typeof e.code === "string") {
          return constants_1.ERROR_MAP[e.code] || constants_1.WASI_EINVAL;
        }
        if (e instanceof WASIError) {
          return e.errno;
        }
        throw e;
      }
    };
    var stat = (wasi, fd2) => {
      const entry = wasi.FD_MAP.get(fd2);
      if (!entry) {
        throw new WASIError(constants_1.WASI_EBADF);
      }
      if (entry.filetype === void 0) {
        const stats = wasi.bindings.fs.fstatSync(entry.real);
        const { filetype, rightsBase, rightsInheriting } = translateFileAttributes(wasi, fd2, stats);
        entry.filetype = filetype;
        if (!entry.rights) {
          entry.rights = {
            base: rightsBase,
            inheriting: rightsInheriting
          };
        }
      }
      return entry;
    };
    var translateFileAttributes = (wasi, fd2, stats) => {
      switch (true) {
        case stats.isBlockDevice():
          return {
            filetype: constants_1.WASI_FILETYPE_BLOCK_DEVICE,
            rightsBase: constants_1.RIGHTS_BLOCK_DEVICE_BASE,
            rightsInheriting: constants_1.RIGHTS_BLOCK_DEVICE_INHERITING
          };
        case stats.isCharacterDevice(): {
          const filetype = constants_1.WASI_FILETYPE_CHARACTER_DEVICE;
          if (fd2 !== void 0 && wasi.bindings.isTTY(fd2)) {
            return {
              filetype,
              rightsBase: constants_1.RIGHTS_TTY_BASE,
              rightsInheriting: constants_1.RIGHTS_TTY_INHERITING
            };
          }
          return {
            filetype,
            rightsBase: constants_1.RIGHTS_CHARACTER_DEVICE_BASE,
            rightsInheriting: constants_1.RIGHTS_CHARACTER_DEVICE_INHERITING
          };
        }
        case stats.isDirectory():
          return {
            filetype: constants_1.WASI_FILETYPE_DIRECTORY,
            rightsBase: constants_1.RIGHTS_DIRECTORY_BASE,
            rightsInheriting: constants_1.RIGHTS_DIRECTORY_INHERITING
          };
        case stats.isFIFO():
          return {
            filetype: constants_1.WASI_FILETYPE_SOCKET_STREAM,
            rightsBase: constants_1.RIGHTS_SOCKET_BASE,
            rightsInheriting: constants_1.RIGHTS_SOCKET_INHERITING
          };
        case stats.isFile():
          return {
            filetype: constants_1.WASI_FILETYPE_REGULAR_FILE,
            rightsBase: constants_1.RIGHTS_REGULAR_FILE_BASE,
            rightsInheriting: constants_1.RIGHTS_REGULAR_FILE_INHERITING
          };
        case stats.isSocket():
          return {
            filetype: constants_1.WASI_FILETYPE_SOCKET_STREAM,
            rightsBase: constants_1.RIGHTS_SOCKET_BASE,
            rightsInheriting: constants_1.RIGHTS_SOCKET_INHERITING
          };
        case stats.isSymbolicLink():
          return {
            filetype: constants_1.WASI_FILETYPE_SYMBOLIC_LINK,
            rightsBase: bigint_1.BigIntPolyfill(0),
            rightsInheriting: bigint_1.BigIntPolyfill(0)
          };
        default:
          return {
            filetype: constants_1.WASI_FILETYPE_UNKNOWN,
            rightsBase: bigint_1.BigIntPolyfill(0),
            rightsInheriting: bigint_1.BigIntPolyfill(0)
          };
      }
    };
    var WASIError = class extends Error {
      constructor(errno) {
        super();
        this.errno = errno;
        Object.setPrototypeOf(this, WASIError.prototype);
      }
    };
    exports.WASIError = WASIError;
    var WASIExitError2 = class extends Error {
      constructor(code) {
        super(`WASI Exit error: ${code}`);
        this.code = code;
        Object.setPrototypeOf(this, WASIExitError2.prototype);
      }
    };
    exports.WASIExitError = WASIExitError2;
    var WASIKillError = class extends Error {
      constructor(signal) {
        super(`WASI Kill signal: ${signal}`);
        this.signal = signal;
        Object.setPrototypeOf(this, WASIKillError.prototype);
      }
    };
    exports.WASIKillError = WASIKillError;
    var WASIDefault = class {
      constructor(wasiConfig) {
        let preopens = {};
        if (wasiConfig && wasiConfig.preopens) {
          preopens = wasiConfig.preopens;
        } else if (wasiConfig && wasiConfig.preopenDirectories) {
          preopens = wasiConfig.preopenDirectories;
        }
        let env2 = {};
        if (wasiConfig && wasiConfig.env) {
          env2 = wasiConfig.env;
        }
        let args = [];
        if (wasiConfig && wasiConfig.args) {
          args = wasiConfig.args;
        }
        let bindings = defaultBindings;
        if (wasiConfig && wasiConfig.bindings) {
          bindings = wasiConfig.bindings;
        }
        this.memory = void 0;
        this.view = void 0;
        this.bindings = bindings;
        this.FD_MAP = /* @__PURE__ */ new Map([
          [
            constants_1.WASI_STDIN_FILENO,
            {
              real: 0,
              filetype: constants_1.WASI_FILETYPE_CHARACTER_DEVICE,
              // offset: BigInt(0),
              rights: {
                base: STDIN_DEFAULT_RIGHTS,
                inheriting: bigint_1.BigIntPolyfill(0)
              },
              path: void 0
            }
          ],
          [
            constants_1.WASI_STDOUT_FILENO,
            {
              real: 1,
              filetype: constants_1.WASI_FILETYPE_CHARACTER_DEVICE,
              // offset: BigInt(0),
              rights: {
                base: STDOUT_DEFAULT_RIGHTS,
                inheriting: bigint_1.BigIntPolyfill(0)
              },
              path: void 0
            }
          ],
          [
            constants_1.WASI_STDERR_FILENO,
            {
              real: 2,
              filetype: constants_1.WASI_FILETYPE_CHARACTER_DEVICE,
              // offset: BigInt(0),
              rights: {
                base: STDERR_DEFAULT_RIGHTS,
                inheriting: bigint_1.BigIntPolyfill(0)
              },
              path: void 0
            }
          ]
        ]);
        let fs2 = this.bindings.fs;
        let path2 = this.bindings.path;
        for (const [k, v] of Object.entries(preopens)) {
          const real = fs2.openSync(v, fs2.constants.O_RDONLY);
          const newfd = [...this.FD_MAP.keys()].reverse()[0] + 1;
          this.FD_MAP.set(newfd, {
            real,
            filetype: constants_1.WASI_FILETYPE_DIRECTORY,
            // offset: BigInt(0),
            rights: {
              base: constants_1.RIGHTS_DIRECTORY_BASE,
              inheriting: constants_1.RIGHTS_DIRECTORY_INHERITING
            },
            fakePath: k,
            path: v
          });
        }
        const getiovs = (iovs, iovsLen) => {
          this.refreshMemory();
          const buffers = Array.from({ length: iovsLen }, (_, i) => {
            const ptr = iovs + i * 8;
            const buf = this.view.getUint32(ptr, true);
            const bufLen = this.view.getUint32(ptr + 4, true);
            return new Uint8Array(this.memory.buffer, buf, bufLen);
          });
          return buffers;
        };
        const CHECK_FD = (fd2, rights) => {
          const stats = stat(this, fd2);
          if (rights !== bigint_1.BigIntPolyfill(0) && (stats.rights.base & rights) === bigint_1.BigIntPolyfill(0)) {
            throw new WASIError(constants_1.WASI_EPERM);
          }
          return stats;
        };
        const CPUTIME_START = bindings.hrtime();
        const now = (clockId) => {
          switch (clockId) {
            case constants_1.WASI_CLOCK_MONOTONIC:
              return bindings.hrtime();
            case constants_1.WASI_CLOCK_REALTIME:
              return msToNs(Date.now());
            case constants_1.WASI_CLOCK_PROCESS_CPUTIME_ID:
            case constants_1.WASI_CLOCK_THREAD_CPUTIME_ID:
              return bindings.hrtime() - CPUTIME_START;
            default:
              return null;
          }
        };
        this.wasiImport = {
          args_get: (argv, argvBuf) => {
            this.refreshMemory();
            let coffset = argv;
            let offset = argvBuf;
            args.forEach((a) => {
              this.view.setUint32(coffset, offset, true);
              coffset += 4;
              offset += buffer_1.default.from(this.memory.buffer).write(`${a}\0`, offset);
            });
            return constants_1.WASI_ESUCCESS;
          },
          args_sizes_get: (argc, argvBufSize) => {
            this.refreshMemory();
            this.view.setUint32(argc, args.length, true);
            const size = args.reduce((acc, a) => acc + buffer_1.default.byteLength(a) + 1, 0);
            this.view.setUint32(argvBufSize, size, true);
            return constants_1.WASI_ESUCCESS;
          },
          environ_get: (environ, environBuf) => {
            this.refreshMemory();
            let coffset = environ;
            let offset = environBuf;
            Object.entries(env2).forEach(([key, value]) => {
              this.view.setUint32(coffset, offset, true);
              coffset += 4;
              offset += buffer_1.default.from(this.memory.buffer).write(`${key}=${value}\0`, offset);
            });
            return constants_1.WASI_ESUCCESS;
          },
          environ_sizes_get: (environCount, environBufSize) => {
            this.refreshMemory();
            const envProcessed = Object.entries(env2).map(([key, value]) => `${key}=${value}\0`);
            const size = envProcessed.reduce((acc, e) => acc + buffer_1.default.byteLength(e), 0);
            this.view.setUint32(environCount, envProcessed.length, true);
            this.view.setUint32(environBufSize, size, true);
            return constants_1.WASI_ESUCCESS;
          },
          clock_res_get: (clockId, resolution) => {
            let res;
            switch (clockId) {
              case constants_1.WASI_CLOCK_MONOTONIC:
              case constants_1.WASI_CLOCK_PROCESS_CPUTIME_ID:
              case constants_1.WASI_CLOCK_THREAD_CPUTIME_ID: {
                res = bigint_1.BigIntPolyfill(1);
                break;
              }
              case constants_1.WASI_CLOCK_REALTIME: {
                res = bigint_1.BigIntPolyfill(1e3);
                break;
              }
            }
            this.view.setBigUint64(resolution, res);
            return constants_1.WASI_ESUCCESS;
          },
          clock_time_get: (clockId, precision, time) => {
            this.refreshMemory();
            const n = now(clockId);
            if (n === null) {
              return constants_1.WASI_EINVAL;
            }
            this.view.setBigUint64(time, bigint_1.BigIntPolyfill(n), true);
            return constants_1.WASI_ESUCCESS;
          },
          fd_advise: wrap((fd2, offset, len, advice) => {
            CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_ADVISE);
            return constants_1.WASI_ENOSYS;
          }),
          fd_allocate: wrap((fd2, offset, len) => {
            CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_ALLOCATE);
            return constants_1.WASI_ENOSYS;
          }),
          fd_close: wrap((fd2) => {
            const stats = CHECK_FD(fd2, bigint_1.BigIntPolyfill(0));
            fs2.closeSync(stats.real);
            this.FD_MAP.delete(fd2);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_datasync: wrap((fd2) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_DATASYNC);
            fs2.fdatasyncSync(stats.real);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_fdstat_get: wrap((fd2, bufPtr) => {
            const stats = CHECK_FD(fd2, bigint_1.BigIntPolyfill(0));
            this.refreshMemory();
            this.view.setUint8(bufPtr, stats.filetype);
            this.view.setUint16(bufPtr + 2, 0, true);
            this.view.setUint16(bufPtr + 4, 0, true);
            this.view.setBigUint64(bufPtr + 8, bigint_1.BigIntPolyfill(stats.rights.base), true);
            this.view.setBigUint64(bufPtr + 8 + 8, bigint_1.BigIntPolyfill(stats.rights.inheriting), true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_fdstat_set_flags: wrap((fd2, flags) => {
            CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_FDSTAT_SET_FLAGS);
            return constants_1.WASI_ENOSYS;
          }),
          fd_fdstat_set_rights: wrap((fd2, fsRightsBase, fsRightsInheriting) => {
            const stats = CHECK_FD(fd2, bigint_1.BigIntPolyfill(0));
            const nrb = stats.rights.base | fsRightsBase;
            if (nrb > stats.rights.base) {
              return constants_1.WASI_EPERM;
            }
            const nri = stats.rights.inheriting | fsRightsInheriting;
            if (nri > stats.rights.inheriting) {
              return constants_1.WASI_EPERM;
            }
            stats.rights.base = fsRightsBase;
            stats.rights.inheriting = fsRightsInheriting;
            return constants_1.WASI_ESUCCESS;
          }),
          fd_filestat_get: wrap((fd2, bufPtr) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_FILESTAT_GET);
            const rstats = fs2.fstatSync(stats.real);
            this.refreshMemory();
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.dev), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.ino), true);
            bufPtr += 8;
            this.view.setUint8(bufPtr, stats.filetype);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.nlink), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.size), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, msToNs(rstats.atimeMs), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, msToNs(rstats.mtimeMs), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, msToNs(rstats.ctimeMs), true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_filestat_set_size: wrap((fd2, stSize) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_FILESTAT_SET_SIZE);
            fs2.ftruncateSync(stats.real, Number(stSize));
            return constants_1.WASI_ESUCCESS;
          }),
          fd_filestat_set_times: wrap((fd2, stAtim, stMtim, fstflags) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_FILESTAT_SET_TIMES);
            const rstats = fs2.fstatSync(stats.real);
            let atim = rstats.atime;
            let mtim = rstats.mtime;
            const n = nsToMs(now(constants_1.WASI_CLOCK_REALTIME));
            const atimflags = constants_1.WASI_FILESTAT_SET_ATIM | constants_1.WASI_FILESTAT_SET_ATIM_NOW;
            if ((fstflags & atimflags) === atimflags) {
              return constants_1.WASI_EINVAL;
            }
            const mtimflags = constants_1.WASI_FILESTAT_SET_MTIM | constants_1.WASI_FILESTAT_SET_MTIM_NOW;
            if ((fstflags & mtimflags) === mtimflags) {
              return constants_1.WASI_EINVAL;
            }
            if ((fstflags & constants_1.WASI_FILESTAT_SET_ATIM) === constants_1.WASI_FILESTAT_SET_ATIM) {
              atim = nsToMs(stAtim);
            } else if ((fstflags & constants_1.WASI_FILESTAT_SET_ATIM_NOW) === constants_1.WASI_FILESTAT_SET_ATIM_NOW) {
              atim = n;
            }
            if ((fstflags & constants_1.WASI_FILESTAT_SET_MTIM) === constants_1.WASI_FILESTAT_SET_MTIM) {
              mtim = nsToMs(stMtim);
            } else if ((fstflags & constants_1.WASI_FILESTAT_SET_MTIM_NOW) === constants_1.WASI_FILESTAT_SET_MTIM_NOW) {
              mtim = n;
            }
            fs2.futimesSync(stats.real, new Date(atim), new Date(mtim));
            return constants_1.WASI_ESUCCESS;
          }),
          fd_prestat_get: wrap((fd2, bufPtr) => {
            const stats = CHECK_FD(fd2, bigint_1.BigIntPolyfill(0));
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            this.view.setUint8(bufPtr, constants_1.WASI_PREOPENTYPE_DIR);
            this.view.setUint32(bufPtr + 4, buffer_1.default.byteLength(stats.fakePath), true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_prestat_dir_name: wrap((fd2, pathPtr, pathLen) => {
            const stats = CHECK_FD(fd2, bigint_1.BigIntPolyfill(0));
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            buffer_1.default.from(this.memory.buffer).write(stats.fakePath, pathPtr, pathLen, "utf8");
            return constants_1.WASI_ESUCCESS;
          }),
          fd_pwrite: wrap((fd2, iovs, iovsLen, offset, nwritten) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_WRITE | constants_1.WASI_RIGHT_FD_SEEK);
            let written = 0;
            getiovs(iovs, iovsLen).forEach((iov) => {
              let w = 0;
              while (w < iov.byteLength) {
                w += fs2.writeSync(stats.real, iov, w, iov.byteLength - w, Number(offset) + written + w);
              }
              written += w;
            });
            this.view.setUint32(nwritten, written, true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_write: wrap((fd2, iovs, iovsLen, nwritten) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_WRITE);
            let written = 0;
            getiovs(iovs, iovsLen).forEach((iov) => {
              let w = 0;
              while (w < iov.byteLength) {
                const i = fs2.writeSync(stats.real, iov, w, iov.byteLength - w, stats.offset ? Number(stats.offset) : null);
                if (stats.offset)
                  stats.offset += bigint_1.BigIntPolyfill(i);
                w += i;
              }
              written += w;
            });
            this.view.setUint32(nwritten, written, true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_pread: wrap((fd2, iovs, iovsLen, offset, nread) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_READ | constants_1.WASI_RIGHT_FD_SEEK);
            let read = 0;
            outer:
              for (const iov of getiovs(iovs, iovsLen)) {
                let r = 0;
                while (r < iov.byteLength) {
                  const length = iov.byteLength - r;
                  const rr = fs2.readSync(stats.real, iov, r, iov.byteLength - r, Number(offset) + read + r);
                  r += rr;
                  read += rr;
                  if (rr === 0 || rr < length) {
                    break outer;
                  }
                }
                read += r;
              }
            ;
            this.view.setUint32(nread, read, true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_read: wrap((fd2, iovs, iovsLen, nread) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_READ);
            const IS_STDIN = stats.real === 0;
            let read = 0;
            outer:
              for (const iov of getiovs(iovs, iovsLen)) {
                let r = 0;
                while (r < iov.byteLength) {
                  let length = iov.byteLength - r;
                  let position = IS_STDIN || stats.offset === void 0 ? null : Number(stats.offset);
                  let rr = fs2.readSync(
                    stats.real,
                    // fd
                    iov,
                    // buffer
                    r,
                    // offset
                    length,
                    // length
                    position
                    // position
                  );
                  if (!IS_STDIN) {
                    stats.offset = (stats.offset ? stats.offset : bigint_1.BigIntPolyfill(0)) + bigint_1.BigIntPolyfill(rr);
                  }
                  r += rr;
                  read += rr;
                  if (rr === 0 || rr < length) {
                    break outer;
                  }
                }
              }
            this.view.setUint32(nread, read, true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_readdir: wrap((fd2, bufPtr, bufLen, cookie, bufusedPtr) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_READDIR);
            this.refreshMemory();
            const entries = fs2.readdirSync(stats.path, { withFileTypes: true });
            const startPtr = bufPtr;
            for (let i = Number(cookie); i < entries.length; i += 1) {
              const entry = entries[i];
              let nameLength = buffer_1.default.byteLength(entry.name);
              if (bufPtr - startPtr > bufLen) {
                break;
              }
              this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(i + 1), true);
              bufPtr += 8;
              if (bufPtr - startPtr > bufLen) {
                break;
              }
              const rstats = fs2.statSync(path2.resolve(stats.path, entry.name));
              this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.ino), true);
              bufPtr += 8;
              if (bufPtr - startPtr > bufLen) {
                break;
              }
              this.view.setUint32(bufPtr, nameLength, true);
              bufPtr += 4;
              if (bufPtr - startPtr > bufLen) {
                break;
              }
              let filetype;
              switch (true) {
                case rstats.isBlockDevice():
                  filetype = constants_1.WASI_FILETYPE_BLOCK_DEVICE;
                  break;
                case rstats.isCharacterDevice():
                  filetype = constants_1.WASI_FILETYPE_CHARACTER_DEVICE;
                  break;
                case rstats.isDirectory():
                  filetype = constants_1.WASI_FILETYPE_DIRECTORY;
                  break;
                case rstats.isFIFO():
                  filetype = constants_1.WASI_FILETYPE_SOCKET_STREAM;
                  break;
                case rstats.isFile():
                  filetype = constants_1.WASI_FILETYPE_REGULAR_FILE;
                  break;
                case rstats.isSocket():
                  filetype = constants_1.WASI_FILETYPE_SOCKET_STREAM;
                  break;
                case rstats.isSymbolicLink():
                  filetype = constants_1.WASI_FILETYPE_SYMBOLIC_LINK;
                  break;
                default:
                  filetype = constants_1.WASI_FILETYPE_UNKNOWN;
                  break;
              }
              this.view.setUint8(bufPtr, filetype);
              bufPtr += 1;
              bufPtr += 3;
              if (bufPtr + nameLength >= startPtr + bufLen) {
                break;
              }
              let memory_buffer = buffer_1.default.from(this.memory.buffer);
              memory_buffer.write(entry.name, bufPtr);
              bufPtr += nameLength;
            }
            const bufused = bufPtr - startPtr;
            this.view.setUint32(bufusedPtr, Math.min(bufused, bufLen), true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_renumber: wrap((from, to) => {
            CHECK_FD(from, bigint_1.BigIntPolyfill(0));
            CHECK_FD(to, bigint_1.BigIntPolyfill(0));
            fs2.closeSync(this.FD_MAP.get(from).real);
            this.FD_MAP.set(from, this.FD_MAP.get(to));
            this.FD_MAP.delete(to);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_seek: wrap((fd2, offset, whence, newOffsetPtr) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_SEEK);
            this.refreshMemory();
            switch (whence) {
              case constants_1.WASI_WHENCE_CUR:
                stats.offset = (stats.offset ? stats.offset : bigint_1.BigIntPolyfill(0)) + bigint_1.BigIntPolyfill(offset);
                break;
              case constants_1.WASI_WHENCE_END:
                const { size } = fs2.fstatSync(stats.real);
                stats.offset = bigint_1.BigIntPolyfill(size) + bigint_1.BigIntPolyfill(offset);
                break;
              case constants_1.WASI_WHENCE_SET:
                stats.offset = bigint_1.BigIntPolyfill(offset);
                break;
            }
            this.view.setBigUint64(newOffsetPtr, stats.offset, true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_tell: wrap((fd2, offsetPtr) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_TELL);
            this.refreshMemory();
            if (!stats.offset) {
              stats.offset = bigint_1.BigIntPolyfill(0);
            }
            this.view.setBigUint64(offsetPtr, stats.offset, true);
            return constants_1.WASI_ESUCCESS;
          }),
          fd_sync: wrap((fd2) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_FD_SYNC);
            fs2.fsyncSync(stats.real);
            return constants_1.WASI_ESUCCESS;
          }),
          path_create_directory: wrap((fd2, pathPtr, pathLen) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_CREATE_DIRECTORY);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            fs2.mkdirSync(path2.resolve(stats.path, p));
            return constants_1.WASI_ESUCCESS;
          }),
          path_filestat_get: wrap((fd2, flags, pathPtr, pathLen, bufPtr) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_FILESTAT_GET);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            const rstats = fs2.statSync(path2.resolve(stats.path, p));
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.dev), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.ino), true);
            bufPtr += 8;
            this.view.setUint8(bufPtr, translateFileAttributes(this, void 0, rstats).filetype);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.nlink), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, bigint_1.BigIntPolyfill(rstats.size), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, msToNs(rstats.atimeMs), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, msToNs(rstats.mtimeMs), true);
            bufPtr += 8;
            this.view.setBigUint64(bufPtr, msToNs(rstats.ctimeMs), true);
            return constants_1.WASI_ESUCCESS;
          }),
          path_filestat_set_times: wrap((fd2, dirflags, pathPtr, pathLen, stAtim, stMtim, fstflags) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_FILESTAT_SET_TIMES);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const rstats = fs2.fstatSync(stats.real);
            let atim = rstats.atime;
            let mtim = rstats.mtime;
            const n = nsToMs(now(constants_1.WASI_CLOCK_REALTIME));
            const atimflags = constants_1.WASI_FILESTAT_SET_ATIM | constants_1.WASI_FILESTAT_SET_ATIM_NOW;
            if ((fstflags & atimflags) === atimflags) {
              return constants_1.WASI_EINVAL;
            }
            const mtimflags = constants_1.WASI_FILESTAT_SET_MTIM | constants_1.WASI_FILESTAT_SET_MTIM_NOW;
            if ((fstflags & mtimflags) === mtimflags) {
              return constants_1.WASI_EINVAL;
            }
            if ((fstflags & constants_1.WASI_FILESTAT_SET_ATIM) === constants_1.WASI_FILESTAT_SET_ATIM) {
              atim = nsToMs(stAtim);
            } else if ((fstflags & constants_1.WASI_FILESTAT_SET_ATIM_NOW) === constants_1.WASI_FILESTAT_SET_ATIM_NOW) {
              atim = n;
            }
            if ((fstflags & constants_1.WASI_FILESTAT_SET_MTIM) === constants_1.WASI_FILESTAT_SET_MTIM) {
              mtim = nsToMs(stMtim);
            } else if ((fstflags & constants_1.WASI_FILESTAT_SET_MTIM_NOW) === constants_1.WASI_FILESTAT_SET_MTIM_NOW) {
              mtim = n;
            }
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            fs2.utimesSync(path2.resolve(stats.path, p), new Date(atim), new Date(mtim));
            return constants_1.WASI_ESUCCESS;
          }),
          path_link: wrap((oldFd, oldFlags, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
            const ostats = CHECK_FD(oldFd, constants_1.WASI_RIGHT_PATH_LINK_SOURCE);
            const nstats = CHECK_FD(newFd, constants_1.WASI_RIGHT_PATH_LINK_TARGET);
            if (!ostats.path || !nstats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const op = buffer_1.default.from(this.memory.buffer, oldPath, oldPathLen).toString();
            const np = buffer_1.default.from(this.memory.buffer, newPath, newPathLen).toString();
            fs2.linkSync(path2.resolve(ostats.path, op), path2.resolve(nstats.path, np));
            return constants_1.WASI_ESUCCESS;
          }),
          path_open: wrap((dirfd, dirflags, pathPtr, pathLen, oflags, fsRightsBase, fsRightsInheriting, fsFlags, fd2) => {
            const stats = CHECK_FD(dirfd, constants_1.WASI_RIGHT_PATH_OPEN);
            fsRightsBase = bigint_1.BigIntPolyfill(fsRightsBase);
            fsRightsInheriting = bigint_1.BigIntPolyfill(fsRightsInheriting);
            const read = (fsRightsBase & (constants_1.WASI_RIGHT_FD_READ | constants_1.WASI_RIGHT_FD_READDIR)) !== bigint_1.BigIntPolyfill(0);
            const write = (fsRightsBase & (constants_1.WASI_RIGHT_FD_DATASYNC | constants_1.WASI_RIGHT_FD_WRITE | constants_1.WASI_RIGHT_FD_ALLOCATE | constants_1.WASI_RIGHT_FD_FILESTAT_SET_SIZE)) !== bigint_1.BigIntPolyfill(0);
            let noflags;
            if (write && read) {
              noflags = fs2.constants.O_RDWR;
            } else if (read) {
              noflags = fs2.constants.O_RDONLY;
            } else if (write) {
              noflags = fs2.constants.O_WRONLY;
            }
            let neededBase = fsRightsBase | constants_1.WASI_RIGHT_PATH_OPEN;
            let neededInheriting = fsRightsBase | fsRightsInheriting;
            if ((oflags & constants_1.WASI_O_CREAT) !== 0) {
              noflags |= fs2.constants.O_CREAT;
              neededBase |= constants_1.WASI_RIGHT_PATH_CREATE_FILE;
            }
            if ((oflags & constants_1.WASI_O_DIRECTORY) !== 0) {
              noflags |= fs2.constants.O_DIRECTORY;
            }
            if ((oflags & constants_1.WASI_O_EXCL) !== 0) {
              noflags |= fs2.constants.O_EXCL;
            }
            if ((oflags & constants_1.WASI_O_TRUNC) !== 0) {
              noflags |= fs2.constants.O_TRUNC;
              neededBase |= constants_1.WASI_RIGHT_PATH_FILESTAT_SET_SIZE;
            }
            if ((fsFlags & constants_1.WASI_FDFLAG_APPEND) !== 0) {
              noflags |= fs2.constants.O_APPEND;
            }
            if ((fsFlags & constants_1.WASI_FDFLAG_DSYNC) !== 0) {
              if (fs2.constants.O_DSYNC) {
                noflags |= fs2.constants.O_DSYNC;
              } else {
                noflags |= fs2.constants.O_SYNC;
              }
              neededInheriting |= constants_1.WASI_RIGHT_FD_DATASYNC;
            }
            if ((fsFlags & constants_1.WASI_FDFLAG_NONBLOCK) !== 0) {
              noflags |= fs2.constants.O_NONBLOCK;
            }
            if ((fsFlags & constants_1.WASI_FDFLAG_RSYNC) !== 0) {
              if (fs2.constants.O_RSYNC) {
                noflags |= fs2.constants.O_RSYNC;
              } else {
                noflags |= fs2.constants.O_SYNC;
              }
              neededInheriting |= constants_1.WASI_RIGHT_FD_SYNC;
            }
            if ((fsFlags & constants_1.WASI_FDFLAG_SYNC) !== 0) {
              noflags |= fs2.constants.O_SYNC;
              neededInheriting |= constants_1.WASI_RIGHT_FD_SYNC;
            }
            if (write && (noflags & (fs2.constants.O_APPEND | fs2.constants.O_TRUNC)) === 0) {
              neededInheriting |= constants_1.WASI_RIGHT_FD_SEEK;
            }
            this.refreshMemory();
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            const fullUnresolved = path2.resolve(stats.path, p);
            if (path2.relative(stats.path, fullUnresolved).startsWith("..")) {
              return constants_1.WASI_ENOTCAPABLE;
            }
            let full;
            try {
              full = fs2.realpathSync(fullUnresolved);
              if (path2.relative(stats.path, full).startsWith("..")) {
                return constants_1.WASI_ENOTCAPABLE;
              }
            } catch (e) {
              if (e.code === "ENOENT") {
                full = fullUnresolved;
              } else {
                throw e;
              }
            }
            let isDirectory;
            try {
              isDirectory = fs2.statSync(full).isDirectory();
            } catch (e) {
            }
            let realfd;
            if (!write && isDirectory) {
              realfd = fs2.openSync(full, fs2.constants.O_RDONLY);
            } else {
              realfd = fs2.openSync(full, noflags);
            }
            const newfd = [...this.FD_MAP.keys()].reverse()[0] + 1;
            this.FD_MAP.set(newfd, {
              real: realfd,
              filetype: void 0,
              // offset: BigInt(0),
              rights: {
                base: neededBase,
                inheriting: neededInheriting
              },
              path: full
            });
            stat(this, newfd);
            this.view.setUint32(fd2, newfd, true);
            return constants_1.WASI_ESUCCESS;
          }),
          path_readlink: wrap((fd2, pathPtr, pathLen, buf, bufLen, bufused) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_READLINK);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            const full = path2.resolve(stats.path, p);
            const r = fs2.readlinkSync(full);
            const used = buffer_1.default.from(this.memory.buffer).write(r, buf, bufLen);
            this.view.setUint32(bufused, used, true);
            return constants_1.WASI_ESUCCESS;
          }),
          path_remove_directory: wrap((fd2, pathPtr, pathLen) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_REMOVE_DIRECTORY);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            fs2.rmdirSync(path2.resolve(stats.path, p));
            return constants_1.WASI_ESUCCESS;
          }),
          path_rename: wrap((oldFd, oldPath, oldPathLen, newFd, newPath, newPathLen) => {
            const ostats = CHECK_FD(oldFd, constants_1.WASI_RIGHT_PATH_RENAME_SOURCE);
            const nstats = CHECK_FD(newFd, constants_1.WASI_RIGHT_PATH_RENAME_TARGET);
            if (!ostats.path || !nstats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const op = buffer_1.default.from(this.memory.buffer, oldPath, oldPathLen).toString();
            const np = buffer_1.default.from(this.memory.buffer, newPath, newPathLen).toString();
            fs2.renameSync(path2.resolve(ostats.path, op), path2.resolve(nstats.path, np));
            return constants_1.WASI_ESUCCESS;
          }),
          path_symlink: wrap((oldPath, oldPathLen, fd2, newPath, newPathLen) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_SYMLINK);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const op = buffer_1.default.from(this.memory.buffer, oldPath, oldPathLen).toString();
            const np = buffer_1.default.from(this.memory.buffer, newPath, newPathLen).toString();
            fs2.symlinkSync(op, path2.resolve(stats.path, np));
            return constants_1.WASI_ESUCCESS;
          }),
          path_unlink_file: wrap((fd2, pathPtr, pathLen) => {
            const stats = CHECK_FD(fd2, constants_1.WASI_RIGHT_PATH_UNLINK_FILE);
            if (!stats.path) {
              return constants_1.WASI_EINVAL;
            }
            this.refreshMemory();
            const p = buffer_1.default.from(this.memory.buffer, pathPtr, pathLen).toString();
            fs2.unlinkSync(path2.resolve(stats.path, p));
            return constants_1.WASI_ESUCCESS;
          }),
          poll_oneoff: (sin, sout, nsubscriptions, nevents) => {
            let eventc = 0;
            let waitEnd = 0;
            this.refreshMemory();
            for (let i = 0; i < nsubscriptions; i += 1) {
              const userdata = this.view.getBigUint64(sin, true);
              sin += 8;
              const type = this.view.getUint8(sin);
              sin += 1;
              switch (type) {
                case constants_1.WASI_EVENTTYPE_CLOCK: {
                  sin += 7;
                  const identifier = this.view.getBigUint64(sin, true);
                  sin += 8;
                  const clockid = this.view.getUint32(sin, true);
                  sin += 4;
                  sin += 4;
                  const timestamp = this.view.getBigUint64(sin, true);
                  sin += 8;
                  const precision = this.view.getBigUint64(sin, true);
                  sin += 8;
                  const subclockflags = this.view.getUint16(sin, true);
                  sin += 2;
                  sin += 6;
                  const absolute = subclockflags === 1;
                  let e = constants_1.WASI_ESUCCESS;
                  const n = bigint_1.BigIntPolyfill(now(clockid));
                  if (n === null) {
                    e = constants_1.WASI_EINVAL;
                  } else {
                    const end = absolute ? timestamp : n + timestamp;
                    waitEnd = end > waitEnd ? end : waitEnd;
                  }
                  this.view.setBigUint64(sout, userdata, true);
                  sout += 8;
                  this.view.setUint16(sout, e, true);
                  sout += 2;
                  this.view.setUint8(sout, constants_1.WASI_EVENTTYPE_CLOCK);
                  sout += 1;
                  sout += 5;
                  eventc += 1;
                  break;
                }
                case constants_1.WASI_EVENTTYPE_FD_READ:
                case constants_1.WASI_EVENTTYPE_FD_WRITE: {
                  sin += 3;
                  const fd2 = this.view.getUint32(sin, true);
                  sin += 4;
                  this.view.setBigUint64(sout, userdata, true);
                  sout += 8;
                  this.view.setUint16(sout, constants_1.WASI_ENOSYS, true);
                  sout += 2;
                  this.view.setUint8(sout, type);
                  sout += 1;
                  sout += 5;
                  eventc += 1;
                  break;
                }
                default:
                  return constants_1.WASI_EINVAL;
              }
            }
            this.view.setUint32(nevents, eventc, true);
            while (bindings.hrtime() < waitEnd) {
            }
            return constants_1.WASI_ESUCCESS;
          },
          proc_exit: (rval) => {
            bindings.exit(rval);
            return constants_1.WASI_ESUCCESS;
          },
          proc_raise: (sig) => {
            if (!(sig in constants_1.SIGNAL_MAP)) {
              return constants_1.WASI_EINVAL;
            }
            bindings.kill(constants_1.SIGNAL_MAP[sig]);
            return constants_1.WASI_ESUCCESS;
          },
          random_get: (bufPtr, bufLen) => {
            this.refreshMemory();
            bindings.randomFillSync(new Uint8Array(this.memory.buffer), bufPtr, bufLen);
            return constants_1.WASI_ESUCCESS;
          },
          sched_yield() {
            return constants_1.WASI_ESUCCESS;
          },
          sock_recv() {
            return constants_1.WASI_ENOSYS;
          },
          sock_send() {
            return constants_1.WASI_ENOSYS;
          },
          sock_shutdown() {
            return constants_1.WASI_ENOSYS;
          }
        };
        if (wasiConfig.traceSyscalls) {
          Object.keys(this.wasiImport).forEach((key) => {
            const prevImport = this.wasiImport[key];
            this.wasiImport[key] = function(...args2) {
              console.log(`WASI: wasiImport called: ${key} (${args2})`);
              try {
                let result = prevImport(...args2);
                console.log(`WASI:  => ${result}`);
                return result;
              } catch (e) {
                console.log(`Catched error: ${e}`);
                throw e;
              }
            };
          });
        }
      }
      refreshMemory() {
        if (!this.view || this.view.buffer.byteLength === 0) {
          this.view = new dataview_1.DataViewPolyfill(this.memory.buffer);
        }
      }
      setMemory(memory) {
        this.memory = memory;
      }
      start(instance) {
        const exports2 = instance.exports;
        if (exports2 === null || typeof exports2 !== "object") {
          throw new Error(`instance.exports must be an Object. Received ${exports2}.`);
        }
        const { memory } = exports2;
        if (!(memory instanceof WebAssembly.Memory)) {
          throw new Error(`instance.exports.memory must be a WebAssembly.Memory. Recceived ${memory}.`);
        }
        this.setMemory(memory);
        if (exports2._start) {
          exports2._start();
        }
      }
      getImportNamespace(module2) {
        let namespace = null;
        for (let imp of WebAssembly.Module.imports(module2)) {
          if (imp.kind !== "function") {
            continue;
          }
          if (!imp.module.startsWith("wasi_")) {
            continue;
          }
          if (!namespace) {
            namespace = imp.module;
          } else {
            if (namespace !== imp.module) {
              throw new Error("Multiple namespaces detected.");
            }
          }
        }
        return namespace;
      }
      getImports(module2) {
        let namespace = this.getImportNamespace(module2);
        switch (namespace) {
          case "wasi_unstable":
            return {
              wasi_unstable: this.wasiImport
            };
          case "wasi_snapshot_preview1":
            return {
              wasi_snapshot_preview1: this.wasiImport
            };
          default:
            throw new Error("Can't detect a WASI namespace for the WebAssembly Module");
        }
      }
    };
    exports.default = WASIDefault;
    WASIDefault.defaultBindings = defaultBindings;
    exports.WASI = WASIDefault;
  }
});

// node_modules/@wasmer/wasmfs/lib/node_sync_emit.js
var require_node_sync_emit = __commonJS({
  "node_modules/@wasmer/wasmfs/lib/node_sync_emit.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = require_node();
    node_1.Node.prototype.emit = function(event, ...args) {
      const listeners = this.listeners(event);
      for (let listener of listeners) {
        try {
          listener(...args);
        } catch (e) {
          console.error(e);
        }
      }
      return listeners.length > 0;
    };
  }
});

// node_modules/@wasmer/wasmfs/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/@wasmer/wasmfs/lib/index.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var memfs_1 = require_lib2();
    var volume_1 = require_volume();
    var path_1 = require_path_browserify();
    require_node_sync_emit();
    var assert4 = (cond, message) => {
      if (!cond) {
        throw new Error(message);
      }
    };
    var WasmFsDefault = class {
      constructor() {
        this.volume = new volume_1.Volume();
        this.fs = memfs_1.createFsFromVolume(this.volume);
        this.fromJSON({
          "/dev/stdin": "",
          "/dev/stdout": "",
          "/dev/stderr": ""
        });
      }
      _toJSON(link, json = {}, path2) {
        let isEmpty = true;
        for (const name in link.children) {
          isEmpty = false;
          const child = link.getChild(name);
          if (child) {
            const node = child.getNode();
            if (node && node.isFile()) {
              let filename = child.getPath();
              if (path2)
                filename = path_1.relative(path2, filename);
              json[filename] = node.getBuffer();
            } else if (node && node.isDirectory()) {
              this._toJSON(child, json, path2);
            }
          }
        }
        let dirPath = link.getPath();
        if (path2)
          dirPath = path_1.relative(path2, dirPath);
        if (dirPath && isEmpty) {
          json[dirPath] = null;
        }
        return json;
      }
      toJSON(paths, json = {}, isRelative = false) {
        const links = [];
        if (paths) {
          if (!(paths instanceof Array))
            paths = [paths];
          for (const path2 of paths) {
            const filename = volume_1.pathToFilename(path2);
            const link = this.volume.getResolvedLink(filename);
            if (!link)
              continue;
            links.push(link);
          }
        } else {
          links.push(this.volume.root);
        }
        if (!links.length)
          return json;
        for (const link of links)
          this._toJSON(link, json, isRelative ? link.getPath() : "");
        return json;
      }
      fromJSONFixed(vol, json) {
        const sep = "/";
        for (let filename in json) {
          const data = json[filename];
          const isDir = data ? Object.getPrototypeOf(data) === null : data === null;
          if (!isDir) {
            const steps = volume_1.filenameToSteps(filename);
            if (steps.length > 1) {
              const dirname = sep + steps.slice(0, steps.length - 1).join(sep);
              vol.mkdirpBase(dirname, 511);
            }
            vol.writeFileSync(filename, data || "");
          } else {
            vol.mkdirpBase(filename, 511);
          }
        }
      }
      fromJSON(fsJson) {
        this.volume = new volume_1.Volume();
        this.fromJSONFixed(this.volume, fsJson);
        this.fs = memfs_1.createFsFromVolume(this.volume);
        this.volume.releasedFds = [0, 1, 2];
        const fdErr = this.volume.openSync("/dev/stderr", "w");
        const fdOut = this.volume.openSync("/dev/stdout", "w");
        const fdIn = this.volume.openSync("/dev/stdin", "r");
        assert4(fdErr === 2, `invalid handle for stderr: ${fdErr}`);
        assert4(fdOut === 1, `invalid handle for stdout: ${fdOut}`);
        assert4(fdIn === 0, `invalid handle for stdin: ${fdIn}`);
      }
      async getStdOut() {
        let promise = new Promise((resolve) => {
          resolve(this.fs.readFileSync("/dev/stdout", "utf8"));
        });
        return promise;
      }
    };
    exports.default = WasmFsDefault;
    exports.WasmFs = WasmFsDefault;
  }
});

// node_modules/wasi-kernel/src/kernel/bits/tty.ts
function bindAll3(instance, methods) {
  return methods.reduce((d, m) => Object.assign(d, { [m]: instance[m].bind(instance) }), {});
}
function range(n) {
  return [...Array(n).keys()];
}
var import_events4, Tty, TtyIoctls;
var init_tty = __esm({
  "node_modules/wasi-kernel/src/kernel/bits/tty.ts"() {
    init_process_shim();
    init_buffer_shim();
    import_events4 = __toESM(require_events());
    Tty = class extends import_events4.EventEmitter {
      constructor(core) {
        super();
        this.core = core;
        this.fds = [];
        this.stdin_fl = 0;
        this.termios = {
          flags: [258, 3, 0, 10],
          /* see include/bits/termios.h */
          win: this.defaultWindow()
        };
        this.core.on("stream:out", (ev) => {
          if (this.fds.includes(ev.fd))
            this.emit("data", ev.data);
        });
        this.debug = () => {
        };
      }
      to() {
        return { termios: { win: this.termios.win } };
      }
      makeTty(fd2) {
        this.core.wasi.FD_MAP.get(fd2).filetype = 2;
        this.core.wasi.FD_MAP.get(fd2).rights.base &= ~BigInt(36);
      }
      write(data) {
        this.core.stdin.write(data);
      }
      // ------------------------------
      // Overrides for WASI.wasiImports
      // ------------------------------
      fd_fdstat_set_flags(fd2, flags) {
        this.debug(`fdstat_set_flags(${fd2}, ${flags})
`);
        if (fd2 === 0) {
          this.stdin_fl = flags;
          this.core.stdin.blocking = !(flags & 4);
        }
        return 0;
      }
      fd_fdstat_get(fd2, bufPtr) {
        var ret = this.core.wasi.wasiImport.fd_fdstat_get(fd2, bufPtr);
        if (fd2 === 0) {
          this.core.proc.mem.setUint16(bufPtr + 2, this.stdin_fl, true);
        }
        return ret;
      }
      defaultWindow() {
        var win = new Uint16Array(new SharedArrayBuffer(4));
        win[0] = 24;
        win[1] = 80;
        return win;
      }
      get overrideImport() {
        return bindAll3(this, ["fd_fdstat_get", "fd_fdstat_set_flags"]);
      }
      get import() {
        return bindAll3(this, ["tcgetattr", "tcsetattr", "tgetent"]);
      }
      get extlib() {
        return bindAll3(this, ["tty_ioctl"]);
      }
      // ------------
      // Termois Part
      // ------------
      tcgetattr(fd2, termios_p) {
        this.debug(`tcgetattr(${fd2}, ${termios_p})`);
        let mem = this.core.proc.mem;
        this.termios.flags.forEach((fl2, i) => {
          mem.setUint32(termios_p + 4 * i, fl2, true);
        });
        mem.setUint8(termios_p + 4 * 4 + 1 + 5, 0);
        mem.setUint8(termios_p + 4 * 4 + 1 + 6, 1);
        return 0;
      }
      tcsetattr(fd2, when, termios_p) {
        this.debug(`tcsetattr(${fd2}, ${when}, ${termios_p})`);
        let mem = this.core.proc.mem, flags = range(4).map((i) => mem.getUint32(termios_p + 4 * i, true)), cc = range(32).map((i) => mem.getUint8(termios_p + 4 * 4 + 1 + i));
        this.debug(`  [${flags.map((i) => "0" + i.toString(8)).join(", ")}] [${cc}]`);
        this.termios.flags = flags;
        this.core.stdin.blocking = cc[6] > 0;
        this.core.proc.emit("syscall", {
          func: "ioctl:tty",
          data: { fd: fd2, when, flags }
        });
        return 0;
      }
      tgetent(bp, name) {
        this.debug(`tgetent(_, '${this.core.proc.userGetCString(name)}')`);
        return 1;
      }
      tty_ioctl(fd2, request, buf) {
        console.warn("tty_ioctl", fd2, request, buf);
        if (fd2 == 1) {
          var mem = this.core.proc.mem, win = this.termios.win;
          switch (request) {
            case TtyIoctls.TIOCGWINSZ:
              for (let i = 0; i < win.length; i++)
                mem.setUint16(buf + 2 * i, win[i], true);
              break;
            case TtyIoctls.TIOCSWINSZ:
              var setting = win.map((_, i) => mem.getUint16(buf + 2 * i));
              this.core.proc.emit("syscall", {
                func: "ioctl:tty",
                data: { fd: fd2, request, win: setting }
              });
              break;
          }
        }
      }
    };
    TtyIoctls = /* @__PURE__ */ ((TtyIoctls2) => {
      TtyIoctls2[TtyIoctls2["TCSETFL"] = 1] = "TCSETFL";
      TtyIoctls2[TtyIoctls2["TIOCGWINSZ"] = 21523] = "TIOCGWINSZ";
      TtyIoctls2[TtyIoctls2["TIOCSWINSZ"] = 21524] = "TIOCSWINSZ";
      return TtyIoctls2;
    })(TtyIoctls || {});
  }
});

// node_modules/randombytes/browser.js
var require_browser3 = __commonJS({
  "node_modules/randombytes/browser.js"(exports, module) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    var MAX_BYTES = 65536;
    var MAX_UINT32 = 4294967295;
    function oldBrowser() {
      throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
    }
    var Buffer4 = require_safe_buffer().Buffer;
    var crypto = self.crypto || self.msCrypto;
    if (crypto && crypto.getRandomValues) {
      module.exports = randomBytes;
    } else {
      module.exports = oldBrowser;
    }
    function randomBytes(size, cb) {
      if (size > MAX_UINT32)
        throw new RangeError("requested too many random bytes");
      var bytes = Buffer4.allocUnsafe(size);
      if (size > 0) {
        if (size > MAX_BYTES) {
          for (var generated = 0; generated < size; generated += MAX_BYTES) {
            crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
          }
        } else {
          crypto.getRandomValues(bytes);
        }
      }
      if (typeof cb === "function") {
        return process.nextTick(function() {
          cb(null, bytes);
        });
      }
      return bytes;
    }
  }
});

// node_modules/randomfill/browser.js
var require_browser4 = __commonJS({
  "node_modules/randomfill/browser.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    function oldBrowser() {
      throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11");
    }
    var safeBuffer = require_safe_buffer();
    var randombytes = require_browser3();
    var Buffer4 = safeBuffer.Buffer;
    var kBufferMaxLength = safeBuffer.kMaxLength;
    var crypto = self.crypto || self.msCrypto;
    var kMaxUint32 = Math.pow(2, 32) - 1;
    function assertOffset(offset, length) {
      if (typeof offset !== "number" || offset !== offset) {
        throw new TypeError("offset must be a number");
      }
      if (offset > kMaxUint32 || offset < 0) {
        throw new TypeError("offset must be a uint32");
      }
      if (offset > kBufferMaxLength || offset > length) {
        throw new RangeError("offset out of range");
      }
    }
    function assertSize(size, offset, length) {
      if (typeof size !== "number" || size !== size) {
        throw new TypeError("size must be a number");
      }
      if (size > kMaxUint32 || size < 0) {
        throw new TypeError("size must be a uint32");
      }
      if (size + offset > length || size > kBufferMaxLength) {
        throw new RangeError("buffer too small");
      }
    }
    if (crypto && crypto.getRandomValues || !browser) {
      exports.randomFill = randomFill;
      exports.randomFillSync = randomFillSync;
    } else {
      exports.randomFill = oldBrowser;
      exports.randomFillSync = oldBrowser;
    }
    function randomFill(buf, offset, size, cb) {
      if (!Buffer4.isBuffer(buf) && !(buf instanceof self.Uint8Array)) {
        throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
      }
      if (typeof offset === "function") {
        cb = offset;
        offset = 0;
        size = buf.length;
      } else if (typeof size === "function") {
        cb = size;
        size = buf.length - offset;
      } else if (typeof cb !== "function") {
        throw new TypeError('"cb" argument must be a function');
      }
      assertOffset(offset, buf.length);
      assertSize(size, offset, buf.length);
      return actualFill(buf, offset, size, cb);
    }
    function actualFill(buf, offset, size, cb) {
      if (browser) {
        var ourBuf = buf.buffer;
        var uint = new Uint8Array(ourBuf, offset, size);
        crypto.getRandomValues(uint);
        if (cb) {
          process.nextTick(function() {
            cb(null, buf);
          });
          return;
        }
        return buf;
      }
      if (cb) {
        randombytes(size, function(err2, bytes2) {
          if (err2) {
            return cb(err2);
          }
          bytes2.copy(buf, offset);
          cb(null, buf);
        });
        return;
      }
      var bytes = randombytes(size);
      bytes.copy(buf, offset);
      return buf;
    }
    function randomFillSync(buf, offset, size) {
      if (typeof offset === "undefined") {
        offset = 0;
      }
      if (!Buffer4.isBuffer(buf) && !(buf instanceof self.Uint8Array)) {
        throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
      }
      assertOffset(offset, buf.length);
      if (size === void 0)
        size = buf.length - offset;
      assertSize(size, offset, buf.length);
      return actualFill(buf, offset, size);
    }
  }
});

// node_modules/@wasmer/wasi/lib/polyfills/browser-hrtime.js
var require_browser_hrtime = __commonJS({
  "node_modules/@wasmer/wasi/lib/polyfills/browser-hrtime.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseNow = Math.floor((Date.now() - performance.now()) * 1e-3);
    function hrtime(previousTimestamp) {
      let clocktime = performance.now() * 1e-3;
      let seconds = Math.floor(clocktime) + baseNow;
      let nanoseconds = Math.floor(clocktime % 1 * 1e9);
      if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
          seconds--;
          nanoseconds += 1e9;
        }
      }
      return [seconds, nanoseconds];
    }
    exports.default = hrtime;
  }
});

// node_modules/@wasmer/wasi/lib/polyfills/hrtime.bigint.js
var require_hrtime_bigint = __commonJS({
  "node_modules/@wasmer/wasi/lib/polyfills/hrtime.bigint.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var NS_PER_SEC = 1e9;
    var getBigIntHrtime = (nativeHrtime) => {
      return (time) => {
        const diff = nativeHrtime(time);
        return diff[0] * NS_PER_SEC + diff[1];
      };
    };
    exports.default = getBigIntHrtime;
  }
});

// node_modules/@wasmer/wasi/lib/bindings/browser.js
var require_browser5 = __commonJS({
  "node_modules/@wasmer/wasi/lib/bindings/browser.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var randomfill = require_browser4();
    var browser_hrtime_1 = require_browser_hrtime();
    var path2 = require_path_browserify();
    var index_1 = require_lib3();
    var hrtime_bigint_1 = require_hrtime_bigint();
    var bindings = {
      hrtime: hrtime_bigint_1.default(browser_hrtime_1.default),
      exit: (code) => {
        throw new index_1.WASIExitError(code);
      },
      kill: (signal) => {
        throw new index_1.WASIKillError(signal);
      },
      // @ts-ignore
      randomFillSync: randomfill.randomFillSync,
      isTTY: () => true,
      path: path2,
      // Let the user attach the fs at runtime
      fs: null
    };
    exports.default = bindings;
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
    init_process_shim();
    init_buffer_shim();
  }
});

// (disabled):fs
var require_fs = __commonJS({
  "(disabled):fs"() {
    init_process_shim();
    init_buffer_shim();
  }
});

// (disabled):tty
var require_tty = __commonJS({
  "(disabled):tty"() {
    init_process_shim();
    init_buffer_shim();
  }
});

// node_modules/@wasmer/wasi/lib/bindings/node.js
var require_node2 = __commonJS({
  "node_modules/@wasmer/wasi/lib/bindings/node.js"(exports) {
    "use strict";
    init_process_shim();
    init_buffer_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto = require_crypto();
    var fs2 = require_fs();
    var { isatty: isTTY } = require_tty();
    var path2 = require_path_browserify();
    var hrtime_bigint_1 = require_hrtime_bigint();
    var bigIntHrtime = hrtime_bigint_1.default(process.hrtime);
    if (process.hrtime && process.hrtime.bigint) {
      bigIntHrtime = process.hrtime.bigint;
    }
    var bindings = {
      hrtime: bigIntHrtime,
      exit: (code) => {
        process.exit(code);
      },
      kill: (signal) => {
        process.kill(process.pid, signal);
      },
      randomFillSync: crypto.randomFillSync,
      isTTY,
      fs: fs2,
      path: path2
    };
    exports.default = bindings;
  }
});

// node_modules/wasi-kernel/src/kernel/exec.ts
function memoize(cache, k, f) {
  let v = cache.get(k);
  if (!v) {
    v = f(k);
    cache.set(k, v);
  }
  return v;
}
function memoizeMaybe(cache, k, f) {
  return cache ? memoize(cache, k, f) : f(k);
}
var import_events5, import_assert2, import_memfs, import_lib, import_lib2, ExecCore, defaults, nop, WASIExitError;
var init_exec = __esm({
  "node_modules/wasi-kernel/src/kernel/exec.ts"() {
    init_process_shim();
    init_buffer_shim();
    import_events5 = __toESM(require_events());
    import_assert2 = __toESM(require_assert());
    import_memfs = __toESM(require_lib2());
    import_lib = __toESM(require_lib3());
    import_lib2 = __toESM(require_lib4());
    init_streams();
    init_tty();
    init_proc();
    init_stubs();
    init_utf8();
    init_arch();
    import_lib.WASI.defaultBindings = isBrowser ? require_browser5().default : require_node2().default;
    ExecCore = class extends import_events5.EventEmitter {
      constructor(opts = {}) {
        super();
        /* cached binaries */
        this.debug = nop;
        this.trace = { user: nop, syscalls: nop };
        this.opts = opts = Object.assign({}, defaults, opts);
        this.stdin = opts.stdin ? new SimplexStream() : null;
        this.wasmFs = new import_lib2.WasmFs();
        this.populateRootFs();
        this.proc = new Proc(this, opts.proc);
        this.tty = opts.tty ? new Tty(this) : null;
        this.cached = opts.cacheBins !== false ? /* @__PURE__ */ new Map() : null;
        this.init();
      }
      initTraces() {
        if (this.opts.debug) {
          this.debug = this._debugPrint();
          this.trace.user = this._tracePrint();
        }
        if (this.opts.trace?.syscalls) {
          this.trace.syscalls = this._tracePrintAny();
        }
        if (this.tty)
          this.tty.debug = (...a) => this.debug(...a);
        this.proc.debug = (...a) => this.debug(...a);
        stubs_default.debug = this.debug;
      }
      init() {
        this.argv = ["."];
        this.env = this.initialEnv();
        this.wasi = new import_lib.WASI({
          args: this.argv,
          env: this.env,
          bindings: {
            ...import_lib.WASI.defaultBindings,
            exit: (code) => {
              throw new WASIExitError(code);
            },
            fs: this.wasmFs.fs,
            path: this.proc.path
          },
          preopens: { "/": "/" },
          ...this.extraWASIConfig()
        });
        this.exited = false;
        this.registerStdio();
        this.proc.init();
        let tty = this.opts.tty;
        if (tty) {
          var fds = typeof tty == "number" ? [tty] : typeof tty == "boolean" ? [0, 1, 2] : tty;
          this.tty.fds = fds;
          for (let fd2 of fds)
            this.tty.makeTty(fd2);
        }
      }
      configure(opts) {
        Object.assign(this.opts, opts);
      }
      reset() {
        if (this.stdin)
          this.stdin.reset();
        this.init();
      }
      async start(wasmUri, argv, env2) {
        if (this.exited)
          this.reset();
        if (argv)
          this.argv.splice(0, Infinity, ...argv);
        if (env2)
          Object.assign(this.env, env2);
        this.proc.opts = this.opts.proc || {};
        this.initTraces();
        var wamodule = await this.fetchCompile(wasmUri), wainstance = await WebAssembly.instantiate(
          wamodule,
          this.getImports(wamodule)
        );
        this.wasm = { module: wamodule, instance: wainstance };
        try {
          this.wasi.start(this.wasm.instance);
          return 0;
        } catch (e) {
          if (e instanceof WASIExitError)
            return e.code;
          else
            throw e;
        } finally {
          this.exited = true;
        }
      }
      get fs() {
        return this.wasmFs.fs;
      }
      async fetch(uri) {
        if (typeof fetch !== "undefined") {
          const response = await fetch(uri);
          return new Uint8Array(await response.arrayBuffer());
        } else {
          const fs2 = require_fs();
          return (0, fs2.readFileSync)(uri);
        }
      }
      async fetchCompile(uri) {
        return memoizeMaybe(this.cached, uri, async (uri2) => {
          var bytes = await this.fetch(uri2);
          return WebAssembly.compile(bytes);
        });
      }
      /**
       * @todo warn about unresolved symbols such as `__SIG_IGN` that stem
       *    from not linking some wasi-sdk emulation lib (`-lwasi-emulated-signal`).
       */
      getImports(wamodule) {
        return {
          ...this.wasi.getImports(wamodule),
          wasik_ext: { ...this.proc.extlib, ...this.tty?.extlib },
          env: { ...this.proc.import, ...this.tty?.import }
        };
      }
      /**
       * Returns an object that can be shared with a parent thread
       * (via e.g. `Worker.postMessage`) to communicate with this core.
       */
      share() {
        return {
          stdin: this.stdin.to(),
          tty: this.tty.to(),
          sigvec: this.proc.sigvec.to(),
          childq: this.proc.childq.to()
        };
      }
      emitWrite(fd2, buffer2) {
        this.emit("stream:out", { fd: fd2, data: buffer2 });
        return buffer2.length;
      }
      /**
       * Initial environment variables
       */
      initialEnv() {
        return this.opts.env ? Object.assign({}, this.opts.env) : this.defaultEnv();
      }
      defaultEnv() {
        return { PATH: "/bin", PWD: "/home" };
      }
      extraWASIConfig() {
        let o = this.opts;
        return { traceSyscalls: o.trace && o.trace.syscalls };
      }
      registerStdio() {
        var volume = this.wasmFs.volume;
        if (!(volume.fds[0] && volume.fds[1] && volume.fds[2])) {
          volume.releasedFds = [0, 1, 2];
          const fdErr = volume.openSync("/dev/stderr", "w"), fdOut = volume.openSync("/dev/stdout", "w"), fdIn = volume.openSync("/dev/stdin", "r");
          (0, import_assert2.default)(fdIn == 0 && fdOut == 1 && fdErr == 2);
        }
        if (this.stdin)
          volume.fds[0].read = this.stdin.read.bind(this.stdin);
        volume.fds[1].write = (d) => this.emitWrite(1, d);
        volume.fds[2].write = (d) => this.emitWrite(2, d);
      }
      mountFs(volume) {
        volume.fromJSON(this.wasmFs.volume.toJSON());
        this.wasmFs.volume = volume;
        this.wasmFs.fs = (0, import_memfs.createFsFromVolume)(volume);
        this.init();
      }
      /**
       * Bootstrapping filesystem contents
       */
      populateRootFs() {
        this.wasmFs.fs.mkdirSync("/home");
        this.wasmFs.fs.mkdirSync("/bin");
      }
      _debugPrint() {
        return self.process ? (
          /* console is funky in Node worker threads */
          (...args) => this.emitWrite(2, utf8encode(args.join(" ") + "\n"))
        ) : console.log;
      }
      _tracePrint() {
        return self.process ? (
          /* console is funky in Node worker threads */
          (ui8a) => this.emitWrite(2, ui8a)
        ) : (ui8a) => console.warn("[trace]", utf8decode(ui8a), ui8a);
      }
      _tracePrintAny() {
        return self.process ? (
          /* console is funky in Node worker threads */
          (...args) => this.emitWrite(2, utf8encode(args.toString()))
        ) : (...args) => console.warn("[trace]", ...args);
      }
    };
    defaults = { stdin: true };
    nop = () => {
    };
    WASIExitError = class {
      constructor(code) {
        this.code = code;
      }
    };
  }
});

// backend/wasm/wacoq_worker.ts
init_process_shim();
init_buffer_shim();

// backend/wasm/core.ts
init_process_shim();
init_buffer_shim();
var import_events6 = __toESM(require_events(), 1);

// node_modules/fflate/esm/browser.js
init_process_shim();
init_buffer_shim();
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i)
    ++l[cd[i] - 1];
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, buf, st) {
  var sl = dat.length;
  if (!sl || st && st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf || st;
  var noSt = !st || st.i;
  if (!st)
    st = {};
  if (!buf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >>> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (noBuf)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (noBuf)
          cbuf(bt + 131072);
        var end = bt + add;
        for (; bt < end; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end;
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
function inflateSync(data, out) {
  return inflt(data, out);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return [r, slc(d, i - 1)];
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td)
    return td.decode(dat);
  else {
    var _a2 = dutf8(dat), out = _a2[0], ext = _a2[1];
    if (ext.length)
      err(8);
    return out;
  }
}
var slzh = function(d, b) {
  return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
var zh = function(d, b, z) {
  var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
  var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
  return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
function unzipSync(data, opts) {
  var files = {};
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558)
      err(13);
  }
  ;
  var c = b2(data, e + 8);
  if (!c)
    return {};
  var o = b4(data, e + 16);
  var z = o == 4294967295;
  if (z) {
    e = b4(data, e - 12);
    if (b4(data, e) != 101075792)
      err(13);
    c = b4(data, e + 32);
    o = b4(data, e + 48);
  }
  var fltr = opts && opts.filter;
  for (var i = 0; i < c; ++i) {
    var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
    o = no;
    if (!fltr || fltr({
      name: fn,
      size: sc,
      originalSize: su,
      compression: c_2
    })) {
      if (!c_2)
        files[fn] = slc(data, b, b + sc);
      else if (c_2 == 8)
        files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
      else
        err(14, "unknown compression type " + c_2);
    }
  }
  return files;
}

// backend/wasm/core.ts
var import_browser_or_node = __toESM(require_lib(), 1);

// backend/wasm/ocaml_exec.ts
init_process_shim();
init_buffer_shim();

// node_modules/wasi-kernel/src/kernel/index.ts
init_process_shim();
init_buffer_shim();

// node_modules/wasi-kernel/src/kernel/process.ts
init_process_shim();
init_buffer_shim();
var import_events3 = __toESM(require_events());
init_streams();
init_proc();

// node_modules/wasi-kernel/src/kernel/bindings/workers.ts
init_process_shim();
init_buffer_shim();
init_arch();
var WorkerImpl;
var postMessage2;
var onMessage;
if (isBrowser) {
  WorkerImpl = self.Worker;
  postMessage2 = self.postMessage;
  onMessage = (handler) => addEventListener("message", handler);
} else if (isNode) {
  const workerThreads = __require("worker_threads");
  class WorkerAdapter {
    constructor(stringUrl) {
      this.thread = new workerThreads.Worker(stringUrl);
    }
    addEventListener(eventName, handler) {
      this.thread.on(eventName, (ev) => {
        handler({ data: ev });
      });
    }
    postMessage(msg) {
      this.thread.postMessage(msg);
    }
    static onMessage(handler) {
      workerThreads.parentPort.on("message", (ev) => {
        handler({ data: ev });
      });
    }
    static postMessage(msg) {
      workerThreads.parentPort.postMessage(msg);
    }
  }
  WorkerImpl = WorkerAdapter;
  onMessage = WorkerAdapter.onMessage;
  postMessage2 = WorkerAdapter.postMessage;
}

// node_modules/wasi-kernel/src/kernel/process.ts
init_queue();

// node_modules/wasi-kernel/src/kernel/index.ts
init_exec();

// node_modules/wasi-kernel/src/kernel/services/shared-fs.ts
init_process_shim();
init_buffer_shim();
var import_memfs2 = __toESM(require_lib2());
var import_volume = __toESM(require_volume());
var import_node = __toESM(require_node());
var import_assert3 = __toESM(require_assert());
var ProxyHandlers;
((ProxyHandlers2) => {
  class LinkHandler {
    get(link, name) {
      if (name === "children" && link.vol.dev && !link._dirty) {
        link.pull();
      }
      return link[name];
    }
  }
  ProxyHandlers2.LinkHandler = LinkHandler;
  class LinkChildren {
    constructor(link) {
      this.link = link;
    }
    getOwnPropertyDescriptor(children, name) {
      this.link.pull();
      return children.hasOwnProperty(name) ? { configurable: true, enumerable: true } : void 0;
    }
    get(children, name) {
      this.link.pull();
      return children[name];
    }
    set(children, name, value) {
      children[name] = value;
      return true;
    }
  }
  ProxyHandlers2.LinkChildren = LinkChildren;
})(ProxyHandlers || (ProxyHandlers = {}));

// backend/wasm/ocaml_exec.ts
var OCamlCAPI;
((OCamlCAPI2) => {
  function Val_int(v) {
    return v << 2 | 1;
  }
  OCamlCAPI2.Val_int = Val_int;
  function Val_bool(b) {
    return Val_int(+b);
  }
  OCamlCAPI2.Val_bool = Val_bool;
  function Int_val(v) {
    return v >> 1;
  }
  OCamlCAPI2.Int_val = Int_val;
  function Bool_val(v) {
    return !!Int_val(v);
  }
  OCamlCAPI2.Bool_val = Bool_val;
  OCamlCAPI2.Val_unit = Val_int(0);
  OCamlCAPI2.Val_false = Val_int(0);
  OCamlCAPI2.Val_true = Val_int(1);
})(OCamlCAPI || (OCamlCAPI = {}));
var OCamlExecutable = class extends ExecCore {
  api;
  callbacks;
  constructor(opts) {
    super(opts);
  }
  initialEnv() {
    return {
      ...super.initialEnv(),
      "OCAMLFIND_CONF": "/lib/findlib.conf",
      "COQLIB": "/lib"
    };
  }
  async run(bytecodeFile, args, callbacks = []) {
    var bin = this.opts.binDir || "../bin";
    for (let p of this.preloads())
      await this.proc.dyld.preload(p.name, p.uri, p.reloc);
    await this.start(
      `${bin}/ocamlrun.wasm`,
      ["ocamlrun", bytecodeFile, ...args],
      this.env
    );
    this.api = this.wasm.instance.exports;
    this.callbacks = this._getCallbacks(callbacks);
  }
  preloads() {
    var bin = this.opts.binDir || "../bin";
    return ["dllcamlstr", "dllunix", "dllthreads"].map((b) => ({
      name: `${b}.so`,
      uri: `${bin}/${b}.wasm`,
      reloc: STDLIB_STUBS[b]
    }));
  }
  to_caml_string(s) {
    var bytes = new TextEncoder().encode(s), a = this.api.caml_alloc_string(bytes.length);
    this.proc.membuf.set(bytes, a);
    return a;
  }
  _getCallbacks(names2) {
    var callbacks = {}, x = this.api.malloc(Math.max(...names2.map((s) => s.length)) + 1);
    ;
    for (let name of names2) {
      this.proc.membuf.write(name + "\0", x);
      let closure_f = this.api.caml_named_value(x);
      if (closure_f) {
        callbacks[name] = (arg) => this.api.caml_callback(this.proc.mem.getUint32(closure_f, true), arg);
      }
    }
    this.api.free(x);
    return callbacks;
  }
};
var UNIX_STUBBED = [
  "fstat",
  "fsync",
  "strchr",
  "fcntl",
  "ftruncate",
  "getgrnam",
  "gmtime",
  "localtime",
  "mktime",
  "lockf",
  "pwrite",
  "sysconf",
  "mmap",
  "munmap",
  "putenv",
  "rewinddir",
  "select",
  "nanosleep",
  "tcgetattr",
  "tcsetattr",
  "time",
  "truncate"
];
var STDLIB_STUBS = {
  "dllunix": {
    js: mapAllTo(UNIX_STUBBED, () => 0)
  }
};
function mapAllTo(keys, value) {
  return Object.fromEntries(keys.map((nm) => [nm, value]));
}

// backend/wasm/interrupt.ts
init_process_shim();
init_buffer_shim();
var WorkerInterrupts = class {
  vec;
  checkpoint = 0;
  setup(vec) {
    this.vec = vec;
  }
  pending() {
    if (this.vec && typeof Atomics !== "undefined") {
      var ld = Atomics.load(this.vec, 0);
      if (ld > this.checkpoint) {
        this.checkpoint = ld;
        return true;
      }
    }
    return false;
  }
};

// backend/wasm/core.ts
var IcoqPod = class extends import_events6.EventEmitter {
  core;
  intr;
  binDir;
  nmDir;
  io;
  constructor(binDir, nmDir, fetchMode = DEFAULT_FETCH_MODE) {
    super();
    binDir = binDir || (fetchMode === "fs" ? "./bin" : "../bin");
    this.binDir = binDir;
    this.nmDir = nmDir ?? "../node_modules";
    this.core = new OCamlExecutable({ stdin: false, tty: false, binDir: `${nmDir}/ocaml-wasm/bin` });
    var utf8 = new TextDecoder();
    this.core.on("stream:out", (ev) => console.log(utf8.decode(ev.data)));
    this.io = new IO(fetchMode);
    this.intr = new WorkerInterrupts();
  }
  async findlibStartup() {
    this.putFile("/lib/findlib.conf", `path="/lib/ocaml"`);
    await this.unzip("/scratch/lib.zip", "/lib/ocaml");
  }
  get fs() {
    return this.core.fs;
  }
  async boot() {
    await this.upload(`../backend/wasm/wacoq_worker.bc`, "/lib/icoq.bc");
    this._preloadStub();
    await this.core.run("/lib/icoq.bc", [], ["wacoq_post"]);
  }
  async upload(fromUri, toPath) {
    var content = await this.io._fetch(fromUri);
    this.putFile(toPath, content);
  }
  loadPackage(uri, refresh = true) {
    return this.loadPackages([uri], refresh);
  }
  async loadPackages(uris, refresh = true) {
    if (typeof uris == "string")
      uris = [uris];
    await Promise.all(uris.map(async (uri) => {
      try {
        await this.unzip(uri, "/lib");
        this.answer([["LibLoaded", uri]]);
      } catch (e) {
        this.answer([["LibError", uri, e.toString()]]);
        throw e;
      }
    }));
    this.answer([["LoadedPkg", uris]]);
  }
  async loadSources(uri, dirpath) {
    var subdir = dirpath.replace(/[.]|([^/])$/g, "$1/");
    this.unzip(uri, `/src/${subdir}`);
  }
  unzip(uri, dir) {
    return this.io.unzip(
      this._pkgUri(uri),
      (fn, ui8a) => this.putFile(`${dir}/${fn}`, ui8a),
      (p) => this._progress(uri, p)
    );
  }
  _pkgUri(uri) {
    return uri[0] == "+" ? `${this.binDir}/coq/${uri.substring(1)}.coq-pkg` : uri;
  }
  _progress(uri, download) {
    this.emit("progress", { uri, download });
  }
  putFile(filename, content) {
    if (!filename.startsWith("/"))
      filename = `/lib/${filename}`;
    this.fs.mkdirpSync(filename.replace(/[/][^/]+$/, ""));
    this.fs.writeFileSync(filename, content);
  }
  getFile(filename) {
    if (!filename.startsWith("/"))
      filename = `/lib/${filename}`;
    var buf = null;
    try {
      buf = this.fs.readFileSync(filename);
    } catch {
    }
    this.answer([["Got", filename, buf]]);
  }
  command(cmd) {
    switch (cmd[0]) {
      case "LoadPkg":
        this.loadPackages(cmd[1]);
        return;
      case "Put":
        this.putFile(cmd[1], cmd[2]);
        return;
      case "Get":
        this.getFile(cmd[1]);
        return;
      case "InterruptSetup":
        this.intr.setup(cmd[1]);
        return;
    }
    const wacoq_post = this.core.callbacks && this.core.callbacks.wacoq_post;
    if (!wacoq_post)
      return;
    var json = typeof cmd === "string" ? cmd : JSON.stringify(cmd), answer = wacoq_post(this.core.to_caml_string(json));
    this._answer(answer);
  }
  answer(msgs) {
    for (let msg of msgs)
      this.emit("message", msg);
  }
  _answer(ptr) {
    var cstr = this.core.proc.userGetCString(ptr);
    this.answer(JSON.parse(cstr));
  }
  _interrupt_pending() {
    return OCamlCAPI.Val_bool(this.intr.pending());
  }
  /**
   * (internal) Initializes the dllcoqrun_stub shared library.
   */
  _preloadStub() {
    this.core.proc.dyld.preload(
      "dllzarith.so",
      `${this.nmDir}/@ocaml-wasm/4.12--zarith/bin/dllzarith.wasm`
    );
    this.core.proc.dyld.preload(
      "dllbase_stubs.so",
      `${this.nmDir}/@ocaml-wasm/4.12--janestreet-base/bin/dllbase_stubs.wasm`
    );
    this.core.proc.dyld.preload(
      "dllbase_internalhash_types_stubs.so",
      `${this.nmDir}/@ocaml-wasm/4.12--janestreet-base/bin/dllbase_internalhash_types_stubs.wasm`
    );
    this.core.proc.dyld.preload(
      "dllcoqrun_stubs.so",
      `${this.binDir}/dllcoqrun_stubs.wasm`
    );
    this.core.proc.dyld.preload(
      "dlllib_stubs.so",
      `${this.binDir}/dlllib_stubs.wasm`,
      {
        js: {
          wacoq_emit: (s) => this._answer(s),
          interrupt_pending: (_) => this._interrupt_pending(),
          coq_vm_trap: (u) => console.warn("coq vm trap!")
        }
      }
    );
  }
};
var IO = class {
  constructor(fetchMode) {
    this.fetchMode = fetchMode;
  }
  pending = /* @__PURE__ */ new Set();
  async unzip(uri, put, progress) {
    var zip = unzipSync(await this._fetch(uri, progress));
    for (let [filename, data] of Object.entries(zip)) {
      if (data.length > 0)
        put(filename, data);
    }
  }
  async _fetch(uri, progress) {
    if (progress && this.fetchMode === "browser") {
      return this._toU8A(this._fetchWithProgress(uri, progress));
    } else
      return this._fetchSimple(uri);
  }
  async _toU8A(blob) {
    return new Uint8Array(await (await blob).arrayBuffer());
  }
  async _fetchSimple(uri) {
    switch (this.fetchMode) {
      case "browser":
        return new Uint8Array(await (await fetch(uri)).arrayBuffer());
      case "fs":
        const fs2 = require_fs();
        return (0, fs2.readFileSync)(uri);
    }
  }
  // boilerplate
  async _fetchWithProgress(uri, progress) {
    var response = await fetch(uri), total = +response.headers.get("Content-Length") || 1e3, r = response.body.getReader(), chunks = [], downloaded = 0;
    this.pending.add(r);
    try {
      for (; ; ) {
        var { value, done } = await r.read();
        if (done)
          break;
        chunks.push(value);
        downloaded += value.length;
        progress({ total, downloaded });
      }
      return new Blob(chunks);
    } finally {
      this.pending.delete(r);
    }
  }
};
var DEFAULT_FETCH_MODE = import_browser_or_node.isBrowser || import_browser_or_node.isWebWorker ? "browser" : "fs";

// backend/wasm/wacoq_worker.ts
function postMessage3(msg) {
  self.postMessage(msg);
}
async function main() {
  var icoq = new IcoqPod("../backend/wasm", "../../../node_modules");
  postMessage3(["Starting"]);
  icoq.on("message", postMessage3);
  icoq.on("progress", (ev) => postMessage3(["LibProgress", ev]));
  addEventListener("message", (msg) => {
    icoq.command(msg.data);
  });
  await icoq.boot();
  postMessage3(["Boot"]);
  Object.assign(self, { icoq });
}
main();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <http://feross.org>
   * @license  MIT
   *)

assert/build/internal/util/comparisons.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=wacoq_worker.js.map
