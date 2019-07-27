var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var reduce = function(row, memo) {
  memo.impressionTotal = (row.type === "impression" ? 1 : 0) + (memo.impressionTotal || 0);
  memo.loadsTotal = (row.type === "load" ? 1 : 0) + (memo.loadsTotal || 0);
  memo.displayTotal = (row.type === "display" ? 1 : 0) + (memo.displayTotal || 0);
  memo.loadsRate = memo.loadsTotal/ memo.displayTotal;
  memo.displayRate = memo.displayTotal /memo.loadsTotal;
  return memo
}

module.exports = createReactClass({
  render () {
    return (
          <ReactPivot
              rows={rows}
              dimensions={[
                {value: 'date', title: 'Date'},
                {value: 'host', title: 'Host'}
              ]}
              reduce={reduce}
              activeDimensions={['Date', 'Host']}
              calculations={[
                {value: 'impressionTotal', title: 'Impressions'},
                {value: 'loadsTotal', title: 'Loads'},
                {value: 'displayTotal', title: 'Displays'},
                {value: 'loadsRate', title: 'Loads Rate', template: function(val, row) {
                  return Number(val.toFixed(2)) + '%'
                },},
                {value: 'displayRate', title: 'Displays Rate' , template: function(val, row) {
                  return Number(val.toFixed(2)) + '%'
                },},
              ]}
          />
    )
  }
})
