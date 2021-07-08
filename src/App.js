import './styles.css';
import Field from './Components/Field.js';
import { connect } from 'react-redux';
import { Header } from './Components/Header';

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

const mapDispatchToProps = (dispatch) => ({
  // changeCreateModal: (value) =>
  //   dispatch({
  //     type: 'CHANGE_CREATE_MODAL',
  //     payload: {
  //       value: value,
  //     },
  //   }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
