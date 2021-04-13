import './styles.css';
import Field from './Components/Field.js';
import { connect } from 'react-redux';

const App = (props) => {
  return (
    <div className="App">
      <h1>Pixel</h1>
      <Field />
    </div>
  );
};

const mapStateToProps = (state) => ({});

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
