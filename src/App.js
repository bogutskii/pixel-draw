import './styles.css';
import Field from './components/Field/Field.js';
import { connect } from 'react-redux';
import { Header } from './components/Header';

const App = (props) => {
  return (
    <div className="App">
      <Header username={props.username} />
      <Field />
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps)(App);
