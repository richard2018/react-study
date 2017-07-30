var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');

var data = Immutable.fromJS({ a: { b: { c: 1 } } });
var cursor = Cursor.from(data, ['a', 'b'], newData => {
	console.info("newData : " + newData);
	data = newData;
});
//cursor = cursor.update('c', x => x + 1);

console.info("data : " + cursor.get('c'));
var c = data.getIn(['a', 'b', 'c']);
console.info("c : " + c);