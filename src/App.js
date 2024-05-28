import './styles.css';
import Field from './components/Field.js';
import { connect } from 'react-redux';
import { Header } from './components/Header';
import Auth from './components/Auth';

const App = (props) => {
  return (
    <div className="App">
      <Header username={props.username} />
      <Auth />
      <Field />
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps)(App);
