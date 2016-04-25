const React = require('react');
const ReactDOM = require('react-dom');
const injectTapEventPlugin = require('react-tap-event-plugin');
const Paper = require('material-ui/lib/paper');
const AppBar = require('material-ui/lib/app-bar');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeperator = require('material-ui/lib/toolbar/toolbar-separator');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
const RaisedButton = require('material-ui/lib/raised-button');
const IconButton = require('material-ui/lib/icon-button');
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
const FlatButton = require('material-ui/lib/flat-button');
const PreferencesTable = require('./preferences-table');
const Logger = require('./logger');

injectTapEventPlugin();

const Application = React.createClass({
  statics: {
    short: 'eg',
    full: 'https://www.example.org'
  },
  render: function() {
    const branding = <img src='../images/android-icon-48x48.png' />
    return (
      <Paper zDepth={1}>
        <AppBar iconElementLeft={branding} title={<span>Rocket Fuel Options</span>} />
          <Toolbar>
            <ToolbarGroup firstChild={true} float='right'>
              <RaisedButton label='Add' onMouseUp={this.addPreference}/>
            </ToolbarGroup>
          </Toolbar>
          <PreferencesTable ref='preferencesTable' />
      </Paper>
    );
  },
  addPreference: function() {
    const table = this.refs.preferencesTable;
    // add a sample preference
    table.addPreference(Application.short, Application.full);
  }
});

ReactDOM.render(
  <Application />,
  document.querySelector('#app')
);
