/**
 * Created with OF2019.
 * 2016-06-06 22:01:23
 */
var immutable = require('immutable');
var Iflux = require('iflux');
var Messages = Iflux.msg;
var Store = Iflux.Store;
var Request = require('util/ajax/request');

var appStore = Store({
});

export default appStore;
