"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryXmlParser = void 0;
/**
 * https://github.com/openstf/adbkit-apkreader/blob/368f6b207c57e82fa7373c1608920ca7f4a8904c/lib/apkreader/parser/binaryxml.js
 */
const assert = __importStar(require("assert"));
// import Debug from 'debug';
// const debug = Debug('native-run:android:util:binary-xml-parser');
const NodeType = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    CDATA_SECTION_NODE: 4,
};
const ChunkType = {
    NULL: 0x0000,
    STRING_POOL: 0x0001,
    TABLE: 0x0002,
    XML: 0x0003,
    XML_FIRST_CHUNK: 0x0100,
    XML_START_NAMESPACE: 0x0100,
    XML_END_NAMESPACE: 0x0101,
    XML_START_ELEMENT: 0x0102,
    XML_END_ELEMENT: 0x0103,
    XML_CDATA: 0x0104,
    XML_LAST_CHUNK: 0x017f,
    XML_RESOURCE_MAP: 0x0180,
    TABLE_PACKAGE: 0x0200,
    TABLE_TYPE: 0x0201,
    TABLE_TYPE_SPEC: 0x0202,
};
const StringFlags = {
    SORTED: 1 << 0,
    UTF8: 1 << 8,
};
// Taken from android.util.TypedValue
const TypedValue = {
    COMPLEX_MANTISSA_MASK: 0x00ffffff,
    COMPLEX_MANTISSA_SHIFT: 0x00000008,
    COMPLEX_RADIX_0p23: 0x00000003,
    COMPLEX_RADIX_16p7: 0x00000001,
    COMPLEX_RADIX_23p0: 0x00000000,
    COMPLEX_RADIX_8p15: 0x00000002,
    COMPLEX_RADIX_MASK: 0x00000003,
    COMPLEX_RADIX_SHIFT: 0x00000004,
    COMPLEX_UNIT_DIP: 0x00000001,
    COMPLEX_UNIT_FRACTION: 0x00000000,
    COMPLEX_UNIT_FRACTION_PARENT: 0x00000001,
    COMPLEX_UNIT_IN: 0x00000004,
    COMPLEX_UNIT_MASK: 0x0000000f,
    COMPLEX_UNIT_MM: 0x00000005,
    COMPLEX_UNIT_PT: 0x00000003,
    COMPLEX_UNIT_PX: 0x00000000,
    COMPLEX_UNIT_SHIFT: 0x00000000,
    COMPLEX_UNIT_SP: 0x00000002,
    DENSITY_DEFAULT: 0x00000000,
    DENSITY_NONE: 0x0000ffff,
    TYPE_ATTRIBUTE: 0x00000002,
    TYPE_DIMENSION: 0x00000005,
    TYPE_FIRST_COLOR_INT: 0x0000001c,
    TYPE_FIRST_INT: 0x00000010,
    TYPE_FLOAT: 0x00000004,
    TYPE_FRACTION: 0x00000006,
    TYPE_INT_BOOLEAN: 0x00000012,
    TYPE_INT_COLOR_ARGB4: 0x0000001e,
    TYPE_INT_COLOR_ARGB8: 0x0000001c,
    TYPE_INT_COLOR_RGB4: 0x0000001f,
    TYPE_INT_COLOR_RGB8: 0x0000001d,
    TYPE_INT_DEC: 0x00000010,
    TYPE_INT_HEX: 0x00000011,
    TYPE_LAST_COLOR_INT: 0x0000001f,
    TYPE_LAST_INT: 0x0000001f,
    TYPE_NULL: 0x00000000,
    TYPE_REFERENCE: 0x00000001,
    TYPE_STRING: 0x00000003,
};
class BinaryXmlParser {
    constructor(buffer, options = {}) {
        this.buffer = buffer;
        this.cursor = 0;
        this.strings = [];
        this.resources = [];
        this.stack = [];
        this.debug = false;
        this.debug = options.debug || false;
    }
    readU8() {
        const val = this.buffer[this.cursor];
        this.cursor += 1;
        return val;
    }
    readU16() {
        const val = this.buffer.readUInt16LE(this.cursor);
        this.cursor += 2;
        return val;
    }
    readS32() {
        const val = this.buffer.readInt32LE(this.cursor);
        this.cursor += 4;
        return val;
    }
    readU32() {
        // debug('readU32');
        // debug('cursor:', this.cursor);
        const val = this.buffer.readUInt32LE(this.cursor);
        // debug('value:', val);
        this.cursor += 4;
        return val;
    }
    readLength8() {
        // debug('readLength8');
        let len = this.readU8();
        if (len & 0x80) {
            len = (len & 0x7f) << 8;
            len += this.readU8();
        }
        // debug('length:', len);
        return len;
    }
    readLength16() {
        // debug('readLength16');
        let len = this.readU16();
        if (len & 0x8000) {
            len = (len & 0x7fff) << 16;
            len += this.readU16();
        }
        // debug('length:', len);
        return len;
    }
    readDimension() {
        // debug('readDimension');
        const dimension = {
            value: null,
            unit: null,
            rawUnit: null,
        };
        const value = this.readU32();
        const unit = dimension.value & 0xff;
        dimension.value = value >> 8;
        dimension.rawUnit = unit;
        switch (unit) {
            case TypedValue.COMPLEX_UNIT_MM:
                dimension.unit = 'mm';
                break;
            case TypedValue.COMPLEX_UNIT_PX:
                dimension.unit = 'px';
                break;
            case TypedValue.COMPLEX_UNIT_DIP:
                dimension.unit = 'dp';
                break;
            case TypedValue.COMPLEX_UNIT_SP:
                dimension.unit = 'sp';
                break;
            case TypedValue.COMPLEX_UNIT_PT:
                dimension.unit = 'pt';
                break;
            case TypedValue.COMPLEX_UNIT_IN:
                dimension.unit = 'in';
                break;
        }
        return dimension;
    }
    readFraction() {
        const fraction = {
            value: null,
            type: null,
            rawType: null,
        };
        const value = this.readU32();
        const type = value & 0xf;
        fraction.value = this.convertIntToFloat(value >> 4);
        fraction.rawType = type;
        switch (type) {
            case TypedValue.COMPLEX_UNIT_FRACTION:
                fraction.type = '%';
                break;
            case TypedValue.COMPLEX_UNIT_FRACTION_PARENT:
                fraction.type = '%p';
                break;
        }
        return fraction;
    }
    readHex24() {
        const val = (this.readU32() & 0xffffff).toString(16);
        return val;
    }
    readHex32() {
        const val = this.readU32().toString(16);
        return val;
    }
    readTypedValue() {
        const typedValue = {
            value: null,
            type: null,
            rawType: null,
        };
        const start = this.cursor;
        let size = this.readU16();
        /* const zero = */ this.readU8();
        const dataType = this.readU8();
        // Yes, there has been a real world APK where the size is malformed.
        if (size === 0) {
            size = 8;
        }
        typedValue.rawType = dataType;
        switch (dataType) {
            case TypedValue.TYPE_INT_DEC:
                typedValue.value = this.readS32();
                typedValue.type = 'int_dec';
                break;
            case TypedValue.TYPE_INT_HEX:
                typedValue.value = this.readS32();
                typedValue.type = 'int_hex';
                break;
            case TypedValue.TYPE_STRING: {
                const ref = this.readS32();
                typedValue.value = ref > 0 ? this.strings[ref] : '';
                typedValue.type = 'string';
                break;
            }
            case TypedValue.TYPE_REFERENCE: {
                const id = this.readU32();
                typedValue.value = `resourceId:0x${id.toString(16)}`;
                typedValue.type = 'reference';
                break;
            }
            case TypedValue.TYPE_INT_BOOLEAN:
                typedValue.value = this.readS32() !== 0;
                typedValue.type = 'boolean';
                break;
            case TypedValue.TYPE_NULL:
                this.readU32();
                typedValue.value = null;
                typedValue.type = 'null';
                break;
            case TypedValue.TYPE_INT_COLOR_RGB8:
                typedValue.value = this.readHex24();
                typedValue.type = 'rgb8';
                break;
            case TypedValue.TYPE_INT_COLOR_RGB4:
                typedValue.value = this.readHex24();
                typedValue.type = 'rgb4';
                break;
            case TypedValue.TYPE_INT_COLOR_ARGB8:
                typedValue.value = this.readHex32();
                typedValue.type = 'argb8';
                break;
            case TypedValue.TYPE_INT_COLOR_ARGB4:
                typedValue.value = this.readHex32();
                typedValue.type = 'argb4';
                break;
            case TypedValue.TYPE_DIMENSION:
                typedValue.value = this.readDimension();
                typedValue.type = 'dimension';
                break;
            case TypedValue.TYPE_FRACTION:
                typedValue.value = this.readFraction();
                typedValue.type = 'fraction';
                break;
            default: {
                // const type = dataType.toString(16);
                typedValue.value = this.readU32();
                typedValue.type = 'unknown';
            }
        }
        // Ensure we consume the whole value
        const end = start + size;
        if (this.cursor !== end) {
            // const type = dataType.toString(16);
            // const diff = end - this.cursor;
            //       debug(`Cursor is off by ${diff} bytes at ${this.cursor} at supposed end \
            // of typed value of type 0x${type}. The typed value started at offset ${start} \
            // and is supposed to end at offset ${end}. Ignoring the rest of the value.`);
            this.cursor = end;
        }
        return typedValue;
    }
    // https://twitter.com/kawasima/status/427730289201139712
    convertIntToFloat(int) {
        const buf = new ArrayBuffer(4);
        new Int32Array(buf)[0] = int;
        return new Float32Array(buf)[0];
    }
    readString(encoding) {
        let stringLength;
        let byteLength;
        let value;
        switch (encoding) {
            case 'utf-8':
                stringLength = this.readLength8();
                byteLength = this.readLength8();
                value = this.buffer.toString(encoding, this.cursor, (this.cursor += byteLength));
                assert.equal(this.readU8(), 0, 'String must end with trailing zero');
                return value;
            case 'ucs2':
                stringLength = this.readLength16();
                byteLength = stringLength * 2;
                value = this.buffer.toString(encoding, this.cursor, (this.cursor += byteLength));
                assert.equal(this.readU16(), 0, 'String must end with trailing zero');
                return value;
            default:
                throw new assert.AssertionError({ message: `Unsupported encoding '${encoding}'` });
        }
    }
    readChunkHeader() {
        return {
            startOffset: this.cursor,
            chunkType: this.readU16(),
            headerSize: this.readU16(),
            chunkSize: this.readU32(),
        };
    }
    readStringPool(header) {
        header.stringCount = this.readU32();
        header.styleCount = this.readU32();
        header.flags = this.readU32();
        header.stringsStart = this.readU32();
        header.stylesStart = this.readU32();
        if (header.chunkType !== ChunkType.STRING_POOL) {
            throw new assert.AssertionError({ message: 'Invalid string pool header' });
        }
        const offsets = [];
        for (let i = 0, l = header.stringCount; i < l; ++i) {
            offsets.push(this.readU32());
        }
        const encoding = (header.flags & StringFlags.UTF8) === StringFlags.UTF8 ? 'utf-8' : 'ucs2';
        const stringsStart = header.startOffset + header.stringsStart;
        this.cursor = stringsStart;
        for (let i = 0, l = header.stringCount; i < l; ++i) {
            this.cursor = stringsStart + offsets[i];
            this.strings.push(this.readString(encoding));
        }
        // Skip styles
        this.cursor = header.startOffset + header.chunkSize;
        return null;
    }
    readResourceMap(header) {
        const count = Math.floor((header.chunkSize - header.headerSize) / 4);
        for (let i = 0; i < count; ++i) {
            this.resources.push(this.readU32());
        }
        return null;
    }
    readXmlNamespaceStart( /* header */) {
        this.readU32();
        this.readU32();
        this.readU32();
        this.readU32();
        // const line = this.readU32();
        // const commentRef = this.readU32();
        // const prefixRef = this.readS32();
        // const uriRef = this.readS32();
        // We don't currently care about the values, but they could
        // be accessed like so:
        //
        // namespaceURI.prefix = this.strings[prefixRef] // if prefixRef > 0
        // namespaceURI.uri = this.strings[uriRef] // if uriRef > 0
        return null;
    }
    readXmlNamespaceEnd( /* header */) {
        // debug('readXmlNamespaceEnd');
        this.readU32();
        this.readU32();
        this.readU32();
        this.readU32();
        // const line = this.readU32();
        // const commentRef = this.readU32();
        // const prefixRef = this.readS32();
        // const uriRef = this.readS32();
        // We don't currently care about the values, but they could
        // be accessed like so:
        //
        // namespaceURI.prefix = this.strings[prefixRef] // if prefixRef > 0
        // namespaceURI.uri = this.strings[uriRef] // if uriRef > 0
        return null;
    }
    readXmlElementStart( /* header */) {
        // debug('readXmlElementStart');
        const node = {
            namespaceURI: null,
            nodeType: NodeType.ELEMENT_NODE,
            nodeName: null,
            attributes: [],
            childNodes: [],
        };
        this.readU32();
        this.readU32();
        // const line = this.readU32();
        // const commentRef = this.readU32();
        const nsRef = this.readS32();
        const nameRef = this.readS32();
        if (nsRef > 0) {
            node.namespaceURI = this.strings[nsRef];
        }
        node.nodeName = this.strings[nameRef];
        this.readU16();
        this.readU16();
        // const attrStart = this.readU16();
        // const attrSize = this.readU16();
        const attrCount = this.readU16();
        // const idIndex = this.readU16();
        // const classIndex = this.readU16();
        // const styleIndex = this.readU16();
        this.readU16();
        this.readU16();
        this.readU16();
        for (let i = 0; i < attrCount; ++i) {
            node.attributes.push(this.readXmlAttribute());
        }
        if (this.document) {
            this.parent.childNodes.push(node);
            this.parent = node;
        }
        else {
            this.document = this.parent = node;
        }
        this.stack.push(node);
        return node;
    }
    readXmlAttribute() {
        // debug('readXmlAttribute');
        const attr = {
            namespaceURI: null,
            nodeType: NodeType.ATTRIBUTE_NODE,
            nodeName: null,
            name: null,
            value: null,
            typedValue: null,
        };
        const nsRef = this.readS32();
        const nameRef = this.readS32();
        const valueRef = this.readS32();
        if (nsRef > 0) {
            attr.namespaceURI = this.strings[nsRef];
        }
        attr.nodeName = attr.name = this.strings[nameRef];
        if (valueRef > 0) {
            attr.value = this.strings[valueRef];
        }
        attr.typedValue = this.readTypedValue();
        return attr;
    }
    readXmlElementEnd( /* header */) {
        // debug('readXmlCData');
        this.readU32();
        this.readU32();
        this.readU32();
        this.readU32();
        // const line = this.readU32();
        // const commentRef = this.readU32();
        // const nsRef = this.readS32();
        // const nameRef = this.readS32();
        this.stack.pop();
        this.parent = this.stack[this.stack.length - 1];
        return null;
    }
    readXmlCData( /* header */) {
        // debug('readXmlCData');
        const cdata = {
            namespaceURI: null,
            nodeType: NodeType.CDATA_SECTION_NODE,
            nodeName: '#cdata',
            data: null,
            typedValue: null,
        };
        this.readU32();
        this.readU32();
        // const line = this.readU32();
        // const commentRef = this.readU32();
        const dataRef = this.readS32();
        if (dataRef > 0) {
            cdata.data = this.strings[dataRef];
        }
        cdata.typedValue = this.readTypedValue();
        this.parent.childNodes.push(cdata);
        return cdata;
    }
    readNull(header) {
        // debug('readNull');
        this.cursor += header.chunkSize - header.headerSize;
        return null;
    }
    parse() {
        // debug('parse');
        const xmlHeader = this.readChunkHeader();
        if (xmlHeader.chunkType !== ChunkType.XML) {
            throw new assert.AssertionError({ message: 'Invalid XML header' });
        }
        while (this.cursor < this.buffer.length) {
            // debug('chunk');
            const start = this.cursor;
            const header = this.readChunkHeader();
            switch (header.chunkType) {
                case ChunkType.STRING_POOL:
                    this.readStringPool(header);
                    break;
                case ChunkType.XML_RESOURCE_MAP:
                    this.readResourceMap(header);
                    break;
                case ChunkType.XML_START_NAMESPACE:
                    this.readXmlNamespaceStart();
                    break;
                case ChunkType.XML_END_NAMESPACE:
                    this.readXmlNamespaceEnd();
                    break;
                case ChunkType.XML_START_ELEMENT:
                    this.readXmlElementStart();
                    break;
                case ChunkType.XML_END_ELEMENT:
                    this.readXmlElementEnd();
                    break;
                case ChunkType.XML_CDATA:
                    this.readXmlCData();
                    break;
                case ChunkType.NULL:
                    this.readNull(header);
                    break;
                default:
                    throw new assert.AssertionError({
                        message: `Unsupported chunk type '${header.chunkType}'`,
                    });
            }
            // Ensure we consume the whole chunk
            const end = start + header.chunkSize;
            if (this.cursor !== end) {
                // const diff = end - this.cursor;
                // const type = header.chunkType.toString(16);
                // debug(`Cursor is off by ${diff} bytes at ${this.cursor} at supposed \
                // end of chunk of type 0x${type}. The chunk started at offset ${start} and is \
                // supposed to end at offset ${end}. Ignoring the rest of the chunk.`);
                //         this.cursor = end;
            }
        }
        return this.document;
    }
}
exports.BinaryXmlParser = BinaryXmlParser;
//# sourceMappingURL=apkBinary.js.map