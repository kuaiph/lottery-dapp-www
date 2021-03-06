// external libraries
import React from 'react';
import _ from 'lodash';

// own components
import PotParticipatesModal from './PotParticipatesModal';

// own services
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';
import { log } from '../../services/logging';

// smart contracts
import LotteryPot from '../../contracts/LotteryPot.json';

class PotParticipatesModalContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.myAcct = drizzleState.accounts[0];
    this.contracts = drizzle.contracts;
  }

  handleParticipate = (potAddr, yourStake) => {
    // TODO: some parameter check
    const potContract = new this.web3.eth.Contract(LotteryPot.abi, potAddr);
    potContract.methods.participate().send({ from: this.myAcct, value: yourStake })
      .then(receipt => console.log(receipt));
  }

  render() {
    const { focusedPot } = this.props.appContext;
    const potInfo = this.props.appContext.potMap.get(focusedPot);

    return(pug`PotParticipatesModal(onePot=potInfo participate=this.handleParticipate)`);
  }

}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);
export default enhance(PotParticipatesModalContainer);
