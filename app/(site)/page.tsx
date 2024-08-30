import { getAlleBrevmaler } from 'lib/services/sanity/model/brevmal/brevmalQuery';
import Link from 'next/link';

const Page = async () => {
  const brevmaler = await getAlleBrevmaler();
  return (
    <div>
      <h1>Brevmaler</h1>
      <ul>
        {brevmaler.map((brevmal) => (
          <li key={brevmal._id}>
            <Link href={`/${brevmal._id}`}>{brevmal.brevtittel}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
