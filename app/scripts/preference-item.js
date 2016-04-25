const React = require('react');
const ReactDOM = require('react-dom');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const TextField = require('material-ui/lib/text-field');
const FlatButtton = require('material-ui/lib/flat-button');
const PropsMixin = require('./mixins').PropsMixin;
const Logger = require('./logger');

const PreferenceItem = React.createClass({
  mixins: [PropsMixin],
  statics: {
    shortHint: 'Enter a short name',
    fullHint: 'Enter a fully qualified URL'
  },
  propTypes: {
    short: React.PropTypes.string,
    full: React.PropTypes.string,
    saveFn: React.PropTypes.func,
    removeFn: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      dirty: false
    };
  },
  removeHandler: function() {
    const short = this.state.short;
    const full = this.state.full;
    const removeFn = this.state.removeFn;

    if (removeFn) {
      removeFn.call(null, short);
    }
  },
  saveHandler: function() {
    const short = this.refs.short.getValue();
    const full = this.refs.full.getValue();
    const removeFn = this.state.removeFn;
    const saveFn = this.state.saveFn;

    // this is actually a remove and save
    if (removeFn) {
      removeFn.call(null, this.state.short)
        .then(() => {
          if (saveFn) {
            saveFn.call(null, short, full);
          }
        });
    }
  },
  changeHandler: function() {
    this.setState({
      dirty: true
    });
  },
  render: function() {
    const short = this.state.short;
    const full = this.state.full;
    const dirty = this.state.dirty;
    const disabled = !dirty;

    return (
      <TableRow hoverable={true}>
        <TableRowColumn>
          <TextField
            ref='short'
            hintText={PreferenceItem.shortHint}
            defaultValue={short}
            onChange={this.changeHandler} />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            ref='full'
            hintText={PreferenceItem.fullHint}
            defaultValue={full}
            onChange={this.changeHandler} />
        </TableRowColumn>
        <TableRowColumn>
          <FlatButtton label='Save' disabled={disabled} onMouseUp={this.saveHandler} />
          <FlatButtton label='Remove' secondary={true} onMouseUp={this.removeHandler} />
        </TableRowColumn>
      </TableRow>
    );
  }
});

module.exports = PreferenceItem;
