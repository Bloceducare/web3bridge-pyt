import { trainingsDB } from '../../config';
import { connectDatabase } from '../../utils';
import { Web2Users, Web3Users, SpecialClassUsers } from 'web3bridgemodels/dist/trainings';

const trainingsModel = async () => {
  const connection = await connectDatabase(trainingsDB);

  return {
    web2: connection.model('web2Users', Web2Users, 'web2Users'),
    web3: connection.model('web3Users', Web3Users, 'web3Users'),
    specialClass: connection.model('specialClass', SpecialClassUsers, 'specialClass'),
  };
};

export default trainingsModel;
