import { Brevbygger } from 'components/brevbygger/Brevbygger';
import { getBrevmalByBrevmalId } from 'lib/services/sanity/model/brevmal/brevmalQuery';

interface Props {
  id: string;
}

const BrevmalPage = async ({ params }: { params: Props }) => {
  const brevmal = await getBrevmalByBrevmalId(params.id);
  return <Brevbygger brevmal={brevmal} />;
};

export default BrevmalPage;
