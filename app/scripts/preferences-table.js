const React = require('react');
const ReactDOM = require('react-dom');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableHeader = require('material-ui/lib/table/table-header');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const TableRow = require('material-ui/lib/table/table-row');
const PropsMixin = require('./mixins').PropsMixin;
const Logger = require('./logger');
const Preferences = require('./preferences');
const PreferenceItem = require('./preference-item');

const PreferencesTable = React.createClass({
  mixins: [PropsMixin],
  statics: {
    shortLabel: 'Short',
    fullLabel: 'Full URL',
    actionsLabel: 'Actions'
  },
  getInitialState: function() {
    return {
      preferences: []
    };
  },
  propTypes: {
    preferences: React.PropTypes.array
  },
  componentWillMount: function() {
    this.reload();
  },
  addPreference: function(short, full) {
    return Preferences.add(short, full)
      .then(this.reload);
  },
  removePreference: function(short) {
    return Preferences.remove(short)
      .then(this.reload);
  },
  reload: function() {
    Preferences.all()
      .then(items => {
        this.setState({
          preferences: items
        });
      });
  },
  render: function() {
    const preferenceItems = this.state.preferences.map(preference => {
      return (
        <PreferenceItem key={preference.short}
          short={preference.short}
          full={preference.full}
          saveFn={this.addPreference}
          removeFn={this.removePreference} />
      );
    });

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>{PreferencesTable.shortLabel}</TableHeaderColumn>
            <TableHeaderColumn>{PreferencesTable.fullLabel}</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {preferenceItems}
        </TableBody>
      </Table>
    );
  }
});

module.exports = PreferencesTable;
