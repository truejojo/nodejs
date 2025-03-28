//@ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var Customer = require('./models/customer');
var app = express();
mongoose.set('strictQuery', false);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var PORT = process.env.PORT || 3000;
var CONNECTION = process.env.CONNECTION;
app.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send('welcome');
        return [2 /*return*/];
    });
}); });
// get all customers
app.get('/api/customers', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Customer.find()];
            case 1:
                result = _a.sent();
                res.json({ customers: result });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ error: err_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get customer by id
app.get('/api/customers/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var customerId, customer, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.params.id;
                return [4 /*yield*/, Customer.findById(customerId)];
            case 1:
                customer = _a.sent();
                if (!customer) {
                    res.status(404).json({ error: 'User not found!' });
                }
                else {
                    res.json({ customer: customer });
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ error: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// update customer by all properties
app.put('/api/customers/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var customerId, customer, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.params.id;
                return [4 /*yield*/, Customer.findOneAndReplace({ _id: customerId }, req.body, { "new": true })];
            case 1:
                customer = _a.sent();
                res.json({ customer: customer });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json({ error: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// update customer by property/properties
app.patch('/api/customers/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var customerId, customer, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.params.id;
                return [4 /*yield*/, Customer.findByIdAndUpdate({ _id: customerId }, req.body, { "new": true })];
            case 1:
                customer = _a.sent();
                res.json({ customer: customer });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json({ error: err_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete customer
app["delete"]('/api/customers/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var customerId, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                customerId = req.params.id;
                return [4 /*yield*/, Customer.deleteOne({ _id: customerId })];
            case 1:
                result = _a.sent();
                res.json({ deletedCount: result.deletedCount });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json({ error: err_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// add new customer
app.post('/api/customers', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var customer, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customer = new Customer(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, customer.save()];
            case 2:
                _a.sent();
                res.status(201).json({ customer: customer });
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400).json({ error: err_6.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/', function (req, res) {
    res.send('This is a post request');
});
app.get('/api/orders/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Customer.findOne({ 'orders._id': req.params.id })];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result);
                }
                else {
                    res.status(404).json('err', 'not found');
                }
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                console.log(err_7);
                res.status(500).json({ error: err_7.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var start = function () { return __awaiter(_this, void 0, void 0, function () {
    var err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose.connect(CONNECTION)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                console.log(err_8.message);
                throw new Error(err_8);
            case 3:
                app.listen(PORT, function () {
                    console.log('App listening on port ' + PORT);
                });
                return [2 /*return*/];
        }
    });
}); };
start();
