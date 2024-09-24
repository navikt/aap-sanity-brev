import { getAlleBrevtyper } from 'lib/services/sanity/model/brevtype/brevtypeQuery';
import Link from 'next/link';

const Page = async () => {
  const brevtyper = await getAlleBrevtyper();
  return (
    <div>
      <h1>Brev</h1>
      <ul>
        {brevtyper.map((brevtype) => (
          <li key={brevtype._id}>
            <Link href={`/${brevtype._id}`}>{brevtype.overskrift}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
